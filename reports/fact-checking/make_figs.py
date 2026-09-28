"""Figures and summary tests for the fact-checking write-up. Inputs are the group
summaries and binned counts from my course analysis (Assignment 10, JASP): no raw
data are used. Welch tests are computed from the summary statistics for this write-up."""
import matplotlib
matplotlib.use("pdf")
import matplotlib.pyplot as plt
import numpy as np
from scipy import stats

INK, ACC, GREY = "#16181d", "#17457a", "#9aa0a8"
plt.rcParams.update({
    "font.family": "serif", "font.serif": ["STIXGeneral", "DejaVu Serif"], "mathtext.fontset": "stix",
    "font.size": 9, "axes.edgecolor": INK, "axes.linewidth": 0.6, "axes.spines.top": False,
    "axes.spines.right": False, "xtick.color": INK, "ytick.color": INK, "axes.labelcolor": INK,
    "text.color": INK, "legend.frameon": False, "savefig.bbox": "tight", "savefig.pad_inches": 0.02,
})
# group 0 = Wikipedia first, group 1 = ChatGPT first
S = {
  "first":  {"n": (29, 18), "m": (6.241, 5.778), "sd": (2.799, 3.639), "med": (7, 5.5), "bins": ((3, 4, 7, 8, 7), (4, 1, 5, 3, 5))},
  "second": {"n": (29, 18), "m": (5.379, 7.000), "sd": (3.904, 3.646), "med": (5, 9),   "bins": ((8, 3, 8, 0, 10), (2, 3, 2, 2, 9))},
}
for k, s in S.items():
    assert sum(s["bins"][0]) == s["n"][0] and sum(s["bins"][1]) == s["n"][1]
    t = stats.ttest_ind_from_stats(s["m"][1], s["sd"][1], s["n"][1], s["m"][0], s["sd"][0], s["n"][0], equal_var=False)
    n0, n1 = s["n"]; sp = np.sqrt(((n0 - 1) * s["sd"][0]**2 + (n1 - 1) * s["sd"][1]**2) / (n0 + n1 - 2))
    d = (s["m"][1] - s["m"][0]) / sp
    g = d * (1 - 3 / (4 * (n0 + n1) - 9))
    v0, v1 = s["sd"][0]**2 / n0, s["sd"][1]**2 / n1
    df = (v0 + v1)**2 / (v0**2 / (n0 - 1) + v1**2 / (n1 - 1))
    print(f"{k}: diff(ChatGPT-Wiki)={s['m'][1]-s['m'][0]:+.3f}  Welch t({df:.1f})={t.statistic:.2f}  p={t.pvalue:.3f}  d={d:.2f}  g={g:.2f}")

# Fig. 2: binned distributions (bins 0-2, 2-4, 4-6, 6-8, 8-10 as in JASP)
fig, axes = plt.subplots(1, 2, figsize=(5.8, 2.2), sharey=True, gridspec_kw={"wspace": 0.12})
labels = ["0–2", "2–4", "4–6", "6–8", "8–10"]; x = np.arange(5); w = 0.38
for ax, (k, title) in zip(axes, [("first", "Round 1: checks with the first tool"), ("second", "Round 2: checks with the other tool")]):
    b0 = np.array(S[k]["bins"][0]) / S[k]["n"][0]; b1 = np.array(S[k]["bins"][1]) / S[k]["n"][1]
    ax.bar(x - w/2, b0, w, color=GREY, label=f"Wikipedia first (n = {S[k]['n'][0]})")
    ax.bar(x + w/2, b1, w, color=ACC, label=f"ChatGPT first (n = {S[k]['n'][1]})")
    ax.set_xticks(x, labels, fontsize=7.6); ax.set_title(title, fontsize=8.5); ax.set_xlabel("Questions checked (of 10)")
axes[0].set_ylabel("Share of group"); axes[1].legend(fontsize=7.2, loc="upper left")
fig.savefig("figs/distributions.pdf")

# Fig. 3: means with standard deviations, and the predicted direction
fig, ax = plt.subplots(figsize=(3.6, 2.4))
for i, k in enumerate(["first", "second"]):
    for j, (col, off) in enumerate([(GREY, -0.12), (ACC, 0.12)]):
        m, sd = S[k]["m"][j], S[k]["sd"][j]
        ax.errorbar(i + off, m, yerr=sd, fmt="o", color=col, ms=5, capsize=3, lw=1)
        ax.text(i + off + 0.06, m, f"{m:.2f}", fontsize=7.4, va="center")
ax.set_xticks([0, 1], ["Round 1\n(first tool)", "Round 2\n(other tool)"]); ax.set_xlim(-0.5, 1.6)
ax.set_ylim(0, 11); ax.set_ylabel("Questions checked (of 10)")
ax.plot([], [], "o", color=GREY, label="Wikipedia first"); ax.plot([], [], "o", color=ACC, label="ChatGPT first")
ax.legend(fontsize=7.2, loc="upper right", bbox_to_anchor=(1.25, 1.15))
fig.savefig("figs/means.pdf")
