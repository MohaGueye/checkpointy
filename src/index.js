export { createLibraryApp } from './app.js';
export { Book } from './domain/Book.js';
export { Member } from './domain/Member.js';
export { Loan } from './domain/Loan.js';
export { Inventory } from './services/Inventory.js';
export { LibraryService } from './services/LibraryService.js';
export { BookFactory, MemberFactory } from './patterns/factory/ResourceFactory.js';
export { StandardLoanPolicy, PremiumLoanPolicy, LoanPolicyFactory } from './patterns/strategy/loan.js';
export { EventDispatcher, ConsoleObserver } from './patterns/observer/Observer.js';

import { createLibraryApp } from './app.js';

const app = createLibraryApp();
const book = app.bookFactory.create({
  title: 'The Pragmatic Programmer',
  author: 'Andrew Hunt',
  isbn: '9780201616224',
  availableCopies: 2,
});

const member = app.memberFactory.create({
  name: 'Ariana',
  email: 'ariana@example.com',
  memberType: 'PREMIUM',
});

app.libraryService.registerMember(member);
app.libraryService.addBook(book);
const loan = app.libraryService.borrowBook({ member, bookId: book.id });

console.log('Demo loan created:', {
  loanId: loan.id,
  book: book.title,
  member: member.name,
  dueDate: loan.dueDate,
});
