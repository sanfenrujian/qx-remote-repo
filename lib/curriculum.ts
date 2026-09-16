export const phases = [
  {name:"补齐 PCB 全流程",range:"01—04 周",goal:"从原理图到一份完整制造包",detail:"复习够用的电路知识，熟悉一种 EDA，掌握数据手册、封装、布局、布线和自审。",project:"练习板 · 电源 / LED / 按键"},
  {name:"做出第一块完整板",range:"05—10 周",goal:"四层 STM32 板设计与调试",detail:"电源、最小系统、SWD、串口和 I²C / SPI。固件以验证硬件为目的，第 10 周开始尝试投递。",project:"项目一 · STM32 四层板"},
  {name:"理解高速信号与电源",range:"11—16 周",goal:"建立可复现的 SI / PI 实验集",detail:"SI 是信号完整性，PI 是电源完整性。从边沿、回流、反射开始，用模型和波形解释设计选择。",project:"项目二 · SI / PI 仿真实验"},
  {name:"完成一个高速接口",range:"17—20 周",goal:"100BASE-TX 接口设计与审查",detail:"默认百兆以太网：核实 MAC、PHY、时钟、变压器和连接器。不要同时展开 USB HS、DDR 和 PCIe。",project:"项目三 · 高速接口板"},
  {name:"把工程变成求职证据",range:"21—24 周",goal:"作品集、面试与持续投递",detail:"用规格、工程、测量、问题定位记录证明能力。优先投初级硬件、嵌入式硬件、PCB 设计或硬件验证。",project:"交付 · 简历与工程作品集"},
];
export const resources = [
  {title:"KiCad 官方入门",org:"KiCad",url:"https://docs.kicad.org/10.0/en/getting_started_in_kicad/getting_started_in_kicad.html",desc:"第 1—4 周：原理图、PCB、ERC / DRC 和制造输出。按安装版本切换文档。"},
  {title:"STM32F4 硬件开发 · AN4488",org:"ST",url:"https://www.st.com/resource/en/application_note/an4488-getting-started-with-stm32f4xxxx-mcu-hardware-development-stmicroelectronics.pdf",desc:"第 5—10 周：供电、复位、启动、调试和晶振；具体数值查所选芯片数据手册。"},
  {title:"高速布局布线指南 · SCAA082A",org:"TI",url:"https://www.ti.com/lit/an/scaa082a/scaa082a.pdf",desc:"第 4、11—13 周：边沿、回流、叠层、传输线与过孔。"},
  {title:"混合信号接地 · MT-031",org:"Analog Devices",url:"https://www.analog.com/media/en/training-seminars/tutorials/MT-031.pdf",desc:"第 6、13 周：理解电流回路。不要把局部示例推广成所有板都应切割地。"},
  {title:"去耦技术 · MT-101",org:"Analog Devices",url:"https://www.analog.com/media/en/training-seminars/tutorials/MT-101.pdf",desc:"第 6、14—15 周：电容的 ESR / ESL、自谐振和实际摆放。"},
  {title:"眼图与信号调理课程",org:"TI Precision Labs",url:"https://www.ti.com/video/series/precision-labs/ti-precision-labs-signal-conditioning.html",desc:"第 16 周：先看什么是眼图、SI 如何影响眼图，再看时钟数据恢复概念。"},
  {title:"传输线与驻波实验",org:"ADI University",url:"https://wiki.analog.com/university/labs/tlines_standing_waves_adalm2000",desc:"第 11—12 周：下载 LTspice 仿真工程；仿真部分不需要购买实验仪器。"},
  {title:"STM32 USB 硬件指南 · AN4879",org:"ST",url:"https://www.st.com/resource/en/application_note/an4879-introduction-to-usb-hardware-and-pcb-guidelines-using-stm32-mcus-stmicroelectronics.pdf",desc:"第 17—20 周拓展：区分 USB FS 与 HS，核对内部 / 外部 PHY 和保护、布线。"},
  {title:"Ethernet 基础与硬件设计",org:"TI Precision Labs",url:"https://www.ti.com/video/series/precision-labs/ti-precision-labs-ethernet.html",desc:"第 17—20 周主线：PHY、启动配置、参考时钟和 100BASE-TX 原理图。"},
  {title:"LTspice 基础视频",org:"Analog Devices",url:"https://www.analog.com/en/resources/media-center/videos/series/ltspice-basics-video-series.html",desc:"按需补充：瞬态分析、AC 分析与波形操作。"},
];
type Week = {title:string; phase:number; output:string; criteria:string; resources:number[]; days:string[]};
export const weeks:Week[] = [
 {title:"原理图与数据手册",phase:0,output:"一张电源 + LED + 按键原理图，附设计计算",criteria:"能解释电流路径、引脚功能、限流电阻及电源额定值。",resources:[0],days:["安装一种 EDA；新建练习板工程，并收集 3 个目标岗位的要求","复习欧姆定律和功率；计算 LED 限流电阻，核查电阻功耗","阅读一颗 LDO 数据手册；标注引脚、输入范围和电容要求","画电源、LED 和按键电路；标出各信号的电压范围","用仿真或面包板验证按键上拉和 LED 电流，记录偏差","运行电气规则检查 ERC；为每个电路模块写一句设计理由"]},
 {title:"符号、封装与 BOM",phase:0,output:"经尺寸核对的器件库、BOM 和封装审查记录",criteria:"逐项核对引脚编号、焊盘尺寸、极性、采购型号及替代件条件。",resources:[0],days:["从数据手册找到封装机械图，对照引脚视图的观察方向","核对练习板全部原理图符号与引脚号","创建或修订一个器件封装，记录焊盘尺寸的来源","核对连接器、二极管和 IC 的 1 脚与极性","导出 BOM，补齐型号、封装、数量及额定值","按 1:1 尺寸核查关键封装，完成器件库审查表"]},
 {title:"双层 PCB 布局布线",phase:0,output:"可完整打开的双层练习板工程",criteria:"ERC / DRC 全部解决或逐项解释；地回路和去耦位置有明确理由。",resources:[0,2],days:["设置板框、安装孔、线宽和间距规则","按电流流向摆放输入、电源、负载和连接器","完成电源布线，画出大电流回路","完成信号布线，检查参考地连续性","铺铜并检查孤岛、狭窄回流路径和连接器可操作性","运行 DRC；检查 3D 视图、丝印遮挡和器件间距"]},
 {title:"制造输出与设计复盘",phase:0,output:"Gerber、钻孔、BOM、装配图和一页自审报告",criteria:"在独立 Gerber 查看器中复核层顺序、钻孔、板框、阻焊与极性。",resources:[0,2],days:["阅读制造能力说明，核对最小线距、孔径和板厚","导出 Gerber 与钻孔文件并在查看器中打开","导出 BOM 和装配图，核对顶底层方向与坐标","沿一根信号画出回流路径，记录跨缝风险","按电源、连接器、极性、孔位清单完成设计自审","整理工程版本与发布目录；复述从需求到生产的完整流程"]},
 {title:"STM32 项目需求与选型",phase:1,output:"STM32 四层板规格书、框图和功耗预算",criteria:"需求包含输入电源、接口、尺寸、测试点、调试方式及验收条件。",resources:[1],days:["限定项目功能：5 V 输入、3.3 V、SWD、UART 和一个传感器","选择 LQFP 封装 STM32，核对供电、Flash、引脚及可购买性","画系统框图和引脚分配表，检查复用冲突","估算各模块电流、稳压器损耗和供电余量","列出上电、调试和测量需要的测试点","写出逐项验收条件与 BOM 草案，预约实验室或确认工具条件"]},
 {title:"最小系统与供电原理图",phase:1,output:"完整最小系统原理图及核对清单",criteria:"电源脚、VCAP（如适用）、复位、启动、SWD、时钟均有手册依据。",resources:[1,3,4],days:["按具体 MCU 手册连接全部供电脚与专用电容","设计 5 V 输入保护、3.3 V 稳压和测试点","设计复位、启动配置与 SWD，核对连接器引脚","核对晶振参数与时钟方案，区分负载电容和寄生电容","加入串口与传感器，核对上拉、电平与地址","按参考设计和数据手册逐页自审，运行 ERC"]},
 {title:"四层叠层与关键布局",phase:1,output:"四层板布局及关键网络约束表",criteria:"叠层来自实际板厂；参考平面、去耦回路和关键网络被标注。",resources:[1,2],days:["获取板厂四层叠层，理解铜厚、介质厚度与参考层","设置板框、安装孔、连接器和机械禁布区","摆放电源入口、保护及稳压器，缩小功率回路","摆放 MCU 去耦与时钟，标注最近回流路径","摆放 SWD、传感器与测试点，检查可焊接性","建立网络分类、线距与关键网络约束并复查布局"]},
 {title:"四层 PCB 与制造审查",phase:1,output:"四层板发布包与制造审查记录",criteria:"ERC / DRC、封装方向和输出文件经过复核；任何豁免有解释。",resources:[0,1,2],days:["完成时钟、复位和电源关键布线","完成 SWD、UART、I²C / SPI 布线并检查回流","检查每次信号换层及相邻参考面","完成铺铜、地过孔和测试点，审查电源连接","进行 DRC、极性、连接器与机械复核","导出制造包并独立查看；按预算决定打样或保留待生产版"]},
 {title:"上电与分模块调试",phase:1,output:"电源、复位、SWD、时钟、串口和外设调试日志",criteria:"每项实测记录条件、预期、结果；未实测项明确标注，不用仿真代替。",resources:[1],days:["制作上电检查表，核对焊接方向及断电下电源对地阻值","限流上电，测量输入和 3.3 V；无板则检查参考开发板","检查复位与启动脚，尝试 SWD 连接并记录状态","运行最小验证固件，确认系统时钟与 LED","验证串口和一个 I²C / SPI 外设，保存通信证据","整理首次上电日志；逐项标注实测、开发板验证或尚未验证"]},
 {title:"问题定位与 V1 报告",phase:1,output:"V1 项目报告、V2 变更单及首轮投递材料",criteria:"至少一个问题包含现象、假设、证据、修正和回归结果。",resources:[1],days:["选择一个真实问题，记录复现条件和测量证据","将故障分为电源、时钟、复位、连接、固件等候选原因","逐项验证假设并记录排除依据，避免同时改动多项","完成修正和重复上电 / 通信测试，记录测试次数","整理原理图、PCB、日志和 V2 变更单","写一页项目简介，并开始投递匹配的实习或初级硬件岗位"]},
 {title:"边沿与传输线",phase:2,output:"不同边沿和线长的传播延时仿真对照",criteria:"能解释高速与上升时间的关系；说明传输线模型和参数来源。",resources:[2,6,9],days:["阅读上升时间与传播延时概念，区分频率和边沿速度","打开 LTspice 传输线例程，跑通基线阶跃仿真","保持重复频率不变，改变上升时间并比较接收端","改变传播延时或线长，观察反射到达时间","记录驱动端与接收端电压，标注关键时刻","整理参数对照和结论：何时简单连线模型不再够用"]},
 {title:"反射与端接",phase:2,output:"开路、匹配、失配和源端串阻对照实验",criteria:"至少比较过冲、稳定时间和阈值穿越；避免把某个串阻当通用值。",resources:[2,6],days:["计算三个负载条件下的反射系数并预测波形","运行开路与匹配负载实验，对照预测","设置失配负载，测量首次到达电压与反射变化","扫源端串阻，比较过冲和接收端建立时间","改变驱动源阻抗与上升时间，检查结论是否仍成立","输出端接实验报告，列出模型未包含的封装和非线性效应"]},
 {title:"回流、串扰与过孔",phase:2,output:"首块板回流审查图及简化耦合模型实验",criteria:"能指出跨缝、参考层变化与回路面积风险，并明确简化模型局限。",resources:[2,3],days:["在自己的 PCB 上标注信号路径与对应回流路径","寻找跨参考面开槽、狭颈和孤岛的网络","核查关键网络换层，说明回流如何转移","用简化耦合模型比较间距和耦合程度对波形的影响","建立含过孔寄生的示意模型，比较结果差异","形成 PCB 改进标注图，按影响与代价排出修改顺序"]},
 {title:"去耦与阻抗曲线",phase:2,output:"含 ESR / ESL 的去耦网络阻抗曲线",criteria:"解释自谐振、反谐振及回路电感；每张图标出坐标与单位。",resources:[4,9],days:["阅读真实电容模型，画出 C、ESR、ESL 等效电路","对单个电容进行 AC 扫频并观察自谐振","改变 ESR 和 ESL，记录阻抗最低点与高频趋势","比较单电容和多电容并联，识别新增峰值","加入走线或回路电感，比较理想和实际模型","整理去耦阻抗报告，说明为什么不能只看总电容量"]},
 {title:"负载阶跃与 PI",phase:2,output:"目标阻抗计算、负载阶跃与两种改进方案",criteria:"依据允许压降和负载变化计算目标阻抗；记录压降与恢复时间。",resources:[4,9],days:["为一个负载定义允许压降 ΔV 和电流变化 ΔI","计算目标阻抗 ΔV / ΔI，写明频段与模型假设","建立电源、寄生和脉冲负载的瞬态模型","测量压降、振铃和恢复时间，建立基线","比较增容、降回路电感或改变 ESR 的两种方案","整理 PI 报告，说明模型与真实稳压控制环路的差别"]},
 {title:"眼图与实验集发布",phase:2,output:"带参数、波形、结论和复现步骤的 SI / PI 实验包",criteria:"能解释眼高、眼宽与抖动；不把简化眼图当成协议合规认证。",resources:[5,6],days:["学习眼图的叠加方式、单位间隔、眼高与眼宽","使用课程示例解释噪声、码间干扰和抖动的影响","将一组比特波形按单位间隔叠加；或逐图标注官方例图","复核反射与 PI 实验的参数、坐标和单位","为每个实验补齐现象、原因、改进和适用范围","发布可复现 SI / PI 实验集，进行一次 5 分钟口述讲解"]},
 {title:"百兆以太网架构与选型",phase:3,output:"100BASE-TX 接口需求、连接图和器件清单",criteria:"区分 MAC、PHY 和线侧；MCU 能力、RMII 时钟与 PHY 兼容性已核实。",resources:[8,7],days:["梳理 MAC、PHY、RMII、变压器和 RJ45 的作用","选择带合适 MAC 的 MCU 与百兆 PHY，核对参考设计","核对 RMII 时钟输入输出关系，避免两个源同时驱动","核对 PHY 电源、复位和启动配置电阻","核对磁性器件、连接器与保护器件的兼容性","完成系统连接图与风险清单；USB HS 仅作为后续替代选题"]},
 {title:"接口原理图与约束",phase:3,output:"完整接口原理图和“要求—依据—设计值”约束表",criteria:"所有阻抗、时序、保护及布局要求有具体器件文档依据。",resources:[8,2],days:["按器件手册完成 PHY 供电、去耦和复位电路","完成 RMII 信号、参考时钟与管理接口连接","完成线侧变压器、终端、RJ45 及保护电路","整理数字侧时序及线侧差分阻抗要求，记录原文出处","根据板厂叠层计算或获取阻抗线宽间距","逐项审查启动采样脚、LED 复用与上电时序"]},
 {title:"差分布线与设计审查",phase:3,output:"高速接口 PCB 与关键网络标注图",criteria:"连续参考层、换层回流、差分路径和长度约束能解释且符合资料。",resources:[8,2],days:["按参考设计摆放 PHY、磁性器件和连接器","规划 RMII、参考时钟与线侧差分对的布线通道","完成关键布线，检查参考层是否连续","根据器件要求检查长度差、间距与换层次数","检查保护器件摆放、支路残桩与回流路径","运行规则检查并逐条人工审查，导出关键网络截图"]},
 {title:"接口验证与项目发布",phase:3,output:"制造包、验证矩阵与接口设计报告",criteria:"明确设计审查、仿真、功能实测和高速电气测试分别完成了哪些。",resources:[8],days:["建立验证矩阵：供电、时钟、复位、PHY 地址、链路和数据","有实物时读 PHY 寄存器；无实物时复核开发板与设计差异","有实物时验证链路和数据通信，记录条件与误差","在工具能力范围内做关键网络仿真并记录假设","整理已验证与未验证项，不将普通逻辑分析结果写成眼图认证","发布接口项目报告、完整工程、制造包及后续测试清单"]},
 {title:"工程作品集",phase:4,output:"两份板级项目说明和一份 SI / PI 报告",criteria:"他人能打开工程、复现仿真并看懂你的设计与问题定位过程。",resources:[],days:["整理工程目录，区分源文件、制造文件、仿真和实测数据","为 STM32 项目补齐需求、设计选择和验证证据","为接口项目标明个人工作及全部未验证项","给 SI / PI 实验编写一步步复现说明","为三个成果挑选最能解释问题的图和定量结果","用另一目录打开全部工程，检查缺失库、绝对路径和说明"]},
 {title:"基础问答与故障分析",phase:4,output:"30 道口述题答案及两份故障分析练习",criteria:"回答包含原理、图示和自己的项目例子；不会的问题有补课记录。",resources:[1,2,3,4],days:["复述稳压、功耗、上拉、开漏和电平兼容等 5 题","复述去耦、回流、地平面、叠层和过孔等 5 题","复述传输线、反射、串阻、串扰和眼图等 5 题","复述 STM32 电源、时钟、复位、SWD 和启动等 5 题","复述 UART、I²C、SPI、RMII 和 PHY 选型等 5 题","讲解 5 个项目设计选择，并完成无法下载 / 通信失败的排查练习"]},
 {title:"简历与模拟面试",phase:4,output:"一页简历、项目讲解稿和两次模拟面试复盘",criteria:"简历结果真实、有个人贡献；5 分钟能讲清一个完整项目。",resources:[],days:["按目标岗位整理技能证据，删除无法解释的关键词","完成一页简历，项目用问题、行动、证据描述","录制第一次 5 分钟项目讲解，检查表达与图示","进行第一轮模拟面试，记录卡住的问题","补充薄弱项，进行第二轮模拟面试并对比","修订简历和作品集，检查链接、文件权限与联系方式"]},
 {title:"投递与下一轮改进",phase:4,output:"岗位清单、投递记录、反馈分类与后续 4 周计划",criteria:"按岗位要求投递；下一阶段任务由实际反馈和项目缺口决定。",resources:[],days:["收集匹配的硬件研发、PCB、验证及 SI / PI 实习岗位","给岗位要求匹配具体项目证据，标记缺口","针对一组匹配岗位调整简历并完成投递","整理面试或投递反馈，区分表达、基础和工程短板","选择一个最高优先级缺口，制定可验证的补强任务","总结 24 周工程成果，安排下一轮 4 周学习与持续投递"]},
];
export function dailyTasks(index:number, budget:number) {
 const week=weeks[Math.floor(index/7)], day=index%7;
 if(day===6) return [
  {title:"回看本周证据",detail:`整理「${week.output}」，标记完成、待补和未实测项。`,minutes:10,type:"整理"},
  {title:"检查是否真正掌握",detail:week.criteria,minutes:10,type:"自测"},
  {title:"写下下周第一步",detail:"记录本周最难的问题和下周一个具体行动。今天轻量复盘，其余时间休息。",minutes:10,type:"复盘"},
 ];
 const theory=Math.round(budget/3),practice=Math.round(budget/2),review=budget-theory-practice;
 return [
  {title:"理解原理与查资料",detail:`围绕「${week.days[day]}」阅读本周资料，提取关键参数或操作步骤；求职阶段用于准备和核对。`,minutes:theory,type:"学习"},
  {title:week.days[day],detail:`保存今天的工程、计算、波形或文档，作为「${week.output}」的一部分。`,minutes:practice,type:"实践"},
  {title:"记录结果与一个问题",detail:"写下完成了什么、证据放在哪里、还不确定什么。能解释自己的选择，再勾选完成。",minutes:review,type:"复盘"},
 ];
}

