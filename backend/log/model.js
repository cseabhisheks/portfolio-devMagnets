const mongoose = require('mongoose')
const logSchema = new mongoose.Schema({
    ip: { type: String },
    time: { type: Date, default: Date.now },
    status: { type: String }
})
const logModel = mongoose.model('logModel', logSchema)

const log = async (ip, status) => {
    await logModel.create({ ip,status })
}
module.exports = { logModel, log }