let task = document.getElementById("TaskForm");
let x = document.getElementById("container");
let y = document.getElementById("addbtn");
let z = document.getElementById("progesscontainer");
let removetask = document.getElementById("removeme");

function displayForm() {
    if (task.id === "TaskForm") {
        x.style.backgroundColor = "grey";
        
        task.style.display = "block";
        task.classList.add("taskformbox");
        y.style.display = "none";
    } else {
        alert("Refresh Page please");
    }
}

function submitform(event) {
    event.preventDefault();

    let taskName = document.getElementById("taskName").value;
    let taskDate = document.getElementById("taskDate").value;
    let taskPriority = document.getElementById("taskPriority").value;
    let description = document.getElementById('description').value;
    let taskcontainer1 = document.getElementById("taskcontainer");

    let addeddiv = document.createElement("div");
    
    addeddiv.className = 'task-box';
    addeddiv.setAttribute("draggable", true);
    addeddiv.innerHTML = `<strong>Task:</strong> ${taskName} <br> 
                          <strong>Date:</strong> ${taskDate} <br> 
                          <strong>Description:</strong> ${description}<br>
                          <strong>Priority:</strong> ${taskPriority}<br>
                          <button  id="removeme" onclick=" removeTask(event)"> Remove</button>`;

    // Set border color based on priority
    if (taskPriority === "low") {
        addeddiv.style.borderLeft = "5px solid green";
    } else if (taskPriority === "medium") {
        addeddiv.style.borderLeft = "5px solid orange";
    } else if (taskPriority === "high") {
        addeddiv.style.borderLeft = "5px solid red";
    }

    // Add drag event listeners
    addeddiv.addEventListener("dragstart", dragStart);
    addeddiv.addEventListener("dragend", dragEnd);

    taskcontainer1.appendChild(addeddiv);

    document.getElementById("TaskForm").reset();
    if (task.id === "TaskForm") {
        task.style.display = "none";
        y.style.display = "block";
    }
}
function removeTask(event) {
     console.log(event.target)
     const taskElement = event.target.parentElement;  
     taskElement.remove(); 
 }

function remove() {
    if (task.id === "TaskForm" || removetask.id === "removeme") {
        task.style.display = "none";
        removetask.style.display = "block";
    } else {
        alert("Refresh Page please");
    }
}

// Global variable to hold the dragged task element
let draggedTask = null;

// Drag-and-drop event handlers
function dragStart(event) {
    draggedTask = event.target;
    setTimeout(() => {
        event.target.style.display = "none"; // Hide task temporarily during drag
    }, 0);
}

function dragEnd(event) {
    setTimeout(() => {
        draggedTask.style.display = "block"; // Make the task visible again after drop
        draggedTask = null; // Clear the global dragged task reference
    }, 0);
}

// Allow drop over containers
function allowDrop(event) {
    event.preventDefault();
}

// Handle the task drop
function drop(event) {
    event.preventDefault();
    if (draggedTask) {
        // Append the dragged task to the new container
        event.target.appendChild(draggedTask);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Get the task containers and make them droppable
    let taskContainers = document.getElementsByClassName("TODOLIST");
    for (let i = 0; i < taskContainers.length; i++) {
        taskContainers[i].addEventListener("dragover", allowDrop);
        taskContainers[i].addEventListener("drop", drop);
    }
});
