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
    const { deviceId } = req.params;

    try {
        const result = await pool.query(
            `SELECT * FROM jogador WHERE id = $1`,
            [deviceId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Progresso não encontrado para o jogador.' });
        }

        res.json(result.rows[0]);

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
            INSERT INTO jogador (id, nome_jogador, fase_atual, pontuacao, desempenho, configuracoes, criado_em, atualizado_em)
            VALUES (gen_random_uuid(), $1, 1, 0, $2, $3, now(), now())
            RETURNING *;
        `;
        const desempenho = JSON.stringify({ tempo: 0, acertos: 0, erros: 0 });
        const configuracoes = JSON.stringify({ som: true, dificuldade: 'normal' });
        const values = [nome_jogador, desempenho, configuracoes];

        const result = await pool.query(query, values);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar jogador.');
    }
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor backend rodando na porta 3000');
});
