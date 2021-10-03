# PubSub
PubSub is a simple publisher subscriber eventbus or mixin intended to be usable in many different environments
# Installing
Using npm
```bash
npm i github:ksyri/pubsub#v2.0.1
```

# Methods

## new PubSub
Create new PubSub instance
```js
import PubSub from 'pubsub';
const pubSub = new PubSub;
```

## PubSub.mixin(object)
Add PubSub as mixin to `object`

### Adding as mixin to ES6 classes
```js
import PubSub from 'pubsub';

class Person {
    constructor(name) {
        this.name = name;
        PubSub.mixin(this);
    }
}
```
### Adding as mixin to prototypes
```js
const PubSub = require('pubsub');

function Person(name) {
    this.name = name;
    PubSub.mixin(this);
};
```

## PubSubInstance.subscribe(ev, callback)
Subscribe `callback` to event `ev`

The parameters of `callback` depend on the event `ev` and how you call [publish](##pubsub.publish(ev,-...args)) on it

Example
```js
personInstance.subscribe('hello', console.log);
```
Returns `this`

## PubSubInstance.unsubscribe(ev, callback)
Unsubscribe `callback` from event `ev`

Example
```js
const logMessage = msg => console.log(msg);
personInstance.subscribe('hello', logMessage);

personInstance.unsubscribe('hello', logMessage);
```
Returns `this`

## PubSubInstance.publish(ev, ...args)
Publish data `...args` to all listeners of event `ev`

This calls the callback functions subscribed to event `ev` with parameters `...args`

Example
```js
personInstance.publish('hello', {from: personInstance, message: 'Hello!'});
```
Since the arguments are passed with `...` any amount of arguments can be passed to the callbacks

Example
```js
personInstance.subscribe('test', console.log);
personInstance.publish('test', 1, 2, 3, 4, 5, 6, 7);
// calls "console.log(1, 2, 3, 4, 5, 6, 7)"
```
Returns `this`
