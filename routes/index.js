const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const homeController=require('../controllers/homeController')
const taskController=require('../controllers/taskController')

router.use((req, res, next)=>{console.log(req.url); next()})
router.use((req, res, next)=>{console.log(req.cookies.todolist); next()})
router.get('/', homeController.home)
router.use('/task', (req, res, next)=>{
    try{
        const data=jwt.verify(req.cookies.todolist, 'foobar'); 
        console.log('Data:', data)
        next()
    }
    catch(err){
        res.redirect('/')
    }
    
}
    , require('./task'))
router.use('/user', require('./user'))
module.exports=router