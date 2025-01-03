<<<<<<< HEAD:src/scenes/loading.js
import { loadProgress } from "../api.js";

export default class Loading extends Phaser.Scene {
    constructor() {
        super({ key: 'Loading', active: false });
        this.faseAtual;
        this.nome_jogador;
        this.fase_atual;
        this.pontuacao;
        this.desempenho;
=======
import { loadPlayerProgress, createNewPlayer } from "../db/api.js";

export default class Load1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Load1', active: false });
>>>>>>> parent of 7a934807 (v2.7):src/scenes/load1.js
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

<<<<<<< HEAD:src/scenes/load1.js
<<<<<<< HEAD:src/scenes/loading.js
        const deviceId = '238cea35-871a-4652-9330-75d3d72298a6';
=======
        const deviceId = '6c728983-2cd1-4db6-b3b8-53c705b0003c';
>>>>>>> parent of c98a436a (v3.1):src/scenes/loading.js

        loadProgress(deviceId).then(dados => {
            this.game.playerData = {
                nomeJogador: dados.nome_jogador,
                faseAtual: dados.fase_atual,
                pontuacao: dados.pontuacao,
                desempenho: dados.desempenho,
                configuracoes: dados.configuracoes
            };
        });

        console.log(this.game.playerData)
=======
        const deviceId = localStorage.getItem('deviceId');

        if (deviceId) {
            const jogadorExiste = await loadPlayerProgress(deviceId);

            if (!jogadorExiste) {
                await createNewPlayer();
            }
        } else {
            // Criar um novo jogador caso não tenha um deviceId salvo
            await createNewPlayer();
        }

        this.createLoadingBar();

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
<<<<<<< HEAD
                fontFamily: 'Cooper Black',
                fontSize: '20px',
=======
>>>>>>> parent of 5d0a7e8a (V2.5.2)
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
<<<<<<< HEAD
                fontFamily: 'Cooper Black',
=======
>>>>>>> parent of 5d0a7e8a (V2.5.2)
                fontSize: '18px',
                fill: '#FFFFFF',

            }
        });
        percentText.setOrigin(0.5, 0.5);
>>>>>>> parent of 7a934807 (v2.7):src/scenes/load1.js

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

<<<<<<< HEAD:src/scenes/loading.js
    create() {
        // Inicia a próxima cena
        this.scene.start(this.nextScene, { faseAtual: this.faseAtual }); // Começa a cena passada como parâmetro

    }
=======
>>>>>>> parent of 7a934807 (v2.7):src/scenes/load1.js
}