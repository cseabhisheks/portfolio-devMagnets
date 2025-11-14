const {sign,remove}=require('./controller')
const express=require('express')
const router=express.Router()
router.get('/sign',sign)
router.delete('/delete/:public_id',remove)
module.exports=router