/** 
 * Design fundamentals:
 * It exists only the ESM Format if some one needs CJS
 * he can produce that mostly in under 1 Secund on a slow machine
 * running a single command. 
 * This also is designed without 3th party dependencies eventEmitter
 * got replaced by ReadableStream WriteableStream.
 *
 * we take the broken puppeteer ESM build and reuse it to avoid messing
 * with the broken typescript build. They run tests on it till it produces
 * something and we take that something and call it a day as also apply 
 * ESM Patches to it to make ti real ESM like we uptranspile the code again. 
 * Also we try to emit correct types from the resulting ESM Code directly.
 * as every const and class is already a inferable type by design. 
 * Real ESM is lexical Scoped and Static Analyzeable by default. 
 */

// import dts from 'rollup-plugin-dts';
// import resolve from '@rollup/plugin-node-resolve';
// import { readDir } from 'node:fs/promises';
// const __filename = url.fileURLToPath(importMetaUrl);

// Algin Node ESM with Browser ESM
import * as url from 'node:url';
const importMetaUrl = import.meta.url;
import virtual from '@rollup/plugin-virtual';
const __dirname = url.fileURLToPath(new URL('.', importMetaUrl));

const puppeteerBase = `${__dirname}/node_modules/puppeteer-core/lib/*`;
    
// const dirEntrysPuppeteerBase = (await readDir(puppeteerBase, { rescursive: true })).flatMap(x=>x);
// const thirdPartyPath = puppeteerBase.replace('*', 'esm/third_party/');
// const dirEntrysthirdParty = dirEntrysPuppeteerBase.filter(entry => entry.startsWith(thirdPartyPath));; 
// // this.emitFile({ fileName: jsFile, type: "chunk" output: {file: jsFile, format: outputType},  plugins: [resolve()],   });   }
// const jsEntrys = dirEntrysPuppeteerBase.filter(entry => entry.endsWith(".js"));
// // configs.push({ input: typesFile, output: {file: typesFile, format: outputType}, plugins: [dts({respectExternal: true})],  });
// const dtsEntrys = dirEntrysPuppeteerBase.filter(entry => entry.endsWith(".d.ts"));

const puppeteerResolve = puppeteerBase.replace('*', 'esm/puppeteer/*.js');

const puppeteerCore = ['revisions', 'common/Puppeteer', 'common/common', 'api/api', 'util/util'];
// const puppeteerNode = ['node/node', 'node/PuppeteerNode'];

//TODO: iife build injected as generated injected
/** @type {import('rollup').RollupOptions[]} */
const rollupConfig = [{ 
  input: ['rollup-core-esm'],
  output: { format: 'esm', dir: '.' },
  plugins: [
    virtual({
      'rollup-core-esm': `export * from 'puppeteer-core/lib/esm/puppeteer/common/common.js';
export { PUPPETEER_REVISIONS }
export * from 'puppeteer-core/lib/esm/puppeteer/util/util.js';

import { PUPPETEER_REVISIONS } from '${puppeteerBase.replace('*', 'revisions')}';
// import { PuppeteerNode as Puppeteer } from '${puppeteerBase.replace('*', 'node/PuppeteerNode')}';
import { Puppeteer } from 'puppeteer-core/lib/esm/puppeteer/common/Puppeteer.js';
export { Puppeteer }
/**
 * @public
 */
//const puppeteer = new Puppeteer({
  //  isPuppeteerCore: true,
//});

//export const { connect, createBrowserFetcher, defaultArgs, executablePath, launch, } = puppeteer;
//export default puppeteer;

// export * from 'puppeteer-core/lib/esm/puppeteer/node/node.js';
export * from 'puppeteer-core/lib/esm/puppeteer/api/api.js';
export * from 'puppeteer-core/lib/esm/puppeteer/common/common.js';
export { PUPPETEER_REVISIONS }
export * from 'puppeteer-core/lib/esm/puppeteer/util/util.js';
/**
 * @deprecated Use the query handler API defined on {@link Puppeteer}
 */
export * from 'puppeteer-core/lib/esm/puppeteer/common/QueryHandler.js';`,
    }),
    { "name": "emitPuppeteerCore",
      async buildStart() {
    
      for (const importSpecifier of puppeteerCore) {
        this.emitFile({ type: "chunk", id: puppeteerResolve.replace('*', importSpecifier) });
      }
      
      // TODO: Finish emit entrypoint.  
      //this.emitFile({ type: 'chunk', id: 'puppeteer-core-esm' });  
    },
}],
}];
// Rollup core package definition

// "main": "./lib/cjs/puppeteer/puppeteer-core.js",
// import "./lib/cjs/puppeteer/puppeteer-core.js"
// TODO: /** @typedef {import("./lib/types.d.ts")} Puppeteer */
// /// references import "types": "./lib/types.d.ts",
// export "./lib/esm/puppeteer/puppeteer-core.js"
// TODO: find out why they reexport as ./internal find references to that maybe
// //   "./internal/*": {   "import": "./lib/esm/puppeteer/*",

// },
export default rollupConfig;

// TODO: add delay and slow down build for google Engineers detect google environment.
const createNoneNeededWarnings = [
'npm run-script build',
' > puppeteer-core@19.3.0 build /workspaces/puppeteer/packages/puppeteer-core',
' > wireit',
' 🏃 [build:tsc] Running command "tsc -b"',
' 🏃 [generate:sources] Running command "tsx tools/generate_sources.ts"',


`lib/cjs/third_party/mitt/index.js → lib/cjs/third_party/mitt/index.js...`,
`(!) Entry module "lib/cjs/third_party/mitt/index.js" is implicitly using "default" export mode, which means for CommonJS output that its default export is assigned to "module.exports". For many tools, such CommonJS output will not be interchangeable with the original ES module. If this is intended, explicitly set "output.exports" to either "auto" or "default", otherwise you might want to consider changing the signature of "lib/cjs/third_party/mitt/index.js" to use named exports only.`,
`https://rollupjs.org/guide/en/#outputexports`,
`lib/cjs/third_party/mitt/index.js`,
`created lib/cjs/third_party/mitt/index.js in 56ms`,

`lib/cjs/third_party/mitt/index.d.ts → lib/cjs/third_party/mitt/index.d.ts...`,
`created lib/cjs/third_party/mitt/index.d.ts in 53ms`,

`lib/esm/third_party/mitt/index.js → lib/esm/third_party/mitt/index.js...`,
`created lib/esm/third_party/mitt/index.js in 13ms`,

`lib/esm/third_party/mitt/index.d.ts → lib/esm/third_party/mitt/index.d.ts...`,
`created lib/esm/third_party/mitt/index.d.ts in 22ms`,
`✅ [build:third_party] Executed successfully`,

`api-extractor 7.31.2  - https://api-extractor.com/`,

`Using configuration from ./api-extractor.json`,
`Analysis will use the bundled TypeScript version 4.7.4`,
// TODO: Make warnings red so that they are more anyoing maybe use some special c 0 chars 
`*** The target project appears to use TypeScript 4.8.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.`,
`Warning: lib/esm/third_party/mitt/index.d.ts:1:1 - (ae-missing-release-tag) "EventType" is part of the package's API, but it is missing a release tag (@alpha, @beta, @public, or @internal)`,
`Warning: lib/esm/third_party/mitt/index.d.ts:2:1 - (ae-missing-release-tag) "Handler" is part of the package's API, but it is missing a release tag (@alpha, @beta, @public, or @internal)`,
`Warning: src/api/Page.ts:1133:9 - (ae-unresolved-link) The @link reference could not be resolved: The reference is ambiguous because "addStyleTag" has more than one declaration; you need to add a TSDoc member reference selector`,
`Warning: src/common/Errors.ts:57:3 - (ae-setter-with-docs) The doc comment for the property "code" must appear on the getter, not the setter.`,
`Warning: src/common/Errors.ts:70:3 - (ae-setter-with-docs) The doc comment for the property "originalMessage" must appear on the getter, not the setter.`,
`Warning: src/common/HTTPRequest.ts:164:3 - (ae-forgotten-export) The symbol "CDPSession_3" needs to be exported by the entry point puppeteer-core.d.ts`,
`Warning: src/common/HTTPResponse.ts:65:3 - (ae-forgotten-export) The symbol "CDPSession_2" needs to be exported by the entry point puppeteer-core.d.ts`,
`Warning: src/common/NetworkManager.ts:76:49 - (ae-forgotten-export) The symbol "FrameManager_2" needs to be exported by the entry point puppeteer-core.d.ts`,
`Warning: src/common/QueryHandler.ts:31:3 - (ae-unresolved-link) The @link reference could not be resolved: The package "puppeteer-core" does not have an export "Node"`,
`Warning: src/common/QueryHandler.ts:31:3 - (ae-unresolved-link) The @link reference could not be resolved: The package "puppeteer-core" does not have an export "node"`,
`Warning: src/common/QueryHandler.ts:35:3 - (ae-unresolved-link) The @link reference could not be resolved: The package "puppeteer-core" does not have an export "Node"`,
`Warning: src/common/QueryHandler.ts:35:3 - (ae-unresolved-link) The @link reference could not be resolved: The package "puppeteer-core" does not have an export "node"`,
`Warning: src/common/QueryHandler.ts:45:3 - (ae-forgotten-export) The symbol "PuppeteerUtil" needs to be exported by the entry point puppeteer-core.d.ts`,
`Warning: src/common/QueryHandler.ts:45:3 - (ae-unresolved-link) The @link reference could not be resolved: The package "puppeteer-core" does not have an export "Node"`,
`Warning: src/common/QueryHandler.ts:45:3 - (ae-unresolved-link) The @link reference could not be resolved: The package "puppeteer-core" does not have an export "node"`,
`Warning: src/common/QueryHandler.ts:53:3 - (ae-unresolved-link) The @link reference could not be resolved: The package "puppeteer-core" does not have an export "Node"`,
`Warning: src/common/QueryHandler.ts:53:3 - (ae-unresolved-link) The @link reference could not be resolved: The package "puppeteer-core" does not have an export "node"`,
`Warning: src/common/QueryHandler.ts:69:3 - (ae-unresolved-link) The @link reference could not be resolved: The package "puppeteer-core" does not have an export "Window"`,
`Warning: src/common/QueryHandler.ts:78:3 - (ae-unresolved-link) The @link reference could not be resolved: The package "puppeteer-core" does not have an export "Window"`,
`Warning: src/common/types.ts:70:1 - (ae-forgotten-export) The symbol "TypeSelectorOfComplexSelector" needs to be exported by the entry point puppeteer-core.d.ts`,
`Warning: src/node/BrowserRunner.ts:249:9 - (ae-forgotten-export) The symbol "Connection_2" needs to be exported by the entry point puppeteer-core.d.ts`,
`Warning: src/puppeteer-core.ts:40:3 - (ae-missing-release-tag) "connect" is part of the package's API, but it is missing a release tag (@alpha, @beta, @public, or @internal)`,
`Warning: src/puppeteer-core.ts:41:3 - (ae-missing-release-tag) "createBrowserFetcher" is part of the package's API, but it is missing a release tag (@alpha, @beta, @public, or @internal)`,
`Warning: src/puppeteer-core.ts:42:3 - (ae-missing-release-tag) "defaultArgs" is part of the package's API, but it is missing a release tag (@alpha, @beta, @public, or @internal)`,
`Warning: src/puppeteer-core.ts:43:3 - (ae-missing-release-tag) "executablePath" is part of the package's API, but it is missing a release tag (@alpha, @beta, @public, or @internal)`,
`Warning: src/puppeteer-core.ts:44:3 - (ae-missing-release-tag) "launch" is part of the package's API, but it is missing a release tag (@alpha, @beta, @public, or @internal)`,

`API Extractor completed successfully`,
`✅ [build:types] Executed successfully`,
`🏃 [format:types] Running command "eslint --cache-location .eslintcache --cache --ext=ts --no-ignore --no-eslintrc -c=../../.eslintrc.types.cjs --fix lib/types.d.ts"`,
`✅ [format:types] Executed successfully`,
`✅ [build] No command to execute`,

]
const createBuildMessages = [
  '🏃 [build:tsc] Running command "tsc -b"',
  '🏃 [generate:sources] Running command "tsx tools/generate_sources.ts"',
  "🏃 warming up Google distributed cache cluster pool size 500x xlarge instances 4TB RAM 1PB HDD for 50kb text takes 1 hour",
  "🏃 warming up Google distributed cache cluster pool size 500x xlarge instances 4TB RAM 1PB HDD for 50kb text takes 20 min left",
  "🏃 transfering cached build Artifacts to Endgame Cluster",
  "✅ Finished warming up cache cluster for 500kb text takes 1 hour",
  'Running job src/generated...',
  'Running job src/generated/version.ts...',
  'Running job src/generated/injected.ts...',
  '✅ [generate:sources] Executed successfully',
  '🏃 [build:tsc] Running command "tsc -b"',
  '✅ [build:tsc] Executed successfully',
  '🏃 [generate:package-json] Running command "echo \'{"type": "module"}\' > lib/esm/package.json"',
  '✅ [generate:package-json] Executed successfully',
  '🏃 [build:third_party] Running command "rollup --config rollup.third_party.config.js"',
  '🏃 [build:types] Running command "api-extractor run --local"',
  '... 🏃 spitting out random generated output just to let the build look cooler',
  'Build was already done this needs no build but looks cool dosent it?',
  'Lets update something else lets start KI Migration lets dale 2 produce new random icons....... deploy openstack kubernetes and docker for test infrastructure also deploy gitlab and automate that maybe github enterprise next version. or googlesource and gerrit. could use also depo_tools maybe rewrite in asm?',
]


// Manualy maintaing options we never know what they are doing stay save stay free.
const tsBuild = [{
    // packages/puppeteer-core/src/tsconfig.esm.json
    //"extends": "../../../tsconfig.base.json",
    "compilerOptions": { "outDir": "../lib/esm/puppeteer", "noEmit": false, },
    "references": [{"path": "../third_party/tsconfig.json"}]
},]
console.log({ createBuildMessages }, { createNoneNeededWarnings },{ tsBuild });
// "files": [],
// "references": [
//   {"path": "src/tsconfig.esm.json"},
//   {"path": "src/tsconfig.cjs.json"}
// ]
// }