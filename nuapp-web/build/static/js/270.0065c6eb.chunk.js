"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[270],{83708:function(e,n){n.Z={ENTER_KEYCODE:13,TAB_KEYCODE:9,AVAILABLE_BILLS:[2e3,5e3,1e4,2e4,5e4,1e5]}},46252:function(e,n,r){r.d(n,{j:function(){return a},u:function(){return s}});var t=r(74165),i=r(15861),c=r(64708),s=function(e){return function(){var n=(0,i.Z)((0,t.Z)().mark((function n(r,i,s){var a,o;return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,s.post("/item-categories",e);case 2:a=n.sent,o=a.status,r(200===o?(0,c.gc)(!0):(0,c.gc)(!1));case 5:case"end":return n.stop()}}),n)})));return function(e,r,t){return n.apply(this,arguments)}}()},a=function(e){return function(){var n=(0,i.Z)((0,t.Z)().mark((function n(r,i,s){var a,o,u;return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a=new URLSearchParams(e).toString(),n.next=3,s.get("/item-categories".concat(a.length>0?"?"+a:""));case 3:o=n.sent,u=o.data,200===o.status&&r((0,c.JD)(u));case 7:case"end":return n.stop()}}),n)})));return function(e,r,t){return n.apply(this,arguments)}}()}},40601:function(e,n,r){r.r(n),r.d(n,{default:function(){return C}});var t=r(74165),i=r(15861),c=r(29439),s=r(72791),a=r(78983),o=r(93433),u=r(4942),l=r(1413),d=r(59434),x=(r(42087),r(46252)),h=r(47149),m=r(80184),f={name:"",code:"",description:"",price:"",categoryId:"",units:0,measurementUnit:""};var p=function(e){var n=(0,d.I0)(),r=(0,d.v9)((function(e){return e.itemCategories.itemCategories})),p=(0,d.v9)((function(e){return e.items.item})),j=(0,d.v9)((function(e){return e.items.existsByCode})),v=(0,s.useState)(f),g=(0,c.Z)(v,2),b=g[0],Z=g[1],k=(0,s.useState)({code:!1,description:!1,name:!1,price:!1,categoryId:!1,measurementUnit:!1}),C=(0,c.Z)(k,2),y=C[0],N=C[1],w=(0,s.useState)(!1),E=(0,c.Z)(w,2),I=E[0],_=E[1],O=function(){return _(!I)};(0,s.useEffect)((function(){p&&Z(p),n((0,x.j)({parse:!0}))}),[n,p]);var S=function(e){var r,t=e.target,i=t.name,c=t.value;Z((0,l.Z)((0,l.Z)({},b),{},(0,u.Z)({},i,c))),N((0,l.Z)((0,l.Z)({},y),{},(0,u.Z)({},i,!c))),"code"===i&&(r=c,n((0,h.lC)(r)))},A=(0,m.jsx)("button",{className:"close",onClick:O,children:"\xd7"}),D=function(){var e=(0,l.Z)({},b),n=e.name,r=e.code,t=e.description,i=e.price,c=e.categoryId,s=e.measurementUnit,a=(0,l.Z)({},y);return a.code=!r||j,a.description=!t,a.name=!n,a.price=!i,a.categoryId=!c,a.measurementUnit=!s,N(a),Object.values(a).every((function(e){return!1===e}))},U=function(){var n=(0,i.Z)((0,t.Z)().mark((function n(){return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:D()&&(e.save((0,l.Z)({},b)),Z(f));case 1:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return console.log({codeRegistered:j}),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(a.KB,{fluid:!0,children:(0,m.jsxs)(a.lx,{className:"row g-3 needs-validation",noValidate:!0,children:[(0,m.jsxs)(a.rb,{style:{marginTop:"40px"},children:[(0,m.jsx)(a.b7,{xs:"12",lg:"4",children:(0,m.jsx)(a.jO,{label:"C\xf3digo",type:"text",name:"code",value:b.code,feedback:j?"El c\xf3digo ya se encuentra registrado":"Campo obligatorio",invalid:j||y.code,required:!0,onChange:function(e){return S(e)}})}),(0,m.jsx)(a.b7,{xs:"12",lg:"4",children:(0,m.jsx)(a.jO,{label:"Nombre",type:"text",name:"name",value:b.name,feedbackInvalid:"Campo obligatorio",invalid:y.name,required:!0,onChange:function(e){return S(e)}})}),(0,m.jsx)(a.b7,{xs:"12",lg:"4",children:(0,m.jsx)(a.jO,{label:"Descripci\xf3n",type:"text",name:"description",value:b.description,feedbackInvalid:"Campo obligatorio",invalid:y.description,required:!0,onChange:function(e){return S(e)}})})]}),(0,m.jsxs)(a.rb,{children:[(0,m.jsx)(a.b7,{xs:"12",lg:"4",children:(0,m.jsx)(a.jO,{label:"Precio",type:"number",name:"price",value:b.price,feedbackInvalid:"Campo obligatorio",invalid:y.price,required:!0,onChange:function(e){return S(e)}})}),(0,m.jsx)(a.b7,{xs:"12",lg:"4",children:(0,m.jsx)(a.LX,{label:"Categoria",name:"categoryId",value:b.categoryId,required:!0,onChange:function(e){return S(e)},"aria-label":"Default select example",options:["Seleccione la categoria"].concat((0,o.Z)(r))})}),(0,m.jsx)(a.b7,{xs:"12",lg:"4",children:(0,m.jsx)(a.jO,{label:"Unidad de medida",type:"text",name:"measurementUnit",value:b.measurementUnit,feedbackInvalid:"Campo obligatorio",invalid:y.measurementUnit,required:!0,onChange:function(e){return S(e)}})})]}),(0,m.jsxs)(a.rb,{className:"mt-5",children:[(0,m.jsx)(a.b7,{xs:"8",lg:"2",children:(0,m.jsx)(a.u5,{variant:"outline",color:"success",type:"button",onClick:function(){return U()},children:p?"ACTUALIZAR":"GUARDAR"})}),(0,m.jsx)(a.b7,{xs:"4",lg:"2",children:(0,m.jsx)(a.u5,{variant:"outline",color:"secondary",onClick:function(){e.cancel()},children:"CANCELAR"})})]})]})}),(0,m.jsxs)(a.Tk,{isOpen:I,toggle:O,children:[(0,m.jsx)(a.p0,{toggle:O,close:A,children:"Escaneando"}),(0,m.jsx)(a.sD,{children:(0,m.jsx)("div",{id:"reader",width:"600px",style:{maxWidth:"750px"}})}),(0,m.jsx)(a.Ym,{children:(0,m.jsx)(a.u5,{color:"secondary",onClick:O,children:"Cancelar"})})]})]})},j=r.p+"static/media/new.38c12e8dca1ed9073681.ico",v=r(83708),g=r(72698),b=r(2703),Z=v.Z.ENTER_KEYCODE,k=v.Z.TAB_KEYCODE;var C=function(){var e=(0,d.I0)(),n=(0,d.v9)((function(e){return e.items.items})),r=(0,s.useState)(""),o=(0,c.Z)(r,2),u=o[0],l=o[1],x=(0,s.useState)(!1),f=(0,c.Z)(x,2),v=f[0],C=f[1],y=(0,s.useState)(1),N=(0,c.Z)(y,2),w=N[0],E=N[1];(0,s.useEffect)((function(){l("")}),[]),(0,s.useEffect)((function(){e((0,h.kk)({page:1}))}),[e]);var I=function(){var n=(0,i.Z)((0,t.Z)().mark((function n(){return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e((0,h.kk)({page:1})),C(!1);case 2:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),_=function(){var n=(0,i.Z)((0,t.Z)().mark((function n(){var r;return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:E(r=1===w?1:w-1),e((0,h.kk)({page:r}));case 3:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),O=function(){var n=(0,i.Z)((0,t.Z)().mark((function n(){var r;return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:E(r=w+1),e((0,h.kk)({page:r}));case 3:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),S=function(){var e=(0,i.Z)((0,t.Z)().mark((function e(n){var r;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=n.keyCode,[Z,k].includes(r)&&A();case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),A=function(){var n=(0,i.Z)((0,t.Z)().mark((function n(){return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!u){n.next=3;break}return e((0,h.kk)({code:u.trim(),name:u.trim(),page:1})),n.abrupt("return");case 3:e((0,h.kk)({page:1}));case 4:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return(0,m.jsx)(m.Fragment,{children:(0,m.jsx)(a.KB,{className:"mt--6",fluid:!0,children:(0,m.jsx)(a.rb,{children:(0,m.jsx)(a.b7,{children:(0,m.jsxs)(a.xH,{className:"mt-6 shadow border-10",children:[(0,m.jsx)(a.bn,{className:"border-0",children:!v&&(0,m.jsxs)(a.rb,{children:[(0,m.jsx)(a.b7,{xs:"4",lg:"3",children:(0,m.jsx)(a.u5,{variant:"outline",color:"success",onClick:function(){e((0,g.LS)(null)),C(!0)},children:"NUEVO ITEM"})}),(0,m.jsx)(a.b7,{lg:"5",children:(0,m.jsxs)(a.YR,{children:[(0,m.jsx)(a.jO,{type:"text",name:"searchTerm",placeholder:"...",value:u,onChange:function(e){return function(e){var n=e.target.value;l(n)}(e)},onKeyDown:function(e){return S(e)}}),(0,m.jsx)(a.u5,{type:"button",variant:"outline",color:"primary",onClick:A,children:"BUSCAR"})]})})]})}),(0,m.jsxs)(a.sl,{children:[!v&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("div",{className:"d-lg-none",children:n.map((function(e){var n=e.name,r=e.code,t=e.description,i=e.price;return(0,m.jsx)(a.xH,{style:{width:"auto"},children:(0,m.jsxs)(a.rb,{className:"g-0",children:[(0,m.jsx)(a.b7,{xs:4,children:(0,m.jsx)(a.pX,{src:j})}),(0,m.jsx)(a.b7,{xs:8,children:(0,m.jsxs)(a.sl,{children:[(0,m.jsx)(a.rb,{children:(0,m.jsx)(a.b7,{children:n})}),(0,m.jsx)(a.rb,{children:(0,m.jsx)(a.b7,{children:r})}),(0,m.jsx)(a.rb,{children:(0,m.jsx)(a.b7,{children:t})}),(0,m.jsx)(a.rb,{children:(0,m.jsxs)(a.b7,{children:["$",i]})})]})})]},r)},r)}))}),(0,m.jsx)("div",{className:"d-none d-lg-block",children:(0,m.jsxs)(a.Sx,{children:[(0,m.jsx)(a.V,{children:(0,m.jsxs)(a.T6,{children:[(0,m.jsx)(a.is,{children:"Nombre"}),(0,m.jsx)(a.is,{children:"C\xf3digo"}),(0,m.jsx)(a.is,{children:"Descripci\xf3n"}),(0,m.jsx)(a.is,{children:"Precio"}),(0,m.jsx)(a.is,{children:"\xa0"})]})}),(0,m.jsx)(a.NR,{children:n.map((function(n){return(0,m.jsxs)(a.T6,{children:[(0,m.jsx)(a.NN,{xs:"12",className:"text-uppercase",children:n.name}),(0,m.jsx)(a.NN,{className:"fs-6",xs:"12",children:n.code}),(0,m.jsx)(a.NN,{xs:"12",className:"text-break",children:n.description}),(0,m.jsx)(a.NN,{xs:"12",children:(0,b.x)(n.price)}),(0,m.jsx)(a.NN,{xs:"12",children:(0,m.jsx)(a.u5,{size:"sm",variant:"outline",color:"info",onClick:function(){return function(n){C(!0),e((0,g.LS)(n))}(n)},children:"Editar"})})]},n.code)}))})]})}),(0,m.jsx)(a.Bt,{className:"py-4",children:(0,m.jsxs)(a.rb,{children:[(0,m.jsx)(a.b7,{children:(0,m.jsx)("div",{className:"d-grid col-12 mx-auto",children:(0,m.jsx)(a.u5,{type:"button",variant:"outline",color:"secondary",onClick:_,children:"ANTERIOR"})})}),(0,m.jsx)(a.b7,{children:(0,m.jsx)("div",{className:"d-grid col-12 mx-auto",children:(0,m.jsx)(a.u5,{type:"button",variant:"outline",color:"secondary",onClick:O,children:"SIGUIENTE"})})})]})})]}),v&&(0,m.jsx)(p,{save:function(n){n._id?e((0,h.$G)(n)):e((0,h.OK)(n))},cancel:I})]})]})})})})})}},2703:function(e,n,r){r.d(n,{p:function(){return s},x:function(){return c}});var t=r(97892),i=r.n(t),c=function(e){return Number.isInteger(e)&&e>=0?new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(e):e},s=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"DD-MM-YYYY hh:mm a";return i()(e).format(n)}}}]);
//# sourceMappingURL=270.0065c6eb.chunk.js.map