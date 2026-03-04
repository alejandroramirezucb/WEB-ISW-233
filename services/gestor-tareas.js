export class GestorTareas {
  constructor() {
    this.historial = [];
  }

  ejecutar(comando) {
    comando.ejecutar();
    this.historial.push(comando);
  }

  deshacer() {
    this.historial.pop()?.deshacer();
  }
}
