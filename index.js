const express=require('express');
const path=require('path')
const app=express()
require('dotenv').config()
const port=process.env.PORT||8438
const routes=require('./routes')
const cookieParser=require('cookie-parser')
const session=require('express-session')
const bp = require('body-parser')
const db=require('./config/mongoose')
const MongoStore = require('connect-mongo');

//session
app.use(session({
    name: 'todolist_session',//name of cookie
    secret: 'foobar',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGOOSEDB
    }),
    cookie: { maxAge: 60000, path: '/user/authenticated', httpOnly: true }
    //maxage is in miliseconds
    //path: where the session will be created 
}))

//mongoose
//require('./config/mongoose')

app.set('view engine', 'ejs')
app.set('views', './views')

//parse cookie header in request and populates req.cookies
app.use(cookieParser())



app.use(express.static(path.join(__dirname,'assets/')))

//req.body created in req object through this middleware
app.use(express.urlencoded({ extended: true }));
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use('/', routes)

app.listen(port, function(err){
    if(err){
        console.log(`Server not run due to error: ${err}`)
    }
    console.log(`Server is up and running on PORT: ${port}`)
})