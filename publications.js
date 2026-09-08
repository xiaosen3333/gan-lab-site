'use strict';
// Selected research keeps its detail pages; the bibliography also includes other work.
const publicationMembers={
  "disback": [
    "zhang-shengyuan",
    "li-zejian",
    "zhao-an",
    "meng-chenye"
  ],
  "ink-restorer": [
    "zhang-ying",
    "li-zejian",
    "zhang-jiesi",
    "zhu-kewen",
    "liu-qi"
  ],
  "poempalette": [
    "zhang-ying",
    "jia-kaixin",
    "zhang-hongjian",
    "zhu-kewen",
    "meng-chenye",
    "zhang-jiesi",
    "li-zejian",
    "chen-pei"
  ]
};
const additionalPublications=[
{
  "id": "sferd",
  "name": "SFERD",
  "title": "Reducing Spatial Fitting Error in Distillation of Denoising Diffusion Models",
  "summary": "分析并减少去噪扩散模型蒸馏中的空间拟合误差。",
  "venue": "AAAI",
  "year": "2024",
  "url": "https://ojs.aaai.org/index.php/AAAI/article/view/28602",
  "memberIds": [
    "li-zejian",
    "zhang-shengyuan",
    "hou-lefan"
  ],
  "kind": "paper"
},
{
  "id": "distillation-dpo",
  "name": "Distillation-DPO",
  "title": "Diffusion Distillation With Direct Preference Optimization For Efficient 3D LiDAR Scene Completion",
  "summary": "把三维场景补全的评价指标转化为偏好对，用于扩散模型蒸馏。",
  "venue": "AAAI",
  "year": "2026",
  "url": "https://arxiv.org/abs/2504.11447",
  "memberIds": [
    "zhao-an",
    "zhang-shengyuan",
    "li-zejian"
  ],
  "kind": "paper",
  "format": "已接收",
  "acceptanceSource": "https://zejianli.github.io/markdown/2024/06/02/About-me.html"
},
{
  "id": "sepo",
  "name": "SEPO",
  "title": "SEPO: Self-Evolving Preference Optimization for Diffusion Alignment via Dynamic Rule Refinement",
  "summary": "研究通过动态优化评价规则进行扩散模型偏好对齐。",
  "venue": "ACM MM",
  "year": "2026",
  "url": "https://zejianli.github.io/markdown/2024/06/02/About-me.html",
  "memberIds": [
    "li-yize",
    "meng-chenye",
    "li-zejian",
    "huang-rui",
    "jia-kaixin"
  ],
  "kind": "paper",
  "format": "已接收",
  "acceptanceSource": "https://zejianli.github.io/markdown/2024/06/02/About-me.html",
  "sourceLabel": "导师成果目录"
},
{
  "id": "realtimegen",
  "name": "RealtimeGen",
  "title": "RealtimeGen: An Intervenable AI Image Generation System for Commercial Digital Art Asset Creators",
  "summary": "探索允许人在生成过程中介入的AI图像创作系统。",
  "venue": "IJHCI",
  "year": "2025",
  "url": "https://doi.org/10.1080/10447318.2024.2382508",
  "memberIds": [
    "li-zejian",
    "zhang-ying",
    "liu-qi",
    "zhang-jiesi"
  ],
  "kind": "paper",
  "onlineYear": "2024",
  "yearBasis": "2025正式卷期；2024在线发表，出版者Crossref元数据核对"
},
{
  "id": "coexploreds",
  "name": "CoExploreDS",
  "title": "CoExploreDS: Framing and Advancing Collaborative Design Space Exploration Between Human and AI",
  "summary": "通过动态生成建议支持设计师与AI共同探索设计空间。",
  "venue": "CHI",
  "year": "2025",
  "url": "https://doi.org/10.1145/3706598.3713869",
  "memberIds": [
    "chen-pei"
  ],
  "kind": "paper"
},
{
  "id": "protodreamer",
  "name": "ProtoDreamer",
  "title": "ProtoDreamer: A Mixed-prototype Tool Combining Physical Model and Generative AI to Support Conceptual Design",
  "summary": "结合实体模型与生成式AI，支持概念设计中的混合原型探索。",
  "venue": "UIST",
  "year": "2024",
  "url": "https://doi.org/10.1145/3654777.3676399",
  "memberIds": [
    "chen-pei"
  ],
  "kind": "paper"
},
{
  "id": "hybrid-prototype",
  "name": "混合原型设计",
  "title": "A Hybrid Prototype Method Combining Physical Models and Generative Artificial Intelligence to Support Creativity in Conceptual Design",
  "summary": "将实体原型与生成式AI结合，支持概念设计中的创意发展。",
  "venue": "TOCHI",
  "year": "2024",
  "url": "https://doi.org/10.1145/3689433",
  "memberIds": [
    "chen-pei"
  ],
  "kind": "paper"
},
{
  "id": "few-shot-translation",
  "name": "少样本增量图像生成",
  "title": "Few-Shot Incremental Learning for Label-to-Image Translation",
  "summary": "用少量新类别样本扩展语义标签到图像的生成能力，并减少对旧类别的遗忘。",
  "venue": "CVPR",
  "year": "2022",
  "url": "https://openaccess.thecvf.com/content/CVPR2022/html/Chen_Few-Shot_Incremental_Learning_for_Label-to-Image_Translation_CVPR_2022_paper.html",
  "memberIds": [
    "chen-pei",
    "li-zejian"
  ],
  "kind": "paper"
},
{
  "id": "score-evaluation",
  "name": "SCoRE",
  "title": "SCoRE: Standardized Human Evaluation Provides a Reliable Measure for Semantic Consistency of Text-to-Image Generation",
  "summary": "以标准化人工评价衡量文生图的语义一致性，检验评价的可靠性。",
  "venue": "IJCV",
  "year": "2026",
  "url": "https://link.springer.com/article/10.1007/s11263-026-02842-y",
  "memberIds": [
    "li-zejian",
    "liu-qi",
    "pan-jiaman",
    "huang-rui",
    "hou-lefan",
    "hu-xiangfei",
    "ma-jiarui",
    "zhang-shengyuan",
    "zhang-jiesi"
  ],
  "kind": "paper",
  "code": "https://github.com/9907lqlq/StanHumEval"
},
{
  "id": "sam-adapter",
  "name": "SAM-Adapter",
  "title": "SAM-Adapter: Adapting Segment Anything in Underperformed Scenes",
  "summary": "利用适配器将通用分割模型应用于伪装物体、阴影等具有挑战性的分割任务。",
  "venue": "ICCV Workshops",
  "year": "2023",
  "format": "Workshop论文",
  "url": "https://openaccess.thecvf.com/content/ICCV2023W/VCL/html/Chen_SAM-Adapter_Adapting_Segment_Anything_in_Underperformed_Scenes_ICCVW_2023_paper.html",
  "memberIds": [
    "chen-tianrun",
    "li-zejian"
  ],
  "kind": "paper",
  "code": "https://github.com/tianrun-chen/SAM-Adapter-PyTorch"
},
{
  "id": "deep3dvrsketch",
  "name": "Deep3DVRSketch",
  "title": "Rapid 3D Model Generation with Intuitive 3D Input",
  "summary": "将新手在虚拟现实中绘制的三维草图转化为三维模型，探索直观的建模交互。",
  "venue": "CVPR",
  "year": "2024",
  "url": "https://openaccess.thecvf.com/content/CVPR2024/html/Chen_Rapid_3D_Model_Generation_with_Intuitive_3D_Input_CVPR_2024_paper.html",
  "memberIds": [
    "chen-tianrun",
    "li-zejian"
  ],
  "kind": "paper"
},
{
  "id": "scorelidar",
  "name": "ScoreLiDAR",
  "title": "Distilling Diffusion Models to Efficient 3D LiDAR Scene Completion",
  "summary": "通过扩散模型蒸馏与结构约束，在减少采样步数的同时完成三维激光雷达场景。",
  "venue": "ICCV",
  "year": "2025",
  "url": "https://openaccess.thecvf.com/content/ICCV2025/html/Zhang_Distilling_Diffusion_Models_to_Efficient_3D_LiDAR_Scene_Completion_ICCV_2025_paper.html",
  "memberIds": [
    "zhang-shengyuan",
    "zhao-an",
    "li-zejian",
    "meng-chenye",
    "chen-tianrun"
  ],
  "kind": "paper",
  "code": "https://github.com/happyw1nd/ScoreLiDAR"
},
  {
    "id": "circular-dpo",
    "name": "Circular-DPO",
    "title": "Circular-DPO: Aligning Multi-Stage 3D Generative Models via Preference Feedback Loop",
    "summary": "用偏好反馈连接多阶段3D生成，协调形状与纹理的优化。",
    "venue": "CVPR",
    "year": "2026",
    "url": "https://openaccess.thecvf.com/content/CVPR2026/html/Li_Circular-DPO_Aligning_Multi-Stage_3D_Generative_Models_via_Preference_Feedback_Loop_CVPR_2026_paper.html",
    "memberIds": [
      "li-zejian",
      "ma-jiarui",
      "zheng-weiting",
      "zhu-yangrui",
      "meng-chenye",
      "chen-pei"
    ],
    "kind": "paper"
  },
  {
    "id": "sycophancy",
    "name": "AI谄媚与决策",
    "title": "Does Sycophancy Change Decisions? Effect of LLM Sycophancy on AI-Assisted Decision-Making",
    "summary": "研究语言模型迎合使用者的回答方式如何影响AI辅助决策。",
    "venue": "CHI",
    "year": "2026",
    "url": "https://doi.org/10.1145/3772318.3790934",
    "memberIds": [
      "li-zejian",
      "pan-jiaman",
      "liu-qi",
      "mao-rongjie",
      "chen-pei"
    ],
    "kind": "paper"
  },
  {
    "id": "narraid",
    "name": "NarrAid",
    "title": "NarrAid: Supporting Storytelling of People with Aphasia via Generative Visual Scene Displays",
    "summary": "借助生成式视觉场景，探索对失语症人群叙事表达的支持。",
    "venue": "CHI EA",
    "year": "2026",
    "url": "https://doi.org/10.1145/3772363.3798625",
    "memberIds": [
      "hu-xiangfei",
      "zheng-xiuqi",
      "liu-qi",
      "li-zejian",
      "zhang-ying"
    ],
    "kind": "paper",
    "format": "扩展摘要"
  },
  {
    "id": "3dinkgen",
    "name": "3DInkGen",
    "title": "3DInkGen: Extending Traditional Ink-Painting Artistry with Generative 3D Creation for Novices",
    "summary": "让新手通过生成式3D创作探索传统水墨艺术。",
    "venue": "CHI",
    "year": "2026",
    "url": "https://doi.org/10.1145/3772318.3791234",
    "memberIds": [
      "zhang-jiesi",
      "zhang-ying",
      "li-zejian",
      "xie-changle"
    ],
    "kind": "paper"
  },
  {
    "id": "digital-restoration",
    "name": "古画数字修复",
    "title": "From Traditional Craft to Digital Restoration: An Intelligent Rebirth of Ancient Chinese Painting Restoration Technique",
    "summary": "将传统古画修复知识与生成式AI结合，研究数字修复中的人的参与。",
    "venue": "HSSC",
    "year": "2026",
    "url": "https://www.nature.com/articles/s41599-026-07117-y",
    "memberIds": [
      "zhang-ying",
      "zhu-kewen",
      "li-zejian",
      "liu-zhongni",
      "jia-kaixin",
      "zhang-jiesi"
    ],
    "kind": "paper",
    "venueFull": "Humanities and Social Sciences Communications"
  },
  {
    "id": "inversion-dpo",
    "name": "Inversion-DPO",
    "title": "Inversion-DPO: Precise and Efficient Post-Training for Diffusion Models",
    "summary": "结合DDIM反演与直接偏好优化，研究扩散模型的高效后训练。",
    "venue": "ACM MM",
    "year": "2025",
    "url": "https://doi.org/10.1145/3746027.3755220",
    "memberIds": [
      "li-zejian",
      "li-yize",
      "meng-chenye",
      "liu-zhongni",
      "zhang-shengyuan"
    ],
    "kind": "paper",
    "code": "https://github.com/MIGHTYEZ/Inversion-DPO"
  },
  {
    "id": "evaluation-survey",
    "name": "图像生成评估综述",
    "title": "Image Generation Evaluation: A Comprehensive Survey of Human and Automatic Evaluations",
    "summary": "梳理人工与自动评价的协议、方法和工具，讨论图像生成如何被评价。",
    "venue": "FITEE",
    "year": "2025",
    "url": "https://doi.org/10.1631/FITEE.2400904",
    "memberIds": [
      "liu-qi",
      "li-zejian",
      "hou-lefan",
      "meng-chenye",
      "zhang-ying"
    ],
    "kind": "paper"
  },
  {
    "id": "fusionprotor",
    "name": "FusionProtor",
    "title": "FusionProtor: A Mixed-Prototype Tool for Component-level Physical-to-Virtual 3D Transition and Simulation",
    "summary": "以混合原型工具连接实体部件、虚拟3D原型与仿真。",
    "venue": "CHI",
    "year": "2025",
    "url": "https://doi.org/10.1145/3706598.3713686",
    "memberIds": [
      "chen-pei",
      "li-zejian"
    ],
    "kind": "paper"
  },
  {
    "id": "building-layouts",
    "name": "建筑空间布局生成",
    "title": "Automating 3D Building Layouts with Graph Neural Networks for Architectural Space Layout Modeling",
    "summary": "探索用图神经网络组织建筑空间并生成3D布局。",
    "venue": "CAAD Futures",
    "year": "2025",
    "url": "https://zejianli.github.io/markdown/2024/06/02/About-me.html",
    "memberIds": [
      "li-yize",
      "li-zejian"
    ],
    "kind": "paper",
    "award": "Best Paper Award",
    "sourceLabel": "导师成果目录"
  },
  {
    "id": "instapano",
    "name": "InstaPano",
    "title": "InstaPano: Zero-shot Instance Layout Controlled Panorama Generation Via Global Attention Fusion",
    "summary": "通过全局注意力融合，研究可按对象布局控制的全景图像生成。",
    "venue": "ECCV",
    "year": "2026",
    "url": "https://zejianli.github.io/markdown/2024/06/02/About-me.html",
    "memberIds": [
      "li-zejian",
      "huang-rui",
      "hou-lefan",
      "chen-pei",
      "zhang-shengyuan",
      "zhu-kewen"
    ],
    "kind": "paper",
    "format": "已接收",
    "sourceLabel": "导师成果目录"
  },
  {
    "id": "mean-flow",
    "name": "Mean Flow Distillation",
    "title": "Mean Flow Distillation: Robust and Stable Distillation for Flow Matching Models",
    "summary": "针对流匹配模型研究更稳定的蒸馏方法，支持单步生成。",
    "venue": "ICML",
    "year": "2026",
    "url": "https://arxiv.org/abs/2606.11155",
    "memberIds": [
      "zhao-an",
      "zhang-shengyuan",
      "sun-zhongjian",
      "li-zejian",
      "chen-tianrun"
    ],
    "kind": "paper",
    "format": "已接收",
    "acceptanceSource": "https://zejianli.github.io/markdown/2024/06/02/About-me.html"
  },
  {
    "id": "beyond-binary",
    "name": "Beyond Binary Preference",
    "title": "Beyond Binary Preference: Aligning Diffusion Models to Fine-grained Criteria by Decoupling Attributes",
    "summary": "将专业评价拆成细粒度属性，用更丰富的偏好信号指导图像生成。",
    "venue": "arXiv",
    "year": "2026",
    "url": "https://arxiv.org/abs/2601.04300",
    "memberIds": [
      "meng-chenye",
      "li-zejian",
      "liu-zhongni",
      "li-yize",
      "xie-changle",
      "jia-kaixin",
      "zhang-shengyuan"
    ],
    "kind": "preprint",
    "format": "预印本"
  },
  {
    "id": "laion-sg",
    "name": "LAION-SG",
    "title": "LAION-SG: An Enhanced Large-Scale Dataset for Training Complex Image-Text Models with Structural Annotations",
    "summary": "为图文样本加入场景图结构标注，支持多对象及复杂关系的可控生成。",
    "venue": "arXiv",
    "year": "2024",
    "url": "https://arxiv.org/abs/2412.08580",
    "memberIds": [
      "li-zejian",
      "meng-chenye",
      "li-yize",
      "zhang-shengyuan",
      "ma-jiarui"
    ],
    "kind": "preprint",
    "format": "预印本",
    "code": "https://github.com/mengcye/LAION-SG",
    "resource": "https://huggingface.co/datasets/mengcy/LAION-SG"
  }
];
const publications=[...works.map(w=>({...w,kind:"paper",detail:true,memberIds:publicationMembers[w.id]})),...additionalPublications].sort((a,b)=>Number(b.year)-Number(a.year));
