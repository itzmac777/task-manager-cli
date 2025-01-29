const readline = require("readline");

module.exports = class CommandLine {
  static ask(query) {
    const rl = readline.createInterface(process.stdin, process.stdout);
    return new Promise(resolve => {
      rl.question(`${query} `, answer => {
        resolve(answer);
        rl.close();
      });
    });
  }

  static print(data) {
    console.log(data);
  }
};
