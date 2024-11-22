// Função para buscar o progresso do jogador
export async function loadPlayerProgress(deviceId) {
    try {
        const response = await fetch(`http://localhost:3000/api/player/${deviceId}`);

        if (response.ok) {
            const data = await response.json();
            console.log('Dados completos do jogador carregados:', data);
            return data; // Retorna o objeto completo

        } else if (response.status === 404) {
            console.log('Jogador não encontrado.');
            return null;
        } else {
            console.error('Erro ao carregar progresso do jogador:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Erro ao acessar a API do jogador:', error);
    }
}

// Função para criar um novo jogador
export async function createNewPlayer() {
    const deviceId = generateDeviceId(); // Gerar ou recuperar um ID único para o dispositivo
    localStorage.setItem('deviceId', deviceId); // Salvar no localStorage

    try {
        const response = await fetch('http://localhost:3000/api/player', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ deviceId, nome: 'Novo Jogador' }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Novo jogador criado:', data);

            // Configurar os dados do jogador no Phaser
            gameState.playerName = data.nome;
            gameState.deviceId = data.device_id;
        } else {
            console.error('Erro ao criar novo jogador:', response.status);
        }
    } catch (error) {
        console.error('Erro ao criar jogador:', error);
    }
}

// Função para gerar um ID único para o dispositivo
function generateDeviceId() {
    // Exemplo: Gera um UUID básico
    return `device_${Math.random().toString(36).substr(2, 9)}`;
}