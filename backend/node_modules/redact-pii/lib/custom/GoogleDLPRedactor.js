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
const lodash_1 = require("lodash");
const dlp_1 = require("@google-cloud/dlp");
exports.MAX_DLP_CONTENT_LENGTH = 524288;
// a finding quote length that is too short (e.g. 1 char like "S") causes too many false replacements
const MIN_FINDING_QUOTE_LENGTH = 2;
const minLikelihood = 'LIKELIHOOD_UNSPECIFIED';
const maxFindings = 0;
exports.defaultInfoTypes = [
    { name: 'AMERICAN_BANKERS_CUSIP_ID' },
    { name: 'AUSTRALIA_MEDICARE_NUMBER' },
    { name: 'AUSTRALIA_TAX_FILE_NUMBER' },
    { name: 'BRAZIL_CPF_NUMBER' },
    { name: 'CANADA_BC_PHN' },
    { name: 'CANADA_DRIVERS_LICENSE_NUMBER' },
    { name: 'CANADA_OHIP' },
    { name: 'CANADA_PASSPORT' },
    { name: 'CANADA_QUEBEC_HIN' },
    { name: 'CANADA_SOCIAL_INSURANCE_NUMBER' },
    { name: 'CHINA_PASSPORT' },
    { name: 'CREDIT_CARD_NUMBER' },
    { name: 'EMAIL_ADDRESS' },
    { name: 'ETHNIC_GROUP' },
    { name: 'FEMALE_NAME' },
    { name: 'FIRST_NAME' },
    { name: 'FRANCE_CNI' },
    { name: 'FRANCE_NIR' },
    { name: 'FRANCE_PASSPORT' },
    { name: 'GCP_CREDENTIALS' },
    { name: 'GERMANY_PASSPORT' },
    { name: 'IBAN_CODE' },
    { name: 'IMEI_HARDWARE_ID' },
    { name: 'INDIA_PAN_INDIVIDUAL' },
    { name: 'IP_ADDRESS' },
    { name: 'JAPAN_INDIVIDUAL_NUMBER' },
    { name: 'JAPAN_PASSPORT' },
    { name: 'KOREA_PASSPORT' },
    { name: 'KOREA_RRN' },
    { name: 'LAST_NAME' },
    { name: 'MAC_ADDRESS_LOCAL' },
    { name: 'MAC_ADDRESS' },
    { name: 'MALE_NAME' },
    { name: 'MEXICO_CURP_NUMBER' },
    { name: 'MEXICO_PASSPORT' },
    { name: 'NETHERLANDS_BSN_NUMBER' },
    { name: 'PHONE_NUMBER' },
    { name: 'SPAIN_NIE_NUMBER' },
    { name: 'SPAIN_NIF_NUMBER' },
    { name: 'SPAIN_PASSPORT' },
    { name: 'SWIFT_CODE' },
    { name: 'UK_DRIVERS_LICENSE_NUMBER' },
    { name: 'UK_NATIONAL_HEALTH_SERVICE_NUMBER' },
    { name: 'UK_NATIONAL_INSURANCE_NUMBER' },
    { name: 'UK_PASSPORT' },
    { name: 'UK_TAXPAYER_REFERENCE' },
    { name: 'US_ADOPTION_TAXPAYER_IDENTIFICATION_NUMBER' },
    { name: 'US_BANK_ROUTING_MICR' },
    { name: 'US_DEA_NUMBER' },
    { name: 'US_DRIVERS_LICENSE_NUMBER' },
    { name: 'US_HEALTHCARE_NPI' },
    { name: 'US_INDIVIDUAL_TAXPAYER_IDENTIFICATION_NUMBER' },
    { name: 'US_PASSPORT' },
    { name: 'US_PREPARER_TAXPAYER_IDENTIFICATION_NUMBER' },
    { name: 'US_SOCIAL_SECURITY_NUMBER' },
    { name: 'US_TOLLFREE_PHONE_NUMBER' },
    { name: 'US_VEHICLE_IDENTIFICATION_NUMBER' },
    { name: 'US_STATE' },
    { name: 'FDA_CODE' },
    { name: 'ICD9_CODE' },
    { name: 'ICD10_CODE' },
    { name: 'US_EMPLOYER_IDENTIFICATION_NUMBER' },
    { name: 'LOCATION' },
    { name: 'DATE' },
    { name: 'DATE_OF_BIRTH' },
    { name: 'TIME' },
    { name: 'PERSON_NAME' },
    { name: 'AGE' },
    { name: 'GENDER' },
    { name: 'ARGENTINA_DNI_NUMBER' },
    { name: 'CHILE_CDI_NUMBER' },
    { name: 'COLOMBIA_CDC_NUMBER' },
    { name: 'NETHERLANDS_PASSPORT' },
    { name: 'PARAGUAY_CIC_NUMBER' },
    { name: 'PERU_DNI_NUMBER' },
    { name: 'PORTUGAL_CDC_NUMBER' },
    { name: 'URUGUAY_CDI_NUMBER' },
    { name: 'VENEZUELA_CDI_NUMBER' }
];
const customInfoTypes = [
    {
        infoType: {
            name: 'URL'
        },
        regex: {
            pattern: '([^\\s:/?#]+):\\/\\/([^/?#\\s]*)([^?#\\s]*)(\\?([^#\\s]*))?(#([^\\s]*))?'
        }
    }
];
const likelihoodPriority = {
    LIKELIHOOD_UNSPECIFIED: 0,
    VERY_UNLIKELY: 1,
    UNLIKELY: 2,
    POSSIBLE: 3,
    LIKELY: 4,
    VERY_LIKELY: 5
};
const includeQuote = true;
// finding location.byteRange.start and end are strings for some reason, so must convert to numbers
const getFindingStart = (finding) => Number(lodash_1.get(finding, 'location.byteRange.start', 0));
const getFindingEnd = (finding) => Number(lodash_1.get(finding, 'location.byteRange.end', 0));
/**
 * Remove overlapping findings which can cause messed up tokens.
 *
 * For example "My name is John D." will cause 3 findings:
 *  - PERSON_NAME for text "John S." at range 11-17
 *  - FIRST_NAME for text "John" at range 11-15
 *  - LAST_NAME for text "S." at range 15-17
 *
 * The FIRST_NAME and LAST_NAME findings overlap the first finding so there is no need to search for them
 */
function removeOverlappingFindings(findings) {
    // early return if only have 0 or 1 findings
    if (findings.length <= 1) {
        return findings;
    }
    // sort findings by ascending start
    findings.sort((a, b) => getFindingStart(a) - getFindingStart(b));
    // remove findings that overlap (but keep the one with higher likelihood)
    const resultFindings = [findings[0]];
    for (let i = 1; i < findings.length; i++) {
        const current = findings[i];
        const previous = resultFindings[resultFindings.length - 1];
        // when findings overlap, keep the one with the higher likelihood
        if (getFindingStart(current) < getFindingEnd(previous)) {
            if (likelihoodPriority[current.likelihood] > likelihoodPriority[previous.likelihood]) {
                resultFindings[resultFindings.length - 1] = current;
            }
        }
        else {
            // no overlap
            resultFindings.push(current);
        }
    }
    return resultFindings;
}
/** @public */
class GoogleDLPRedactor {
    constructor(opts = {}) {
        this.opts = opts;
        this.dlpClient = new dlp_1.default.DlpServiceClient(this.opts.clientOptions);
    }
    redactAsync(textToRedact) {
        return __awaiter(this, void 0, void 0, function* () {
            // default batch size is MAX_DLP_CONTENT_LENGTH/2 because some unicode characters can take more than 1 byte
            // and its difficult to get a substring of a desired target length in bytes
            const maxContentSize = this.opts.maxContentSizeForBatch || exports.MAX_DLP_CONTENT_LENGTH / 2;
            if (textToRedact.length > maxContentSize && !this.opts.disableAutoBatchWhenContentSizeExceedsLimit) {
                const batchPromises = [];
                let batchStartIndex = 0;
                while (batchStartIndex < textToRedact.length) {
                    const batchEndIndex = batchStartIndex + maxContentSize;
                    const batchText = textToRedact.substring(batchStartIndex, batchEndIndex);
                    batchPromises.push(this.doRedactAsync(batchText));
                    batchStartIndex = batchEndIndex;
                }
                const batchResults = yield Promise.all(batchPromises);
                return batchResults.join('');
            }
            else {
                return this.doRedactAsync(textToRedact);
            }
        });
    }
    doRedactAsync(textToRedact) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectId = yield this.dlpClient.getProjectId();
            // handle info type excludes and includes
            const infoTypes = exports.defaultInfoTypes
                .filter(infoType => !this.opts.excludeInfoTypes || !this.opts.excludeInfoTypes.includes(infoType.name))
                .concat((this.opts.includeInfoTypes || []).map(infoTypeName => ({ name: infoTypeName })));
            const response = yield this.dlpClient.inspectContent({
                parent: this.dlpClient.projectPath(projectId),
                inspectConfig: Object.assign({
                    infoTypes,
                    customInfoTypes,
                    minLikelihood,
                    includeQuote,
                    limits: {
                        maxFindingsPerRequest: maxFindings
                    }
                }, this.opts.inspectConfig),
                item: { value: textToRedact }
            });
            const findings = response[0].result.findings;
            if (findings.length > 0) {
                // this is necessary to prevent tokens getting messed up with other repeated partial tokens (e.g. "my name is PERLALALALALALALALALALALALALALALALALAL...")
                const findingsWithoutOverlaps = removeOverlappingFindings(findings);
                // sort findings by highest likelihood first
                findingsWithoutOverlaps.sort(function (a, b) {
                    return likelihoodPriority[b.likelihood] - likelihoodPriority[a.likelihood];
                });
                // in order of highest likelihood replace finding with info type name
                findingsWithoutOverlaps.forEach((finding) => {
                    let find = finding.quote;
                    if (find !== finding.infoType.name && find.length >= MIN_FINDING_QUOTE_LENGTH) {
                        let numSearches = 0;
                        while (numSearches++ < 1000 && textToRedact.indexOf(find) >= 0) {
                            textToRedact = textToRedact.replace(find, finding.infoType.name);
                        }
                    }
                });
            }
            return textToRedact;
        });
    }
}
exports.GoogleDLPRedactor = GoogleDLPRedactor;
//# sourceMappingURL=GoogleDLPRedactor.js.map