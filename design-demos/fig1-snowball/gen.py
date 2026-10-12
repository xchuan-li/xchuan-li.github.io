"""Fig. 1 draft, 12 Oct 2026 (XC): two acts.
Act 1 is the current figure (src/components/MeaningBridgeFigure.astro, copied verbatim).
Act 2, two scenes for XC to compare:
  bubble - the robot's head, bottom left, thinks; in its thought bubble the meaning of the
           same sentence rolls up into a snowball, token by token (Llama 2 segmentation).
  push   - XC: the bubble metaphor costs the reader effort; instead the robot pushes the
           snowball uphill along the tokens (a quiet echo of Sisyphus: the loop starts over).
Two renderings of the snowball: letters (ink = said) or pixels.
Run: python3 gen.py  ->  draft.html
"""
import math
import pathlib
import re

HERE = pathlib.Path(__file__).parent
SRC = HERE.parent.parent / "src/components/MeaningBridgeFigure.astro"
comp = SRC.read_text(encoding="utf-8")
act1 = re.search(r"<svg.*?</svg>", comp, re.S).group(0)
style = re.search(r"<style>(.*?)</style>", comp, re.S).group(1)


def cloud(x0, y0, x1, y1, step=38, bump=0.62):
    """Scalloped outline along a rounded rectangle; every segment is an outward arc."""
    r = 40
    pts = []

    def edge(ax, ay, bx, by):
        n = max(1, round(math.hypot(bx - ax, by - ay) / step))
        for i in range(n):
            t = i / n
            pts.append((ax + (bx - ax) * t, ay + (by - ay) * t))

    edge(x0 + r, y0, x1 - r, y0)
    edge(x1 - r, y0, x1, y0 + r)
    edge(x1, y0 + r, x1, y1 - r)
    edge(x1, y1 - r, x1 - r, y1)
    edge(x1 - r, y1, x0 + r, y1)
    edge(x0 + r, y1, x0, y1 - r)
    edge(x0, y1 - r, x0, y0 + r)
    edge(x0, y0 + r, x0 + r, y0)
    d = f"M{pts[0][0]:.1f} {pts[0][1]:.1f}"
    for i in range(len(pts)):
        bx, by = pts[(i + 1) % len(pts)]
        ax, ay = pts[i]
        rr = math.hypot(bx - ax, by - ay) * bump
        d += f" A{rr:.1f} {rr:.1f} 0 0 1 {bx:.1f} {by:.1f}"
    return d + " Z"


BOIL = """<filter id="{id}" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="1" result="n">
        <animate attributeName="seed" values="1;4;8" dur="1.2s" calcMode="discrete" repeatCount="indefinite"/>
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2"/>
    </filter>"""

ROBOT = """<path d="M631 290 L631 276" fill="none"/><circle cx="631" cy="271" r="5" fill="#e03a2f"/>
      <path d="M600 292 L664 290 L666 338 L598 340 Z" fill="#b9bec4"/>
      <path d="M612 306 L622 306 L622 316 L612 316 Z M640 306 L650 306 L650 316 L640 316 Z" fill="#141414"/>
      <path d="M614 328 L648 327" fill="none" stroke-width="2.4"/>
      <path d="M588 340 L676 338 L678 412 L586 414 Z" fill="#b9bec4"/>
      <path d="M604 355 L633 380 L658 355 M604 355 L611 397 L633 380 L658 398" fill="none" stroke-width="2.4"/>
      <g fill="#fff" stroke-width="2.4"><circle cx="604" cy="355" r="6"/><circle cx="658" cy="355" r="6"/>
        <circle cx="633" cy="380" r="6"/><circle cx="611" cy="397" r="6"/><circle cx="658" cy="398" r="6"/></g>
      <path d="M678 338 L722 326 L724 402 L678 412 Z" fill="#9aa0a6" stroke-width="2.6"/>
      <path d="M612 414 L606 436 M652 413 L660 436" fill="none" stroke-width="4"/>"""

act2a = f"""<svg viewBox="0 0 741 275" role="img" aria-label="A robot's head, bottom left, is thinking. In its thought bubble, the meaning of the sentence rolls up into a snowball, token by token.">
  <defs>{BOIL.format(id="bA")}</defs>
  <g filter="url(#bA)" stroke="#141414" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">
    <path d="M6 6 L734.8 4 L735.8 268.7 L4 269.7 Z" fill="#fff"/>
    <path d="{cloud(214, 22, 712, 236)}" fill="#fdfbf4" stroke-width="2.4"/>
    <ellipse cx="140" cy="182" rx="7" ry="6" fill="#fdfbf4" stroke-width="2.2"/>
    <ellipse cx="164" cy="160" rx="10" ry="8.5" fill="#fdfbf4" stroke-width="2.2"/>
    <ellipse cx="193" cy="134" rx="13" ry="11" fill="#fdfbf4" stroke-width="2.2"/>
    <path d="M256 196 L668 207" fill="none" stroke-width="2"/>
    <g transform="translate(-545,-93)">
      <path d="M631 290 L631 276" fill="none"/><circle cx="631" cy="271" r="5" fill="#e03a2f"/>
      <path d="M600 292 L664 290 L666 338 L598 340 Z" fill="#b9bec4"/>
      <path d="M615 302 L625 302 L625 312 L615 312 Z M643 302 L653 302 L653 312 L643 312 Z" fill="#141414"/>
      <path d="M618 328 L644 327" fill="none" stroke-width="2.4"/>
      <path d="M588 340 L676 338 L677 366 L587 367 Z" fill="#b9bec4"/>
    </g>
  </g>
  <g id="tokA" stroke-width="1.5" stroke="#141414"></g>
  <g id="dynA"></g>
</svg>"""

act2b = f"""<svg viewBox="0 0 741 275" role="img" aria-label="A robot pushes a snowball uphill along the tokens of the sentence; the snowball grows as it rolls and loses a few pieces on the way.">
  <defs>{BOIL.format(id="bB")}</defs>
  <g filter="url(#bB)" stroke="#141414" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">
    <path d="M6 6 L734.8 4 L735.8 268.7 L4 269.7 Z" fill="#fff"/>
    <path d="M14 238 L726 163 L727 262 L13 263 Z" fill="#fdfbf4" stroke="none"/>
    <path d="M14 238 L726 163" fill="none" stroke-width="2.4"/>
  </g>
  <g id="tokB" stroke-width="1.5" stroke="#141414"></g>
  <g id="pusher" filter="url(#bB)" stroke="#141414" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">
    <g id="pusherBody">{ROBOT}</g>
  </g>
  <g id="dynB"></g>
</svg>"""

page = f"""<!doctype html>
<html lang="zh"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Fig. 1 雪球草稿</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Patrick+Hand&family=IBM+Plex+Mono&display=swap">
<style>
body{{margin:0;padding:24px 16px;font:14px/1.6 -apple-system,"PingFang SC",sans-serif;color:#141414;background:#fff}}
.wrap{{max-width:600px;margin:0 auto}}
.stage{{position:relative}}
.act{{transition:opacity .6s}} .act.off{{opacity:0;position:absolute;inset:0;pointer-events:none}}
.bar{{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}}
button{{font:13px -apple-system,sans-serif;padding:6px 12px;border:1px solid #c9ccd0;border-radius:6px;background:#fff;cursor:pointer}}
button.on{{border-color:#141414}}
.note{{color:#6b7177;font-size:13px}}
{style}
text.c{{font-family:"IBM Plex Mono",monospace;font-size:12px}}
#tokA text,#tokB text{{font-size:18px}}
</style></head><body><div class="wrap">
<p class="note">草稿，不是网站代码。第一幕＝现在的 Fig. 1，原样不动。第二幕两个场景：思考泡泡（机器人的头在左下角想，泡泡里滚雪球）和推雪球（机器人推着雪球上坡，沿路粘上词）。雪球两种画法。</p>
<div class="bar"><button id="bA">第一幕</button><button id="bB">第二幕</button><button id="bL" class="on">自动循环</button></div>
<div class="bar"><button id="sA">思考泡泡</button><button id="sB" class="on">推雪球</button><span style="width:12px"></span><button id="v1" class="on">字符雪球</button><button id="v2">像素雪球</button></div>
<div class="stage"><div class="act" id="act1"><figure class="mbfig" style="margin:0">{act1}</figure></div>
<div class="act off" id="act2a"><figure class="mbfig" style="margin:0">{act2a}</figure></div>
<div class="act off" id="act2b"><figure class="mbfig" style="margin:0">{act2b}</figure></div></div>
<p class="note">字符雪球：塞满已经说出的字母，原地变化；红字是还没拼成整词的碎片（k、s、ung、lass），拼完变黑。像素雪球：颜色代表信息种类（可能性、指称、动作、宾语）。两版都会掉下几块；推雪球场景里，掉下的沿坡滚回去。</p>
</div>
<script>
const NS='http://www.w3.org/2000/svg';
const WORDS=[['Maybe','pos'],['the','ref'],['k','frag'],['ids','ref'],['took','act'],['my','obj'],['s','frag'],['ung','frag'],['lass','frag'],['es','obj'],['.','end']];
const CUT=new Set([2,6,7,8]);
const COL={{pos:'#EF9F27',ref:'#7F77DD',act:'#D85A30',obj:'#1D9E75',frag:'#e2574c',end:'#888780'}};
const SC={{
 A:{{tok:document.getElementById('tokA'),dyn:document.getElementById('dynA'),ground:x=>196+(x-256)*0.0267,start:272,act:'act2a',filter:'bA',grow:1}},
 B:{{tok:document.getElementById('tokB'),dyn:document.getElementById('dynB'),ground:x=>238-(x-14)*0.1053,start:190,act:'act2b',filter:'bB',grow:0.85,robot:true}}}};
function layout(sc){{sc.tok.innerHTML='';sc.toks=[];let cur=sc.start;WORDS.forEach((w,i)=>{{const tx=document.createElementNS(NS,'text');tx.textContent=w[0];sc.tok.appendChild(tx);tx.setAttribute('x',cur);tx.setAttribute('y',sc.ground(cur)+28);const wd=tx.getComputedTextLength();const c=cur+wd/2;tx.setAttribute('y',sc.ground(c)+28);sc.toks.push({{w:w[0],k:w[1],x:c,el:tx}});
if(i<WORDS.length-1){{const bx=cur+wd+6;const l=document.createElementNS(NS,'line');l.setAttribute('x1',bx);l.setAttribute('x2',bx);const gy=sc.ground(bx);l.setAttribute('y1',gy+12);l.setAttribute('y2',gy+32);if(CUT.has(i))l.setAttribute('stroke','#e2574c');sc.tok.appendChild(l)}}cur+=wd+12}})}}
function layoutAll(){{layout(SC.A);layout(SC.B)}}
layoutAll();document.fonts.ready.then(layoutAll);
let variant=1,scene='B',mode='loop',shown=1,t0=null;const drops=[];
const ACT1=5000,ROLL=11000,HOLD=2500;
function show(a){{shown=a;document.getElementById('act1').classList.toggle('off',a!==1);document.getElementById('act2a').classList.toggle('off',!(a===2&&scene==='A'));document.getElementById('act2b').classList.toggle('off',!(a===2&&scene==='B'))}}
function on(ids,id){{ids.forEach(x=>document.getElementById(x).classList.toggle('on',x===id))}}
document.getElementById('bA').onclick=()=>{{mode='a';on(['bA','bB','bL'],'bA');show(1)}};
document.getElementById('bB').onclick=()=>{{mode='b';on(['bA','bB','bL'],'bB');show(2);t0=null}};
document.getElementById('bL').onclick=()=>{{mode='loop';on(['bA','bB','bL'],'bL');t0=null}};
document.getElementById('sA').onclick=()=>{{scene='A';on(['sA','sB'],'sA');if(shown===2)show(2);t0=null}};
document.getElementById('sB').onclick=()=>{{scene='B';on(['sA','sB'],'sB');if(shown===2)show(2);t0=null}};
document.getElementById('v1').onclick=()=>{{variant=1;on(['v1','v2'],'v1')}};
document.getElementById('v2').onclick=()=>{{variant=2;on(['v1','v2'],'v2')}};
function letters(got){{const out=[];let i=0;while(i<got.length){{const t=got[i];if(t.k==='frag'){{let j=i;while(j<got.length&&got[j].k==='frag')j++;const done=j<got.length&&(got[j].w==='ids'||got[j].w==='es');for(let k=i;k<j;k++)for(const ch of got[k].w)out.push([ch,done?'#141414':'#e2574c']);i=j;continue}}if(t.k!=='end')for(const ch of t.w)out.push([ch,'#141414']);i++}}return out}}
function pieces(got){{const out=[];got.forEach((t,i)=>{{let k=t.k;if(k==='frag'){{const nx=got.slice(i+1).find(u=>u.k!=='frag');k=nx?(nx.w==='ids'?'ref':'obj'):'frag'}}const n={{pos:10,ref:5,act:10,obj:5,frag:3,end:2}}[t.k];for(let q=0;q<n;q++)out.push(COL[k])}});return out}}
function el(tag,a){{const e=document.createElementNS(NS,tag);for(const k in a)e.setAttribute(k,a[k]);return e}}
function draw(sc,p){{const dyn=sc.dyn;dyn.innerHTML='';const x0=sc.toks[0].x,x1=sc.toks[sc.toks.length-1].x;const x=x0+(x1-x0)*p;const got=sc.toks.filter(t=>x>=t.x);
sc.toks.forEach(t=>t.el.setAttribute('fill',x>=t.x?'#141414':'#c4c7cb'));
const has=w=>got.some(t=>t.w===w);
if(has('took')&&!drops.some(d=>d.tag==='a'))for(let k=0;k<2;k++)drops.push({{tag:'a',x:x-6+k*8,y:sc.ground(x)-40,vy:-1,vx:-0.8}});
if(has('es')&&!drops.some(d=>d.tag==='b'))for(let k=0;k<3;k++)drops.push({{tag:'b',x:x-8+k*7,y:sc.ground(x)-50,vy:-1.2,vx:-0.9}});
const gy=sc.ground(x);const ang=p*24;let R,cy;
if(variant===1){{const L=letters(got);R=(14+Math.sqrt(Math.max(L.length,1))*8.2)*sc.grow;cy=gy-R;
dyn.appendChild(el('circle',{{cx:x,cy:cy,r:R,fill:'#fff',stroke:'#141414','stroke-width':2.2,filter:'url(#'+sc.filter+')'}}));
const g=9.5*sc.grow;let idx=0;const off=Math.floor(ang*6);for(let j=-8;j<=8;j++)for(let i=-8;i<=8;i++){{const dx=i*g,dy=j*g;if(dx*dx+dy*dy>(R-5)*(R-5)||!L.length)continue;const ch=L[(idx+off)%L.length];idx++;const t=el('text',{{class:'c',x:x+dx,y:cy+dy+4,'text-anchor':'middle',fill:ch[1]}});t.textContent=ch[0];dyn.appendChild(t)}}}}
else{{const P=8*sc.grow;const cols=pieces(got);let Rc=1;const cells=r=>{{const a=[];for(let yy=-r;yy<=r;yy++)for(let xx=-r;xx<=r;xx++)if(xx*xx+yy*yy<=r*r+r*0.6)a.push([xx,yy,Math.round(Math.hypot(xx,yy)),Math.atan2(yy,xx)]);return a}};while(cells(Rc).length<Math.max(cols.length,4))Rc++;const cs=cells(Rc);const m=v=>((v+ang)%(2*Math.PI)+2*Math.PI)%(2*Math.PI);cs.sort((a,b)=>a[2]-b[2]||m(a[3])-m(b[3]));R=(Rc+0.9)*P;cy=gy-R;
cs.forEach((c,i)=>{{if(cols[i])dyn.appendChild(el('rect',{{x:x+c[0]*P-P/2,y:cy+c[1]*P-P/2,width:P,height:P,fill:cols[i]}}))}});
dyn.appendChild(el('circle',{{cx:x,cy:cy,r:R,fill:'none',stroke:'#141414','stroke-width':2.2,filter:'url(#'+sc.filter+')'}}))}}
if(sc.robot){{const s=0.55,ax=x-R-44,ay=sc.ground(ax);document.getElementById('pusherBody').setAttribute('transform','translate('+ax+','+ay+') rotate(-9) scale('+s+') translate(-650,-436)');
const hx=ax+12,hy=ay-46;dyn.appendChild(el('path',{{d:'M'+hx+' '+hy+' L'+(x-R*0.92)+' '+(cy-R*0.15)+' M'+hx+' '+(hy+12)+' L'+(x-R*0.96)+' '+(cy+R*0.2),stroke:'#141414','stroke-width':3.2,'stroke-linecap':'round',fill:'none',filter:'url(#'+sc.filter+')'}}))}}
drops.forEach(d=>{{d.vy+=0.18;d.x+=d.vx;d.y+=d.vy;const g2=sc.ground(d.x)-4;if(d.y>g2){{d.y=g2;if(sc.robot){{d.vx=Math.min(d.vx,-1.1);d.vy=0}}else{{d.vy*=-0.3;d.vx*=0.6}}}}
if(variant===1){{const t=el('text',{{class:'c',x:d.x,y:d.y,fill:'#9aa0a6'}});t.textContent='o';dyn.appendChild(t)}}else dyn.appendChild(el('rect',{{x:d.x,y:d.y-5,width:6,height:6,fill:'#9aa0a6'}}))}})}}
function loop(now){{if(t0===null){{t0=now;drops.length=0}}const e=now-t0;const sc=SC[scene];
if(mode==='b'){{const p=Math.min(e/ROLL,1);draw(sc,p);if(e>ROLL+HOLD)t0=null}}
else if(mode==='loop'){{if(e<ACT1){{if(shown!==1)show(1)}}else{{if(shown!==2){{show(2);drops.length=0}}draw(sc,Math.min((e-ACT1)/ROLL,1));if(e>ACT1+ROLL+HOLD)t0=null}}}}
requestAnimationFrame(loop)}}
requestAnimationFrame(loop);
</script></body></html>"""

(HERE / "draft.html").write_text(page, encoding="utf-8")
print("wrote", HERE / "draft.html")
