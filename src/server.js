const express = require('express')

const conn = require('./database/conn.js')
const routes = require('./routes')
const user = require('./models/Users')
const categoria = require('./models/Categorias')
const video = require('./models/Videos')
const token = require('./models/Tokens')

const app = express()

routes(app)






conn
.sync()
.then(() =>app.listen(5555))
.catch((err) => console.log(err))


module.exports = app