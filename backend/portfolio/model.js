const mongoose=require('mongoose')
// schema
const portfolioSchema = new mongoose.Schema({
    title: {
        type:String,
        // unique:true,
        required:true
    },
    description:{
        type:String,
        // unique:true,
        required:true
    },

    category: {
        type:String,
        required:true
    },
 
    link: {
        type:String,
        // unique:true,
        required:true
    },

    img: {
        type:String,
        // unique:true,
        required:true
    },
      public_id: {
        type: String

    }
    ,
     
})
const portfolioModel = mongoose.model('portfolioModel', portfolioSchema)
module.exports=portfolioModel