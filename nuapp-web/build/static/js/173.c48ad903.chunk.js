"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[173],{59931:function(e,t,n){n.d(t,{Fd:function(){return o},Sm:function(){return d},Um:function(){return f},y1:function(){return u}});var r=n(93433),s=n(74165),a=n(15861),i=n(7933),c=n(50500),l=!1,u=function(e){return function(){var t=(0,a.Z)((0,s.Z)().mark((function t(n,r,a){var u,o;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,c.Z)();case 2:if(l=t.sent,n((0,i.K4)(!0)),!l){t.next=10;break}return t.next=7,a.post("/billings",e);case 7:t.t0=t.sent,t.next=11;break;case 10:t.t0=m(n,r(),e);case 11:u=t.t0,o=u.status,n(201===o?(0,i.zm)(!0):(0,i.zm)(!1)),n((0,i.K4)(!1));case 15:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}()},o=function(e){return function(){var t=(0,a.Z)((0,s.Z)().mark((function t(n,r,a){var u,o;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,c.Z)();case 2:return l=t.sent,n((0,i.K4)(!0)),t.next=6,a.post("/billings/bulk",e);case 6:u=t.sent,o=u.status,n(201===o?(0,i.zm)(!0):(0,i.zm)(!1)),n((0,i.K4)(!1));case 10:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}()},f=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).page,t=void 0===e?1:e;return function(){var e=(0,a.Z)((0,s.Z)().mark((function e(n,r,a){var u,o;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,c.Z)();case 2:if(!(l=e.sent)){e.next=9;break}return e.next=6,a.get("/billings?page=".concat(t));case 6:e.t0=e.sent,e.next=10;break;case 9:e.t0=x(n,r());case 10:u=e.t0,o=u.data,200===u.status&&n((0,i.u0)(o));case 14:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}()},d=function(e){return function(){var t=(0,a.Z)((0,s.Z)().mark((function t(n,r,a){var c,l;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.get("/billings/per/".concat(e));case 2:c=t.sent,l=c.data,200===c.status&&n((0,i.u0)(l));case 6:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}()};function m(e,t,n){var s=t.billing.offline.billings,a=[];if(Array.isArray(s)){var c=JSON.parse(JSON.stringify(s));a=[].concat((0,r.Z)(a),(0,r.Z)(c))}return a.unshift(n),e((0,i.Jv)(a)),{status:201}}function x(e,t){var n=[t.billing.offline.billings];return n.length>10&&(n.length=10),e((0,i.u0)(n)),{data:n,status:200}}},28173:function(e,t,n){n.r(t);var r=n(93433),s=n(72791),a=n(59434),i=n(78983),c=n(33035),l=n(15005),u=n(24846),o=n(84620),f=n(97892),d=n.n(f),m=n(59931),x=n(2703),h=n(54270),p=n(80184),v=[{title:"Visits",value:"29.703 Users",percent:40,color:"success"},{title:"Unique",value:"24.093 Users",percent:20,color:"info"},{title:"Pageviews",value:"78.706 Views",percent:60,color:"warning"},{title:"New Users",value:"22.123 Users",percent:80,color:"danger"},{title:"Bounce Rate",value:"Average Rate",percent:40.15,color:"primary"}];t.default=function(){var e=(0,a.I0)(),t=(0,a.v9)((function(e){return e.billing.billings})),n=d()().subtract(10,"days").format("YYYY-MM-DD");(0,s.useEffect)((function(){e((0,m.Sm)(n))}),[e,n]);var f=t?t.map((function(e){return e.createdAt})):[],b=t?t.map((function(e){return e.billAmount})):[],g=(0,r.Z)(t).reverse();return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(i.xH,{className:"mb-4",children:[(0,p.jsx)(h.q,{children:(0,p.jsx)("title",{children:"DASHBOARD"})}),(0,p.jsxs)(i.sl,{children:[(0,p.jsxs)(i.rb,{children:[(0,p.jsx)(i.b7,{sm:5,children:(0,p.jsx)("h4",{id:"traffic",className:"card-title mb-0",children:"Ventas por d\xeda"})}),(0,p.jsxs)(i.b7,{sm:7,className:"d-none d-md-block",children:[(0,p.jsx)(i.u5,{color:"primary",className:"float-end",children:(0,p.jsx)(u.Z,{icon:o.j})}),(0,p.jsx)(i.Z0,{className:"float-end me-3",children:["Day","Month","Year"].map((function(e){return(0,p.jsx)(i.u5,{color:"outline-secondary",className:"mx-0",active:"Day"===e,children:e},e)}))})]})]}),(0,p.jsx)(c.oK,{style:{height:"300px",marginTop:"40px"},data:{labels:f,datasets:[{label:"Daily sales",backgroundColor:(0,l.hexToRgba)((0,l.getStyle)("--cui-info"),10),borderColor:(0,l.getStyle)("--cui-info"),pointHoverBackgroundColor:(0,l.getStyle)("--cui-info"),borderWidth:2,data:b,fill:!0}]},options:{maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{drawOnChartArea:!1}},y:{ticks:{beginAtZero:!0,maxTicksLimit:5,stepSize:Math.ceil(50),max:250}}},elements:{line:{tension:.4},point:{radius:1,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}}}),(0,p.jsx)("br",{}),(0,p.jsxs)(i.Sx,{align:"middle",className:"mb-0 border",hover:!0,responsive:!0,children:[(0,p.jsx)(i.V,{color:"light",children:(0,p.jsxs)(i.T6,{children:[(0,p.jsx)(i.is,{className:"text-center",children:"D\xeda"}),(0,p.jsx)(i.is,{className:"text-center",children:"Ventas"})]})}),(0,p.jsx)(i.NR,{children:g.map((function(e,t){var n=e.createdAt,r=e.billAmount;return(0,p.jsxs)(i.T6,{children:[(0,p.jsx)(i.NN,{className:"text-center",children:n}),(0,p.jsx)(i.NN,{className:"text-center",children:(0,x.x)(r)})]},t)}))})]})]}),(0,p.jsx)(i.Bt,{children:(0,p.jsx)(i.rb,{xs:{cols:1},md:{cols:5},className:"text-center",children:v.map((function(e,t){return(0,p.jsxs)(i.b7,{className:"mb-sm-2 mb-0",children:[(0,p.jsx)("div",{className:"text-medium-emphasis",children:e.title}),(0,p.jsxs)("strong",{children:[e.value," (",e.percent,"%)"]}),(0,p.jsx)(i.yI,{thin:!0,className:"mt-2",color:e.color,value:e.percent})]},t)}))})})]})})}},2703:function(e,t,n){n.d(t,{p:function(){return l},x:function(){return c}});var r=n(97892),s=n.n(r),a=n(83027),i=n.n(a);s().extend(i());var c=function(e){return Number.isInteger(e)&&e>=0?new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(e):e},l=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"DD-MM-YYYY hh:mm a";if("string"===typeof e)return s()(e).utcOffset(-300).format(t);var n=e||{},r=n.date,a=n.offset;return r&&a?s()(r).utcOffset(a/6e4).format(t):""}}}]);
//# sourceMappingURL=173.c48ad903.chunk.js.map