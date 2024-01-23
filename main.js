require('dotenv').config()
const {app} = require('./app');
const TIME_INTERVAL = process.env.TIME_INTERVAL || 60000; // 1min


setInterval(app,TIME_INTERVAL);

