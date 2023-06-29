"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_DOMAIN,
  port: process.env.SMTP_PORT,
  secure: Boolean(process.env.SMTP_SECURE) || false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  }
});

const mail =  async (msg) => {

    const timestamp =new Date().getTime(); // Obtener el valor de tiempo en milisegundos
    const date = new Date(timestamp);
    const year = date.getFullYear(); // Obtener el año (por ejemplo, 2023)
    const month = date.getMonth() + 1; // Obtener el mes (ten en cuenta que los meses son indexados desde 0, por lo que se agrega 1)
    const day = date.getDate(); // Obtener el día
    const hours = date.getHours(); // Obtener las horas
    const minutes = date.getMinutes(); // Obtener los minutos
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"HealCheck Tomcat 🧨" ${process.env.SMTP_EMAIL_FROM}`, // sender address
    to: process.env.SMTP_EMAIL_TO, // list of receivers
    subject: `Tomcat has been reset`, // Subject line
    text: `Tomcat <b>${msg}</b> has been restart at ${formattedDate}`, // plain text body
    html: `Tomcat <b>${msg}</b> has been restart at ${formattedDate}`, // html body
  });
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

module.exports = mail;

