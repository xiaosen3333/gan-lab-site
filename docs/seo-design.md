# 静态页面架构与维护

网站使用原生 HTML、CSS 和 JavaScript，由 Node.js 确定性生成静态页面。GitHub Pages 仍从 main 分支根目录发布；不依赖服务端渲染、API 或前端框架。

## 内容真源与生成物

```text
research.js + team.js + publications.js
                  ↓
renderer.js + templates/shell.html + site.config.json
                  ↓ npm run build
34 个正文 HTML + 404.html + sitemap.xml + site-runtime.js
                  ↓
GitHub Pages main/root
```

三个数据文件分别维护研究、成员、论文关系。共享渲染层维护正文结构、可见字段、URL 与元信息规则。模板只保存页面壳；构建不会读取上一次生成的 index.html 作为输入。

当前 34 个公开页面由 6 个栏目、3 项研究和 25 个有实质资料的成员页组成。完整名录保留 31 位成员，6 位资料较少者仅展示身份；28 条书目不额外生成薄论文详情页。生成器通过 manifest 管理派生文件，仅清理不再使用且未经手工修改的旧输出。

## URL 与渐进增强

每个公开页面有真实目录 URL、初始正文、唯一 H1/title/description、自指 canonical、分享元信息与可解析 JSON-LD。生成的站内链接和资源均使用部署基路径。sitemap 仅包含规范页面，不收录 query、fragment、404 或不存在的详情页。

浏览器加载预生成正文，只使用 `site-runtime.js` 与 `app.js` 增强交互。首页三研究视角都在初始 HTML 中，无 JavaScript 时全部可读并可通过锚点定位；加载后增强为键盘可操作的 tab。页面导航采用原生链接，支持新标签和复制地址；历史状态保存滚动位置与名录焦点。

旧 `#/research/...`、`#/people/...`、成员查询、旧联系意图和名录 focus 链接映射到真实路径（旧联系分类统一进入联系页）。已知无详情成员回名录定位，旧管理/预览入口回首页；未知旧 hash 转向不存在的真实路径，由托管服务器返回 404。服务器看不到 URL fragment，客户端兼容跳转不能称为 HTTP 301。

404.html 保持 noindex 且不声明首页 canonical。托管层须对未知真实路径返回 HTTP 404，不能把首页作为 200 状态的兜底。

## 可见事实和图片

正文与结构化数据只表达已公开事实；学位 Title 不映射成职业资格，不把团队参与者子集写成完整作者列表。六个 `presentation` 开关继续控制隐藏字段。邮箱保持图片，不输出明文邮箱、mailto 或隐藏的结构化字段。

首页使用现有概念视觉的无损 WebP，保留 PNG 回退与分享图。它是概念图，不表示研究实验或修复结果。

## 检查与迁域名

使用 Node.js 20 或更新版本运行 `npm run build`、`npm run check`、`npm test`。check 只比较生成结果并检查正文、元信息、schema、站内链接、片段和内容数量；不会自动修正过期生成物。测试包括隔离副本中陈旧 HTML 的拒绝、旧链接负例、域名/基路径切换及真实 HTTP 状态。

`site.config.json` 的 `url` 是部署地址唯一真源，须为以 `/` 结尾的 HTTPS 目录 URL。获得实际 edu 域名和部署目录后修改该字段，再构建、检查、测试。所有 canonical、sitemap、OG、JSON-LD、站内链接、资源和兼容跳转都会随配置生成。部署根目录的路径为 `/`，也支持任意实际子目录。

域名、DNS、证书和旧地址逐页重定向属于托管配置；不能仅改配置文件就视为迁移完成。新主机还须验证深路径 200、未知路径 404、资源加载和手机交互。robots.txt 必须位于新主机根目录，项目子路径中的同名文件不能代替主机规则。

本轮不接入、验证或提交 Search Console，也不检查当前域名的收录、排名和流量。待 edu 域名确定后再处理站长平台。完整维护命令与迁移边界见根目录 README。
