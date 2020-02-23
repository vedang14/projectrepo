import { ISyncRedactor } from '../types';
export declare class SimpleRegexpRedactor implements ISyncRedactor {
    regexpMatcher: RegExp;
    replaceWith: string;
    constructor({ replaceWith, regexpPattern: regexpMatcher }: {
        replaceWith: string;
        regexpPattern: RegExp;
    });
    redact(textToRedact: string): string;
}
