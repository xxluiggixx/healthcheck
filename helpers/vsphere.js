const axios = require('axios');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
class Vsphere {
    constructor(){
        this.endPoint = process.env.VSPHERE_ENDPOINT ;
        this.user = process.env.USERNAME ;
        this.pass = process.env.PASS ;
    }

    async getToken(){

        const {data} = await axios.post(`https://${this.endPoint}/api/session`, {}, {
                                                auth: {
                                                    username: this.user,
                                                    password: this.pass
                                                }
                                            })
        return data;                                         
    }

    async VmStatus(vmName){
        //Return status of VM (ON/OFF)
        const token = await this.getToken();
        axios.get(`https://${this.endPoint}/rest/vcenter/vm`,{
            params: {
                'filter.names': vmName
            },
            headers:{
                'vmware-api-session-id': token
            }
        })
        .then(response =>{
            return response.data.value[0]
        })
        .catch(error => {
            console.error(error);
        });
    }
}

module.exports = Vsphere;