"""Build the web versions of the papers (XC, 28 Sep 2026: "把论文写到网页上，格式不变").

For each paper: figures become SVG (matplotlib PDFs via pdftocairo; TikZ diagrams are
compiled as standalone documents first), the source goes through pandoc with a
bibliography, and the result is an HTML fragment in src/content/papers/<slug>.html with
numbered sections, "Figure N" / "Table N" captions, working cross-references, an
abstract block and a reference list. The Astro page wraps it in the paper header.

Run from the repository root:  python3 reports/web/build_web.py
Needs: pandoc, tectonic, pdftocairo (poppler).
"""
import pathlib, re, subprocess, shutil, tempfile

ROOT = pathlib.Path(__file__).resolve().parents[2]
REPORTS = ROOT / "reports"
OUT_HTML = ROOT / "src/content/papers"
OUT_FIG = ROOT / "public/papers"
TEMPLATE = REPORTS / "web/template.html"
VAULT_B6 = pathlib.Path("/Users/xiaochuan/Library/Mobile Documents/iCloud~md~obsidian/Documents/Vault/B-Research/B6-ProtoBias-linguistic-analysis/B6h-成稿与提案/output/pdf/Xiaochuan_Li_Typicality_in_Referent_Choice.md")


def run(cmd, **kw):
    r = subprocess.run(cmd, capture_output=True, text=True, **kw)
    if r.returncode != 0:
        raise SystemExit(f"failed: {' '.join(map(str, cmd))}\n{r.stderr[-2000:]}")
    return r.stdout


def pdf_to_svg(pdf: pathlib.Path, svg: pathlib.Path):
    svg.parent.mkdir(parents=True, exist_ok=True)
    run(["pdftocairo", "-svg", str(pdf), str(svg)])


def tikz_to_pdf(tikz: str, preamble: str, out_pdf: pathlib.Path):
    doc = ("\\documentclass[border=3pt]{standalone}\n\\usepackage[T1]{fontenc}\n\\usepackage{newtxtext,newtxmath}\n"
           "\\usepackage{tikz}\n\\usetikzlibrary{positioning,arrows.meta}\n" + preamble + "\n\\begin{document}\n" + tikz + "\n\\end{document}\n")
    with tempfile.TemporaryDirectory() as d:
        tex = pathlib.Path(d) / "fig.tex"
        tex.write_text(doc)
        run(["tectonic", "-X", "compile", str(tex)], cwd=d)
        shutil.copy(pathlib.Path(d) / "fig.pdf", out_pdf)


def number_things(html: str) -> str:
    """Give figures and tables numbers, and make \\ref links show them."""
    labels = {}
    fig_n = 0
    def fig(m):
        nonlocal fig_n
        fig_n += 1
        block = m.group(0)
        idm = re.search(r'<figure id="([^"]+)"', block)
        if idm:
            labels[idm.group(1)] = str(fig_n)
        return re.sub(r"<figcaption>", f'<figcaption><span class="cap-n">Figure {fig_n}:</span> ', block, count=1)
    html = re.sub(r"<figure\b.*?</figure>", fig, html, flags=re.S)
    tab_n = 0
    def tab(m):
        nonlocal tab_n
        tab_n += 1
        block = m.group(0)
        idm = re.search(r'id="(tab:[^"]+)"', block)
        if idm:
            labels[idm.group(1)] = str(tab_n)
        return re.sub(r"<caption>", f'<caption><span class="cap-n">Table {tab_n}:</span> ', block, count=1)
    html = re.sub(r"<div id=\"tab:[^\"]+\"[^>]*>\s*<table.*?</table>\s*</div>|<table.*?</table>", tab, html, flags=re.S)
    # section numbers from pandoc's data-number
    for m in re.finditer(r'<h[2-4][^>]*id="([^"]+)"[^>]*data-number="([^"]+)"|<h[2-4][^>]*data-number="([^"]+)"[^>]*id="([^"]+)"', html):
        if m.group(1):
            labels[m.group(1)] = m.group(2)
        else:
            labels[m.group(4)] = m.group(3)
    def ref(m):
        key = m.group(1)
        return f'<a href="#{key}">{labels.get(key, "?")}</a>'
    html = re.sub(r'<a href="#([^"]+)"[^>]*data-reference-type="ref"[^>]*>[^<]*</a>', ref, html)
    return html


def finish(html: str, slug: str) -> str:
    html = re.sub(r'src="figs/([^".]+)\.pdf"', lambda m: f'src="/papers/{slug}/{m.group(1)}.svg"', html)
    # pandoc emits <embed> for PDF graphics; figures are plain images on the web
    html = re.sub(r'<embed ([^>]*?)\s*/?>', lambda m: "<img alt=\"\" " + m.group(1) + ">", html)
    html = re.sub(r'(<img [^>]*src="[^"]*/tikz-[^"]*")', r'\1 class="fig-diagram"', html)
    html = re.sub(r'<img ([^>]*?)style="[^"]*"', r"<img \1", html)
    html = html.replace("<img ", '<img loading="lazy" ')
    html = number_things(html)
    html = html.replace('class="header-section-number"', 'class="sec-n"')
    return html


def latex_paper(slug: str, src_dir: str, tex_name: str, preamble: str):
    src = REPORTS / src_dir
    tex = (src / tex_name).read_text()
    figs = OUT_FIG / slug
    figs.mkdir(parents=True, exist_ok=True)
    # TikZ diagrams -> standalone PDFs -> referenced as figures
    tikzes = re.findall(r"\\begin\{tikzpicture\}.*?\\end\{tikzpicture\}", tex, flags=re.S)
    for i, t in enumerate(tikzes, 1):
        pdf = src / "figs" / f"tikz-{i}.pdf"
        tikz_to_pdf(t, preamble, pdf)
        tex = tex.replace(t, f"\\includegraphics{{figs/tikz-{i}.pdf}}", 1)
    for pdf in (src / "figs").glob("*.pdf"):
        pdf_to_svg(pdf, figs / (pdf.stem + ".svg"))
    # \paragraph{X} is a run-in bold heading in the paper, not a numbered section
    tex = re.sub(r"\\cmidrule(\([^)]*\))?\{[^}]*\}", "", tex)  # pandoc prints \cmidrule as text
    tex = re.sub(r"\\paragraph\{([^}]*)\}\s*", lambda m: "\\textbf{" + m.group(1) + "} ", tex)
    # custom item labels (\item[\textbf{H1}]) are kept as run-in bold text
    tex = re.sub(r"\\item\[(.*?)\]\s*", lambda m: "\\item " + m.group(1) + "~", tex)
    # appendix sections are lettered, as in the PDF
    letters = iter("ABCDEFG")
    def app(m):
        body = m.group(1)
        out = []
        for sec in re.finditer(r"\\section\{([^}]*)\}(\\label\{([^}]*)\})?", body):
            L = next(letters)
            out.append((sec.group(0), f"\\section*{{Appendix {L}: {sec.group(1)}}}" + (f"\\label{{{sec.group(3)}}}" if sec.group(3) else ""), sec.group(3), L))
        for old, new, label, L in out:
            body = body.replace(old, new, 1)
        return body, out
    if "\\appendix" in tex:
        head, tail = tex.split("\\appendix", 1)
        tail, out = app(re.match(r"(.*)", tail, flags=re.S))
        for _, _, label, L in out:
            if label:
                head = head.replace(f"\\ref{{{label}}}", L); tail = tail.replace(f"\\ref{{{label}}}", L)
        tex = head + tail
    # bibliography comes from refs.bib through citeproc; its heading stays where the list was
    tex = re.sub(r"\\begin\{thebibliography\}.*?\\end\{thebibliography\}", lambda m: "\\section*{References}", tex, flags=re.S)
    with tempfile.NamedTemporaryFile("w", suffix=".tex", delete=False, dir=src) as f:
        f.write(tex)
        tmp = f.name
    try:
        html = run(["pandoc", tmp, "-f", "latex", "-t", "html5", "--citeproc", "--bibliography", str(src / "refs.bib"),
                    "--math-method=mathml", "--number-sections", "--shift-heading-level-by=1",
                    "--template", str(TEMPLATE), "--wrap=none"], cwd=src)
    finally:
        pathlib.Path(tmp).unlink()
    # citeproc puts the list at the end; move it under the References heading
    refs = re.search(r'<div id="refs".*?</div>\s*</div>', html, flags=re.S)
    head = '<h2 class="unnumbered" id="references">References</h2>'
    if refs and head in html:
        block = refs.group(0)
        html = html.replace(block, "")
        html = html.replace(head, head + "\n" + block, 1)
    OUT_HTML.mkdir(parents=True, exist_ok=True)
    (OUT_HTML / f"{slug}.html").write_text(finish(html, slug))
    print("built", slug)


def typicality():
    md = VAULT_B6.read_text()
    # drop the title block (the page header shows it) and keep the abstract as a section
    body = md.split("## Abstract", 1)[1]
    abstract, rest = body.split("\n## ", 1)
    keywords = "\n\n*Keywords:* typicality; referent choice; superordinate categories; experimental pragmatics; measurement validity\n"
    doc = "---\nabstract: |\n" + "".join("  " + l + "\n" for l in (abstract.strip() + keywords).splitlines()) + "---\n\n## " + rest
    doc = re.sub(r"^(\(\d+\) [a-z]\. .*)$", lambda m: m.group(1) + "\\", doc, flags=re.M)
    html = run(["pandoc", "-f", "markdown-example_lists-fancy_lists", "-t", "html5", "--math-method=mathml", "--template", str(TEMPLATE), "--wrap=none"], input=doc)
    html = re.sub(r"<h2 id=\"([^\"]+)\">(\d+)\. ", r'<h2 id="\1"><span class="sec-n">\2</span> ', html)
    html = number_things(html)
    m = re.search(r'<h2 id="references">References</h2>', html)
    if m:
        html = html[:m.end()] + '\n<div class="references">' + html[m.end():] + "</div>\n"
    OUT_HTML.mkdir(parents=True, exist_ok=True)
    (OUT_HTML / "typicality-in-referent-choice.html").write_text(html)
    print("built typicality-in-referent-choice")


if __name__ == "__main__":
    latex_paper("street-view-classification", "street-view", "street-view.tex", "\\definecolor{acc}{HTML}{17457A}")
    latex_paper("fact-checking-study", "fact-checking", "fact-checking.tex", "\\definecolor{acc}{HTML}{17457A}\\definecolor{wiki}{HTML}{9AA0A8}")
    typicality()
