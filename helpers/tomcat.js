const {command} = require('./ssh');

class  Tomcat{

    constructor(server){
        this.server = server;
    }

    async restartService(){
      const CMD = '/root/tomcatService.sh';
      await command(CMD, this.server);
    }
        
}

module.exports = Tomcat