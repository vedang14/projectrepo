import { AsyncCustomRedactorConfig, CompositeRedactorOptions, IAsyncRedactor } from './types';
/** @public */
export interface AsyncCompositeRedactorOptions extends CompositeRedactorOptions<AsyncCustomRedactorConfig> {
}
/** @public */
export declare class AsyncCompositeRedactor implements IAsyncRedactor {
    private childRedactors;
    constructor(opts?: AsyncCompositeRedactorOptions);
    redactAsync: (textToRedact: string) => Promise<string>;
}
