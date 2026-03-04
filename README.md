# WEB-ISW-233

Simple todo app with Vanilla JS

You have a code that works but it has several problems

What if we want to:

- Save the list locally?
  Usaría el patron Strategy, para que cada tipo de almacenamiento sea una estrategia. Podria tambien usar Singleton para que exista una sola instancia del gestor de almacenamiento.

- Add keyboard shortcuts?
  Usaría el patron Command. Cada atajo de teclado invocaría el comando que necesite, asi no se duplica la logica.

- Make it more complex in the future?
  Usaria mas patrones de diseño, por ejemplo Observer si hay cambios de estado o Factory para crear varios tipos de tareas. Lo dificil seria mantener el codigo desacoplado aunque se añadan mas funcionalidades.

- Create an undo action?
  Ya lo hice, se uso los patrones Command y Memento. Cuando se lama al botón Deshacer se recupera el último comando y se revierte.

Your task:

- Decouple the project using design patterns!!!
- Be creative make your to answer the previous questions
