'use strict';
const mentorHome = 'https://zejianli.github.io/markdown/2024/06/02/About-me.html';
const universityHome = 'https://person.zju.edu.cn/zejianli';

// Research facts, reading summaries and approved media share this source.
const works = [
  {
    "id": "disback",
    "name": "DisBack",
    "theme": "生成模型",
    "year": "2025",
    "venue": "ICLR",
    "title": "Distribution Backtracking Builds A Faster Convergence Trajectory for Diffusion Distillation",
    "summary": "改进扩散模型的蒸馏方法，使模型训练更快收敛。",
    "question": "如何让扩散模型更快地生成图像？",
    "human": "算法研究者设计训练方法，并通过实验评价生成质量与收敛表现。",
    "ai": "将预训练扩散模型的能力蒸馏到学生生成器中。",
    "method": "DisBack 从教师模型到学生生成器的退化过程中记录中间分布，再训练学生沿反向路径回溯。将这一回溯路径用于蒸馏训练，帮助学生生成器更快收敛。",
    "stage": "发表于 ICLR 2025",
    "url": "https://proceedings.iclr.cc/paper_files/paper/2025/hash/189699197ead7a012c7fa4cdc4cc413d-Abstract-Conference.html",
    "source": "ICLR 官方论文页面",
    "tags": [
      "generation"
    ],
    "code": "https://github.com/SYZhang0805/DisBack",
    "overview": {
      "category": "生成模型",
      "summary": "改进扩散模型的蒸馏方法，使模型训练更快收敛。"
    },
    "homepage": {
      "category": "生成模型蒸馏",
      "summary": "通过分布回溯改进扩散模型蒸馏，使模型训练更快收敛。"
    },
    "context": {
      "title": "研究问题",
      "text": "扩散模型通常需要多步采样才能生成图像。蒸馏可以把教师模型的能力迁移到一步生成器，但教师与学生之间的分布差异会影响训练。DisBack 关注如何为学生建立更有效的收敛路径。"
    },
    "finding": {
      "title": "实验结果",
      "text": "实验比较了蒸馏训练的收敛速度与图像生成质量。DisBack 在 ImageNet 64×64 数据集上取得 1.38 的图像生成质量指标 FID（数值越低越好），并可结合已有蒸馏方法使用；论文报告了更快的收敛及相当或更好的生成表现。"
    }
  },
  {
    "id": "ink-restorer",
    "name": "Ink Restorer",
    "theme": "文化遗产 × 人机交互",
    "year": "2025",
    "venue": "CHI",
    "title": "Ink Restorer: Virtual Restoration of Ancient Chinese Paintings Inheriting Traditional Restoration Processes",
    "summary": "面向公众的古画虚拟修复交互系统。",
    "question": "传统古画修复过程，如何成为可参与的数字体验？",
    "human": "关注人如何通过虚拟交互接触和理解古画修复这一文化实践。",
    "ai": "利用图像分割和 AI 修复生成技术辅助虚拟修复操作。",
    "method": "系统按“洗、揭、补、全”四个环节组织操作，结合图像分割与 AI 图像修复，让公众体验古画修复流程。",
    "stage": "发表于 CHI 2025",
    "url": "https://doi.org/10.1145/3706598.3714190",
    "source": "浙江大学人工智能学院成果介绍与导师主页",
    "sourceUrl": "https://ai.zju.edu.cn/2026/0528/c90228a3167505/page.htm",
    "tags": [
      "interaction",
      "culture"
    ],
    "overview": {
      "category": "古画虚拟修复",
      "summary": "通过虚拟操作，体验古画修复的“洗、揭、补、全”四个环节。"
    },
    "homepage": {
      "category": "古画虚拟修复系统",
      "summary": "通过虚拟操作，体验古画修复的“洗、揭、补、全”四个环节。"
    },
    "media": {
      "path": "assets/research/ink-restorer-interface.webp",
      "alt": "Ink Restorer 中洗、揭、补、全四个古画虚拟修复步骤的交互界面",
      "caption": "古画虚拟修复的交互界面",
      "width": 1600,
      "height": 618,
      "sourceURL": "https://ai.zju.edu.cn/_upload/article/images/9e/4d/ea0ec4454d61bea673f78f4a25a4/f6ef444d-3b56-4b19-a35c-884ddd5fca70.jpg"
    },
    "context": {
      "title": "让公众体验古画修复",
      "text": "古画修复需要专业技艺与较长时间，公众很难亲身参与。Ink Restorer 将传统修复流程转化为数字画面上的交互体验，让使用者在操作中了解修复工序。"
    },
    "methodTitle": "虚拟修复流程"
  },
  {
    "id": "poempalette",
    "name": "PoemPalette",
    "theme": "诗画创作 × 人机交互",
    "year": "2026",
    "venue": "CHI",
    "title": "PoemPalette: Facilitating Poetry Creative Exploration and Foundational Understanding through the Ideorealm Alignment of Paintings and Poems",
    "summary": "将诗歌意象与画面联系起来，支持诗歌理解与创作探索。",
    "question": "人与生成式 AI 如何一起探索诗与画的意境？",
    "human": "使用者在诗意符号与图像之间进行探索、调整和理解，参与创作过程。",
    "ai": "通过诗画转换和生成支持探索，连接诗歌符号、图像与原文。",
    "method": "系统提取诗歌中的关键意象，将其组织为场景图，并根据使用者的调整生成画面。使用者可以拖拽、组合诗意元素，同时借助大语言模型智能体提问和理解诗文，在文字与图像之间反复探索。",
    "stage": "发表于 CHI 2026",
    "url": "https://doi.org/10.1145/3772318.3791460",
    "source": "ACM 论文页面与导师主页",
    "tags": [
      "interaction",
      "culture"
    ],
    "overview": {
      "category": "诗画交互",
      "summary": "通过场景图关联诗歌意象与画面，支持诗歌理解与创作探索。"
    },
    "context": {
      "title": "从诗歌意象到画面创作",
      "text": "PoemPalette 借鉴中国古典美学中的诗画意境关联，面向诗歌爱好者，将阅读与画面创作结合。使用者通过构建自己的诗意画面，探索和表达对诗文的理解。"
    },
    "methodTitle": "交互与生成",
    "finding": {
      "title": "用户研究",
      "text": "研究先通过六位诗歌教学专家的访谈形成设计目标，再邀请 60 位诗歌爱好者，围绕中国唐诗与日本俳句开展对照实验，与未加入场景图交互的 AI 工具及非 AI 图文材料比较，评估创作探索、诗歌理解和使用体验。两组诗歌实验中，PoemPalette 的创作探索与整体创造力支持评分均高于两类对照。"
    }
  }
];
