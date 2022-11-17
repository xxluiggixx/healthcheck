const {command} = require('./ssh');

class Balancer {
    constructor(server) {
        this.server = server;
    }

    stateTomcat(ip='192.168.50.41'){
        return new Promise(async (resolve, reject) => {
          const CMD =`nc -zv ${ip} 8200`;
          try {
              let data = await command(CMD, this.server);
              data = data.toString('utf8').split(/[:]/);
            //Devuelve True || false dependiendo si trae data
              resolve(data[1]);
          } catch (err) {
              console.error(err);
          }
        })
    }

}

module.exports = Balancer;