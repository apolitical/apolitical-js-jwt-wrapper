JS JWT Wrapper
==============

Creates basic JWT tokens based on a shared secret. Simple wrapper around [jsrsasign].

Installation
------------

Not currently available on npm so install directly from github repo

```
$ npm install git+ssh://github.com/apolitical/apolitical-js-jwt-wrapper.git
```

Usage
-----

There are three exposed functions, each one takes the shared secret and returns another function.

### jwtCreator

Creates a new jwt.

```javascript
const { jwtCreator } = require('apolitical-js-jwt-wrapper');

const createJwt = jwtCreator('secret');
const jwt = createJwt({ my: 'payload' });

console.log(jwt);
```
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteSI6InBheWxvYWQifQ.78bnGeLf_4A3mXZhStnMo6warvE1M5QTHRJClTpnS4s
```

### jwtValidator

```javascript
const { jwtValidator } = require('apolitical-js-jwt-wrapper');

const isValid = jwtValidator('secret');

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteSI6InBheWxvYWQifQ.78bnGeLf_4A3mXZhStnMo6warvE1M5QTHRJClTpnS4s';
console.log(isValid(jwt));
```
```
true
```

### jwtPayloadExtractor

```javascript
const { jwtPayloadExtractor } = require('apolitical-js-jwt-wrapper');

const getPayload = jwtPayloadExtractor('secret');

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteSI6InBheWxvYWQifQ.78bnGeLf_4A3mXZhStnMo6warvE1M5QTHRJClTpnS4s';
console.log(getPayload(jwt));
```
```
{ my: 'payload' }
```

[jsrsasign]: https://kjur.github.io/jsrsasign/
