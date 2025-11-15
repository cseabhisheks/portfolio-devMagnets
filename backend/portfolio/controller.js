

const portfolioModels = require('./model.js')
const add = async (req, res) => {
    const { title, description, category, link, img,public_id } = req.body
    try {
        await portfolioModels.create({
            title, description, category, link, img,public_id
        })
        res.json({ success: true })
    }
    catch (err) {
        res.json({ err, success: false })
    }
}
const modify = async (req, res) => {
    const { title, description, category, link, img, id,public_id } = req.body

    try {
        await portfolioModels.findOneAndUpdate({ _id: id }, {
            $set: {
                title, description, category, link, img,public_id
            }
        })
        res.json({ success: true })
    }
    catch (err) {
        res.json({ err, success: false })
    }
}
const fetch = async (req, res) => {
    const filter = req.body.filter
    try {
        const query =  (filter === '' || filter === 'all websites')? {}: { category: filter };
        const projects = await portfolioModels.find(query)
        res.json({ success: true, projects })
    }
    catch (err) {
        res.json({ err, success: false })
    }
}
const fetchOne = async (req, res) => {
    const { id } = req.body; // ✅ same as before
    try {
        // findOne or findById — both work
        const project = await portfolioModels.findOne({ _id: id }); // ✅ correct field name
        res.json({ success: true, project }); // ✅ return single object
    } catch (err) {
        res.json({ err, success: false });
    }
};

const remove = async (req, res) => {
    const id = req.params.id
    try {
        await portfolioModels.deleteOne({ _id: id })
        res.json({ success: true })

    } catch (err) {
        res.json({ err, success: false })
    }

}
module.exports = { add, fetch, remove, modify, fetchOne }