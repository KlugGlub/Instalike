// Importa as dependências necessárias:
// - express: Framework para criar aplicações web
// - multer: Middleware para lidar com uploads de arquivos
// - Funções do controlador de posts para lidar com as rotas
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { listaPosts, postar, uploadImagem, atualizenewPost } from '../controller/postsController.js';

const corsOptions = {
  origin: "http://localhost:8000",
  opitionsSuccessStatus: 200
}
// Configura o armazenamento de arquivos no disco usando o Multer
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos carregados
    destination: function (req, file, cb) {
    cb(null, './uploads/'); // Ajustar o caminho conforme necessário
    },
  // Define o nome do arquivo, aqui usando o nome original.
  // **Recomenda-se gerar nomes únicos para evitar sobrescritas.**
    filename: function (req, file, cb) {
    // Exemplo de geração de nome único:
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // cb(null, `${file.fieldname}-${uniqueSuffix}${file.originalname}`);
    cb(null, file.originalname);
    }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {
  // Middleware para analisar dados JSON no corpo das requisições
    app.use(express.json());

    app.use(cors(corsOptions))

  // Rota GET para listar todos os posts (chama a função listaPosts)
    app.get('/posts', listaPosts);

  // Rota POST para criar um novo post (chama a função postar)
    app.post('/posts', postar);

  // Rota POST para fazer upload de uma imagem (usa o middleware upload.single('img') e chama a função uploadImagem)
  // O middleware upload.single('img') espera um arquivo com o nome 'img' no formulário
    app.post('/upload', upload.single('img'), uploadImagem);

    app.put('/upload/:id', atualizenewPost )
};

// Exporta a função de rotas para ser utilizada em outros módulos
export default routes;