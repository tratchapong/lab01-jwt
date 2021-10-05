const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {User} = require('../models')

exports.login = async (req, res, next ) => {
  const { username, password } = req.body
  const user = await User.findOne({where: {username}})
  if(!user) 
    res.status(400).json({msg: "Invalid Username or Password"})
  let pwOK = await bcrypt.compare(password, user.password)
  if(!pwOK)
    res.status(400).json({msg: "Invalid Username or Password"})
  // login ok then make token
  const payload = { id: user.id, username: user.username }
  const token = jwt.sign(payload, "SECRET_KEY", { expiresIn: '7d' })
  res.json({
    msg: "Login Successful",
    token
  })
}

exports.register = async (req,res,next) => {
  try {
    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({
      username,
      password: hashedPassword,
      email
    })
    res.status(200).json({msg: "Register Successfully"})
  } catch (error) {
    error.where = "Error in Register_authController"
    next(error)
  }
}

