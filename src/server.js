import express from 'express';
import cors from 'cors'; // Importa o middleware CORS
import bodyParser from 'body-parser';
import pool from './db.js';


const app = express();

app.use(express.json()); // Para processar dados JSON

// Habilita o CORS para todas as origens
app.use(cors());

// Middleware para parsing de JSON
app.use(bodyParser.json());

// Rota para buscar dispositivo
app.get('/get-device/:deviceId', async (req, res) => {
    const { deviceId } = req.params;

    try {
        // Consultar a tabela de jogadores e o progresso baseado no deviceId
        const result = await pool.query(`
            SELECT p.nome, pp.pontuacao, pp.desempenho, pp.criado_em, pp.atualizado_em 
            FROM players p
            JOIN player_progress pp ON p.id = pp.id_jogador
            WHERE p.device_id = $1
        `, [deviceId]);

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Jogador não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao acessar o banco de dados:', err);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor backend rodando na porta 3000');
});
