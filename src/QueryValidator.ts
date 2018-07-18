import { QueryObject, Validators } from "./types";

const validProps = ["user", "org", "in", "size", "fork", "forks", "stars", "created", "pushed",
                    "language", "topic", "topics", "license", "is", "mirror", "archived", "addl"];

const validLicenses = ["afl-3.0", "apache-2.0", "artistic-2.0", "bs1-1.0", "bsd-2-clause", "bsd-3-clause", "bsd-3-clause-clear", "cc", "cc0-1.0", "cc-by-4.0", "cc-by-sa-4.0", "wtfpl", "ecl-2.0", "epl-1.0", "eupl-1.1", "agpl-3.0", "gpl", "gpl-2.0", "gpl-3.0", "lgpl", "lgpl-2.1", "lgpl-3.0", "isc", "lppl-1.3c", "ms-pl", "mit", "mpl-2.0", "osl-3.0", "postgresql", "ofl-1.1", "ncsa", "unlicense", "zlib"];

// Utilities
const validString = function validString(str: string) : boolean {
    return typeof str === "string";
}

const validBool = function validBool(bool: boolean | string) : boolean {
    return (bool === true) || (bool === false)
        || (bool === "true") || (bool === "false");
}

const validDate = function validDate(isoDate: string) : boolean {
    const DATEREG = "\\d{4}(?:\\-(?:0[1-9]|1[012]))?(?:\\-(?:0[1-9]|[12][0-9]|3[01]))?(?:(?:T(?:0[0-9]|1[0-9]|2[0-3]))?(?:(?:\\:[0-5]\\d)(?:\\:[0-5]\\dZ?)?)?(?:\\+\\d{2}(?:\\:\\d{2})?)?)?";
    const reg = RegExp(`^(?:${DATEREG}|<=${DATEREG}|<${DATEREG}|>${DATEREG}|>=${DATEREG}|\\*\\.\\.${DATEREG}|${DATEREG}\\.\\.\\*|${DATEREG}\\.\\.${DATEREG})$`);
    return reg.test(isoDate);
}

const validGitName = function validGitName(name: string) : boolean {
    const regex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,37}$/i;
    return regex.test(name);
}

// Validates size/forks/stars/topics
const validRange = function validRange(rng: string) : boolean {
    // Checks for <1232, <=1231, >1231, >=1232, 3423..*, *..3423, 323..545
    const reg = /^(?:(?:<=\d+|<\d+|>=\d+|>\d+|\*\.\.\d+|\d+\.\.\*|\d+\.\.\d+)$|\d+$)/gm;
    return reg.test(rng);
}

// Validates usernames
const validUserName = function validUserName(usrnm: string) : boolean {
    return validGitName(usrnm);
}

// Validates organizations
const validOrgName = function validOrgName(usrnm: string): boolean {
    return validGitName(usrnm);
}

// Validates size
const validSize = function validSize(size: string) : boolean {
    return validRange(`${size}`);
}

// Validates forks
const validForks = function validForks(forks: string) : boolean {
    return validRange(`${forks}`);
}

// Validates fork
const validFork = function validFork(fork: string | boolean) : boolean {
    return validBool(fork) || (fork === "only");
}

// Validates stars
const validStars = function validStars(stars: string) : boolean {
    return validRange(`${stars}`);
}

// Validates topics
const validTopics = function validTopics(topics: string) : boolean {
    return validRange(`${topics}`);
}

// Validates in
const validIn = function validIn(val: string) : boolean {
    return (val === "description") || (val === "name") || (val === "readme");
}

// Validates lang
const validLang = function validLang(lang: string) : boolean {
    return validString(lang);
}

// Validates topic
const validTopic = function validTopic(topic: string) : boolean {
    return validString(topic);
}

// Validates additional
const validAddl = function validAddl(addl: string) : boolean {
    return validString(addl);;
}

// Validates license
const validLicense = function validLicense(lice: string) : boolean {
    return validLicenses.includes(lice);
}

// Validates created
const validCreated = function validCreated(created: string) : boolean {
    return validDate(created);
}

// Validates pushed
const validPushed = function validPushed(pushed: string) : boolean {
    return validDate(pushed);
}

// Validates mirror
const validMirror = function validMirror(mirr: boolean | string) : boolean {
    return validBool(mirr);
}

// Validates archived
const validArchived = function validArchived(arch: boolean | string) : boolean {
    return validBool(arch);
}

// Validates is
const validIs = function validIs(is: string) : boolean {
    return (is === "public") || (is === "private");
}

// Validates key
const validKey = function validKey(key: string) : boolean {
    if(key[0] === "-") return validProps.includes(key.slice(1, key.length));
    return validProps.includes(key);
}

// Validates all keys on object
const validKeys = function validKeys(qObj: QueryObject) : boolean {
    return Object.keys(qObj).every(e => validKey(e));
}

// validators stored on object as their key name for easy validation
const validators : Validators = {
    user: validUserName,
    org: validOrgName,
    in: validIn,
    size: validSize,
    forks: validForks,
    stars: validStars,
    created: validCreated,
    pushed: validPushed,
    language: validLang,
    topic: validTopic,
    topics: validTopics,
    license: validLicense,
    is: validIs,
    mirror: validMirror, 
    archived: validArchived,
    addl: validAddl
}

// strings used for reporting issues in key value
const valids : { [key: string]: string } = {
    user:    "38 character alphanumeric strings that do not begin with dashes, \n\tie: git-name but not -git-name",
    org:     "38 character alphanumeric strings that do not begin with dashes, \n\tie: git-name but not -git-name",
    in:      "One of: description, name, readme",
    size:    "Formats: #, <#, <=#, >#, >=#, #..*, *..#, #..#, \n\t github docs: https://help.github.com/articles/understanding-the-search-syntax/#query-for-values-greater-or-less-than-another-value",
    forks:   "Formats: #, <#, <=#, >#, >=#, #..*, *..#, #..#, \n\t github docs: https://help.github.com/articles/understanding-the-search-syntax/#query-for-values-greater-or-less-than-another-value",
    stars:   "Formats: #, <#, <=#, >#, >=#, #..*, *..#, #..#, \n\t github docs: https://help.github.com/articles/understanding-the-search-syntax/#query-for-values-greater-or-less-than-another-value",
    created: "github docs: https://help.github.com/articles/understanding-the-search-syntax/#query-for-dates",
    pushed:  "github docs: https://help.github.com/articles/understanding-the-search-syntax/#query-for-dates",
    updated: "github docs: https://help.github.com/articles/understanding-the-search-syntax/#query-for-dates",
    language: "Must be a valid string",
    topic: "Must be a valid string",
    topics: "Formats: #, <#, <=#, >#, >=#, #..*, *..#, #..#, \n\t github docs: https://help.github.com/articles/understanding-the-search-syntax/#query-for-values-greater-or-less-than-another-value",
    license: `License must be one of: ${validLicenses.reduce((a, c) => a += `\t\t\t\t\t\n${c}`, "")}`,
    is: "One of: public, private",
    mirror: "One of: true, false", 
    archived: "One of: true, false",
    addl: "Must be a valid string"
}

// function to fully validate an object
const queryObjValidator = function queryObjValidator(qObj: QueryObject, throwOnErr: boolean = true) : boolean {
    for(const x in qObj) {
        if(!validKey(x)) {
            if(throwOnErr) {
                throw new Error(`Invalid query prop, Prop: ${x}. \n\tValid Props: \n\t\t${validProps.join(",\n\t\t") }`);
            } else {
                return false;
            }
        }

        if(!validators[x.replace("-", "")](qObj[x])) {
            if(throwOnErr) {
                throw new Error(`Invalid prop value, Key: ${x} Value: ${qObj[x]}. \n\t ${valids[x]}`);
            } else {
                return false;
            }
        }
    }
    return true;
}

// function to validate a query string splits the string
// into a queryObject first then uses the object validation method
const queryValidator = function queryValidator(q: string, throwOnErr: boolean = true) : boolean {
    const qObj = queryStringToObj(q);
    return queryObjValidator(qObj as QueryObject);
}

// function to turn a query object to a query string
const queryObjToString = function queryObjToString(qObj: QueryObject, throwOnErr: boolean = true) : string {
    if(!queryObjValidator(qObj)) return "INVALID OBJECT";
    let str = "";
    for(const x in qObj) {
        if(x === "addl") {
            str = `${qObj[x]}${str ? " " + str : str}`;
            continue;
        } else {
            str = `${str ? str + " " : str}${x}:${qObj[x]}`;
        }
    }
    return str;
}

// function to turn a query string into a QueryObject   
const queryStringToObj = function queryStringToObj(q: string) : QueryObject {
    const split = q.split(" ");
    const qObj : { [key: string] : string } = {};
    for(let i = 0; i < split.length; i++) {
        const ind = split[i].indexOf(":");
        if(ind >= 0) {
            let key = split[i].substr(0, ind);
            let value = split[i].substr(ind + 1, split[i].length);
            qObj[key] = value;
        } else {
            qObj["addl"] = `${split[i]} ${qObj["addl"] || ""}`;
            qObj["addl"] = qObj["addl"].trim();
        }
    }
    return qObj;
}

export {
    validUserName,
    validOrgName,
    validIn,
    validStars,
    validForks,
    validFork,
    validSize,
    validCreated,
    validPushed,
    validLang,
    validTopic,
    validTopics,
    validLicense,
    validIs,
    validMirror, 
    validArchived,
    validAddl,
    validKeys,
    queryObjValidator,
    queryValidator,
    queryObjToString,
    queryStringToObj
}
