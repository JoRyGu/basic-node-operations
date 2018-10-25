const fs = require('fs');
const sort = require('./quicksort');

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
  const userInputArray = userInput.split(' ');
  const command = userInputArray[0];

  switch (command) {
    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "sort":
      commandLibrary.sort(userInputArray.slice(1));
      break;
    case "wc":
      commandLibrary.wc(userInputArray.slice(1));
      break;
    case "uniq":
      commandLibrary.uniq(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      commandLibrary.errorHandler(command);
      break;
  }
}

const commandLibrary = {
  "echo": function(userInput) {
    done(userInput);
  },
  "cat": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if(err) throw err;
      done(data);
    });
  },
  "sort": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, 'utf8', (err, data) => {
      if(err) throw err;
      const fileArray = data.split('\n');
      const sortedFile = sort.quickSort(fileArray).join('\n');
      done(sortedFile);
    });
  },
  "wc": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, 'utf8', (err, data) => {
      if(err) throw err;
      const bytes = Buffer.byteLength(data, 'utf8');
      const words = data.replace(/\n/g, ' ').split(' ').length;
      const lines = data.trim().split('\n').length;
      done(`${lines}    ${words}    ${bytes}`);
    });
  },
  "uniq": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, 'utf8', (err, data) => {
      if(err) throw err;
      let fileArray = data.split('\n');
      let filteredArray = fileArray.filter((line, index, arr) => {
        return line !== arr[index - 1];
      })
      done(filteredArray.join('\n'));
    });
  },
  "head": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, 'utf8', (err, data) => {
      if(err) throw err;
      let fileArr = data.split('\n');
      let filteredArray = fileArr.filter(data => data !== '');
      let head = filteredArray.slice(0, 3);
      done(head.join('\n'));
    });
  },
  "tail": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, 'utf8', (err, data) => {
      if(err) throw err;
      let fileArr = data.split('\n');
      let filteredArray = fileArr.filter(data => data !== '');
      let tail = filteredArray.slice(filteredArray.length - 3, filteredArray.length);
      done(tail.join('\n'));
    });
  },
  "errorHandler": function(command) {
    done(`Command '${command}' not found.`);
  }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;