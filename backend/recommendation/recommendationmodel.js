const mongoose = require('mongoose')
// schema
const recommendationSchema = new mongoose.Schema({
    name: {
        type: String,
        // unique:true,

    },
    description: {
        type: String,
        // unique:true,

    },

    designation: {
        type: String,

    },

    img: {
        type: String,
        // unique:true,

    },
    public_id: {
        type: String

    }
    ,
    rate: {
        type: String,
        // unique:true,

    },

})
const recommendationModel = mongoose.model('recommendationModel', recommendationSchema)
module.exports = recommendationModel