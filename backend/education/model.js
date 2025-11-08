const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,    
    },
    author: {
        type: String,
        required: true,
        
    },
    duration: {
        type: String,
        required: true,
        
    },
    description: {
        type: String,
        required: true,
        
    },
    educationQualification: {
        type: String,
        required: true,  
    }
})

module.exports = mongoose.model('education', educationSchema)

