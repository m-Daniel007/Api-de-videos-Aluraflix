const  { DataTypes }  = require('sequelize')
const db = require('../database/conn')

const Videos = db.define('Video',{

  id:{
    type:DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey:true,
    allowNull:false,
  },
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
        type:DataTypes.UUID,
      },
      categoria_id:{
        allowNull:false,
        type:DataTypes.UUID,
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING,
      }
})



module.exports = Videos