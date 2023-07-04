//const { exec } = require('node:child_process');
const util = require('node:util');
const  exec  = util.promisify(require('node:child_process').exec);
const { writeLog } = require('./logs');

class Server {
    constructor(server) {
        const {name, host, username, port, available} = server
        this.name = name;
        this.host = host;
        this.port = port;
        this.username = username;
        this.available = available;
    }

    async statusServer() {
          if (this.available){  
            const CMD = `nc -zv ${this.host} ${this.port}`;
            try {
              const { error, stdout, stderr } = await exec(CMD);
              console.log(stderr);
              return true;
            } catch (error) {
              //console.error(error);
              return false;
            }
          }
          return true;
      }
      

    restartService(){
        exec(`ssh ${this.host} -i ${process.env.PathPrivateKey} "${process.env.SERVICE_CMD}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        writeLog(this.name)
        });
    }  

}

module.exports = Server;