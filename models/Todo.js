// const {Sequelize, DataTypes} = require('sequelize')
// const sequelize = new Sequelize()

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title : {
      type : DataTypes.STRING,
      allowNull : false
    },
    status : {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    dueDate : {
      type: DataTypes.DATEONLY,
      allowNull: false,
    }
  },{
    timestamps: true
  })
  Todo.associate = models => {
    Todo.belongsTo(models.User)
  }
  return Todo
}
