import * as simpleRegexpBuiltIns from './built-ins/simple-regexp-patterns';
export interface ISyncRedactor {
    redact(textToRedact: string): string;
}
export interface IAsyncRedactor {
    redactAsync(textToRedact: string): Promise<string>;
}
export declare type IRedactor = ISyncRedactor | IAsyncRedactor;
export interface SimpleRegexpCustomRedactorConfig {
    regexpPattern: RegExp;
    replaceWith: string;
}
export declare type SyncCustomRedactorConfig = SimpleRegexpCustomRedactorConfig | ISyncRedactor;
export declare type AsyncCustomRedactorConfig = SyncCustomRedactorConfig | IAsyncRedactor;
export interface CompositeRedactorOptions<T extends AsyncCustomRedactorConfig> {
    globalReplaceWith?: string;
    builtInRedactors?: {
        [RedactorName in keyof typeof simpleRegexpBuiltIns | 'names']?: {
            enabled?: boolean;
            replaceWith?: string;
        };
    };
    customRedactors?: {
        before?: Array<T>;
        after?: Array<T>;
    };
}
