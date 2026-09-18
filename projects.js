'use strict';

// Public project facts and media. Original source pages are linked, not copied here.
const projects = [
  {
    id: 'moworld',
    title: 'MoWorld',
    category: '实时交互世界模型',
    summary: '通过连续的相机控制，探索生成的视频场景。',
    description: [
      'MoWorld 支持连续控制的视频世界生成，让使用者通过镜头运动探索生成场景。',
      '模型以初始图像、文字提示和相机轨迹作为输入，生成连续的视频场景。',
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
    featured: true,
    action: '查看项目',
  },
  {
    id: 'canal-growth',
    title: '运河·生长·万象',
    category: '遥感影像生成国画长卷',
    summary: '将大运河遥感影像转化为国画长卷与动态影像。',
    description: [
      '作品以京杭大运河杭州段的遥感影像为基础，学习空间结构与国画的笔触、色彩，通过图像翻译生成静态画作，并形成动态影像。',
      '2022 年 8 月 11 日至 10 月 11 日，作品展于浙江美术馆“大地史诗——中国大运河主题艺术展”。',
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
    featured: true,
    action: '查看作品',
  },
  {
    id: 'moran',
    title: '墨染',
    category: '智能国画创作系统',
    summary: '支持国画长卷合成、字体设计、风格与笔触迁移。',
    description: [
      '“墨染”面向中国传统国画的 AI 创作，支持长卷合成、字体设计、风格与笔触迁移等创作环节。',
      '系统可以在两幅国画之间生成衔接内容，探索不同风格的图像生成，并以画作动画模块呈现动态内容。',
      '项目于 2018—2020 年开展，来自浙江大学—阿里巴巴前沿技术联合研究中心。',
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
    featured: true,
    action: '查看系统',
  },
  {
    id: 'ai-history-atlas',
    title: '人工智能发展简史图谱',
    category: '信息可视化与展览设计',
    summary: '以时间与技术脉络组织人工智能的发展历史。',
    description: [
      '以时间轴串联关键技术节点、研究人物与主要流派，呈现人工智能的发展脉络。',
      '2023 年 8 月 18 日至 10 月 28 日，展于浙江美术馆“博弈论——亚运竞技主题数字艺术展”。',
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
    featured: false,
    action: '查看图谱',
  },
];

const projectCapabilities = [
  {
    title: '生成模型蒸馏',
    description: '围绕扩散与流匹配模型，开展模型蒸馏、少步生成与推理加速研究。',
    links: [{ label: 'DisBack 研究', route: '/research/disback' }],
  },
  {
    title: '文化内容生成',
    description: '结合文化图像与生成模型，创作国画图像、长卷和动态影像。',
    links: [
      { label: '运河·生长·万象', route: '/projects#canal-growth' },
      { label: '墨染', route: '/projects#moran' },
    ],
  },
  {
    title: '交互系统',
    description: '围绕古画虚拟修复与诗画探索，设计可操作的交互系统与文化体验。',
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
