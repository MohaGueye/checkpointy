import { Entity } from '../core/Entity.js';
import { normalizeMemberType, validateRequired } from '../utils/validators.js';

export class Member extends Entity {
  constructor({ id, name, email, memberType = 'STANDARD' } = {}) {
    super(id);

    validateRequired(name, 'Name');
    validateRequired(email, 'Email');

    this.name = name;
    this.email = email;
    this.memberType = normalizeMemberType(memberType);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name,
      email: this.email,
      memberType: this.memberType,
    };
  }
}
