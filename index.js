module.exports = class {
    // add event listener
    constructor(events) {
        if (events) {
            this.bulk(events);
        }
    }
    // add event handlers in bulk
    bulk(events) {
        if (events.handlers) {
            for (let eventName in events.handlers) {
                if (!events.handlers.hasOwnProperty(eventName)) {
                    continue;
                }
                const handlers = events.handlers[eventName];
                if (typeof handlers === "function") {
                    this.on(eventName, handlers)
                } else if (handlers[Symbol.iterator]) {
                    for (const handler of handlers) {
                        if (typeof handler === "function") {
                            this.on(eventName, handler);
                        }
                    }
                }
            }
        } else if (events.__UNSAFE_HANDLERS__) {
            this._handlers = events.__UNSAFE_HANDLERS__;
        }
        if (events.onceHandlers) {
            for (let eventName in events.onceHandlers) {
                if (!events.onceHandlers.hasOwnProperty(eventName)) {
                    continue;
                }
                const handlers = events.onceHandlers[eventName];
                if (typeof handlers === "function") {
                    this.on(eventName, handlers)
                } else if (handlers[Symbol.iterator]) {
                    for (const handler of handlers) {
                        if (typeof handler === "function") {
                            this.on(eventName, handler);
                        }
                    }
                }
            }
        } else if (events.__UNSAFE_ONCE_HANDLERS__) {
            this._onceHandlers = events.__UNSAFE_ONCE_HANDLERS__;
        }
        return this;
    }
    //add one-time event listener
    on(eventName, handler) {
        if (!eventName || typeof handler !== "function") {
            return;
        }
        this._handlers = this._handlers || {};
        this._handlers[eventName] = this._handlers[eventName] || new Set();
        this._handlers[eventName].add(handler);
        return this;
    }
    // alias for on
    addEventListener(...args) {
        return this.on(...args);
    }
    // remove specific event handler listening for a specifc event
    // remove all event handlers listening for a spceific event if handler is set to <true>.
    // remove all event handlers if eventName is set to <true>.
    off(eventName, handler) {
        if (eventName === true) {
            delete this._handlers;
            return;
        }
        if (handler === true) {
            this._handlers &&
                delete this._handlers[eventName];
        }
        this._handlers &&
            this._handlers[eventName] &&
            this._handlers[eventName].delete(handler);
        return this;
    }
    // alias for off
    removeEventListener(...args) {
        return this.off(...args);
    }
    //add one-time event listener
    once(eventName, handler) {
        if (!eventName || typeof handle !== "function") {
            return;
        }
        this._handlers = this._handlers || {};
        this._handlers[eventName] = this._handlers[eventName] || new Set();
        this._handlers[eventName].add(handler);
        return this;
    }
    // remove specific one-time event handler listening for a specifc event
    // remove all one-time event handlers listening for a spceific event if handler is set to <true>.
    // remove all one-time event handlers if eventName is set to <true>.
    removeOnce(eventName, handler) {
        if (eventName === true) {
            delete this._onceHandlers;
            return this;
        }
        if (handler === true) {
            this._onceHandlers &&
                delete this._onceHandlers[eventName];
            return this;
        }
        this._onceHandlers &&
            this._onceHandlers[eventName] &&
            this._onceHandlers[eventName].delete(handler);
        return this;
    }
    // triggers all event handlers listening for specific events
    // triggers all one-time handlers listening for specific events and remove them
    // triggers _onmessage functon, if defined
    emit(eventName, ...payload) {
        if (typeof this._onmessage === "function") {
            this._onmessage.call(this, eventName, ...payload);
        }
        if (this._handlers) {
            if (this._handlers[eventName]) {
                for (const handler of this._handlers[eventName]) {
                    handler.call(this, ...payload);
                }
            }
            if (this._onceHandlers) {
                if (this._onceHandlers[eventName]) {
                    for (const handler of this._onceHandlers[eventName]) {
                        handler.call(this, ...payload);
                    }
                    delete this._onceHandlers[eventName];
                }
            }
        }
        return this;
    }
    // alias for emit
    emitEvent(...args) {
        return this.emit(...args);
    }
    // alias for emit
    dispatchEvent(...args) {
        return this.emit(...args);
    }
    // alias for emit
    dispatch(...args) {
        return this.emit(...args);
    }
    // sets onmessage handler to monitor all
    // unsets onmessage handler if given value is not a function
    set onmessage(handler) {
        if (typeof handler === "function") {
            this._onmessage = handler;
        } else {
            delete this._onmessage;
        }
    }
}
