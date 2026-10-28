import { BookFactory, MemberFactory } from './patterns/factory/ResourceFactory.js';
import { createDependencyContainer } from './config/dependencies.js';
import { LibraryService } from './services/LibraryService.js';

export function createLibraryApp(overrides = {}) {
  const container = createDependencyContainer();

  const bookFactory = overrides.bookFactory ?? new BookFactory();
  const memberFactory = overrides.memberFactory ?? new MemberFactory();
  const libraryService = new LibraryService({
    inventory: overrides.inventory ?? container.inventory,
    eventDispatcher: overrides.eventDispatcher ?? container.eventDispatcher,
    loanPolicyFactory: overrides.loanPolicyFactory ?? container.loanPolicyFactory,
  });

  return {
    bookFactory,
    memberFactory,
    libraryService,
    inventory: libraryService.inventory,
    eventDispatcher: libraryService.eventDispatcher,
    loanPolicyFactory: libraryService.loanPolicyFactory,
  };
}
