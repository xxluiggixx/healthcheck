const { exec } = require('node:child_process');
const { command } = require('./ssh');
const { writeLog } = require('./logs');

class Balancer {
    constructor(server) {
        const {name, host, username, port, tomcats} = server
        this.name = name;
        this.host = host;
        this.username = username;
        this.port = port;
        this.tomcats = tomcats;
    }

    async statusTomcat(){
        const tomcatError = await this.tomcats.map(async (tomcat) =>{
            if(tomcat.available){
                const { host_int, port } = tomcat;
                const CMD =`nc -zv ${host_int} ${port}`
                try {
                    let data = await command(CMD, this.host);
                    data = data.toString('utf8').split(/[:]/);
                    if (data[1]){
                        return tomcat
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        })
        return tomcatError
    }

    restartTomcat(tomcats){
        const { host } = this.server;
        //exec(`ssh ${host} "/root/tomcatService.sh"`);
        exec(`bash /opt/Tools/tomcat-validate-nginx/restarttomcat.sh '${host}'`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        writeLog()
        });
      }  

}

module.exports = Balancer;