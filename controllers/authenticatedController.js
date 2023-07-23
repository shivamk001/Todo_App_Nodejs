const {decrypt}=require('../config/crypto')
const User=require('../models/user')

module.exports.loggedIn=async (req, res)=>{
    //console.log('USER:', res.locals.user, res.locals.token)
    //console.log('TOKEN:', res.locals)
    //console.log('/user/authenticated:', req.params)
    const id=decrypt({iv:req.params.iv, content:req.params.content})
    let user=await User.findById(id)
    //console.log('Decrypted text:', id, user)
    const token=decrypt({iv:req.params.tokeniv, content:req.params.tokencontent})
    //console.log('Decrypted text:', token)
    req.session.token=token
    req.session.user=user
    //console.log('SESSION USERp:', req.session.user)
    //console.log('SESSION TOKEN:', req.session.token)

    return res.render('home', {user: user})
}

module.exports.logoutUser=async (req, res)=>{
    req.session.destroy(function(err) {
        // cannot access session here
        if(err){
            console.log('Error in Logging-out user:', err);
            return;
        }
        res.clearCookie('todolist_session')
        res.clearCookie('todolist')
        console.log('Session destroyed')
        //console.log('REQ SESSION:', req.session)
        //console.log('RES LOCALS:', res.locals, req.locals)
        //res.render('home', {user:undefined})
        //res.locals.user=undefined
        return res.redirect('/')
      })
}