# Zombie Service Diff

Diff two [zombies](). 

It takes a `current` and a `wanted` state and returns an object containing `add`, `remove` and `keep` properties. 

## Install

```sh
npm install --save @zombiec0rn/zombie-service-diff
```

## Use

```js
var diff = require('cccf-diff')(current, wanted)
// => { add : [], remove : [], keep : [] }
```

## Changelog

### 1.0.0

* Initial release
