const express=require('express')
const router=express.Router()
var colors = require('colors');
const taskController=require('../controllers/taskController')

router.use(
    (req,res,next)=>{
        if(!res.locals.authenticated){
            return res.status(401).json({
                allTasks: []
            })
        }
        console.log('TASKS AUTHENTICATED')
        next()
    })
router.post('/add', (req,res,next)=>{console.log('add'); next()}, taskController.addTask)
router.get('/all', (req, res, next)=>{console.log(colors.cyan('/all')); next();}, taskController.allTasks)
router.delete('/delete', (req,res,next)=>{console.log('delete'); next()}, taskController.deleteTask)
router.delete('/deleteAll', (req,res,next)=>{console.log('deleteAll'); next()}, taskController.deleteAllTasks)
router.patch('/edit', (req,res,next)=>{console.log('edit'); next()}, taskController.editTask)

module.exports=router