export class LoanPolicyStrategy {
  getMaxBooks() {
    throw new Error('LoanPolicyStrategy.getMaxBooks() must be implemented.');
  }

  getDueDate() {
    throw new Error('LoanPolicyStrategy.getDueDate() must be implemented.');
  }

  calculateLateFee(daysOverdue) {
    return daysOverdue * 2;
  }
}

export class StandardLoanPolicy extends LoanPolicyStrategy {
  getMaxBooks() {
    return 3;
  }

  getDueDate(baseDate = new Date()) {
    const dueDate = new Date(baseDate);
    dueDate.setDate(dueDate.getDate() + 14);
    return dueDate;
  }

  calculateLateFee(daysOverdue) {
    return Math.max(0, daysOverdue) * 1.5;
  }
}

export class PremiumLoanPolicy extends LoanPolicyStrategy {
  getMaxBooks() {
    return 6;
  }

  getDueDate(baseDate = new Date()) {
    const dueDate = new Date(baseDate);
    dueDate.setDate(dueDate.getDate() + 21);
    return dueDate;
  }

  calculateLateFee(daysOverdue) {
    return Math.max(0, daysOverdue) * 1;
  }
}

export class LoanPolicyFactory {
  constructor() {
    this.strategies = {
      STANDARD: new StandardLoanPolicy(),
      PREMIUM: new PremiumLoanPolicy(),
    };
  }

  forMember(member) {
    const normalizedType = `${member?.memberType || 'STANDARD'}`.trim().toUpperCase();
    return this.strategies[normalizedType] || this.strategies.STANDARD;
  }
}
