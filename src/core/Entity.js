import { createId } from './id.js';

export class Entity {
  constructor(id = createId(this.constructor.name.toLowerCase())) {
    this.id = id;
  }

  toJSON() {
    return { id: this.id };
  }
}
