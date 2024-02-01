import{s as se,B as Te,e as m,a as V,t as j,c as h,b as g,f,g as C,d as S,l as $e,m as d,i as O,h as c,K as pe,p as K,j as B,S as De,y as ye,k as me,J as Ie,L as Oe,R as Me,N as he,n as ve}from"../chunks/scheduler.cOHHkP0m.js";import{S as ae,i as ne,h as Ne,b as G,d as Q,m as W,t as I,g as Ee,a as L,f as ke,e as X,c as Pe,j as Ve}from"../chunks/index.44LrZ0tY.js";import"../chunks/MS365Login.svelte_svelte_type_style_lang.B6GZ_MWG.js";import{t as Ce}from"../chunks/index.hwPIL90K.js";import"../chunks/entry.tU5bMAfH.js";import{s as Y,P as Le}from"../chunks/PlainEditor.R_p9MFEJ.js";import{f as be}from"../chunks/index.Npw_Vmj7.js";import{e as je}from"../chunks/forms.nm2FTXk8.js";import{M as Se}from"../chunks/Modal.N9oYkXC9.js";function ge(l){let e,s=l[3]("core.saving")+"",t,n,a,o,i;return{c(){e=m("div"),t=j(s),n=j("..."),this.h()},l(r){e=h(r,"DIV",{class:!0});var p=g(e);t=S(p,s),n=S(p,"..."),p.forEach(f),this.h()},h(){d(e,"class","text-sm pr-4 pl-4 text-neutral-content")},m(r,p){O(r,e,p),c(e,t),c(e,n),i=!0},p(r,p){(!i||p&8)&&s!==(s=r[3]("core.saving")+"")&&B(t,s)},i(r){i||(r&&Oe(()=>{i&&(o&&o.end(1),a=Pe(e,be,{}),a.start())}),i=!0)},o(r){a&&a.invalidate(),r&&(o=Ve(e,be,{})),i=!1},d(r){r&&f(e),r&&o&&o.end()}}}function ze(l){let e,s=l[3]("editor.delete")+"",t;return{c(){e=m("h3"),t=j(s),this.h()},l(n){e=h(n,"H3",{class:!0,slot:!0});var a=g(e);t=S(a,s),a.forEach(f),this.h()},h(){d(e,"class","font-bold text-lg"),d(e,"slot","header")},m(n,a){O(n,e,a),c(e,t)},p(n,a){a&8&&s!==(s=n[3]("editor.delete")+"")&&B(t,s)},d(n){n&&f(e)}}}function qe(l){let e,s,t=l[3]("editor.deleteDescription")+"",n;return{c(){e=m("div"),s=m("p"),n=j(t),this.h()},l(a){e=h(a,"DIV",{slot:!0});var o=g(e);s=h(o,"P",{class:!0});var i=g(s);n=S(i,t),i.forEach(f),o.forEach(f),this.h()},h(){d(s,"class","pt-4"),d(e,"slot","body")},m(a,o){O(a,e,o),c(e,s),c(s,n)},p(a,o){o&8&&t!==(t=a[3]("editor.deleteDescription")+"")&&B(n,t)},d(a){a&&f(e)}}}function Be(l){let e,s,t,n=l[3]("editor.deletePermanent")+"",a,o,i,r=l[3]("core.close")+"",p,y,E;return{c(){e=m("div"),s=m("form"),t=m("button"),a=j(n),o=V(),i=m("button"),p=j(r),this.h()},l(_){e=h(_,"DIV",{slot:!0});var $=g(e);s=h($,"FORM",{method:!0,action:!0});var k=g(s);t=h(k,"BUTTON",{class:!0,type:!0});var T=g(t);a=S(T,n),T.forEach(f),o=C(k),i=h(k,"BUTTON",{class:!0});var w=g(i);p=S(w,r),w.forEach(f),k.forEach(f),$.forEach(f),this.h()},h(){d(t,"class","btn btn-secondary"),d(t,"type","submit"),d(i,"class","btn btn-primary"),d(s,"method","post"),d(s,"action","?/delete&mode=edit"),d(e,"slot","footer")},m(_,$){O(_,e,$),c(e,s),c(s,t),c(t,a),c(s,o),c(s,i),c(i,p),y||(E=[K(i,"click",Fe),Me(je.call(null,s))],y=!0)},p(_,$){$&8&&n!==(n=_[3]("editor.deletePermanent")+"")&&B(a,n),$&8&&r!==(r=_[3]("core.close")+"")&&B(p,r)},d(_){_&&f(e),y=!1,ye(E)}}}function Ue(l){let e,s,t,n,a,o,i,r,p,y,E,_=l[3]("core.save")+"",$,k,T,w,M,oe='<i class="far fa-ellipsis-v"></i>',Z,z,U,F,q,H=l[3]("editor.delete")+"",J,A,D,ee,N,te,le,v=l[1]&&ge(l);function we(u){l[7](u)}let re={$$slots:{footer:[Be],body:[qe],header:[ze]},$$scope:{ctx:l}};return l[0]!==void 0&&(re.open=l[0]),D=new Se({props:re}),Te.push(()=>Ne(D,"open",we)),{c(){e=m("div"),s=m("div"),t=m("input"),a=V(),o=m("div"),v&&v.c(),i=V(),r=m("i"),y=V(),E=m("button"),$=j(_),k=V(),T=m("div"),w=m("div"),M=m("label"),M.innerHTML=oe,Z=V(),z=m("div"),U=m("ul"),F=m("li"),q=m("a"),J=j(H),A=V(),G(D.$$.fragment),this.h()},l(u){e=h(u,"DIV",{class:!0});var b=g(e);s=h(b,"DIV",{class:!0});var x=g(s);t=h(x,"INPUT",{type:!0,class:!0,placeholder:!0}),x.forEach(f),a=C(b),o=h(b,"DIV",{class:!0});var P=g(o);v&&v.l(P),i=C(P),r=h(P,"I",{class:!0}),g(r).forEach(f),y=C(P),E=h(P,"BUTTON",{class:!0});var ie=g(E);$=S(ie,_),ie.forEach(f),k=C(P),T=h(P,"DIV",{class:!0});var ce=g(T);w=h(ce,"DIV",{class:!0});var R=g(w);M=h(R,"LABEL",{tabindex:!0,class:!0,"data-svelte-h":!0}),$e(M)!=="svelte-1qfuuny"&&(M.innerHTML=oe),Z=C(R),z=h(R,"DIV",{tabindex:!0,class:!0});var de=g(z);U=h(de,"UL",{class:!0});var ue=g(U);F=h(ue,"LI",{});var fe=g(F);q=h(fe,"A",{class:!0});var _e=g(q);J=S(_e,H),_e.forEach(f),fe.forEach(f),ue.forEach(f),de.forEach(f),R.forEach(f),ce.forEach(f),P.forEach(f),b.forEach(f),A=C(u),Q(D.$$.fragment,u),this.h()},h(){d(t,"type","text"),d(t,"class","btn btn-ghost text-xl"),d(t,"placeholder",n=l[3]("editor.untitledCasestudy")),d(s,"class","flex-1"),d(r,"class",p="fas fa-sync "+(l[1]?"fa-spin":"")),d(E,"class","btn btn-ghost"),d(M,"tabindex","0"),d(M,"class","btn btn-circle btn-ghost"),d(q,"class","text-error"),d(U,"class","p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"),d(z,"tabindex","0"),d(z,"class","card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64"),d(w,"class","dropdown dropdown-end"),d(T,"class","flex-none group-actions"),d(o,"class","flex-none"),d(e,"class","navbar bg-base-100 fixed top-0 left-0 w-full z-20 shadow-sm")},m(u,b){O(u,e,b),c(e,s),c(s,t),pe(t,l[2].title),c(e,a),c(e,o),v&&v.m(o,null),c(o,i),c(o,r),c(o,y),c(o,E),c(E,$),c(o,k),c(o,T),c(T,w),c(w,M),c(w,Z),c(w,z),c(z,U),c(U,F),c(F,q),c(q,J),O(u,A,b),W(D,u,b),N=!0,te||(le=[K(t,"input",l[5]),K(E,"click",l[4]),K(q,"click",l[6])],te=!0)},p(u,[b]){(!N||b&8&&n!==(n=u[3]("editor.untitledCasestudy")))&&d(t,"placeholder",n),b&4&&t.value!==u[2].title&&pe(t,u[2].title),u[1]?v?(v.p(u,b),b&2&&I(v,1)):(v=ge(u),v.c(),I(v,1),v.m(o,i)):v&&(Ee(),L(v,1,1,()=>{v=null}),ke()),(!N||b&2&&p!==(p="fas fa-sync "+(u[1]?"fa-spin":"")))&&d(r,"class",p),(!N||b&8)&&_!==(_=u[3]("core.save")+"")&&B($,_),(!N||b&8)&&H!==(H=u[3]("editor.delete")+"")&&B(J,H);const x={};b&520&&(x.$$scope={dirty:b,ctx:u}),!ee&&b&1&&(ee=!0,x.open=u[0],De(()=>ee=!1)),D.$set(x)},i(u){N||(I(v),I(D.$$.fragment,u),N=!0)},o(u){L(v),L(D.$$.fragment,u),N=!1},d(u){u&&(f(e),f(A)),v&&v.d(),X(D,u),te=!1,ye(le)}}}const xe=10,Fe=()=>{};function He(l,e,s){let t,n;me(l,Y,_=>s(2,t=_)),me(l,Ce,_=>s(3,n=_));let a=!1,o=!1;function i(){s(1,o=!o)}async function r(){i();let _=new FormData;_.append("title",t.title),_.append("quiz",JSON.stringify(t.quiz)),_.append("editor",JSON.stringify(t.editor)),fetch(window.location.href+"?/update",{body:_,method:"post"}).then(()=>setTimeout(i,2e3))}Ie(()=>{(function(){let $;window.onload=k,document.onmousemove=k,document.onkeydown=k;function k(){clearTimeout($),$=setTimeout(r,xe*1e3)}})()});function p(){t.title=this.value,Y.set(t)}const y=_=>{s(0,a=!0)};function E(_){a=_,s(0,a)}return[a,o,t,n,r,p,y,E]}class Je extends ae{constructor(e){super(),ne(this,e,He,Ue,se,{})}}function Ae(l){let e,s,t,n;return e=new Je({}),t=new Le({}),{c(){G(e.$$.fragment),s=V(),G(t.$$.fragment)},l(a){Q(e.$$.fragment,a),s=C(a),Q(t.$$.fragment,a)},m(a,o){W(e,a,o),O(a,s,o),W(t,a,o),n=!0},i(a){n||(I(e.$$.fragment,a),I(t.$$.fragment,a),n=!0)},o(a){L(e.$$.fragment,a),L(t.$$.fragment,a),n=!1},d(a){a&&f(s),X(e,a),X(t,a)}}}function Re(l){let e,s="404";return{c(){e=m("p"),e.textContent=s},l(t){e=h(t,"P",{"data-svelte-h":!0}),$e(e)!=="svelte-swq3p4"&&(e.textContent=s)},m(t,n){O(t,e,n)},i:ve,o:ve,d(t){t&&f(e)}}}function Ke(l){let e,s,t,n;const a=[Re,Ae],o=[];function i(r,p){return r[0]?0:1}return e=i(l),s=o[e]=a[e](l),{c(){s.c(),t=he()},l(r){s.l(r),t=he()},m(r,p){o[e].m(r,p),O(r,t,p),n=!0},p(r,[p]){let y=e;e=i(r),e!==y&&(Ee(),L(o[y],1,1,()=>{o[y]=null}),ke(),s=o[e],s||(s=o[e]=a[e](r),s.c()),I(s,1),s.m(t.parentNode,t))},i(r){n||(I(s),n=!0)},o(r){L(s),n=!1},d(r){r&&f(t),o[e].d(r)}}}function Ge(l,e,s){let t,{state:n={}}=e;const{title:a,editor:o}=n;return a&&Y.setTitle(a),o&&Y.setEditor(o),l.$$set=i=>{"state"in i&&s(1,n=i.state)},l.$$.update=()=>{l.$$.dirty&2&&s(0,t=Object.keys(n).length===0)},[t,n]}class Qe extends ae{constructor(e){super(),ne(this,e,Ge,Ke,se,{state:1})}}async function We({params:l,fetch:e}){let s;if(l.id){const t=await e(`/casestudies/${l.id}.json`);return s=t.status===200?await t.json():{},{state:s}}return{state:s}}const it=Object.freeze(Object.defineProperty({__proto__:null,load:We},Symbol.toStringTag,{value:"Module"}));function Xe(l){let e,s;return e=new Qe({props:{state:l[0].state}}),{c(){G(e.$$.fragment)},l(t){Q(e.$$.fragment,t)},m(t,n){W(e,t,n),s=!0},p(t,[n]){const a={};n&1&&(a.state=t[0].state),e.$set(a)},i(t){s||(I(e.$$.fragment,t),s=!0)},o(t){L(e.$$.fragment,t),s=!1},d(t){X(e,t)}}}function Ye(l,e,s){let{data:t}=e;return l.$$set=n=>{"data"in n&&s(0,t=n.data)},[t]}class ct extends ae{constructor(e){super(),ne(this,e,Ye,Xe,se,{data:0})}}export{ct as component,it as universal};
