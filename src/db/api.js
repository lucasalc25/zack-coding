
// Função para buscar os dados do jogador pelo deviceId
export async function registerDevice() {
    try {
        const response = await fetch('http://localhost:3000/register-device', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Erro ao registrar novo dispositivo');

        const { deviceId } = await response.json();
        localStorage.setItem('deviceId', deviceId); // Salva o novo ID na LocalStorage
        console.log('Novo dispositivo registrado:', deviceId);
        return deviceId;
    } catch (error) {
        console.error('Erro ao registrar dispositivo:', error);
        throw error;
    }
}


// Função para buscar os dados do jogador pelo deviceId
export async function getDeviceData(deviceId) {
    try {
        const response = await fetch(`http://localhost:3000/get-device/${deviceId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar dados do dispositivo: ${response.statusText}`);
        }

        // Tenta parsear como JSON
        const data = JSON.parse(response.text);
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getPlayer(deviceId) {
    try {
        const response = await fetch(`http://localhost:3000/get-player/${deviceId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log(response)

        if (!response.ok) {
            console.warn('Jogador não encontrado. Registrando um novo jogador.');
            await registerPlayer(deviceId, 'JogadorTeste');
        }

        // Tenta parsear como JSON
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function registerPlayer(deviceId, name) {
    const response = await fetch(`http://localhost:3000/register-player`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId, name })
    });
    return response.json();
}

export async function updatePlayer(deviceId, data) {
    const response = await fetch('http://localhost:3000/update-player', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId, ...data })
    });
    return response.json();
}


