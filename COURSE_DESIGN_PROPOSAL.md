# Assignment 2 课程设计提案 V2（待审阅）

## 1. 课程定位

### 课程名称

**SLOP3745 — League of Legends Champion Mastery**

中文名：**英雄联盟：绝活英雄训练**

副标题：**Master one champion against every matchup, then bring that mastery to the whole map.**

这个名字直接说明课程对象和目标，不要求学生先理解隐喻。课程代码保留仓库分配的后三位 `745`，第一位使用 `3`，定位为需要已有游戏基础的三年级课程。

### 核心目标

学生在开课时选择一个主位置和一个“绝活英雄”，十二周内完成三层训练：

1. **英雄本体训练**：技能边界、连招、换血、斩杀线、逃生和不同出装分支；
2. **全对位训练**：与该位置所有常见英雄逐一对练，对其余非常规英雄建立完整互动记录；
3. **全局训练**：将对线优势或劣势转化为兵线、转线、资源团、边线和团战决策。

课程的核心观点是：

> “Counter” 不是英雄选择界面上的一个标签，而是一组需要在特定等级、距离、技能冷却、兵线和地图条件下被验证的互动。

学生不能只背胜率网站上的克制关系。每个结论都必须经过 **计划 → 对练 → 实战 → 复盘 → 修改 → 再测试**。

### 狗熊示范案例

课程网站使用 **Volibear / 狗熊上单** 作为贯穿十二周的完整示范，但学生可以选择其他英雄和位置。

狗熊案例会展示如何建立：

- 技能与连招基线；
- 对近战、远程、持续回复、爆发、拉扯和强制位移英雄的不同方案；
- 等级 1、2、3、6 等关键窗口；
- 被 counter 时的止损条件，而不只是击杀条件；
- 推线、控线、回城、配合打野和防 gank 的分支；
- 离开对线后在边线、先锋/小龙、团战中选择开团、限制后排或保护队友；
- 版本变化后重新验证旧结论的方法。

课程不会把某个版本的“狗熊克制表”写成永久真理。每一条 matchup 记录都有版本、证据和可信度，过期后需要重新测试。

### 目标学生

- 已了解《英雄联盟》的地图、英雄技能、装备和基本分路；
- 希望通过专精一个英雄稳定提升，而不是频繁更换英雄；
- 愿意进行自定义 1v1、匹配/排位、录像标注和重复训练；
- 适合希望建立绝活英雄池的普通玩家、校队成员或半职业选手。

### 课程简介（用于 `course-config.ts`）

> League of Legends Champion Mastery is a twelve-week practice studio for players who want to turn one champion into a complete competitive system. Students test every lane matchup, revise their counter plans through replay evidence, and carry that knowledge into waves, objectives, side lanes and teamfights.

建议标签：`league-of-legends`、`champion-mastery`、`esports-training`。

## 2. 学习成果

完成课程后，学生能够：

1. 建立一个绝活英雄的技能、连招、伤害窗口与失败边界模型；
2. 为所有相关对线英雄建立可执行、可复测的 matchup card；
3. 识别 counter 的具体机制，而不是把失败简单归因于英雄克制；
4. 根据对手技能、等级、距离、兵线、打野位置和装备节点调整对线计划；
5. 在对线获胜、均势和失败三种情况下制定全局转化方案；
6. 通过录像证据完成多轮训练，并决定保留、修改或拒绝一条策略；
7. 在版本变化后重新验证英雄知识，而不是依赖已经过时的攻略。

## 3. 三层循环训练体系

### A. 单英雄机制循环

`Practice Tool → Measure → Execute → Stress → Review → Repeat`

- 在训练模式中建立技能、连招和距离基线；
- 在移动目标、低血量、不同装备和压力条件下重复；
- 记录失败发生在输入、判断还是知识层；
- 每次只修改一个变量后重新测试。

### B. 逐英雄对位循环

`Study opponent → Write plan → Custom 1v1 → Real match → Replay review → Update matchup card → Re-test`

每张 matchup card 至少记录：

- 对手最重要的技能互动；
- 等级与装备强弱窗口；
- 短换血、长换血和 all-in 条件；
- 兵线目标；
- 必须保留的逃生或打断技能；
- 敌我打野介入后的变化；
- 获胜条件、止损条件和禁止事项；
- 实测录像时间戳、版本号、测试次数和可信度；
- 下一轮只准备修改的一件事。

### C. 全局决策循环

`Lane state → Map objective → Role choice → Team execution → Replay review → Playbook revision`

每个对位最终都要回答：

- 赢线后如何扩大优势；
- 均势时应继续对线还是先支援；
- 输线时怎样减少损失并保留作用；
- 当前阵容中自己的团战任务是开团、侧翼、限制核心还是保护队友；
- 下一波资源前应该把兵线、回城和视野放在哪里。

三个循环嵌套运行：机制不稳定就回到 A；不理解特定英雄就进入 B；赢线却无法获胜则进入 C。

## 4. “所有英雄对位”的覆盖方法

为了既做到全面，又避免把课程变成无法完成的百科全书，采用三级覆盖标准：

### Level 1 — Directly Tested

对当前主位置的所有常见对线英雄，至少完成：

- 一张完整 matchup card；
- 一组自定义 1v1 drill；
- 一次录像复盘；
- 一个经过测试的开局计划和一个失败后的止损计划。

课程每学期开始时冻结一次“主位置对位名单”，避免赛季中频繁变化导致目标漂移。

### Level 2 — Interaction Mapped

对于不常直接对线但可能出现在对局中的其他英雄，记录其与绝活英雄最重要的互动，例如：

- 能否打断或躲避核心技能；
- 是否拥有百分比生命伤害、重伤、不可选取、强制位移或持续拉扯；
- 团战中是应该接近、绕开、打断还是保护队友；
- 哪个关键冷却决定自己能否行动。

因此学生最终会看到完整英雄 roster，而不是只认识常见的几个上单。

### Level 3 — Re-tested Counters

从 Level 1 中选出至少十个最困难或最不稳定的 counter，对每个完成三轮训练：

1. 首次计划与失败证据；
2. 调整后的对练与实战；
3. 最终复测，并明确策略是被确认、限制使用还是拒绝。

狗熊案例的 counter atlas 也遵循这三个层级。这样既可以覆盖“任何英雄”，又能对真正困难的 matchup 做足够深入的训练。

## 5. 十二周课程结构

建议教学期为 2027-02-22 至 2027-05-28。

| 周次与日期 | Lecture | Champion Lab / 当周产物 | 循环成果 |
|---|---|---|---|
| W1 · 22 Feb | **Choose One Champion**：绝活英雄不是当前强势英雄 | 选择主英雄与位置；完成 5 场基线比赛 | 建立初始能力与问题清单 |
| W2 · 1 Mar | **Know the Kit Without Guessing**：技能边界与连招 | 训练模式测量距离、冷却、连招、逃生和被打断条件 | 完成 Champion Model v1 |
| W3 · 8 Mar | **How to Test a Matchup**：从“谁 counter 谁”到实验 | 建立 matchup card；完成第一组 1v1 对练 | 跑通完整对位循环 |
| W4 · 15 Mar | **Melee Matchups**：换血长度、先后手和回复 | 处理坦克、战士、决斗者等近战组 | 完成第一批直接测试记录 |
| W5 · 22 Mar | **Range, Kiting and Disengage** | 处理远程压制、减速、位移和拒绝接战组 | 找到接近条件与止损线 |
| W6 · 29 Mar | **What a Hard Counter Actually Counters** | 处理重伤、百分比伤害、打断、持续回复和强制位移 | 对困难 matchup 完成 Cycle 1 |
| W7 · 5 Apr | **The Lane Has Four Players**：打野与辅助干预 | 训练 2v2、弱侧、防 gank 与回推线 | 从纯 1v1 扩展到真实对线环境 |
| W8 · 12 Apr | **Wave, Recall and Item Branches** | 为领先、均势、落后三种状态制作回城与装备分支 | 完成 Matchup Atlas v1 |
| W9 · 19 Apr | **Win Lane, Then What?**：优势转化 | 训练先锋/小龙前的推线、转线和传送决策 | 运行第一轮全局决策循环 |
| W10 · 26 Apr | **Your Job in Every Teamfight** | 针对不同阵容训练开团、侧翼、限制后排与保护 | 完成全 roster interaction map |
| W11 · 3 May | **Counters Change With the Patch** | 重新测试十个关键 counter；比较旧卡和新证据 | 完成困难对位 Cycle 2–3 |
| W12 · 10 May | **The Champion Mastery Gauntlet** | 随机对手 1v1、完整比赛和现场复盘 | 提交最终 Champion Playbook |

每个 Lecture 都对应一种新知识；每个 Champion Lab 都必须产出可以进入最终 playbook 的证据，不能把十二周写成重复的“多练习、多复盘”。

## 6. 课程自身的考核体系（100%）

### Assessment 1 — Champion Operating Manual v1（20%）

学生提交自己的绝活英雄基础模型：

- 技能互动与连招；
- 等级/装备窗口；
- 训练模式测量记录；
- 五场基线录像中的三个重复问题；
- 首批六张 matchup cards。

评分：模型准确与边界 30%、训练证据 30%、问题诊断 25%、可读性 15%。

### Assessment 2 — Complete Matchup Atlas（40%）

学生提交：

- 主位置全部常见对位的 Level 1 cards；
- 其余英雄的 Level 2 interaction map；
- 十个最难 counter 的第一轮训练证据；
- 可搜索、可筛选的个人 matchup atlas。

评分：覆盖完整性 25%、对位推理 30%、证据与可复测性 30%、诚实处理不确定性 15%。

### Final — Champion Mastery Playbook（40%）

最终提交将对线知识连接到完整游戏：

- 修订后的 matchup atlas；
- 十个关键 counter 的三轮训练记录；
- 领先、均势、落后时的全局决策树；
- 不同阵容下的团战职责；
- 一场完整比赛录像和 post-match revision；
- 下一版本需要重新验证的假设清单。

评分：对线掌握 25%、全局转化 30%、迭代深度 30%、最终 playbook 的可用性 15%。

## 7. 网站设计

### 首页

首页直接显示：

- 标题 **League of Legends Champion Mastery**；
- 一句话目标：“Choose one champion. Test every matchup. Learn the whole map.”；
- 狗熊上单示例入口；
- 三层训练循环；
- 十二周路线；
- 进入 Champion Mastery Dashboard 的主按钮。

### 页面规模

- 12 个 lecture 页面；
- 12 个 `Champion Labs` session 页面；
- 3 个 assessment 页面；
- 3 个 teaching-team 页面；
- 1 个 policies/support 页面；
- 1 个完整 slide deck；
- 1 个 `/tools/matchup-atlas/`；
- 1 个 `/examples/volibear-top/` 示例区。

### 核心交互：Champion Mastery Dashboard

学生首先选择主英雄和位置。Dashboard 使用完整英雄名单生成矩阵，每个对手有状态：

- `Unseen`
- `Planned`
- `1v1 Tested`
- `Match Tested`
- `Re-tested`
- `Mastered`

可以按位置、对手类型、counter 机制、可信度和测试状态筛选。点击英雄后进入 matchup card，记录：

- patch / date；
- key ability interaction；
- level windows；
- trade plan；
- wave plan；
- jungle branch；
- item branch；
- win / survive conditions；
- replay evidence；
- next experiment；
- confidence 和最终 verdict。

数据保存在浏览器本地，并支持导出/打印。移动端以卡片和筛选抽屉呈现，桌面端显示 roster grid 与详情面板。课程不依赖实时胜率 API，避免第三方数据失效，也强调学生自己验证。

### 狗熊示范区

狗熊不是唯一可选英雄，而是网站的“完成范例”。示范区包含：

- Champion Model；
- 一个近战、一个远程、一个困难 counter 的完整 matchup card；
- 同一个困难对位的三轮 before/after；
- 赢线、均势、输线三种全局决策；
- 一次团战职责分析；
- 哪些结论会随 patch 过期。

示例展示方法，不替学生提供整个作业答案。

### Slide deck

Week 6 的 **What a Hard Counter Actually Counters** 作为主 deck。建议结构：

1. “Counter” 标签为什么不够；
2. 技能互动；
3. 距离与换血长度；
4. 等级和装备窗口；
5. 兵线如何改变 counter；
6. 打野如何改变结论；
7. 狗熊困难对位案例；
8. 第一次失败计划；
9. 修订与复测；
10. Champion Lab 指令。

## 8. 内容与视觉语言

### 内容语气

- 直接、像教练，不使用含糊的励志文案；
- 每页先给训练目标，再给 drill、证据要求和通过标准；
- 狗熊示例中明确区分“事实”“假设”“仅适用于该 patch 的结论”；
- 反复使用几句课程语言：
  - “Choose one champion. Test every matchup.”
  - “A counter is a condition, not a label.”
  - “Change one variable. Queue again.”
  - “Winning lane is not the same as winning the game.”

### 视觉方向

在固定 SlopU 品牌上加入《英雄联盟》训练台的视觉逻辑，但不直接复制游戏客户端：

- roster grid、对位卡、技能交互箭头和训练状态章；
- 用清晰标签区分 Plan / Test / Evidence / Revision；
- 抽象地图线路、兵线节点和五人阵型；
- 狗熊使用原创轮廓或训练图形，不直接复制官方 splash art；
- 避免常见的黑底霓虹“电竞网站”，保持 SlopU 统一身份；
- 390×844 下所有表格变成纵向卡片，筛选和状态不依赖 hover。

## 9. A2 网站的循环开发计划

### 每一轮统一流程

`Complete → Automated check → Human review → Diagnose → Optimise → Re-check → Commit evidence`

每轮只在达到明确门槛后进入下一轮。

### Cycle 0 — 概念审查

交付：本提案。  
通过条件：你认可课程名、单英雄精通范围、狗熊案例、全部对位覆盖方法和全局训练比例。

### Cycle 1 — 数据与课程骨架

交付：课程配置、12 lectures、12 labs、3 assessments、people、policies 和所有关联。  
通过条件：12 周日期合法；assessment 合计 100%；SLOP3745 正确；无 dangling references；基础 spec tests 通过。

### Cycle 2 — 对位系统

交付：Matchup Atlas 数据模型、完整 roster 状态、matchup card 和筛选。  
通过条件：每个 roster 条目恰好出现一次；状态可以更新和恢复；手机与键盘可完整使用；没有把版本相关结论写成永久事实。

### Cycle 3 — 狗熊完整纵向案例

交付：从机制、三类 matchup、困难 counter 三轮测试，到全局决策的完整示范。  
通过条件：一个新学生只看狗熊案例就能独立为自己的英雄建立第一张 matchup card。

### Cycle 4 — 课程连贯性审查

抽取 W2、W5、W8、W11，检查是否真正表现出：机制 → 对位 → 兵线 → 全局 → 版本适应的能力增长。

通过条件：每周拥有独特问题、独特 drill、独特证据；每个 assessment 都能追溯到前面课程活动；删除所有通用“多练习即可进步”的空话。

### Cycle 5 — 视觉、deck 与压力测试

交付：原创 hero/card、主 deck、最终组件样式。  
测试：1920×1080、390×844、键盘、resize、刷新、本地存储、慢网络和空数据状态。

### Cycle 6 — Marker simulation 与提交证据

按真实十分钟路线检查：主页 → W2 → W6 → W10 → Assessment 2 → 狗熊案例 → deck → policies。

最终门槛：

- `pnpm check` 通过；
- `pnpm check:evidence` 通过；
- 所有 `STARTER_CONTENT` 和模板图片被替换或删除；
- `PROCESS.md` 400–600 词，引用真实 commits 和关键修订；
- `CLAUDE.md` 记录实际使用的 agent 规则；
- Git history 清晰显示计划、失败、审查和优化；
- GitHub Pages 公开可用，无 base-path 404；
- 两个 marking viewports 均通过十分钟人工审查。

任何一项失败都回到 Diagnose → Optimise → Re-check，不因页面数量够多而提前结束。

## 10. 建议写入 `spec/` 的合同测试

- 课程代码为 `SLOP3745`，后三位保持 `745`；
- 恰好有 12 个不同周次的 lectures 和 12 个 Champion Labs；
- 三项 assessment 权重合计 100%；
- 每个 lab 都声明训练层级、产物和循环阶段；
- 每个 assessment 都有 marking model 和相关课程页面；
- 至少一个 lecture 链接真实 deck；
- roster 数据中的每个英雄 ID 唯一；
- Matchup Atlas 支持全部状态，并能在刷新后恢复测试记录；
- 每条 matchup 记录都带 patch/date 和 evidence/confidence 字段；
- 狗熊示范至少包含近战、远程、困难 counter 和全局决策案例；
- 首页、labs、assessments、atlas、狗熊示例和 policies 之间都有有效入口；
- 页面内没有遗留 starter 文案或模板素材。

## 11. 范围控制

本课程不做：

- 实时英雄强度榜或自动推荐“版本答案”；
- 与 Riot 账号绑定、自动读取比赛历史或录像上传；
- 多英雄池教学——学生必须先把一个英雄练完整；
- 仅凭胜率宣布 counter；
- 商城、论坛、直播资讯等与训练无关的功能；
- 复制游戏客户端 UI 或未经授权使用官方英雄插画。

这些限制让工作量集中在 A2 最重要的连贯课程设计、完整网站、独特回应和可验证过程上。

## 12. 本轮等待你确认的事项

开始修改正式模板前，请确认：

1. 是否接受课程名 **League of Legends Champion Mastery / 英雄联盟：绝活英雄训练**；
2. 是否接受“学生自选一个绝活英雄，狗熊上单作为贯穿示范”的结构；
3. 是否接受三级覆盖：常见对线全部实测、全 roster 互动记录、十个困难 counter 三轮复测；
4. 是否接受课程内容大约一半用于对线/对位，另一半连接兵线、打野、资源团和团战；
5. 是否接受 20% / 40% / 40% 的考核比例；
6. 是否接受 Champion Mastery Dashboard 作为主要交互。

收到确认或修改意见后，才进入 Cycle 1，不在审阅前改写正式课程内容。
