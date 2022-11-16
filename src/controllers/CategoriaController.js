const Categoria = require('../models/Categorias')

module.exports = class CategoriaController{

    static async criar(req,res){
        const { descricao, cor } = req.body

        if(!descricao){
            return res.status(400).json({message:'A descrição é obrigatória!'})
        }
        if(!cor){
            return res.status(400).json({message:'A cor é obrigatória!'})
        }
        const categoria = await Categoria.findOne({where: { descricao:descricao }})

        if(categoria){
            return res.status(422).json({message:`A categoria ${categoria.descricao}, já existe!`})
        }
        const novaCategoria =  await Categoria.create({descricao,cor})

        try {
            res.status(201).json(novaCategoria)
            
        } catch (error) {
            return res.status(500).json({message:error.message})
        }
    }
    static async listar(req,res){
       try {
        const { page } = req.query;
        const limite = 3;
        const categoria = await Categoria.findAndCountAll({
          order: [
            ['id', 'ASC']
        ],
        include: {
            all: true
        },
        limit: limite,
        offset: page * limite,
        attributes:
        ['id','cor', 'descricao']
    })
    
    return res.status(200).json(categoria)
       } catch (error) {
            return res.status(500).json({message:error.message})
       }
    }

    static async alterar(req,res){
        const { id } = req.params
        const novasInfos = req.body
    
        const categoria = await Categoria.findByPk(id)
  
        if (!categoria) {
           return res.status(404).json({ message: `Categoria ${id} não foi  encontrada!` });
        }
  
        try {
          await Categoria.update(novasInfos,{ where:{id: Number(id) }})  
          return res.status(200).json({message:`A categoria ${categoria.descricao} foi atualizado comn sucesso!`,novasInfos})
        } catch (error) {
          return res.status(500).json({message:error.message})
        }
  
    }

    static async deletar(req,res){
        const { id }= req.params
        const categoria = await Categoria.findByPk(id)
    
        if (!categoria) {
           return res.status(404).json({ message: `Categoria ${id} não foi  encontrada!` });
        }
    
        try {
          await Categoria.destroy({ where: {id:Number(id)} })
          return res.status(200).json({message:`A categoria ${id} foi excluido com sucesso!`})
          
        } catch (error) {
          return res.status(500).json({message:error.message})
        }
      }




}