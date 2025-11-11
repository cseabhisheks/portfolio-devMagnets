const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASSWORD
    }
})
const sendEmail = async (message) => {
    const info = await transporter.sendMail(message)
    console.log(info)
    return info.response;
}
module.exports = sendEmail