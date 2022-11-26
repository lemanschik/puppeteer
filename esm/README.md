## Alert Warning do never run npm install with this package when you develop
Should you have done the big mistake and runned already any npm install scripts
from this repository i can not help you.

# Instructions
This is a hard ESM Fork of Puppeteer to abstract build and dev quircs of the core team and offer a stable build

it is more then importent that you do not run npm in this repositorys they are all over injected with scripts
to optain all needed dependencies and avoid script bombs use the rollup-plugin/dependencies-bundle.js

It will auto fetch and update everything if needed. All Browser installers are offered as indipendent modules
so you can explicittly call them imperativ if you need them simple via

```
node -e 'import('./install-chromium.js')';
```

i come to the conclusion that they try with injected to simply inject iife? lol
but at present it gets transpiled to bundled cjs exported as module.exports = wirredHack(code) also assigning to globals i am not sure where this is supposed to be loaded
but it can not be inside the frame i guess they take module.exports later some how again lol and take only the code to produce iife


jup turns out i am correct its about the Utils module thats the one they want for real

so we can really import('injected') inside the context and then get it as handle?
// or we at last clearn return plugin utils and everything bundled 

          `(() => {
              const module = {};
              ${injectedSource}
              return module.exports.default;
            })()`