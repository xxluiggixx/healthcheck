const { Client } = require('ssh2');

class  Tomcat{

    constructor(server){
        this.server = server;
    }

    command(command){
      return new Promise((resolve, reject) => {
        
        const conn = new Client();

        conn.on('ready', () => {
                console.log('Client :: ready');
                conn.exec(command, (err, stream) => {
                    if (err) throw err;
                    stream.on('close', (code, signal) => {
                      conn.end();
                    }).stdout.on('data', (data) => {
                        console.log('STDOUT: '+ data);
                    }).stderr.on('data', (data) => {
                      console.log('STDERR:' +data.toString('utf8'));
                      resolve(data);     
                    });
                  });
              }).connect({host:this.server.host,
                          post: this.server.port,
                          username:this.server.username,
                          password:this.server.password,
                          algorithms: {
                            kex: [
                              "diffie-hellman-group1-sha1",
                              "ecdh-sha2-nistp256",
                              "ecdh-sha2-nistp384",
                              "ecdh-sha2-nistp521",
                              "diffie-hellman-group-exchange-sha256",
                              "diffie-hellman-group14-sha1"
                            ],
                            cipher: [
                              "3des-cbc",
                              "aes128-ctr",
                              "aes192-ctr",
                              "aes256-ctr",
                              "aes128-gcm",
                              "aes128-gcm@openssh.com",
                              "aes256-gcm",
                              "aes256-gcm@openssh.com"
                            ],
                            serverHostKey: [
                              "ssh-rsa",
                              "ecdsa-sha2-nistp256",
                              "ecdsa-sha2-nistp384",
                              "ecdsa-sha2-nistp521"
                            ],
                            hmac: [
                              "hmac-sha2-256",
                              "hmac-sha2-512",
                              "hmac-sha1"
                            ]
                        } });  
      })
       
    }

    state(ip='192.168.50.41'){
    return new Promise(async (resolve, reject) => {
      const CMD =`nc -zv ${ip} 8200`;
      try {
          let data = await this.command(CMD);
          data = data.toString('utf8').split(/[:]/);
          if(data[1]) {
              console.log(data[1]);
              resolve(true);
          } else {
              console.log('No tiene errores');
              resolve(false);
          }
      } catch (err) {
          console.error(err);
      }
    })
    }

    restartService(){
      const CMD = '/root/tomcatService.sh';
      this.command(CMD);
    }
            
}

module.exports = Tomcat