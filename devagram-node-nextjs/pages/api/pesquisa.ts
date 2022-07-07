import { conectarMongoDB } from '../../middlewares/conectarMogoDB';
import { validarTokenJWT } from '../../middlewares/validarTokenJWT';
import { UsuarioModel } from '../../models/UsuarioModel';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
const pesquisaEndpoint = async (req : NextApiRequest, res : NextApiResponse<RespostaPadraoMsg | any[]>) => {
    try{
        if(req.method === 'GET'){
            const {filtroUsuario} = req.query;

            if(!filtroUsuario || filtroUsuario.length < 2){
                return res.status(400).json({erro : 'Favor informar pelo menos 2 caracteres para a busca'});
            }

            const usuariosEncontrados = await UsuarioModel.find({
                $or: [ {nome : {$regex : filtroUsuario, $options: 'i'}}, 
                    {email : {$regex : filtroUsuario, $options: 'i'}}]
                
                
            });

            return res.status(200).json({usuariosEncontrados});
        }
        return res.status(405).json({erro : 'Metodo informado não é válido'});
    }catch(e){
        return res.status(400).json({erro : 'Não foi possível buscar usuário informado: ' + e});
    }
}

export default validarTokenJWT(conectarMongoDB(pesquisaEndpoint));