const express=require('express')
const router=express.Router()
const {loggedIn, logoutUser}=require('../controllers/authenticatedController')
//const Session=require('')
const jwt=require('jsonwebtoken')
var colors = require('colors');



router.post('/:iv/:content/:tokeniv/:tokencontent', loggedIn)
router.get('/logoutUser', (req, res, next)=>{console.log(colors.cyan('/logout')); next();},logoutUser)

router.use('/task', 
// a middleware to authenticate
(req, res, next)=>{console.log(colors.cyan('/task')); next();},
(req, res, next)=>{
    try{
        console.log('SESSION:', req.session)
        let token=req.session.token
        console.log('TOKEN 18:', token)
        let decode=token!=undefined?jwt.verify(token, 'foobar'):false
        //let decode=true
        console.log('DECODED:', decode)
        if(decode){
            
            console.log('DECODED in if:', decode)
            res.locals.authenticated=true
            next()
        }
        else{
            res.locals.authenticated=false
            next()
        }

    }
    catch(err){

    }
},
require('./task'))




module.exports=router