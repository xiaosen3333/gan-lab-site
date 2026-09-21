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
    "introduction": "研究智能设计，关注图像生成技术在人机协同创作中的应用。",
    "background": "任职于浙江大学软件学院，2019年获浙江大学计算机科学与技术博士学位。",
    "biography": [
      "研究方向包括生成模型、智能设计及人工智能辅助文化遗产保护，学术成果发表于CHI、ICLR、CVPR、AAAI、ICCV等国际会议。",
      "相关成果曾获世界人工智能大会最高奖SAIL奖、中国“好设计”创意奖，并参展“双创”周、中国国际工业博览会等。代表作品包括“墨染”系列国画创作系统、《运河·生长·万象》系列作品及人工智能发展简史图谱。",
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
    "researchSummary": "关注人机协作中的设计空间探索、概念设计与混合原型，以及生成式AI和智能体在设计活动中的应用。"
  },
  {
    "id": "zhang-shengyuan",
    "name": "张晟源",
    "english": "Shengyuan Zhang",
    "title": "电子信息博士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "关注扩散模型与流匹配模型的蒸馏、偏好优化及生成质量评价，研究高效采样、训练稳定性与三维场景补全。"
  },
  {
    "id": "chen-tianrun",
    "name": "陈天润",
    "english": "Tianrun Chen",
    "title": "电子信息博士",
    "titleSource": "团队确认专业，公开来源核验博士在读；2026-09-08",
    "profile": "https://tianrun-chen.github.io/",
    "profileLabel": "个人主页",
    "researchSummary": "研究计算机视觉与三维内容生成，关注草图、图像等直观输入如何支持三维建模，以及复杂场景中的图像分割。",
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
    "researchSummary": "关注图像生成的可控性与质量评价，研究全景图像布局控制、艺术风格迁移及扩散模型蒸馏。"
  },
  {
    "id": "meng-chenye",
    "name": "孟辰烨",
    "english": "Chenye Meng",
    "background": "2024年起在浙江大学攻读博士学位。",
    "profile": "https://openreview.net/profile?id=~Chenye_Meng1",
    "profileLabel": "学术档案",
    "honor": "江南大学2023届至善荣誉生“特别荣誉奖”",
    "honorUrl": "https://honorschool.jiangnan.edu.cn/info/1174/5202.htm",
    "title": "电子信息博士",
    "titleSource": "团队确认专业，公开来源核验博士在读；2026-09-08",
    "researchSummary": "关注生成模型的评价与偏好对齐，研究场景图、细粒度属性和高效蒸馏如何改善生成内容。",
    "biography": [
      "2019—2023年就读于江南大学数字媒体技术专业，曾连续两年获国家奖学金。"
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
    "researchSummary": "研究传统艺术与生成式AI的交互应用，关注古画数字修复、水墨创作与诗画理解，也探索生成内容评价及视觉叙事支持。"
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
    "researchSummary": "关注生成内容评价与人机协作，研究语义一致性、AI辅助决策，以及生成工具在文化创作与叙事表达中的应用。"
  },
  {
    "id": "zhang-jiesi",
    "name": "张杰斯",
    "english": "Jiesi Zhang",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "关注古画修复、诗画理解与三维水墨创作，将传统艺术知识融入交互工具，并研究生成内容评价与可干预的创作过程。"
  },
  {
    "id": "hu-xiangfei",
    "name": "胡翔斐",
    "english": "Xiangfei Hu",
    "title": "电子信息博士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "关注生成式视觉场景对失语症人群叙事表达的支持，以及图像与文字描述的语义一致性评价。"
  },
  {
    "id": "pan-jiaman",
    "name": "潘嘉漫",
    "english": "Jiaman Pan",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "关注AI辅助决策中语言模型的迎合行为，以及生成图像与文字描述的一致性评价。"
  },
  {
    "id": "ma-jiarui",
    "name": "马佳芮",
    "english": "Jiarui Ma",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "关注可控图像与三维生成，研究场景图、多阶段生成的偏好反馈及生成内容评价。",
    "background": "曾在江南大学学习数字媒体技术。",
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
    "researchSummary": "关注生成模型偏好优化、场景结构与建筑空间布局生成。",
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
    "researchSummary": "关注诗画交互、古画数字修复与生成模型偏好对齐，探索传统艺术知识和细粒度评价在生成过程中的作用。"
  },
  {
    "id": "zheng-xiuqi",
    "name": "郑修琦",
    "english": "Xiuqi Zheng",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "关注生成式视觉场景如何帮助失语症人群组织和讲述故事。"
  },
  {
    "id": "sun-zhongjian",
    "name": "孙仲俭",
    "english": "Zhongjian Sun",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "关注流匹配模型的高效蒸馏，研究单步生成中的训练稳定性。"
  },
  {
    "id": "huang-rui",
    "name": "黄锐",
    "english": "Rui Huang",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "关注可控图像生成与生成质量评价，研究全景布局控制、语义一致性及扩散模型偏好对齐。"
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
    "researchSummary": "关注面向初学者的三维水墨创作，以及扩散模型的细粒度偏好对齐。"
  },
  {
    "id": "zhao-an",
    "name": "赵桉",
    "english": "An Zhao",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "关注生成模型的高效蒸馏，研究采样步数、训练收敛与稳定性，并探索三维激光雷达场景补全。"
  },
  {
    "id": "zhu-kewen",
    "name": "朱可文",
    "english": "Kewen Zhu",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "关注古画数字修复与诗画交互，以及按对象布局生成全景图像。",
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
    "researchSummary": "关注诗画意境关联，探索交互工具如何支持诗歌理解与创作。"
  },
  {
    "id": "zheng-weiting",
    "name": "郑伟廷",
    "english": "Weiting Zheng",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "关注多阶段三维生成，研究形状与纹理生成之间的偏好反馈与协调。"
  },
  {
    "id": "liu-zhongni",
    "name": "刘仲妮",
    "english": "Zhongni Liu",
    "title": "工业设计工程硕士",
    "titleSource": "团队确认，2026-09-08",
    "researchSummary": "关注古画数字修复与生成模型对齐，研究传统修复流程、细粒度偏好与AI辅助建议的结合。",
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
    "researchSummary": "关注AI辅助决策，研究语言模型的迎合式回答是否改变使用者的判断。"
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
    "researchSummary": "关注多阶段三维生成，研究通过偏好反馈协调形状与纹理的生成。"
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
