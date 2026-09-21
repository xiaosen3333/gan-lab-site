# GAN lab 网站

AI、人机交互与传统文化。原生 HTML、CSS、JavaScript 静态站点，继续通过 GitHub Pages 从 main 分支根目录发布。35 个真实 URL 的 HTML 已包含完整正文，JavaScript 只增强锚点定位、历史位置恢复和旧链接兼容。

## 本地维护与发布

使用 Node.js 20 或更新版本，无需安装依赖：

```sh
npm run build
npm run check
npm test
npm run dev
```

默认预览入口为 `http://127.0.0.1:4175/gan-lab-site/`；`PORT=4180 npm run dev` 可指定端口。服务器按配置模拟部署路径，未知路径返回真正的 404，不用首页兜底。

先修改真源，再执行构建、检查、浏览器验收；提交真源及生成物，仍由现有 main/root Pages 发布。`npm run check` 只检查，不修复缺失或过期生成物；失败时先确认真源，再运行 build。内容变更涉及名录或研究数量时，应同步核对验收中的内容计数。

- `research.js`：三项研究的详情、目录/首页短摘要及经核验媒体；`team.js`：成员名录；`publications.js`：论文与成员关联。
- `projects.js`：四项项目与作品的简介、参与署名、媒体和来源链接，以及合作方向与合作单位。首页精选和项目页共用这份数据。
- `renderer.js`：共享正文、展示开关、真实 URL 和元信息规则；`templates/shell.html`：页头、页脚及页面壳。
- `styles.css`：现有视觉和响应式样式；`app.js`：渐进增强、旧 hash/query 兼容、历史位置恢复。
- `site.config.json`：部署 URL 的唯一配置。域名与部署路径从 `url` 派生。
- `scripts/build-site.mjs`：确定性生成；`scripts/check-site.mjs` 与 `tests/site.test.mjs`：静态、迁域名、旧链接和 HTTP 验证。

`index.html`、栏目/研究/成员目录下的 HTML、`404.html`、`sitemap.xml`、`site-runtime.js` 和 `generated-manifest.json` 均为派生文件，**不要手改**。生成器从模板和数据构建，不读取旧 index 作为模板。manifest 记录输出归属，过时条目只在仍与旧记录一致时清理，不删除整个内容目录。CSS 与浏览器脚本带确定性的内容版本号。

[静态页面架构与维护](docs/seo-design.md)说明生成和兼容规则。公开站点不显示内部审核或管理界面。老师提供已有材料与修改意见，由 AI 整理、核对并维护静态内容；旧管理和预览 hash 仍回首页。

## 内容与阅读层级

资料整理自[李泽健个人主页](https://zejianli.github.io/markdown/2024/06/02/About-me.html)、[浙大教师主页](https://person.zju.edu.cn/zejianli)及研究官方页面。成员身份与学位 Title 由团队确认；合作者不自动成为组员。当前收录 31 位成员、28 篇论文与预印本，25 位有实质资料的成员有详情页，另 6 位仅展示静态身份。研究数量仅指当前收录的相关作品，不是个人全部发表量，不推断个人分工。

名录只显示中文姓名与 Title，不设照片、头像或占位图。详情返回名录定位原成员，浏览器后退恢复当次位置。旧 `#/outputs?member=…`、`#/people?member=…` 和个人 hash 链接继续兼容；无资料者回名录定位本人。新链接使用真实路径，支持复制、新标签打开和无 JavaScript 阅读。

`renderer.js` 的六个 `presentation` 开关当前都为 `false`：英文姓名、分类、论文摘要、参与者、附属按钮和标题链接继续隐藏。原文链接及扩展数据仍保留在数据真源；关闭分类时旧 `type` 参数不限制 28 条书目。结构化数据只使用可见事实，不生成完整作者名单、虚构职务、机构背书或隐藏字段。

首页选择关系在 `renderer.js` 的 `homepageWorks`；摘要和媒体分别保存在 `research.js`、`projects.js` 原对象中。研究目录独立列出三项研究；所有内容直接可读，不使用 tab。旧 `#perspective-panel-0/1/2` 分别定位 DisBack、PoemPalette、Ink Restorer。论文页按年份分组并提供真实年份锚点，全部28篇同时保留；成员页的项目与作品只从项目署名中的 memberId 派生。联系页只显示邮箱图片和导师主页，不将地址写回正文、alt、JSON-LD 或 mailto。

首页先给简短团队身份，再依次展示 DisBack、MoWorld、Ink Restorer、运河·生长·万象，之后提供 PoemPalette 及完整栏目入口、合作伙伴。四项工作按自然内容高度呈现，DisBack 不添加装饰图或空白媒体框。原概念 PNG/WebP 保留在资源目录，但首页和分享元信息不再引用；首页与项目页的分享图使用 MoWorld，其余页面使用 GAN lab 品牌原图。原始内部材料不进入公开仓库。

历史状态按实际页面条目保存阅读位置和触发控件，滚动即时记录在内存、每750毫秒最多持久化一次，离开时立即保存，并按历史条目与完整URL在sessionStorage保存当前标签页快照，避免立即刷新读取到提前选中的旧历史状态。快照不匹配或存储不可用时回退历史状态；浏览器拒绝历史写入时保留原生导航。同页锚点及跨页的前进、后退，以及已有状态的刷新均恢复当时位置。新打开的 fragment 定位对应内容；历史遍历后的 hashchange 不重复定位。项目卡、成员卡、研究行和普通链接均可恢复焦点；修改键、新标签、外链和下载保留原生行为。

## 项目与作品维护

`/projects/` 包含 MoWorld、运河·生长·万象、墨染、人工智能发展简史图谱四项完整条目；稳定锚点依次为 `moworld`、`canal-growth`、`moran`、`ai-history-atlas`。首页的 MoWorld 和运河保留稳定卡片 ID，直接进入对应项目锚点；墨染与图谱保留在完整项目页，不另造薄详情页。新增或修改项目时更新 `projects.js`，保留准确参与角色，不将联合项目改写为团队独立研发。

原始项目/报道链接与署名在数据和公开条目中保留。MoWorld 配图来自论文 [Figure 1](https://arxiv.org/html/2607.06216v2/teaser.png)，原 JPEG 为 2008×1503（约1.18 MB），另有640/960/1440宽 WebP候选，分别约96/184/346 KB，均保持完整内容和长宽比。浏览器按 srcset/sizes 选择，图片按自然比例显示，首页首幅 MoWorld eager/high priority，其余图 lazy；原 JPEG 保留兼容回退和分享用途。多候选资源与原图入口全部经过统一 basePath 和文件存在性检查。其他作品图片在 `assets/projects/`，不包含全展海报、网页归档或内部证据文件。图片保留宽高、alt，项目页保留必要图注。

AI 图谱保留原始 JPEG，CSS 旋转为年代从左至右，独立图像区支持横向触控与键盘滚动，并提供完整原图链接。只让图区横滚，不能使整页超出屏幕。更换域名后的图片、完整原图入口和项目锚点同样由统一 basePath 生成，根目录和子目录迁移都有回归检查。

Ink Restorer 界面图来自[浙江大学人工智能学院成果介绍](https://ai.zju.edu.cn/2026/0528/c90228a3167505/page.htm)。`research.js` 保存准确原图 URL；网页使用 `assets/research/ink-restorer-interface.webp`（1600×618，约128 KB），由官方完整界面图等比缩小，保留四步骤及原图底部说明，首页与详情共用。更换媒体须核对来源、完整内容、尺寸和自然比例，不能将生成结果图写成实际修复成果。

项目来源分别为 [MoWorld 项目主页](https://moxin-tech.github.io/moworld/)、[运河展览报道](https://mp.weixin.qq.com/s/_NjjqPFc5HAMMSyikLwF8g)、[墨染项目介绍](http://www.idi.zju.edu.cn/project/2804.html)、[AI 简史图谱展览报道](https://mp.weixin.qq.com/s/pwXEE0lUFsIGirGT_IXBsg)。合作伙伴使用四家公司官方品牌标识，首页与项目页共用同一数据；保留完整名称 alt 和本地资源路径，不自行附加项目对应关系、战略伙伴或联合实验室称谓。字节跳动官方素材为白标，白底展示须保留 brightness(0) 样式。

## 更换浙江大学域名时

当前配置仍为 `https://xiaosen3333.github.io/gan-lab-site/`。新的 edu 域名尚未确定，本轮不修改域名、DNS 或证书。

确认实际 HTTPS 域名及部署目录后，只修改 `site.config.json` 的 `url`（目录 URL，以 `/` 结尾；若在域名根部署，路径就是 `/`），然后运行：

```sh
npm run build
npm run check
npm test
npm run dev
```

生成器同步更新 canonical、sitemap、OG、JSON-LD、站内链接、资源路径和旧链接桥接；测试包含隔离副本的项目子路径到 edu 示例根路径迁移，不触及真实域名。迁移后应在新主机验证真实深路径 200、未知路径 404、证书、资源和移动布局。

旧域名到新域名的 HTTP 301/308 需要旧主机或托管层配置；静态 HTML 的 canonical 与客户端旧 hash 跳转不是服务器重定向。GitHub Pages 的自定义域名机制、旧项目路径与新路径的逐页映射须按最终托管方式另行核对；不能仅改 JSON 就声称迁域名或重定向已完成。

## 搜索平台边界

当前 sitemap 为 `https://xiaosen3333.github.io/gan-lab-site/sitemap.xml`，仅包含 35 个规范页面；查询参数、404、管理页、无资料成员与并不存在的论文详情不进入 sitemap。没有可靠修改日期时不虚造 lastmod。公开页已移除 noindex；404 保持 noindex，不输出首页 canonical。

robots.txt 只在主机根生效。项目中的 `/gan-lab-site/robots.txt` 不能控制 `xiaosen3333.github.io`，所以本仓库不放一个冒充根规则的文件。未来 edu 主机的管理者须在其根目录确认抓取规则与 sitemap 声明。

按本轮要求，不接入、不验证、不提交 Google Search Console，也不核验当前域名的收录、排名或流量。等 edu 域名稳定后，可由管理者验证实际 URL-prefix/域名所有权，提交该域名的 sitemap，再查看抓取与索引报告；本轮不添加验证码、账户或凭据，不声称已提交或已收录。

标签页图标采用墨圈与蓝色像素方案，原图为 `assets/gan-mark.png`，16/32 像素 PNG 在页面构建时通过统一部署路径引用。
