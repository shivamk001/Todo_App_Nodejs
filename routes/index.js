const express=require('express')
const router=express.Router()

const homeController=require('../controllers/homeController')
const taskController=require('../controllers/taskController')

router.get('/', homeController.home)
router.use('/task', (req, res, next)=>{console.log(req.url); next()}, require('./task'))
module.exports=router