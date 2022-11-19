require('dotenv').config()
const User = require('../models/Users')
const Token = require('../models/Tokens')
const bcrypt = require( 'bcrypt')
const jwt = require('jsonwebtoken')
const { EmailVerificacao } = require('../helpers/Confirmacao-cadastro')
const { criaTokenLogin } = require('../helpers/tokens')




module.exports = class UserController{

    static async criaUser(req,res){
      const { name, email, password, phone } = req.body

      if(!name){
        return res.status(401).json({message:'O nome é obrigatorio!'})
      }
      if(!email){
        return res.status(401).json({message:'O email é obrigatorio!'})
      } 
      if(!password){
        return res.status(401).json({message:'A senha é obrigatoria!'})
      } 
      if(!phone){
        return res.status(401).json({message:'O telefone é obrigatorio!'})
      }

      const user = await User.findOne({ where:{ email }})

      if(user){
        return res.status(422).json({message:`O Usuário ${user.name} já existe!`})
      }

      const passwordHash = bcrypt.hashSync(password.toString(),10)
    
      try {
         const usuario = await User.create({
            name,
            email,
            phone,
            email_verificado: false,
            password:passwordHash
        })
      
        
        const token =  jwt.sign({
             id:usuario.id,
             timestamp:new Date()
          },process.env.SECRET, {
          expiresIn:'5m'
      })
      const enviarToken = await Token.create({
       name:token,
        user_id:usuario.id
      })
  
        const emailVerificacao = new EmailVerificacao(usuario, token);
        await emailVerificacao.enviaEmail().catch(console.log);

        return res.status(201).json({ message: "Usuario criado com sucesso, por favor verifique seu email!" });
      } catch (error) {
        res.status(500).json({error:error.message})
      }
    }

    static async verificaEmail(req, res) {
      const { id } = req.params
      const {  token } = req.body

      if (!token ) {
        res.status(422).json({ message: 'Informe o token' });
        return;
      }
  
      try {
        const usuario = await User.findOne({ where: { id } });
        const tokenSalvo = await Token.findOne({ where: { name:token } })

        if (!usuario) {
          res.status(404).json({ message: `Usuário ${id} não encontrado!` });
          return;
        }
     
        if (tokenSalvo !== token) {
          res.status(422).json({ message: 'Token invalido' });
          return;
        }
        if(tokenSalvo.user_id !== usuario.id){
          return res.status(401).json({message:`O token ${token} é invalido!`})
        }
  
        if (usuario.email_verificado === true) {
          res.status(422).json({ message: `O email ${usuario.email} já está confirmado!` });
          return;
        }

        const emailVerificado = await usuario.update({ email_verificado: true },
         { where: { id } });
  
        res.status(200).json({message: `O email do usuário  ${emailVerificado.name} foi confirmado`});
  
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async login(req,res){
      const { email, password } = req.body

      if(!email){
        return res.status(422).json({message:'O email e obrigatório!'})
      }
      if(!password){
         return res.status(401).json({message:'A senha é obrigatoria!'})
      } 
      
       const user = await User.findOne({ where: { email } })

      if(!user){
        return res.status(401).json({message:'Dados inválidos!'})
      }
      const checarPassword = await bcrypt.compareSync(password.toString(), user.password)

      if(!checarPassword){
        res.status(422).json({
        msg: 'Senha invalida!'
        })
      }

      try {
        if(user.email_verificado === false){
          return res.status(422).json({message:`O usuário ${user.email} não foi verificado, para fazer login, verifique seu email!!`})
        }
        criaTokenLogin(user,req,res)
        
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }

    static async listarTodos(req,res){
      
      try {
        const { page } = req.query;
        const limite = 3;
        const users = await User.findAndCountAll({
          order: [
            ['id', 'ASC']
        ],
        include: {
            all: true
        },
        limit: limite,
        offset: page * limite,
        attributes:
        ['id','name', 'email','phone','email_verificado']
    })
        

        return res.status(200).json(users)
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }


   

    static async editarUser(req,res){
      const { id } = req.params
      const novasInfos = req.body
  
      const usuario = await User.findByPk(id)

      if (!usuario) {
         return res.status(404).json({ message: `Usuário ${id} não foi  encontrado!` });
      }

      try {
        await User.update(novasInfos,{ where:{id: Number(id) }})  
        return res.status(200).json({message:`O usuário ${usuario.name} foi atualizado comn sucesso!`})
      } catch (error) {
        return res.status(500).json({message:error.message})
      }

  }
  

  static async deletar(req,res){
    const { id }= req.params
    const usuario = await User.findByPk(id)

    if (!usuario) {
       return res.status(404).json({ message: `Usuário ${id} não foi  encontrado!` });
    }

  
    try {
      await User.destroy({ where: {id:Number(id)} })
      return res.status(200).json({message:`O usuário ${usuario.email} foi excluido com sucesso!`})
      
    } catch (error) {
      return res.status(500).json({message:error.message})
    }
  }

}