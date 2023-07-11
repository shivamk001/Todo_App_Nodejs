const Task=require('../models/task')

module.exports.addTask=async (req, res)=>{
    try{
        console.log('Add task:',  req.body)
        let newTask=await Task.create({
                    description: req.body.description, 
                    category: req.body.category, 
                    dueDate: req.body.date
                })
        console.log(newTask, newTask.date instanceof Date)
        let allTasks=await Task.find({})
        if(req.xhr){
            return res.status(200).json({
                message:'Task added successfully',
                newTask: newTask,
                allTasks: allTasks
            })
        }
    }
    catch(err){
        console.log('ERROR IN CREATING TASK:', err)
        return res.status(400).json({
            message:'Task not added',
        })
    }

}

module.exports.deleteTask=(req, res)=>{

}

module.exports.deleteAllTasks=(req, res)=>{

}

module.exports.allTasks=async (req, res)=>{
    try{
        let allTasks=await Task.find({})
        if(req.xhr){
            return res.status(200).json({
                message:'All Tasks',
                allTasks: allTasks
            })
        }
    }
    catch(err){
        console.log('ERROR IN GETTING ALL TASKS:', err)
        return res.status(400).json({
            message:'Cannot get all tasks',
        })
    }
}