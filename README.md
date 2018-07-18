# github-query-validator
A set of functions that will thoroughly validate a github api query.

## Installing
npm install github-query-validator

## Main Example

```javascript
import { queryValidator } from "github-query-validator";
import { queryObjValidator } from "github-query-validator";
import { queryObjToString } from "github-query-validator";
import { queryStringToObj } from "github-query-validator";

const qObj = {
    addl: "Query String",
    user: "user1",
    org: "user1",
    in: "description",
    size: "12..*",
    forks: "*..32",
    stars: "343..42",
    created: "2018-07-12",
    pushed: "2018-06-12T21:21:21Z",
    language: "c++",
    topic: "words",
    topics: "<=343",
    license: "mit",
    is: "public",
    mirror: true,
    archived: false
}

console.log(queryObjValidator(qObj)); // true

const query = queryObjToString(qObj);

console.log(query); // Query String user:user1 org:user1 in:des...

console.log(queryValidator(query)); // true

const qObj2 = queryStringToObj(query);

console.log(queryObjValidator(qObj2)); // true
```

Keep in mind the 'addl' property is not part of the github api, it is the library representation of the actual query without any properties.

## Exported Functions

### queryValidator

Validates a query string, by default throws error on invalid and returns true on valid, can pass flag to return false instead of throwing error. Function works by splitting query string into QueryObject and validates the QueryObject using queryObjValidator.

```typescript
declare const queryValidator: (q: string, throwOnErr?: boolean) => boolean;
```

```javascript
import { queryValidator } from "github-query-validator";
queryValidator("Query String user:user1 org:user1"); // true
queryValidator("Query String user:user1 dogs:user1"); // throw error
queryValidator("Query String user:user1 dogs:user1", false); // false
```

### queryObjValidator

Validates a QueryObject, by default throws error on invalid and returns true on valid, can pass flag to return false instead of throwing error.

```typescript
declare const queryObjValidator: (qObj: QueryObject, throwOnErr?: boolean) => boolean;
```

```javascript
import { queryObjValidator } from "github-query-validator";
const qObj = {
    addl: "Query String",
    user: "user1",
    org: "user1"
}
queryObjValidator(qObj); // true
queryObjValidator({}); // throw error
queryObjValidator({}, false); // false
```

### queryStringToObj

Converts a query string into a QueryObject

```typescript
declare const queryStringToObj: (q: string) => QueryObject;
```

```javascript
import { queryStringToObj } from "github-query-validator";
queryStringToObj("Query String user:user1 org:user1");
//{
//     addl: "Query String",
//     user: "user1",
//     org: "user1"
// }
```

### queryObjToString

Converts a QueryObject to query string.

```typescript
declare const queryObjToString: (qObj: QueryObject, throwOnErr?: boolean) => string;
```

```javascript
import { queryObjToString } from "github-query-validator";
const qObj = {
    addl: "Query String",
    user: "user1",
    org: "user1"
}
queryObjToString(qObj); // Query String user:user1 org:user1
```

### validUserName

Validates github user names, which are 38 digit alpha-numeric or dashes, but cannot begin with a dash.

```typescript
// Types
declare const validUserName: (usrnm: string) => boolean;
```

```javascript
import { validUserName } from "github-query-validator";
validUserName("git123");  // true
validUserName("-git123"); // false
```

### validOrgName

Validates github org names, which are 38 digit alpha-numeric or dashes, but cannot begin with a dash.

```typescript
// Types
declare const validOrgName: (usrnm: string) => boolean;
```

```javascript
import { validUserName } from "github-query-validator";
validUserName("org23");  // true
validUserName("-org123"); // false
```

### validIn

Validates the 'in' property for github api queries. Comma seperated list of 'description', 'name', 'readme'.

```typescript
declare const validIn: (inn: string) => boolean;
```

```javascript
import { validIn } from "github-query-validator";
validIn("description"); // true
validIn("description,readme"); // true
validIn("dog,cat"); // false
```

### validStars

Validates the 'stars' property for github api queries. Formated as:

- \#\#\#
- <###
- <=###
- \>###
- \>=###
- ##..*
- *..##
- #..#

```typescript
declare const validStars: (stars: string) => boolean;
```

```javascript
import { validStars } from "github-query-validator";
validStars("<=123"); // true
validStars("324...432"); // true
validStars("#@d#3$"); // false
```

### validForks

Validates the 'forks' property for github api queries. Formated as:

- \#\#\#
- <###
- <=###
- \>###
- \>=###
- ##..*
- *..##
- #..#

```typescript
declare const validForks: (forks: string) => boolean;
```

```javascript
import { validForks } from "github-query-validator";
validForks("<=123"); // true
validForks("324...432"); // true
validForks("#@d#3$"); // false
```

### validFork

Validates the 'fork' property for github api queries. One of, true, false, 'true', 'false', 'only'.

```typescript
declare const validFork: (fork: string | boolean) => boolean;
```

```javascript
import { validFork } from "github-query-validator";
validFork(true); // true
validFork('true'); // true
validFork('false'); // true
validFork('only'); // true
validFork('D@2@g4'); // true
```

### validStars

Validates the 'stars' property for github api queries. Formated as:

- \#\#\#
- <###
- <=###
- \>###
- \>=###
- ##..*
- *..##
- #..#

```typescript
declare const validStars: (stars: string) => boolean;
```

```javascript
import { validStars } from "github-query-validator";
validStars("<=123"); // true
validStars("324...432"); // true
validStars("#@d#3$"); // false
```

### validTopics

Validates the 'topics' property for github api queries. Formated as:

- \#\#\#
- <###
- <=###
- \>###
- \>=###
- ##..*
- *..##
- #..#

```typescript
declare const validTopics: (topics: string) => boolean;
```

```javascript
import { validTopics } from "github-query-validator";
validTopics("<=123"); // true
validTopics("324...432"); // true
validTopics("#@d#3$"); // false
```

### validLang

Validates the 'language' property for github api queries. Aceepts any string.

```typescript
declare const validLang: (lang: string) => boolean;
```

```javascript
import { validLang } from "github-query-validator";
validLang("c++"); // true
validLang("python"); // true
validLang(3); // false
```

### validTopic

Validates the 'topic' property for github api queries. Aceepts any string.

```typescript
declare const validTopic: (topic: string) => boolean;
```

```javascript
import { validTopic } from "github-query-validator";
validTopic("c++"); // true
validTopic("python"); // true
validTopic(3); // false
```

### validAddl

Validates the 'addl' property, not part of github api, how the library handles additional input. Aceepts any string.

```typescript
declare const validAddl: (addl: string) => boolean;
```

```javascript
import { validAddl } from "github-query-validator";
validAddl("c++"); // true
validAddl("python"); // true
validAddl(3); // false
```

### validLicense

Validates the 'license' property for github api queries. Will accept any of the licenses found on this [page](https://help.github.com/articles/licensing-a-repository/#searching-github-by-license-type) (as of 7/18/18).

```typescript
declare const validLicense: (lice: string) => boolean;
```

```javascript
import { validLicense } from "github-query-validator";
validTopic("mit"); // true
validTopic("afl-3.0"); // true
validTopic("ASD"); // false
```

### validCreated

Validates the 'created' property for github api queries. For all formats accepted visit this [page](https://help.github.com/articles/understanding-the-search-syntax/#query-for-dates).

```typescript
declare const validCreated: (created: string) => boolean;
```

```javascript
import { validCreated } from "github-query-validator";
validCreated("2018-05-12T21"); // true
validCreated("2018-05-12T21:21:21Z"); // true
validCreated("07/12"); // false
```

### validPushed

Validates the 'pushed' property for github api queries. For all formats accepted visit this [page](https://help.github.com/articles/understanding-the-search-syntax/#query-for-dates).

```typescript
declare const validPushed: (pushed: string) => boolean;
```

```javascript
import { validPushed } from "github-query-validator";
validPushed("2018-05-12T21"); // true
validPushed("2018-05-12T21:21:21Z"); // true
validPushed("07/12"); // false
```

### validMirror

Validates the 'mirror' property for github api queries. Takes one of true, false, 'true', 'false'.

```typescript
declare const validMirror: (mirr: string | boolean) => boolean;
```

```javascript
import { validMirror } from "github-query-validator";
validMirror(true); // true
validMirror(false); // true
validMirror("false"); // true
validMirror("07/12"); // false
```

### validArchived

Validates the 'archived' property for github api queries. Takes one of true, false, 'true', 'false'.

```typescript
declare const validArchived: (arch: string | boolean) => boolean;
```

```javascript
import { validMirror } from "github-query-validator";
validMirror(true); // true
validMirror(false); // true
validMirror("false"); // true
validMirror("07/12"); // false
```

### validIs

Validates the 'is' property for github api queries. Takes one of 'public' or 'private'.

```typescript
declare const validIs: (is: string) => boolean;
```

```javascript
import { validIs } from "github-query-validator";
validIs("public"); // true
validIs("07/12"); // false
```

### validIs

Validates the 'is' property for github api queries. Takes one of 'public' or 'private'.

```typescript
declare const validIs: (is: string) => boolean;
```

```javascript
import { validIs } from "github-query-validator";
validIs("public"); // true
validIs("07/12"); // false
```

### validKey

Validates a property as valid
accepts one of:
>"user", "org", "in", "size", "fork", "forks", "stars", "created", "pushed", "language", "topic", "topics", "license", "is", "mirror", "archived", "addl"

```typescript
declare const validKey: (key: string) => boolean;
```

```javascript
import { validKey } from "github-query-validator";
validIs("created"); // true
validIs("dog"); // false
```

### validKeys

Validates the keys of a QueryObject.

```typescript
declare const validKeys: (qObj: QueryObject) => boolean;
```

```javascript
import { validKeys } from "github-query-validator";
const qObj = {
    addl: "Query String",
    user: "user1",
    org: "user1",
    in: "description"
}
validKeys(qObj); // true
```

