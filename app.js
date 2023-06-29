require('dotenv').config()
const servers = require('./config/servers');
const { Balancer, mail } = require('./helpers');


function main() {
    servers.forEach( async (bal) => {
        const balancer = new Balancer(bal);
        const tomcatErrors = await balancer.statusTomcat();
        if(tomcatErrors.length !== 0 ){
            console.log(tomcatErrors)
            let msg;
            for(const tomcat of tomcatErrors){
                msg += `- ${tomcat.name} \n`
                balancer.restartTomcat(tomcat);
            }
            if(process.env.SMTP_ENABLE){
                //send mail
                await mail(msg);
            }
        }
    })
};

main();