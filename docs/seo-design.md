# 静态页面架构与维护

网站使用原生 HTML、CSS 和 JavaScript，由 Node.js 确定性生成静态页面。GitHub Pages 仍从 main 分支根目录发布；不依赖服务端渲染、API 或前端框架。

## 内容真源与生成物

```text
research.js + team.js + publications.js + projects.js
                  ↓
renderer.js + templates/shell.html + site.config.json
                  ↓ npm run build
35 个正文 HTML + 404.html + sitemap.xml + site-runtime.js
                  ↓
GitHub Pages main/root
```

四个数据文件分别维护研究、成员、论文关系和项目作品。共享渲染层维护正文结构、可见字段、URL 与元信息规则。模板只保存页面壳；构建不会读取上一次生成的 index.html 作为输入。

当前 35 个公开页面由 7 个栏目、3 项研究和 25 个有实质资料的成员页组成。完整名录保留 31 位成员，6 位资料较少者仅展示身份；46 条书目不额外生成薄论文详情页。生成器通过 manifest 管理派生文件，仅清理不再使用且未经手工修改的旧输出。

## URL 与渐进增强

每个公开页面有真实目录 URL、初始正文、唯一 H1/description、自指 canonical、分享元信息与可解析 JSON-LD；浏览器标签统一为 `GAN Lab | 浙江大学`，页面级差异保留在 OG、Twitter 和 JSON-LD 标题中。生成的站内链接和资源均使用部署基路径。sitemap 仅包含规范页面，不收录 query、fragment、404 或不存在的详情页。

浏览器加载预生成正文，只使用 `site-runtime.js` 与 `app.js` 增强交互。首页两项项目研究与三项文化实践均在初始 HTML 中，旧视角锚点定位到对应研究行；无 JavaScript 时内容全部可读。页面导航采用原生链接，支持新标签和复制地址；历史状态保存每个条目的阅读位置和实际触发控件，前进、后退与已有状态刷新均恢复，首开 fragment 才直接定位。

旧 `#/research/...`、`#/people/...`、成员查询、旧联系意图和名录 focus 链接映射到真实路径（旧联系分类统一进入联系页）。已知无详情成员回名录定位，旧管理/预览入口回首页；未知旧 hash 转向不存在的真实路径，由托管服务器返回 404。服务器看不到 URL fragment，客户端兼容跳转不能称为 HTTP 301。

404.html 保持 noindex 且不声明首页 canonical。托管层须对未知真实路径返回 HTTP 404，不能把首页作为 200 状态的兜底。

## 可见事实和图片

正文与结构化数据只表达已公开事实；学位 Title 不映射成职业资格，不把团队参与者子集写成完整作者列表。六个 `presentation` 开关继续控制隐藏字段。邮箱保持图片，不输出明文邮箱、mailto 或隐藏的结构化字段。

首页与项目页使用真实 MoWorld 媒体作为展示及分享图，其余页面分享品牌原图。MoWorld 的640/960/1440宽 WebP保持完整比例，浏览器按 srcset/sizes 选取；检查器逐个校验候选存在性与部署前缀。原 JPEG及概念视觉文件保留，概念视觉作为首页背景。首页精选和项目页复用 projects.js，13项内容通过稳定锚点访问。图谱仅在独立视窗横向滚动，完整原图链接也经过统一部署路径处理。

## 检查与迁域名

使用 Node.js 20 或更新版本运行 `npm run build`、`npm run check`、`npm test`。check 只比较生成结果并检查正文、元信息、schema、站内链接、片段和内容数量；不会自动修正过期生成物。测试包括隔离副本中陈旧 HTML 的拒绝、旧链接负例、域名/基路径切换及真实 HTTP 状态。

`site.config.json` 的 `url` 是部署地址唯一真源，须为以 `/` 结尾的 HTTPS 目录 URL。获得实际 edu 域名和部署目录后修改该字段，再构建、检查、测试。所有 canonical、sitemap、OG、JSON-LD、站内链接、资源和兼容跳转都会随配置生成。部署根目录的路径为 `/`，也支持任意实际子目录。

域名、DNS、证书和旧地址逐页重定向属于托管配置；不能仅改配置文件就视为迁移完成。新主机还须验证深路径 200、未知路径 404、资源加载和手机交互。robots.txt 必须位于新主机根目录，项目子路径中的同名文件不能代替主机规则。

本轮不接入、验证或提交 Search Console，也不检查当前域名的收录、排名和流量。待 edu 域名确定后再处理站长平台。完整维护命令与迁移边界见根目录 README。


## 2026-09-22 SEO 与 AI 搜索优化

目标受众是寻找浙江大学相关研究团队的研究者、设计与文化机构及技术合作方。网页应让访客判断团队背景、研究方向及可查证的成果。重点检索意图为“浙江大学 生成模型蒸馏”“浙江大学 人机交互研究团队”“浙江大学 文化遗产数字化”，而非承诺竞争宽泛的“浙江大学”排名。

生产前审查：团队身份只复用已有公开介绍，不声称正式院系建制；项目、论文与合作单位不混为所有权；不增加关键词堆砌、搜索专用薄页面或面向爬虫的隐藏文字。首页介绍与布局不因搜索优化而变长。关于页的主题标题、成果链接为人提供查阅价值。

本轮实施：
- 首页与栏目 title 明确团队及浙江大学身份，首页、关于页摘要说明生成模型蒸馏、人机交互与文化遗产数字化。
- Organization 采用与关于页一致的介绍和品牌图；页面 publisher 指向同一实体。项目、研究、论文目录 ItemList 与实际展示内容同源，不补虚构作者或赞助关系。
- 关于页链接 MoWorld、RealtimeGen、FusionProtor、InkRenew；研究详情的论文标题直达原文，并以 citation 描述真实来源。
- 所有可索引页允许大图摘要，保持正文初始 HTML 可读；生成 sitemap 发现链接及 robots.txt。robots 默认允许抓取，未设置针对 Googlebot、Bingbot、OAI-SearchBot 的限制；不增加针对训练爬虫的特殊授权。
- robots.txt **必须由主机在域名根路径提供才生效**。当前 GitHub Pages 项目目录中的文件不能控制主机根规则。迁入学校主机时，管理员须将 Sitemap 行合入该主机根 robots.txt，保留该主机其他规则；还需确认防火墙不误拦搜索爬虫。
- 新测试从首页遍历普通链接，核对35页可达、目录结构化条目在正文出现、论文引用可点击；既有测试继续覆盖根路径及子目录 edu 迁移。

依据：
- [Google AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)：常规 SEO、可抓取正文、内部链接及可见信息一致性，无额外 AI 专用文件要求。
- [Google generative AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)：面向读者的独特有用内容，避免批量搜索变体和 llms.txt 等无必要文件。
- [OpenAI Crawlers](https://developers.openai.com/api/docs/bots)：OAI-SearchBot 用于搜索，和 GPTBot 训练用途独立。

本轮不新增站长平台资源，不代替学校完成域名/DNS配置，不测排名。后续学校域名就绪后，需取得真实院系/教师主页到本站的链接，并执行逐页重定向与站点地图提交；这些外部步骤不能由本站 JSON-LD 替代。实现与测试通过只证明站内基础具备，不能保证收录、排名或 AI 引用。
