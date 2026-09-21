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
    }
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
    "method": "通过可操作的场景图关联诗歌意象与画面。使用者可以调整画面表达，探索诗与画之间的意境联系。",
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
    }
  }
];
