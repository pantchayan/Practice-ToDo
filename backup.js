let myStorage = window.localStorage;

console.log(myStorage.todoTasks);
let tasksArr = [];
if (myStorage.todoTasks != undefined) {
       tasksArr = JSON.parse(myStorage.todoTasks);

} else {
       console.log("here");
  tasksArr = [
    {
      id: 0,
      content: "Eat Food",
      status: "pending",
    },
    {
      id: 1,
      content: "Listen music",
      status: "completed",
    },
    {
      id: 2,
      content: "Make Notes",
      status: "pending",
    },
    {
      id: 3,
      content: "Do class",
      status: "completed",
    },
  ];
       console.log(tasksArr);
}
