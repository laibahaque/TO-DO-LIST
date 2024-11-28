class Task {
    constructor(title, description, priority, category) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.category = category;
    }
}

class ToDoList {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveToLocalStorage();
    }

    getTasksByPriority(priority) {
        if (priority === 'all') return this.tasks;
        return this.tasks.filter(task => task.priority === priority);
    }

    saveToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}

const toDoList = new ToDoList();

// Add Task Event
document.getElementById('task-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const category = document.getElementById('category').value;

    const task = new Task(title, description, priority, category);
    toDoList.addTask(task);

    this.reset();
    alert('Task added successfully!');
});

// Filter Tasks
document.querySelectorAll('.btn-filter').forEach(button => {
    button.addEventListener('click', function () {
        const priority = this.dataset.priority;
        const tasks = toDoList.getTasksByPriority(priority);
        showFilteredTasks(tasks);
    });
});

// Show Filtered Tasks in Modal
function showFilteredTasks(tasks) {
    const modal = document.getElementById('task-modal');
    const filteredTasksDiv = document.getElementById('filtered-tasks');

    filteredTasksDiv.innerHTML = tasks.map(task => `
        <div class="task">
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Priority: ${task.priority} | Category: ${task.category}</p>
        </div>
    `).join('');

    modal.classList.remove('hidden');
}

// Close Modal
document.querySelector('.modal-close').addEventListener('click', function () {
    document.getElementById('task-modal').classList.add('hidden');
});
