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

// Query String user:user1 org:user1 in:description...
console.log(query);

console.log(queryValidator(query)); // true

const qObj2 = queryStringToObj(query);

console.log(queryObjValidator(qObj2)); // true
```

## Exported Functions

### validUserName

```typescript
// Types
declare const validUserName: (usrnm: string) => boolean;
```

```javascript
import { validUserName } from "github-query-validator";
validUserName("git123");  // true
validUserName("-git123"); // false
```