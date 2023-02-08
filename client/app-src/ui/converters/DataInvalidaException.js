export class DataInvalidaException extends ApplicationException {
  constructor() {
    super(`A data deve obdecer o formato "dd/aa/mmmm"`);
  }
}
