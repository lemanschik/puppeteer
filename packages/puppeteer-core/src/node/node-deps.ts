import fs, {createReadStream, createWriteStream, accessSync, existsSync, readdirSync, promises as fsPromises } from 'node:fs';
const {chmod, mkdir, readdir, unlink, mkdtemp, copyFile, writeFile} = fsPromises;

import { default as rimraf } from 'rimraf';
export {rimraf}

import { default as extractZip } from 'extract-zip';
import { extract } from 'tar-fs';
import { default as bzip } from 'unbzip2-stream';

import { join, basename, resolve } from 'node:path';
export const pathModule = { join, basename, resolve };

export const fsModule = {
    createReadStream, createWriteStream, accessSync, existsSync, readdirSync,
    chmod, mkdir, readdir, unlink, mkdtemp, copyFile, writeFile, 
    fs, fsPromises, rimraf,
    tarExtract: extract, bzip, extractZip, pathModule
}

import http from 'node:http';
import https from 'node:https';
import createHttpsProxyAgent from 'https-proxy-agent';

import {getProxyForUrl} from 'proxy-from-env';


export const netModule = {
  /* * @type { HttpsProxyAgent & { import('https-proxy-agent').HttpsProxyAgentOptions, HttpsProxyAgent: HttpsProxyAgent}} */
  createHttpsProxyAgent,
  http, https, getProxyForUrl
}

import { release, tmpdir } from 'node:os';
export const tempDir = tmpdir();
export const unameR = release();

export { exec } from 'node:child_process';
export { format } from 'node:util';