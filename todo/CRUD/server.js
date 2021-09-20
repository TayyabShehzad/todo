require('dotenv').config()

const express = require ('express')
const app = express()
const mongoose = require ('mongoose')

const db = mongoose.connection
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true})

db.on('error',(error) => console.error(error))
db.once('open',() => console.log('Connected to Database'))

app.use(express.json())


const userRouter = require('./routes/users')
app.use('/users',userRouter)

app.listen(4000, ()=> console.log('Server Started'))









