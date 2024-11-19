import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';  // Carrega variáveis de 

dotenv.config(); // Carrega variáveis do arquivo .env


// Configuração do banco de dados
const pool = new Pool({
    user: process.env.DB_USER,         // Usuário do banco
    host: process.env.DB_HOST,         // Host do banco
    database: process.env.DB_NAME,     // Nome do banco
    password: process.env.DB_PASSWORD, // Senha
    port: process.env.DB_PORT,         // Porta
});

// Testa a conexão com o banco de dados
pool.connect((err, client, release) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
    } else {
        console.log('Conectado ao banco de dados PostgreSQL');
    }
    release();
});

export default pool; // Exporta o pool de conexões
