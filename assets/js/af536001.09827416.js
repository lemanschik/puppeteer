"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[52564],{3905:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>d});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var o=n.createContext({}),u=function(e){var t=n.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):p(p({},t),e)),a},s=function(e){var t=u(e.components);return n.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),m=u(a),d=r,g=m["".concat(o,".").concat(d)]||m[d]||c[d]||l;return a?n.createElement(g,p(p({ref:t},s),{},{components:a})):n.createElement(g,p({ref:t},s))}));function d(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,p=new Array(l);p[0]=m;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i.mdxType="string"==typeof e?e:r,p[1]=i;for(var u=2;u<l;u++)p[u]=a[u];return n.createElement.apply(null,p)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},89767:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>m,frontMatter:()=>p,metadata:()=>o,toc:()=>s});a(67294);var n=a(3905);function r(){return r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},r.apply(this,arguments)}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}const p={sidebar_label:"Page.evaluate"},i="Page.evaluate() method",o={unversionedId:"api/puppeteer.page.evaluate",id:"version-19.8.3/api/puppeteer.page.evaluate",title:"Page.evaluate() method",description:"Evaluates a function in the page's context and returns the result.",source:"@site/versioned_docs/version-19.8.3/api/puppeteer.page.evaluate.md",sourceDirName:"api",slug:"/api/puppeteer.page.evaluate",permalink:"/api/puppeteer.page.evaluate",draft:!1,tags:[],version:"19.8.3",frontMatter:{sidebar_label:"Page.evaluate"},sidebar:"api",previous:{title:"Page.emulateVisionDeficiency",permalink:"/api/puppeteer.page.emulatevisiondeficiency"},next:{title:"Page.evaluateHandle",permalink:"/api/puppeteer.page.evaluatehandle"}},u={},s=[{value:"Signature:",id:"signature",level:4},{value:"Parameters",id:"parameters",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2},{value:"Example 3",id:"example-3",level:2}],c={toc:s};function m(e){var{components:t}=e,a=l(e,["components"]);return(0,n.kt)("wrapper",r({},c,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",r({},{id:"pageevaluate-method"}),"Page.evaluate() method"),(0,n.kt)("p",null,"Evaluates a function in the page's context and returns the result."),(0,n.kt)("p",null,"If the function passed to ",(0,n.kt)("inlineCode",{parentName:"p"},"page.evaluateHandle")," returns a Promise, the function will wait for the promise to resolve and return its value."),(0,n.kt)("h4",r({},{id:"signature"}),"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",r({parentName:"pre"},{className:"language-typescript"}),"class Page {\n  evaluate<\n    Params extends unknown[],\n    Func extends EvaluateFunc<Params> = EvaluateFunc<Params>\n  >(\n    pageFunction: Func | string,\n    ...args: Params\n  ): Promise<Awaited<ReturnType<Func>>>;\n}\n")),(0,n.kt)("h2",r({},{id:"parameters"}),"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",r({parentName:"tr"},{align:null}),"Parameter"),(0,n.kt)("th",r({parentName:"tr"},{align:null}),"Type"),(0,n.kt)("th",r({parentName:"tr"},{align:null}),"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",r({parentName:"tr"},{align:null}),"pageFunction"),(0,n.kt)("td",r({parentName:"tr"},{align:null}),"Func ","|"," string"),(0,n.kt)("td",r({parentName:"tr"},{align:null}),"a function that is run within the page")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",r({parentName:"tr"},{align:null}),"args"),(0,n.kt)("td",r({parentName:"tr"},{align:null}),"Params"),(0,n.kt)("td",r({parentName:"tr"},{align:null}),"arguments to be passed to the pageFunction")))),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Returns:")),(0,n.kt)("p",null,"Promise","<","Awaited","<","ReturnType","<","Func",">",">",">"),(0,n.kt)("p",null,"the return value of ",(0,n.kt)("inlineCode",{parentName:"p"},"pageFunction"),"."),(0,n.kt)("h2",r({},{id:"example-1"}),"Example 1"),(0,n.kt)("pre",null,(0,n.kt)("code",r({parentName:"pre"},{className:"language-ts"}),'const result = await frame.evaluate(() => {\n  return Promise.resolve(8 * 7);\n});\nconsole.log(result); // prints "56"\n')),(0,n.kt)("p",null,"You can pass a string instead of a function (although functions are recommended as they are easier to debug and use with TypeScript):"),(0,n.kt)("h2",r({},{id:"example-2"}),"Example 2"),(0,n.kt)("pre",null,(0,n.kt)("code",r({parentName:"pre"},{className:"language-ts"}),"const aHandle = await page.evaluate('1 + 2');\n")),(0,n.kt)("p",null,"To get the best TypeScript experience, you should pass in as the generic the type of ",(0,n.kt)("inlineCode",{parentName:"p"},"pageFunction"),":"),(0,n.kt)("pre",null,(0,n.kt)("code",r({parentName:"pre"},{className:"language-ts"}),"const aHandle = await page.evaluate(() => 2);\n")),(0,n.kt)("h2",r({},{id:"example-3"}),"Example 3"),(0,n.kt)("p",null,(0,n.kt)("a",r({parentName:"p"},{href:"/api/puppeteer.elementhandle"}),"ElementHandle")," instances (including ",(0,n.kt)("a",r({parentName:"p"},{href:"/api/puppeteer.jshandle"}),"JSHandle"),"s) can be passed as arguments to the ",(0,n.kt)("inlineCode",{parentName:"p"},"pageFunction"),":"),(0,n.kt)("pre",null,(0,n.kt)("code",r({parentName:"pre"},{className:"language-ts"}),"const bodyHandle = await page.$('body');\nconst html = await page.evaluate(body => body.innerHTML, bodyHandle);\nawait bodyHandle.dispose();\n")))}m.isMDXComponent=!0}}]);