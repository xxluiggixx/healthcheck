const { Client } = require('ssh2');


function command(cmd, server){
    return new Promise((resolve, reject) => {

    const conn = new Client();
    const { host, port, username, password } = server;

    conn.on('ready', () => {
            console.log('Client :: ready');
            conn.exec(cmd, (err, stream) => {
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
        }).connect({host,
                    port,
                    username,
                    password,
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


module.exports = {
    command
}