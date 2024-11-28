export async function loadProgress(deviceId) {
    try {
        const response = await fetch(`http://localhost:3000/getPlayer/${deviceId}`);
        const data = await response.json();
        console.log('Dados recebidos:', data); // Verifique o conteúdo aqui
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return [];
    }
}

// Função para criar um novo jogador
export async function createPlayer() {
    const deviceId = generateDeviceId(); // Gerar ou recuperar um ID único para o dispositivo
    console.log("ID gerado:", deviceId)
    localStorage.setItem('deviceId', deviceId); // Salvar no localStorage
    console.log("ID salvo na localStorage")

    try {
        const response = await fetch('http://localhost:3000/createPlayer', {
            method: 'POST', // Definindo que a requisição será POST
            headers: {
                'Content-Type': 'application/json', // Tipo de conteúdo que estamos enviando
            },
            body: JSON.stringify({
                nome_jogador: nomeJogador,  // Envia o nome do jogador
            }),
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar os dados');
        }

        const data = await response.json();
        console.log('Dados salvos com sucesso:', data);
        return data; // Retorna os dados inseridos no banco
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
        return null; // Retorna null em caso de erro
    }
}

// Função para gerar um ID único para o dispositivo
function generateDeviceId() {
    // Exemplo: Gera um UUID básico
    console.log("Gerando ID...")
    return `${Math.random().toString(36).substr(2, 9)}`;
}