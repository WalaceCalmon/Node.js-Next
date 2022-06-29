import md5 from 'md5';

import { conectarMongoDB } from '../../middlewares/conectarMogoDB';
import { UsuarioModel } from '../../models/UsuarioModel';

import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';

const endpointLogin =
    async ( req : NextApiRequest,
            res : NextApiResponse<RespostaPadraoMsg>
) => {
    if(req.method === 'POST'){
        const {login, senha} = req.body;

        const usuarioEncontrados = await UsuarioModel.find({email : login, senha : md5(senha)});
        if(usuarioEncontrados && usuarioEncontrados. length > 0){
            const usuarioEncontrado = usuarioEncontrados[0];
            return res.status(200).json({msg : `Usuário ${usuarioEncontrado.nome} autenticado com sucesso!`});
        }
        return res.status(400).json({erro : 'Usuário ou senha inválido!'});
    }
    return res.status(405).json({erro : 'Metodo não é válido'});
}

export default conectarMongoDB(endpointLogin);