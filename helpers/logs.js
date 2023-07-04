
const path = require('node:path');
const fs = require('fs')

const writeLog = (serverName)=>{
    const PATH = path.join(`${path.resolve()}`,'logs/logs.log');
    let fecha = new Date();
    let message=`${fecha} Has been restart: ${serverName}\n`;
    fs.appendFile(PATH, message, (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
}


module.exports = {
        writeLog
}

