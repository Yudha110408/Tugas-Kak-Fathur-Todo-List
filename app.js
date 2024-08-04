document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.querySelector('.todo-input');
  const todoButton = document.querySelector('.todo-button');
  const todoList = document.querySelector('.todo-list');
  const filterOption = document.querySelector('.filter-todos');

  todoButton.addEventListener('click', function (e) {
    e.preventDefault();

    // Create and append new todo
    const todoDiv = createTodoElement(todoInput.value);
    todoList.appendChild(todoDiv);

    // Add to local storage
    saveLocalStorage({ text: todoInput.value, completed: false });

    todoInput.value = '';
  });

  filterOption.addEventListener('change', filterTodos);

  function createTodoElement(todoText, completed = false) {
    // Create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    if (completed) {
      todoDiv.classList.add('completed');
    }

    // Create List Item
    const newTodo = document.createElement('li');
    newTodo.innerText = todoText;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Create Completed Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // Create Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    // Event Listeners for buttons
    completedButton.addEventListener('click', () => {
      todoDiv.classList.toggle('completed');
      updateLocalStorage();
    });

    deleteButton.addEventListener('click', () => {
      todoDiv.remove();
      updateLocalStorage();
    });

    return todoDiv;
  }

  function saveLocalStorage(todo) {
    let todos = getLocalStorage();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function updateLocalStorage() {
    const todos = [];
    document.querySelectorAll('.todo').forEach((todoDiv) => {
      todos.push({
        text: todoDiv.querySelector('.todo-item').innerText,
        completed: todoDiv.classList.contains('completed'),
      });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function getLocalStorage() {
    return local;
  }
});
