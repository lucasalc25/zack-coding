import express from 'express';
import cors from 'cors'; // Importa o middleware CORS
import bodyParser from 'body-parser';
import pool from './db.js';


const app = express();

// Habilita o CORS para todas as origens
app.use(cors());

// Middleware para parsing de JSON
app.use(bodyParser.json());

app.use(express.json()); // Para processar dados JSON

// Rota para buscar dispositivo
app.get('/getPlayer/:deviceId/', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `SELECT * FROM jogador WHERE id = $1`,
            [id]
        );
        res.status(200).json(result.rows);

    } catch (error) {
        console.error('Erro ao carregar progresso:', error);
        res.status(500).json({ message: 'Erro ao carregar progresso.' });
    }
});

// Rota para criar um jogador
app.post('/createPlayer', async (req, res) => {
    const { nome_jogador } = req.body;
    try {
        const query = `
            INSERT INTO jogador (nome_jogador, fase_atual, pontuacao, desempenho) 
            VALUES ($1, 1, 0, {"tempo": 0, "acertos": 0, "erros": 0}, now(),now(),now())
            RETURNING *;
        `;
        const values = [nome_jogador];

        const result = await pool.query(query, values);

        // Retornar o jogador recém-criado
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao salvar pontuação');
    }
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor backend rodando na porta 3000');
});
