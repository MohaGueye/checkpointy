import test from 'node:test';
import assert from 'node:assert/strict';

import { createLibraryApp } from '../src/app.js';

test('premium members receive a longer borrowing window', () => {
  const app = createLibraryApp();
  const member = app.memberFactory.create({
    name: 'Premium Member',
    email: 'premium@example.com',
    memberType: 'PREMIUM',
  });

  const policy = app.loanPolicyFactory.forMember(member);
  const dueDate = policy.getDueDate(new Date('2026-01-01T00:00:00Z'));

  assert.equal(policy.getMaxBooks(member), 6);
  assert.equal(dueDate.toISOString().slice(0, 10), '2026-01-22');
});

test('standard members are limited to a small number of active loans', () => {
  const app = createLibraryApp();
  const book = app.bookFactory.create({
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '9780261103344',
    availableCopies: 2,
  });
  const member = app.memberFactory.create({
    name: 'Regular Member',
    email: 'regular@example.com',
    memberType: 'STANDARD',
  });

  app.libraryService.registerMember(member);
  app.libraryService.addBook(book);

  for (let i = 0; i < 3; i += 1) {
    app.libraryService.borrowBook({ member, bookId: book.id });
  }

  assert.throws(
    () => app.libraryService.borrowBook({ member, bookId: book.id }),
    /borrowing limit/i,
  );
});

test('inventory events trigger observer notifications', () => {
  const app = createLibraryApp();
  const calls = [];
  const trackingObserver = {
    update(eventName, payload) {
      calls.push({ eventName, bookTitle: payload?.book?.title ?? null });
    },
  };

  app.eventDispatcher.subscribe(trackingObserver);

  const book = app.bookFactory.create({
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '9780735211292',
    availableCopies: 1,
  });

  app.libraryService.addBook(book);
  app.inventory.checkout(book.id);

  assert.equal(calls.some((entry) => entry.eventName === 'BOOK_ADDED'), true);
  assert.equal(calls.some((entry) => entry.eventName === 'BOOK_CHECKED_OUT'), true);
});
