# Zombie Service Diff

Diff two [zombie]() service states. 

It takes a `current` and a `wanted` state and returns an object containing `add`, `remove` and `keep` properties. 

## Install

```sh
npm install --save @zombiec0rn/zombie-service-diff
```

## Use

```js
require('@zombiec0rn/zombie-service-diff')(current, wanted)
// => { add : [], remove : [], keep : [] }
```

## Changelog

### 1.0.0

* Initial release
