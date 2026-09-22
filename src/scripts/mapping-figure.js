/* Homepage Fig. 1: the mapping from a superordinate term to its members.
   The superordinate term maps onto its members. What the description leaves open stays unsaid: a member's
   name resolves only as far as it comes to mind (typicality), and never completely. What is said is solid:
   the term itself, the possibility "might" raises, the question "whether" opens. The rest of the description
   does not reweight members; it rules them out (×). An assertion turns the mapping into a settled line (═).
   Markup hooks inside [data-mapping]: canvas[data-field], [data-status], [data-prompt], [data-turn-tag],
   [data-go], [data-pause], [data-compare]. */
(() => {
  const RAMP = " .:-=+*#%@";
  const SCRAMBLE = "-=+*#%@/\\|01";
  // the four members come from the paper's opening sentence: a bird before a stick insect, a dog before an octopus.
  // priors are illustrative orderings, not measured typicality
  const MEMBERS = [
    { id: "bird", label: "bird", prior: 0.8 },
    { id: "dog", label: "dog", prior: 0.9 },
    { id: "octopus", label: "octopus", prior: 0.3 },
    { id: "stick", label: "stick insect", prior: 0.2 },
  ];
  const STAGES = {
    "0": { term: false, cut: [], said: [], weights: {} },
    "1a": { term: true, cut: [], said: [], weights: { bird: 0.8, dog: 0.9, octopus: 0.3, stick: 0.2 } },
    "1b": { term: true, cut: ["dog", "octopus"], said: [], weights: { bird: 0.8, stick: 0.2 } },
    "2": { term: true, cut: ["dog", "octopus"], said: ["stick"], weights: { bird: 0.55, stick: 0.45 } },
    "3": { term: true, cut: ["dog", "octopus"], said: ["stick"], bracket: true, weights: { bird: 0.55, stick: 0.45 } },
    "c": { term: true, cut: ["dog", "octopus", "bird"], said: ["stick"], settled: true, weights: { stick: 1 } },
  };
  const STATUS = {
    "0": "listening",
    "1a": "animal → its members · unsaid, ranked by typicality",
    "1b": "perched on that branch rules out dog and octopus",
    "2": "<span class=\"t\">might</span> says one out loud: stick insect",
    "3": "open: whether it is a stick insect <span class=\"t\">?</span>",
    "c": "settled: stick insect",
  };
  const TURNS = {
    1: ["A", "There’s an animal perched on that branch."],
    2: ["B", "It might be a stick insect."],
    3: ["A", "I don’t know whether it is."],
    c: ["B′", "It is a stick insect."],
  };
  const TAGS = { 0: "t0", 1: "t1", 2: "t2", 3: "t3", c: "t2′" };
  const BEFORE = { 1: "0", 2: "1b", 3: "2", c: "1b" };   // the state a turn starts from

  const LIGHT = { R: 1, L: 2, D: 4, U: 8 };
  const BOX = { 3: "─", 1: "─", 2: "─", 12: "│", 4: "│", 8: "│", 5: "┌", 6: "┐", 9: "└", 10: "┘", 13: "├", 14: "┤", 7: "┬", 11: "┴", 15: "┼" };
  const DBL = { 3: "═", 1: "═", 2: "═", 12: "║", 4: "║", 8: "║", 5: "╔", 6: "╗", 9: "╚", 10: "╝", 13: "╠", 14: "╣", 7: "╦", 11: "╩", 15: "╬" };

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrow = matchMedia("(max-width: 600px)");
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const pick = s => s[Math.floor(Math.random() * s.length)];
  const escape = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

  function init(fig) {
    const canvas = fig.querySelector("canvas[data-field]"), ctx = canvas.getContext("2d");
    const statusEl = fig.querySelector("[data-status]"), promptEl = fig.querySelector("[data-prompt]");
    const tagEl = fig.querySelector("[data-turn-tag]");
    const goButtons = [...fig.querySelectorAll("[data-go]")], compareBtn = fig.querySelector("[data-compare]");
    // colours come from CSS custom properties on the figure ("r,g,b"), so the page decides the palette
    const css = getComputedStyle(canvas), read = (name, fallback) => css.getPropertyValue(name).trim() || fallback;
    const INK = {
      white: read("--ink-strong", "238,242,247"), coral: read("--ink-said", "255,107,61"),
      rail: read("--ink-rail", "62,70,82"), railHot: read("--ink-rail-said", "120,58,38"),
      ghost: read("--ink-ghost", "150,160,176"), unsaid: read("--ink-unsaid", "190,198,210"), cut: read("--ink-cut", "150,158,170"),
    };
    const GLOW = read("--ink-glow", "1") !== "0";

    let g = null, stage = "0", key = 0, paused = false, visible = false, started = false;
    let raf = 0, lastT = 0, clock = 0, typing = 0, chain = 0;
    // displayed values ease toward the targets of the current stage
    const shown = { term: 0, grow: 0, bracket: 0, settle: 0, w: {}, lvl: {}, cut: {}, said: {} };
    let aim = null;

    // ---------- layout on the character grid ----------
    function build() {
      const fs = narrow.matches ? 8 : 10, ch = narrow.matches ? 10 : 12, rows = narrow.matches ? 16 : 18;
      const width = canvas.clientWidth, dpr = window.devicePixelRatio || 1;
      ctx.font = `${fs}px "IBM Plex Mono", Menlo, monospace`;
      const cw = ctx.measureText("0").width, cols = Math.floor(width / cw);
      canvas.style.height = rows * ch + "px";
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(rows * ch * dpr);

      const spacing = narrow.matches ? 3 : 4, top = Math.round((rows - (3 * spacing + 1)) / 2);
      const memberRows = MEMBERS.map((_, k) => top + k * spacing), mid = top + Math.round(1.5 * spacing);
      // the term is said, so it is set large and solid; its width is counted in grid columns
      const big = cols >= 88, termPx = big ? 26 : 17;
      ctx.font = `500 ${termPx}px "IBM Plex Mono", Menlo, monospace`;
      const termW = ctx.measureText("animal").width;
      const term = { text: "animal", px: termPx, x: 1, cols: Math.ceil(termW / cw), letters: [...'animal'].map((c, i) => ({ c, rank: 0.6 * i / 6 + 0.4 * Math.random() })) };
      const sx = term.x + term.cols + 2;
      const xs = sx + (big ? 5 : 2), len = big ? 22 : Math.max(9, Math.min(14, cols - xs - 30));
      const xa = xs + len, xl = xa + 2, xq = xl + 16;

      // one path per member: trunk → spine → branch; distance d counts from the term
      const rails = new Map(), key2 = (x, y) => y * cols + x;
      // f: joins of every path through the cell; pf[k]: joins of path k alone (drawn when k is settled)
      const link = (a, b, k) => {
        const dir = b.x > a.x ? ["R", "L"] : b.x < a.x ? ["L", "R"] : b.y > a.y ? ["D", "U"] : ["U", "D"];
        const ra = rails.get(key2(a.x, a.y)), rb = rails.get(key2(b.x, b.y));
        ra.f |= LIGHT[dir[0]]; rb.f |= LIGHT[dir[1]];
        ra.pf[k] = (ra.pf[k] || 0) | LIGHT[dir[0]]; rb.pf[k] = (rb.pf[k] || 0) | LIGHT[dir[1]];
      };
      const paths = MEMBERS.map((m, k) => {
        const pts = [];
        for (let x = sx; x <= xs; x++) pts.push({ x, y: mid });
        const r = memberRows[k], step = r > mid ? 1 : -1;
        for (let y = mid + step; step > 0 ? y <= r : y >= r; y += step) pts.push({ x: xs, y });
        for (let x = xs + 1; x < xa; x++) pts.push({ x, y: r });
        pts.forEach((p, d) => {
          const id = key2(p.x, p.y);
          if (!rails.has(id)) rails.set(id, { x: p.x, y: p.y, f: 0, pf: {}, d, users: [] });
          rails.get(id).users.push({ k, d });
          if (d) link(pts[d - 1], p, k);
        });
        return { k, id: m.id, row: r, cutAt: xs + Math.floor(len * 0.6), end: pts.length };
      });
      const first = rails.get(key2(sx, mid));
      first.f |= LIGHT.L;
      MEMBERS.forEach((_, k) => { first.pf[k] = (first.pf[k] || 0) | LIGHT.L; });
      const labels = MEMBERS.map((m, k) => [...m.label].map((c, i, all) => ({ c, x: xl + i, y: memberRows[k], rank: 0.72 * i / Math.max(1, all.length - 1) + 0.28 * Math.random() })));
      g = { cols, rows, cw, ch, fs, dpr, ox: (width - cols * cw) / 2, mid, memberRows, term, sx, xs, xa, xl, xq, rails: [...rails.values()], paths, labels,
            maxD: Math.max(...paths.map(p => p.end)) };
    }

    // ---------- state ----------
    function share(weights) {
      const total = Object.values(weights).reduce((a, b) => a + b, 0) || 1, top = Math.max(0, ...Object.values(weights)) / total || 1;
      const out = {};
      MEMBERS.forEach(m => {
        const s = (weights[m.id] || 0) / total;
        out[m.id] = { flow: weights[m.id] ? clamp(0.2 + 1.1 * s, 0, 1) : 0, lvl: weights[m.id] ? 0.16 + 0.54 * s / top : 0 };
      });
      return out;
    }
    function setAim(s, instant) {
      stage = s;
      const st = STAGES[s], sh = share(st.weights);
      aim = { term: st.term ? 1 : 0, grow: st.term ? 1 : 0, bracket: st.bracket ? 1 : 0, settle: st.settled ? 1 : 0, w: {}, lvl: {}, cut: {}, said: {} };
      MEMBERS.forEach(m => {
        aim.w[m.id] = sh[m.id].flow;
        aim.cut[m.id] = st.cut.includes(m.id) ? 1 : 0;
        aim.said[m.id] = st.said.includes(m.id) ? 1 : 0;
        aim.lvl[m.id] = aim.said[m.id] ? 1.4 : sh[m.id].lvl;   // a said name resolves completely, and fast
      });
      statusEl.innerHTML = STATUS[s];
      if (instant) copy(aim, shown);
    }
    function copy(a, b) {
      ["term", "grow", "bracket", "settle"].forEach(k => { b[k] = a[k]; });
      ["w", "lvl", "cut", "said"].forEach(k => { b[k] = { ...a[k] }; });
    }
    function ease(dt) {
      const to = (x, t, tau) => x + (t - x) * (1 - Math.exp(-dt / tau));
      shown.term = aim.term ? Math.min(1, shown.term + dt / 700) : 0;
      shown.grow = aim.grow ? Math.min(1, shown.grow + dt / 650) : 0;
      shown.bracket = to(shown.bracket, aim.bracket, 220);
      shown.settle = to(shown.settle, aim.settle, 300);
      MEMBERS.forEach(({ id }) => {
        shown.w[id] = to(shown.w[id] || 0, aim.w[id], 350);
        shown.lvl[id] = to(shown.lvl[id] || 0, aim.lvl[id], 420);
        shown.cut[id] = to(shown.cut[id] || 0, aim.cut[id], 160);
        shown.said[id] = to(shown.said[id] || 0, aim.said[id], 260);
      });
    }

    // ---------- drawing ----------
    function glyph(ch, x, y, rgb, a, glow) {
      ctx.fillStyle = `rgba(${rgb},${a})`;
      if (glow && GLOW) { ctx.shadowColor = `rgba(${rgb},0.55)`; ctx.shadowBlur = glow; } else ctx.shadowBlur = 0;
      ctx.fillText(ch, g.ox + x * g.cw, y * g.ch);
    }
    function draw() {
      const { dpr } = g;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      ctx.font = `${g.fs}px "IBM Plex Mono", Menlo, monospace`;
      ctx.textBaseline = "top";
      const t = clock / 1000, S = 7, speed = narrow.matches ? 10 : 14;
      const pulse = d => {
        if (reduce) return 0.55;
        const u = (((d - speed * t) % S) + S) % S;
        return Math.max(0, 1 - Math.abs(u - S / 2) / 1.7);
      };
      const stickIdx = MEMBERS.findIndex(m => m.id === "stick");

      // the term: said, so it is large and solid
      if (shown.term > 0) {
        const t = g.term, y = g.mid * g.ch + g.ch / 2 - t.px * 0.55;
        ctx.font = `500 ${t.px}px "IBM Plex Mono", Menlo, monospace`;
        let x = g.ox + t.x * g.cw;
        t.letters.forEach(l => {
          const w = ctx.measureText(l.c).width;
          if (l.rank < shown.term) { ctx.fillStyle = `rgba(${INK.white},0.96)`; ctx.shadowColor = `rgba(${INK.white},0.45)`; ctx.shadowBlur = GLOW ? 8 : 0; ctx.fillText(l.c, x, y); }
          else if (l.rank < shown.term + 0.25) { ctx.shadowBlur = 0; ctx.fillStyle = `rgba(${INK.ghost},0.5)`; ctx.fillText(pick(SCRAMBLE), x, y); }
          x += w;
        });
        ctx.shadowBlur = 0;
        ctx.font = `${g.fs}px "IBM Plex Mono", Menlo, monospace`;
      }

      // rails and flow
      const reach = shown.grow * (g.maxD + 3);
      g.rails.forEach(cell => {
        if (cell.d > reach) return;
        let flow = 0, hot = 0, alive = false, settledHere = false;
        cell.users.forEach(({ k, d }) => {
          const p = g.paths[k], id = p.id, cutA = shown.cut[id];
          if (cell.y === p.row && cell.x >= p.cutAt && cutA > 0.5) return;   // beyond a cut the branch is gone
          alive = true;
          if (k === stickIdx && shown.settle > 0.5) settledHere = true;
          const f = shown.w[id] * (1 - shown.settle * (k === stickIdx ? 0 : 1)) * (1 - cutA);
          const v = shown.settle > 0.5 && k === stickIdx ? 0.62 : f * pulse(d);
          flow += v;
          if (k === stickIdx && shown.said[id] > 0.5) hot += v;
        });
        if (!alive) return;
        const coral = hot > flow * 0.5 && flow > 0;
        if (settledHere) {
          glyph(DBL[cell.pf[stickIdx]] || "═", cell.x, cell.y, INK.coral, 0.95, 6);
          return;
        }
        if (reduce && flow > 0.05) {
          // no moving packets: the same single line, brighter where more flows through it
          glyph(BOX[cell.f] || "─", cell.x, cell.y, coral ? INK.coral : INK.white, 0.25 + 0.6 * clamp(flow / 0.55, 0, 1), 0);
        } else if (flow > 0.14) {
          glyph(RAMP[Math.min(9, Math.max(2, Math.floor(flow * 10)))], cell.x, cell.y, coral ? INK.coral : INK.white, 0.5 + 0.5 * clamp(flow, 0, 1), flow > 0.5 ? 5 : 0);
        } else {
          glyph(BOX[cell.f] || "─", cell.x, cell.y, coral || (cell.users.some(u => u.k === stickIdx) && shown.said.stick > 0.5 && cell.y === g.paths[stickIdx].row) ? INK.railHot : INK.rail, 1);
        }
      });

      // arrows, cuts, names
      g.paths.forEach((p, k) => {
        const id = p.id, m = MEMBERS[k];
        const vis = clamp((reach - (p.end - 1)) / 3, 0, 1);
        if (vis <= 0) return;
        const cutA = shown.cut[id], said = shown.said[id], hotRow = said > 0.5;
        if (cutA > 0.02) {
          const glitch = cutA < 0.9 && !reduce;
          glyph(glitch ? pick("×x+/") : "×", p.cutAt, p.row, INK.cut, vis * cutA, 0);
        }
        const arrowA = vis * (1 - cutA * 0.85);
        const settledRow = shown.settle > 0.5 && k === stickIdx;
        glyph("▸", g.xa, p.row, hotRow ? INK.coral : INK.white, arrowA * (0.35 + 0.65 * clamp(shown.w[id], 0, 1)), settledRow ? 5 : 0);

        // a name resolves as far as the member comes to mind; only a said name is solid
        const L = shown.lvl[id] * (1 - cutA);
        g.labels[k].forEach(c => {
          if (c.c === " ") return;
          const ghostA = vis * (cutA > 0.5 ? 0.12 : 0.2);
          if (c.rank < L) {
            if (said > 0.5) glyph(c.c, c.x, c.y, INK.coral, vis * 0.98, 6);
            else glyph(c.c, c.x, c.y, INK.unsaid, vis * 0.72, 0);
          }
          else if (c.rank < L + 0.22 && !reduce && cutA < 0.5) glyph(pick(SCRAMBLE), c.x, c.y, INK.ghost, vis * 0.5);
          else glyph(c.c, c.x, c.y, INK.ghost, ghostA);
        });
        if (said > 0.02) glyph("◇", g.xl + m.label.length + 1, p.row, INK.coral, said * vis, 5);
      });

      // the question, once someone asks it
      if (shown.bracket > 0.02) {
        const a = shown.bracket, r0 = g.memberRows[0], r1 = g.memberRows[g.memberRows.length - 1];
        for (let y = r0; y <= r1; y++) {
          const ch = y === r0 ? "┐" : y === r1 ? "┘" : y === g.mid ? "├" : "│";
          glyph(ch, g.xq, y, INK.coral, a * 0.85);
        }
        glyph("─ ?", g.xq + 1, g.mid, INK.coral, a, 5);
        glyph("open", g.xq + 5, g.mid, INK.ghost, a * 0.8);
      }
      ctx.shadowBlur = 0;
    }

    // ---------- loop ----------
    function frame(now) {
      raf = requestAnimationFrame(frame);
      const dt = lastT ? Math.min(100, now - lastT) : 16;
      if (now - lastT < 1000 / 30) return;
      lastT = now; clock += dt;
      ease(dt);
      draw();
    }
    function sync() {
      const run = visible && !paused && !reduce;
      if (run && !raf) { lastT = 0; raf = requestAnimationFrame(frame); }
      if (!run && raf) { cancelAnimationFrame(raf); raf = 0; }
    }
    function settleNow() { copy(aim, shown); if (g) draw(); }

    // ---------- turns ----------
    function renderPrompt(k, typed) {
      const compare = k === "c";
      const order = compare ? [1, "c", null] : [1, 2, 3];
      promptEl.innerHTML = order.map(s => {
        if (s === null || (!compare && s > k)) return `<p class="empty"><span class="gt">&gt;</span></p>`;
        const [who, text] = TURNS[s], cur = s === k;
        const shownText = cur ? escape(text.slice(0, typed)) : escape(text);
        return `<p class="${cur ? "current" : ""}"><span class="gt">&gt;</span> <span class="who">${who}</span> ${shownText}${cur ? '<span class="cursor"></span>' : ""}</p>`;
      }).join("");
    }
    // types a turn; each trigger fires once the typed text reaches its word
    function type(k, triggers, done) {
      clearInterval(typing);
      const text = TURNS[k][1];
      const marks = triggers.map(([word, fn]) => ({ at: text.indexOf(word) + word.length, fn, fired: false }));
      const fire = i => marks.forEach(m => { if (!m.fired && i >= m.at) { m.fired = true; m.fn(); } });
      if (reduce) { renderPrompt(k, text.length); fire(text.length); settleNow(); done && done(); return; }
      let i = 0;
      renderPrompt(k, 0);
      typing = setInterval(() => {
        i += 1; renderPrompt(k, i); fire(i);
        if (i >= text.length) { clearInterval(typing); done && done(); }
      }, 30);
    }
    const TRIGGERS = {
      1: [["animal", () => setAim("1a")], ["branch", () => setAim("1b")]],
      2: [["insect", () => setAim("2")]],
      3: [["is.", () => setAim("3")]],
      c: [["insect", () => setAim("c")]],
    };

    function enter(k, done) {
      key = k;
      const compare = k === "c";
      fig.dataset.mode = compare ? "compare" : "exchange";
      goButtons.forEach(b => b.setAttribute("aria-pressed", String(!compare && +b.dataset.go === k)));
      if (compareBtn) compareBtn.setAttribute("aria-pressed", String(compare));
      tagEl.textContent = TAGS[k];
      if (stage !== BEFORE[k] && !(k === 1 && stage === "0")) { setAim(BEFORE[k], true); if (g) draw(); }
      type(k, TRIGGERS[k], done);
    }
    function play() {
      const token = ++chain;
      const step = k => enter(k, () => { if (k < 3) setTimeout(() => { if (token === chain) step(k + 1); }, 1700); });
      step(1);
    }
    function go(k) { chain++; started = true; enter(k); }

    fig.addEventListener("click", e => {
      const b = e.target.closest("[data-go], [data-compare], [data-pause]");
      if (!b) return;
      if (b.hasAttribute("data-pause")) {
        paused = !paused;
        b.setAttribute("aria-pressed", String(paused));
        b.setAttribute("aria-label", paused ? "Play" : "Pause");
        b.textContent = paused ? "▶" : "❚❚";
        return sync();
      }
      if (b.hasAttribute("data-compare")) return go(key === "c" ? 3 : "c");
      if (b.dataset.go === "replay") { started = true; setAim("0", true); return reduce ? go(3) : play(); }
      go(+b.dataset.go);
    });

    // ---------- start ----------
    let lastWidth = 0;
    function start() {
      build();
      setAim("0", true);
      lastWidth = canvas.clientWidth;
      new ResizeObserver(() => {
        if (canvas.clientWidth === lastWidth) return;
        lastWidth = canvas.clientWidth;
        build(); draw();
      }).observe(canvas);
      narrow.addEventListener("change", () => { build(); draw(); });
      renderPrompt(0, 0);
      tagEl.textContent = TAGS[0];
      draw();
      if (reduce) {
        started = true;
        setAim("3", true); renderPrompt(3, TURNS[3][1].length); tagEl.textContent = TAGS[3];
        goButtons.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.go === "3")));
        draw();
      }
      new IntersectionObserver(entries => {
        visible = entries.some(e => e.isIntersecting);
        if (visible && !started) { started = true; play(); }
        sync();
      }, { threshold: 0.3 }).observe(fig);
    }
    const fonts = document.fonts ? document.fonts.load('10px "IBM Plex Mono"') : Promise.resolve();
    Promise.race([fonts, new Promise(r => setTimeout(r, 1500))]).then(start);
  }

  document.querySelectorAll("[data-mapping]").forEach(init);
})();
