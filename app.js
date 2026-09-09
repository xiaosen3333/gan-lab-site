'use strict';
const iconArrow='<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 17 17 7M7 7h10v10"/></svg>';
const $=id=>document.getElementById(id);
let perspectiveIndex=0;
const perspectives=[
 {id:'generation',title:'生成模型',question:'如何让生成模型更高效、更可控？',body:'关注扩散与流匹配模型的蒸馏、后训练及生成内容评价。算法本身也是研究对象。',work:'disback'},
 {id:'interaction',title:'人机协作',question:'人如何理解、参与并影响智能系统？',body:'关注交互式人机协作，让人的意图、操作与判断进入生成和探索过程。',work:'poempalette'},
 {id:'culture',title:'文化与创作',question:'智能技术如何支持文化的理解、创造与体验？',body:'以古画、诗歌等具体文化内容为对象，探索生成方法与交互体验。',work:'ink-restorer'}
];
const arrow=(href,label)=>`<a class="link-arrow" href="${href}">${label}${iconArrow}</a>`;
const inline=(href,label)=>`<a class="inline-link" href="${href}">${label}${iconArrow}</a>`;
const heading=(title,description='',crumb='')=>`<div class="page-heading">${crumb?`<div class="breadcrumbs"><a href="#/">首页</a><span>/</span>${crumb}</div>`:''}<h1>${title}</h1>${description?`<p>${description}</p>`:''}</div>`;

function perspectivePanel(i){const p=perspectives[i],w=works.find(w=>w.id===p.work);return `<h3>${p.question}</h3><p>${p.body}</p>${inline('#/research/'+w.id,'关联研究：'+w.name)}`;}
function workRows(){return works.map(w=>`<article class="work-row"><div class="work-year">${w.venue} / ${w.year}<span>${w.theme}</span></div><div><h3><a href="#/research/${w.id}">${w.name}</a></h3><p>${w.summary}</p></div>${inline('#/research/'+w.id,'阅读研究')}</article>`).join('');}
function home(){return `<div class="shell">
 <section class="hero" aria-labelledby="home-title"><div class="hero-copy"><p class="hero-kicker">GAN lab / 浙江大学团队</p><h1 id="home-title">AI、人机交互<br>与传统文化<span>。</span></h1><p class="hero-description">研究生成模型与人机协作，探索智能技术<br class="desktop-break">在文化理解、创造与体验中的新可能。</p><div class="hero-actions">${arrow('#/research','了解我们的研究')}<a class="quiet-link" href="#/people">认识团队 ${iconArrow}</a></div></div><figure class="hero-image"><img src="assets/culture-computation-concept.png" alt="水墨山形与同形采样点云的黑白概念视觉" width="1536" height="1024" fetchpriority="high"></figure><div class="hero-caption"><span>Culture × Computation</span><span>原创概念视觉</span></div></section>
 <section class="research-intro" aria-labelledby="questions-title"><h2 class="section-title" id="questions-title">从生成方法，到人的文化体验。</h2><p class="section-subtitle">研究生成模型本身，也关注人与智能系统怎样共同创作。<br>传统文化为研究带来具体问题，这些主题在不同工作中交汇。</p><div class="perspectives"><div class="perspective-menu" role="tablist" aria-label="研究视角">${perspectives.map((p,i)=>`<button role="tab" id="perspective-tab-${i}" aria-selected="${i===perspectiveIndex}" aria-controls="perspective-panel" tabindex="${i===perspectiveIndex?0:-1}" data-perspective="${i}">${p.title}${iconArrow}</button>`).join('')}</div><div class="perspective-panel" id="perspective-panel" role="tabpanel" aria-labelledby="perspective-tab-${perspectiveIndex}">${perspectivePanel(perspectiveIndex)}</div></div></section>
 <section class="featured-section" aria-labelledby="featured-title"><div class="section-topline"><div><h2 class="section-title" id="featured-title">精选研究</h2><p class="section-subtitle">导师参与的算法与交互研究，从不同角度回应人与智能的问题。</p></div>${inline('#/outputs','查看论文')}</div><div class="work-list">${workRows()}</div></section>
 <section class="lab-section" aria-labelledby="lab-title"><div><h2 class="section-title" id="lab-title">关于 GAN lab</h2><p>我们是浙江大学团队，导师为李泽健。关注生成模型、人机协作，以及智能技术与传统文化的交叉研究。</p><div class="resource-names"><span>相关学术资源</span><span>浙江大学国际设计研究院</span><span>浙江大学软件学院 · 浙江大学人工智能学院</span></div>${inline('#/about','了解团队背景')}</div><div class="conversation"><h3>从一个值得研究的问题开始交流。</h3><a href="#/contact?intent=academic">学术交流 <span>研究问题与方法 ${iconArrow}</span></a><a href="#/contact?intent=culture">文化场景合作 <span>具体对象与人的工作 ${iconArrow}</span></a><a href="#/contact?intent=join">了解参与方式 <span>研究兴趣与团队工作 ${iconArrow}</span></a></div></section>
 </div>`;}
function research(){return `<div class="shell">${heading('研究','研究智能生成的方法，理解人的交互与判断，探索文化创作的新可能。','研究')}<section class="page-section"><h2>我们关注的问题</h2><div class="research-questions">${perspectives.map(p=>`<article class="research-question"><h3>${p.title}</h3><div><p class="question">${p.question}</p><p>${p.body}</p>${inline('#/research/'+p.work,'阅读关联研究')}</div></article>`).join('')}</div></section><section class="page-section"><h2>精选研究</h2><p class="section-subtitle">以下为导师参与的公开工作。每项研究连接方法、论文。</p>${workRows()}</section></div>`;}
function workDetail(w){return `<article class="shell"><div class="page-heading"><div class="breadcrumbs"><a href="#/research">研究</a><span>/</span>${w.name}</div><p class="hero-kicker">${w.theme} / ${w.venue} ${w.year}</p><h1>${w.name}</h1><p>${w.summary}</p><dl class="project-metadata"><div><dt>发表信息</dt><dd>${w.stage}</dd></div><div><dt>导师参与</dt><dd><a href="#/people/li-zejian">李泽健 ${iconArrow}</a></dd></div></dl></div><div class="project-reading"><nav class="project-toc" aria-label="项目内容"><a href="#work-question" data-section="work-question">研究问题</a><a href="#work-method" data-section="work-method">研究方法</a><a href="#work-paper" data-section="work-paper">论文</a><a href="#/contact?intent=academic">交流研究 ${iconArrow}</a></nav><div class="project-body"><section id="work-question"><h2>研究问题</h2><p class="research-statement">${w.question}</p></section><section id="work-method"><h2>如何开展研究</h2><p>${w.method}</p><div class="activity-list"><div class="activity-row"><strong>${w.id==='disback'?'研究者':'人的活动'}</strong><p>${w.human}</p></div><div class="activity-row"><strong>${w.id==='disback'?'算法目标':'AI 的作用'}</strong><p>${w.ai}</p></div></div></section><section id="work-paper"><h2>论文</h2><div class="paper-citation"><span>${w.venue} · ${w.year}</span><h3>${w.title}</h3>${presentation.publicationActions?`<p>完整作者顺序及贡献信息见论文原文。</p><a class="inline-link" href="${w.url}" target="_blank" rel="noopener">阅读原文 ${iconArrow}</a>${w.code?`<a class="inline-link" href="${w.code}" target="_blank" rel="noopener">项目代码 ${iconArrow}</a>`:''}`:''}</div>${presentation.publicationParticipants?`<div class="research-participants"><h3>参与这项研究的成员</h3><div class="participant-links">${memberLinks(publicationMembers[w.id])}</div></div>`:''}${presentation.publicationActions?`<p class="small-note">资料来源：${w.source}。${w.sourceUrl?`<a href="${w.sourceUrl}" target="_blank" rel="noopener">学院成果介绍 ${iconArrow}</a>`:""} 网站介绍为简要整理，研究细节请阅读原文。</p>`:''}${inline('#/contact?intent=academic','交流相关问题')}</section></div></div></article>`;}
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
 return `<div class="shell bibliography-page">${heading('论文','围绕生成模型、人机协作与文化创作，这里收录了团队参与的'+publications.length+'篇论文与预印本。','论文')}
 ${presentation.publicationFilters?`<div class="chip-group" aria-label="成果类型">${filterTypes.map(([id,label])=>`<button class="chip" aria-pressed="${id===outputFilter}" data-output-filter="${id}">${label}</button>`).join('')}</div>`:''}
 <div class="paper-list" aria-live="polite">${publicationRows(shown,{type:outputFilter})}</div></div>`;
}
function hasMemberDetails(m){return Boolean(m.introduction||m.background||m.biography?.length||m.researchSummary||m.profile||m.honor||memberPapers(m.id).length);}
function personCard(m){const detailed=hasMemberDetails(m);return `<article class="person-card" id="member-${m.id}" tabindex="-1"><${detailed?'a':'div'} class="person-card-link"${detailed?` href="#/people/${m.id}"`:''}><div class="person-card-heading"><h3>${m.name}</h3><span class="person-title">${m.title||'团队成员'}</span></div>${presentation.memberEnglish&&m.english?`<p class="person-english">${m.english}</p>`:''}${detailed?`<span class="person-navigation" aria-hidden="true">${iconArrow}</span>`:''}</${detailed?'a':'div'}></article>`;}
function people(){return `<div class="shell people-page">${heading('团队','共同研究生成模型、人机协作与文化创作。','团队')}
 <section class="roster-section" aria-labelledby="faculty-title"><h2 id="faculty-title">教师</h2><div class="people-roster">${members.filter(m=>m.group==='faculty').map(personCard).join('')}</div></section>
 <section class="roster-section" aria-labelledby="members-title"><h2 id="members-title">研究成员</h2><div class="people-roster">${members.filter(m=>m.group!=='faculty').map(personCard).join('')}</div></section>
 <section class="people-contact"><p>从共同关心的问题开始交流。</p>${inline('#/contact?intent=join','了解参与方式')}</section></div>`;}
function memberPage(m){
 const papers=memberPapers(m.id);
 const overview=researchOverview(papers);
 const isMentor=m.id==='li-zejian';
 const links=isMentor?[{url:universityHome,label:'浙大主页'},{url:mentorHome,label:'个人主页'}]:m.profile?[{url:m.profile,label:m.profileLabel==='浙大教师主页'?'浙大主页':m.profileLabel==='学术档案'?'学术主页':'个人主页'}]:[];
 const awards=publications.filter(p=>p.award&&p.memberIds.includes(m.id));
 return `<article class="shell member-page"><div class="page-heading member-heading"><div class="breadcrumbs"><a href="#/people?focus=${m.id}">团队</a><span>/</span>${m.name}</div><div class="person-heading-line"><h1>${m.name}</h1><span class="person-title">${m.title||'团队成员'}</span></div>${presentation.memberEnglish&&m.english?`<p class="person-english">${m.english}</p>`:''}</div>
 <div class="member-reading"><section class="member-introduction" aria-label="个人介绍">
 ${m.introduction?`<p class="member-statement">${m.introduction}</p>`:''}
 ${m.background?`<p class="member-background-copy">${m.background}</p>`:''}
 ${(m.biography||[]).map(paragraph=>`<p class="member-background-copy">${paragraph}</p>`).join('')}
 ${m.researchSummary?`<p class="member-overview">${m.researchSummary}</p><p class="small-note">本页收录${papers.length}篇相关${papers.some(p=>p.kind==='preprint')?'论文与预印本':'论文'}。</p>`:overview?`<p class="member-overview">${overview}</p>`:''}
 ${links.length?`<div class="profile-links">${links.map(link=>`<a class="inline-link" href="${link.url}" target="_blank" rel="noopener">${link.label} ${iconArrow}</a>`).join('')}</div>`:''}
 </section>
 ${papers.length?`<section class="member-publications" aria-labelledby="member-papers"><h2 id="member-papers">研究论文</h2><div class="paper-list">${publicationRows(papers,{level:3})}</div></section>`:''}
 ${awards.length||m.honor?`<section class="member-honors" aria-labelledby="member-honors"><h2 id="member-honors">学术荣誉</h2>${awards.map(p=>`<p>${p.venue} ${p.year} ${p.award}</p>`).join('')}${m.honor?`<p>${m.honor}</p>`:''}</section>`:''}
 </div></article>`;
}
function about(){return `<div class="shell">${heading('关于 GAN lab','在人工智能、人机交互与传统文化的交叉处，开展面向具体问题的研究。','关于')}<section class="page-section about-grid"><h2>团队与研究</h2><div><p>GAN lab 是浙江大学团队。官网以研究为主线，介绍关注的问题、具体项目、相关成果与研究者。</p><p style="margin-top:16px">团队导师为李泽健。研究生成模型与智能设计，并关注人机协作与文化遗产保护。</p>${inline('#/research','探索研究问题')}</div></section><section class="page-section about-grid"><h2>相关学术资源</h2><div><div class="resource-row">浙江大学国际设计研究院<a href="http://idi.zju.edu.cn/" target="_blank" rel="noopener">访问官网 ${iconArrow}</a></div><div class="resource-row">浙江大学软件学院<a href="https://www.cst.zju.edu.cn/" target="_blank" rel="noopener">访问官网 ${iconArrow}</a></div><div class="resource-row">浙江大学人工智能学院<a href="https://ai.zju.edu.cn/" target="_blank" rel="noopener">访问官网 ${iconArrow}</a></div></div></section><section class="page-section about-grid"><h2>研究动态</h2><div><p>研究动态即将补充。当前可从研究页了解已有工作。</p>${inline('#/research','查看研究')}</div></section><section class="page-section about-grid"><h2>交流与合作</h2><div><p>学术方法、文化场景或研究参与，可以从各自关心的问题开始交流。</p>${inline('#/contact','选择交流主题')}</div></section></div>`;}
const contactIntents={academic:{label:'学术交流',title:'从一个研究问题开始。',body:'可以围绕文化内容的理解与生成、人机协作中的判断，或相关交互方法展开讨论。先了解双方正在关注的问题，再判断是否具有共同的研究切入点。',next:'可以从具体项目或方法出发，讨论相关性和可能的下一步。',prepare:['感兴趣的研究问题或项目','希望交流的方法、发现或疑问','可供阅读的相关工作（如有）']},culture:{label:'文化场景合作',title:'把真实场景带进研究。',body:'如果你的工作涉及文化图像、资料整理、专业判断或文化体验，可以围绕具体对象和人的工作讨论研究合作的可能性。',next:'先理解文化语境与专业工作，再共同判断什么问题值得研究、需要怎样的参与。这是讨论入口，不预先承诺具体服务。',prepare:['希望讨论的文化对象与使用场景','人在当前工作中遇到的问题','相关资料是否可以用于交流（如有）']},join:{label:'了解参与',title:'看看研究兴趣如何相遇。',body:'先从研究问题和已有项目了解团队，再围绕你的兴趣、方法经验或希望探索的题目，交流参与研究的可能性。',next:'导师个人主页提供招生、实习与访问说明。研究方向和学位专业不是同一件事，具体名额与资格请先阅读当年说明，再直接交流。',prepare:['感兴趣的研究问题','相关经历或作品（如有）','希望进一步了解的参与方式']}};
function contact(intent='academic'){if(!contactIntents[intent])intent='academic';const c=contactIntents[intent];return `<div class="shell">${heading('交流与合作','不同的背景，可以从共同关心的问题开始。','交流与合作')}<section class="contact-channel" aria-label="联系导师"><span class="label">导师公开学术邮箱</span><a class="contact-email" href="mailto:zejianlee@zju.edu.cn">zejianlee@zju.edu.cn ${iconArrow}</a><small>李泽健 · 浙江大学<br>点击邮箱使用你的邮件应用联系。</small><a class="inline-link" href="${mentorHome}" target="_blank" rel="noopener">查看导师主页与参与说明 ${iconArrow}</a></section><div class="contact-layout"><div class="contact-tabs" role="tablist" aria-label="交流意图">${Object.entries(contactIntents).map(([key,item])=>`<button id="contact-tab-${key}" role="tab" aria-selected="${key===intent}" aria-controls="contact-panel" tabindex="${key===intent?0:-1}" data-intent="${key}">${item.label}</button>`).join('')}</div><section class="contact-panel" id="contact-panel" role="tabpanel" aria-labelledby="contact-tab-${intent}"><h2>${c.title}</h2><p>${c.body}</p><h3>下一步如何展开</h3><p>${c.next}</p><h3>交流时可以带上</h3><ul>${c.prepare.map(item=>`<li>${item}</li>`).join('')}</ul>${inline(intent==='join'?'#/people':'#/research',intent==='join'?'先了解团队':'先阅读相关研究')}</section></div></div>`;}
function getRoute(){const raw=location.hash.slice(1)||'/';let [path,query]=raw.split('?');let params=new URLSearchParams(query);if(path==='/admin'||path.startsWith('/admin/')||path==='/preview'){path='/';params=new URLSearchParams();}else if((path==='/outputs'||path==='/people')&&members.some(m=>m.id===params.get('member'))){path='/people/'+params.get('member');params=new URLSearchParams();}const member=members.find(m=>path==='/people/'+m.id);if(member&&!hasMemberDetails(member)){path='/people';params=new URLSearchParams({focus:member.id});}const normalized='#'+path+(params.size?'?'+params:'');if(location.hash!==normalized)history.replaceState(history.state,'',normalized);return {path,params};}
// Positions belong to history entries, so revisiting the roster does not overwrite an earlier visit.
const historyViews=new Map();
let activeEntryId,renderedHash;
history.scrollRestoration='manual';
function ensureEntry(){if(!history.state?.ganEntryId)history.replaceState({...history.state,ganEntryId:crypto.randomUUID()},'',location.href);return history.state.ganEntryId;}
function rememberView(focusId){if(activeEntryId)historyViews.set(activeEntryId,{x:window.scrollX,y:window.scrollY,focusId:focusId||document.activeElement?.closest('.person-card')?.id||null});}
function restoreEntry(){activeEntryId=ensureEntry();render({view:historyViews.get(activeEntryId)||history.state?.ganView});}
function render({focus=true,view=null}={}){const {path,params}=getRoute();let html,title,nav='';
if(path==='/'){html=home();title='AI、人机交互与传统文化';}
else if(path==='/research'){html=research();title='研究';nav='research';}
else if(works.some(w=>path==='/research/'+w.id)){const w=works.find(w=>path==='/research/'+w.id);html=workDetail(w);title=w.name;nav='research';}
else if(path==='/outputs'){html=outputs(params);title='论文';nav='outputs';}
else if(path==='/people'){html=people();title='团队';nav='people';}
else if(members.some(m=>path==='/people/'+m.id)){const m=members.find(m=>path==='/people/'+m.id);html=memberPage(m);title=m.name;nav='people';}
else if(path==='/about'){html=about();title='关于';nav='about';}
else if(path==='/contact'){html=contact(params.get('intent')||'academic');title='交流与合作';}
else{html=`<div class="shell">${heading('这个页面暂时不存在','可以从研究入口继续浏览。')}${inline('#/research','进入研究')}</div>`;title='页面未找到';}
$('main').innerHTML=html;document.title=`GAN lab · ${title}`;document.querySelectorAll('[data-nav]').forEach(a=>{if(a.dataset.nav===nav)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});renderedHash=location.hash;if(view){$(view.focusId)?.focus({preventScroll:true});window.scrollTo({left:view.x,top:view.y,behavior:'instant'});}else if(focus){window.scrollTo({top:0,behavior:'instant'});$('main').focus({preventScroll:true});}if(!view&&path==='/people'&&members.some(m=>m.id===params.get('focus'))){const target=$('member-'+params.get('focus'));target.scrollIntoView({block:'start',behavior:'instant'});target.focus({preventScroll:true});}}
function showDesign(){if(!$('design-dialog').open)$('design-dialog').showModal();}
$('open-design').addEventListener('click',showDesign);$('open-design-footer').addEventListener('click',showDesign);
document.addEventListener('click',e=>{if(e.target.closest('.skip')){e.preventDefault();$('main').focus();$('main').scrollIntoView();return;}const close=e.target.closest('[data-close]');if(close){$(close.dataset.close).close();return;}const p=e.target.closest('[data-perspective]');if(p){perspectiveIndex=Number(p.dataset.perspective);document.querySelectorAll('[data-perspective]').forEach(b=>{const selected=Number(b.dataset.perspective)===perspectiveIndex;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;});$('perspective-panel').innerHTML=perspectivePanel(perspectiveIndex);$('perspective-panel').setAttribute('aria-labelledby',`perspective-tab-${perspectiveIndex}`);return;}const type=e.target.closest('[data-output-filter]');if(type){const {params}=getRoute();params.set('type',type.dataset.outputFilter);history.replaceState(history.state,'',`#/outputs?${params}`);render({focus:false});document.querySelector(`[data-output-filter="${type.dataset.outputFilter}"]`).focus({preventScroll:true});return;}const intent=e.target.closest('[data-intent]');if(intent){history.replaceState(history.state,'',`#/contact?intent=${intent.dataset.intent}`);render({focus:false});document.querySelector(`[data-intent="${intent.dataset.intent}"]`).focus({preventScroll:true});return;}const section=e.target.closest('[data-section]');if(section){e.preventDefault();$(section.dataset.section)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});return;}const route=e.target.closest('a[href^="#/"]');if(route&&!e.defaultPrevented&&e.button===0&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!route.target&&!route.hasAttribute('download')){e.preventDefault();rememberView(route.closest('.person-card')?.id);history.replaceState({...history.state,ganView:historyViews.get(activeEntryId)},'',location.href);history.pushState({ganEntryId:crypto.randomUUID()},'',route.getAttribute('href'));activeEntryId=history.state.ganEntryId;render();}});
document.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'].includes(e.key))return;const tab=e.target.closest('[role=tab]');if(!tab)return;const list=tab.closest('[role=tablist]'),tabs=[...list.querySelectorAll('[role=tab]')];let idx=tabs.indexOf(tab);if(e.key==='Home')idx=0;else if(e.key==='End')idx=tabs.length-1;else idx=(idx+(['ArrowRight','ArrowDown'].includes(e.key)?1:-1)+tabs.length)%tabs.length;e.preventDefault();const target=tabs[idx],id=target.id;target.click();$(id)?.focus({preventScroll:true});});
window.addEventListener('popstate',restoreEntry);
window.addEventListener('hashchange',()=>{if(renderedHash!==location.hash)restoreEntry();});
window.addEventListener('scroll',()=>rememberView(),{passive:true});
window.addEventListener('pagehide',()=>{rememberView();history.replaceState({...history.state,ganView:historyViews.get(activeEntryId)},'',location.href);});
activeEntryId=ensureEntry();render({focus:false,view:history.state?.ganView});
