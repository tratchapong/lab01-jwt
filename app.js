require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRoute = require('./routes/authRoute')
const {authenticate} = require('./controllers/authController')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', authRoute)

app.get('/profile', authenticate, (req,res,next) => {
  res.json({
    msg : "Greeting",
    user : req.user
  })
})

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