const FileSystem = require("./FileSystem");
const CommandLine = require("./CommandLine");
const Task = require("./Task");
const TASK_FILE_PATH = "./tasks/task.json";

main();

async function main() {
  Task.printTasks();
  let data = await FileSystem.read(TASK_FILE_PATH);
  if (!data) data = await Task.initiateTaskFile();
  let response = await CommandLine.ask(
    "What do you want to perform?(create/delete/exit):"
  );
  if (response == "create") promtTaskCreate(data);
  if (response == "delete") promptTaskDelete(data);
}

async function promtTaskCreate(data) {
  let task = await CommandLine.ask("Enter your task to add");
  if (task === "" || task == null) return;
  let taskData = {
    task,
    description: null,
    priorityLevel: null,
  };

  let askDescription = await CommandLine.ask(
    "Do you want to add a description?(yes/no)"
  );
  if (askDescription === "yes") {
    taskData.description = await CommandLine.ask("Write your description");
  }

  let askPriorityLevel = await CommandLine.ask(
    "Do you want to set a priority level?(yes/no)"
  );
  if (askPriorityLevel === "yes") {
    let priorityIndex = await CommandLine.ask(
      "Priority level? \n0:low\n1:medium\n2:high"
    );
    switch (priorityIndex) {
      case "0":
        taskData.priorityLevel = "low";
        break;
      case "1":
        taskData.priorityLevel = "medium";
        break;
      case "2":
        taskData.priorityLevel = "high";
        break;
      default:
        console.log("Not a valid priority level");
        break;
    }
  }
  Task.addTask(data, taskData);
  CommandLine.print("Task added");
}

async function promptTaskDelete(data) {
  let response = await CommandLine.ask(
    "Enter the ID of the task you would like to delete:"
  );
  if (response && response == "") {
    console.log("Enter a valid ID");
    return;
  }

  if (!data?.tasks?.find(taskObj => taskObj.id == response)) {
    console.log("Task Not Found");
    return;
  }
  let tasks = data?.tasks?.filter(taskObj => taskObj.id != response);
  Task.initiateTaskFile(tasks);
}
