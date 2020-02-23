import { CompositeRedactorOptions, ISyncRedactor, SyncCustomRedactorConfig } from './types';
/** @public */
export interface SyncCompositeRedactorOptions extends CompositeRedactorOptions<SyncCustomRedactorConfig> {
}
/** @public */
export declare class SyncCompositeRedactor implements ISyncRedactor {
    private childRedactors;
    constructor(opts?: SyncCompositeRedactorOptions);
    redact: (textToRedact: string) => string;
}
