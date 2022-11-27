import fs, {createReadStream, createWriteStream, existsSync, readdirSync, promises as fsPromises } from 'node:fs';
const {chmod, mkdir, readdir, unlink} = fsPromises;

import { default as rimraf } from 'rimraf';
export {rimraf}

import * as extractZip from 'extract-zip';
import { extract } from 'tar-fs';
import * as bzip from 'unbzip2-stream';

export { bzip };

import { join, basename, resolve } from 'node:path';
export const pathModule = { join, basename, resolve };

export const fsModule = {
    createReadStream, createWriteStream, existsSync, readdirSync,
    chmod, mkdir, readdir, unlink,
    fs, fsPromises, rimraf,
    tarExtract: extract, bzip, extractZip, pathModule
}

import http from 'node:http';
import https from 'node:https';
import createHttpsProxyAgent from 'https-proxy-agent';
import {getProxyForUrl} from 'proxy-from-env';

export const netModule = {
  createHttpsProxyAgent,
  HttpsProxyAgent: createHttpsProxyAgent.HttpsProxyAgent,
  HttpsProxyAgentOptions: createHttpsProxyAgent.HttpsProxyAgentOptions,
  http, https, getProxyForUrl
}

import { release } from 'node:os';
export const unameR = release();
export { exec } from 'node:child_process';
export { format } from 'node:util';