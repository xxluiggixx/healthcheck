require('dotenv').config()
const hosts = require('./config/hosts');
const { Server, mail } = require('./helpers');

const EMAIL_ENABLE = Boolean(process.env.SMTP_ENABLE) || false;


async function main() {
    let msg = ''
    for(const host of hosts){
        const server = new Server(host);
        const status = await server.statusServer()
        console.log(`Status: ${status} del host ${server.name}`);
        if(!status){
            console.log(`Status: ${status}, reinciando ${server.name}`)
            //server.restartService()
            msg += `${server.name} \n`
        }
    }
    if((EMAIL_ENABLE === true) && (msg!='')){
        await mail(msg);
    }
};

main();