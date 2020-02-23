import { SimpleRegexpCustomRedactorConfig, AsyncCustomRedactorConfig, ISyncRedactor, IRedactor } from './types';
export declare function isSimpleRegexpCustomRedactorConfig(redactor: AsyncCustomRedactorConfig): redactor is SimpleRegexpCustomRedactorConfig;
export declare function isSyncRedactor(redactor: IRedactor): redactor is ISyncRedactor;
