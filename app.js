const express = require('express')
const app = express()
const user = require('./Routes/user')
const bodyParser = require('body-parser')
const cors = require('cors')

const url = "127.0.0.1"
const port = 8000

app.use(cors())
app.use(bodyParser.json())
app.use('/user',user)

app.get('/',(req,res)=>{
    res.send("Press F for Respect !")
})

app.listen(port,url,()=>{
    console.log("Press F for Respect")
})
