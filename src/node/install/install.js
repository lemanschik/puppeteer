/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This file is part of public API.
 *
 * By default, the `puppeteer` package runs this script during the installation
 * process unless one of the env flags is provided.
 * `puppeteer-core` package doesn't include this step at all. However, it's
 * still possible to install a supported browser using this script when
 * necessary.
 */

// const path = await import('node:path');
// const fs = await import('node:fs');
// const {execSync} = await import('node:child_process');

// const url = await import('node:url');
// const importMetaUrl = import.meta.url;
// const __dirname = url.fileURLToPath(new URL('.', importMetaUrl));

// Need to ensure TS is compiled before loading the installer
// if (!fs.existsSync(path.join(__dirname, 'node-install.js'))) {
//   console.log('It seems we are installing from the git repo.');
//   console.log('Building install tools from scratch...');
//   execSync('npm run build --workspace puppeteer');
// }

const {downloadBrowser} = await import('./node-install.js');

downloadBrowser();
