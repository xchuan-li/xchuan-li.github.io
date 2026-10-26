"""Statistics and figures for the fact-checking poster, computed from the raw course data
(Data Psych Experiment-1.csv, semicolon-separated; kept out of this public repository).
Usage: python3 make_stats_figs.py <raw.csv>
Coding, as in the course analysis: rows without consent are dropped; group 0 = Wikipedia
first, group 1 = ChatGPT first; a check prompt left unanswered counts as not checked.
Additional analysis: accuracy = correct answers among participants who answered all ten;
certainty = mean of the ten ratings among participants who rated all ten; Pearson r with
pairwise complete cases."""
import csv, json, re, sys
from pathlib import Path
import numpy as np
import matplotlib
matplotlib.use("svg")
import matplotlib.pyplot as plt
from scipy import stats

OUT = Path(__file__).parent
KEY = ["Iris", "Sapiens", "Chord", "Jupiter", "Origami", "Stonehenge", "Knot", "Cartographers", "Mercury", "Velcro"]
INK, MUTED, ACC, GREY = "#16181d", "#4c515c", "#17457a", "#9aa0a8"
FONT = "'Source Sans 3', 'Helvetica Neue', Arial, sans-serif"

rows = [r for r in csv.DictReader(open(sys.argv[1], encoding="utf-8-sig"), delimiter=";") if r["Consent"] == "y"]
n_total = sum(1 for _ in csv.DictReader(open(sys.argv[1], encoding="utf-8-sig"), delimiter=";"))
g = np.array([int(r["Group"]) for r in rows])
cols = lambda p: [f"{p}{i}" for i in range(1, 11)]
r1 = np.array([sum(r[c] == "yes" for c in cols("Verification")) for r in rows], float)
r2 = np.array([sum(r[c] == "yes" for c in cols("Double_Check")) for r in rows], float)
acc = np.array([sum(r[c] == k for c, k in zip(cols("Answ"), KEY)) if all(r[c] not in ("_", "") for c in cols("Answ")) else np.nan for r in rows])
cert = np.array([np.mean([int(r[c]) for c in cols("Certainty")]) if all(r[c].isdigit() for c in cols("Certainty")) else np.nan for r in rows])

def desc(x):
    m, sd, n = x.mean(), x.std(ddof=1), len(x)
    h = stats.t.ppf(0.975, n - 1) * sd / np.sqrt(n)
    return dict(n=n, m=m, sd=sd, med=float(np.median(x)), lo=m - h, hi=m + h)

S = {"n_total": n_total, "n": len(rows), "rounds": {}}
for name, x in (("r1", r1), ("r2", r2)):
    w, c = x[g == 0], x[g == 1]
    t = stats.ttest_ind(c, w, equal_var=False)
    v0, v1 = w.var(ddof=1) / len(w), c.var(ddof=1) / len(c)
    df = (v0 + v1) ** 2 / (v0 ** 2 / (len(w) - 1) + v1 ** 2 / (len(c) - 1))
    sp = np.sqrt(((len(w) - 1) * w.var(ddof=1) + (len(c) - 1) * c.var(ddof=1)) / (len(w) + len(c) - 2))
    S["rounds"][name] = dict(wiki=desc(w), gpt=desc(c), diff=c.mean() - w.mean(), t=t.statistic, df=df, p=t.pvalue,
                             d=(c.mean() - w.mean()) / sp, gpt_ge9=int((c >= 9).sum()))
def corr(x, y):
    m = ~(np.isnan(x) | np.isnan(y)); r, p = stats.pearsonr(x[m], y[m]); return dict(r=r, p=p, n=int(m.sum()))
S["corr"] = {"acc_cert": corr(acc, cert), "acc_r2": corr(acc, r2), "cert_r2": corr(cert, r2)}
S["n_acc"], S["n_cert"] = int((~np.isnan(acc)).sum()), int((~np.isnan(cert)).sum())
json.dump(S, open(OUT / "stats.json", "w"), indent=1, default=float)

plt.rcParams.update({
    "svg.fonttype": "none", "font.family": "sans-serif", "font.size": 24, "axes.edgecolor": INK, "axes.linewidth": 1.4,
    "axes.spines.top": False, "axes.spines.right": False, "xtick.color": INK, "ytick.color": INK,
    "axes.labelcolor": INK, "text.color": INK, "xtick.major.width": 1.4, "ytick.major.width": 1.4,
    "xtick.major.size": 7, "ytick.major.size": 7, "savefig.bbox": "tight", "savefig.pad_inches": 0.05,
})
def save(fig, name):
    fig.savefig(OUT / "figs" / name, transparent=True); plt.close(fig)
    p = OUT / "figs" / name; s = p.read_text()
    s = re.sub(r"font-family:[^;\"']*('[^']*')?[^;\"]*", f"font-family:{FONT}", s)
    p.write_text(s)

# Fig. 2: every participant as a dot, stacked by count; mean and 95% CI beside each group
fig, axes = plt.subplots(1, 2, figsize=(13.4, 9.8), sharey=True, gridspec_kw={"wspace": 0.08})
for ax, (name, x, title) in zip(axes, [("r1", r1, "Round 1 · first tool"), ("r2", r2, "Round 2 · other tool")]):
    for j, (grp, col, lab) in enumerate([(0, GREY, "Wikipedia\nfirst"), (1, ACC, "ChatGPT\nfirst")]):
        xs = x[g == grp]
        for v in range(11):
            k = int((xs == v).sum())
            if k: ax.scatter(j + (np.arange(k) - (k - 1) / 2) * 0.058 - 0.08, [v] * k, s=150, color=col, edgecolor="white", linewidth=0.8, zorder=2)
        d = S["rounds"][name]["wiki" if grp == 0 else "gpt"]
        ax.errorbar(j + 0.33, d["m"], yerr=[[d["m"] - d["lo"]], [d["hi"] - d["m"]]], fmt="D", color=INK, ms=13, capsize=8, lw=2.4, zorder=3)
        ax.text(j + 0.41, d["m"], f"{d['m']:.2f}", va="center", fontsize=23)
    ax.set_xticks([0, 1], ["Wikipedia\nfirst", "ChatGPT\nfirst"]); ax.set_xlim(-0.55, 1.62)
    ax.set_title(title, fontsize=25, pad=14, loc="left"); ax.tick_params(axis="x", length=0, pad=10)
    ax.set_ylim(-0.6, 10.6); ax.set_yticks(range(0, 11, 2))
axes[0].set_ylabel("Questions checked (of 10)")
save(fig, "main.svg")

# Fig. 3: participant-level correlations
fig, axes = plt.subplots(1, 3, figsize=(13.4, 6.4), gridspec_kw={"wspace": 0.5})
rng = np.random.default_rng(7)
specs = [(acc, cert, "acc_cert", "Accuracy (of 10)", "Mean certainty (1–4)"),
         (acc, r2, "acc_r2", "Accuracy (of 10)", "Round-2 checks"),
         (cert, r2, "cert_r2", "Mean certainty (1–4)", "Round-2 checks")]
for ax, (x, y, key, xl, yl) in zip(axes, specs):
    m = ~(np.isnan(x) | np.isnan(y)); xx, yy = x[m], y[m]
    jx = 0.12 if xl.startswith("Acc") else 0.0
    jy = 0.18 if yl.startswith("Round") else 0.0
    ax.scatter(xx + rng.uniform(-jx, jx, len(xx)), yy + rng.uniform(-jy, jy, len(yy)), s=95, color=MUTED, alpha=0.75, edgecolor="none")
    b = np.polyfit(xx, yy, 1); xs = np.linspace(xx.min(), xx.max(), 2)
    ax.plot(xs, np.polyval(b, xs), color=ACC, lw=2.4)
    c = S["corr"][key]; p = "p < .001" if c["p"] < .001 else f"p = {c['p']:.2f}".replace("0.", ".")
    ax.set_title(f"r = {c['r']:.2f}, {p}, n = {c['n']}".replace("0.", ".").replace("-.", "−."), fontsize=19.5, loc="left", pad=12)
    ax.set_xlabel(xl, fontsize=21); ax.set_ylabel(yl, fontsize=21); ax.tick_params(labelsize=19)
    if xl.startswith("Acc"): ax.set_xticks([4, 6, 8, 10])
    else: ax.set_xticks([2, 3, 4])
    if yl.startswith("Mean"): ax.set_yticks([2, 3, 4])
    if yl.startswith("Round"): ax.set_ylim(-0.8, 10.8); ax.set_yticks(range(0, 11, 2))
save(fig, "corr.svg")
print(json.dumps(S, indent=1, default=lambda v: round(float(v), 3)))
