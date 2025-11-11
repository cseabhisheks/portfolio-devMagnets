// mail code
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
    auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASSWORD
    }
})
const sendEmail = async (message) => {

    console.log(process.env.MAIL)
    console.log(process.env.MAIL_PASSWORD)
    const info = await transporter.sendMail(message)
    console.log(info)
    return info.response;
}
module.exports = sendEmail

