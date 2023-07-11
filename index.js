const express=require('express');
const path=require('path')
const app=express()
const port=8000
const routes=require('./routes')

//mongoose
require('./config/mongoose')

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static(path.join(__dirname,'assets/')))
//app.use(express.urlencoded());
app.use(express.json()); //Used to parse JSON bodies

app.use('/', routes)

app.listen(port, function(err){
    if(err){
        console.log(`Server not run due to error: ${err}`)
    }
    console.log(`Server is up and running on PORT: ${port}`)
})