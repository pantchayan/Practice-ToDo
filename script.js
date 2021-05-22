let toggleBtnArr = document.querySelectorAll(".toggle-btn");
let listContainer = document.querySelector(".list");
let plusBtn = document.querySelector(".plus-btn");

let currentList = "Task-List";

let updateTaskArr = (e) => {
  let taskId = e.path[1].attributes[1].value;
  let task = e.target.innerText;
  console.log(task, taskId);
  let stat = tasksArr[taskId].status;
  tasksArr[taskId] = {
    id: Number(taskId),
    status: stat,
    content: task,
  };
  myStorage.todoTasks = JSON.stringify(tasksArr);
};

let shiftToComplete = (e) => {
  let taskId = e.path[1].attributes[1].value;
  if (tasksArr[taskId].status === "completed") {
    return;
  }
  tasksArr[taskId].status = "completed";
  loadList("pending");
  myStorage.todoTasks = JSON.stringify(tasksArr);
};

let deleteTask = (e) => {
  let taskId = e.path[1].attributes[1].value;
  let currStatus =
    tasksArr[taskId].status === "completed" ? "completed" : "pending";

  tasksArr.splice(taskId, 1);
  // if (index > -1) {
  //   array.splice(index, 1);
  // }
  for (let i = taskId; i< tasksArr.length; i++) {
    console.log(tasksArr[i]);
    let newId = tasksArr[i].id - 1;
    tasksArr[i].id = newId;
  }
  loadList(currStatus);
  myStorage.todoTasks = JSON.stringify(tasksArr);
};

let loadList = (category) => {
  listContainer.innerHTML = "";
  console.log(category);
  let icon =
    category === "completed"
      ? "assignment_turned_in"
      : "check_box_outline_blank";

  for (let i = 0; i < tasksArr.length; i++) {
    let task = tasksArr[i];
    if (task.status == category) {
      let taskDiv = document.createElement("div");
      taskDiv.innerHTML = `
         <div class="task" id=${task.id}>
           <span class="material-icons done-btn"> ${icon} </span>
           <div class="task-content" contenteditable="true">${task.content}</div>
           <span class="material-icons delete-btn"> dangerous </span>
         </div>`;

      listContainer.appendChild(taskDiv);
    }
  }

  let doneBtnArr = document.querySelectorAll(".done-btn");
  for (let i = 0; i < doneBtnArr.length; i++) {
    doneBtnArr[i].addEventListener("click", (e) => shiftToComplete(e));
  }

  let deleteBtnArr = document.querySelectorAll(".delete-btn");
  for (let i = 0; i < deleteBtnArr.length; i++) {
    deleteBtnArr[i].addEventListener("click", (e) => deleteTask(e));
  }

  let taskContents = document.querySelectorAll(".task-content");
  for (let i = 0; i < taskContents.length; i++) {
    taskContents[i].addEventListener("blur", (e) => updateTaskArr(e));
  }
};

loadList("pending");

for (let i = 0; i < toggleBtnArr.length; i++) {
  toggleBtnArr[i].addEventListener("click", (e) => {
    e.target.classList.remove("inactive-btn");
    toggleBtnArr[(i + 1) % toggleBtnArr.length].classList.add("inactive-btn");

    let category = e.target.classList[0];
    loadList(category);
  });
}

plusBtn.addEventListener("click", (e) => {
  loadList("pending");
  let taskDiv = document.createElement("div");
  let taskId = tasksArr.length;
  taskDiv.innerHTML = `
         <div class="task" id="${taskId}">
           <span class="material-icons done-btn"> check_box_outline_blank </span>
           <div class="task-content" contenteditable="true">Enter new task</div>
           <span class="material-icons delete-btn"> dangerous </span>
         </div>`;

  listContainer.appendChild(taskDiv);
  tasksArr.push({
    id: taskId,
    status: "pending",
    content: "Enter new task",
  });
  taskDiv.click();
  myStorage.todoTasks = JSON.stringify(tasksArr);

  toggleBtnArr[0].classList.remove("inactive-btn");
  toggleBtnArr[1].classList.add("inactive-btn");
  loadList("pending");
});
