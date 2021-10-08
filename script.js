document.getElementById("add-task").addEventListener("click", function () {
  var taskInput = document.getElementById("task-value");
  if (taskInput.value !== ""){
    addTask(taskInput.value);
  }
  taskInput.value = "";
});

var taskInput = document.getElementById("task-value");
taskInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13 && taskInput.value !== "") {
    addTask(taskInput.value);
    taskInput.value = "";
  }
})


function addTask(taskValue) {
  var task = document.createElement("li");
  task.classList.add("task");
  task.classList.add("fill");
  task.setAttribute("draggable", "true");
  task.addEventListener("dragstart", dragStart);
  task.addEventListener("dragend", dragEnd);

  var taskContent = document.createElement("div");
  taskContent.classList.add("task-content");
  taskContent.innerText = taskValue;

  var trash = document.createElement("div");
  trash.classList.add("trash");
  trash.innerHTML = `<i class="far fa-times-circle"></i>`;
  trash.addEventListener("click", removeTask);

  var edit = document.createElement("div");
  edit.classList.add("edit");
  edit.innerHTML = `<i class="far fa-edit"></i>`;
  edit.addEventListener("click", editTask);

  task.appendChild(taskContent);
  task.appendChild(trash);
  task.appendChild(edit);

  var tasks = document.getElementById("tasks-added");
  tasks.insertBefore(task, tasks.childNodes[0]);
}
function removeTask(event) {
  // event represents the remove button
  // Access the <ul> list by moving 2 levels up
  var tasks = event.target.parentNode.parentNode.parentNode;
  // Access the <li> element which is the direct parent
  var task = event.target.parentNode.parentNode;
  tasks.removeChild(task);
}

function editTask(event) {
  var task = event.target.parentNode.parentNode;
  var taskContent = task.getElementsByClassName("task-content");
  var newTask = taskContent.innerHTML;
  var newInput = document.createElement("input");
  newInput.setAttribute("value", newTask);
  newInput.classList.add("new-task-input");
  taskContent.replace(taskValue, newInput);
}

// DRAG & DROP

// A global variable to store the selected task
var task;

function dragStart(event) {
  event.target.classList.add("hold");
  task = event.target;
  setTimeout(function () {
    event.target.classList.add("invisible");
  }, 0);
}

function dragEnd(event) {
  event.target.classList.remove("invisible");
}
function dragEnter(event) {
  if (event.target.classList.contains("dropzone")) {
    event.target.classList.add("hovered");
  }
}

function dragOver(event) {
  event.preventDefault(); // https://stackoverflow.com/a/35428657
}

function dragLeave(event) {
  event.target.classList.remove("hovered");
}

function dragDrop(event) {
  event.target.classList.remove("hovered");
  // event represents the column
  // Add the task to the right child. Inspect the element to find the ul is index 3 in childnodes.
  event.target.childNodes[3].append(task);
}

var dropzones = document.getElementsByClassName("dropzone");

for (var index = 0; index < dropzones.length; index++) {
  const dropzone = dropzones[index];
  dropzone.addEventListener("dragenter", dragEnter);
  dropzone.addEventListener("dragover", dragOver);
  dropzone.addEventListener("dragleave", dragLeave);
  dropzone.addEventListener("drop", dragDrop);
}