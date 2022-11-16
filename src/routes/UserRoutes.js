const router = require('express').Router()
const UserController = require('../controllers/UserController')
const { verificarToken } = require('../helpers/tokens')



router
.post('/usuario/cadastro',UserController.criaUser)
.post('/usuario/login',UserController.login)
.get('/usuario/confirma-email/:id',UserController.verificaEmail)
.get('/usuario/',verificarToken, UserController.listarTodos)
.put('/usuario/editar/:id',verificarToken, UserController.editarUser)
.delete('/usuario/deletar/:id', verificarToken, UserController.deletar)


module.exports = router