import { conectarMongoDB } from '../../middlewares/conectarMogoDB';

import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';

// eslint-disable-next-line import/no-anonymous-default-export
const endpointLogin = (
    req : NextApiRequest,
    res : NextApiResponse<RespostaPadraoMsg>
) => {
    if(req.method === 'POST'){
        const {login, senha} = req.body;
        if(login === 'admin@admin.com' && senha === 'Admin@123'){
            return res.status(200).json({msg : 'Usuário autenticado com sucesso!'});
        }
        return res.status(400).json({erro : 'Usuário ou senha inválido!'});
    }
    return res.status(405).json({erro : 'Metodo não é válido'});
}

export default conectarMongoDB(endpointLogin);