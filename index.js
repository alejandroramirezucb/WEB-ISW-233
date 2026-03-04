import { CommandExecutor, Command, Commands } from './services/Command.js';
import { TodoList } from './services/todoList.js';

globalThis.DOM = {};

const DOM = globalThis.DOM;

document.addEventListener('DOMContentLoaded', () => {
  DOM.todoList = document.getElementById('todo-list');
  DOM.addBtn = document.getElementById('add-btn');
  DOM.todoInput = document.getElementById('todo-input');

  const renderTodoList = () => {
    while (DOM.todoList.firstChild) {
      DOM.todoList.removeChild(DOM.todoList.firstChild);
    }

    TodoList.getInstance().items.forEach((item) => {
      const li = document.createElement('li');

      const span = document.createElement('span');
      span.textContent = item.text;

      const btn = document.createElement('button');
      btn.textContent = 'Eliminar';
      btn.classList.add('delete-btn');
      btn.setAttribute('data-todo', item.text);

      li.appendChild(span);
      li.appendChild(btn);
      DOM.todoList.appendChild(li);
    });
  };

  TodoList.getInstance().addObserver(renderTodoList);

  DOM.addBtn.addEventListener('click', () => {
    const cmd = new Command(Commands.ADD);
    CommandExecutor.execute(cmd);
  });

  DOM.todoList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const text = event.target.getAttribute('data-todo');
      const cmd = new Command(Commands.DELETE, text);
      CommandExecutor.execute(cmd);
    }
  });
});
