"use strict";
/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function normalize(optionsOrCallback, cb) {
    const options = (typeof optionsOrCallback === 'object'
        ? optionsOrCallback
        : {});
    const callback = (typeof optionsOrCallback === 'function'
        ? optionsOrCallback
        : cb);
    return { options, callback };
}
exports.normalize = normalize;
/**
 * Flatten an object into an Array of arrays, [[key, value], ..].
 * Implements Object.entries() for Node.js <8
 * @internal
 */
function objectEntries(obj) {
    return Object.keys(obj).map(key => [key, obj[key]]);
}
exports.objectEntries = objectEntries;
//# sourceMappingURL=util.js.map