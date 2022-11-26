
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