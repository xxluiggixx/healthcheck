const hosts = require('./config/hosts');
const { Server, date, notification } = require('./helpers');
const VSPHERE_ENABLE = Boolean(process.env.VSPHERE_ENABLE) || false;


async function app() {
    let msg = ''
    console.log(`#################### INICIO ${date()} ####################`)
    for(const host of hosts){
        const server = new Server(host);
        const status = await server.status()
        if(!status){
            if((VSPHERE_ENABLE)){
                const vm = new Vsphere();
                const {power_state} = vm.VmStatus(server.name);
                if (power_state == 'POWERED_ON'){
                    msg += restart(status,server)
                }
            }else {
                msg += restart(status,server)
            }
        }
    }
    notification(msg);
};

const restart = (status, server) => {
    console.error(`Status: ${status}, restart service at host: ${server.name} - ${date()}`);
    server.restartService()
    return `*${server.name}* `
}

module.exports = { app } ;
