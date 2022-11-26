/**
 * Copyright 2022 Google Inc. All rights reserved.
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

import {assert} from '../util/assert.js';
import {
  createDeferredPromise,
  DeferredPromise,
} from '../util/DeferredPromise.js';

/**
 * @internal
 */
export class MutationPoller {
  constructor(/** @type {() => Promise<T>}*/ fn, /** @type {Node} */ root) {
    /** @type {() => Promise<T>} */
    this._fn = fn;
    /** @type {Node} */
    this._root = root;
  }

  async start() {
    /** @type {DeferredPromise<T>} */
    const promise = (this._promise = createDeferredPromise());
    const result = await this._fn();
    if (result) {
      promise.resolve(result);
      return;
    }

    this._observer = new MutationObserver(async () => {
      const result = await this._fn();
      if (!result) {
        return;
      }
      promise.resolve(result);
      await this.stop();
    });
    this._observer.observe(this._root, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  }

  async stop() {
    assert(this._promise, 'Polling never started.');
    if (!this._promise.finished()) {
      this._promise.reject(new Error('Polling stopped'));
    }
    if (this._observer) {
      this._observer.disconnect();
      this._observer = undefined;
    }
  }

  async result() {
    assert(this._promise, 'Polling never started.');
    return this._promise;
  }
}

/**
 * @internal
 */
export class RAFPoller {
  constructor(/** @type {()=>Promise<T>} */ fn) {
    /** @type {()=>Promise<T>} */
    this._fn = fn;
  }

  async start() {   
    /** @type {DeferredPromise<T>} */
    const promise = (this._promise = createDeferredPromise());
    const result = await this._fn();
    if (result) {
      promise.resolve(result);
      return;
    }

    const poll = async () => {
      if (promise.finished()) {
        return;
      }
      const result = await this._fn();
      if (!result) {
        window.requestAnimationFrame(poll);
        return;
      }
      promise.resolve(result);
      await this.stop();
    };
    window.requestAnimationFrame(poll);
  }

  async stop() {
    assert(this._promise, 'Polling never started.');
    if (!this._promise.finished()) {
      this._promise.reject(new Error('Polling stopped'));
    }
  }

  async result() {
    assert(this._promise, 'Polling never started.');
    return this._promise;
  }
}

/**
 * @internal
 */
export class IntervalPoller {
  constructor(
    /** @type {()=>Promise<T>} */ fn, 
    /** @type {number} */ ms
  ) {
    /** @type {()=>Promise<T>} */
    this._fn = fn;
    /** @type {number} */
    this._ms = ms;
  }

  async start() {
    /** @type {DeferredPromise<T>} */
    const promise = (this._promise = createDeferredPromise());
    const result = await this._fn();
    if (result) {
      promise.resolve(result);
      return;
    }
    /** @type {NodeJS.Timer} */
    this._interval = setInterval(async () => {
      const result = await this._fn();
      if (!result) {
        return;
      }
      promise.resolve(result);
      await this.stop();
    }, this._ms);
  }

  async stop() {
    assert(this._promise, 'Polling never started.');
    if (!this._promise.finished()) {
      this._promise.reject(new Error('Polling stopped'));
    }
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = undefined;
    }
  }

  result() {
    assert(this._promise, 'Polling never started.');
    return this._promise;
  }
}
