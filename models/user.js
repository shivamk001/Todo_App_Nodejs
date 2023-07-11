const mongoose=require('mongoose')

const userSchema=mongoose.model({
    email:{
        type: String, 
        required: true, 
        unique: true
    }, 
    password:{
        type: String, 
        required: true
    },
    name:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    }
},
{
    timestamps: true
})

const User=mongoose.model('User', userSchema)
module.exports=User