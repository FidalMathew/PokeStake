import { EventEmitter as NodeEventEmitter } from 'events';
import TypedEmitter, { EventMap } from 'typed-emitter';

export const EventEmitter = NodeEventEmitter as {
  new <T extends EventMap>(): TypedEmitter<T>;
};
