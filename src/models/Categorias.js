const { DataTypes} = require('sequelize')
const db = require('../database/conn')
const Categorias = db.define('Categoria',{

    descricao: {
        allowNull: false,
        type: DataTypes.STRING
      },
      cor: {
        allowNull: false,
        type: DataTypes.STRING
      }
})



module.exports = Categorias