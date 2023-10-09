require('dotenv').config()
const hosts = require('./config/hosts');
const { Server, mail, date, slackSendMessage } = require('./helpers');

const EMAIL_ENABLE = Boolean(process.env.SMTP_ENABLE) || false;
const SLACK_ENABLE = Boolean(process.env.SLACK_ENABLE) || false;
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
            msg += `${server.name} \n`
        }
    }
    notification(msg);
};

const notification = async (msg) =>{
    if((EMAIL_ENABLE) && (msg!='')){
        await mail(msg);
    }
    if((SLACK_ENABLE) && (msg!='')){
        slackSendMessage(`Tomcat <b>${msg}</b> has been restart at ${date()}`);
    }
}

setInterval(main,TIME_INTERVAL);
