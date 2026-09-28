"""Figures for the street-view write-up, drawn from the committed results of
github.com/xchuan-li/HAI_DL_Group_Assignment (copied into data/). Single-seed
validation accuracies on the fixed 1,080-image split. The 112-px run-1 numbers
(no JSON committed) are from results/README.md of that repository."""
import json, csv
import matplotlib
matplotlib.use("pdf")
import matplotlib.pyplot as plt
import numpy as np

INK, ACC, GREY, LIGHT = "#16181d", "#17457a", "#9aa0a8", "#c9ced6"
plt.rcParams.update({
    "font.family": "serif", "font.serif": ["STIXGeneral", "DejaVu Serif"], "mathtext.fontset": "stix",
    "font.size": 9, "axes.edgecolor": INK, "axes.linewidth": 0.6, "axes.spines.top": False,
    "axes.spines.right": False, "xtick.major.width": 0.6, "ytick.major.width": 0.6,
    "xtick.color": INK, "ytick.color": INK, "axes.labelcolor": INK, "text.color": INK,
    "legend.frameon": False, "savefig.bbox": "tight", "savefig.pad_inches": 0.02,
})
J = lambda f: json.load(open(f"data/{f}"))
best = lambda f: J(f)["results"]["cls"]["best_val_acc"]
hist = lambda f, m="cls": J(f)["results"][m]["history"]

# Fig. 2: progression of the best validation accuracy
stages = ["Baseline\n112 px, 12 ep.", "Recipe\n224 px, aug., 80 ep.", "+ dropout 0.5\n150 ep.", "+ mixup 0.2\n150 ep.", "200 ep.\n(submitted)"]
acc = [0.6194, best("results_img224_aug1_ep80.json"), best("metrics_drop0.5_ep150.json"), best("metrics_A_drop0.5_mix0.2_adam.json"), best("metrics_ep200.json")]
fig, ax = plt.subplots(figsize=(4.7, 2.3))
ax.plot(range(5), acc, color=ACC, lw=1.2, marker="o", ms=4, zorder=3)
for i, a in enumerate(acc):
    ax.annotate(f"{a:.3f}", (i, a), textcoords="offset points", xytext=(0, 7), ha="center", fontsize=8)
ax.set_xticks(range(5), stages, fontsize=7.2); ax.set_xlim(-0.4, 4.4); ax.set_ylim(0.58, 0.87)
ax.set_ylabel("Validation accuracy")
fig.savefig("figs/progression.pdf")

# Fig. 3: learning curves -- the 80-epoch recipe run (train vs val) and the submitted run (val)
h2 = hist("results_img224_aug1_ep80.json"); h5 = hist("metrics_ep200.json")
fig, ax = plt.subplots(figsize=(4.7, 2.4))
ax.plot([e["epoch"] for e in h2], [e["train_acc"] for e in h2], color=GREY, lw=1, label="Recipe run (80 ep.), train")
ax.plot([e["epoch"] for e in h2], [e["val_acc"] for e in h2], color=INK, lw=1, label="Recipe run (80 ep.), validation")
ax.plot([e["epoch"] for e in h5], [e["val_acc"] for e in h5], color=ACC, lw=1.1, label="Submitted run (200 ep.), validation")
ax.set_xlabel("Epoch"); ax.set_ylabel("Accuracy"); ax.set_ylim(0, 1.02); ax.set_xlim(0, 202)
ax.legend(fontsize=7.4, loc="lower right")
fig.savefig("figs/curves.pdf")

# Fig. 4: (a) dropout x schedule, no mixup; (b) schedule at dropout 0.5, with and without mixup
fig, (a, b) = plt.subplots(1, 2, figsize=(5.6, 2.3), gridspec_kw={"wspace": 0.38})
p80 = [0, 0.2, 0.4, 0.5]; v80 = [best("results_img224_aug1_ep80.json"), best("metrics_drop0.2_ep80.json"), best("metrics_drop0.4_ep80.json"), best("metrics_drop0.5_ep80.json")]
p150 = [0.2, 0.4, 0.5, 0.6]; v150 = [best("metrics_drop0.2_ep150.json"), best("metrics_drop0.4_ep150.json"), best("metrics_drop0.5_ep150.json"), best("metrics_drop0.6_ep150.json")]
a.plot(p80, v80, color=GREY, marker="o", ms=3.5, lw=1, label="80 epochs")
a.plot(p150, v150, color=ACC, marker="s", ms=3.5, lw=1.1, label="150 epochs")
a.set_xlabel("Dropout rate"); a.set_ylabel("Validation accuracy"); a.set_ylim(0.765, 0.812); a.legend(fontsize=7.4, loc="lower left")
a.set_title("(a) no mixup", fontsize=8.5)
b.plot([80, 150], [best("metrics_drop0.5_ep80.json"), best("metrics_drop0.5_ep150.json")], color=GREY, marker="o", ms=3.5, lw=1, label="no mixup")
b.plot([150, 200, 250], [best("metrics_ep150.json"), best("metrics_ep200.json"), best("metrics_ep250.json")], color=ACC, marker="s", ms=3.5, lw=1.1, label="mixup 0.2")
b.set_xticks([80, 150, 200, 250]); b.set_xlabel("Training epochs"); b.set_ylim(0.765, 0.83); b.legend(fontsize=7.4, loc="lower right")
b.set_title("(b) dropout 0.5", fontsize=8.5)
fig.savefig("figs/sweeps.pdf")

# Fig. 5: output formulation at 112 px (run 1, README) and 224 px (run 2, JSON)
fig, ax = plt.subplots(figsize=(3.4, 2.2))
x = np.arange(2); w = 0.26
r2 = J("results_img224_aug1_ep80.json")["results"]
cls = [0.6194, r2["cls"]["best_val_acc"]]; multi = [0.6361, r2["multi"]["best_val_acc"]]
ax.bar(x - w, cls, w, color=INK, label="Classification")
ax.bar(x, multi, w, color=GREY, label="Classification + coordinates")
ax.bar([0 + w], [0.2130], w, color=ACC, label="Coordinate regression → nearest centroid")
for xi, v in [(0 - w, cls[0]), (0, multi[0]), (0 + w, 0.2130), (1 - w, cls[1]), (1, multi[1])]:
    ax.text(xi, v + 0.015, f"{v:.3f}", ha="center", fontsize=7.2)
ax.text(1 + w, 0.03, "not run", ha="center", fontsize=7, color=GREY, rotation=90, va="bottom")
ax.set_xticks(x, ["112 px, 12 epochs\n(baseline)", "224 px, aug., 80 epochs\n(fixed recipe)"], fontsize=7.6)
ax.set_ylim(0, 0.9); ax.set_ylabel("Validation accuracy"); ax.legend(fontsize=7, loc="upper left", bbox_to_anchor=(1.0, 1.0))
fig.savefig("figs/heads.pdf")

# Fig. 6: confusion matrix of the submitted model (rows = true country, counts out of 60)
rows = list(csv.reader(open("data/confusion_cls_img224_aug1_ep200.csv")))
names = [n.replace("_", " ").lstrip("# ") for n in rows[0]]
M = np.array([[int(v) for v in r] for r in rows[1:]])
assert M.shape == (18, 18) and (M.sum(1) == 60).all()
fig, ax = plt.subplots(figsize=(5.2, 4.6))
ax.imshow(M / 60, cmap="Blues", vmin=0, vmax=1)
for i in range(18):
    for j in range(18):
        if M[i, j]:
            ax.text(j, i, M[i, j], ha="center", va="center", fontsize=5.6, color="white" if M[i, j] > 30 else INK)
ax.set_xticks(range(18), names, rotation=60, ha="right", fontsize=6.4); ax.set_yticks(range(18), names, fontsize=6.4)
ax.set_xlabel("Predicted"); ax.set_ylabel("True")
for s in ax.spines.values(): s.set_visible(False)
ax.tick_params(length=0)
fig.savefig("figs/confusion.pdf")
acc_c = np.diag(M) / 60
order = np.argsort(acc_c)
print("overall", np.trace(M) / M.sum())
print("weakest", [(names[i], int(M[i, i])) for i in order[:4]])
print("strongest", [(names[i], int(M[i, i])) for i in order[-4:]])
off = [(M[i, j], names[i], names[j]) for i in range(18) for j in range(18) if i != j]
print("top confusions", sorted(off, reverse=True)[:6])
