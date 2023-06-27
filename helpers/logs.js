
const writeLog = (serverName)=>{
    const PATH = '/var/log/tomcat-validate/IWS-Tomcat.log';
    let fecha = new Date();
    let message=`${fecha} se reincio el: ${serverName}\n`;
    fs.appendFile(PATH, message, (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
}


module.exports = {
        writeLog
}

