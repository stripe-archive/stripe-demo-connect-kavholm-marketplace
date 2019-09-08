/// <reference types="node" />
import { ExecSyncOptions } from 'child_process';
export declare function openssl(cmd: string): Buffer;
export declare function run(cmd: string, options?: ExecSyncOptions): Buffer;
export declare function waitForUser(): Promise<{}>;
export declare function reportableError(message: string): Error;
export declare function mktmp(): string;
export declare function sudo(cmd: string): Promise<string | null>;
