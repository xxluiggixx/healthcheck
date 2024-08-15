require('dotenv').config()
const {app} = require('./app');
const TIME_INTERVAL = process.env.TIME_INTERVAL || 60000; // 1min
const { Server, date, notification, Vsphere } = require('./helpers');


//setInterval(app,TIME_INTERVAL);
 const mostrar = async () => {
    const vmv = new Vsphere();
    const  { vm } = await vmv.VmStatus("WIN10-PJS")
    const resp = await vmv.VmReboot(vm)
    console.log(resp)
 }

 mostrar()