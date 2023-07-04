
const path = require('node:path');
const fs = require('fs')

const writeLog = (serverName)=>{
  let PATH = path.join(`${path.resolve()}`,'logs')
  if (!fs.existsSync(path.join(`${path.resolve()}`,'logs'))) {
    fs.mkdirSync(path.join(`${path.resolve()}`,'logs'));
    console.log('created "logs" directory.');
  }
    PATH = path.join(`${path.resolve()}`,'logs/logs.log');
    let fecha = new Date();
    let message=`${fecha} Has been restart: ${serverName}\n`;
    fs.appendFile(PATH, message, (err) => {
        if (err) throw err;
        console.log('logs wrote');
      });
}


module.exports = {
        writeLog
}

