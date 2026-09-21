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
        '2023 年 8 月 18 日至 10 月 28 日，展于浙江美术馆“博弈论——亚运竞技主题数字艺术展”。团队成员参与内容撰写与视觉设计。',
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
