//require('dotenv').config()
const axios = require('axios');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
class Vsphere {
    constructor(){
        this.endPoint = process.env.VSPHERE_ENDPOINT ;
        this.user = atob(process.env.USERNAME) ;
        this.pass = atob(process.env.PASS) ;
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
        const response = await axios.get(`https://${this.endPoint}/rest/vcenter/vm`,{
                                            params: {
                                                'filter.names': vmName
                                            },
                                            headers:{
                                                'vmware-api-session-id': token
                                            }
                                        })
        const { power_state } = response.data.value[0];
        return power_state;
    }
}
/* const test = async () => {
    const vm = new Vsphere();
    const state = await vm.VmStatus('IW-saplic01');
    console.log(`VM State: ${state}`);
}
test() */

module.exports = Vsphere;