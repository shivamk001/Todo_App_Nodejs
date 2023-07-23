const User=require('../models/user')
const Token=require('../models/token')
const jwt=require('jsonwebtoken')
const {encrypt}=require('../config/crypto')

module.exports.signup=(req, res)=>{
    return res.render('signup', {message: undefined})
}

module.exports.signin=(req, res)=>{
    return res.render('signin', { message: undefined })
}

module.exports.createAccount=async (req, res)=>{
    try{
        //console.log('Create Account:', req.body)
        //find if user already exists
        let user=await User.findOne({email: req.body.email})
        //console.log('USER:', user)
        if(user==null){
            if(req.body.password==req.body.confirmPassword){
                user=await User.create({email: req.body.email, name: req.body.name, password: req.body.password})
                console.log('USER CREATED:', user)
                res.locals.user=user
                return res.render('signin', {message: 'Account created successfully. Please Login.'})
            }
            else{
                return res.render('signup', {message: 'Passwords do not match. Try again.'})
            }
        }
        else{
            return res.render('signup', {message: 'Email already used by another user. Try another email.'})
        }
        
        


    }
    catch(err){
        console.log('Error in creating user:', err)
        return res.redirect('/')
    }
    
    
}

module.exports.loginUser=async (req, res, next)=>{
    try{
        //console.log('Login User:', req.body)

        let email=req.body.email
        let password=req.body.password
        //find if use exists
        let user=await User.findOne({email: email})
        //console.log('Login User Found:', user)
        if(user!=null){
            if(user.password==password){
                //correct user

                //create token
                let token=jwt.sign({email: email}, 'foobar', {expiresIn: '600s'})
                //console.log('User Login Token:', token)
                res.locals.user=user
                await Token.create({user: user._id, token: token})
                //console.log('User ID:', user.id)
                let id=encrypt(user.id)
                token=encrypt(token)
                //console.log('Encrypted id:', id)
                //console.log('Encrypted token:', token)
                //res.locals.token=token

                //store token in session

                //console.log('LOGIN SESSION:', req.session.token, req.session.token)
                return res.redirect(308, `/user/authenticated/${id.iv}/${id.content}/${token.iv}/${token.content}`)
            }else{
                console.log('Incorrect username/password.')
                return res.render('signin', {message: 'Incorrect username/password.'})
            }
        }
        else{
            return res.render('signin', {message: 'User does not exist.'})
        }

        //console.log('REQUEST COOKIES:', req.cookies)
        //return res.redirect('/')
    }
    catch(err){
        console.log('Error in Loggingin user:', err)
        return res.redirect('/')
    }
}

