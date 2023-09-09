//const { exec } = require('node:child_process');
const util = require('node:util');
const  exec  = util.promisify(require('node:child_process').exec);
const { writeLog } = require('./logs');
const axios = require('axios');
const { CLIENT_RENEG_LIMIT } = require('node:tls');

const LOG_ENABLE = Boolean(process.env.LOG_ENABLE) || false;

class Server {
    constructor(server) {
        const {name, host, username, port, available, url} = server
        this.name = name;
        this.host = host;
        this.url = url;
        this.port = port;
        this.username = username;
        this.available = available;
    }

    async status() {
          if (this.available){
            try {
              const response = await axios({
                headers: { Accept: 'text/html, application/json, text/plain, */*' },
                url: this.url,
                method: 'get'
              })
              console.log(response);
              const {status} = response;
              if(status && (status>=200 && status<300)){
                console.log(`servidor ${this.name}:  OK`);
                return true
              }else{
                console.log('Bad request');
              }
              
            } catch (error) {
              console.log(`servidor ${this.name}:  ERROR`)
              return false
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
        if(LOG_ENABLE){
          writeLog(this.name);
        }
        });
    }  

}

module.exports = Server;