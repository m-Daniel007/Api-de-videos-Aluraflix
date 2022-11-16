const  { DataTypes }  = require('sequelize')
const db = require('../database/conn')

const Videos = db.define('Video',{

    titulo: {
        allowNull: false,
        type: DataTypes.STRING
      },
      descricao: {
        allowNull: false,
        type: DataTypes.STRING
      },
      user_id:{
        allowNull:false,
        type:DataTypes.INTEGER,
      },
      categoria_id:{
        allowNull:false,
        type:DataTypes.INTEGER,
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING,
      }
})



module.exports = Videos