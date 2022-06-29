import md5 from 'md5';
import nc from 'next-connect';

import { conectarMongoDB } from '../../middlewares/conectarMogoDB';
import { UsuarioModel } from '../../models/UsuarioModel';
import { upload, uploadImagemCosmic } from '../../services/uploadImagemCosmic';
import { CadastroRequisicao } from '../../types/CadastroRequisicao';
import { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';

import type { NextApiRequest, NextApiResponse} from 'next';


const handler = nc()
    .use(upload.single('file'))
    .post(async ( req : NextApiRequest, 
        res : NextApiResponse<RespostaPadraoMsg>
        ) => {

        const usuario = req.body as CadastroRequisicao;

        if(!usuario.nome || usuario.nome.length < 2){
            return res.status(400).json({erro : 'Nome inválido'});
        }

        if(!usuario.email || usuario.email.length < 5 || !usuario.email.includes('@') || !usuario.email.includes('.')){
            return res.status(400).json({erro : 'E-mail inválido'});
        }

        if(!usuario.senha || usuario.senha.length < 4){
            return res.status(400).json({erro : 'Senha inválido'});
        }

        // verificação de usuário com mesmo e-mail
        const usuarioComMesmoEmail = await UsuarioModel.find({email : usuario.email});
        if(usuarioComMesmoEmail && usuarioComMesmoEmail.length > 0){
            return res.status(400).json({erro : 'Já existe uma conta com o e-mail informado'});
        }

        // enviar a imagem do multer para o cosmic
        const image = await uploadImagemCosmic(req);

        const usuarioASerSalvo = {
            nome : usuario.nome,
            email : usuario.email,
            senha : md5(usuario.senha),
            avatar : image?.media?.url
        }
        await UsuarioModel.create(usuarioASerSalvo);
        return res.status(200).json({msg : 'Usuario cadastrado com sucesso!'}); 
});

export const config = {
    api : {
        bodyParser : false
    }
} 

export default conectarMongoDB(handler);