"use strict";(self.webpackChunkgatsby_boilerplate=self.webpackChunkgatsby_boilerplate||[]).push([[26],{1782:function(e,t,a){a.d(t,{F:function(){return c}});var l=a(7294),r=a(5900),n=a.n(r),i=a(1767);function s(e){var t=e.dark;return l.createElement("svg",{className:"transform w-full lg:-translate-y-24 overflow-visible ",width:100,height:100,fill:"none",viewBox:"0 0 100 100"},l.createElement("circle",{cx:"25",cy:"200",r:"250",fill:t?"#31a354":"white",opacity:"0.1",className:"animate-ping-xxslow-finite"}),l.createElement("circle",{cx:"25",cy:"200",r:"200",fill:t?"#31a354":"white",opacity:"0.1",className:"animate-ping-xxslow-finite"}),l.createElement("circle",{cx:"25",cy:"200",r:"150",fill:t?"#31a354":"white",opacity:"0.1",className:"animate-ping-xxslow-finite"}))}function c(e){var t=e.title,a=e.className,r=e.children;return l.createElement("div",{className:n()("relative z-0 items-center text-gray-900 -mt-16 pt-16 lg:pt-32 bg-gradient-to-r from-gray-600 to-gray-800 overflow-hidden",a)},l.createElement(i.W2,{className:"justify-center py-8 lg:py-16"},l.createElement("div",{className:"text-xl lg:text-4xl tracking-wide text-uvm-sky-blue  font-light"},t),r),t?null:l.createElement(s,null))}},6887:function(e,t,a){a.r(t),a.d(t,{default:function(){return x}});var l=a(7294),r=a(1767),n=a(5900),i=a.n(n),s=a(5444),c=a(2359);function m(e){var t=e.lab,a={LSD:"text-uvm-deep-blue border-uvm-deep-blue font-medium",CDL:"text-uvm-bright-green border-uvm-bright-green font-medium"};return t?l.createElement("div",null,t.map((function(e){return l.createElement("div",{key:e,className:i()("border-b-2 inline-flex items-center mr-2.5 py-0.5 text-sm uppercase",a[e])},e)}))):null}function o(e){var t=e.firstName,a=e.lastName,r=e.role,n=e.imageURL,i=e.slug,o=(e.githubURL,e.personalURL,e.scholarURL,e.twitterURL,e.email,e.lab),u=n?(0,c.d)(n):null;return l.createElement("li",{className:"py-4 px-0 rounded-lg xl:px-3 xl:text-left space-y-4 justify-start justify-items-start group transition duration-150 hover:opacity-90"},l.createElement(s.rU,{to:i},u?l.createElement(c.G,{image:u,alt:t+" "+a,imgClassName:"rounded-lg "}):l.createElement("div",{className:"aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden"})),l.createElement("div",{className:""},l.createElement(s.rU,{to:i},l.createElement("div",{className:"text-lg leading-6 font-medium space-y-1"},l.createElement("h3",{className:"group-hover:underline"},t," ",a),l.createElement("p",{className:"text-gray-600 text-sm"},r))),l.createElement(m,{lab:o})))}function u(e){var t=e.firstName,a=e.lastName,r=e.role,n=e.nextRole,i=(e.imageURL,e.slug);e.githubURL,e.personalURL,e.scholarURL,e.twitterURL,e.email,e.lab;return l.createElement("li",{className:"px-2 py-2 rounded xl:text-left space-y-4 justify-start justify-items-start group"},l.createElement(s.rU,{to:i},l.createElement("div",{className:"text-lg leading-6 font-medium space-y-1"},l.createElement("h3",{className:"group-hover:underline"},t," ",a),l.createElement("p",{className:"text-gray-600"},"First moved to: ",n),l.createElement("p",{className:"text-green-600"},"Graduated as: ",r))))}var g="mt-16 border-b-2 border-gray-800 py-1 mb-4 lg:py-4 text-3xl font-bold tracking-tight sm:text-4xl bg-white z-10";function d(e){var t=e.title,a=e.people,n=e.className;return l.createElement("div",{className:n},l.createElement(r.W2,null,l.createElement("h1",{className:g},t),l.createElement("ul",{className:"xs:grid grid grid-cols-2 sm:grid-cols-4 sm:space-y-0 lg:grid-cols-5 xl:grid-cols-6 gap-x-4"},a.map((function(e,t){var a=e.node;return l.createElement(o,Object.assign({key:t},a.frontmatter,a.fields))})))))}function p(e){var t=e.title,a=e.people,n=e.className;return l.createElement("div",{className:n},l.createElement(r.W2,null,l.createElement("h1",{className:g},t),l.createElement("ul",{className:"xs:grid grid sm:grid-cols-2 gap-x-4"},a.map((function(e,t){var a=e.node;return l.createElement(u,Object.assign({key:t},a.frontmatter,a.fields))})))))}var f=a(1782);function x(e){var t=e.data,a=e.location;return l.createElement(r.T3,{location:a,light:!0},l.createElement(f.F,{title:"Lab members"}),l.createElement(d,{people:t.allCurrentMembers.edges,title:"Active members"}),l.createElement(p,{people:t.alumni.edges,title:"Alumni",className:"mb-6"}))}}}]);
//# sourceMappingURL=component---src-pages-people-js-c91dfdabe86940337d61.js.map