export class EventDispatcher {
  constructor() {
    this.observers = new Set();
  }

  subscribe(observer) {
    this.observers.add(observer);
    return observer;
  }

  unsubscribe(observer) {
    this.observers.delete(observer);
    return observer;
  }

  emit(eventName, payload) {
    for (const observer of this.observers) {
      if (typeof observer.update === 'function') {
        observer.update(eventName, payload);
      }
    }
  }
}

export class ConsoleObserver {
  constructor(logger = console) {
    this.logger = logger;
  }

  update(eventName, payload) {
    this.logger.info?.(`[${eventName}]`, payload);
  }
}
