const taskInput = document.getElementById('task_input');
const addTaskButton = document.getElementById('add_task_button');
const taskContainer = document.getElementById('task_container');
const taskList = document.getElementById('task_list');
const noPendingTask = document.getElementById('no_pending_tasks_message');

// load tasks from localstorage
document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromLocalStorage();
});

// main event 
addTaskButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (taskInput.value === '') {
        if (!taskContainer.querySelector('.text-red-500')) {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Please enter a task';
            errorMessage.className = 'text-red-500 mt-4 text-xl';
            taskContainer.appendChild(errorMessage);
        }
        return;
    } else {
        const existingErrorMessage = taskContainer.querySelector('.text-red-500');
        if (existingErrorMessage) {
            taskContainer.removeChild(existingErrorMessage);
        }
    }

    addTask();
});

// functions

function addTask() {
    const individualTask = document.createElement('li');
    const taskText = document.createElement('p');
    const task = taskInput.value;

    individualTask.className = 'text-xl mt-2 flex flex-grow items-center line-clamp-2 bg-[#595b63] p-2 rounded-lg shadow-md';
    taskText.textContent = task;
    taskText.className = 'flex-grow';

    individualTask.appendChild(taskText);
    addDeleteButton(individualTask);
    addCompleteButton(individualTask);

    taskList.appendChild(individualTask);
    taskInput.value = '';
    deletePendingTasks(noPendingTask);
    saveTasksToLocalStorage();
}

function addDeleteButton(individualTask) {
    const button = document.createElement('button');
    button.className = 'ml-2 flex-shrink-0';

    const img = document.createElement('img');
    img.src = '../delete_icon.png';
    img.alt = 'Delete task';
    img.className = 'w-6 h-6 mt-1 hover:scale-105 transition-transform duration-300 ease-in-out relative';

    button.appendChild(img);
    individualTask.appendChild(button);

    button.addEventListener('click', () => {
        individualTask.remove();
        if (taskList.children.length === 0) {
            taskList.appendChild(noPendingTask);
        }
        saveTasksToLocalStorage();
    });
}

function addCompleteButton(individualTask) {
    const button = document.createElement('button');
    button.className = 'ml-2 flex-shrink-0';

    const img = document.createElement('img');
    img.src = '../complete_icon.png';
    img.alt = 'Complete task';
    img.className = 'w-6 h-6 flex-shrink-0 mt-1 hover:scale-105 transition-transform duration-300 ease-in-out relative';

    button.appendChild(img);
    individualTask.appendChild(button);

    button.addEventListener('click', () => {
        individualTask.classList.add('line-through', 'text-green-500');
        if (individualTask.classList.contains('line-through')) {
            button.remove();
        }
        saveTasksToLocalStorage();
    });
}

function deletePendingTasks(noPendingTask) {
    if (taskList.children.length > 0) {
        noPendingTask.remove();
    }
}

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#task_list li').forEach(taskItem => {
        const taskText = taskItem.querySelector('p').textContent;
        const isCompleted = taskItem.classList.contains('line-through');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []; 

    if (savedTasks.length > 0) {
        noPendingTask.remove(); 
    }

    // create saved tasks
    savedTasks.forEach(task => {
        const individualTask = document.createElement('li');
        const taskText = document.createElement('p');

        individualTask.className = 'text-xl mt-2 flex flex-grow items-center line-clamp-2 bg-[#4E5166] p-2 rounded-lg shadow-md';
        taskText.textContent = task.text;
        taskText.className = 'flex-grow';

        if (task.completed) {
            individualTask.classList.add('line-through', 'text-green-500');
        }

        individualTask.appendChild(taskText);
        addDeleteButton(individualTask);
        if (!task.completed) addCompleteButton(individualTask);

        taskList.appendChild(individualTask);
    });

    if (savedTasks.length === 0) {
        taskList.appendChild(noPendingTask);
    }
}

