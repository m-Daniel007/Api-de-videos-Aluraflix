const { DataTypes, } = require('sequelize')
const db = require('../database/conn')
const Video = require('./Videos')
const Categoria = require('./Categorias')
const Tokens = require('./Tokens')
const User = db.define('User',{

    name: {
        allowNull:false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        unique:true,
        type: DataTypes.STRING,
      },
      email_verificado:{
        allowNull: false,
        type:DataTypes.BOOLEAN,
        defaultValue:false,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
        validate:{
          isNumeric: true
    }
}})



Video.belongsTo(User,{
  foreignKey:'user_id'
 })
 Video.belongsTo(Categoria,{
  foreignKey:'categoria_id'
 })
 Tokens.belongsTo(User,{
  foreignKey:'user_id'
 })


module.exports= User