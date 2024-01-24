//const { exec } = require('node:child_process');
const util = require('node:util');
const  exec  = util.promisify(require('node:child_process').exec);
const { writeLog } = require('./logs');
const axios = require('axios');

const LOG_ENABLE = Boolean(process.env.LOG_ENABLE) || false;

class Server {
    constructor(server) {
        const {name, host, username, port, url} = server
        this.name = name;
        this.host = host;
        this.url = url;
        this.port = port;
        this.username = username;
    }

    async status() {
            try {
              const response = await axios({
                                headers: { Accept: 'text/html, application/json, text/plain, */*' },
                                url: this.url,
                                method: 'get'
                              })

              const {status} = response;

                if(status && (status>=200 && status<300)){
                  console.log(`servidor ${this.name}:  OK`);
                  return true
                }else{
                  console.log('Bad request');
                  return false
                }
            } catch (error) {
              console.log(`servidor ${this.name}:  ERROR`)
              return false
            }
      }
      
    restartService(){
        exec(`ssh ${this.host} -o PubkeyAcceptedKeyTypes=+ssh-rsa -o StrictHostKeyChecking=no -i ${process.env.PathPrivateKey} "${process.env.SERVICE_CMD}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        if(LOG_ENABLE){
          writeLog(this.name);
        }
        });
    }  

}

module.exports = Server;
