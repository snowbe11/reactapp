(this.webpackJsonp2048=this.webpackJsonp2048||[]).push([[0],{17:function(e,n,t){},18:function(e,n,t){},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var i=t(1),r=t.n(i),c=t(9),u=t.n(c),a=(t(17),t(18),t(0));function o(){return Object(a.jsx)("div",{children:Object(a.jsx)("h1",{children:"2028 Game"})})}var l=t(5),s=t(11),d=t(4),f=t.n(d),v=t(12),x=t(7);function j(){var e=[],n=b(e);e.push(n);var t=b(e);return e.push(t),e}function y(e,n){return e.some((function(e){return e.x===n.x&&e.y===n.y}))}function b(e){for(var n;!n||e&&y(e,n);)n={x:h(1,4),y:h(1,4),value:2,isNew:!0,isMerged:!1,isDisabled:!1};return n}function h(e,n){return Math.floor(Math.random()*n+e)}function O(e){var n=e.tileSet,t=e.x,i=e.y;!function(e,n){if(!e)throw new Error("Assertion failed: ".concat(n))}(0===t||0===i,"");for(var r=0!==i,c=t+i<0,u=n.map((function(e){return Object(x.a)(Object(x.a)({},e),{},{isMerged:!1,isNew:!1})})).filter((function(e){return!e.isDisabled})).sort((function(e,n){var t=r?e.x-n.x:e.y-n.y;return t||(r?c?e.y-n.y:n.y-e.y:c?e.x-n.x:n.x-e.x)})),a=c?1:4,o=a,l=0;l<u.length;l++){var s,d;if(r)u[l].y=o,o=c?o+1:o-1,u[l].x!==(null===(s=u[l+1])||void 0===s?void 0:s.x)&&(o=a);else u[l].x=o,o=c?o+1:o-1,u[l].y!==(null===(d=u[l+1])||void 0===d?void 0:d.y)&&(o=a)}for(var f=0,j=Object(v.a)(u),y=0;y<u.length;y++){var h,O,g,m,p;if(!u[y].isDisabled&&(f&&(r?u[y].x===(null===(h=u[y-1])||void 0===h?void 0:h.x):u[y].y===(null===(O=u[y-1])||void 0===O?void 0:O.y))?(r?u[y].y=f:u[y].x=f,f+=c?1:-1):f=0,(r?u[y].x===(null===(g=u[y+1])||void 0===g?void 0:g.x):u[y].y===(null===(m=u[y+1])||void 0===m?void 0:m.y))&&u[y].value===(null===(p=u[y+1])||void 0===p?void 0:p.value))){var N=b();N.x=u[y].x,N.y=u[y].y,N.isMerged=!0,N.value=2*u[y].value,j.push(N),u[y].isDisabled=!0,u[y+1].isDisabled=!0,r?(f=u[y+1].y,u[y+1].y=u[y].y):(f=u[y+1].x,u[y+1].x=u[y].x)}}return j}t(37);var g=t(10),m={};function p(e,n){m[e]||(m[e]=[],Object(g.a)(e,(function(){return function(e){var n,t=Object(l.a)(m[e]);try{for(t.s();!(n=t.n()).done;){(0,n.value)()}}catch(i){t.e(i)}finally{t.f()}}(e)}))),m[e].push(n)}function N(e,n){m[e]&&(m[e]=m[e].filter((function(e){return e!==n})))}function w(){return Object(a.jsx)("div",{className:"grid-slot",children:"1"})}function D(e){var n=Object(i.useState)(j),t=Object(s.a)(n,2),r=t[0],c=t[1];!function(e,n){Object(i.useEffect)((function(){var t=function(t){var i=t.x,r=t.y,c=O({tileSet:e,x:i,y:r}),u=b(c);c.push(u),u.isNew=!0,n(c)},i=function(){return t({x:-1,y:0})},r=function(){return t({x:1,y:0})},c=function(){return t({x:0,y:-1})},u=function(){return t({x:0,y:1})};return p("up",i),p("down",r),p("left",c),p("right",u),function(){N("up",i),N("down",r),N("left",c),N("right",u)}}))}(r,c);var u=Object(a.jsx)("div",{className:"grid-container",children:f()(4,(function(e){return Object(a.jsx)("div",{className:"grid-row",children:f()(4,(function(e){return Object(a.jsx)(w,{},e)}))},e)}))}),o=Object(a.jsx)("div",{className:"tile-container",children:f()(4,(function(e){return Object(a.jsx)("div",{className:"grid-row",children:f()(4,(function(n){var t=r.filter((function(t){return t.x===e+1&&t.y===n+1}));if(!(t&&t.length>0))return Object(a.jsx)("div",{className:"tile-slot tile-empty",children:"1"},n);var i,c=Object(l.a)(t);try{for(c.s();!(i=c.n()).done;){var u=i.value;if(!u.isDisabled)return Object(a.jsxs)("div",{className:"tile-slot tile-value-".concat(u.value),children:["1",Object(a.jsx)("div",{className:"tile-content tile-value-".concat(u.value," tile-value-text"),children:u.value})]},n)}}catch(o){c.e(o)}finally{c.f()}}))},e)}))});return Object(a.jsxs)("div",{className:"game-container",children:[u,o]})}var M=function(){return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)(o,{}),Object(a.jsx)(D,{})]})},S=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,39)).then((function(n){var t=n.getCLS,i=n.getFID,r=n.getFCP,c=n.getLCP,u=n.getTTFB;t(e),i(e),r(e),c(e),u(e)}))};u.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(M,{})}),document.getElementById("root")),S()}},[[38,1,2]]]);
//# sourceMappingURL=main.553bf755.chunk.js.map