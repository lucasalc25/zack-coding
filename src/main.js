
var config = {
    type: Phaser.AUTO,
    width: 800, // Largura inicial
    height: 600, // Altura inicial
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Load1, Home, Load2, Play, BeginnerQuiz],
};

// Inicializa o jogo
var game = new Phaser.Game(config);

// Função para criar jogador caso não exista
async function criarJogador(idMaquina) {
    try {
        const response = await fetch('http://localhost:3000/jogadores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: idMaquina }), // Envia o ID da máquina
        });

        if (!response.ok) throw new Error('Erro ao criar jogador');
        const data = await response.json(); // Retorna os dados do jogador criado
        console.log('Jogador criado com sucesso:', data);
        return data; // Retorna os dados para a cena usar
    } catch (error) {
        console.error('Erro ao criar jogador:', error);
        return null; // Retorna nulo em caso de erro
    }
}

// Função para buscar dados do jogador com base no ID da máquina
async function buscarDadosJogador(idMaquina) {
    try {
        const response = await fetch(`http://localhost:3000/jogadores/${idMaquina}`); // Busca pelo ID da máquina
        if (!response.ok) {
            if (response.status === 404) {
                console.log('Jogador não encontrado, criando novo jogador...');
                return await criarJogador(idMaquina); // Cria o jogador se não encontrado
            }
            throw new Error('Erro na resposta do servidor');
        }
        const data = await response.json(); // Dados do jogador encontrados
        console.log('Dados do jogador encontrados:', data);
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados do jogador:', error);
        return null; // Retorna nulo em caso de erro
    }
}
