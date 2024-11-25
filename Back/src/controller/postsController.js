import fs from "fs";
import { getAllPosts, criarPost, atualizePost,} from "../models/postModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

// Rota para listar todos os posts
export async function listaPosts(req, res) {
    try {
        // Obtém todos os posts do banco de dados
        const posts = await getAllPosts();
        // Envia os posts como resposta
        res.status(200).json(posts);
    } catch (error) {
        // Caso ocorra algum erro, envia uma mensagem de erro
        console.error('Erro ao listar posts:', error);
        res.status(500).json({ error: 'Erro ao listar posts' });
    }
}

// Rota para criar um novo post
export async function postar(req, res) {
    try {
        // Cria um novo post com base nos dados da requisição
        const novoPost = req.body;
        // Insere o novo post no banco de dados
        const postCriado = await criarPost(novoPost);
        // Envia o post criado como resposta
        res.status(200).json(postCriado);
    } catch (error) {
        // Caso ocorra algum erro, envia uma mensagem de erro
        console.error('Erro ao criar post:', error);
        res.status(500).json({ error: 'Erro ao criar post' });
    }
}

// Rota para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
    try {
    // Cria um novo objeto de post com a imagem
    const novoPost = {
        descricao: "",
        imgUrl: `uploads/${req.file.filename}`,
        alt: "",
    };
        // Insere o novo post no banco de dados
        const postCriado = await criarPost(novoPost);
        // Renomeia o arquivo da imagem para incluir o ID do post
        fs.renameSync(req.file.path, `uploads/${postCriado.insertedId}.png`);
        // Envia o post criado como resposta
        res.status(200).json(postCriado);
    } catch (error) {
        // Caso ocorra algum erro, envia uma mensagem de erro
        console.error('Erro ao fazer upload da imagem:', error);
        res.status(500).json({ error: 'Erro ao fazer upload da imagem' });
    }
}

export async function atualizenewPost(req, res) {
    try {
        // Cria um novo post com base nos dados da requisição
        const id = req.params.id;
        const urlImg = `http://localhost:3000/${id}.png`
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imageBuffer)
        const post = {
            imgUrl: urlImg,
            descricao: descricao,
            alt: req.body.alt
        }
        // Insere o novo post no banco de dados
        const postCriado = await atualizePost(id, post);
        // Envia o post criado como resposta
        res.status(200).json(postCriado);
    } catch (error) {
        // Caso ocorra algum erro, envia uma mensagem de erro
        console.error('Erro ao criar post:', error);
        res.status(500).json({ error: 'Erro ao criar post' });
    }
}
