'use strict';
// Names and confirmed titles supplied by the team; public academic sources are retained for verification.
const members=[
  {
    "id": "li-zejian",
    "name": "李泽健",
    "english": "Zejian Li",
    "group": "faculty",
    "title": "平台“百人计划”研究员 · 博士生导师",
    "titleSource": "https://zejianli.github.io/markdown/2024/06/02/About-me.html",
    "introduction": "从事智能设计交叉学科研究，探索图像生成技术如何支持人机协同创作。",
    "background": "浙江大学软件学院。2019年获浙江大学计算机科学与技术博士学位。",
    "biography": [
      "研究方向包括生成模型、智能设计及人工智能辅助文化遗产保护，学术成果发表于CHI、ICLR、CVPR、AAAI、ICCV等国际会议。",
      "相关成果曾获世界人工智能大会最高奖SAIL奖、中国“好设计”创意奖，并参展“双创”周、中国国际工业博览会等。代表性科艺融合作品包括“墨染”系列国画创作系统、《运河·生长·万象》系列作品及人工智能发展简史图谱。",
      "曾主持国家自然科学基金青年项目，并作为核心骨干参与科技部“新一代人工智能”重大项目、教育部人工智能算法规划研究项目和浙江省重点研发计划等。"
    ],
    "biographySources": [
      "http://person.zju.edu.cn/zejianli#0",
      "https://zejianli.github.io/markdown/2024/06/02/About-me.html"
    ]
  },
  {
    "id": "chen-pei",
    "name": "陈培",
    "english": "Pei Chen",
    "background": "任职于浙江大学人工智能学院。",
    "profile": "https://person.zju.edu.cn/chenpei",
    "profileLabel": "浙大教师主页",
    "group": "faculty",
    "title": "百人计划研究员 · 博士生导师",
    "titleSource": "https://person.zju.edu.cn/chenpei",
    "introduction": "研究生成式人工智能、智能体、人机协作与智能设计，探索面向设计活动的AI方法与交互工具。",
    "biography": [
      "获ACM SIGCHI中国新星奖。主持及参与国家自然科学基金、国家重点研发计划、浙江省“尖兵”计划及省自然科学基金等科研项目。",
      "指导学生获中国高校计算机大赛智能交互创新赛全国一等奖、“美丽中国”创新设计大赛全国总冠军、设计智造大奖新锐奖。"
    ],
    "biographySources": [
      "https://person.zju.edu.cn/chenpei#0"
    ],
    "researchSummary": "在设计空间探索与混合原型方面，相关工作包括CoExploreDS、ProtoDreamer与FusionProtor，发表于CHI、UIST和TOCHI；也研究少样本增量图像生成，相关成果发表于CVPR。"
  },
  {
    "id": "zhang-shengyuan",
    "name": "张晟源",
    "english": "Shengyuan Zhang",
    "title": "电子信息博士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "参与扩散模型与流匹配模型的高效生成研究，包括DisBack、Inversion-DPO与Mean Flow Distillation，分别探索蒸馏收敛、偏好优化和稳定的单步生成；在ScoreLiDAR中，将模型蒸馏用于三维激光雷达场景补全。参与IJCV 2026的SCoRE研究，以标准化人工评价衡量文生图的语义一致性。"
  },
  {
    "id": "chen-tianrun",
    "name": "陈天润",
    "english": "Tianrun Chen",
    "title": "电子信息博士",
    "titleSource": "团队确认专业，公开来源核验博士在读；2026-09-08",
    "profile": "https://tianrun-chen.github.io/",
    "profileLabel": "个人主页",
    "researchSummary": "研究计算机视觉及其应用，探索生成模型如何支持直观的三维创作与场景理解。参与的Deep3DVRSketch将虚拟现实草图转化为三维模型；SAM-Adapter研究通用分割模型对复杂场景的适配，相关工作发表于CVPR与ICCV Workshops。",
    "background": "本科毕业于浙江大学信息与电子工程学院，在浙江大学计算机科学与技术学院攻读博士学位，由潘云鹤、孙凌云共同指导。",
    "biographySources": [
      "https://tianrun-chen.github.io/",
      "https://zdpx.zju.edu.cn/news1.aspx?fl=301&id=9270",
      "https://www.zju.edu.cn/2022/0424/c32862a2522824/pagem.htm"
    ],
    "biography": [
      "作为GoPrint多功能智能打印机项目负责人，带领项目获2021年第七届中国国际“互联网+”大学生创新创业大赛总决赛季军；2022年获浙江大学学生创新创业先锋奖。"
    ]
  },
  {
    "id": "hou-lefan",
    "name": "侯乐凡",
    "english": "Lefan Hou",
    "title": "电子信息博士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "参与图像生成评价与可控生成研究，合著FITEE图像生成评价综述，梳理人工评价与自动评价的方法；在InstaPano中，探索以对象布局控制全景图像生成。参与IJCV 2026的SCoRE研究，以标准化人工评价衡量文生图的语义一致性。在AAAI 2024的SFERD工作中，研究扩散模型蒸馏中的空间拟合误差。"
  },
  {
    "id": "meng-chenye",
    "name": "孟辰烨",
    "english": "Chenye Meng",
    "background": "浙江大学博士生（2024年起）；江南大学本科（2019—2023）",
    "profile": "https://openreview.net/profile?id=~Chenye_Meng1",
    "profileLabel": "学术档案",
    "honor": "江南大学2023届至善荣誉生“特别荣誉奖”",
    "honorUrl": "https://honorschool.jiangnan.edu.cn/info/1174/5202.htm",
    "title": "电子信息博士",
    "titleSource": "团队确认专业，公开来源核验博士在读；2026-09-08",
    "researchSummary": "参与生成模型的评价、对齐与高效采样研究。相关工作包括LAION-SG场景图数据集、DisBack扩散蒸馏和Inversion-DPO偏好优化；Beyond Binary Preference进一步探索以细粒度属性表达生成内容的评价标准。",
    "biography": [
      "本科就读于江南大学数字媒体技术专业，曾连续两年获国家奖学金。"
    ],
    "biographySources": [
      "https://honorschool.jiangnan.edu.cn/info/1174/5202.htm"
    ]
  },
  {
    "id": "zhang-ying",
    "name": "张颖",
    "english": "Ying Zhang",
    "title": "电子信息博士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "参与传统艺术与生成式AI交叉研究，将古画修复流程、水墨创作和诗画理解转化为人机协作工具。相关工作包括Ink Restorer、PoemPalette与3DInkGen，发表于CHI；也参与图像生成评价综述及失语症叙事支持研究。参与的RealtimeGen支持人在AI图像生成过程中介入，面向数字美术资产创作。"
  },
  {
    "id": "zhang-jiahui",
    "name": "张家辉",
    "english": "",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08"
  },
  {
    "id": "liu-qi",
    "name": "刘绮",
    "english": "Qi Liu",
    "title": "电子信息博士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "参与生成内容评价与人机协作研究，合著图像生成评价综述，并研究语言模型的迎合式回答如何影响人的决策。相关工作也涉及古画虚拟修复，以及借助生成式视觉场景支持失语症人群表达。参与IJCV 2026的SCoRE研究，以标准化人工评价衡量文生图的语义一致性。参与的RealtimeGen支持人在AI图像生成过程中介入，面向数字美术资产创作。"
  },
  {
    "id": "zhang-jiesi",
    "name": "张杰斯",
    "english": "Jiesi Zhang",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "参与生成式AI与传统艺术创作研究，围绕古画修复、诗画理解和水墨三维创作开展工作。参与的Ink Restorer、PoemPalette与3DInkGen发表于CHI，探索将传统艺术知识融入交互工具。参与IJCV 2026的SCoRE研究，以标准化人工评价衡量文生图的语义一致性。参与的RealtimeGen支持人在AI图像生成过程中介入，面向数字美术资产创作。"
  },
  {
    "id": "hu-xiangfei",
    "name": "胡翔斐",
    "english": "Xiangfei Hu",
    "title": "电子信息博士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "参与NarrAid研究，探索用生成式视觉场景辅助失语症人群组织和讲述故事。这项工作关注表达中的实际困难，以及生成式AI如何支持人的沟通，成果发表于CHI EA 2026。参与IJCV 2026的SCoRE研究，以标准化人工评价衡量文生图的语义一致性。"
  },
  {
    "id": "pan-jiaman",
    "name": "潘嘉漫",
    "english": "Jiaman Pan",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "参与AI辅助决策研究，关注语言模型顺着使用者观点作答时，人的判断如何受到影响。相关论文发表于CHI 2026，研究AI的迎合式回答与决策行为之间的关系。参与IJCV 2026的SCoRE研究，以标准化人工评价衡量文生图的语义一致性。"
  },
  {
    "id": "ma-jiarui",
    "name": "马佳芮",
    "english": "Jiarui Ma",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "参与可控图像与三维生成研究。在LAION-SG中，以场景图结构标注支持复杂图文关系；在Circular-DPO中，通过偏好反馈连接三维形状与纹理生成阶段，相关成果发表于CVPR 2026。参与IJCV 2026的SCoRE研究，以标准化人工评价衡量文生图的语义一致性。",
    "background": "具有江南大学数字媒体技术学习背景。",
    "biographySources": [
      "https://ai.jiangnan.edu.cn/info/1054/3392.htm"
    ]
  },
  {
    "id": "li-yize",
    "name": "李依泽",
    "english": "Yize Li",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "参与生成模型偏好优化与空间生成研究，相关工作包括Inversion-DPO、LAION-SG及建筑空间布局建模。共同署名的图神经网络三维建筑布局论文获CAAD Futures 2025最佳论文奖。在SEPO中，研究以动态规则优化支持扩散模型对齐，该工作已获ACM MM 2026接收。",
    "background": "本科就读于江南大学数字媒体技术专业。",
    "honor": "江南大学2024—2025学年校长特别奖",
    "honorUrl": "https://jdxgc.jiangnan.edu.cn/info/1051/2162.htm",
    "biographySources": [
      "https://jdxgc.jiangnan.edu.cn/info/1051/2162.htm",
      "https://news.jiangnan.edu.cn/info/1130/100595.htm"
    ]
  },
  {
    "id": "jia-kaixin",
    "name": "颊凯欣",
    "english": "Kaixin Jia",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "参与诗画交互与古画数字修复研究，相关成果包括CHI 2026的PoemPalette与HSSC古画修复论文；同时参与Beyond Binary Preference，探索以细粒度属性对齐扩散模型的生成结果。参与的SEPO进一步研究动态规则优化与扩散模型对齐，已获ACM MM 2026接收。"
  },
  {
    "id": "zheng-xiuqi",
    "name": "郑修琦",
    "english": "Xiuqi Zheng",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "参与面向失语症人群的NarrAid研究，探索生成式视觉场景如何支持故事讲述与表达。成果发表于CHI EA 2026，将生成式AI与具体的沟通辅助场景结合。"
  },
  {
    "id": "sun-zhongjian",
    "name": "孙仲俭",
    "english": "Zhongjian Sun",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "参与Mean Flow Distillation研究，针对流匹配模型蒸馏中的稳定性问题，探索支持单步生成的方法。该工作关注生成效率与训练稳定性的结合。"
  },
  {
    "id": "huang-rui",
    "name": "黄锐",
    "english": "Rui Huang",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "参与InstaPano研究，通过全局注意力融合，让全景图像生成接受对象布局控制。相关工作面向复杂场景中的空间安排与可控生成，已获ECCV 2026接收。参与IJCV 2026的SCoRE研究，以标准化人工评价衡量文生图的语义一致性。也参与SEPO的扩散模型偏好对齐研究。"
  },
  {
    "id": "feng-linya",
    "name": "冯麟雅",
    "english": "",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08"
  },
  {
    "id": "xie-changle",
    "name": "谢常乐",
    "english": "Changle Xie",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "参与3DInkGen研究，探索让新手通过生成式三维创作体验传统水墨艺术，成果发表于CHI 2026；也参与扩散模型的细粒度偏好对齐研究。"
  },
  {
    "id": "zhao-an",
    "name": "赵桉",
    "english": "An Zhao",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "参与生成模型的高效蒸馏研究，包括DisBack与Mean Flow Distillation，关注减少生成步数时的收敛和稳定性；在ScoreLiDAR中，探索将蒸馏用于三维激光雷达场景补全。"
  },
  {
    "id": "zhu-kewen",
    "name": "朱可文",
    "english": "Kewen Zhu",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "参与古画数字修复与诗画交互研究，相关成果包括Ink Restorer、PoemPalette及HSSC古画修复论文，探索传统艺术知识与生成式AI的结合；也参与布局可控的全景图像生成研究。在InkRenew研究中，探索传统修复流程与AI辅助建议的结合。",
    "biographySources": [
      "https://ai.zju.edu.cn/2026/0528/c90228a3167491/page.htm"
    ]
  },
  {
    "id": "zhang-hongjian",
    "name": "张洪渐",
    "english": "HongJian Zhang",
    "title": "工业设计工程硕士",
    "titleSource": "本人确认，2026-09-08",
    "researchSummary": "参与PoemPalette研究，通过诗画意境对齐支持诗歌的创意探索与基础理解。该工作发表于CHI 2026，探索生成式AI如何连接文学理解、视觉表达与人的创作过程。"
  },
  {
    "id": "zheng-weiting",
    "name": "郑伟廷",
    "english": "Weiting Zheng",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "参与Circular-DPO研究，以偏好反馈连接三维生成的多个阶段，协调形状与纹理的优化。相关成果发表于CVPR 2026，关注生成结果与人的偏好如何对齐。"
  },
  {
    "id": "liu-zhongni",
    "name": "刘仲妮",
    "english": "Zhongni Liu",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "参与古画数字修复与生成模型对齐研究，相关工作包括HSSC古画修复论文和Inversion-DPO；也参与以细粒度属性表达偏好的扩散模型研究。在InkRenew研究中，探索传统修复流程与AI辅助建议的结合。",
    "biographySources": [
      "https://ai.zju.edu.cn/2026/0528/c90228a3167491/page.htm"
    ]
  },
  {
    "id": "mao-rongjie",
    "name": "毛荣杰",
    "english": "Rongjie Mao",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "参与AI辅助决策研究，关注语言模型的迎合式回答是否改变使用者的决定。相关论文发表于CHI 2026，从人的判断行为出发检验AI交互中的影响。"
  },
  {
    "id": "tian-shujun",
    "name": "田书君",
    "english": "",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08"
  },
  {
    "id": "xiao-yuxuan",
    "name": "肖雨暄",
    "english": "",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08"
  },
  {
    "id": "zhu-yangrui",
    "name": "祝阳睿",
    "english": "Yangrui Zhu",
    "title": "电子信息硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "参与Circular-DPO研究，探索通过偏好反馈循环协调多阶段三维生成中的形状与纹理优化，相关成果发表于CVPR 2026。"
  },
  {
    "id": "yang-xihao",
    "name": "杨曦皓",
    "english": "",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08"
  },
  {
    "id": "yuan-jiaxin",
    "name": "袁嘉欣",
    "english": "",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08"
  }
];
