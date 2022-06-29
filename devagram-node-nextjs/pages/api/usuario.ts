import { validarTokenJWT } from '../../middlewares/validarTokenJWT';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';

const usuarioEndpoint = (req : NextApiRequest, res : NextApiResponse<RespostaPadraoMsg>) => {

    return res.status(200).json({msg : 'Usuário autenticado com sucesso'});
}

export default validarTokenJWT(usuarioEndpoint);