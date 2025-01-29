const fs = require("fs");

module.exports = class FileSystem {
  static read(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) return resolve(data);
        if (data.toString() == "" || !this.isJSON(data)) {
          data = undefined;
          return resolve(data);
        }

        resolve(JSON.parse(data));
      });
    });
  }

  static write(path, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, JSON.stringify(content), err => {
        fs.mkdir("./tasks", e => {
          return resolve(undefined);
        });
        if (err) return resolve(undefined);
        resolve("Done");
      });
    });
  }

  static clear(path) {}

  static isJSON(data) {
    try {
      JSON.parse(data);
    } catch (e) {
      return false;
    }
    return true;
  }
};
