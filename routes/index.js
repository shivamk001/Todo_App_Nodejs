const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
var colors = require('colors');
const homeController=require('../controllers/homeController')
//const taskController=require('../controllers/taskController')

router.use((req, res, next)=>{console.log(colors.cyan('url: %s'),req.url); next()})
//router.use((req,res,next)=>{console.log('REQ BODY INDEX:', req.body);next()})
//router.use((req, res, next)=>{console.log(req.cookies.todolist); next()})
router.get('/', homeController.home)
//router.use('/task', require('./task'))
router.use('/user', (req, res, next)=>{console.log(colors.cyan('/user')); next();}, require('./user'))
module.exports=router