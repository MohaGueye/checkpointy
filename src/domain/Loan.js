import { Entity } from '../core/Entity.js';
import { validateRequired } from '../utils/validators.js';

export class Loan extends Entity {
  constructor({
    id,
    bookId,
    memberId,
    dueDate,
    borrowedAt = new Date(),
    status = 'ACTIVE',
  } = {}) {
    super(id);

    validateRequired(bookId, 'Book ID');
    validateRequired(memberId, 'Member ID');
    validateRequired(dueDate, 'Due date');

    this.bookId = bookId;
    this.memberId = memberId;
    this.dueDate = dueDate;
    this.borrowedAt = borrowedAt;
    this.status = status;
  }

  isOverdue(referenceDate = new Date()) {
    return this.status === 'ACTIVE' && referenceDate > new Date(this.dueDate);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      bookId: this.bookId,
      memberId: this.memberId,
      dueDate: this.dueDate,
      borrowedAt: this.borrowedAt,
      status: this.status,
    };
  }
}
