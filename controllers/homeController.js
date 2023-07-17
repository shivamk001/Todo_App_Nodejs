module.exports.home=(req, res)=>{
    return res.render('home', {user: {name: ''}})
}