# Event Emitter Class

**Event Emitter Class** is a generic event emitter from which to extend.
It provides default methods that allows rules base transitioning between states.

# Usage

## Installation

```shell
npm install --production  state-machine-class
# use "--production" to avoid installing unnecessary development dependencies
```

## In Program

```javascript
const EventEmitter = require("event-emitter-class");
export default  class extends EventEmitter{
    constructor(){
        super();
        //define methods here
    }
}
```

# API


## Constructor

```javascript
new EventEmitter(events);
```

### events (Optional)
One may pass a pre-populate set of event handlers to an even emitter.
See ## Instance Methods => ### Bulk.

Example:Constructor
```javascript
const ee = new EventEmitter();
```
## Instance Methods

### EventEmitter#emit(eventName:string,...payload<any>)
Cause EventEmitter to emit an event
triggers all event handlers listening for specific events
triggers all one-time handlers listening for specific events and remove them
triggers _onmessage functon, if defined

Example:emit
```javascript
ee.emit("number-event", 1);
```

### Aliases for EventEmitter#emit
    - emitEvent
    - dispatchEvent
    - dispatch

### EventEmitter#on(eventName:string, handler:function)
Add EventListener to emitter

Example:on
```javascript
const handler = function(payload){consolee.log(payload);};
ee.on("number-event", handler);
```

### Aliases for EventEmitter#on
    - addEventListener

### EventEmitter#off(eventName:string, handler:function)
Remove EventListener from emitter

Example:off
```javascript
ee.off("number-event", handler);
```

### EventEmitter#once(eventName:string, handler:function)
Add EventListener to emitter that will only fire once

Example:once
```javascript
const handler = function(payload){consolee.log(payload);};
ee.once("number-event", handler);
```

### EventEmitter#offOnce(eventName:string, handler:function)
Remove EventListener from emitter

Example:offOnce
```javascript
ee.offOnce("number-event", handler);
```

### EventEmitter#bulk(events:object)
Remove EventListener from emitter

Example:bulk
```javascript
ee.bulk({...});
```

### EventEmitter#onmessage (setter)
Sets onmessage function

Example:bulk
```javascript
ee.onmessage = (eventName, ...payload)=>{console.log(eventName,...payload)}
```

# Development

## NPM Scripts

### test
runs tests

## Testing
Tests can be run with `node test`, `npm run test`, or `npm test`

### TAP
Because test output in the standard TAP format, there are a number of existing utilities that exist to format the output

Example: HTML Output
```shell
npm test | npx  tap-html --out ./tap-html.html
```

Example: Graphical Output
```shell
npm test | npx tap-nyan
 17  -_-_-_-_-_-_-_-_-_,------,
 0   -_-_-_-_-_-_-_-_-_|   /\_/\
 0   -_-_-_-_-_-_-_-_-^|__( ^ .^)
     -_-_-_-_-_-_-_-_-  ""  ""
 Pass!
```
