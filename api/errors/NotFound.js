class NotFound extends Error {
  constructor(value) {
    super(`${value} não encontrado!`);

    this.name = "NotFound";
    this.id = 0;
  }
}

module.exports = NotFound;
