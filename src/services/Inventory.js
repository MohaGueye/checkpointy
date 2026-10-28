import { EventDispatcher } from '../patterns/observer/Observer.js';

export class Inventory {
  constructor({ eventDispatcher = new EventDispatcher() } = {}) {
    this.eventDispatcher = eventDispatcher;
    this.books = new Map();
  }

  addBook(book) {
    if (this.books.has(book.id)) {
      throw new Error(`Book with ID ${book.id} already exists in inventory.`);
    }

    this.books.set(book.id, book);
    this.eventDispatcher.emit('BOOK_ADDED', { book });
    return book;
  }

  findById(bookId) {
    return this.books.get(bookId) ?? null;
  }

  findByIsbn(isbn) {
    return [...this.books.values()].find((book) => book.isbn === isbn) ?? null;
  }

  hasAvailableCopies(bookId) {
    const book = this.findById(bookId);
    return book ? book.availableCopies > 0 : false;
  }

  checkout(bookId) {
    const book = this.findById(bookId);
    if (!book) {
      throw new Error(`No book found for ID: ${bookId}`);
    }

    if (book.availableCopies < 1) {
      throw new Error(`No copies are available for book: ${book.title}`);
    }

    book.availableCopies -= 1;
    this.eventDispatcher.emit('BOOK_CHECKED_OUT', { book });
    return book;
  }

  checkin(bookId) {
    const book = this.findById(bookId);
    if (!book) {
      throw new Error(`No book found for ID: ${bookId}`);
    }

    book.availableCopies += 1;
    this.eventDispatcher.emit('BOOK_CHECKED_IN', { book });
    return book;
  }
}
