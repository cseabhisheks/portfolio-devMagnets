const cloudinary=require('./config')
const sign = (req, res) => {
    try {
        const timestamp = Date.now() / 1000
        const signature = cloudinary.utils.api_sign_request({ timestamp }, process.env.API_SECRET)
        const API_KEY = process.env.API_KEY
        const CLOUD_NAME = process.env.CLOUD_NAME
        res.json({ success: true, timestamp, signature, API_KEY, CLOUD_NAME })
    } catch (err) {
        res.json({ success: false, err });
    }
}
const remove =async (req, res) => {
    try {
        console.log(req.params.public_id)
        const result = await cloudinary.uploader.destroy(req.params.public_id)
        res.json({ success: true, deleteStatus: result })
    } catch (err) {
        res.json({ success: false, err });
    }
}
module.exports={sign,remove}