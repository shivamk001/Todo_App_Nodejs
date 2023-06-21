const express=require('express')
const router=express.Router()

router.get('/', function(req, res){
    return res.end('<h1>Testing</h1>')
})

module.exports=router