const { Todo } = require("../models");

exports.createTodo = async (req, res, next) => {
  try {
    const { title, status, dueDate, UserId } = req.body;
    const todo = await Todo.create({
      title,
      status,
      dueDate,
      UserId: req.user.id,
    });
    res.status(201).json({ todo });
  } catch (error) {
    next(error);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params
    const del_row = await Todo.destroy({
      where: {
        id, 
        UserId: req.user.id
      }
    })
    if (del_row === 0)
      return res.status(400).json({msg: 'Cannot Delete..'})
    res.status(204)
  } catch (error) {
    next(error)
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, status, dueDate} = req.body
    const [rows] = await Todo.update({
      title,status,dueDate
    },{ where : {
      id,
      UserId: req.user.id
    }})
    if (rows === 0)
      return res.status(400).json({msg: 'Cannot Update...'})
    res.status(200).json({msg: 'Update successful..'})
  } catch (error) {
    next(error)
  }
};

exports.getTodo = async (req, res, next) => {
  try {
    const { id } = req.params
    const todo = await Todo.findOne({ where : {id, UserId: req.user.id}})
    res.json(todo) 
  } catch (error) {
    next(error)
  }
};

exports.getAllTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findAll({where: {UserId : req.user.id}})
    res.json(todo)
  } catch (error) {
    next(error)
  }
};

exports.testFunc = async (req, res, next) => {
  let rs = await Todo.findAll()
  console.log(rs)
  res.json(rs)
}
