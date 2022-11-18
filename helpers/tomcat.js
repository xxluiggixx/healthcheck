const {command} = require('./ssh');

class  Tomcat{

    constructor(server){
        this.server = server;
    }

    restartTomcat(){
      const { host } = this.server;
      //exec(`ssh ${host} "/root/tomcatService.sh"`);
      exec(`bash /opt/Tools/tomcat-validate-nginx/restarttomcat.sh '${host}'`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      });
    }    
}

module.exports = Tomcat