'use strict';
// Generated from site.config.json and the shared route rules.
const site = Object.freeze({"origin":"https://xiaosen3333.github.io","basePath":"/gan-lab-site/","name":"GAN lab"});
const members = [{"id":"li-zejian","detailed":true},{"id":"chen-pei","detailed":true},{"id":"zhang-shengyuan","detailed":true},{"id":"chen-tianrun","detailed":true},{"id":"hou-lefan","detailed":true},{"id":"meng-chenye","detailed":true},{"id":"zhang-ying","detailed":true},{"id":"zhang-jiahui","detailed":false},{"id":"liu-qi","detailed":true},{"id":"zhang-jiesi","detailed":true},{"id":"hu-xiangfei","detailed":true},{"id":"pan-jiaman","detailed":true},{"id":"ma-jiarui","detailed":true},{"id":"li-yize","detailed":true},{"id":"jia-kaixin","detailed":true},{"id":"zheng-xiuqi","detailed":true},{"id":"sun-zhongjian","detailed":true},{"id":"huang-rui","detailed":true},{"id":"feng-linya","detailed":false},{"id":"xie-changle","detailed":true},{"id":"zhao-an","detailed":true},{"id":"zhu-kewen","detailed":true},{"id":"zhang-hongjian","detailed":true},{"id":"zheng-weiting","detailed":true},{"id":"liu-zhongni","detailed":true},{"id":"mao-rongjie","detailed":true},{"id":"tian-shujun","detailed":false},{"id":"xiao-yuxuan","detailed":false},{"id":"zhu-yangrui","detailed":true},{"id":"yang-xihao","detailed":false},{"id":"yuan-jiaxin","detailed":false}];
const routes = ["/","/research","/outputs","/people","/about","/contact","/research/disback","/research/ink-restorer","/research/poempalette","/people/li-zejian","/people/chen-pei","/people/zhang-shengyuan","/people/chen-tianrun","/people/hou-lefan","/people/meng-chenye","/people/zhang-ying","/people/liu-qi","/people/zhang-jiesi","/people/hu-xiangfei","/people/pan-jiaman","/people/ma-jiarui","/people/li-yize","/people/jia-kaixin","/people/zheng-xiuqi","/people/sun-zhongjian","/people/huang-rui","/people/xie-changle","/people/zhao-an","/people/zhu-kewen","/people/zhang-hongjian","/people/zheng-weiting","/people/liu-zhongni","/people/mao-rongjie","/people/zhu-yangrui"];
function hasMemberDetails(member) { return member.detailed; }
function allRoutes() { return routes; }
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
