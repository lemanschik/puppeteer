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

import dts from 'rollup-plugin-dts';
import resolve from 'rollup-plugin-node-resolve';
import { readDir } from 'node:fs/promises';

// Algin Node ESM with Browser ESM
import * as url from 'node:url';
const importMetaUrl = import.meta.url;
const __filename = url.fileURLToPath(importMetaUrl);
const __dirname = url.fileURLToPath(new URL('.', importMetaUrl));

const rollupConfig = [{ 
  input: [""],
  output: { format: 'esm', dir: '.' },
  plugins: [{ async buildStart() {
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
    const puppeteerNode = ['node/node', 'node/PuppeteerNode'];
    
    for (const importSpecifier of puppeteerCore) {
      this.emitFile({ type: "chunk", fileName: puppeteerResolve.replace('*', importSpecifier) });
    }
    
  // TODO: Finish emit entrypoint.  
  this.emitFile({ type: 'chunk', name: 'puppeteer-esm',
    content: `export * from 'puppeteer-core/lib/esm/puppeteer/common/common.js';
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
export * from 'puppeteer-core/lib/esm/puppeteer/common/QueryHandler.js';` });
    
}}}}];

export default rollupConfig;
