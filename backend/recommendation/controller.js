const recommendationModel = require("./recommendationmodel")
const fetch = async (req, res) => {
    try {
        const Data = await recommendationModel.find()
        res.json({ success: true, Data })
    } catch (err) {
        res.json({ err })
    }

}
const fetchOne = async (req, res) => {
    const id = req.body.id
    try {
        const Data = await recommendationModel.find({ _id: id })
        res.json({ success: true, Data })
    } catch (err) {
        res.json({ err })
    }
}


const add = async (req, res) => {

    const {name, description, designation, img, rate,public_id } = req.body;
    try {
        await recommendationModel.create({ name, description, designation, img, rate,public_id })
        res.json({ success: true })
    } catch (err) {
        res.json({ err })
    }
}

const modify = async (req, res) => {

    const { isModify, name, description, designation, img, rate,public_id } = req.body

    try {
        await recommendationModel.updateOne({ _id: isModify }, { $set: { name, description, designation, img, rate,public_id } })
        res.json({ success: true })

    } catch (err) {
        res.json({ err })
    }
}

const remove = async (req, res) => {
    const id = req.params.id
    try {
        await recommendationModel.deleteOne({ _id: id })
        res.json({ success: true })

    } catch (err) {
        res.json({ err })
    }
}
module.exports = { fetch, fetchOne, add, modify, remove }