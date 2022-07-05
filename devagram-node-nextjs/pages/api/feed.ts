import { conectarMongoDB } from '../../middlewares/conectarMogoDB';
import { validarTokenJWT } from '../../middlewares/validarTokenJWT';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import { UsuarioModel } from '../../models/UsuarioModel';
import { PublicacaoModel } from '../../models/PublicacaoModel';

const feedEndpoint = async (req : NextApiRequest, res : NextApiResponse<RespostaPadraoMsg | any>) => {
    try{
        if(req.method ==='GET'){
            if(req?.query?.id){
                const usuario = await UsuarioModel.findById(req?.query?.id);
                if(!usuario){
                    return res.status(400).json({erro : 'Usuário não encontrado'});
                }
                const publicacoes = await PublicacaoModel.find({IdUsuario : usuario.id}).sort({data : -1});
                return res.status(200).json({publicacoes});
            }
        }
        return res.status(405).json({erro : 'Método informado não válido'});
    }catch{

    }
    return res.status(400).json({erro : 'Não foi possível obter o feed'});
}

export default validarTokenJWT(conectarMongoDB(feedEndpoint));