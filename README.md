# Checkpointy Library Management System

This project demonstrates a modular, reusable JavaScript library management system built with Node.js and ES modules.

## Architecture

- `src/domain/` contains core domain models: `Book`, `Member`, and `Loan`
- `src/services/` contains the operational layer: `Inventory` and `LibraryService`
- `src/patterns/` contains reusable design patterns:
  - `factory/ResourceFactory.js` implements the Factory pattern
  - `strategy/loan.js` implements the Strategy pattern for borrowing rules
  - `observer/Observer.js` implements the Observer pattern for events
- `src/config/dependencies.js` demonstrates dependency injection via a lightweight container
- `src/utils/validators.js` centralizes reusable validation logic

## Features

- ES module-based structure for maintainability
- Dependency injection for testability and flexibility
- Factory pattern to create typical domain objects consistently
- Strategy pattern for varying loan policies (standard vs premium members)
- Observer pattern for inventory or loan events
- Clear separation between domain, persistence-like service logic, and infrastructure concerns

## Quick start

```bash
npm install
npm test
npm start
```

## Example usage

```js
import { createLibraryApp } from './src/app.js';

const app = createLibraryApp();
const book = app.bookFactory.create({
  title: 'Clean Code',
  author: 'Robert C. Martin',
  isbn: '9780132350884',
  availableCopies: 3,
});
const member = app.memberFactory.create({
  name: 'Ada',
  email: 'ada@example.com',
  memberType: 'PREMIUM',
});

app.libraryService.registerMember(member);
app.libraryService.addBook(book);
const loan = app.libraryService.borrowBook({ member, bookId: book.id });
console.log(loan);
```
