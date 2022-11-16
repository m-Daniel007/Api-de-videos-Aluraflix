const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('api_videos', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

})

    try {
        sequelize.authenticate()
        console.log('Servidor Online!')
    } catch (err) {
        console.log('Não foi possiivel se conectar:', err)
    }

    module.exports = sequelize