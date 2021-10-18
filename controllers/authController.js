const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {User} = require('../models')

exports.checkToken = async (req, res, next) => {
try {
  const { authorization } = req.headers
  if(!authorization || !authorization.startsWith('Bearer'))
    return res.json(false)
  const token = authorization.split(" ")[1]
  if(!token)
    return res.json(false)
  const decoded = jwt.verify(token, "SECRET_KEY")
  const user = await User.findByPk(decoded.id)
  if(!user) 
    return res.json(false)
  return res.json(true)
} catch (error) {
  next(error)
}
}

exports.authenticate = async (req,res,next) => {
  try {
    const { authorization } = req.headers
    if(!authorization || !authorization.startsWith('Bearer')) 
      return res.status(401).json('UnAuthorized')
    const token = authorization.split(" ")[1]
    if(!token)
      return res.status(401).json('UnAuthorized')
    const decoded = jwt.verify(token, "SECRET_KEY");
    const user = await User.findByPk(decoded.id)
    // const user = await User.findOne({where: {id: decoded.id}})
    if(!user)
      return res.status(401).json('UnAuthorized')
    let {id, username, email} = user
    req.user = {id, username, email}
    next()
  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next ) => {
  try {
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
  } catch (error) {
    next(error)
  }
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

