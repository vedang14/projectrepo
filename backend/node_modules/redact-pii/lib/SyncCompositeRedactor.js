"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const composition_1 = require("./composition");
/** @public */
class SyncCompositeRedactor {
    constructor(opts) {
        this.childRedactors = [];
        this.redact = (textToRedact) => {
            for (const redactor of this.childRedactors) {
                textToRedact = redactor.redact(textToRedact);
            }
            return textToRedact;
        };
        this.childRedactors = composition_1.composeChildRedactors(opts);
    }
}
exports.SyncCompositeRedactor = SyncCompositeRedactor;
//# sourceMappingURL=SyncCompositeRedactor.js.map