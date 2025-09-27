// console.log("Hello jay");
// alert("Hello /from alert");

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks'))  || [];

function saveTasks(){
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function renderTasks(){

    //clear the current list
    taskList.innerHTML = '';

    //loop through the tasks array ans create HTML for each task
    tasks.forEach(function(task){
        const newTaskItem = document.createElement('li');

        if(task.completed){
            newTaskItem.classList.add('completed');
        }

        //create span tag
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = task.text;
        taskTextSpan.className = 'task-text';

        //create complete button
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.className = 'complete-btn';
        //Add a data attribute to store the task's ID on the button itself
        completeBtn.dataset.id = task.id;

        //create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        //Add a data attribute yo store the task's ID on the button itself
        deleteBtn.dataset.id = task.id;

        //Append everthing to the <li>
        newTaskItem.appendChild(taskTextSpan);
        newTaskItem.appendChild(completeBtn);
        newTaskItem.appendChild(deleteBtn);

        //Append the <li> to the <ul>
        taskList.appendChild(newTaskItem);
    });

    saveTasks();
}

function addTask(){
    const taskText = taskInput.value.trim();

    if(taskText === ''){
        alert("Please enter a task before adding!")
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    }

    // Add the new task object to the array
    tasks.push(newTask);

    //re-render the entire list based on the updated array
    renderTasks();

    //Clear Input
    taskInput.value = '';

}

//Event listener
addTaskBtn.addEventListener('click', addTask);

//Event Delegation
taskList.addEventListener('click', function(event){

    //click item is "complete" button 
    //event.target is the specific thing that was clicked
    if(event.target.classList.contains('complete-btn')){
        const taskId = Number(event.target.dataset.id);

        //Find the task in the array with the matching ID
        const foundTask = tasks.find(function(task){
            return task.id === taskId;
        });

        //If we found the task, toggle its 'complete' status
        if(foundTask){
            foundTask.completed = !foundTask.completed;
            //Re-render the list to reflect the change
            renderTasks();
        }
    }

    if(event.target.classList.contains('delete-btn')){
        const taskId = Number(event.target.dataset.id);
        
        const taskIndex = tasks.findIndex(function(task){
            return task.id === taskId;
        });

        if(taskIndex !== -1){
            tasks.splice(taskIndex, 1);
            renderTasks();
        }
    }

});

renderTasks();