"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[982],{83708:function(e,n){n.Z={ENTER_KEYCODE:13,TAB_KEYCODE:9,AVAILABLE_BILLS:[2e3,5e3,1e4,2e4,5e4,1e5]}},99262:function(e,n,r){r.d(n,{l:function(){return c}});var t=r(72791),c=function(e,n){var r=(0,t.useRef)(!1);(0,t.useEffect)((function(){r.current?e():r.current=!0}),n)}},59931:function(e,n,r){r.d(n,{Fd:function(){return l},Sm:function(){return f},Um:function(){return d},y1:function(){return o}});var t=r(93433),c=r(74165),s=r(15861),i=r(7933),a=r(50500),u=!1,o=function(e){return function(){var n=(0,s.Z)((0,c.Z)().mark((function n(r,t,s){var o,l;return(0,c.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,a.Z)();case 2:if(u=n.sent,r((0,i.K4)(!0)),!u){n.next=10;break}return n.next=7,s.post("/billings",e);case 7:n.t0=n.sent,n.next=11;break;case 10:n.t0=h(r,t(),e);case 11:o=n.t0,l=o.status,r(201===l?(0,i.zm)(!0):(0,i.zm)(!1)),r((0,i.K4)(!1));case 15:case"end":return n.stop()}}),n)})));return function(e,r,t){return n.apply(this,arguments)}}()},l=function(e){return function(){var n=(0,s.Z)((0,c.Z)().mark((function n(r,t,s){var o,l;return(0,c.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,a.Z)();case 2:return u=n.sent,r((0,i.K4)(!0)),n.next=6,s.post("/billings/bulk",e);case 6:o=n.sent,l=o.status,r(201===l?(0,i.zm)(!0):(0,i.zm)(!1)),r((0,i.K4)(!1));case 10:case"end":return n.stop()}}),n)})));return function(e,r,t){return n.apply(this,arguments)}}()},d=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).page,n=void 0===e?1:e;return function(){var e=(0,s.Z)((0,c.Z)().mark((function e(r,t,s){var o,l;return(0,c.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,a.Z)();case 2:if(!(u=e.sent)){e.next=9;break}return e.next=6,s.get("/billings?page=".concat(n));case 6:e.t0=e.sent,e.next=10;break;case 9:e.t0=x(r,t());case 10:o=e.t0,l=o.data,200===o.status&&r((0,i.u0)(l));case 14:case"end":return e.stop()}}),e)})));return function(n,r,t){return e.apply(this,arguments)}}()},f=function(e){return function(){var n=(0,s.Z)((0,c.Z)().mark((function n(r,t,s){var a,u;return(0,c.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,s.get("/billings/per/".concat(e));case 2:a=n.sent,u=a.data,200===a.status&&r((0,i.u0)(u));case 6:case"end":return n.stop()}}),n)})));return function(e,r,t){return n.apply(this,arguments)}}()};function h(e,n,r){var c=n.billing.offline.billings,s=[];if(Array.isArray(c)){var a=JSON.parse(JSON.stringify(c));s=[].concat((0,t.Z)(s),(0,t.Z)(a))}return s.unshift(r),e((0,i.Jv)(s)),{status:201}}function x(e,n){var r=[n.billing.offline.billings];return r.length>10&&(r.length=10),e((0,i.u0)(r)),{data:r,status:200}}},51982:function(e,n,r){r.r(n),r.d(n,{default:function(){return S}});var t=r(4942),c=r(74165),s=r(93433),i=r(1413),a=r(15861),u=r(29439),o=r(72791),l=r(59434),d=r(78983),f=(r(42087),r(2703)),h=r(72698),x=r(47149),m=r(83708),p=r(80184),j=m.Z.ENTER_KEYCODE,v=m.Z.TAB_KEYCODE,b=function(e){var n=(0,l.I0)(),r=(0,l.v9)((function(e){return e.items.items})),t=(0,o.useState)(""),s=(0,u.Z)(t,2),i=s[0],m=s[1],b=(0,o.useState)(!1),g=(0,u.Z)(b,2),Z=g[0],y=g[1],N=(0,o.useRef)(),C=(0,o.useCallback)((function(){n((0,h.U7)([])),m(""),N.current.focus()}),[n]);(0,o.useEffect)((function(){C()}),[C]);var k=function(){var e=(0,a.Z)((0,c.Z)().mark((function e(n){var t;return(0,c.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=n.keyCode,[j,v].includes(t)&&(w(),setTimeout((function(){r.length>0&&E(r[0])}),500));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),w=function(){var e=(0,a.Z)((0,c.Z)().mark((function e(r){var t;return(0,c.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(t=null!==r&&void 0!==r?r:i)&&n((0,x.kk)({code:t,name:t,page:1}));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),E=function(n){e.addItem(n),C()};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(d.KB,{fluid:!0,children:[(0,p.jsx)(d.rb,{children:(0,p.jsx)(d.b7,{children:(0,p.jsxs)(d.YR,{children:[(0,p.jsx)(d.jO,{ref:N,type:"text",name:"searchTerm",placeholder:"Buscar",value:i,onChange:function(e){return function(e){var n=e.target.value;m(n),w(n)}(e)},onKeyDown:function(e){return k(e)}}),(0,p.jsx)(d.u5,{variant:"outline",type:"button",color:"secondary",onClick:C,children:"BORRAR"})]})})}),(0,p.jsx)(d.rb,{children:(0,p.jsx)(d.b7,{children:(0,p.jsxs)(d.Sx,{hover:!0,children:[(0,p.jsx)(d.V,{children:(0,p.jsxs)(d.T6,{children:[(0,p.jsx)(d.is,{children:"Nombre"}),(0,p.jsx)(d.is,{children:"Precio"})]})}),(0,p.jsx)(d.NR,{children:r.map((function(e){return(0,p.jsxs)(d.T6,{onClick:function(){return E(e)},style:{cursor:"pointer"},children:[(0,p.jsxs)(d.NN,{xs:"12",children:[(0,p.jsx)(d.rb,{children:(0,p.jsx)(d.b7,{className:"text-uppercase",children:e.name})}),(0,p.jsx)(d.rb,{children:(0,p.jsx)(d.b7,{style:{fontSize:10},children:e.code})})]}),(0,p.jsx)(d.NN,{className:"text-break",children:(0,f.x)(e.price)})]},e.code)}))})]})})})]}),(0,p.jsxs)(d.Tk,{visible:Z,onClose:function(){return y(!1)},children:[(0,p.jsx)(d.p0,{children:(0,p.jsx)(d.fl,{children:"Scanning"})}),(0,p.jsx)(d.sD,{children:(0,p.jsx)("div",{id:"reader",width:"600px",style:{maxWidth:"750px"}})}),(0,p.jsx)(d.Ym,{children:(0,p.jsx)(d.u5,{Ccolor:"secondary",onClick:function(){return y(!1)},children:"Close"})})]})]})},g=r(24846),Z=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z' class='ci-primary'/><rect width='32' height='200' x='168' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='200' x='240' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='200' x='312' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z' class='ci-primary'/>"],y=m.Z.ENTER_KEYCODE,N=m.Z.TAB_KEYCODE,C=function(e){var n=(0,o.useState)(0),r=(0,u.Z)(n,2),t=r[0],s=r[1],i=(0,o.useState)(!1),l=(0,u.Z)(i,2),h=l[0],x=l[1],j=(0,o.useState)(0),v=(0,u.Z)(j,2),b=v[0],g=v[1],Z=(0,o.useRef)();(0,o.useEffect)((function(){Z.current.focus(),Z.current.select()}),[]);var C=function(){var e=(0,a.Z)((0,c.Z)().mark((function e(n){var r;return(0,c.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=n.keyCode,[y,N].includes(r)&&k();case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),k=function(n){var r=null!==n&&void 0!==n?n:t;x(r<e.total),g(r-e.total)};return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(d.KB,{fluid:!0,children:[(0,p.jsx)(d.rb,{children:m.Z.AVAILABLE_BILLS.map((function(n){return(0,p.jsx)(d.b7,{lg:"6",className:"mt-2",style:{cursor:"pointer"},children:(0,p.jsx)(d.xH,{onClick:function(){return function(n){s(n),e.setReceivedAmount(n),k(n)}(n)},children:(0,p.jsx)(d.sl,{children:(0,p.jsx)("h4",{className:"text-center",children:(0,f.x)(n)})})})},n)}))}),(0,p.jsxs)(d.rb,{className:"mt-4",children:[(0,p.jsx)(d.b7,{lg:"4",children:(0,p.jsx)("h5",{children:"RECIBIDO"})}),(0,p.jsx)(d.b7,{lg:"8",children:(0,p.jsx)(d.jO,{ref:Z,"data-testid":"receivedAmountId",type:"number",size:"lg",name:"receivedAmount",feedbackInvalid:"El monto recibido no debe ser menor al total",invalid:h,value:t,onChange:function(n){return function(n){var r=n.target.value;s(r),e.setReceivedAmount(r),k(r)}(n)},onKeyDown:function(e){return C(e)}})})]}),(0,p.jsxs)(d.rb,{className:"mt-4",children:[(0,p.jsx)(d.b7,{lg:"4",children:(0,p.jsx)("h5",{children:"CAMBIO"})}),(0,p.jsx)(d.b7,{lg:"8",className:"align-self-end",children:(0,p.jsx)("span",{className:"fs-3",children:(0,f.x)(b)})})]})]})})},k=r(59931),w=r(43744),E=r(7933),A=r(54270),R=r(99262);var S=function(){var e=(0,l.v9)((function(e){return e.billing.saveSuccess})),n=(0,l.I0)(),r=(0,o.useState)([]),h=(0,u.Z)(r,2),x=h[0],m=h[1],j=(0,o.useState)(0),v=(0,u.Z)(j,2),y=v[0],N=v[1],S=(0,o.useState)(0),_=(0,u.Z)(S,2),O=_[0],B=_[1],I=(0,o.useState)({}),K=(0,u.Z)(I,2),T=K[0],D=K[1],Y=(0,o.useState)(!1),z=(0,u.Z)(Y,2),H=z[0],V=z[1],L=y<O,F=x.length<=0;(0,o.useEffect)((function(){n((0,w.r2)(!0))}),[n]),(0,R.l)((function(){m([]),N(0),B(0),D({}),n((0,w.js)({message:"Guardado exitoso!",color:"success",delay:2e3})),n((0,w.W3)(!0)),n((0,E.zm)(!1))}),[e]);var M=function(){var e=(0,a.Z)((0,c.Z)().mark((function e(n){var r,t;return(0,c.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r={},U(n.code)?r[n.code]=T[n.code]+1:r[n.code]=1,r=(0,i.Z)((0,i.Z)({},T),r),D(r),t=(0,s.Z)(x),U(n.code)||t.unshift(n),m(t),W(t,r);case 8:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),U=function(e){return x.some((function(n){return n.code===e}))},W=function(e,n){var r=e.map((function(e){var r=e.price,t=e.code;return r*n[t]})).reduce((function(e,n){return+e+ +n}),0);B(r)},P=function(){var e=(0,a.Z)((0,c.Z)().mark((function e(){return(0,c.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!L){e.next=4;break}return n((0,w.js)({message:"Revisa el monto recibido y el total",color:"warning"})),n((0,w.W3)(!0)),e.abrupt("return");case 4:if(!F){e.next=8;break}return n((0,w.js)({message:"No hay productos por facturar",color:"warning"})),n((0,w.W3)(!0)),e.abrupt("return");case 8:n((0,k.y1)({receivedAmount:y,billAmount:O,items:J(x)})),V(!1);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),J=function(){return x.map((function(e){var n=e._id,r=e.name,t=e.code,c=e.price,s=e.measurementUnit;return{_id:n,name:r,code:t,price:c,units:T[t],measurementUnit:s}}))};return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(d.KB,{className:"mt--6",fluid:!0,children:[(0,p.jsx)(A.q,{children:(0,p.jsx)("title",{children:"Billing"})}),(0,p.jsxs)(d.rb,{children:[(0,p.jsx)(d.b7,{lg:"5",children:(0,p.jsx)(d.xH,{className:"shadow border-10",style:{height:"78vh"},children:(0,p.jsx)(d.sl,{style:{overflow:"auto"},children:(0,p.jsxs)(d.Sx,{hover:!0,children:[(0,p.jsx)(d.V,{children:(0,p.jsxs)(d.T6,{children:[(0,p.jsx)(d.is,{children:"Producto"}),(0,p.jsx)(d.is,{children:"Cantidad"}),(0,p.jsx)(d.is,{children:"Subtotal"}),(0,p.jsx)(d.is,{children:"\xa0"})]})}),(0,p.jsx)(d.NR,{children:x.map((function(e){var n=e.code,r=e.name,c=e.price;return(0,p.jsxs)(d.T6,{children:[(0,p.jsxs)(d.NN,{xs:"12",children:[(0,p.jsx)(d.rb,{children:(0,p.jsx)(d.b7,{className:"text-uppercase",children:r})}),(0,p.jsx)(d.rb,{children:(0,p.jsx)(d.b7,{style:{fontSize:10},children:n})})]}),(0,p.jsx)(d.NN,{colSpan:1,children:(0,p.jsx)(d.jO,{style:{maxWidth:60},type:"number",min:1,formNoValidate:!0,size:"sm",name:n,value:T[n],onChange:function(e){return function(e){var n=e.target,r=n.name,c=n.value,s=(0,i.Z)((0,i.Z)({},T),{},(0,t.Z)({},r,c));D(s),W(x,s)}(e)}})}),(0,p.jsx)(d.NN,{xs:"12",className:"text-break",children:(0,f.x)(c*T[n])}),(0,p.jsx)(d.NN,{children:(0,p.jsx)(d.u5,{size:"sm",color:"ligth",onClick:function(){return function(e){var n=Object.assign([],x),r=Object.assign([],T),t=n.findIndex((function(n){return n.code===e}));delete r[e],-1!==t&&n.splice(t,1),m(n),D(r),W(n,r)}(n)},children:(0,p.jsx)(g.Z,{icon:Z,size:"sm"})})})]},n)}))})]})})})}),(0,p.jsx)(d.b7,{lg:"7",children:(0,p.jsx)(d.xH,{className:"shadow border-10",style:{height:"78vh",overflowY:"auto"},children:(0,p.jsxs)(d.sl,{children:[!H&&(0,p.jsx)(b,{addItem:M}),H&&(0,p.jsx)(C,{setReceivedAmount:function(e){return N(e)},total:O})]})})})]}),(0,p.jsx)(d.rb,{className:"mt-3 align-items-end",children:(0,p.jsx)(d.xH,{className:"shadow border-10",children:(0,p.jsx)(d.sl,{children:(0,p.jsxs)(d.rb,{className:"mt-3",children:[(0,p.jsx)(d.b7,{lg:"5",children:(0,p.jsx)("div",{className:"d-grid gap-2",children:(0,p.jsx)(d.u5,{size:"lg",color:H?"success":"primary",onClick:H?P:function(){V(!0)},disabled:H?L:F,children:H?"FACTURAR":"COBRAR"})})}),(0,p.jsxs)(d.b7,{lg:"6",className:"fs-1",children:[(0,p.jsx)("span",{children:"POR COBRAR"}),"\xa0",(0,f.x)(O)]})]})})})})]})})}},2703:function(e,n,r){r.d(n,{p:function(){return i},x:function(){return s}});var t=r(97892),c=r.n(t),s=function(e){return Number.isInteger(e)&&e>=0?new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(e):e},i=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"DD-MM-YYYY hh:mm a";return c()(e).format(n)}}}]);
//# sourceMappingURL=982.4a0e5086.chunk.js.map