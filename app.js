require('dotenv').config()
const servers = require('./config/servers');
const { Balancer } = require('./helpers');


function main() {
    servers.forEach( async (bal) => {
        const balancer = new Balancer(bal);
        const tomcatErrors = await balancer.statusTomcat();
        console.log('Antes del if: ',tomcatErrors);
        if(tomcatErrors){
            console.log('Reiniciar tomcats', tomcatErrors)
            // balancer.restartTomcat(tomcatErrors);
        }
    });
}


main();