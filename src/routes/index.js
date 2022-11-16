const express =  require('express')
const morgan = require('morgan')
const user = require('./UserRoutes')
const categoria = require('./CategoriaRoutes')

module.exports = app => {
    app.use(express.json())
    app.use(morgan('dev'))
    app.use(user)
    app.use(categoria)

}
