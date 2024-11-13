// Importa o framework Express para criar o servidor web
const express = require('express');

// Importa o SQLite para interagir com o banco de dados local
const sqlite3 = require('sqlite3').verbose();

// Cria uma instância do Express para configurar o servidor
const app = express();

// Conecta ao banco de dados SQLite chamado 'jogo.db' (deve estar no mesmo diretório)
const db = new sqlite3.Database('./zack_coding.db');

// Middleware para permitir que o servidor interprete JSON no corpo das requisições
app.use(express.json());

// Rota para buscar dados de todos os jogadores
app.get('/jogadores', (req, res) => {
    // Executa uma consulta SQL para obter todos os registros da tabela 'jogadores'
    db.all('SELECT * FROM jogadores', [], (err, rows) => {
        if (err) {
            // Retorna erro 500 se houver problemas com o banco de dados
            res.status(500).send(err.message);
        } else {
            // Retorna os dados obtidos no formato JSON
            res.json(rows);
        }
    });
});

// Rota para salvar a pontuação de um jogador no banco de dados
app.post('/salvar', (req, res) => {
    // Extrai o nome e a pontuação do corpo da requisição
    const { nome, pontuacao } = req.body;

    // Insere um novo registro na tabela 'jogadores'
    db.run('INSERT INTO jogadores (nome, pontuacao) VALUES (?, ?)', [nome, pontuacao], (err) => {
        if (err) {
            // Retorna erro 500 se houver problemas durante a inserção
            res.status(500).send(err.message);
        } else {
            // Retorna uma mensagem de sucesso
            res.send('Pontuação salva com sucesso!');
        }
    });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
