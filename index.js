const express=require('express');
const expressLayouts=require('express-ejs-layouts')
const path=require('path')
const app=express()
const port=8000
const routes=require('./routes')
const cookieParser=require('cookie-parser')

//mongoose
require('./config/mongoose')

app.set('view engine', 'ejs')
app.set('views', './views')

//parse cookie header in request and populates req.cookies
app.use(cookieParser())

//layout support for ejs
app.use(expressLayouts)
//to use the styleshee mentioned in file
app.set('layout extractStyles', true);
//to place all the script blocks at the end
app.set('layout extractScripts', true);
app.use(express.static(path.join(__dirname,'assets/')))

//req.body created in req object through this middleware
app.use(express.urlencoded({ extended: true }));


app.use('/', routes)

app.listen(port, function(err){
    if(err){
        console.log(`Server not run due to error: ${err}`)
    }
    console.log(`Server is up and running on PORT: ${port}`)
})