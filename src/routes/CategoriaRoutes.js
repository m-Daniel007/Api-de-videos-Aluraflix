const router = require('express').Router()
const CategoriaController = require('../controllers/CategoriaController')




router
.post('/categoria/criar', CategoriaController.criar)
.get('/categorias', CategoriaController.listar)
.put('/categorias/alterar/:id', CategoriaController.alterar)
.delete('/categoria/:id', CategoriaController.deletar)

module.exports = router