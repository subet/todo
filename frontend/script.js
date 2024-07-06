document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todo-form');
    const todoList = document.getElementById('todo-list');
    
    const apiUrl = '/todo/backend/index.php';

    async function fetchTodos() {
        const response = await fetch(apiUrl);
        const todos = await response.json();
        renderTodos(todos.todos);
    }

    function renderTodos(todos) {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = todo.complete ? 'complete' : '';
            li.dataset.id = todo.id;

            const title = document.createElement('span');
            title.textContent = `${todo.title}: ${todo.content}`;
            li.appendChild(title);

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.onclick = () => toggleComplete(todo.id);
            li.appendChild(completeButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteTodo(todo.id);
            li.appendChild(deleteButton);

            todoList.appendChild(li);
        });
    }

    async function addTodo(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, complete: false })
        });

        const newTodo = await response.json();
        fetchTodos();
        todoForm.reset();
    }

    async function toggleComplete(id) {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ complete: true })
        });

        const updatedTodo = await response.json();
        fetchTodos();
    }

    async function deleteTodo(id) {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();
        fetchTodos();
    }

    todoForm.addEventListener('submit', addTodo);
    fetchTodos();
});
