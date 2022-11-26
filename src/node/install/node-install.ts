/**
 * Copyright 2020 Google Inc. All rights reserved.
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

import { get as httpsGet, RequestOptions} from 'node:https';
import createHttpsProxyAgent, {HttpsProxyAgentOptions} from 'https-proxy-agent';
import {join} from 'node:path';
import { default as ProgressBar } from 'progress';
import {getProxyForUrl} from 'proxy-from-env';
import {BrowserFetcher, Configuration, Product } from '../../puppeteer-core.js';
import {PUPPETEER_REVISIONS} from '../..//revisions.js';
//import URL from 'node:url';
import {cosmiconfigSync} from 'cosmiconfig';
import {homedir} from 'node:os';


/**
 * @internal
 */
function isSupportedProduct(product: unknown): product is Product {
  switch (product) {
    case 'chrome':
    case 'firefox':
      return true;
    default:
      return false;
  }
}

/**
 * @internal
 */
export const getConfiguration = (): Configuration => {
  const result = cosmiconfigSync('puppeteer').search();
  const configuration: Configuration = result ? result.config : {};

  // Merging environment variables.
  configuration.browserRevision =
    process.env['PUPPETEER_CHROMIUM_REVISION'] ??
    process.env['PUPPETEER_BROWSER_REVISION'] ??
    process.env['npm_config_puppeteer_browser_revision'] ??
    process.env['npm_package_config_puppeteer_browser_revision'] ??
    configuration.browserRevision;
  configuration.cacheDirectory =
    process.env['PUPPETEER_CACHE_DIR'] ??
    process.env['npm_config_puppeteer_cache_dir'] ??
    process.env['npm_package_config_puppeteer_cache_dir'] ??
    configuration.cacheDirectory ??
    join(homedir(), '.cache', 'puppeteer');
  configuration.downloadHost =
    process.env['PUPPETEER_DOWNLOAD_HOST'] ??
    process.env['npm_config_puppeteer_download_host'] ??
    process.env['npm_package_config_puppeteer_download_host'] ??
    configuration.downloadHost;
  configuration.downloadPath =
    process.env['PUPPETEER_DOWNLOAD_PATH'] ??
    process.env['npm_config_puppeteer_download_path'] ??
    process.env['npm_package_config_puppeteer_download_path'] ??
    configuration.downloadPath;
  configuration.executablePath =
    process.env['PUPPETEER_EXECUTABLE_PATH'] ??
    process.env['npm_config_puppeteer_executable_path'] ??
    process.env['npm_package_config_puppeteer_executable_path'] ??
    configuration.executablePath;
  configuration.defaultProduct = (process.env['PUPPETEER_PRODUCT'] ??
    process.env['npm_config_puppeteer_product'] ??
    process.env['npm_package_config_puppeteer_product'] ??
    configuration.defaultProduct ??
    'chrome') as Product;
  configuration.temporaryDirectory =
    process.env['PUPPETEER_TMP_DIR'] ??
    process.env['npm_config_puppeteer_tmp_dir'] ??
    process.env['npm_package_config_puppeteer_tmp_dir'] ??
    configuration.temporaryDirectory;

  configuration.experiments ??= {};
  configuration.experiments.macArmChromiumEnabled = Boolean(
    process.env['PUPPETEER_EXPERIMENTAL_CHROMIUM_MAC_ARM'] ??
      process.env['npm_config_puppeteer_experimental_chromium_mac_arm'] ??
      process.env[
        'npm_package_config_puppeteer_experimental_chromium_mac_arm'
      ] ??
      configuration.experiments.macArmChromiumEnabled
  );

  configuration.skipDownload = Boolean(
    process.env['PUPPETEER_SKIP_DOWNLOAD'] ??
      process.env['npm_config_puppeteer_skip_download'] ??
      process.env['npm_package_config_puppeteer_skip_download'] ??
      process.env['PUPPETEER_SKIP_CHROMIUM_DOWNLOAD'] ??
      process.env['npm_config_puppeteer_skip_chromium_download'] ??
      process.env['npm_package_config_puppeteer_skip_chromium_download'] ??
      configuration.skipDownload
  );
  configuration.logLevel = (process.env['PUPPETEER_LOGLEVEL'] ??
    process.env['npm_config_LOGLEVEL'] ??
    process.env['npm_package_config_LOGLEVEL'] ??
    configuration.logLevel) as 'silent' | 'error' | 'warn';

  // Validate configuration.
  if (!isSupportedProduct(configuration.defaultProduct)) {
    throw new Error(`Unsupported product ${configuration.defaultProduct}`);
  }

  return configuration;
};


/**
 * @internal
 */
const supportedProducts = {
  chrome: 'Chromium',
  firefox: 'Firefox Nightly',
} as const;

/**
 * @internal
 */
export async function downloadBrowser(): Promise<void> {
  const configuration = getConfiguration();
  if (configuration.skipDownload) {
    logPolitely('**INFO** Skipping browser download as instructed.');
    return;
  }

  const product = configuration.defaultProduct!;
  const browserFetcher = new BrowserFetcher({
    product,
    host: configuration.downloadHost,
    path:
      configuration.downloadPath ??
      join(configuration.cacheDirectory!, product),
  });
  
  const revision = configuration.browserRevision || product === "chrome" 
    ? await import('../../revisions.js').then(({ chromium }) => chromium)
    : await getFirefoxNightlyVersion()
  
  await fetchBinary(revision);

  function fetchBinary(revision: string) {
    const revisionInfo = browserFetcher.revisionInfo(revision);

    // Do nothing if the revision is already downloaded.
    if (revisionInfo.local) {
      logPolitely(
        `${supportedProducts[product]} is already in ${revisionInfo.folderPath}; skipping download.`
      );
      return;
    }

    // Override current environment proxy settings with npm configuration, if any.
    const NPM_HTTPS_PROXY =
      process.env['npm_config_https_proxy'] || process.env['npm_config_proxy'];
    const NPM_HTTP_PROXY =
      process.env['npm_config_http_proxy'] || process.env['npm_config_proxy'];
    const NPM_NO_PROXY = process.env['npm_config_no_proxy'];

    if (NPM_HTTPS_PROXY) {
      process.env['HTTPS_PROXY'] = NPM_HTTPS_PROXY;
    }
    if (NPM_HTTP_PROXY) {
      process.env['HTTP_PROXY'] = NPM_HTTP_PROXY;
    }
    if (NPM_NO_PROXY) {
      process.env['NO_PROXY'] = NPM_NO_PROXY;
    }

    function onSuccess(localRevisions: string[]): void {
      logPolitely(
        `${supportedProducts[product]} (${revisionInfo.revision}) downloaded to ${revisionInfo.folderPath}`
      );
      localRevisions = localRevisions.filter(revision => {
        return revision !== revisionInfo.revision;
      });
      const cleanupOldVersions = localRevisions.map(revision => {
        return browserFetcher.remove(revision);
      });
      Promise.all([...cleanupOldVersions]);
    }

    function onError(error: Error) {
      console.error(
        `ERROR: Failed to set up ${supportedProducts[product]} r${revision}! Set "PUPPETEER_SKIP_DOWNLOAD" env variable to skip download.`
      );
      console.error(error);
      process.exit(1);
    }

    let progressBar: ProgressBar | null = null;
    let lastDownloadedBytes = 0;
    function onProgress(downloadedBytes: number, totalBytes: number) {
      if (!progressBar) {
        progressBar = new ProgressBar(
          `Downloading ${
            supportedProducts[product]
          } r${revision} - ${toMegabytes(totalBytes)} [:bar] :percent :etas `,
          {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: totalBytes,
          }
        );
      }
      const delta = downloadedBytes - lastDownloadedBytes;
      lastDownloadedBytes = downloadedBytes;
      progressBar.tick(delta);
    }

    return browserFetcher
      .download(revisionInfo.revision, onProgress)
      .then(() => {
        return browserFetcher.localRevisions();
      })
      .then(onSuccess)
      .catch(onError);
  }

  function toMegabytes(bytes: number) {
    const mb = bytes / 1024 / 1024;
    return `${Math.round(mb * 10) / 10} Mb`;
  }

  async function getFirefoxNightlyVersion(): Promise<string> {
    const firefoxVersionsUrl =
      'https://product-details.mozilla.org/1.0/firefox_versions.json';

    const proxyURL = getProxyForUrl(firefoxVersionsUrl);

    const requestOptions: RequestOptions = {};

    if (proxyURL) {
      const parsedProxyURL = new URL(proxyURL);

      const proxyOptions = {
        ...parsedProxyURL,
        secureProxy: parsedProxyURL.protocol === 'https:',
      } as HttpsProxyAgentOptions;

      requestOptions.agent = createHttpsProxyAgent(proxyOptions);
      requestOptions.rejectUnauthorized = false;
    }

    const promise = new Promise<string>((resolve, reject) => {
      let data = '';
      logPolitely(
        `Requesting latest Firefox Nightly version from ${firefoxVersionsUrl}`
      );
      httpsGet(firefoxVersionsUrl, requestOptions, r => {
          if (r.statusCode && r.statusCode >= 400) {
            return reject(new Error(`Got status code ${r.statusCode}`));
          }
          r.on('data', chunk => {
            data += chunk;
          });
          r.on('end', () => {
            try {
              const versions = JSON.parse(data);
              return resolve(versions.FIREFOX_NIGHTLY);
            } catch {
              return reject(new Error('Firefox version not found'));
            }
          });
        })
        .on('error', reject);
    });
    return promise;
  }
}

/**
 * @internal
 */
function logPolitely(toBeLogged: unknown): void {
  const logLevel = process.env['npm_config_loglevel'] || '';
  const logLevelDisplay = ['silent', 'error', 'warn'].indexOf(logLevel) > -1;

  // eslint-disable-next-line no-console
  if (!logLevelDisplay) {
    console.log(toBeLogged);
  }
}
