const { DataTypes } = require('sequelize')
const db = require('../database/conn')

const Tokens = db.define('Token',{
    name:{
        allowNull:false,
        type:DataTypes.STRING
    },
    user_id:{
        allowNull:false,
        type:DataTypes.INTEGER,
      },
   
})


module.exports= Tokens