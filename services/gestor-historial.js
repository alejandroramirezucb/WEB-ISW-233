export class GestorHistorial {
  historial = [];

  push(estado) {
    this.historial.push(estado);
  }

  pop() {
    if (this.historial.length === 0) return null;

    return this.historial.pop();
  }
}
