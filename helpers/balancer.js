const { exec } = require('node:child_process');
const { command } = require('./ssh');
const { writeLog } = require('./logs');

class Balancer {
    constructor(server) {
        const {name, host, username, port, tomcats} = server
        this.name = name;
        this.host = host;
        this.username = username;
        this.tomcats = tomcats;
    }

    async statusTomcat() {
        const tomcatError = [];
        for (const tomcat of this.tomcats) {
          if (tomcat.available) {
            const { host, port } = tomcat;
            const CMD = `nc -zv ${host} ${port}`;
            try {
              let data = await command(CMD, this.host);
              data = data.toString('utf8').split(/[:]/);
              if (data[1]) {
                tomcatError.push(tomcat);
              }
            } catch (error) {
              console.error(error);
            }
          }
        }
        return tomcatError;
      }
      

    restartTomcat(tomcat){
        const { host } = tomcat;
        
        console.log(tomcat, host)
        //exec(`ssh ${host} "${process.env.SERVICE_TOMCAT}"`);
        //bash /opt/Tools/tomcat-validate-nginx/restarttomcat.sh '${host}'
        exec(`ssh ${host} -i ${process.env.PathPrivateKey} "${process.env.SERVICE_TOMCAT}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        writeLog(tomcat.name)
        });
    }  

}

module.exports = Balancer;