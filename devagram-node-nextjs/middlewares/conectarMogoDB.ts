import mongoose from 'mongoose';

import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import type {RespostaPadraoMsg} from '../types/RespostaPadraoMsg';

export const conectarMongoDB = (handler :  NextApiHandler) => 
    async (req : NextApiRequest, res : NextApiResponse<RespostaPadraoMsg | any[]>) => {
    
    // Verificar se o banco ja esta conectado, se estiver seguir para o endpoint ou proximo middleware
    if(mongoose.connections[0].readyState){
        return handler(req, res);
    }

    // Se não estiver conectado vamos conectar
    // Obter a variavel de ambiente preenchida do .env.local
    const {DB_COXEXAO_STRING} = process.env;
    
    // Se a .env.local estiver vazia aborta o uso do sistema e informa o programador
    if(!DB_COXEXAO_STRING){
        return res.status(500).json({ erro : 'ENV de configuração do banco, não informada.'})
    }

    mongoose.connection.on('connected', () => console.log('Banco de dados conectado'));
    mongoose.connection.on('error', erro => console.log(`Ocorrou erro ao conectar ao banco ${erro}`));
    await mongoose.connect(DB_COXEXAO_STRING);

    // Agora posso seguir para o endpoint, pois agora estou conectado ao banco
    return handler(req, res);
}