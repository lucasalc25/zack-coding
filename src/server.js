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
    const query = `SELECT * FROM devices WHERE id = $1;`;

    try {
        const { rows } = await pool.query(query, [deviceId]);
        res.json(rows.length > 0 ? rows[0] : null);
    } catch (error) {
        console.error('Erro ao buscar dispositivo no banco:', error);
        res.status(500).json({ error: 'Erro ao buscar dispositivo' });
    }
});

// Rota para registrar dispositivo
app.post('/register-device', async (req, res) => {
    const query = `INSERT INTO devices DEFAULT VALUES RETURNING id;`;
    try {
        const { rows } = await pool.query(query);
        res.json({ deviceId: rows[0].id });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar o dispositivo' });
    }
});

app.get('/get-player/:deviceId', async (req, res) => {
    const { deviceId } = req.params;
    const query = `SELECT * FROM players WHERE id = $1;`;

    try {
        const { rows } = await pool.query(query, [deviceId]);
        res.json(rows.length > 0 ? rows[0] : null);
    } catch (error) {
        console.error('Erro ao buscar jogador no banco:', error);
        res.status(500).json({ error: 'Erro ao buscar jogador' });
    }
});


// Rota para criar jogador
app.post('/register-player', async (req, res) => {
    const { deviceId, nomeJogador } = req.body;
    const query = `
        INSERT INTO players (device_id, name)
        VALUES ($1, $2)
        ON CONFLICT (device_id) DO NOTHING
        RETURNING *;
    `;
    try {
        const { rows } = await pool.query(query, [deviceId, nomeJogador]);
        res.json(rows.length > 0 ? rows[0] : { message: 'Jogador já existe' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar jogador' });
    }
});


app.put('/update-player', async (req, res) => {
    const { deviceId, name, currentLevel, phasesCompleted, totalScore } = req.body;

    if (!deviceId) {
        return res.status(400).json({ error: 'deviceId é obrigatório' });
    }

    const queryUpdatePlayer = `
        UPDATE players
        SET 
            name = COALESCE($1, name),
            current_level = COALESCE($2, current_level),
            phases_completed = COALESCE($3, phases_completed),
            total_score = COALESCE($4, total_score),
            last_played = CURRENT_TIMESTAMP
        WHERE device_id = $5
        RETURNING *;
    `;

    try {
        const { rows } = await pool.query(queryUpdatePlayer, [
            name,
            currentLevel,
            phasesCompleted,
            totalScore,
            deviceId
        ]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Jogador não encontrado' });
        }

        res.json(rows[0]); // Retorna o jogador atualizado
    } catch (error) {
        console.error('Erro ao atualizar jogador:', error);
        res.status(500).json({ error: 'Erro ao atualizar jogador' });
    }
});

// Rota para obter as configurações do jogador
app.get('/get-settings/:deviceId', async (req, res) => {
    const { deviceId } = req.params;
    const query = `
        SELECT music_volume, sound_effects_volume, updated_at
        FROM game_settings
        WHERE device_id = $1;
    `;
    try {
        const { rows } = await pool.query(query, [deviceId]);
        res.json(rows.length > 0 ? rows[0] : null);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar configurações do jogador' });
    }
});

// Rota para atualizar as configurações do jogador
app.put('/update-settings/:deviceId', async (req, res) => {
    const { deviceId } = req.params;
    const { musicVolume, soundEffectsVolume } = req.body;
    const query = `
        UPDATE game_settings
        SET music_volume = $1, sound_effects_volume = $2, updated_at = CURRENT_TIMESTAMP
        WHERE device_id = $3
        RETURNING *;
    `;
    try {
        const { rows } = await pool.query(query, [musicVolume, soundEffectsVolume, deviceId]);
        res.json(rows.length > 0 ? rows[0] : null);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar configurações do jogador' });
    }
});



// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor backend rodando na porta 3000');
});
