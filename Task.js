const FileSystem = require("./FileSystem");
const CommandLine = require("./CommandLine");
const TASK_FILE_PATH = "./tasks/task.json";
const { v4 } = require("uuid");

module.exports = class Task {
  static initiateTaskFile(initTasks) {
    return new Promise(resolve => {
      const initData = {
        tasks: initTasks ?? [],
      };
      FileSystem.write(TASK_FILE_PATH, initData);
      resolve(initData);
    });
  }

  static addTask(tasks, task) {
    FileSystem.write(
      TASK_FILE_PATH,
      this.sortData({
        tasks: [...tasks.tasks, { ...task, id: v4() }],
      })
    );
  }

  static sortData(data) {
    return {
      tasks: data.tasks
        .sort((a, b) => {
          return (
            this.getPriorityIndex(a.priorityLevel) -
            this.getPriorityIndex(b.priorityLevel)
          );
        })
        .reverse(),
    };
  }

  static getPriorityIndex(text) {
    switch (text) {
      case "low":
        return 0;
      case "medium":
        return 1;
      case "high":
        return 2;
      default:
        return 3;
    }
  }
  static async printTasks() {
    const tasks = await FileSystem.read(TASK_FILE_PATH);
    if (!tasks || tasks?.tasks.lentgh == 0) {
      CommandLine.print("\nThere are no pending tasks");
      return;
    }
    CommandLine.print("\nYour pending tasks are: ");
    tasks?.tasks?.forEach(el => {
      CommandLine.print(
        `\n|||||||||||||||||||||||||||||||||||||||\nTask ID: ${el.id}\nTask: ${
          el.task
        }\nDescription: ${el.description ?? "No description"}\nPriority: ${
          el.priorityLevel ?? "Least"
        }\n`
      );
    });
  }
};
