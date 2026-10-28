import { Entity } from '../core/Entity.js';
import { validateRequired, validatePositiveNumber } from '../utils/validators.js';

export class Book extends Entity {
  constructor({
    id,
    title,
    author,
    isbn,
    publisher = 'Unknown',
    category = 'General',
    availableCopies = 1,
  } = {}) {
    super(id);

    validateRequired(title, 'Title');
    validateRequired(author, 'Author');
    validateRequired(isbn, 'ISBN');
    validatePositiveNumber(availableCopies, 'availableCopies');

    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.publisher = publisher;
    this.category = category;
    this.availableCopies = availableCopies;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      title: this.title,
      author: this.author,
      isbn: this.isbn,
      publisher: this.publisher,
      category: this.category,
      availableCopies: this.availableCopies,
    };
  }
}
