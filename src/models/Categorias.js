const { DataTypes} = require('sequelize')
const db = require('../database/conn')
const Categorias = db.define('Categoria',{


  id:{
    type:DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey:true,
    allowNull:false,
  },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cor: {
        type: DataTypes.STRING,
        allowNull: false,
      }
})



module.exports = Categorias