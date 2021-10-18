require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRoute = require('./routes/authRoute')
const todoRoute = require('./routes/todoRoute')
const profileRoute = require('./routes/profileRoute')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', authRoute)
app.use('/todo', todoRoute)

app.use('/profile', profileRoute)

app.use((req,res,next)=>{
  res.status(404).json({msg: 'Resource not found'})
})

app.use((err,req,res,next) => {
  console.log(err.message)
  res.json({
    err : err.message,
    where : err.where
  })
})

let port = process.env.PORT || 8000
app.listen(port, ()=> console.log('Server on : ' + port))

// const db = require('./models')
// db.sequelize.sync()