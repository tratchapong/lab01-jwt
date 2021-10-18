const router = require('express').Router()
const todoController = require('../controllers/todoController')
const {authenticate} = require('../controllers/authController')

router.get('/test', todoController.testFunc)

router.get('/',authenticate, todoController.getAllTodo)
router.get('/:id', authenticate, todoController.getTodo)
router.post('/',authenticate, todoController.createTodo)
router.delete('/:id',authenticate, todoController.deleteTodo)
router.put('/:id', authenticate, todoController.updateTodo)

module.exports = router