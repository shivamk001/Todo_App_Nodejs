const express=require('express')
const router=express.Router()

const taskController=require('../controllers/taskController')

router.post('/add', taskController.addTask)
router.get('/all', taskController.allTasks)
router.delete('/delete', taskController.deleteTask)
router.delete('/deleteAll', taskController.deleteAllTasks)
router.patch('/edit', taskController.editTask)

module.exports=router