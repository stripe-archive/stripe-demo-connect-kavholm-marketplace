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
import { Metadata, ServiceObject } from '@google-cloud/common';
import { Storage } from './storage';
export interface HmacKeyOptions {
    projectId?: string;
}
export interface HmacKeyMetadata {
    accessId: string;
    etag?: string;
    id?: string;
    projectId?: string;
    serviceAccountEmail?: string;
    state?: string;
    timeCreated?: string;
    updated?: string;
}
export interface SetHmacKeyMetadataOptions {
    /**
     * This parameter is currently ignored.
     */
    userProject?: string;
}
export interface SetHmacKeyMetadata {
    state?: 'ACTIVE' | 'INACTIVE';
    etag?: string;
}
export interface HmacKeyMetadataCallback {
    (err: Error | null, metadata?: HmacKeyMetadata, apiResponse?: Metadata): void;
}
export declare type HmacKeyMetadataResponse = [HmacKeyMetadata, Metadata];
/**
 * An HmacKey object contains metadata of an HMAC key created from a
 * service account through the {@link Storage} client using
 * {@link Storage#createHmacKey}.
 *
 * @see [HMAC keys documentation]{@link https://cloud.google.com/storage/docs/authentication/hmackeys}
 *
 * @class
 */
export declare class HmacKey extends ServiceObject<HmacKeyMetadata | undefined> {
    metadata: HmacKeyMetadata | undefined;
    /**
     * @typedef {object} HmacKeyOptions
     * @property {string} [projectId] The project ID of the project that owns
     *     the service account of the requested HMAC key. If not provided,
     *     the project ID used to instantiate the Storage client will be used.
     */
    /**
     * Constructs an HmacKey object.
     *
     * Note: this only create a local reference to an HMAC key, to create
     * an HMAC key, use {@link Storage#createHmacKey}.
     *
     * @param {Storage} storage The Storage instance this HMAC key is
     *     attached to.
     * @param {string} accessId The unique accessId for this HMAC key.
     * @param {HmacKeyOptions} options Constructor configurations.
     * @example
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const hmacKey = storage.hmacKey('access-id');
     */
    constructor(storage: Storage, accessId: string, options?: HmacKeyOptions);
}
