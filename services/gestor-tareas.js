import { GestorHistorial } from './gestor-historial.js';

export class GestorTareas {
  constructor() {
    this.historial = new GestorHistorial();
  }

  ejecutar(comando) {
    comando.ejecutar();
    this.historial.push(comando);
  }

  deshacer() {
    const estado = this.historial.pop();

    if (estado) estado.deshacer();
  }
}
