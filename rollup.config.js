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

export * from 'esm/rollup.config.js';
