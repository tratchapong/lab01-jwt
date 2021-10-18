// const {Sequelize, DataTypes} = require('sequelize')
// const sequelize = new Sequelize()

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    // underscored: true,
    timestamps: false,
  })
  User.associate = models => {
    User.hasMany(models.Todo)
  }
  return User
}