'use strict';
const iconArrow='<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 17 17 7M7 7h10v10"/></svg>';
const arrow=(href,label)=>`<a class="link-arrow" href="${href}">${label}${iconArrow}</a>`;
const inline=(href,label)=>`<a class="inline-link" href="${href}">${label}${iconArrow}</a>`;
const heading=(title,description='',crumb='')=>`<div class="page-heading">${crumb?`<div class="breadcrumbs"><a href="#/">首页</a><span>/</span>${crumb}</div>`:''}<h1>${title}</h1>${description?`<p>${description}</p>`:''}</div>`;

// One reading summary for both the homepage and research index.
const workIntroductions = {
  disback: { category: '生成模型', summary: '研究扩散模型蒸馏，让学生生成器的训练更快收敛。', legacy: 0 },
  'ink-restorer': { category: '文化遗产修复', summary: '把传统古画修复的洗、揭、补、全四个环节转为虚拟操作。', legacy: 2 },
  poempalette: { category: '诗画交互', summary: '用可操作的场景图连接诗意符号与画面，支持诗画探索。', legacy: 1 },
};
function workRows({ home = false, level = 3 } = {}) {
  return works.map(work => {
    const introduction = workIntroductions[work.id];
    return `<article class="work-row" id="${home ? 'perspective-panel-' + introduction.legacy : 'research-entry-' + work.id}" tabindex="-1">
      <div class="work-year">${work.venue} / ${work.year}<span>${introduction.category}</span></div>
      <div><h${level}><a href="#/research/${work.id}">${work.name}</a></h${level}><p>${introduction.summary}</p></div>
      ${inline('#/research/' + work.id, '阅读研究')}
    </article>`;
  }).join('');
}
function home() {
  const featured = projects.find(project => project.id === 'moworld');
  return `<div class="shell">
    <section class="hero" aria-labelledby="home-title">
      <div class="hero-copy"><p class="hero-kicker">GAN lab / 浙江大学团队</p>
        <h1 id="home-title"><span>生成模型、</span><span>人机交互</span><span>与传统文化。</span></h1>
        <p class="hero-description">开展生成模型蒸馏、交互系统研发与文化作品创作。</p>
        <p class="hero-mentor">导师 <a href="#/people/li-zejian">李泽健 ${iconArrow}</a></p>
        <div class="hero-actions">${arrow('#/projects', '项目与作品')}<a class="quiet-link" href="#/people">认识团队 ${iconArrow}</a></div>
      </div>
      <div class="hero-project"><p class="hero-kicker">代表项目</p>${projectCard(featured, { hero: true })}</div>
    </section>
    ${featuredProjects()}
    <section class="featured-section" aria-labelledby="featured-title">
      <div class="section-topline"><h2 class="section-title" id="featured-title">研究</h2>${inline('#/outputs', '查看论文')}</div>
      <div class="work-list">${workRows({ home: true })}</div>
    </section>
    ${partnersSection({ compact: true })}
  </div>`;
}
function research() {
  return `<div class="shell research-page">${heading('研究', '生成模型、人机交互与传统文化。', '研究')}<div class="work-list">${workRows({ level: 2 })}</div></div>`;
}
function workDetail(work) {
  return `<article class="shell research-detail">
    <div class="page-heading"><div class="breadcrumbs"><a href="#/research">研究</a><span>/</span>${work.name}</div>
      <p class="hero-kicker">${work.theme} / ${work.venue} ${work.year}</p><h1>${work.name}</h1><p id="work-question">${work.summary}</p>
    </div>
    <div class="project-body">
      <section id="work-method"><h2>研究方法</h2><p>${work.method}</p></section>
      <section id="work-paper"><h2>论文</h2><div class="paper-citation"><span>${work.venue} · ${work.year}</span><h3>${work.title}</h3>
        ${presentation.publicationActions ? `<a class="inline-link" href="${work.url}" target="_blank" rel="noopener">阅读原文 ${iconArrow}</a>${work.code ? `<a class="inline-link" href="${work.code}" target="_blank" rel="noopener">项目代码 ${iconArrow}</a>` : ''}` : ''}
      </div>
      ${presentation.publicationParticipants ? `<div class="research-participants"><h3>参与这项研究的成员</h3><div class="participant-links">${memberLinks(publicationMembers[work.id])}</div></div>` : ''}
      </section>
    </div>
  </article>`;
}
// These presentation switches preserve optional catalogue tools and source links.
// They are intentionally hidden in the current reading-focused design.
const presentation=Object.freeze({
 memberEnglish:false,
 publicationFilters:false,
 publicationDescriptions:false,
 publicationParticipants:false,
 publicationActions:false,
 publicationTitleLinks:false
});
const publicationAreas={
 disback:['生成模型'], 'ink-restorer':['人机协作','文化与创作'], poempalette:['人机协作','文化与创作'],
 'circular-dpo':['生成模型','三维生成'], sycophancy:['人机协作'], narraid:['人机协作'],
 '3dinkgen':['三维生成','文化与创作'], 'digital-restoration':['人机协作','文化与创作'],
 'inversion-dpo':['生成模型'], 'evaluation-survey':['生成内容评价'], fusionprotor:['人机协作','三维设计'],
 'building-layouts':['三维生成'], instapano:['生成模型'], 'mean-flow':['生成模型'],
 'beyond-binary':['生成模型'], 'laion-sg':['生成模型'],
 sferd:['生成模型'], 'distillation-dpo':['生成模型','三维场景理解'], sepo:['生成模型'], realtimegen:['人机协作','图像创作'], coexploreds:['人机协作','概念设计'], protodreamer:['人机协作','概念设计'], 'hybrid-prototype':['人机协作','概念设计'], 'few-shot-translation':['生成模型'],
 'score-evaluation':['生成内容评价'], 'sam-adapter':['计算机视觉'], deep3dvrsketch:['三维生成','人机协作'], scorelidar:['生成模型','三维场景理解']
};
function memberLinks(ids){return ids.map(id=>{const m=members.find(m=>m.id===id);return hasMemberDetails(m)?`<a href="#/people/${m.id}">${m.name}</a>`:`<span>${m.name}</span>`;}).join('');}
function memberPapers(id){return publications.filter(p=>p.memberIds.includes(id));}
function researchOverview(papers){
 if(!papers.length)return '';
 const areas=[...new Set(papers.flatMap(p=>publicationAreas[p.id]||[]))];
 const labels=areas.slice(0,3).join('、')+(areas.length>3?'等方向':'');
 const noun=papers.some(p=>p.kind==='preprint')?'论文与预印本':'论文';
 return `以下收录其参与的${papers.length}篇${noun}，研究涉及${labels}。`;
}
function publicationRows(papers,{level=2,type='all'}={}){
 return papers.map(p=>`<article class="paper-row">
 <div class="paper-reference"><span>${p.year}</span><span>${p.venue}${p.format?' · '+p.format:''}</span>${p.award?`<span class="paper-award">${p.award}</span>`:''}</div>
 <div class="paper-content"><h${level}>${presentation.publicationTitleLinks?`<a href="${p.detail?'#/research/'+p.id:p.url}"${p.detail?'':' target="_blank" rel="noopener"'}>${p.title}</a>`:p.title}</h${level}>
 ${presentation.publicationDescriptions?`<p>${p.summary}</p>`:''}
 ${presentation.publicationParticipants?`<div class="publication-people"><span>团队参与</span><div class="participant-links">${memberLinks(p.memberIds)}</div></div>`:''}
 ${presentation.publicationActions?`<div class="paper-actions">${p.detail?inline('#/research/'+p.id,'研究介绍'):''}<a class="inline-link" href="${type==='tools'?p.code:type==='data'?p.resource:p.url}" target="_blank" rel="noopener">${type==='tools'?'项目代码':type==='data'?'访问数据集':p.sourceLabel||'论文原文'} ${iconArrow}</a>${p.acceptanceSource?`<a class="inline-link" href="${p.acceptanceSource}" target="_blank" rel="noopener">收录信息 ${iconArrow}</a>`:''}</div>`:''}
 </div></article>`).join('');
}
function outputs(params=new URLSearchParams()){
 const filterTypes=[['all','全部'],['papers','论文'],['preprints','预印本'],['tools','代码'],['data','数据集']];
 const outputFilter=presentation.publicationFilters&&filterTypes.some(([id])=>id===params.get('type'))?params.get('type'):'all';
 const shown=publications.filter(p=>outputFilter==='all'||(outputFilter==='papers'&&p.kind==='paper')||(outputFilter==='preprints'&&p.kind==='preprint')||(outputFilter==='tools'&&p.code)||(outputFilter==='data'&&p.resource));
 return `<div class="shell bibliography-page">${heading('论文','团队参与的'+publications.length+'篇论文与预印本。','论文')}
 ${presentation.publicationFilters?`<div class="chip-group" aria-label="成果类型">${filterTypes.map(([id,label])=>`<button class="chip" aria-pressed="${id===outputFilter}" data-output-filter="${id}">${label}</button>`).join('')}</div>`:''}
 <nav class="year-index" aria-label="论文年份">${[...new Set(shown.map(paper => paper.year))].sort((a, b) => b - a).map(year => `<a href="#year-${year}">${year}</a>`).join('')}</nav>
 ${[...new Set(shown.map(paper => paper.year))].sort((a, b) => b - a).map(year => `<section class="publication-year" aria-labelledby="year-${year}"><h2 id="year-${year}">${year}</h2><div class="paper-list">${publicationRows(shown.filter(paper => paper.year === year), { level: 3, type: outputFilter })}</div></section>`).join('')}</div>`;
}
function hasMemberDetails(m){return Boolean(m.introduction||m.background||m.biography?.length||m.researchSummary||m.profile||m.honor||memberPapers(m.id).length);}
function personCard(m){const detailed=hasMemberDetails(m);return `<article class="person-card" id="member-${m.id}" tabindex="-1"><${detailed?'a':'div'} class="person-card-link"${detailed?` href="#/people/${m.id}"`:''}><div class="person-card-heading"><h3>${m.name}</h3><span class="person-title">${m.title||'团队成员'}</span></div>${presentation.memberEnglish&&m.english?`<p class="person-english">${m.english}</p>`:''}${detailed?`<span class="person-navigation" aria-hidden="true">${iconArrow}</span>`:''}</${detailed?'a':'div'}></article>`;}
function people(){return `<div class="shell people-page">${heading('团队','','团队')}
 <section class="roster-section" aria-labelledby="faculty-title"><h2 id="faculty-title">教师</h2><div class="people-roster">${members.filter(m=>m.group==='faculty').map(personCard).join('')}</div></section>
 <section class="roster-section" aria-labelledby="members-title"><h2 id="members-title">研究成员</h2><div class="people-roster">${members.filter(m=>m.group!=='faculty').map(personCard).join('')}</div></section>
 </div>`;}
function memberProjects(memberId) {
  return projects.flatMap(project => {
    const roles = project.credits.filter(credit => credit.people.some(person => person.memberId === memberId)).map(credit => credit.role);
    return roles.length ? [{ project, roles }] : [];
  });
}
function memberPage(member) {
  const papers = memberPapers(member.id);
  const contributions = memberProjects(member.id);
  const isMentor = member.id === 'li-zejian';
  const overview = isMentor ? '' : researchOverview(papers);
  const links = isMentor ? [{ url: universityHome, label: '浙大主页' }, { url: mentorHome, label: '个人主页' }] : member.profile ? [{ url: member.profile, label: member.profileLabel === '浙大教师主页' ? '浙大主页' : member.profileLabel === '学术档案' ? '学术主页' : '个人主页' }] : [];
  const awards = publications.filter(paper => paper.award && paper.memberIds.includes(member.id));
  const sections = [
    ['member-introduction', '介绍'],
    ...(contributions.length ? [['member-projects', '项目与作品']] : []),
    ...(papers.length ? [['member-papers', '研究论文']] : []),
    ...(awards.length || member.honor ? [['member-honors', '学术荣誉']] : []),
  ];
  return `<article class="shell member-page">
    <div class="page-heading member-heading"><div class="breadcrumbs"><a href="#/people?focus=${member.id}">团队</a><span>/</span>${member.name}</div>
      <div class="person-heading-line"><h1>${member.name}</h1><span class="person-title">${member.title || '团队成员'}</span></div>
      ${presentation.memberEnglish && member.english ? `<p class="person-english">${member.english}</p>` : ''}
    </div>
    <div class="member-reading">
      ${sections.length > 2 || papers.length > 3 ? `<nav class="member-index" aria-label="个人内容">${sections.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}</nav>` : ''}
      <section class="member-introduction" id="member-introduction" aria-label="个人介绍">
        ${member.introduction ? `<p class="member-statement">${member.introduction}</p>` : ''}
        ${member.background ? `<p class="member-background-copy">${member.background}</p>` : ''}
        ${(member.biography || []).map(paragraph => `<p class="member-background-copy">${paragraph}</p>`).join('')}
        ${member.researchSummary ? `<p class="member-overview">${member.researchSummary}</p>` : overview ? `<p class="member-overview">${overview}</p>` : ''}
        ${links.length ? `<div class="profile-links">${links.map(link => `<a class="inline-link" href="${link.url}" target="_blank" rel="noopener">${link.label} ${iconArrow}</a>`).join('')}</div>` : ''}
      </section>
      ${contributions.length ? `<section class="member-projects" aria-labelledby="member-projects"><h2 id="member-projects">项目与作品</h2><ul>${contributions.map(({ project, roles }) => `<li><a href="#/projects#${project.id}">${project.title} ${iconArrow}</a><span>${roles.join('、')}</span></li>`).join('')}</ul></section>` : ''}
      ${papers.length ? `<section class="member-publications" aria-labelledby="member-papers"><h2 id="member-papers">研究论文 <span>· ${papers.length}篇</span></h2><div class="paper-list">${publicationRows(papers, { level: 3 })}</div></section>` : ''}
      ${awards.length || member.honor ? `<section class="member-honors" aria-labelledby="member-honors"><h2 id="member-honors">学术荣誉</h2>${awards.map(paper => `<p>${paper.venue} ${paper.year} ${paper.award}</p>`).join('')}${member.honor ? `<p>${member.honor}</p>` : ''}</section>` : ''}
    </div>
  </article>`;
}
function about() {
  const institutions = [
    ['浙江大学国际设计研究院', 'http://idi.zju.edu.cn/'],
    ['浙江大学软件学院', 'http://www.cst.zju.edu.cn/'],
    ['浙江大学人工智能学院', 'https://ai.zju.edu.cn/'],
  ];
  const resources = institutions.map(([name, url]) => `<a href="${url}" target="_blank" rel="noopener">${name}</a>`);
  return `<div class="shell">${heading('关于 GAN lab', '', '关于')}
    <section class="page-section about-grid"><h2>团队与研究</h2><div><p>GAN lab 是浙江大学团队，导师为李泽健。研究涵盖生成模型、人机交互与传统文化，开展生成模型蒸馏、交互系统研发与文化作品创作。</p><div class="profile-links">${inline('#/people/li-zejian', '李泽健')}${inline('#/people', '团队成员')}</div></div></section>
    <section class="page-section about-grid"><h2>研究资源</h2><p>团队依托${resources[0]}、${resources[1]}与${resources[2]}的相关研究资源，开展交叉研究。</p></section>
  </div>`;
}

function contact(){return `<div class="shell">${heading('交流与合作','','交流与合作')}<section class="contact-channel" aria-label="联系导师"><span class="label">导师公开学术邮箱</span><div class="contact-email"><img src="assets/contact-channel.png" alt="李泽健老师的学术邮箱，地址见图片" width="732" height="89"></div><small>李泽健 · 浙江大学</small><a class="inline-link" href="${mentorHome}" target="_blank" rel="noopener">导师个人主页 ${iconArrow}</a></section></div>`;}

// Shared route and metadata rules. Content remains in the three data files above.
const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);
const plainText = value => String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
function pathFor(route) {
  const [path, suffix = ''] = route.split(/(?=[?#])/s, 2);
  const clean = path.replace(/^\/+|\/+$/g, '');
  return site.basePath + (clean ? clean + '/' : '') + suffix;
}
function hrefFor(route) {
  const parsed = new URL(route, 'https://route.invalid');
  const path = parsed.pathname.replace(/\/$/, '') || '/';
  if (path === '/people' && parsed.searchParams.has('focus')) {
    const id = parsed.searchParams.get('focus');
    if (members.some(member => member.id === id)) {
      parsed.searchParams.delete('focus');
      parsed.hash = 'member-' + id;
    }
  }
  if (path === '/contact') return pathFor('/contact');
  return pathFor(path) + parsed.search + parsed.hash;
}
function publicHTML(html, route = '/') {
  return html
    .replace(/href="#\/([^"]*)"/g, (_, target) => `href="${escapeHTML(hrefFor('/' + target))}"`)
    .replace(/href="#(work-[^"]+|perspective-panel-[^"]+)"/g, (_, id) => `href="${pathFor(route)}#${id}"`)
    // Prefix every responsive candidate, not only the first URL in srcset.
    .replace(/srcset="([^"]+)"/g, (_, candidates) => `srcset="${candidates.split(',').map(candidate => candidate.trim().replace(/^assets\//, site.basePath + 'assets/')).join(', ')}"`)
    .replace(/(href|src)="assets\//g, `$1="${site.basePath}assets/`);
}
function allRoutes() {
  return ['/', '/projects', '/research', '/outputs', '/people', '/about', '/contact',
    ...works.map(work => '/research/' + work.id),
    ...members.filter(hasMemberDetails).map(member => '/people/' + member.id)];
}
function pageFor(route) {
  let html, title, description, nav = '', kind = 'WebPage', person = null;
  if (route === '/') {
    html = home();
    title = 'GAN lab｜浙江大学 AI、人机交互与传统文化研究团队';
    description = 'GAN lab 是浙江大学团队，导师为李泽健。开展生成模型蒸馏、交互系统研发与文化作品创作。';
  } else if (route === '/projects') {
    html = projectsPage(); title = '项目与作品｜GAN lab'; nav = 'projects'; kind = 'CollectionPage';
    description = 'GAN lab 团队成员参与的系统研发与文化创作，包括 MoWorld、运河·生长·万象、墨染和人工智能发展简史图谱。';
  } else if (route === '/research') {
    html = research(); title = '研究｜GAN lab'; nav = 'research'; kind = 'CollectionPage';
    description = 'GAN lab 的生成模型、人机协作与文化创作研究，包括 DisBack、Ink Restorer 和 PoemPalette。';
  } else if (works.some(work => route === '/research/' + work.id)) {
    const work = works.find(work => route === '/research/' + work.id);
    html = workDetail(work); title = `${work.name}｜${work.theme}｜GAN lab`; nav = 'research';
    description = `${work.name}：${work.summary}${work.stage}。`;
  } else if (route === '/outputs') {
    html = outputs(); title = '论文｜GAN lab'; nav = 'outputs'; kind = 'CollectionPage';
    description = `围绕生成模型、人机协作与文化创作，这里收录了 GAN lab 团队参与的${publications.length}篇论文与预印本。`;
  } else if (route === '/people') {
    html = people(); title = '团队｜GAN lab'; nav = 'people'; kind = 'CollectionPage';
    description = '认识 GAN lab 的教师与研究成员，共同研究生成模型、人机协作与文化创作。';
  } else if (members.some(member => route === '/people/' + member.id && hasMemberDetails(member))) {
    person = members.find(member => route === '/people/' + member.id);
    html = memberPage(person); title = `${person.name}｜GAN lab`; nav = 'people'; kind = 'ProfilePage';
    const text = person.introduction || person.background || person.researchSummary || person.biography?.[0] || researchOverview(memberPapers(person.id)) || person.honor || '个人介绍与学术主页。';
    description = `${person.name}：${plainText(text)}`;
  } else if (route === '/about') {
    html = about(); title = '关于｜GAN lab'; nav = 'about';
    description = 'GAN lab 是浙江大学团队，导师为李泽健。研究涵盖生成模型、人机交互与传统文化，开展生成模型蒸馏、交互系统研发与文化作品创作。';
  } else if (route === '/contact') {
    html = contact(); title = '交流与合作｜GAN lab'; nav = 'contact';
    description = 'GAN lab 联系方式：李泽健老师的公开学术邮箱与导师个人主页。';
  } else {
    html = `<div class="shell not-found">${heading('页面未找到', '地址可能有误，或页面已移除。')}<div class="hero-actions">${arrow('#/', '返回首页')}${inline('#/projects', '项目与作品')}</div></div>`;
    title = '页面未找到｜GAN lab'; description = '地址可能有误，或页面已移除。返回 GAN lab 首页或浏览项目与作品。';
  }
  return { route, html: publicHTML(html, route), title, description, nav, kind, person, exists: allRoutes().includes(route) };
}
function structuredData(page) {
  const root = site.origin + site.basePath;
  const url = site.origin + pathFor(page.route);
  const graph = [
    { '@type': 'Organization', '@id': root + '#organization', name: site.name, url: root },
    { '@type': 'WebSite', '@id': root + '#website', name: site.name, url: root, inLanguage: 'zh-CN', publisher: { '@id': root + '#organization' } },
    { '@type': page.kind, '@id': url + '#webpage', url, name: page.title, description: page.description, inLanguage: 'zh-CN', isPartOf: { '@id': root + '#website' } },
  ];
  if (page.person) {
    const person = { '@type': 'Person', '@id': url + '#person', name: page.person.name, description: page.description, url };
    const links = page.person.id === 'li-zejian' ? [universityHome, mentorHome] : page.person.profile ? [page.person.profile] : [];
    if (links.length) person.sameAs = links;
    graph[2].mainEntity = { '@id': person['@id'] };
    graph.push(person);
  }
  // Only describe the breadcrumb trail actually shown in the page body.
  if (page.route !== '/') {
    const isDetail = /^\/(research|people)\//.test(page.route);
    const parent = isDetail ? '/' + page.route.split('/')[1] : '/';
    const parentName = parent === '/research' ? '研究' : parent === '/people' ? '团队' : '首页';
    const currentName = page.person?.name || works.find(work => page.route === '/research/' + work.id)?.name || ({ '/projects': '项目与作品', '/research': '研究', '/outputs': '论文', '/people': '团队', '/about': '关于', '/contact': '交流与合作' })[page.route];
    graph.push({ '@type': 'BreadcrumbList', '@id': url + '#breadcrumb', itemListElement: [
      { '@type': 'ListItem', position: 1, name: parentName, item: site.origin + pathFor(parent) },
      { '@type': 'ListItem', position: 2, name: currentName, item: url },
    ] });
    graph[2].breadcrumb = { '@id': url + '#breadcrumb' };
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

function legacyDestination({ pathname, search = '', hash = '' }) {
  const legacy = hash.startsWith('#/');
  let route;
  if (legacy) {
    route = new URL(hash.slice(1), 'https://route.invalid');
  } else {
    if (!pathname.startsWith(site.basePath)) return null;
    const relative = pathname.slice(site.basePath.length).replace(/index\.html$/, '').replace(/\/$/, '');
    route = new URL('/' + relative + search, 'https://route.invalid');
  }
  let path = route.pathname.replace(/\/$/, '') || '/';
  if (legacy && (path === '/admin' || path.startsWith('/admin/') || path === '/preview')) return pathFor('/');
  const memberId = route.searchParams.get('member');
  const queriedMember = ['/', '/people', '/outputs'].includes(path) && members.find(member => member.id === memberId);
  if (queriedMember) {
    return hasMemberDetails(queriedMember) ? pathFor('/people/' + memberId) : pathFor('/people') + '#member-' + memberId;
  }
  if (!legacy) return null;
  const member = members.find(member => path === '/people/' + member.id);
  if (member && !hasMemberDetails(member)) return pathFor('/people') + '#member-' + member.id;
  if (!allRoutes().includes(path)) return pathFor('/not-found');
  return hrefFor(path + route.search + route.hash);
}

function projectImage(media, { hero = false } = {}) {
  const responsive = media.path === 'assets/projects/moworld-teaser.jpg';
  const candidates = responsive ? ` srcset="assets/projects/moworld-640.webp 640w, assets/projects/moworld-960.webp 960w, assets/projects/moworld-1440.webp 1440w" sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1000px) 48vw, 550px"` : '';
  return `<img src="${escapeHTML(media.path)}"${candidates} alt="${escapeHTML(media.alt)}" width="${media.width}" height="${media.height}" loading="${hero ? 'eager' : 'lazy'}"${hero ? ' fetchpriority="high"' : ''} decoding="async">`;
}
function projectCard(project, { hero = false } = {}) {
  return `<article class="project-card${hero ? ' project-card-hero' : ' project-card-wide project-card-' + project.id}" id="project-card-${project.id}" tabindex="-1">
    <a href="#/projects#${project.id}" class="project-card-link">
      <figure>${projectImage(project.media, { hero })}</figure>
      <div class="project-card-copy"><p class="project-card-category">${escapeHTML(project.category)}</p>
        <h${hero ? 2 : 3}>${escapeHTML(project.title)}</h${hero ? 2 : 3}>
        <p class="project-card-summary">${escapeHTML(project.summary)}</p>
        ${!hero ? `<p class="small-note">${escapeHTML([project.period, project.venue].filter(Boolean).join(' · '))}</p>` : ''}<span class="project-card-action">${escapeHTML(project.action)} ${iconArrow}</span>
      </div>
    </a>
  </article>`;
}
function featuredProjects() {
  return `<section class="featured-projects" aria-labelledby="projects-title">
    <div class="section-topline"><h2 class="section-title" id="projects-title">文化作品</h2>${inline('#/projects', '全部项目与作品')}</div>
    <div class="project-cards">${projects.filter(project => project.featured && project.id !== 'moworld').map(project => projectCard(project)).join('')}</div>
  </section>`;
}

function projectCredits(credits) {
  return `<dl class="project-credits">${credits.map(credit => `<div><dt>${escapeHTML(credit.role)}</dt><dd>${credit.people.map(person => {
    const member = members.find(member => member.id === person.memberId);
    return member && hasMemberDetails(member) ? `<a href="#/people/${member.id}">${escapeHTML(person.name)}</a>` : escapeHTML(person.name);
  }).join('、')}</dd></div>`).join('')}</dl>`;
}

function projectFigure(project) {
  const media = project.media;
  if (media.rotate === -90) {
    return `<figure class="atlas-figure">
      <div class="atlas-scroll" role="region" tabindex="0" aria-label="人工智能发展简史图谱，横向滚动查看" aria-describedby="atlas-instruction">
        <div class="atlas-track">${projectImage(media)}</div>
      </div>
      <figcaption>${escapeHTML(media.caption)}<span id="atlas-instruction">左右滑动查看图谱；键盘可用左右方向键。</span></figcaption>
      <a class="inline-link" href="${escapeHTML(media.path)}" target="_blank" rel="noopener">查看完整原图 ${iconArrow}</a>
    </figure>`;
  }
  return `<figure class="project-figure">${projectImage(media)}<figcaption>${escapeHTML(media.caption)}</figcaption>${project.id === 'canal-growth' ? `<a class="inline-link" href="${escapeHTML(media.path)}" target="_blank" rel="noopener">查看完整原图 ${iconArrow}</a>` : ''}</figure>`;
}

function partnersSection({ compact = false } = {}) {
  return `<section class="project-partners${compact ? ' partners-compact' : ''}" aria-labelledby="partners-title">
    <h2 class="section-title" id="partners-title">合作伙伴</h2>
    <ul class="partner-logos" aria-label="合作单位">${projectPartners.map(partner => `<li><img class="partner-logo partner-logo-${partner.id}" src="${escapeHTML(partner.logo)}" alt="${escapeHTML(partner.name)}" width="${partner.width}" height="${partner.height}" loading="lazy" decoding="async"></li>`).join('')}</ul>
  </section>`;
}
function projectsPage() {
  return `<div class="shell projects-page">
    ${heading('项目与作品', '团队成员参与的系统研发、生成模型研究与文化创作。', '项目与作品')}
    <nav class="project-index" aria-label="项目与作品目录">${projects.map(project => `<a href="#/projects#${project.id}">${escapeHTML(project.title)}</a>`).join('')}<a href="#capabilities-title">合作方向</a><a href="#partners-title">合作伙伴</a></nav>
    <div class="portfolio-list">${projects.map(project => {
      const wide = ['canal-growth', 'ai-history-atlas'].includes(project.id);
      return `<article class="portfolio-entry${wide ? ' portfolio-entry-wide' : ''}" id="${project.id}" aria-labelledby="${project.id}-title">
        <div class="portfolio-heading"><div><p class="hero-kicker">${escapeHTML(project.category)}</p><h2 id="${project.id}-title">${escapeHTML(project.title)}</h2></div><p class="portfolio-period">${escapeHTML(project.period)}</p></div>
        <div class="portfolio-body">${projectFigure(project)}<div class="portfolio-copy">
          <div class="portfolio-description">${project.description.map(paragraph => `<p>${escapeHTML(paragraph)}</p>`).join('')}</div>
          <div class="portfolio-attribution">${projectCredits(project.credits)}<div class="project-source-links">${project.links.map(link => `<a class="inline-link" href="${escapeHTML(link.url)}" target="_blank" rel="noopener">${escapeHTML(link.label)} ${iconArrow}</a>`).join('')}</div></div>
        </div></div>
      </article>`;
    }).join('')}</div>
    <section class="project-capabilities" aria-labelledby="capabilities-title"><h2 class="section-title" id="capabilities-title">合作方向</h2>
      <div class="capability-grid">${projectCapabilities.map(capability => `<article><h3>${escapeHTML(capability.title)}</h3><p>${escapeHTML(capability.description)}</p><div>${capability.links.map(link => inline('#' + link.route, escapeHTML(link.label))).join('')}</div></article>`).join('')}</div>
    </section>
    ${partnersSection()}
  </div>`;
}
