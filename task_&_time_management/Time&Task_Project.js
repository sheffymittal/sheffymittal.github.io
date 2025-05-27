//The function createTaskItem(task content) is responsible for creating a new task item in a to-do list.
function createTaskItem(taskContent, taskTime) {
    //This creates a new list item (<li></li>), which will represent a task in the to-do list.
    const li = document.createElement('li');
    // the newly created <li></li> is assigned a class name 'task-item',which can be used for styling via css
    li.classList.add('task-item');
    // The innerHTML property is used to insert
    //The taskcontent, which is the text of the task
    //A delete button next to the task, allowing users to remove it
    li.innerHTML= `${taskContent} | ${taskTime} <button class="deleteBtn">Delete</button>`;
    // The <li></li> is added to an existing HTML element with the ID taskListContainer, making it visible in the to-do list.
    document.getElementById('taskListContainer').appendChild(li);
    //Add event listener to the delete button
    li.querySelector('.deleteBtn').addEventListener('click', deleteTask);
}

// The addTask() function is responsible for adding new task to a to-do list
function addTask(){
    //It selects the HTML input element with the if od 'taskInput', whihc is where the user enters a task
    const taskInput = document.getElementById('taskInput');
    const timeInput = document.getElementById('timeInput');
    // .trim() removes any leading or trailing spaces to prevent empty or wodespace - only tasks from being added.
    const taskContent = taskInput.value.trim();
    const taskTime = timeInput.value;
    //This ensures that only non-empty tasks are added
    //This checks if both taskcontent and taskTime are not empty("")
    // the !== "" consition ensures that the user has provided input
    // the && (Logical AND) operator ensures thatboth conditions must be true for the code inside the block to execute 
    if (taskContent !== "" && taskTime !== ""){
        // call a function createTaskItem(taskContent)
        createTaskItem(taskContent, taskTime);
        taskInput.value = '';
        timeInput.value = '';
        }
    }

//this function deleteTask(event), is designed to remove a task item from the DOM when called
function deleteTask(event){
    const taskItem = event.target.parentElement;
    taskItem.remove();
}

//event listener for the 'add task' button
document.getElementById('addTaskBtn').addEventListener('click',addTask);
//Event Listener for pressing 'enter' to add a task
document.getElementById('taskInput').addEventListener('keypress',function(e){
    //This selects the HTML element with the ID 'taskinput', which is most likely an <input> field
    if(e.key === 'Enter'){
        addTask(); //The addTask() function is presumably a
    }
});
