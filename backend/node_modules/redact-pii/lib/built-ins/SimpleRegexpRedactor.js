"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class SimpleRegexpRedactor {
    constructor({ replaceWith = lodash_1.snakeCase(name).toUpperCase(), regexpPattern: regexpMatcher }) {
        this.replaceWith = replaceWith;
        this.regexpMatcher = regexpMatcher;
    }
    redact(textToRedact) {
        return textToRedact.replace(this.regexpMatcher, this.replaceWith);
    }
}
exports.SimpleRegexpRedactor = SimpleRegexpRedactor;
//# sourceMappingURL=SimpleRegexpRedactor.js.map