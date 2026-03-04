import { Command } from './Command.js';

export class EditarTarea extends Command {
  constructor(elemento, nuevoTexto) {
    super();
    this.elemento = elemento;
    this.nuevoTexto = nuevoTexto;
    this.textoAnterior = null;
  }

  ejecutar() {
    const span = this.elemento.querySelector('.tarea__texto');
    this.textoAnterior = span.textContent;
    span.textContent = this.nuevoTexto;
  }

  deshacer() {
    const span = this.elemento.querySelector('.tarea__texto');
    span.textContent = this.textoAnterior;
  }
}
