"use strict";(self.webpackChunkgatsby_boilerplate=self.webpackChunkgatsby_boilerplate||[]).push([[508],{6038:function(e,t,r){r.r(t),r.d(t,{default:function(){return C}});var n=r(4942),a=r(7294),l=r(1767),c=r(2443),s=r(391),i=r(5900),u=r.n(i),o=r(333),m=r(7222),p=r(1914),d=r(5444),f=r(2359),y=r(6994);function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var g=(0,a.createContext)({}),E=function(e){var t=e.children,r=e.people,n=e.media,l=(0,a.useMemo)((function(){return function(e){return e.map((function(e){return e.type})).filter((function(e,t,r){return r.indexOf(e)===t}))}(n)}),[n]),c=(0,a.useMemo)((function(){return(0,y.LF)(n,r)}),[n,r]),i=(0,a.useState)({authors:[],query:"",date:[0,9999],types:[]}),u=i[0],o=i[1],m=(0,a.useCallback)((function(e){var t=u.types.filter((function(t){return t!==e}));t.length===u.types.length?o(h(h({},u),{},{types:[].concat((0,s.Z)(u.types),[e])})):o(h(h({},u),{},{types:t}))}),[u]),p=(0,a.useCallback)((function(e){var t=u.authors.filter((function(t){return t!==e}));t.length===u.authors.length?o(h(h({},u),{},{authors:[].concat((0,s.Z)(u.authors),[e])})):o(h(h({},u),{},{authors:t}))}),[u]),d=(0,a.useCallback)((function(e){o(h(h({},u),{},{date:e}))}),[u]),f=(0,a.useMemo)((function(){return r}),[r]),b=(0,a.useMemo)((function(){return c?c.filter((function(e){var t=!0;u.types&&u.types.length>0&&(t*=u.types.includes(e.type));var r=e.authors.map((function(e){return e.alias}));return u.authors&&u.authors.length>0&&(t*=u.authors.filter((function(e){return r.includes(e)})).length===u.authors.length),u.date&&(t=t*(parseInt(e.year)>=u.date[0])*(parseInt(e.year)<=u.date[1])),t})).sort((function(e,t){return t.year-e.year})):[]}),[c,u]);return a.createElement(g.Provider,{value:{media:b,unfilteredMedia:n,labMembers:f,types:l,updateType:m,updateAuthors:p,updateYear:d,filters:u}},t)},v=r(1416);function O(e){var t=e.title,r=e.description,n=e.year,l=e.authors,c=e.type,s=e.imageURL,i=e.youtubeID,o=e.url,p=(0,a.useContext)(g),y=p.updateAuthors,b=p.filters,h=(0,a.useMemo)((function(){return s?(0,f.d)(s):null}),[s]);return a.createElement("div",{className:"py-12"},a.createElement("div",{className:"flex"},a.createElement("div",{className:u()("text-xs uppercase text-green-600")},n," |"),a.createElement("div",{className:u()("ml-1 text-xs uppercase text-gray-600")},c)),a.createElement(d.rU,{to:o},a.createElement("h3",{className:"font-medium sm:text-2xl mt-2 hover:underline"},t)),r?a.createElement("p",{className:"text-gray-600"},r):null,a.createElement("div",{className:"text-gray-600 mb-3"},l.map((function(e,t){return a.createElement("span",{key:e.alias},e.isLabMember?a.createElement(m.Lt,{label:e.alias,vanilla:!0,className:b.authors.includes(e.alias)?"bg-green-50 text-uvm-green":"hover:bg-gray-100 text-green-600"},a.createElement(m.Lt.Item,{className:b.authors.includes(e.alias)?"text-red-600":"",name:b.authors.includes(e.alias)?"Remove filter":"All medias",onClick:function(){return y(e.alias)}}),a.createElement(m.Lt.Item,{name:"Profile",href:e.info.slug})):a.createElement("span",{className:""},e.alias),a.createElement("span",{className:"mr-1"},t===l.length-2?", and":t===l.length-1?"":","))}))),h?a.createElement(d.rU,{to:o},a.createElement(f.G,{image:h,alt:t,imgClassName:"rounded-lg mb-2"})):null,"simplecast"===c?a.createElement("iframe",{title:"simplecast",height:"200px",width:"100%",frameborder:"no",scrolling:"no",seamless:"",src:o}):null,i?a.createElement("div",{className:"aspect-w-16 aspect-h-9"},a.createElement("iframe",{className:"w-full ",src:"https://www.youtube.com/embed/"+i,title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:!0})):null)}function w(e){var t=e.emptyView,r=(e.hideMediaCount,(0,a.useContext)(g).media);return 0===r.length?t||a.createElement("div",{className:"border py-16 mb-8 "},a.createElement(p.H,{title:"No media with these filters",description:"Remove some filters to get back results"})):a.createElement("div",null,a.createElement("div",{className:"divide-y "},r.map((function(e){return a.createElement(O,Object.assign({key:e.id},e))}))))}function N(){var e=(0,a.useContext)(g),t=e.filters,r=e.updateType,n=e.updateYear,l=e.types,c=e.updateAuthors,i=e.labMembers,u=(0,d.K2)("1417413227").allMediaJson,m=(0,a.useMemo)((function(){return u?[{title:"Any time",onClick:function(e){return n([0,9999],e.currentTarget.checked)},checked:0===t.date[0],readOnly:!0}].concat((0,s.Z)(u.distinct.sort((function(e,t){return parseInt(t)-parseInt(e)})).map((function(e){return{title:e,onClick:function(t){return n([parseInt(e),parseInt(e)])},checked:parseInt(t.date[0])===parseInt(e)}})))):[]}),[u,n,t]);return a.createElement("div",{className:""},a.createElement("div",{className:"my-8 lg:my-0 lg:mb-8"},a.createElement("div",{className:"mb-8"},a.createElement(o.s,{title:"Types",values:l.map((function(e){return{name:e,readOnly:!0,checked:t.types.includes(e),title:(0,v.f)(e),onClick:function(t){return r(e)}}}))})),a.createElement("div",{className:""},a.createElement(o.r,{title:"Date",numValuesShown:3,values:m})),a.createElement("div",{className:"pt-8"},a.createElement(o.s,{title:"Active members",values:i.map((function(e){return{name:e.alias,readOnly:!0,checked:t.authors.includes(e.alias),title:e.alias,onClick:function(){return c(e.alias)}}}))}))))}var k=r(3750),j=r(1782);function x(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function P(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?x(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function C(e){var t=e.data,r=e.location,n=(0,a.useState)(!1),s=n[0],i=n[1],u=(0,a.useMemo)((function(){return t.media.edges.map((function(e){return e.node}))}),[t]),o=(0,a.useMemo)((function(){return t.people.edges.map((function(e){return P(P({},e.node.frontmatter),e.node.fields)}))}),[t]);return a.createElement(E,{media:u,people:o},a.createElement(l.T3,{location:r,light:!0},a.createElement(j.F,{title:"Media"}),a.createElement(l.uL,{className:"block lg:hidden border-t bg-gray-100"},a.createElement("div",{className:"flex w-full"},a.createElement("button",{onClick:function(){return i(!0)},className:"ml-auto rounded-md p-2 inline-flex items-center justify-center text-gray-800 hover:text-green-600 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white"},a.createElement("span",{className:"sr-only"},"Open main menu"),a.createElement(k.K9M,{className:"h-6 w-6","aria-hidden":"true"})))),a.createElement(l.W2,{className:"pt-8 lg:pt-16"},a.createElement(l.lK,null,a.createElement(l.lK.Secondary,{first:!0,className:"hidden lg:block w-full lg:w-72"},a.createElement(N,null)),a.createElement(l.lK.Main,{last:!0},a.createElement(w,null)))),a.createElement(c.h,{open:s,setOpen:i,size:"sm",title:"Filters"},a.createElement(l.W2,{className:"pb-4"},a.createElement(N,null)))))}}}]);
//# sourceMappingURL=component---src-pages-media-js-51416fdfd50e8d4897b2.js.map