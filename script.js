let inputTag = document.querySelector("#text"),
  addButton = document.querySelector(".addTask"),
  menuButton = document.querySelector(".settings"),
  taskTitle = document.querySelector(".task p"),
  deleteButton = document.querySelector("#delete"),
  tasksContainer = document.querySelector(".tasks");

const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
console.log(tasks);

function markAsDone(element){
  element.classList.add("done");
}
function showTasks() {
  document.querySelectorAll(".task").forEach((task) => task.remove());
  tasks.forEach((task, index) => {
    let newTask = `  <div class="task" onclick = "markAsDone(this)">
    <p>${task.taskHeader}</p>
    <div class="settings">
        <span id="delete" onclick="deleteTask(${index})">Delete</span>
    </div>
  </div>`;
    tasksContainer.innerHTML += newTask;
  });
  if (tasks.length === 0) {
    tasksContainer.style.opacity = 0;
  } else {
    tasksContainer.style.opacity = 1;
  }
}
showTasks();

function deleteTask(taskId) {
  // let confirmDeletion = confirm(
  //   "Are you sure you that want to delete this Task?"
  // );
  // if (!confirmDeletion) return;
  
  document.querySelector(".popup-box").style.display = "flex";
  document.querySelector("#accept").onclick = () =>{
    tasks.splice(taskId, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
    document.querySelector(".popup-box").style.display = "none";
  }
  document.querySelector("#reject").onclick = () =>{
    document.querySelector(".popup-box").style.display = "none";
  }
}

addButton.onclick = (e) => {
  let inputValue = inputTag.value;
  e.preventDefault();
  if (inputValue) {
    let titleOfTask = inputTag.value;
    let taskInfo = {
      taskHeader: titleOfTask,
    };
    tasks.push(taskInfo);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
    inputTag.value = "";
    inputTag.focus();
  }
};
