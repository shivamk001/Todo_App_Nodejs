const mongoose=require('mongoose')

const tokenSchema=mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    token:{
        type: String
    }
},{
    timestamps: true
})

const Token=mongoose.model('Token', tokenSchema)
module.exports=Token

