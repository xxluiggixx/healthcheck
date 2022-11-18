const  servers  = require('./config/server');
const Balancer = require('./helpers/balancer');
const Tomcat = require('./helpers/tomcat');
const fs = require('fs');

function writeLog(serverName){
    const PATH = '/var/log/tomcat-validate/IWS-Tomcat.log';
    let fecha = new Date();
    let message=`${fecha} se reincio el: ${serverName}\n`;
    fs.appendFile(PATH, message, (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
}

function main() {
    const balancer = new Balancer(servers[0]);

    servers.forEach(async server => {
        const { type, name, host_int } = server;

        if (type === "Tomcat"){
            if(await balancer.stateTomcat(host_int)) {
                let tomcat = new Tomcat(server);
                tomcat.restartTomcat();
                console.log(`Reiniciar ${name}`);
                writeLog(name);
            }
        }
    });

}


    main();


