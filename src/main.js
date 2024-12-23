const taskInput = document.getElementById('task_input');
const addTaskButton = document.getElementById('add_task_button');
const taskContainer = document.getElementById('task_container');
const taskList = document.getElementById('task_list');
const noPendingTask = document.getElementById('no_pending_tasks_message');


// main event listener
addTaskButton.addEventListener('click', (e) => {
    e.preventDefault(); 

    // check if task input is empty and display error message
    if (taskInput.value === '') {
        if (!taskContainer.querySelector('.text-red-500')) {
            errorMessage = document.createElement('p');
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
    // tasks 
    addTask();

    addDeleteButton();
});

// functions

function addTask() {
    const individualTask = document.createElement('li');
    const taskText = document.createElement('p');
    const task = taskInput.value;

    individualTask.className = 'text-2xl mt-2 flex flex-grow items-center justify-center';
    taskText.textContent = task;

    individualTask.appendChild(taskText);
    addDeleteButton(individualTask);

    taskList.appendChild(individualTask);
    taskInput.value = '';
    deletePendingTasks(noPendingTask);
}

function addDeleteButton(individualTask) {
    const button = document.createElement('button');
    button.className = 'ml-4'; 

    const img = document.createElement('img');
    img.src = '../images/delete_icon.png'; 
    img.alt = 'Delete task'; 
    img.className = 'w-6 h-6 mt-2 hover:scale-105 transition-transform duration-300 ease-in-out'; 

    button.appendChild(img);
    individualTask.appendChild(button);

    button.addEventListener('click', () => {
        individualTask.remove();
        if (taskList.children.length === 0) {
            taskList.appendChild(noPendingTask);
        }
    });
}

function deletePendingTasks(noPendingTask) {
    if (taskList.children.length > 0) {
        noPendingTask.remove();
    }
}