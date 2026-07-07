# 研究主线（方法细节存档 — 定位见下方 banner）

> ⚠️ **SUPERSEDED / 存档 (2026-07)。** 本文件是**旧的因果-认证轴**写法（Leibniz → CIY → do-intervention → MiniCausalLang），保留是因为它把**验证方法**（two-sided observability、certification、Isotrace、CIY）讲得最细，仍是方法层的参考。
>
> **权威定位已换轴,见 `src/pages/research-program.mdx`。** 当前身份 = **formal, linguistically-informed analysis of language models**,招牌 = **the formal semantics of modality**。谱系 = Leibniz → Kripke → Kratzer → Leahy & Carey,**modality 是第一个 instance**。本文件里的 causal certification / CIY / Isotrace 不是身份,而是 modality 项目所**继承的验证方法**(其第一个 domain = 因果结构)。读本文件时,把 "causal grounding" 当**方法**、把 modality 当**对象**。

> **一句话定位（旧轴，已弃）**：语言结构如何帮助人类和 AI 推理——当前用因果可解释性作为方法杠杆，检验一个模型"做对了"的行为，到底是由句子里真正许可结论的结构（the *licensing structure*）所**导致**，还是由一个只是与答案相关的表层捷径（*surface shortcut*）所导致。

---

## 0. 统一对象与核心命题

整条线只围绕**一个对象**：**语言所编码的、本应支持推理并许可结论的那套结构**，以及它的对立面——表层捷径。

核心信念：**语言结构是推理的支架之一**——agreement 的中心词、carries entailment 的依存、决定"推出什么"的 scope。一个真正在推理的模型，应当是被这套结构所*导致*而给出答案；可学习模型却常常抄近路。

"因果（causal）"在这里横跨两层，必须**分清**又必须**连上**：

- **任务侧（task-side）**：语言表达一套"什么蕴含什么"的 inferential structure；MiniCausalLang 把它**编译成一张因果图**（causal graph）。
- **模型侧（model-side）**：用 **`do`-intervention** 检验模型的行为是否真由这张图上的节点 / 边所导致。

把这两层焊在一起的，就是地基——**MiniCausalLang**。这一焊点，正是 linguistics × causal inference 的真正接缝。

---

## 1. 起点：Leibniz 的问题

本科哲学毕业论文做 Leibniz 的 *characteristica universalis* 与 *calculus ratiocinator*：是否存在一种"通用刻画"，让推理变成计算？由此引出一个更尖的问题——

> **哪些结构，是被哪些行为所最小地许可的（which structures are minimally licensed by which behaviors）？**

这个问题原封不动地活进了机器学习：当一个模型表现得"会推理"，**它的行为最小地许可了什么结构**？是真结构，还是一个表层代理（proxy）？整条研究线，就是这个两百年前问题的可操作（operational）版本。

---

## 2. 地基：MiniCausalLang —— 语言→因果图的编译器

MiniCausalLang 不是"验证沙盒"，而是**把语言编译成因果图的编译器**，是整条线的枢纽：

- 一套极小的 grammar + lexicon，其句子由一张**已知的因果 / 推理图**生成。
- 因此：(a) 因果侧被**构造给定**（stipulated）、(b) 表层可控、(c) 同一张图可用 morphology / word order / context **多种语言表层各实现一遍**（typological variants）。
- 它正是 Paper 1 所要求的 **causal-side observability**：没有它，grounded vs spurious 这一刀**不可判定**（non-identifiable）。

> 关键工程：把"语言结构 → 因果图"这一跳**显式化、可辩护**——在语言学上，什么是**节点**、什么是**边**、什么算一次**干预（intervention）**？这一步讲清楚，linguistics × causal 就从"听起来很美"变成"可操作"。这是最该花力气、也最能出彩的地方。

视觉上它低调，但**叙事上它是地基**——这两件事不矛盾。

---

## 3. 主线：一条有依赖的链（the chain）

三步跑在 MiniCausalLang 这块地基上，且彼此**依赖**，不是并列：

### 01 · Certify —— *Whether*：Stable Is Not Grounded
- 严格包含层级 `accuracy ⊋ stability ⊋ grounding`，每层包含非空。
- "扰动看稳不稳"的标准 robustness 做法 **one level too shallow**：stable-correct 仍可能 *stably* 骑在一个捷径上。
- 用 **`do`-intervention** 切断候选捷径：准确率塌 = 它就是捷径（控制实验里切一个 spurious 颜色特征，准确率掉 .408，纯噪声对照只动 .021）。
- **招牌——decidability boundary**：grounded / spurious 只在**两侧可观测**（题目真值图被构造给定 + 模型侧相关性可审计）时才可判，否则老实宣布 non-identifiable，绝不硬报"causally grounded"。
- **角色**：闸门——确立"被结构所致 vs 被捷径所致"的可认证切口。

### 02 · Localize —— *Where*：Isotrace
- 不开盒，**把路径信息编进输出**（同位素隐喻 / isotope tracing）：让不同推理路径产生不同**可观测标签**。
- **语言学化改造（已定方向 = (iii)+(i)）**：
  - **hop = 语言学操作**：路径是一串语言推理（agreement → binding → scope；或形态派生逐级），输出标签记录"哪个**语言层**的 hop 真被执行"。
  - **MiniCausalLang 生成类型学最小对（typological minimal pairs）**：同一张因果图、morphology / word-order / context 三种表层各实现一遍，Isotrace 追踪模型的路径**依赖的是哪一种编码**。
  - 这把原来"为去污染而用的合成名（Zorb/Veln）"升级成"**类型学变体**"设计，并一举把 **Isotrace ↔ MiniCausalLang ↔ typological frontier** 三者连起来。
- rule-copying 这个 confound，用 adversarial contrast pairs（同规则、不同事实）变成**可证伪测试**。
- **角色**：测出"**用了多少、用在哪一层**"——给 03 当**分母**。

### 03 · Quantify —— *How much* → 推理产出率：Causal Inferential Yield (CIY)
- **不是"用了多少结构"，而是 inferential productivity**：在**用了同样多因果结构**的前提下（由 Isotrace 测得），模型能正确产出多少**被这套结构所许可的结论**。
- 依据 *reasoning is generative*：一套结构许可一整片结论。grounded 模型**生产力高**——把结构用起来、覆盖整片 *licensed inference space*；捷径模型只覆盖记住的那一小片。
- 形式上：**CIY = 正确产出的 licensed 结论 ÷ 该结构所许可的结论全集**（coverage / yield）。
- **为什么必须有这条链**：
  - 分母（结构许可的**结论全集**）——只有 MiniCausalLang 的**已知因果图**能枚举；
  - "用了多少结构"——只有 **Isotrace** 能测；
  - "是否在用结构"——只有 **Paper 1** 能认证。
  - 于是 01 → 02 → 03 是**真链**，CIY 把前两步的产物当输入。
- **falsifiability**：若 CIY 区分不了 accuracy-matched 与 grounding-matched 的模型，它就塌回 accuracy，应当被弃用——协议要主动暴露这种坍塌，而非掩盖。

---

## 4. 方法论脊柱：two-sided observability

整条线真正的**签名**，是一条认识论纪律：

> 只在**因果侧被给定 + 模型侧可审计**时，才下 grounding 的断言；否则宣布 non-identifiable，绝不把"欠定（underdetermined）"包装成"更强的结果"。

MiniCausalLang 让两侧**同时可观测**——这就是它是地基、而非装饰的根本原因。这条诚实的边界，在 ML 里少见，恰是最强的差异化点。

---

## 5. Frontier 与往后可能的发展

### 应用前沿：Typological Grounding
- 同一张因果图，被不同语言的 grammar 重新编码（isolating / fusional / agglutinative / analytic）。
- 核心问题：grounding / yield 能否**跨类型学迁移**？模型跟的是 *language-invariant* 的因果结构，还是 *language-specific* 的表层？
- typology 天然提供"同义不同形"的对照，把 *structure vs surface* 放到最严的天平上。

### 再往后
- **Grounding profile across languages**：一个模型在多语言上的 grounding / yield 谱，作为"它到底学到结构还是表层"的指纹。
- **从 MiniCausalLang 迁到真实 LLM**：把沙盒里建立的"认证—定位—产出"协议迁移到 opaque 预训练模型；此时 decidability boundary 提醒我们诚实地停在可识别处。
- **机制侧接口**：把"用了结构"对到 activation space 的方向（Latent Control States 一类的 mechanistic 延伸）。
- **回到 Leibniz**：一个 learned model 是否在内部**重建了某种 characteristica**——一套"其结构即推理结构"的最小表示？这正是本科那个问题的现代形态，也是整条线最终想叩的门。

---

## 6. 主线之外（off the spine）

- **Latent Control States**（mechanistic extension）、**Cross-lingual ProtoBias**（applied extension）：小组协作、进行中、不作为主线的承诺，但为主线供血。

---

## 一句话收束

从 Leibniz 的"哪些结构被哪些行为最小许可"，到用 **MiniCausalLang** 把语言编译成因果图、用 **`do`-intervention 认证（P1）**、用 **Isotrace 定位（02）**、用 **CIY 量化推理产出（03）**——**这是同一个问题在两百年后的、可操作、可证伪的版本**。
