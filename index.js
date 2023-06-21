const express=require('express');
const app=express()
const port=8000
const routes=require('./routes')

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('assets'))

app.use('/', routes)

app.listen(port, function(err){
    if(err){
        console.log(`Server not run due to error: ${err}`)
    }
    console.log(`Server is up and running on PORT: ${port}`)
})