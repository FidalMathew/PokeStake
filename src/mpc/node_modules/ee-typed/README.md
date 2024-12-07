# ee-typed

TypeScript version of the nodejs `events` module.

## Usage

This is just the built-in nodejs event emitter with type information added, so you can use it like the [official docs](https://nodejs.org/api/events.html):

```ts
// Add the -ts suffix to the imported module
import { EventEmitter } from 'ee-typed';

// Specify the types of all your events
type Events = {
  event(): void;
};

// Include the Events type as a generic below
class MyEmitter extends EventEmitter<Events> {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');

myEmitter.emit(42);
// Error: Argument of type '42' is not assignable to parameter of
//        type '"event"'. ts(2345)
```

## Based on `typed-emitter`

This package builds on [`typed-emitter`](https://www.npmjs.com/package/typed-emitter).

`typed-emitter` has the advantage of being a type-only library, so it adds zero bytes to your bundle. However, that approach requires you to import the regular `events` library and then cast to the provided type.

This library provides the actual class with the appropriate cast, which I feel is simpler. Worthy of the few dozen bytes it adds to your bundle I'd say.
