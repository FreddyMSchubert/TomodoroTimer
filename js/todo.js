const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();  // Prevents form submission in some cases
        const trimmedValue = e.target.value.trim();
        if (trimmedValue) {
            addTask(trimmedValue);
            e.target.value = '';
        }
    }
});

function addTask(taskText) {
    const task = document.createElement('div');
    task.className = 'task';
    task.draggable = true;
    task.innerHTML = `
        <input type="checkbox" onchange="toggleCompletion(this)">
        <span>${taskText}</span>
        <span class="deleteBtn" onclick="deleteTask(this)">X</span>
    `;
    taskList.appendChild(task);
}

function toggleCompletion(checkbox) {
    const task = checkbox.closest('.task');
    task.classList.toggle('completed');
}

function deleteTask(deleteBtn) {
    const task = deleteBtn.closest('.task');
    taskList.removeChild(task);
}

// Drag and Drop functionality
let draggedTask = null;
let placeholder = null;

taskList.addEventListener('dragstart', function(e) {
    draggedTask = e.target;

    placeholder = document.createElement('div');
    placeholder.className = 'placeholder';
    draggedTask.style.opacity = '0.5';
    taskList.insertBefore(placeholder, draggedTask);
});

taskList.addEventListener('dragover', function(e) {
    e.preventDefault();
    const hoveredTask = e.target.closest('.task');
    if (hoveredTask) {
        const rect = hoveredTask.getBoundingClientRect();
        const offset = e.clientY - rect.top - rect.height / 2;
        if (offset > 0) {
            hoveredTask.after(placeholder);
        } else {
            hoveredTask.before(placeholder);
        }
    }
});

taskList.addEventListener('dragend', function() {
    draggedTask.style.opacity = '';  // Reset opacity
    taskList.insertBefore(draggedTask, placeholder);
    taskList.removeChild(placeholder);
    draggedTask = null;
    placeholder = null;
});