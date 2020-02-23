import { IAsyncRedactor } from '../types';
import DLP from '@google-cloud/dlp';
export declare const MAX_DLP_CONTENT_LENGTH = 524288;
export declare const defaultInfoTypes: {
    name: string;
}[];
/** @public */
export interface GoogleDLPRedactorOptions {
    /** options to pass down to the Google Cloud DLP client. Check https://cloud.google.com/nodejs/docs/reference/dlp/0.10.x/v2.DlpServiceClient for the available options */
    clientOptions?: any;
    /** object containing `inspectConfig` options that should override the default `inspectConfig` options.
     * For example, this can be used to set `customInfoTypes` or define a `ruleSet` to modify behavior of info types (e.g. exclude certain patterns).
     * Check https://cloud.google.com/nodejs/docs/reference/dlp/0.10.x/v2.DlpServiceClient#inspectContent for details. */
    inspectConfig?: any;
    /** Array of extra DLP info type names to also include in addition to the default set */
    includeInfoTypes?: string[];
    /** Array of DLP info type names from the default set that should be excluded */
    excludeInfoTypes?: string[];
    /** If auto batching when content length exceeds DLP's limit should be disabled */
    disableAutoBatchWhenContentSizeExceedsLimit?: boolean;
    /** Maximum content size for when auto batching is turned on. */
    maxContentSizeForBatch?: number;
}
/** @public */
export declare class GoogleDLPRedactor implements IAsyncRedactor {
    private opts;
    dlpClient: typeof DLP.DlpServiceClient;
    constructor(opts?: GoogleDLPRedactorOptions);
    redactAsync(textToRedact: string): Promise<string>;
    doRedactAsync(textToRedact: string): Promise<string>;
}
