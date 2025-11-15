const ejs = require('ejs')
const { contactModel, donateModel, mentorshipModel } = require('./model')
const Sendmail = require('../utilities/email')
const contact = async (req, res) => {
    try {
        const { name, mail, message } = req.body
        await contactModel.create({ name, mail, message })
        const html = await ejs.renderFile('./view/mailTemplate.ejs', { name, form: 'contact', message })
        const mssg = {
            from: process.env.MAIL,
            to: mail,
            subject: 'Contact Form',
            replyTo: mail,
            html,

        }
        const mailresponse = await Sendmail(mssg)

        res.json({ success: true, mailresponse })
    } catch (err) {
        res.json({ err, success: false })
    }
}
const donate = async (req, res) => {
    try {
        const { name, mail, message, phoneNo, amount } = req.body
        await donateModel.create({ name, mail, message, phoneNo, amount })
        const html = await ejs.renderFile('./view/donateTemplate.ejs', { name, mail, message, phoneNo, amount })
        const mssg = {
            from: process.env.MAIL,
            to: mail,
            subject: 'Donate Form',
            replyTo: mail,
            html,

        }
        const mailresponse = await Sendmail(mssg)
        res.json({ success: true })
    } catch (err) {
        res.json({ err, success: false })
    }
}
const mentorship = async (req, res) => {
    try {
        const { name, mail, message, phoneNo } = req.body
        await mentorshipModel.create({ name, mail, message, phoneNo })
        const html = await ejs.renderFile('./view/mentorshipTemplate.ejs', { name, mail, message, phoneNo })
        const mssg = {
            from: process.env.MAIL,
            to: mail,
            subject: 'Mentorship Form',
            replyTo: mail,
            html,

        }
        const mailresponse = await Sendmail(mssg)
        res.json({ success: true })
    } catch (err) {
        res.json({ err, success: false })
    }
}
const fetch = async (req, res) => {
    try {
        const filter = req.body.filter
        let model
        if (filter === 'contact') model = contactModel
        else if (filter === 'donate') model = donateModel
        else if (filter === 'mentorship') model = mentorshipModel
        else return res.status(400).json({ success: false, message: 'Invalid filter type' })

        const data = await model.find().sort({_id:-1})
        res.json(data)
    } catch (err) {
        res.json({ err, success: false })
    }
}
const remove = async (req, res) => {
    const {id,filter} = req.params
    try {
    
        let model
        if (filter === 'contact') model = contactModel
        else if (filter === 'donate') model = donateModel
        else if (filter === 'mentorship') model = mentorshipModel
        else return res.status(400).json({ success: false, message: 'Invalid filter type' })

        await model.deleteOne({ _id: id })
        res.json({ success: true })
    } catch (err) {
        res.json({ err, success: false })
    }
}
module.exports = { contact, donate, mentorship, fetch, remove }