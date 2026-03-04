import { GestorTareas } from './services/gestor-tareas.js';
import { AgregarTarea } from './services/agregar-tarea.js';
import { EliminarTarea } from './services/eliminar-tarea.js';
import { EditarTarea } from './services/editar-tarea.js';

const gestor = new GestorTareas();
const input = document.querySelector('#todo-input');
const lista = document.querySelector('#todo-list');
const btnAgregar = document.querySelector('#add-btn');

const btnDeshacer = document.createElement('button');
btnDeshacer.textContent = 'Deshacer';
btnAgregar.insertAdjacentElement('afterend', btnDeshacer);

function crearElemento(texto) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.className = 'tarea__texto';
  span.textContent = texto;

  const btnEditar = document.createElement('button');
  btnEditar.textContent = 'Editar';

  btnEditar.addEventListener('click', () => {
    const nuevo = prompt('Editar tarea:', span.textContent);

    if (nuevo?.trim()) gestor.ejecutar(new EditarTarea(li, nuevo.trim()));
  });

  const btnEliminar = document.createElement('button');
  btnEliminar.textContent = 'Eliminar';

  btnEliminar.addEventListener('click', () =>
    gestor.ejecutar(new EliminarTarea(li)),
  );

  li.append(span, btnEditar, btnEliminar);
  return li;
}

btnAgregar.addEventListener('click', () => {
  const texto = input.value.trim();

  if (!texto) return;

  gestor.ejecutar(new AgregarTarea(lista, crearElemento(texto)));
  input.value = '';
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') btnAgregar.click();
});

btnDeshacer.addEventListener('click', () => gestor.deshacer());
