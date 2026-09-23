// Fixed-grid letterpress mosaic. One timeline determines the forward and return frames.
// Mention affects colour and type weight, never geometry.
const INITIAL = [0.32, 0.34, 0.26, 0.08];
const CONTEXT = [0.43, 0.08, 0.35, 0.14];
export const LOOP_MS = 14000;
const smooth = (x) => { const t = Math.max(0, Math.min(1, x)); return t * t * (3 - 2 * t); };
export function frameAt(elapsed) {
  const t = ((elapsed % LOOP_MS) + LOOP_MS) % LOOP_MS;
  const returning = smooth((t - 11000) / 3000);
  const context = smooth((t - 2600) / 1250) * (1 - returning);
  const mention = smooth((t - 6900) / 1100) * (1 - returning);
  return { context, mention, weights: INITIAL.map((w, i) => w + (CONTEXT[i] - w) * context),
    phase: t < 2600 ? 'animal' : t < 6900 ? 'context' : t < 11000 ? 'mentioned' : 'return' };
}
export function regionsFor(weights, width, height) {
  const left = weights[0] + weights[1], x = left * width;
  const a = weights[0] / left * height, b = weights[2] / (1 - left) * height;
  return [[0, 0, x, a], [0, a, x, height - a], [x, 0, width - x, b], [x, b, width - x, height - b]];
}
function init(fig) {
  if (fig.dataset.initialized) return;
  fig.dataset.initialized = 'true';
  const field = fig.querySelector('[data-field]'), canvas = field.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const regions = [...fig.querySelectorAll('[data-kind]')], lines = [...fig.querySelectorAll('[data-line]')];
  const mentioned = fig.querySelector('[data-mentioned]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const font = getComputedStyle(fig).getPropertyValue('--font-mono').trim() || 'Menlo, monospace';
  let width = 0, height = 0, clock = 0, raf = 0, previous = null, drawnAt = -Infinity;
  let visible = false, focused = false, disposed = false, lastKey = '';
  const observer = new ResizeObserver(resize);
  const intersection = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting); sync();
  }, { threshold:0.12 });
  function draw(force = false) {
    if (!width || !height) return;
    const state = frameAt(reduced.matches ? 10000 : clock);
    const key = state.context.toFixed(4) + '/' + state.mention.toFixed(4);
    if (!force && key === lastKey) return;
    lastKey = key;
    fig.dataset.phase = state.phase;
    const activeLine = state.mention > 0.08 ? 2 : state.context > 0.08 ? 1 : 0;
    lines.forEach((line, i) => {
      line.classList.toggle('is-current', i === activeLine);
      line.style.opacity = i === activeLine ? '1' : i < activeLine ? '0.48' : '0.12';
    });
    lines[2].style.color = activeLine === 2 ? '#9b4d2e' : '';
    const ink = [40, 40, 37].map((v, i) => Math.round(v + ([155, 77, 46][i] - v) * state.mention));
    mentioned.style.color = `rgb(${ink.join(',')})`;
    mentioned.style.fontWeight = state.mention > 0.45 ? '700' : '400';
    const rects = regionsFor(state.weights, width, height);
    ctx.clearRect(0, 0, width, height);
    const narrow = width < 450, cell = narrow ? 7.1 : 8.1, row = narrow ? 11.4 : 12;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    rects.forEach(([x, y, w, h], i) => {
      const region = regions[i];
      region.style.left = `${x}px`; region.style.top = `${y}px`;
      region.style.width = `${w}px`; region.style.height = `${h}px`;
      const said = i === 3 ? state.mention : 0;
      const rgb = [105, 105, 95].map((v, c) => Math.round(v + ([155, 77, 46][c] - v) * said));
      ctx.fillStyle = `rgb(${rgb.join(',')})`;
      ctx.font = `${said > 0.45 ? 600 : 400} ${narrow ? 8.5 : 9}px ${font}`;
      ctx.save(); ctx.beginPath(); ctx.rect(x + 4, y + 3, Math.max(0, w - 8), Math.max(0, h - 6)); ctx.clip();
      for (let gy = 0; gy < Math.ceil(height / row); gy++) {
        const py = gy * row + row / 2;
        if (py < y + 3 || py > y + h - 3) continue;
        for (let gx = 0; gx < Math.ceil(width / cell); gx++) {
          const px = gx * cell + cell / 2;
          if (px < x + 4 || px > x + w - 4) continue;
          const pos = (gx + (gy % 3) * 2) % 8;
          if (pos < 6) ctx.fillText('ANIMAL'[pos], px, py);
        }
      }
      ctx.restore();
    });
  }
  function resize() {
    width = field.clientWidth; height = field.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw(true);
  }
  function tick(now) {
    raf = 0;
    if (previous !== null) clock = (clock + Math.min(now - previous, 100)) % LOOP_MS;
    previous = now;
    if (now - drawnAt >= 1000 / 30) { draw(); drawnAt = now; }
    raf = requestAnimationFrame(tick);
  }
  function sync() {
    const running = !disposed && visible && !document.hidden && !focused && !reduced.matches;
    if (!running && raf) { cancelAnimationFrame(raf); raf = 0; previous = null; }
    if (running && !raf) { previous = null; raf = requestAnimationFrame(tick); }
    if (reduced.matches) draw(true);
  }
  fig.addEventListener('focusin', () => { focused = true; sync(); });
  fig.addEventListener('focusout', event => { focused = fig.contains(event.relatedTarget); sync(); });
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  observer.observe(field); resize(); intersection.observe(fig);
  document.fonts?.ready.then(() => { if (!disposed) draw(true); });
  document.addEventListener('astro:before-swap', () => {
    disposed = true; sync(); observer.disconnect(); intersection.disconnect();
    document.removeEventListener('visibilitychange', sync); reduced.removeEventListener('change', sync);
  }, { once:true });
}
if (typeof document !== 'undefined') {
  const start = () => document.querySelectorAll('[data-space]').forEach(init);
  start(); document.addEventListener('astro:page-load', start);
}
