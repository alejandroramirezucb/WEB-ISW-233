import { Command } from './Command.js';

export class EliminarTarea extends Command {
  constructor(elemento) {
    super();
    this.elemento = elemento;
    this.padre = null;
    this.siguiente = null;
  }

  ejecutar() {
    this.padre = this.elemento.parentNode;
    this.siguiente = this.elemento.nextSibling;
    this.elemento.remove();
  }

  deshacer() {
    this.padre.insertBefore(this.elemento, this.siguiente);
  }
}
