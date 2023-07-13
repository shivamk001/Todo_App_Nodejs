const mongoose=require('mongoose')

const taskSchema=mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    description:{
        type: String,
        require: true,
    },
    category:{
        type: String,
        enum: ['personal', 'work', 'school', 'cleaning', 'others'],
        require: true
    },
    dueDate:{
        type: Date,
        require: true
    }
},{
    timestamps: true
})

const Task=mongoose.model('Task', taskSchema)
module.exports=Task