(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{"A+CX":function(e,r,t){"use strict";function o(e){var r=e.theme,t=e.name,o=e.props;if(!r||!r.props||!r.props[t])return o;var n,a=r.props[t];for(n in a)void 0===o[n]&&(o[n]=a[n]);return o}t.d(r,"a",(function(){return o}))},Dg2g:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/searchapi",function(){return t("yWOu")}])},H2TA:function(e,r,t){"use strict";var o=t("wx14"),n=t("Ff2n"),a=t("q1tI"),p=t.n(a),i=(t("17x9"),t("2mql")),c=t.n(i),s=t("RD7I"),l=t("A+CX"),u=t("aXM8"),f=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return function(t){var a=r.defaultTheme,i=r.withTheme,f=void 0!==i&&i,m=r.name,d=Object(n.a)(r,["defaultTheme","withTheme","name"]);var h=m,b=Object(s.a)(e,Object(o.a)({defaultTheme:a,Component:t,name:m||t.displayName,classNamePrefix:h},d)),y=p.a.forwardRef((function(e,r){e.classes;var i,c=e.innerRef,s=Object(n.a)(e,["classes","innerRef"]),d=b(Object(o.a)(Object(o.a)({},t.defaultProps),e)),h=s;return("string"===typeof m||f)&&(i=Object(u.a)()||a,m&&(h=Object(l.a)({theme:i,name:m,props:s})),f&&!h.theme&&(h.theme=i)),p.a.createElement(t,Object(o.a)({ref:c||r,classes:d},h))}));return c()(y,t),y}},m=t("cNwE");r.a=function(e,r){return f(e,Object(o.a)({defaultTheme:m.a},r))}},"R/WZ":function(e,r,t){"use strict";var o=t("wx14"),n=t("RD7I"),a=t("cNwE");r.a=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(n.a)(e,Object(o.a)({defaultTheme:a.a},r))}},hlFM:function(e,r,t){"use strict";var o=t("KQm4"),n=t("wx14"),a=(t("17x9"),t("bv9d"));var p=function(e){var r=function(r){var t=e(r);return r.css?Object(n.a)(Object(n.a)({},Object(a.a)(t,e(Object(n.a)({theme:r.theme},r.css)))),function(e,r){var t={};return Object.keys(e).forEach((function(o){-1===r.indexOf(o)&&(t[o]=e[o])})),t}(r.css,[e.filterProps])):t};return r.propTypes={},r.filterProps=["css"].concat(Object(o.a)(e.filterProps)),r};var i=function(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];var o=function(e){return r.reduce((function(r,t){var o=t(e);return o?Object(a.a)(r,o):r}),{})};return o.propTypes={},o.filterProps=r.reduce((function(e,r){return e.concat(r.filterProps)}),[]),o},c=t("rePB"),s=t("LybE");function l(e,r){return r&&"string"===typeof r?r.split(".").reduce((function(e,r){return e&&e[r]?e[r]:null}),e):null}var u=function(e){var r=e.prop,t=e.cssProperty,o=void 0===t?e.prop:t,n=e.themeKey,a=e.transform,p=function(e){if(null==e[r])return null;var t=e[r],p=l(e.theme,n)||{};return Object(s.a)(e,t,(function(e){var r;return"function"===typeof p?r=p(e):Array.isArray(p)?r=p[e]||e:(r=l(p,e)||e,a&&(r=a(r))),!1===o?r:Object(c.a)({},o,r)}))};return p.propTypes={},p.filterProps=[r],p};function f(e){return"number"!==typeof e?e:"".concat(e,"px solid")}var m=i(u({prop:"border",themeKey:"borders",transform:f}),u({prop:"borderTop",themeKey:"borders",transform:f}),u({prop:"borderRight",themeKey:"borders",transform:f}),u({prop:"borderBottom",themeKey:"borders",transform:f}),u({prop:"borderLeft",themeKey:"borders",transform:f}),u({prop:"borderColor",themeKey:"palette"}),u({prop:"borderRadius",themeKey:"shape"})),d=i(u({prop:"displayPrint",cssProperty:!1,transform:function(e){return{"@media print":{display:e}}}}),u({prop:"display"}),u({prop:"overflow"}),u({prop:"textOverflow"}),u({prop:"visibility"}),u({prop:"whiteSpace"})),h=i(u({prop:"flexBasis"}),u({prop:"flexDirection"}),u({prop:"flexWrap"}),u({prop:"justifyContent"}),u({prop:"alignItems"}),u({prop:"alignContent"}),u({prop:"order"}),u({prop:"flex"}),u({prop:"flexGrow"}),u({prop:"flexShrink"}),u({prop:"alignSelf"}),u({prop:"justifyItems"}),u({prop:"justifySelf"})),b=i(u({prop:"gridGap"}),u({prop:"gridColumnGap"}),u({prop:"gridRowGap"}),u({prop:"gridColumn"}),u({prop:"gridRow"}),u({prop:"gridAutoFlow"}),u({prop:"gridAutoColumns"}),u({prop:"gridAutoRows"}),u({prop:"gridTemplateColumns"}),u({prop:"gridTemplateRows"}),u({prop:"gridTemplateAreas"}),u({prop:"gridArea"})),y=i(u({prop:"position"}),u({prop:"zIndex",themeKey:"zIndex"}),u({prop:"top"}),u({prop:"right"}),u({prop:"bottom"}),u({prop:"left"})),g=i(u({prop:"color",themeKey:"palette"}),u({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette"})),v=u({prop:"boxShadow",themeKey:"shadows"});function w(e){return e<=1?"".concat(100*e,"%"):e}var x=u({prop:"width",transform:w}),O=u({prop:"maxWidth",transform:w}),j=u({prop:"minWidth",transform:w}),T=u({prop:"height",transform:w}),N=u({prop:"maxHeight",transform:w}),P=u({prop:"minHeight",transform:w}),S=(u({prop:"size",cssProperty:"width",transform:w}),u({prop:"size",cssProperty:"height",transform:w}),i(x,O,j,T,N,P,u({prop:"boxSizing"}))),R=t("+Hmc"),K=i(u({prop:"fontFamily",themeKey:"typography"}),u({prop:"fontSize",themeKey:"typography"}),u({prop:"fontStyle",themeKey:"typography"}),u({prop:"fontWeight",themeKey:"typography"}),u({prop:"letterSpacing"}),u({prop:"lineHeight"}),u({prop:"textAlign"})),k=t("Ff2n"),C=t("q1tI"),I=t.n(C),E=t("iuhU"),A=t("2mql"),W=t.n(A),z=t("RD7I");function q(e,r){var t={};return Object.keys(e).forEach((function(o){-1===r.indexOf(o)&&(t[o]=e[o])})),t}var D=t("cNwE"),F=function(e){var r=function(e){return function(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=t.name,a=Object(k.a)(t,["name"]);var p,i=o,c="function"===typeof r?function(e){return{root:function(t){return r(Object(n.a)({theme:e},t))}}}:{root:r},s=Object(z.a)(c,Object(n.a)({Component:e,name:o||e.displayName,classNamePrefix:i},a));r.filterProps&&(p=r.filterProps,delete r.filterProps),r.propTypes&&(r.propTypes,delete r.propTypes);var l=I.a.forwardRef((function(r,t){var o=r.children,a=r.className,i=r.clone,c=r.component,l=Object(k.a)(r,["children","className","clone","component"]),u=s(r),f=Object(E.a)(u.root,a),m=l;if(p&&(m=q(m,p)),i)return I.a.cloneElement(o,Object(n.a)({className:Object(E.a)(o.props.className,f)},m));if("function"===typeof o)return o(Object(n.a)({className:f},m));var d=c||e;return(I.a.createElement(d,Object(n.a)({ref:t,className:f},m),o))}));return W()(l,e),l}}(e);return function(e,t){return r(e,Object(n.a)({defaultTheme:D.a},t))}},H=p(i(m,d,h,b,y,g,v,S,R.b,K)),_=F("div")(H,{name:"MuiBox"});r.a=_},wb2y:function(e,r,t){"use strict";var o=t("wx14"),n=t("Ff2n"),a=t("q1tI"),p=(t("17x9"),t("iuhU")),i=t("H2TA"),c=t("ye/S"),s=a.forwardRef((function(e,r){var t=e.absolute,i=void 0!==t&&t,c=e.classes,s=e.className,l=e.component,u=void 0===l?"hr":l,f=e.flexItem,m=void 0!==f&&f,d=e.light,h=void 0!==d&&d,b=e.orientation,y=void 0===b?"horizontal":b,g=e.role,v=void 0===g?"hr"!==u?"separator":void 0:g,w=e.variant,x=void 0===w?"fullWidth":w,O=Object(n.a)(e,["absolute","classes","className","component","flexItem","light","orientation","role","variant"]);return(a.createElement(u,Object(o.a)({className:Object(p.a)(c.root,s,"fullWidth"!==x&&c[x],i&&c.absolute,m&&c.flexItem,h&&c.light,"vertical"===y&&c.vertical),role:v,ref:r},O)))}));r.a=Object(i.a)((function(e){return{root:{height:1,margin:0,border:"none",flexShrink:0,backgroundColor:e.palette.divider},absolute:{position:"absolute",bottom:0,left:0,width:"100%"},inset:{marginLeft:72},light:{backgroundColor:Object(c.c)(e.palette.divider,.08)},middle:{marginLeft:e.spacing(2),marginRight:e.spacing(2)},vertical:{height:"100%",width:1},flexItem:{alignSelf:"stretch",height:"auto"}}}),{name:"MuiDivider"})(s)},yWOu:function(e,r,t){"use strict";t.r(r);var o=t("q1tI"),n=t.n(o),a=t("R/WZ"),p=t("hlFM"),i=t("wb2y"),c=n.a.createElement,s=Object(a.a)((function(e){return{root:{},code:{border:"1px solid #ccc",backgroundColor:"#f5f5f5",padding:e.spacing(1,1),fontSize:"0.75rem"}}})),l=[{id:1,name:"uid",des:"\u5546\u6237uid",type:"String(255)",help:"\u5fc5\u586b\u3002\u60a8\u7684\u5546\u6237\u552f\u4e00\u6807\u8bc6\uff0c\u6ce8\u518c\u540e\u5728\u8bbe\u7f6e\u91cc\u83b7\u5f97\u3002"},{id:2,name:"type",des:"\u652f\u4ed8\u7c7b\u578b",type:"int",help:"\u5fc5\u586b\u30020\uff1a\u652f\u4ed8\u5b9d\uff1b1\uff1a\u5fae\u4fe1\u652f\u4ed8\u3002"},{id:3,name:"orderid",des:"\u5546\u6237\u81ea\u5b9a\u4e49\u8ba2\u5355\u53f7",type:"String(50)",help:"\u5fc5\u586b\u3002\u6211\u4eec\u4f1a\u636e\u6b64\u5224\u522b\u662f\u540c\u4e00\u7b14\u8ba2\u5355\u8fd8\u662f\u65b0\u8ba2\u5355\u3002\u6211\u4eec\u56de\u8c03\u65f6\uff0c\u4f1a\u5e26\u4e0a\u8fd9\u4e2a\u53c2\u6570\u3002\u4f8b\uff1a201710192541"},{id:4,name:"sign",des:"\u7b7e\u540d",type:"String(255)",help:"\u5fc5\u586b\u3002\u628a\u4f7f\u7528\u5230\u7684\u6240\u6709\u53c2\u6570\uff0c\u8fdeToken\u4e00\u8d77\uff0c\u6309\u7167\u5b57\u6bcdassic\u7801 \u6b63\u5e8fk=v&k=v&k=v&\u65b9\u5f0f\u6392\u5e8f\u62fc\u63a5\u6700\u540e\u65e0\u7b26\u53f7\u62fc\u63a5token, sha256\u52a0\u5bc6,\u5f97\u5230sign,\u7f51\u5740\u7c7b\u578b\u7684\u53c2\u6570\u503c\u4e0d\u8981urlencode\u3002"}],u=function(){var e=s();return c(p.a,{fontSize:"0.75rem"},c(p.a,null,c(p.a,{color:"#263be0"},"#\u67e5\u8be2\u63a5\u53e3"),c(p.a,{mt:1,mb:1}," ",c(i.a,null)," "),c(p.a,{fontSize:"0.875rem",fontWeight:"500",mb:.5},"\u67e5\u8be2\u63a5\u53e3URL\uff1a"),c(p.a,{className:e.code},"http://api.677gm.com/pay/quireorder")),c(p.a,{mb:.5},c(p.a,{mt:2},"\u8bf7\u6c42\u53c2\u6570\uff1a"),c(p.a,{mt:1,mb:1}," ",c(i.a,null)," "),c(p.a,{display:"flex",fontWeight:"500"},c(p.a,{width:"50px"},"#"),c(p.a,{width:"50px"},"\u53c2\u6570\u540d"),c(p.a,{width:"100px"},"\u542b\u4e49"),c(p.a,{width:"100px"},"\u7c7b\u578b"),c(p.a,{width:"300px"},"\u8bf4\u660e")),c(p.a,{mt:1,mb:2}," ",c(i.a,null)," "),l.map((function(e,r){return c(p.a,{key:r,mt:2,mb:2},c(p.a,{display:"flex"},c(p.a,{width:"50px"},e.id),c(p.a,{width:"50px"},e.name),c(p.a,{width:"100px"},e.des),c(p.a,{width:"100px"},e.type),c(p.a,{width:"300px"},e.help)),c(p.a,{mt:1,mb:2}," ",c(i.a,null)," "))})),c(p.a,{fontWeight:"500"},"JSON\u8bf7\u6c42\u7684\u8fd4\u56de\u503c\uff1a"),c(p.a,{className:e.code},c(p.a,null,"{"),c(p.a,{ml:2},"//\u63d0\u793a\u7ed9\u7528\u6237\u7684\u6587\u5b57\u4fe1\u606f\uff0c\u4f1a\u6839\u636e\u4e0d\u540c\u573a\u666f\uff0c\u5c55\u793a\u4e0d\u540c\u5185\u5bb9"),c(p.a,{ml:2},'"msg":"\u9519\u8bef\u4fe1\u606f",'),c(p.a,{ml:2},'"code":,'),c(p.a,{ml:2},"//\u626b\u7801\u5730\u5740"),c(p.a,{ml:2},'"url":'),c(p.a,null,"}"))))},f=n.a.createElement;r.default=function(){return f(u,null)}}},[["Dg2g",0,1,2]]]);