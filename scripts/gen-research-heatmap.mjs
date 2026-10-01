import { readFileSync, writeFileSync } from 'node:fs';
const data = JSON.parse(readFileSync(new URL('../src/data/figures/framing-carry.json', import.meta.url)));
if (data.layers.length !== 28 || data.layers.some(([layer, values], i) => layer !== i || values.length !== 7 || values.some(v => !Number.isFinite(Number(v))))) throw new Error('Expected the complete 28-layer × 7-position report table.');
const escape = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const color = value => {
  const t = Math.min(1, Math.abs(value) / 1.25);
  const end = value < 0 ? [197,110,60] : [23,69,122];
  return `rgb(${end.map(n => Math.round(255 + (n - 255)*t)).join(',')})`;
};
const x0=174, y0=62, cw=21, ch=31;
let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="860" height="365" viewBox="0 0 860 365" role="img" aria-labelledby="title desc"><title id="title">Where activation patching changes the answer</title><desc id="desc">Qwen2.5-7B, all 28 layers and seven tested positions. Colour shows the share of the aggregate greater-good versus duty contrast reconstructed by a same-item patch. Earlier layers carry the effect at the slogan's last word; later layers at the decision position. Zero prefix controls are retained. Values are the rounded presentation table, 32 runs per cell.</desc><rect width="860" height="365" fill="white"/><g font-family="Georgia,serif" fill="#16181d"><text x="174" y="25" font-size="20">Qwen2.5-7B · same-item activation patching</text>`;
const labels=['Prefix (−55)','Prefix (−26)','the / doing (−25)','greater / your (−24)','good / duty (−23)','Full stop (−22)','Decision (−1)'];
labels.forEach((label,j)=> {
 svg+=`<text x="160" y="${y0+j*ch+21}" text-anchor="end" font-size="15">${escape(label)}</text>`;
 data.layers.forEach(([layer,values])=> {
  const value=Number(values[j]);
  svg+=`<rect x="${x0+layer*cw}" y="${y0+j*ch}" width="${cw}" height="${ch}" fill="${color(value)}" stroke="#dedfe2" stroke-width="0.4"><title>Layer ${layer}, position ${data.positions[j]}: ${values[j]}</title></rect>`;
 });
});
for(let i=0;i<28;i+=3) svg+=`<text x="${x0+i*cw+cw/2}" y="301" text-anchor="middle" font-size="15">${i}</text>`;
svg+='<text x="468" y="326" text-anchor="middle" font-size="17">Transformer layer</text>';
for(let i=0;i<145;i++) {
 const val=1.25-i/100;
 svg+=`<rect x="792" y="${y0+i*217/145}" width="12" height="${217/145+0.1}" fill="${color(val)}"/>`;
}
for(const v of [-0.2,0,0.5,1,1.25]) svg+=`<text x="811" y="${y0+(1.25-v)/1.45*217+5}" font-size="14">${v}</text>`;
svg+='<text x="792" y="48" font-size="15">Carry</text><text x="174" y="352" fill="#4c515c" font-size="14">16 items × 2 answer orders · 1 = full aggregate contrast · negative values retained</text></g></svg>';
writeFileSync(new URL('../public/images/research/framing-carry.svg',import.meta.url),svg);
console.log('Rendered all 196 cells from the frozen report table.');
// Portrait version retains the same cells while making token/layer labels readable on phones.
let mobile=`<svg xmlns="http://www.w3.org/2000/svg" width="430" height="590" viewBox="0 0 430 590" role="img" aria-labelledby="title desc"><title id="title">Qwen2.5-7B layer-by-token patching heatmap</title><desc id="desc">The same complete 28 by 7 report table, with layers running downward. Darker blue marks stronger reconstruction; pale orange marks negative carry. Each cell aggregates 16 items in two answer orders.</desc><rect width="430" height="590" fill="white"/><g font-family="Georgia,serif" fill="#16181d"><text x="48" y="24" font-size="18">Qwen2.5-7B · activation patching</text>`;
data.positions.forEach((pos,j)=>{mobile+=`<text x="${48+j*42+21}" y="52" text-anchor="middle" font-size="15">${String(pos).replace('-','−')}</text>`;});
data.layers.forEach(([layer,values])=> {
 if(layer%3===0) mobile+=`<text x="40" y="${62+layer*16+13}" text-anchor="end" font-size="15">${layer}</text>`;
 values.forEach((value,j)=> {mobile+=`<rect x="${48+j*42}" y="${62+layer*16}" width="42" height="16" fill="${color(Number(value))}" stroke="#dedfe2" stroke-width="0.4"><title>Layer ${layer}, position ${data.positions[j]}: ${value}</title></rect>`;});
});
mobile+='<text transform="translate(15 292) rotate(-90)" text-anchor="middle" font-size="16">Transformer layer</text><text x="359" y="52" font-size="15">Carry</text>';
for(let i=0;i<145;i++) mobile+=`<rect x="359" y="${62+i*448/145}" width="10" height="${448/145+0.1}" fill="${color(1.25-i/100)}"/>`;
for(const v of [-0.2,0,0.5,1,1.25]) mobile+=`<text x="375" y="${62+(1.25-v)/1.45*448+5}" font-size="14">${v}</text>`;
mobile+='<text x="48" y="536" font-size="15">−55 / −26: unchanged prefix controls</text><text x="48" y="558" font-size="15">−25…−23: slogan words · −22: full stop</text><text x="48" y="580" font-size="15">−23: last slogan word · −1: decision position</text></g></svg>';
writeFileSync(new URL('../public/images/research/framing-carry-mobile.svg',import.meta.url),mobile);

// Cover: show the complete heatmap body, keeping labels in the linked full figure.
writeFileSync(new URL('../public/images/research/framing-carry-cover.svg',import.meta.url),
  svg.replace('width="860" height="365" viewBox="0 0 860 365"', 'width="600" height="230" viewBox="168 56 600 230"'));
