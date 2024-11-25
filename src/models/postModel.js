import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Estabelece a conexão com o banco de dados
// Utilizando a string de conexão obtida do ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados
export async function getAllPosts(params) {
  // Seleciona o banco de dados 'Instabyte'
    const db = conexao.db('Instabyte');
  // Seleciona a coleção 'posts'
    const colecao = db.collection('posts');
  // Retorna todos os documentos da coleção como um array
    return colecao.find().toArray();
}

// Função assíncrona para criar um novo post no banco de dados
export async function criarPost(novoPost) {
  // Seleciona o banco de dados 'Instabyte'
    const db = conexao.db('Instabyte');
  // Seleciona a coleção 'posts'
    const colecao = db.collection('posts');
  // Insere um novo documento na coleção e retorna o resultado da operação
    return colecao.insertOne(novoPost);
}
// Função assíncrona para criar um novo post no banco de dados
export async function atualizePost(id, novoPost) {
    // Seleciona o banco de dados 'Instabyte'
    const db = conexao.db('Instabyte');
    // Seleciona a coleção 'posts'
    const colecao = db.collection('posts');
    const objID = ObjectId.createFromHexString(id)
    // Insere um novo documento na coleção e retorna o resultado da operação
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}

