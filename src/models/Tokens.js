const { DataTypes } = require('sequelize')
const db = require('../database/conn')

const Tokens = db.define('Token',{

    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false,
      },
    name:{
        allowNull:false,
        type:DataTypes.STRING
    },
    user_id:{
        allowNull:false,
        type:DataTypes.UUID,
      },
   
})


module.exports= Tokens