'use strict';

// Public project facts and media. Original source pages are linked, not copied here.
const projects = [
  {
    id: 'moworld',
    title: 'MoWorld',
    category: '实时交互世界模型',
    summary: '通过连续的相机控制，探索生成的视频场景。',
    homepage: { summary: '用图像与文字生成连续的视频场景，并通过镜头运动探索场景。' },
    description: [
      'MoWorld 是面向交互式场景探索的视频世界模型，可生成随镜头运动连续变化的场景。',
    ],
    sections: [
      { title: '连续控制与场景生成', paragraphs: [
        '模型以初始图像、文字提示和相机轨迹为输入，持续响应相机控制信号，以流式视频呈现场景变化。文字提示与镜头控制共同决定场景内容和观看方式。',
      ] },
      { title: '应用展示', paragraphs: [
        '项目展示了生成场景的交互漫游、室内场景重建和影视镜头预演，探索世界模型在空间内容制作中的应用。项目主页提供生成效果与重建效果演示，技术报告介绍训练与推理方法。',
      ] },
    ],
    period: '2026',
    venue: '',
    media: {
      path: 'assets/projects/moworld-teaser.jpg',
      alt: 'MoWorld 论文中不同场景的生成画面与应用示意总图',
      caption: 'MoWorld 论文中的应用展示',
      width: 2008,
      height: 1503,
    },
    credits: [
      { role: '参与', people: [
        { name: '陈天润', memberId: 'chen-tianrun' },
        { name: '赵桉', memberId: 'zhao-an' },
        { name: '李泽健', memberId: 'li-zejian' },
      ] },
    ],
    links: [
      { label: '项目主页', url: 'https://moxin-tech.github.io/moworld/' },
      { label: '论文', url: 'https://arxiv.org/abs/2607.06216v2' },
    ],
    relatedResearchIds: [],
    action: '查看项目',
  },
  {
    id: 'canal-growth',
    title: '运河·生长·万象',
    category: '遥感影像生成国画长卷',
    summary: '将大运河遥感影像转化为国画长卷与动态影像。',
    homepage: { category: '生成艺术作品', venue: '浙江美术馆', summary: '将京杭大运河杭州段遥感影像转化为国画长卷与动态影像。' },
    description: [
      '作品以京杭大运河杭州段的遥感影像为基础，通过图像翻译将沿线空间结构与国画的笔触、色彩结合，生成静态画作与动态影像。',
    ],
    sections: [
      { title: '从遥感影像到国画', paragraphs: [
        '遥感影像与国画之间没有一一对应的样本。创作采用局部学习，让模型学习国画的笔触、色彩与质地，在运河地貌的结构上生成山峦、云雾、草木与房屋。',
      ] },
      { title: '静态长卷与动态影像', paragraphs: [
        '“万象”呈现不同绘画风格下的运河长卷；“生长”生成画作之间连续变化的过程，将静态图像组织成动态影像。最终作品由生成的候选画作中选出，并以图像与视频两种形式展出。',
        '2022 年 8 月 11 日至 10 月 11 日，作品展于浙江美术馆“大地史诗——中国大运河主题艺术展”。',
      ] },
    ],
    period: '2022',
    venue: '浙江美术馆 · 大地史诗展',
    media: {
      path: 'assets/projects/canal-growth.jpg',
      alt: '《运河·生长·万象》的水墨长卷，山水空间中交织运河沿线景观',
      caption: '《运河·生长·万象》作品长卷',
      width: 1080,
      height: 155,
    },
    credits: [
      { role: '创作团队', people: [
        { name: '孙凌云' }, { name: '尤伟涛' },
        { name: '李泽健', memberId: 'li-zejian' }, { name: '史姝慧' },
      ] },
      { role: '艺术指导', people: [{ name: '化鹏' }] },
    ],
    links: [{ label: '展览报道', url: 'https://mp.weixin.qq.com/s/_NjjqPFc5HAMMSyikLwF8g' }],
    relatedResearchIds: [],
    action: '查看作品',
  },
  {
    id: 'moran',
    title: '墨染',
    category: '智能国画创作系统',
    summary: '支持国画长卷合成、字体设计、风格与笔触迁移。',
    description: [
      '“墨染”是一套面向中国传统国画的 AI 创作系统，包含长卷合成、字体设计、风格与笔触迁移，以及水墨动画等创作模块。',
    ],
    sections: [
      { title: '图像与字体创作', paragraphs: [
        '长卷合成模块在两幅国画之间生成衔接内容，形成连续长卷；字体设计模块从少量样例字形推理同风格字库。风格化超分辨率、风格与笔触迁移用于生成高清、多风格的艺术画作。',
      ] },
      { title: '水墨动画与项目背景', paragraphs: [
        '动态内容增强与放缩、水墨画图层透视等模块支持将画作转化为动画。项目于 2018—2020 年在浙江大学—阿里巴巴前沿技术联合研究中心开展。',
      ] },
    ],
    period: '2018—2020',
    venue: '浙江大学—阿里巴巴前沿技术联合研究中心',
    media: {
      path: 'assets/projects/moran.jpg',
      alt: '“墨染”项目中的青绿山水与水墨山水作品对照',
      caption: '“墨染”项目中的国画作品',
      width: 900,
      height: 555,
    },
    credits: [{ role: '参与', people: [{ name: '李泽健', memberId: 'li-zejian' }] }],
    links: [{ label: '项目介绍', url: 'http://www.idi.zju.edu.cn/project/2804.html' }],
    relatedResearchIds: [],
    action: '查看项目',
  },
  {
    id: 'ai-history-atlas',
    title: '人工智能发展简史图谱',
    category: '信息可视化与展览设计',
    summary: '以时间与技术脉络组织人工智能的发展历史。',
    description: [
      '面向展览观众，以时间轴串联人工智能的重要事件、技术节点与主要流派，将技术史组织为可沿时间阅读的图谱。',
    ],
    sections: [
      { title: '内容与视觉组织', paragraphs: [
        '图谱从 1956 年达特茅斯会议延伸至 2022 年 ChatGPT，收录感知机、专家系统、生成对抗网络、AlphaGo 等节点，并介绍联结主义、行为主义与符号主义。各节点配合中英文说明，呈现不同研究路线的发展。',
      ] },
      { title: '展览', paragraphs: [
        '2023 年 8 月 18 日至 10 月 28 日，展于浙江美术馆“博弈论——亚运竞技主题数字艺术展”。',
      ] },
    ],
    period: '2023',
    venue: '浙江美术馆 · 博弈论展',
    media: {
      path: 'assets/projects/ai-history-atlas.jpg',
      alt: '人工智能发展简史图谱，沿年代排列技术节点、研究人物与流派关系',
      caption: '人工智能发展简史图谱',
      width: 1080,
      height: 12799,
      rotate: -90,
    },
    credits: [
      { role: '视觉设计', people: [
        { name: '李泽健', memberId: 'li-zejian' }, { name: '张颖', memberId: 'zhang-ying' },
      ] },
      { role: '内容撰写', people: [
        { name: '孟辰烨', memberId: 'meng-chenye' }, { name: '刘绮', memberId: 'liu-qi' },
        { name: '张晟源', memberId: 'zhang-shengyuan' },
      ] },
      { role: '项目负责', people: [{ name: '孙凌云' }] },
      { role: '学术指导', people: [{ name: '吴飞' }, { name: '汤永川' }] },
    ],
    links: [{ label: '展览报道', url: 'https://mp.weixin.qq.com/s/pwXEE0lUFsIGirGT_IXBsg' }],
    relatedResearchIds: [],
    action: '查看图谱',
  },
{
  "id": "poempalette",
  "title": "PoemPalette",
  "category": "诗歌理解与画面创作",
  "period": "2026",
  "summary": "将诗歌中的意象转化为可生成、组合与编辑的画面，支持诗歌爱好者探索诗意。",
  "description": [
    "将诗歌中的意象转化为可生成、组合与编辑的画面，支持诗歌爱好者探索诗意。"
  ],
  "sections": [
    {
      "title": "从意象到画面",
      "paragraphs": [
        "系统提取诗歌核心意象并组织为场景图，生成图像供使用者自由组合与拼贴。大语言模型智能体提供辅助解读，让文字理解与视觉创作相互衔接。"
      ]
    },
    {
      "title": "交互研究",
      "paragraphs": [
        "项目以中国古典美学中的“诗画一律”为基础，通过用户研究考察视觉创作对诗歌探索与理解的支持。相关成果发表于 CHI 2026。"
      ]
    }
  ],
  "credits": [
    {
      "role": "团队成员",
      "people": [
        {
          "name": "张颖",
          "memberId": "zhang-ying"
        },
        {
          "name": "颊凯欣",
          "memberId": "jia-kaixin"
        },
        {
          "name": "张洪渐",
          "memberId": "zhang-hongjian"
        },
        {
          "name": "朱可文",
          "memberId": "zhu-kewen"
        },
        {
          "name": "孟辰烨",
          "memberId": "meng-chenye"
        },
        {
          "name": "张杰斯",
          "memberId": "zhang-jiesi"
        },
        {
          "name": "李泽健",
          "memberId": "li-zejian"
        },
        {
          "name": "陈培",
          "memberId": "chen-pei"
        }
      ]
    }
  ],
  "links": [
    {
      "label": "研究详情",
      "route": "/research/poempalette"
    },
    {
      "label": "项目介绍",
      "url": "http://www.idi.zju.edu.cn/project/5022.html"
    },
    {
      "label": "论文",
      "url": "https://doi.org/10.1145/3772318.3791460"
    }
  ],
  "relatedResearchIds": [],
  "action": "查看项目",
  "media": {
    "path": "assets/projects/poempalette.webp",
    "width": 1600,
    "height": 793,
    "sourceURL": "http://www.idi.zju.edu.cn/wp-content/uploads/2026/05/49efa26c15a40ef7785106023951f361.png",
    "alt": "PoemPalette 的诗歌、意象图谱与画面创作界面",
    "caption": "PoemPalette 的诗歌、意象图谱与画面创作界面 · 浙江大学国际设计研究院"
  }
},
{
  "id": "3dinkgen",
  "title": "3DInkGen",
  "category": "生成式三维水墨创作",
  "period": "2026",
  "summary": "将二维水墨意象转化为可编辑的三维作品，让没有建模经验的爱好者也能进行水墨风格创作。",
  "description": [
    "将二维水墨意象转化为可编辑的三维作品，让没有建模经验的爱好者也能进行水墨风格创作。"
  ],
  "sections": [
    {
      "title": "水墨意象的三维表达",
      "paragraphs": [
        "创作流程连接元素提取、造型生成、三维重建与风格迁移，保留水墨的视觉语言，并将其用于三维形态表达。"
      ]
    },
    {
      "title": "创作体验",
      "paragraphs": [
        "系统围绕新手的创作过程设计交互，通过用户研究评估创作门槛与作品表现。相关成果发表于 CHI 2026。"
      ]
    }
  ],
  "credits": [
    {
      "role": "团队成员",
      "people": [
        {
          "name": "张杰斯",
          "memberId": "zhang-jiesi"
        },
        {
          "name": "张颖",
          "memberId": "zhang-ying"
        },
        {
          "name": "李泽健",
          "memberId": "li-zejian"
        },
        {
          "name": "谢常乐",
          "memberId": "xie-changle"
        }
      ]
    }
  ],
  "links": [
    {
      "label": "项目介绍",
      "url": "http://www.idi.zju.edu.cn/project/5001.html"
    },
    {
      "label": "论文",
      "url": "https://doi.org/10.1145/3772318.3791234"
    }
  ],
  "relatedResearchIds": [],
  "action": "查看项目",
  "media": {
    "path": "assets/projects/3dinkgen.webp",
    "width": 1600,
    "height": 1241,
    "sourceURL": "http://www.idi.zju.edu.cn/wp-content/uploads/2026/05/73a2be7307feb2bb43d4451d5888b056.png",
    "alt": "3DInkGen 用户的水墨意象与三维创作结果",
    "caption": "3DInkGen 用户的水墨意象与三维创作结果 · 浙江大学国际设计研究院"
  }
},
{
  "id": "inkrenew",
  "title": "InkRenew",
  "category": "人工智能辅助古画修复",
  "period": "2026",
  "summary": "围绕古画修复中的全色与接笔，为修复师提供符合画作风格的虚拟修复建议。",
  "description": [
    "围绕古画修复中的全色与接笔，为修复师提供符合画作风格的虚拟修复建议。"
  ],
  "sections": [
    {
      "title": "结合笔墨与时代风格",
      "paragraphs": [
        "系统将朝代特征、艺术家风格与笔墨技法纳入模型，为画面缺损区域提供数字修复方案，支持修复师进行比较与判断。"
      ]
    },
    {
      "title": "面向修复工作流程",
      "paragraphs": [
        "InkRenew 关注修复师的实际操作需求；用户研究考察系统的效率与使用体验。相关成果发表于 Humanities and Social Sciences Communications。"
      ]
    }
  ],
  "credits": [
    {
      "role": "团队成员",
      "people": [
        {
          "name": "张颖",
          "memberId": "zhang-ying"
        },
        {
          "name": "朱可文",
          "memberId": "zhu-kewen"
        },
        {
          "name": "李泽健",
          "memberId": "li-zejian"
        },
        {
          "name": "刘仲妮",
          "memberId": "liu-zhongni"
        },
        {
          "name": "颊凯欣",
          "memberId": "jia-kaixin"
        },
        {
          "name": "张杰斯",
          "memberId": "zhang-jiesi"
        }
      ]
    }
  ],
  "links": [
    {
      "label": "项目介绍",
      "url": "http://www.idi.zju.edu.cn/project/5023.html"
    },
    {
      "label": "论文",
      "url": "https://www.nature.com/articles/s41599-026-07117-y"
    }
  ],
  "relatedResearchIds": [],
  "action": "查看项目",
  "media": {
    "path": "assets/projects/inkrenew.webp",
    "width": 1600,
    "height": 571,
    "sourceURL": "http://www.idi.zju.edu.cn/wp-content/uploads/2026/05/99f19e91873856ff8b7161e9f2451acb.jpg",
    "alt": "InkRenew 的原画、缺损区域与 AI 数字修复结果对照",
    "caption": "InkRenew 的原画、缺损区域与 AI 数字修复结果对照 · 浙江大学国际设计研究院"
  }
},
{
  "id": "ink-restorer",
  "title": "Ink Restorer",
  "category": "古画虚拟修复体验",
  "period": "2025",
  "summary": "通过虚拟操作体验古画修复的“洗、揭、补、全”，让公众了解传统修复技艺。",
  "description": [
    "通过虚拟操作体验古画修复的“洗、揭、补、全”，让公众了解传统修复技艺。"
  ],
  "sections": [
    {
      "title": "传统工序与交互体验",
      "paragraphs": [
        "系统将图像分割与生成式修复用于交互操作，按照传统修复流程组织体验，使使用者逐步观察和处理画作中的问题。"
      ]
    },
    {
      "title": "文化技艺的数字呈现",
      "paragraphs": [
        "项目关注公众如何理解和体验古画修复，与面向修复师工作流程的 InkRenew 形成不同的使用场景。相关成果发表于 CHI 2025。"
      ]
    }
  ],
  "credits": [
    {
      "role": "团队成员",
      "people": [
        {
          "name": "张颖",
          "memberId": "zhang-ying"
        },
        {
          "name": "李泽健",
          "memberId": "li-zejian"
        },
        {
          "name": "张杰斯",
          "memberId": "zhang-jiesi"
        },
        {
          "name": "朱可文",
          "memberId": "zhu-kewen"
        },
        {
          "name": "刘绮",
          "memberId": "liu-qi"
        }
      ]
    }
  ],
  "links": [
    {
      "label": "研究详情",
      "route": "/research/ink-restorer"
    },
    {
      "label": "项目介绍",
      "url": "http://www.idi.zju.edu.cn/project/5024.html"
    },
    {
      "label": "论文",
      "url": "https://doi.org/10.1145/3706598.3714190"
    }
  ],
  "relatedResearchIds": [],
  "action": "查看项目",
  "media": {
    "path": "assets/research/ink-restorer-interface.webp",
    "alt": "Ink Restorer 中洗、揭、补、全四个古画虚拟修复步骤的交互界面",
    "caption": "古画虚拟修复的交互界面",
    "width": 1600,
    "height": 618,
    "sourceURL": "https://ai.zju.edu.cn/_upload/article/images/9e/4d/ea0ec4454d61bea673f78f4a25a4/f6ef444d-3b56-4b19-a35c-884ddd5fca70.jpg"
  }
},
{
  "id": "realtimegen",
  "title": "RealtimeGen",
  "category": "可干预的图像生成系统",
  "period": "2024—2025",
  "summary": "面向数字艺术素材创作者，在图像生成过程中提供介入与调整的交互方式。",
  "description": [
    "面向数字艺术素材创作者，在图像生成过程中提供介入与调整的交互方式。"
  ],
  "sections": [
    {
      "title": "创作者参与生成过程",
      "paragraphs": [
        "系统研究如何让创作者在生成进行时调整结果，将人的判断融入图像创作过程，支持对生成方向的持续控制。"
      ]
    },
    {
      "title": "数字素材创作",
      "paragraphs": [
        "项目通过创作任务与用户研究考察这种交互方式。相关成果在线发表于 2024 年，并收录于 International Journal of Human–Computer Interaction 2025 年卷期。"
      ]
    }
  ],
  "credits": [
    {
      "role": "团队成员",
      "people": [
        {
          "name": "李泽健",
          "memberId": "li-zejian"
        },
        {
          "name": "张颖",
          "memberId": "zhang-ying"
        },
        {
          "name": "刘绮",
          "memberId": "liu-qi"
        },
        {
          "name": "张杰斯",
          "memberId": "zhang-jiesi"
        }
      ]
    }
  ],
  "links": [
    {
      "label": "论文",
      "url": "https://doi.org/10.1080/10447318.2024.2382508"
    }
  ],
  "relatedResearchIds": [],
  "action": "查看项目"
},
{
  "id": "fusionprotor",
  "title": "FusionProtor",
  "category": "实体与数字融合的原型设计",
  "period": "2025",
  "summary": "将低保真实体原型转化为部件级三维数字模型，支持产品概念设计与仿真。",
  "description": [
    "将低保真实体原型转化为部件级三维数字模型，支持产品概念设计与仿真。"
  ],
  "sections": [
    {
      "title": "从实体部件到数字原型",
      "paragraphs": [
        "工具结合生成式人工智能与扩展现实，将手工原型中的部件转化为数字表达，支持在实体操作与虚拟设计之间往返推敲。"
      ]
    },
    {
      "title": "设计探索与验证",
      "paragraphs": [
        "设计师可以比较不同部件方案，并在三维环境中观察组合效果。相关成果发表于 CHI 2025。"
      ]
    }
  ],
  "credits": [
    {
      "role": "团队成员",
      "people": [
        {
          "name": "陈培",
          "memberId": "chen-pei"
        },
        {
          "name": "李泽健",
          "memberId": "li-zejian"
        }
      ]
    }
  ],
  "links": [
    {
      "label": "项目介绍",
      "url": "http://www.idi.zju.edu.cn/project/4519.html"
    },
    {
      "label": "论文",
      "url": "https://doi.org/10.1145/3706598.3713686"
    }
  ],
  "relatedResearchIds": [],
  "action": "查看项目",
  "media": {
    "path": "assets/projects/fusionprotor.webp",
    "width": 1024,
    "height": 435,
    "sourceURL": "http://www.idi.zju.edu.cn/wp-content/uploads/2025/05/d8fabd3a3374416edc6936a570599fba-1024x435.png",
    "alt": "FusionProtor 的实体原型与扩展现实设计场景",
    "caption": "FusionProtor 的实体原型与扩展现实设计场景 · 浙江大学国际设计研究院"
  }
},
{
  "id": "magic-pen",
  "title": "神笔",
  "category": "交互式动漫风景生成",
  "period": "2018—2020",
  "summary": "根据使用者的涂鸦生成具有艺术风格的风景画，支持人与人工智能协同绘画。",
  "description": [
    "根据使用者的涂鸦生成具有艺术风格的风景画，支持人与人工智能协同绘画。"
  ],
  "sections": [
    {
      "title": "涂鸦驱动的创作",
      "paragraphs": [
        "系统结合设计知识、图像数据与深度学习，将用户表达的图像语义转化为绘画内容。"
      ]
    },
    {
      "title": "联合研究",
      "paragraphs": [
        "项目在浙江大学—阿里巴巴前沿技术联合研究中心开展，项目团队包括李泽健、向为、孙凌云、陈培、黄天谱等。"
      ]
    }
  ],
  "credits": [
    {
      "role": "团队成员",
      "people": [
        {
          "name": "李泽健",
          "memberId": "li-zejian"
        },
        {
          "name": "陈培",
          "memberId": "chen-pei"
        }
      ]
    }
  ],
  "links": [
    {
      "label": "项目介绍",
      "url": "http://www.idi.zju.edu.cn/project/2764.html"
    }
  ],
  "relatedResearchIds": [],
  "action": "查看项目",
  "media": {
    "path": "assets/projects/magic-pen.webp",
    "width": 1015,
    "height": 509,
    "sourceURL": "http://www.idi.zju.edu.cn/wp-content/uploads/2021/05/e905f12d82b73ffb9a10ad780db577e5.jpg",
    "alt": "神笔生成的动漫风格森林画面",
    "caption": "神笔生成的动漫风格森林画面 · 浙江大学国际设计研究院"
  }
},
{
  "id": "charactercritique",
  "title": "CharacterCritique",
  "category": "儿童互动绘本系统",
  "period": "2025",
  "summary": "让儿童在故事阅读中与持不同观点的智能角色对话，练习解释、推理和多角度分析。",
  "description": [
    "让儿童在故事阅读中与持不同观点的智能角色对话，练习解释、推理和多角度分析。"
  ],
  "sections": [
    {
      "title": "故事中的不同观点",
      "paragraphs": [
        "系统围绕《谁拥有河流》等故事设计对话角色，将立场差异融入阅读情境，支持儿童比较不同解释并形成自己的判断。"
      ]
    },
    {
      "title": "亲子阅读与思辨",
      "paragraphs": [
        "项目将对话式人工智能用于亲子绘本阅读场景，探索多智能体交互对儿童批判性思维发展的支持。相关成果发表于 CHI 2025。"
      ]
    }
  ],
  "credits": [
    {
      "role": "团队成员",
      "people": [
        {
          "name": "李泽健",
          "memberId": "li-zejian"
        }
      ]
    }
  ],
  "links": [
    {
      "label": "项目介绍",
      "url": "http://www.idi.zju.edu.cn/project/4773.html"
    },
    {
      "label": "论文",
      "url": "https://doi.org/10.1145/3706598.3713602"
    }
  ],
  "relatedResearchIds": [],
  "action": "查看项目",
  "media": {
    "path": "assets/projects/charactercritique.webp",
    "width": 1600,
    "height": 766,
    "sourceURL": "http://www.idi.zju.edu.cn/wp-content/uploads/2025/07/ce6e2814f207c9333f10785606c57df3.png",
    "alt": "CharacterCritique 的绘本阅读界面与不同角色观点",
    "caption": "CharacterCritique 的绘本阅读界面与不同角色观点 · 浙江大学国际设计研究院"
  }
},
{
  "id": "artist-1",
  "title": "Artist 1.0 · 印象江南",
  "category": "油画辅助创作与展览",
  "period": "2026",
  "summary": "面向油画创作的辅助平台，支持创作者生成、编辑和推敲画面。相关作品展于“印象江南——人工智能辅助创作油画展”。",
  "description": [
    "面向油画创作的辅助平台，支持创作者生成、编辑和推敲画面。相关作品展于“印象江南——人工智能辅助创作油画展”。"
  ],
  "sections": [
    {
      "title": "生成与可控编辑",
      "paragraphs": [
        "Artist 1.0 由浙江大学国际设计研究院研发，将绘画知识用于辅助创作，提供视角调整、多图层局部重绘与构图重组等编辑方式。"
      ]
    },
    {
      "title": "印象江南",
      "paragraphs": [
        "展览于 2026 年 5 月 9 日在浙江大学校友企业总部经济园开幕，展出 73 幅作品，围绕江南水乡、古镇和自然景观展开。展览由浙江大学主办，浙江大学国际设计研究院、浙江大学创新创业研究院有限公司承办。"
      ]
    }
  ],
  "credits": [
    {
      "role": "项目参与",
      "people": [
        {
          "name": "李泽健",
          "memberId": "li-zejian"
        }
      ]
    }
  ],
  "links": [
    {
      "label": "项目与展览介绍",
      "url": "https://aha.yishujia.art/aiac-museum.html"
    },
    {
      "label": "浙江日报报道",
      "url": "https://zjnews.zjol.com.cn/zjnews/202605/t20260510_31653278.shtml"
    }
  ],
  "relatedResearchIds": [],
  "action": "查看项目"
}
];

const projectCapabilities = [
  {
    title: '生成模型蒸馏',
    description: '研究扩散与流匹配模型的蒸馏方法，减少生成步数、加快推理。',
    links: [{ label: 'DisBack 研究', route: '/research/disback' }],
  },
  {
    title: '文化内容生成',
    description: '利用生成模型创作国画、长卷与动态影像。',
    links: [
      { label: '运河·生长·万象', route: '/projects#canal-growth' },
      { label: '墨染', route: '/projects#moran' },
    ],
  },
  {
    title: '交互系统',
    description: '开发古画虚拟修复与诗画创作工具，让使用者通过交互体验传统艺术。',
    links: [
      { label: 'Ink Restorer 研究', route: '/research/ink-restorer' },
      { label: 'PoemPalette 研究', route: '/research/poempalette' },
    ],
  },
];
const projectPartners = [
  { id: 'bytedance', name: '字节跳动', logo: 'assets/partners/bytedance.svg', width: 256, height: 44 },
  { id: 'geely', name: '吉利', logo: 'assets/partners/geely.svg', width: 1339, height: 125 },
  { id: 'alibaba', name: '阿里巴巴', logo: 'assets/partners/alibaba.png', width: 902, height: 116 },
  { id: 'dji', name: '大疆', logo: 'assets/partners/dji.svg', width: 42, height: 24 },
];
