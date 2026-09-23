/* Homepage Fig. 1, possibility space (2026-09-23).
   The square is everything "animal" allows: a solid field of its six letters, drifting slowly left to right.
   The kinds it could pick out are written into the field in darker ink, each covering its share of the square:
   typicality after "animal", then the context. Every kind keeps its row and its side and only grows or shrinks,
   and the letters stay on one fixed grid while the words move across it. Ink is whether a kind has been said:
   "might" turns one black and leaves its area as it was. Plays on a loop: animal → in the tree → might → again.
   Hooks inside [data-space]: canvas[data-field], [data-pause]. Colours come from CSS custom properties. */
(() => {
  const TERM = "animal";
  const FILL = "animal", CAPS = "ANIMAL";       // the field is these six letters, over and over; inside a word they are capitals
  const CONTEXT = "in the tree";
  const MIGHT = ["it ", "might", " be an insect"];
  const WORDS = { bird: "BIRD", dog: "DOG", cat: "CAT", monkey: "MONKEY", pig: "PIG", insect: "INSECT", cow: "COW", fish: "FISH" };
  const TARGET = "insect";
  // fixed rows, top to bottom; the order keeps every word within a few letters of where it started
  const ROWS = [["bird"], ["dog", "cat"], ["monkey"], ["pig", "insect"], ["cow", "fish"]];
  // shares of the square; illustrative, not measured
  const SHARES = {
    animal: { bird: 0.19, dog: 0.2, cat: 0.095, monkey: 0.175, pig: 0.065, insect: 0.065, cow: 0.095, fish: 0.115 },
    tree: { bird: 0.28, dog: 0.07, cat: 0.105, monkey: 0.215, pig: 0.055, insect: 0.15, cow: 0.055, fish: 0.07 },
  };
  // ink of the field, of a kind nobody has said, of a kind that has been said
  const INK = { field: 0.1, unsaid: 0.6, said: 1 };
  // one loop, in ms: the context arrives, then might, then the square returns to where it began
  const T = { context: 3800, might: 8600, back: 13600, loop: 15400 };
  const STEP = 420;                             // ms per step of the drifting letters
  const MONO = '"IBM Plex Mono", Menlo, monospace', FACE = '"Helvetica Neue", Arial, sans-serif';
  const SIDE = 360;                             // the square's side at most, in px
  const TRACK = 12, SX = 2, SY = 3, PAD = 0.45, LEVELS = 24;

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrow = matchMedia("(max-width: 600px)");
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const smooth = t => t * t * (3 - 2 * t);
  const ids = Object.keys(WORDS);

  function init(fig) {
    const canvas = fig.querySelector("canvas[data-field]"), ctx = canvas.getContext("2d");
    const pauseBtn = fig.querySelector("[data-pause]");
    const css = getComputedStyle(canvas), read = (name, fallback) => css.getPropertyValue(name).trim() || fallback;
    const RGB = { strong: read("--ink-strong", "22,24,29"), said: read("--ink-said", "216,90,48") };

    let g = null, paused = false, visible = false, raf = 0, lastT = 0, run = 0, lastKey = "";
    let clock = reduce ? T.back - 1 : 0;
    const shown = { p: 0, alpha: 0 };

    // ---------- layout: the same rows in every state; heights and widths follow the shares, so every
    // area is exact and every word stays where it is, growing or shrinking in place ----------
    function layout(shares, S) {
      const out = {};
      let y = 0;
      ROWS.forEach(row => {
        const r = row.reduce((a, id) => a + shares[id], 0), h = r * S;
        let x = 0;
        row.forEach(id => { const w = shares[id] / r * S; out[id] = { x, y, w, h }; x += w; });
        y += h;
      });
      return out;
    }

    function build() {
      const phone = narrow.matches;
      const fs = phone ? 11 : 12, lh = Math.round(fs * 1.3);
      const width = canvas.clientWidth, dpr = window.devicePixelRatio || 1;
      const termPx = phone ? 18 : 24;
      ctx.font = `500 ${termPx}px ${MONO}`;
      const termW = ctx.measureText(TERM).width;
      ctx.font = `${fs}px ${MONO}`;
      const labelW = ctx.measureText(MIGHT.join("")).width;
      // side by side, as one centred group, if the square keeps at least 280px; otherwise the term and
      // the labels sit above the square
      const lead = termW + 14 + labelW + 36 + 12;          // the term, the arrow under its labels, a gap
      const sideBySide = width - lead >= 280;
      const S = Math.floor(Math.min(SIDE, sideBySide ? width - lead : width - 2));
      const topH = sideBySide ? 0 : termPx + 3 * lh + 16;
      const height = topH + S;
      canvas.style.height = height + "px";
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      const x0 = sideBySide ? Math.floor((width - lead - S) / 2) : 0;
      const sqX = sideBySide ? x0 + lead : Math.floor((width - S) / 2), sqY = topH;
      // the field: one grid of letters over the whole square
      const cf = S < 400 ? 5 : 6;
      ctx.font = `500 ${cf}px ${MONO}`;
      const cw = ctx.measureText(CAPS).width / 6;
      const rows = Math.round(S / cf), rh = S / rows;
      const cols = Math.floor(S / cw), gx = (S - cols * cw) / 2;
      // offscreen, SX × SY samples per cell, to find how much of each cell a word covers
      const off = document.createElement("canvas");
      off.width = cols * SX; off.height = rows * SY;
      const octx = off.getContext("2d", { willReadFrequently: true });
      const tracks = "letterSpacing" in octx;
      // each word's ink box at 100px, at the base tracking
      octx.font = `700 100px ${FACE}`;
      if (tracks) octx.letterSpacing = `${TRACK}px`;
      const shape = {};
      ids.forEach(id => {
        const m = octx.measureText(WORDS[id]);
        shape[id] = { left: m.actualBoundingBoxLeft, w: m.actualBoundingBoxLeft + m.actualBoundingBoxRight,
                      up: m.actualBoundingBoxAscent, h: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent,
                      gaps: WORDS[id].length - 1 };
      });
      // each row starts on its own letter, so no column is one letter all the way down
      const phase = Array.from({ length: rows }, (_, r) => (r * 5 + ((r * r) % 7)) % 6);
      g = { width, height, dpr, fs, lh, termPx, termW, sideBySide, S, x0, sqX, sqY, cf, cw, rows, rh, cols, gx,
            off, octx, tracks, shape, phase, cov: null, covKey: "",
            from: layout(SHARES.animal, S), to: layout(SHARES.tree, S) };
      lastKey = "";
    }

    // ---------- how much of each cell the words cover: every word stretched to fill its place ----------
    function cover(rects) {
      const { octx, off, cols, rows, cw, rh, gx, shape } = g;
      octx.setTransform(1, 0, 0, 1, 0, 0);
      octx.clearRect(0, 0, off.width, off.height);
      octx.fillStyle = "#000"; octx.textAlign = "left"; octx.textBaseline = "alphabetic";
      octx.font = `700 100px ${FACE}`;
      const kx = SX / cw, ky = SY / rh;
      ids.forEach(id => {
        const r = rects[id], s = shape[id];
        const bw = r.w - 2 * PAD * cw, bh = r.h - 2 * PAD * rh;
        if (bw < 2 || bh < 2) return;
        // a place wider than the word gets more space between letters first, then wider letters
        let track = TRACK, w = s.w;
        if (g.tracks && s.gaps) {
          const want = (bw / bh) * s.h;
          if (want > w) { const extra = Math.min((want - w) / s.gaps, 40); track += extra; w += extra * s.gaps; }
          octx.letterSpacing = `${track}px`;
        }
        const sx = (bw / w) * kx, sy = (bh / s.h) * ky;
        octx.setTransform(sx, 0, 0, sy, (r.x + PAD * cw - gx) * kx + s.left * sx, (r.y + PAD * rh) * ky + s.up * sy);
        octx.fillText(WORDS[id], 0, 0);
      });
      const data = octx.getImageData(0, 0, off.width, off.height).data, W = off.width;
      const cov = new Float32Array(cols * rows), full = 255 * SX * SY;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let a = 0;
          for (let j = 0; j < SY; j++) {
            const base = ((y * SY + j) * W + x * SX) * 4 + 3;
            for (let i = 0; i < SX; i++) a += data[base + i * 4];
          }
          cov[y * cols + x] = a / full;
        }
      }
      return cov;
    }

    // ---------- where the loop is: the square's layout, the insect's ink, how much of each label shows ----------
    function aims(t) {
      return {
        p: t >= T.context && t < T.back ? 1 : 0,
        alpha: t >= T.might && t < T.back ? 1 : 0,
        context: t >= T.context ? Math.floor((t - T.context) / 45) : 0,     // labels stay written, then fade
        might: t >= T.might ? Math.floor((t - T.might) / 45) : 0,
        fade: t >= T.back ? 1 - clamp((t - T.back) / 700, 0, 1) : 1,
      };
    }

    function text(str, x, y, rgb, a, px, weight) {
      ctx.font = `${weight || 400} ${px || g.fs}px ${MONO}`;
      ctx.fillStyle = `rgba(${rgb},${a})`;
      ctx.fillText(str, x, y);
    }

    function draw(t, dt) {
      const A = aims(t), k = 1 - Math.exp(-dt / 650);
      shown.p += (A.p - shown.p) * (reduce ? 1 : k);
      shown.alpha += (A.alpha - shown.alpha) * (reduce ? 1 : k);
      const p = smooth(clamp(shown.p, 0, 1)), said = clamp(shown.alpha, 0, 1);
      const flow = reduce ? 0 : Math.floor(run / STEP);
      const key = [p.toFixed(4), said.toFixed(3), flow, A.context, A.might, A.fade.toFixed(2)].join();
      if (key === lastKey) return;
      lastKey = key;

      const { dpr } = g;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, g.width, g.height);
      ctx.textBaseline = "alphabetic";

      // the term, the arrow, and what has been said with it
      const midY = g.sqY + g.S / 2;
      let labelX, contextY, mightY;
      ctx.strokeStyle = `rgba(${RGB.strong},0.45)`; ctx.lineWidth = 1;
      if (g.sideBySide) {
        text(TERM, g.x0, midY + g.termPx * 0.35, RGB.strong, 0.96, g.termPx, 500);
        const ax0 = g.x0 + g.termW + 14, ax1 = g.sqX - 12;
        ctx.beginPath(); ctx.moveTo(ax0, midY + 0.5); ctx.lineTo(ax1, midY + 0.5); ctx.stroke();
        text("▶", ax1 - 6, midY + 4, RGB.strong, 0.7, 9);
        labelX = ax0 + 6; contextY = midY - 10; mightY = midY + g.lh + 6;
      } else {
        text(TERM, g.sqX, g.termPx, RGB.strong, 0.96, g.termPx, 500);
        const ax0 = g.sqX + 8, ay = g.termPx + 8;
        ctx.beginPath(); ctx.moveTo(ax0 + 0.5, ay); ctx.lineTo(ax0 + 0.5, g.sqY - 7); ctx.stroke();
        text("▼", ax0 - 3, g.sqY - 2, RGB.strong, 0.7, 9);
        labelX = ax0 + 14; contextY = ay + g.lh; mightY = ay + 2 * g.lh + 4;
      }
      const ctxText = CONTEXT.slice(0, A.context);
      if (ctxText) text(ctxText, labelX, contextY, RGB.strong, 0.9 * A.fade);
      const mightText = MIGHT.join("").slice(0, A.might);
      if (mightText) {
        let x = labelX, left = mightText.length;
        MIGHT.forEach((part, i) => {
          const piece = part.slice(0, Math.max(0, left));
          left -= part.length;
          if (!piece) return;
          text(piece, x, mightY, i === 1 ? RGB.said : RGB.strong, 0.9 * A.fade, g.fs, i === 1 ? 500 : 400);
          x += ctx.measureText(piece).width;
        });
      }

      // the square: where each kind is now, how much of each cell its word covers
      const rects = {};
      ids.forEach(id => {
        const a = g.from[id], b = g.to[id];
        rects[id] = { x: a.x + (b.x - a.x) * p, y: a.y + (b.y - a.y) * p, w: a.w + (b.w - a.w) * p, h: a.h + (b.h - a.h) * p };
      });
      const covKey = p.toFixed(4);
      if (covKey !== g.covKey) { g.cov = cover(rects); g.covKey = covKey; }
      const { cov, cols, rows, cw, rh, gx, phase } = g;
      // cells of the said kind: its word turns black and its field darkens a little
      const tr = rects[TARGET];
      const tx0 = Math.ceil((tr.x - gx) / cw - 0.5), tx1 = Math.ceil((tr.x + tr.w - gx) / cw - 0.5) - 1;
      const ty0 = Math.ceil(tr.y / rh - 0.5), ty1 = Math.ceil((tr.y + tr.h) / rh - 0.5) - 1;
      // one run of text per stretch of equal ink, drawn level by level; a word's cells take the capitals
      const runs = Array.from({ length: LEVELS + 1 }, () => []);
      for (let y = 0; y < rows; y++) {
        let cur = -1, start = 0, str = "";
        const inRow = y >= ty0 && y <= ty1;
        for (let x = 0; x <= cols; x++) {
          let lev = -1, c = 0;
          if (x < cols) {
            const s = inRow && x >= tx0 && x <= tx1 ? said : 0;
            const lo = INK.field + 0.07 * s, hi = INK.unsaid + (INK.said - INK.unsaid) * s;
            c = cov[y * cols + x];
            lev = Math.round((lo + (hi - lo) * smooth(c)) * LEVELS);
          }
          if (lev !== cur) {
            if (cur >= 0) runs[cur].push(start, y, str);
            cur = lev; start = x; str = "";
          }
          if (x < cols) str += (c > 0.5 ? CAPS : FILL)[(((x - flow + phase[y]) % 6) + 6) % 6];
        }
      }
      ctx.font = `500 ${g.cf}px ${MONO}`;
      const lift = rh / 2 + g.cf * 0.35;
      runs.forEach((list, lev) => {
        if (!list.length) return;
        ctx.fillStyle = `rgba(${RGB.strong},${lev / LEVELS})`;
        for (let i = 0; i < list.length; i += 3) ctx.fillText(list[i + 2], g.sqX + gx + list[i] * cw, g.sqY + list[i + 1] * rh + lift);
      });
    }

    // ---------- loop: runs while visible and not paused ----------
    function frame(now) {
      raf = requestAnimationFrame(frame);
      const dt = lastT ? Math.min(100, now - lastT) : 16;
      if (now - lastT < 1000 / 24) return;
      lastT = now;
      clock = (clock + dt) % T.loop;
      run += dt;
      draw(clock, dt);
    }
    function sync() {
      const go = visible && !paused && !reduce;
      if (go && !raf) { lastT = 0; raf = requestAnimationFrame(frame); }
      if (!go && raf) { cancelAnimationFrame(raf); raf = 0; }
    }
    if (pauseBtn) pauseBtn.addEventListener("click", () => {
      paused = !paused;
      pauseBtn.setAttribute("aria-pressed", String(paused));
      pauseBtn.setAttribute("aria-label", paused ? "Play" : "Pause");
      pauseBtn.textContent = paused ? "▶" : "❚❚";
      sync();
    });

    let lastWidth = 0;
    function start() {
      build();
      lastWidth = canvas.clientWidth;
      new ResizeObserver(() => {
        if (canvas.clientWidth === lastWidth) return;
        lastWidth = canvas.clientWidth;
        build(); draw(clock, 16);
      }).observe(canvas);
      narrow.addEventListener("change", () => { build(); draw(clock, 16); });
      draw(clock, 16);
      new IntersectionObserver(entries => {
        visible = entries.some(e => e.isIntersecting);
        sync();
      }, { threshold: 0.2 }).observe(fig);
    }
    const fonts = document.fonts ? document.fonts.load(`12px ${MONO}`) : Promise.resolve();
    Promise.race([fonts, new Promise(r => setTimeout(r, 1500))]).then(start);
  }

  document.querySelectorAll("[data-space]").forEach(init);
})();
