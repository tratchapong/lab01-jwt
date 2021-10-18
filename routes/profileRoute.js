const express = require("express");
const router = express.Router();
const {authenticate} =  require('../controllers/authController')

router.get('/', authenticate, (req, res, next) => {
  console.log(req.user)
  res.json({
    msg : "Greeting",
    user : req.user
  })
})

module.exports = router
