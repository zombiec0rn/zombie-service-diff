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

## Fingerprint

It can on some engines be quite hard to extract the exact configuration used to start a service. Because of this we support a `fingerprint` property on services being diffed, that will take precedence over the object hash. 

```json
  {
    "id": "yolo",
    "image": "zombiec0rn/yolo:1.0.0",
    "fingerprint": "0c0d289f8743bac4719509a04261c3f2d359a58d"
  }
```

The module also exports a `fingerprint` function that can be used to create the fingerprint.

```js
require('@zombiec0rn/zombie-service-diff').fingerprint({
  id: 'yolo',
  image: 'zombiec0rn/yolo:1.0.0'
})
// => 0c0d289f8743bac4719509a04261c3f2d359a58d 
```

## Changelog

### 2.0.0

* Support for the `fingerprint` property

### 1.0.0

* Initial release
