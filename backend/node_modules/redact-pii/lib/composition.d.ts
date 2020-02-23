import { AsyncCustomRedactorConfig, CompositeRedactorOptions, SyncCustomRedactorConfig, ISyncRedactor } from './types';
export declare function composeChildRedactors<T extends AsyncCustomRedactorConfig>(opts?: CompositeRedactorOptions<T>): T extends SyncCustomRedactorConfig ? ISyncRedactor[] : import("./types").IRedactor[];
