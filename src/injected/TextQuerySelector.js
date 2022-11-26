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

import {
  createTextContent,
  isSuitableNodeForTextMatching,
} from './TextContent.js';

/**
 * Queries the given node for a node matching the given text selector.
 *
 * @internal
 */
export const textQuerySelector = (
  /** @type {Node} */ root,
  selector=''
) => {
  /** @type {Element | null} */
  let matchedNode = null;
  for (const node of root.childNodes) {
    if (matchedNode) { break; } 
    if (node instanceof Element && isSuitableNodeForTextMatching(node)) {
      if (node.shadowRoot) {
        matchedNode = /** @type {Element | null} */ (textQuerySelector(node.shadowRoot, selector));
      } else {
        matchedNode = /** @type {Element | null} */ (textQuerySelector(node, selector));
      }
    }
  }

  if (!matchedNode && root instanceof Element) {
    const textContent = createTextContent(root);
    if (textContent.full.includes(selector)) {
      matchedNode = root;
    }
  }
  
  return /** @type {Element | null} */ matchedNode;
};

/**
 * Queries the given node for all nodes matching the given text selector.
 *
 * @internal
 */
export const textQuerySelectorAll = (
  /** @type {Node} */ root,
  selector=''
)=> {
  /** @type {Element[]} */
  let results = [];
  for (const node of root.childNodes) {
    if (node instanceof Element) {
      /** @type {Element[]} */
      let matchedNodes;
      if (node.shadowRoot) {
        matchedNodes = textQuerySelectorAll(node.shadowRoot, selector);
      } else {
        matchedNodes = textQuerySelectorAll(node, selector);
      }
      results = results.concat(matchedNodes);
    }
  }
  if (results.length > 0) {
    return results;
  }

  if (root instanceof Element) {
    const textContent = createTextContent(root);
    if (textContent.full.includes(selector)) {
      return [root];
    }
  }
  return [];
};
