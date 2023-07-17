const User=require('../models/user')
const jwt=require('jsonwebtoken')

module.exports.signup=(req, res)=>{
    return res.render('signup', {message: undefined})
}

module.exports.signin=(req, res)=>{
    return res.render('signin', { message: undefined })
}

module.exports.createAccount=async (req, res)=>{
    try{
        console.log('Create Account:', req.body)
        //find if user already exists
        let user=await User.findOne({email: req.body.email})
        console.log('USER:', user)
        if(user==null){
            if(req.body.password==req.body.confirmPassword){
                user=await User.create({email: req.body.email, name: req.body.name, password: req.body.password})
                console.log('USER CREATED:', user)
                res.locals.user=user
                return res.render('signin', {message: 'Account created successfully. Please Login.'})
            }
            else{
                res.render('signup', {message: 'Passwords do not match. Try again.'})
            }
        }
        else{
            res.render('signup', {message: 'Email already used by another user. Try another email.'})
        }
        
        


    }
    catch(err){
        console.log('Error in creating user:', err)
        return res.redirect('/')
    }
    
    
}

module.exports.loginUser=async (req, res)=>{
    try{
        console.log('Login User:', req.body)
        //create jwt token
        let token=jwt.sign(req.body, 'foobar', {expiresIn: '20s'}
        // , (err, token)=>{
        //     if(err){
        //         console.log('Error in creating token:', err)
        //         return res.redirect('/')
        //     }
        //     console.log('TOKEN:', token)
        //     //res.cookie('todolist', token, {maxAge: 20000})
        //     console.log('TOKEN:', token)
        // }
        )
        //create cookie using the token
        res.cookie('todolist', token, {maxAge: 20000})
        return res.redirect('/')
    }
    catch(err){
        console.log('Error in Loggingin user:', err)
        return res.redirect('/')
    }
}