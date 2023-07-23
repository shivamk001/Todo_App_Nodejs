const Task=require('../models/task')

module.exports.addTask=async (req, res)=>{
    try{
        console.log('Add task:',  req.body)
        console.log('ALLTASKS USER:', req.session.user)
        let newTask=await Task.create({
                    description: req.body.description, 
                    category: req.body.category, 
                    dueDate: req.body.date
                })
        //console.log(newTask, newTask.date instanceof Date)
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

module.exports.deleteTask=async (req, res)=>{
    try{
        console.log('ID:',  req.body.id)
        //first check if the task exists
        let task=await Task.findById(req.body.id);
        // console.log('delete task:', task)
        if(task){
            // Delete the document by its _id
            await Task.deleteOne({ _id: req.body.id });

            return res.status(200).json({
                message:'Task deleted successfully',
                id: req.body._id
            })
        }
    }
    catch(err){
        console.log('ERROR IN CREATING TASK:', err)
        return res.status(400).json({
            message:'Task not deleted',
        })
    }
}

module.exports.deleteAllTasks=async (req, res)=>{
    try{
        console.log('DELETE ALL TASKS')
        //first check if the task exists
        let task=await Task.find({});
        let len=task.length
        //console.log(len)
        await Task.deleteMany({ });

        return res.status(200).json({
            message:'Task deleted successfully',
            length: len
        })
    }
    catch(err){
        console.log('ERROR IN CREATING TASK:', err)
        return res.status(400).json({
            message:'Task not deleted',
        })
    }
}

module.exports.allTasks=async (req, res)=>{
    try{
        console.log('ALLTASKS USER:', req.session.user)
        let allTasks=await Task.find({}).sort({'createdAt': 'desc'})
        console.log('ALLTASKS:', allTasks.length)
        
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

module.exports.editTask=async (req, res)=>{
    try{
        //console.log('In EditTask:', req.body)

        //find the doc if exists
        let task=await Task.findById(req.body.id);
        
        if(task){
            // Update the document
            const update={status: req.body.status}
            await task.updateOne(update)

            return res.status(200).json({
                message:'Task updated successfully',
                id: req.body.id
            })
        }
    }
    catch(err){
        console.log('ERROR IN UPDATION TASKS:', err)
        return res.status(400).json({
            message:'Cannot edit tasks',
        })
    }
}