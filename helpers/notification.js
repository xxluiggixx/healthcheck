const  date = require('./date');
const { mail } = require('./mail');
const { slackSendMessage} = require('./slack');
const EMAIL_ENABLE = Boolean(process.env.SMTP_ENABLE) || false;
const SLACK_ENABLE = Boolean(process.env.SLACK_ENABLE) || false;

const notification = async (msg) =>{
    if(msg!=''){
        if (EMAIL_ENABLE) mail(msg);
        if (SLACK_ENABLE) slackSendMessage(`${msg} has been restart at *${date()}*`);
    }
}

module.exports = { notification }