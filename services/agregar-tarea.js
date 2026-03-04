import { Command } from './Command.js';

export class AgregarTarea extends Command {
  constructor(lista, elemento) {
    super();
    this.lista = lista;
    this.elemento = elemento;
  }

  ejecutar() {
    this.lista.appendChild(this.elemento);
  }

  deshacer() {
    this.elemento.remove();
  }
}
