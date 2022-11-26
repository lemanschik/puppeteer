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

const rollupConfig = { 
  output: { format: 'esm', dir: '.' },
  plugins: [{ buildStart() {
  const puppeteerBase = './node_modules/puppeteer-core/lib/esm/puppeteer/*.js';
  const puppeteerCore = ['revisions', 'common/Puppeteer', 'common/common', 'api/api', 'util/util'];
  const puppeteerNode = ['node/node', 'node/PuppeteerNode'];
  for (const importSpecifier of puppeteerCore) {
    this.emitFile({ type: "chunk", fileName: puppeteerBase.replace('*', importSpecifier) });
  }
  
  // TODO: Finish emit entrypoint.  
  this.emitFile({ type: 'chunk', fileName: 'puppeteer-core.js',
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
    
}}}};


