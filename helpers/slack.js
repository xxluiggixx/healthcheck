const axios = require('axios');

const slackSendMessage = async (msg) =>{
    const url = process.env.URL_SLACK;
    const payload = {
    text: `${msg} :bomb:`
    };

    axios.post(url, payload, {
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(response => {
        console.log('Respuesta de Slack:', response.data);
    })
    .catch(error => {
        console.error('Error al enviar la solicitud a Slack:', error);
    });
}

module.exports = slackSendMessage;