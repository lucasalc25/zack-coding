import { registerPlayer, getPlayer, updatePlayer, registerDevice } from "../db/api.js";

export default class Load1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Load1', active: false });
    }

    init() {
        this.width = this.game.canvas.width;
        this.height = this.game.canvas.height;
        this.loaded = false;
    }

    async preload() {
        this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);
        this.load.plugin('rexsliderplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js', true);
        this.load.audio('menuMusic', './assets/sfx/war.mp3');
        this.load.image('bgMenu', './assets/img/bgMenu.jpg');
        this.load.image('configWindow', './assets/img/configWindow.png');
        this.load.image('musicOn', './assets/img/music-on.png');
        this.load.image('musicOff', './assets/img/music-off.png');
        this.load.image('supportBtn1', './assets/img/support-button1.png');
        this.load.image('supportBtn2', './assets/img/support-button2.png');
        this.load.image('backBtn1', './assets/img/back-button1.png');
        this.load.image('backBtn2', './assets/img/back-button2.png');
        this.load.audio('hover', './assets/sfx/interface.mp3');
        this.load.audio('select', './assets/sfx/decide.mp3');
        this.load.audio('select2', './assets/sfx/select2.mp3');

        const storedDeviceId = localStorage.getItem("deviceId")

        // Se já existe um deviceId armazenado, verificamos no banco de dados
        if (storedDeviceId) {
            try {
                console.log("Existe um storedDevice:", storedDeviceId)
                const responseId = await fetch(`http://localhost:3000/get-device/${storedDeviceId}`);
                if (responseId.ok) {
                    const device = await responseId.json();
                    if (device) {
                        console.log('Dispositivo encontrado no banco de dados:', device);
                        const responsePlayer = await getPlayer(storedDeviceId)
                        console.log(responsePlayer)

                    } else {
                        console.warn('DeviceId armazenado localmente não está no banco de dados. Registrando novo dispositivo.');
                        await registerDevice();
                        await registerPlayer(storedDeviceId, 'JogadorTeste');
                        const playerData = await getPlayer(storedDeviceId)

                        if (playerData) {
                            console.log('Dados do jogador obtidos:', playerData);
                        } else {
                            console.log('Nenhum jogador vinculado ao dispositivo:', storedDeviceId);
                        }
                    }
                } else {
                    // Se o deviceId local não for válido ou não existir, registra um novo
                    console.warn('DeviceId armazenado localmente não está na localStorage. Registrando novo dispositivo.');
                    await registerDevice();
                    await registerPlayer(storedDeviceId, 'JogadorTeste');
                    const playerData = await getPlayer(storedDeviceId)

                    if (playerData) {
                        console.log('Dados do jogador obtidos:', playerData);
                    } else {
                        console.log('Nenhum jogador vinculado ao dispositivo:', storedDeviceId);
                    }
                }

                this.createLoadingBar();
            } catch (error) {
                console.error('Erro ao verificar dispositivo no banco:', error);
            }
        }


    }

    update() {
        if (this.loaded) {
            this.scene.stop('Load1');
            this.scene.start('Home');
        }
    }

    createLoadingBar() {
        // Barra de progresso
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x01B2DE, 0.8);
        progressBox.fillRect(this.width / 6, this.height / 2, this.width / 1.5, 30);


        const loadingText = this.make.text({
            x: this.width / 2,
            y: this.height / 2 - 20,
            text: 'Carregando...',
            style: {
                fontFamily: 'Anton',
                fontSize: '24px',
                fontFamily: 'Cooper Black',
                fontSize: '20px',
                fill: '#01B2DE'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        const percentText = this.make.text({
            x: this.width / 2,
            y: this.height / 2 + 15,
            text: '0%',
            style: {
                fontFamily: 'Anton',
                fontFamily: 'Cooper Black',
                fontSize: '18px',
                fill: '#FFFFFF',

            }
        });
        percentText.setOrigin(0.5, 0.5);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(this.width / 6, this.height / 2, (this.width / 1.5) * value, 30);

            percentText.setText(parseInt(value * 100) + '%');
        });

        this.load.on('complete', () => {
            this.loaded = true;
        });
    }

}