"""Fill poster.template.html with the numbers in stats.json and inline the figures."""
import json, re
from pathlib import Path
D = Path(__file__).parent
S = json.loads((D / "stats.json").read_text())
R1, R2, C = S["rounds"]["r1"], S["rounds"]["r2"], S["corr"]
def f2(x): return f"{x:.2f}".replace("-", "−")
def f1(x): return f"{x:.1f}"
def pv(p): return "< .001" if p < .001 else "= " + f"{p:.2f}".lstrip("0")
def rv(r): return f"{r:.2f}".replace("0.", ".").replace("-", "−")
def svg(name):
    s = (D / "figs" / name).read_text()
    s = re.sub(r"<\?xml.*?\?>|<!DOCTYPE.*?>", "", s, flags=re.S)
    return re.sub(r'<svg ([^>]*?)width="[^"]*" height="[^"]*"', r'<svg \1', s, count=1)
V = {
  "N_TOTAL": S["n_total"], "N": S["n"], "N_DECLINED": S["n_total"] - S["n"],
  "NW": R1["wiki"]["n"], "NG": R1["gpt"]["n"],
  "R1W_M": f2(R1["wiki"]["m"]), "R1W_SD": f2(R1["wiki"]["sd"]), "R1G_M": f2(R1["gpt"]["m"]), "R1G_SD": f2(R1["gpt"]["sd"]),
  "R2W_M": f2(R2["wiki"]["m"]), "R2W_SD": f2(R2["wiki"]["sd"]), "R2G_M": f2(R2["gpt"]["m"]), "R2G_SD": f2(R2["gpt"]["sd"]),
  "R1_T": f2(R1["t"]), "R1_DF": f1(R1["df"]), "R1_P": pv(R1["p"]), "R1_PT": f"{R1['p']:.2f}".lstrip("0"), "R1_D": f2(R1["d"]),
  "R2_T": f2(R2["t"]), "R2_DF": f1(R2["df"]), "R2_P": pv(R2["p"]), "R2_PT": f"{R2['p']:.2f}".lstrip("0"), "R2_D": f2(R2["d"]),
  "R2G_GE9": R2["gpt_ge9"],
  "AC_R": rv(C["acc_cert"]["r"]), "AC_P": pv(C["acc_cert"]["p"]), "AC_N": C["acc_cert"]["n"],
  "AD_R": rv(C["acc_r2"]["r"]), "AD_P": pv(C["acc_r2"]["p"]), "AD_N": C["acc_r2"]["n"],
  "CD_R": rv(C["cert_r2"]["r"]), "CD_P": pv(C["cert_r2"]["p"]), "CD_N": C["cert_r2"]["n"],
  "FIG_MAIN": svg("main.svg"), "FIG_CORR": svg("corr.svg"), "QR": (D / "figs" / "qr.svg").read_text(), "LOGO": (D / "figs" / "utn.svg").read_text(),
}
html = (D / "poster.template.html").read_text()
html = re.sub(r"\{\{(\w+)\}\}", lambda m: str(V[m.group(1)]), html)
(D / "poster.html").write_text(html)
print("ok", len(html))
