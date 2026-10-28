export class Repository {
  add() {
    throw new Error('Repository.add() must be implemented by a concrete repository.');
  }

  findById() {
    throw new Error('Repository.findById() must be implemented by a concrete repository.');
  }

  remove() {
    throw new Error('Repository.remove() must be implemented by a concrete repository.');
  }
}
