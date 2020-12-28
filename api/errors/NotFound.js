class NotFound extends Error {
  constructor() {
    super("Não encontrado!");

    this.name = "NotFound";
    this.id = 0;
  }
}

module.exports = NotFound;
