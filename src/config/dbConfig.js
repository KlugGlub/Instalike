import { MongoClient } from 'mongodb';

// Função assíncrona para conectar ao banco de dados MongoDB
export default async function conectarAoBanco(stringConexao) {
  // Cria um novo cliente MongoDB com a string de conexão fornecida
    const mongoClient = new MongoClient(stringConexao);

    // Tenta estabelecer a conexão com o banco de dados
    try {
        // Exibe uma mensagem no console indicando que a conexão está sendo estabelecida
        console.log('Conectando ao cluster do banco de dados...');

        // Conecta ao banco de dados de forma assíncrona
        await mongoClient.connect();

        // Exibe uma mensagem de sucesso caso a conexão seja estabelecida
        console.log('Conectado ao MongoDB Atlas com sucesso!');

        // Retorna o cliente conectado para futuras operações
        return mongoClient;
    } catch (error) {
        // Caso ocorra algum erro durante a conexão, exibe uma mensagem de erro no console e encerra o processo
        console.error('Falha na conexão com o banco!', error);
        process.exit();
    }
}