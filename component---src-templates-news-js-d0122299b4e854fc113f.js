(self.webpackChunkgatsby_boilerplate=self.webpackChunkgatsby_boilerplate||[]).push([[168],{7228:function(e){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n},e.exports.default=e.exports,e.exports.__esModule=!0},3646:function(e,t,r){var n=r(7228);e.exports=function(e){if(Array.isArray(e))return n(e)},e.exports.default=e.exports,e.exports.__esModule=!0},9100:function(e,t,r){var n=r(9489),l=r(7067);function a(t,r,o){return l()?(e.exports=a=Reflect.construct,e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=a=function(e,t,r){var l=[null];l.push.apply(l,t);var a=new(Function.bind.apply(e,l));return r&&n(a,r.prototype),a},e.exports.default=e.exports,e.exports.__esModule=!0),a.apply(null,arguments)}e.exports=a,e.exports.default=e.exports,e.exports.__esModule=!0},9713:function(e){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.default=e.exports,e.exports.__esModule=!0},7067:function(e){e.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}},e.exports.default=e.exports,e.exports.__esModule=!0},6860:function(e){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.default=e.exports,e.exports.__esModule=!0},8206:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},319:function(e,t,r){var n=r(3646),l=r(6860),a=r(379),o=r(8206);e.exports=function(e){return n(e)||l(e)||a(e)||o()},e.exports.default=e.exports,e.exports.__esModule=!0},379:function(e,t,r){var n=r(7228);e.exports=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}},e.exports.default=e.exports,e.exports.__esModule=!0},1274:function(e,t,r){var n=r(1048);e.exports={MDXRenderer:n}},1048:function(e,t,r){var n=r(9100),l=r(319),a=r(9713),o=r(7316),s=["scope","children"];function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var u=r(7294),p=r(4983).mdx,f=r(3191).useMDXScope;e.exports=function(e){var t=e.scope,r=e.children,a=o(e,s),c=f(t),m=u.useMemo((function(){if(!r)return null;var e=i({React:u,mdx:p},c),t=Object.keys(e),a=t.map((function(t){return e[t]}));return n(Function,["_fn"].concat(l(t),[""+r])).apply(void 0,[{}].concat(l(a)))}),[r,t]);return u.createElement(m,i({},a))}},1782:function(e,t,r){"use strict";r.d(t,{F:function(){return c}});var n=r(7294),l=r(5900),a=r.n(l),o=r(1767);function s(e){var t=e.dark;return n.createElement("svg",{className:"transform w-full lg:-translate-y-24 overflow-visible ",width:100,height:100,fill:"none",viewBox:"0 0 100 100"},n.createElement("circle",{cx:"25",cy:"200",r:"250",fill:t?"#31a354":"white",opacity:"0.1",className:"animate-ping-xxslow-finite"}),n.createElement("circle",{cx:"25",cy:"200",r:"200",fill:t?"#31a354":"white",opacity:"0.1",className:"animate-ping-xxslow-finite"}),n.createElement("circle",{cx:"25",cy:"200",r:"150",fill:t?"#31a354":"white",opacity:"0.1",className:"animate-ping-xxslow-finite"}))}function c(e){var t=e.title,r=e.className,l=e.children;return n.createElement("div",{className:a()("relative z-0 items-center text-gray-900 -mt-16 pt-16 lg:pt-32 bg-gradient-to-r from-gray-600 to-gray-800 overflow-hidden",r)},n.createElement(o.W2,{className:"justify-center py-8 lg:py-16"},n.createElement("div",{className:"text-xl lg:text-4xl tracking-wide text-uvm-sky-blue  font-light"},t),l),t?null:n.createElement(s,null))}},6118:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return x}});var n=r(7294),l=r(5900),a=r.n(l),o=r(5444),s=r(1767),c=r(4983),i=r(1274),u=r(3750),p=r(1782),f={Link:o.rU};function m(e){var t=e.header,r=e.title,l=e.slug,s=e.date,c=e.className;return n.createElement("div",{className:a()("pt-4 w-full",c)},n.createElement("div",{className:"text-gray-500 text-xs uppercase w-full"},t),n.createElement(o.rU,{to:l},n.createElement("div",{className:"flex items-center space-x-1 text-green-700 hover:text-green-900 text-sm"},n.createElement("span",{className:"inline-block truncate"},r),n.createElement("span",{className:"inline-block"},n.createElement(u.Rgz,null)))),s?n.createElement("p",{className:"text-sm text-gray-500"},s):null)}function x(e){var t=e.data.mdx,r=e.location,l=e.pageContext;return n.createElement(s.T3,{location:r,light:!0,title:t.frontmatter.title,description:t.excerpt},n.createElement(p.F,null),n.createElement(s.W2,{className:"mt-8 xl:mt-24 mb-8"},n.createElement("div",{className:"text-center pb-8"},n.createElement("p",{className:"text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4",style:{lineHeight:"1.3"}},t.frontmatter.title),n.createElement("p",{className:"text-base font-medium text-gray-500"},t.frontmatter.date)),n.createElement("hr",null)),n.createElement(s.W2,{className:"text-lg leading-relaxed mdx-content lg:mb-16"},n.createElement(s.D7,null,n.createElement(s.D7.Item,{size:"sm",className:"sticky top-0 divide-y w-full px-4 space-y-4 hidden lg:block"},l.previous?n.createElement(m,Object.assign({},l.previous.node.frontmatter,{slug:l.previous.node.fields.slug,header:"Previous"})):null,l.next?n.createElement(m,Object.assign({},l.next.node.frontmatter,{slug:l.next.node.fields.slug,header:"Next"})):null,n.createElement(m,{title:"Back to the news list",slug:"/news/"+l.page})),n.createElement(s.D7.Item,{size:"lg"},n.createElement("div",{className:"space-y-8"},n.createElement(c.MDXProvider,{components:f},n.createElement(i.MDXRenderer,{frontmatter:t.frontmatter},t.body)))),n.createElement(s.D7.Item,{size:"sm",className:"divide-y w-full space-y-4 block lg:hidden my-4"},l.previous?n.createElement(m,Object.assign({},l.previous.node.frontmatter,{slug:l.previous.node.fields.slug,header:"Previous"})):null,l.next?n.createElement(m,Object.assign({},l.next.node.frontmatter,{slug:l.next.node.fields.slug,header:"Next"})):null,n.createElement(m,{title:"Back to the news list",slug:"/news/"+l.page})))))}}}]);
//# sourceMappingURL=component---src-templates-news-js-d0122299b4e854fc113f.js.map