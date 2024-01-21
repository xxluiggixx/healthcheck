const axios = require('axios');
class Vsphere {
    constructor(){
        this.endPoint = process.env.VSPHERE_ENDPOINT
        this.user = process.env.USER
        this.pass = process.env.PASS
        this.token = this.getToken()
    }

    getToken(){
        axios.post(`https://${this.endPoint}/api/session`, {}, {
                auth: {
                    username: this.user,
                    password: this.pass
                },
                httpsAgent: {
                    rejectUnauthorized: false 
                }
                })
                .then(response => {
                    return response.data
                })
                .catch(error => {
                    console.error(error);
                });
    }

    VmStatus(){
        //Return status of VM (ON/OFF)
    }

}

module.exports = Vsphere;