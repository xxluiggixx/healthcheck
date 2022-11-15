const  servers  = require('./config/server');
const Tomcat = require('./helpers/tomcat');

//const tomcat = new Tomcat(server[1]);

function main() {
    const tomcat = new Tomcat(servers[0]);

    servers.forEach(async server => {
        if (server.type === "Tomcat"){
            if(await tomcat.state(server.host_int)) {
                console.log(`Reiniciar ${server.name}`);
            } else{
                console.log('no reiniciar tomcat');
            }
        }
    });
}

main();

