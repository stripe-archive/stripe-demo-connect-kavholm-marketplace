import { Options } from './index';
/**
 * Install the once-per-machine trusted root CA. We'll use this CA to sign
 * per-app certs.
 */
export default function installCertificateAuthority(options?: Options): Promise<void>;
export declare function withCertificateAuthorityCredentials(cb: ({caKeyPath, caCertPath}: {
    caKeyPath: string;
    caCertPath: string;
}) => Promise<void> | void): Promise<void>;
