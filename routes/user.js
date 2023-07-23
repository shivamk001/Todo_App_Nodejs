const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')
var colors = require('colors');
router.get('/signup', userController.signup)
router.get('/signin', userController.signin)
router.post('/createAccount', userController.createAccount)
router.post('/loginUser', userController.loginUser)

//ON LOGIN ONLY
router.use('/authenticated/', (req, res, next)=>{console.log(colors.cyan('/authenticated')); next();},require('./authenticated'))

module.exports=router