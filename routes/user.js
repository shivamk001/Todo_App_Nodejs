const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')

router.get('/signup', userController.signup)
router.get('/signin', userController.signin)
router.post('/createAccount', userController.createAccount)
router.post('/loginUser', userController.loginUser)
module.exports=router