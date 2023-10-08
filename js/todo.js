const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let dragged;

function addTask() {
    const taskText = taskInput.value;
    if (taskText) {
        const li = document.createElement('li');
        li.classList.add("task");

        // checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                li.classList.add('completed');
            } else {
                li.classList.remove('completed');
            }
        });
        li.appendChild(checkbox);

        const textContainer = document.createElement('div');
        textContainer.style.flexGrow = "1";
        textContainer.style.textAlign = "center";
        const span = document.createElement('span');
        span.textContent = taskText;
        textContainer.appendChild(span);
        li.appendChild(textContainer);

        const editButton = document.createElement('button');
        editButton.textContent = "(edit)";
        editButton.addEventListener('click', function() {
            span.contentEditable = "true";
            saveButton.style.display = "inline-block";
            deleteButton.style.display = "inline-block";
            editButton.style.display = "none";
        });
        li.appendChild(editButton);

        const saveButton = document.createElement('button');
        saveButton.textContent = "(save)";
        saveButton.style.display = "none";
        saveButton.addEventListener('click', function() {
            span.contentEditable = "false";
            saveButton.style.display = "none";
            deleteButton.style.display = "none";
            editButton.style.display = "inline-block";
        });
        li.appendChild(saveButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "(delete)";
        deleteButton.style.display = "none";
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
        });
        li.appendChild(deleteButton);

        li.draggable = true;
        li.addEventListener('dragstart', (event) => {
            dragged = event.target;
            event.target.style.opacity = 0;
        });
        li.addEventListener('dragend', (event) => {
            event.target.style.opacity = "";
        });
        taskList.appendChild(li);
        taskInput.value = '';
    }
}

taskList.addEventListener('dragover', (event) => {
    event.preventDefault();
});

taskList.addEventListener('dragenter', (event) => {
    if (event.target.className === 'task') {
        const rect = event.target.getBoundingClientRect();
        const y = event.clientY - rect.top;
        if (y < rect.height / 2) {
            taskList.insertBefore(dragged, event.target);  // Place before the item being dragged over
        } else {
            taskList.insertBefore(dragged, event.target.nextSibling);  // Place after
        }
    }
});

document.getElementById('taskInput').addEventListener('keydown', function(e) {
    if (e.code === 'Enter') {
        addTask();
        e.preventDefault();  // Prevents the default action to avoid any unforeseen mischief
    }
});
