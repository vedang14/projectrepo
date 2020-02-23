"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const composition_1 = require("./composition");
const utils_1 = require("./utils");
/** @public */
class AsyncCompositeRedactor {
    constructor(opts) {
        this.childRedactors = [];
        this.redactAsync = (textToRedact) => __awaiter(this, void 0, void 0, function* () {
            for (const redactor of this.childRedactors) {
                if (utils_1.isSyncRedactor(redactor)) {
                    textToRedact = redactor.redact(textToRedact);
                }
                else {
                    textToRedact = yield redactor.redactAsync(textToRedact);
                }
            }
            return textToRedact;
        });
        this.childRedactors = composition_1.composeChildRedactors(opts);
    }
}
exports.AsyncCompositeRedactor = AsyncCompositeRedactor;
//# sourceMappingURL=AsyncCompositeRedactor.js.map