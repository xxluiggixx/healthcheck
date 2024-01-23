require('dotenv').config()
const hosts = require('./config/hosts');
const { Server, mail, date, slackSendMessage } = require('./helpers');

const EMAIL_ENABLE = Boolean(process.env.SMTP_ENABLE) || false;
const SLACK_ENABLE = Boolean(process.env.SLACK_ENABLE) || false;
const VSPHERE_ENABLE = Boolean(process.env.VSPHERE_ENABLE) || false;
const TIME_INTERVAL = process.env.TIME_INTERVAL || 60000;


async function main() {
    let msg = ''
    console.log(`#################### INICIO ${date()} ####################`)
    for(const host of hosts){
        const server = new Server(host);
        const status = await server.status()
        if(!status){
            console.error(`Status: ${status}, restart service at host: ${server.name} - ${date()}`);
            server.restartService()
            msg += `*${server.name}* `
        }
    }
    notification(msg);
};

const notification = async (msg) =>{
    if((EMAIL_ENABLE) && (msg!='')){
        await mail(msg);
    }
    if((SLACK_ENABLE) && (msg!='')){
        if((VSPHERE_ENABLE)){
            const vm = new Vsphere();
            const {power_state} = vm;
            if (power_state == 'POWERED_ON'){
                slackSendMessage(`${msg} has been restart at *${date()}*`);
            }
        }else{
            slackSendMessage(`${msg} has been restart at *${date()}*`);
        }
    }
}

setInterval(main,TIME_INTERVAL);
