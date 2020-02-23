"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const NameRedactor_1 = require("./built-ins/NameRedactor");
const simpleRegexpBuiltIns = require("./built-ins/simple-regexp-patterns");
const SimpleRegexpRedactor_1 = require("./built-ins/SimpleRegexpRedactor");
const utils_1 = require("./utils");
function normalizeCustomRedactorConfig(redactorConfig) {
    return utils_1.isSimpleRegexpCustomRedactorConfig(redactorConfig)
        ? new SimpleRegexpRedactor_1.SimpleRegexpRedactor({
            regexpPattern: redactorConfig.regexpPattern,
            replaceWith: redactorConfig.replaceWith
        })
        : redactorConfig;
}
function composeChildRedactors(opts = {}) {
    const childRedactors = [];
    if (opts.customRedactors && opts.customRedactors.before) {
        opts.customRedactors.before.map(normalizeCustomRedactorConfig).forEach(redactor => childRedactors.push(redactor));
    }
    for (const regexpName of Object.keys(simpleRegexpBuiltIns)) {
        if (!opts.builtInRedactors ||
            !opts.builtInRedactors[regexpName] ||
            opts.builtInRedactors[regexpName].enabled !== false) {
            childRedactors.push(new SimpleRegexpRedactor_1.SimpleRegexpRedactor({
                regexpPattern: simpleRegexpBuiltIns[regexpName],
                replaceWith: opts.globalReplaceWith || lodash_1.snakeCase(regexpName).toUpperCase()
            }));
        }
    }
    if (!opts.builtInRedactors || !opts.builtInRedactors.names || opts.builtInRedactors.names.enabled !== false) {
        childRedactors.push(new NameRedactor_1.NameRedactor(opts.globalReplaceWith));
    }
    if (opts.customRedactors && opts.customRedactors.after) {
        opts.customRedactors.after.map(normalizeCustomRedactorConfig).forEach(redactor => childRedactors.push(redactor));
    }
    return childRedactors;
}
exports.composeChildRedactors = composeChildRedactors;
//# sourceMappingURL=composition.js.map