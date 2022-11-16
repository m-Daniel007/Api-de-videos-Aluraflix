require('dotenv').config()
const {sign,verify} = require('jsonwebtoken')
const User = require('../models/Users')

const criaTokenLogin = async (user, req, res) => {

    const token = sign({
       id: user.id,
       timestamps:new Date()
    }, process.env.SECRET, {
        expiresIn:'2m'
    }) 

    res.status(200).json({msg: `${user.name}, você está autenticado!`, token  })

}

const verificarToken = (req,res,next)=>{
    const authToken = req.headers.authorization
    
    if(!authToken){
        return res.status(401).json({msg:'Informe um Token !'})
    }
    
    const [,token] = authToken.split(" ")
 
      try {
        verify(token, process.env.SECRET)
         
          return next()
      } catch (error) {
          return res.status(401).json({msg:'Token invalido!'})
      }
  }



module.exports = { criaTokenLogin,  verificarToken}