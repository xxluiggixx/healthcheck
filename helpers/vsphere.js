//require('dotenv').config()
const axios = require('axios');
const { exec } = require('node:child_process');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
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
        const data = response.data.value[0];
        return data;
    }

    async VmReboot(vmId){
        const token = await this.getToken();
        exec(`curl --location --request POST 'https://${ this.endPoint }/api/vcenter/vm/${ vmId }/power?action=reset' \
            --header 'vmware-api-session-id: ${ token }'`, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        })
    }
}

module.exports = Vsphere;