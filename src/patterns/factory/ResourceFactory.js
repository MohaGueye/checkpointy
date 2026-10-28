import { Book } from '../domain/Book.js';
import { Member } from '../domain/Member.js';

export class Factory {
  create() {
    throw new Error('Factory.create() must be implemented by a concrete factory.');
  }
}

export class BookFactory extends Factory {
  create(input) {
    return new Book(input);
  }
}

export class MemberFactory extends Factory {
  create(input) {
    return new Member(input);
  }
}
