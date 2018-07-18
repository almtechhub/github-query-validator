"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validProps = ["user", "org", "in", "size", "fork", "forks", "stars", "created", "pushed",
    "language", "topic", "topics", "license", "is", "mirror", "archived", "addl"];
var validLicenses = ["afl-3.0", "apache-2.0", "artistic-2.0", "bs1-1.0", "bsd-2-clause", "bsd-3-clause", "bsd-3-clause-clear", "cc", "cc0-1.0", "cc-by-4.0", "cc-by-sa-4.0", "wtfpl", "ecl-2.0", "epl-1.0", "eupl-1.1", "agpl-3.0", "gpl", "gpl-2.0", "gpl-3.0", "lgpl", "lgpl-2.1", "lgpl-3.0", "isc", "lppl-1.3c", "ms-pl", "mit", "mpl-2.0", "osl-3.0", "postgresql", "ofl-1.1", "ncsa", "unlicense", "zlib"];
var validString = function validString(str) {
    return typeof str === "string";
};
var validBool = function validBool(bool) {
    return (bool === true) || (bool === false)
        || (bool === "true") || (bool === "false");
};
var validDate = function validDate(isoDate) {
    var DATEREG = "\\d{4}(?:\\-(?:0[1-9]|1[012]))?(?:\\-(?:0[1-9]|[12][0-9]|3[01]))?(?:(?:T(?:0[0-9]|1[0-9]|2[0-3]))?(?:(?:\\:[0-5]\\d)(?:\\:[0-5]\\dZ?)?)?(?:\\+\\d{2}(?:\\:\\d{2})?)?)?";
    var reg = RegExp("^(?:" + DATEREG + "|<=" + DATEREG + "|<" + DATEREG + "|>" + DATEREG + "|>=" + DATEREG + "|\\*\\.\\." + DATEREG + "|" + DATEREG + "\\.\\.\\*|" + DATEREG + "\\.\\." + DATEREG + ")$");
    return reg.test(isoDate);
};
var validGitName = function validGitName(name) {
    var regex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,37}$/i;
    return regex.test(name);
};
var validRange = function validRange(rng) {
    var reg = /^(?:(?:<=\d+|<\d+|>=\d+|>\d+|\*\.\.\d+|\d+\.\.\*|\d+\.\.\d+)$|\d+$)/gm;
    return reg.test(rng);
};
var validUserName = function validUserName(usrnm) {
    return validGitName(usrnm);
};
exports.validUserName = validUserName;
var validOrgName = function validOrgName(usrnm) {
    return validGitName(usrnm);
};
exports.validOrgName = validOrgName;
var validSize = function validSize(size) {
    return validRange("" + size);
};
exports.validSize = validSize;
var validForks = function validForks(forks) {
    return validRange("" + forks);
};
exports.validForks = validForks;
var validFork = function validFork(fork) {
    return (fork === "true") || (fork === true)
        || (fork === "false") || (fork === false)
        || (fork === "only");
};
exports.validFork = validFork;
var validStars = function validStars(stars) {
    return validRange("" + stars);
};
exports.validStars = validStars;
var validTopics = function validTopics(topics) {
    return validRange("" + topics);
};
exports.validTopics = validTopics;
var validIn = function validIn(val) {
    return (val === "description") || (val === "name") || (val === "readme");
};
exports.validIn = validIn;
var validLang = function validLang(lang) {
    return validString(lang);
};
exports.validLang = validLang;
var validTopic = function validTopic(topic) {
    return validString(topic);
};
exports.validTopic = validTopic;
var validAddl = function validAddl(addl) {
    return validString(addl);
    ;
};
exports.validAddl = validAddl;
var validLicense = function validLicense(lice) {
    return validLicenses.includes(lice);
};
exports.validLicense = validLicense;
var validCreated = function validCreated(created) {
    return validDate(created);
};
exports.validCreated = validCreated;
var validPushed = function validPushed(pushed) {
    return validDate(pushed);
};
exports.validPushed = validPushed;
var validUpdated = function validUpdated(updated) {
    return validDate(updated);
};
exports.validUpdated = validUpdated;
var validMirror = function validMirror(mirr) {
    return validBool(mirr);
};
exports.validMirror = validMirror;
var validArchived = function validArchived(arch) {
    return validBool(arch);
};
exports.validArchived = validArchived;
var validIs = function validIs(is) {
    return (is === "public") || (is === "private");
};
exports.validIs = validIs;
var validKey = function validKey(key) {
    if (key[0] === "-")
        return validProps.includes(key.slice(1, key.length));
    return validProps.includes(key);
};
var validKeys = function validKeys(qObj) {
    return Object.keys(qObj).every(function (e) { return validKey(e); });
};
exports.validKeys = validKeys;
var validators = {
    user: validUserName,
    org: validOrgName,
    in: validIn,
    size: validSize,
    forks: validForks,
    stars: validStars,
    created: validCreated,
    pushed: validPushed,
    updated: validUpdated,
    language: validLang,
    topic: validTopic,
    topics: validTopics,
    license: validLicense,
    is: validIs,
    mirror: validMirror,
    archived: validArchived,
    addl: validAddl
};
var valids = {
    user: "38 character alphanumeric strings that do not begin with dashes, \n\tie: git-name but not -git-name",
    org: "38 character alphanumeric strings that do not begin with dashes, \n\tie: git-name but not -git-name",
    in: "One of: description, name, readme",
    size: "Formats: #, <#, <=#, >#, >=#, #..*, *..#, #..#, \n\t github docs: https://help.github.com/articles/understanding-the-search-syntax/#query-for-values-greater-or-less-than-another-value",
    forks: "Formats: #, <#, <=#, >#, >=#, #..*, *..#, #..#, \n\t github docs: https://help.github.com/articles/understanding-the-search-syntax/#query-for-values-greater-or-less-than-another-value",
    stars: "Formats: #, <#, <=#, >#, >=#, #..*, *..#, #..#, \n\t github docs: https://help.github.com/articles/understanding-the-search-syntax/#query-for-values-greater-or-less-than-another-value",
    created: "github docs: https://help.github.com/articles/understanding-the-search-syntax/#query-for-dates",
    pushed: "github docs: https://help.github.com/articles/understanding-the-search-syntax/#query-for-dates",
    updated: "github docs: https://help.github.com/articles/understanding-the-search-syntax/#query-for-dates",
    language: "Must be a valid string",
    topic: "Must be a valid string",
    topics: "Formats: #, <#, <=#, >#, >=#, #..*, *..#, #..#, \n\t github docs: https://help.github.com/articles/understanding-the-search-syntax/#query-for-values-greater-or-less-than-another-value",
    license: "License must be one of: " + validLicenses.reduce(function (a, c) { return a += "\t\t\t\t\t\n" + c; }, ""),
    is: "One of: public, private",
    mirror: "One of: true, false",
    archived: "One of: true, false",
    addl: "Must be a valid string"
};
var queryObjValidator = function queryObjValidator(qObj, throwOnErr) {
    if (throwOnErr === void 0) { throwOnErr = true; }
    for (var x in qObj) {
        if (!validKey(x)) {
            if (throwOnErr) {
                throw new Error("Invalid query prop, Prop: " + x + ".");
            }
            else {
                return false;
            }
        }
        if (!validators[x.replace("-", "")](qObj[x])) {
            if (throwOnErr) {
                throw new Error("Invalid prop value, Key: " + x + " Value: " + qObj[x] + ". \n\t " + valids[x]);
            }
            else {
                return false;
            }
        }
    }
    return true;
};
exports.queryObjValidator = queryObjValidator;
var queryValidator = function queryValidator(q, throwOnErr) {
    if (throwOnErr === void 0) { throwOnErr = true; }
    var qObj = queryStringToObj(q);
    return queryObjValidator(qObj);
};
exports.queryValidator = queryValidator;
var queryObjToString = function queryObjToString(qObj, throwOnErr) {
    if (throwOnErr === void 0) { throwOnErr = true; }
    if (!queryObjValidator(qObj))
        return "INVALID OBJECT";
    var str = "";
    for (var x in qObj) {
        if (x === "addl") {
            str = "" + qObj[x] + (str ? " " + str : str);
            continue;
        }
        else {
            str = "" + (str ? str + " " : str) + x + ":" + qObj[x];
        }
    }
    return str;
};
exports.queryObjToString = queryObjToString;
var queryStringToObj = function queryStringToObj(q) {
    var split = q.split(" ");
    var qObj = {};
    for (var i = 0; i < split.length; i++) {
        var ind = split[i].indexOf(":");
        if (ind >= 0) {
            var key = split[i].substr(0, ind);
            var value = split[i].substr(ind + 1, split[i].length);
            qObj[key] = value;
        }
        else {
            qObj["addl"] = split[i] + " " + (qObj["addl"] || "");
            qObj["addl"] = qObj["addl"].trim();
        }
    }
    return qObj;
};
exports.queryStringToObj = queryStringToObj;
