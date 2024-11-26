import { loadProgress } from "../db/api.js";

export default class Loading extends Phaser.Scene {
    constructor() {
        super({ key: 'Loading', active: false });
        this.faseAtual;
        this.nome_jogador;
        this.fase_atual;
        this.pontuacao;
        this.desempenho;
    }

    init(data) {
        this.nextScene = data.nextScene || 'MainMenu';  // Se não for fornecido, usa 'mainScene' como padrão
        this.faseAtual = data.faseAtual || 0;
        this.width = this.game.canvas.width;
        this.height = this.game.canvas.height;
        this.loaded = false;
    }

    async preload() {
        // Barra de progresso
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x01B2DE, 0.3);
        progressBox.fillRect(this.width / 6, this.height / 2, this.width / 1.5, 30);


        const loadingText = this.make.text({
            x: this.width / 2 + 15,
            y: this.height / 2 - 20,
            text: 'Carregando...',
            style: {
                font: '24px monospace',
                fill: '#01B2DE'
            }
        }).setOrigin(0.5, 0.5);

        const percentText = this.make.text({
            x: this.width / 2,
            y: this.height / 2 + 15,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#FFFFFF',

            }
        }).setOrigin(0.5, 0.5);

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
        this.load.image('quarto', './assets/img/quarto.png');
        this.load.audio('musicGameplay', './assets/sfx/play.mp3');
        this.load.audio('typing', './assets/sfx/typing.mp3');
        this.load.image('zack1', './assets/img/zack1.png');
        this.load.image('zack2', './assets/img/zack2.png');
        this.load.image('touch', './assets/img/touch.png');
        this.load.image('quarto', './assets/img/quarto.png');
        this.load.audio('musicGameplay', './assets/sfx/play.mp3');
        this.load.audio('correct', './assets/sfx/correct.mp3');
        this.load.audio('wrong', './assets/sfx/wrong.mp3');
        this.load.image('backIcon', './assets/img/back-icon.png');
        this.load.audio('hover', './assets/sfx/interface.mp3');
        this.load.audio('select', './assets/sfx/decide.mp3');
        this.load.audio('gameOver', './assets/sfx/game-over.mp3');
        this.load.audio('typing', './assets/sfx/typing.mp3');
        this.load.audio('winnerMusic', './assets/sfx/winner.mp3');

        const deviceId = 'b38ff626-1b4e-4a0b-86e1-32cc160a5a81';

        const playerData = await loadProgress(deviceId)

        // Armazena os dados em um objeto global do jogo
        this.game.playerData = {
            nomeJogador: playerData.nome_jogador,
            faseAtual: playerData.fase_atual,
            pontuacao: playerData.pontuacao,
            desempenho: playerData.desempenho,
            configuracoes: playerData.configuracoes
        };

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x01B2DE, 1);
            progressBar.fillRect(this.width / 6, this.height / 2, (this.width / 1.5) * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });
    }

    create() {
        // Inicia a próxima cena
        this.scene.start(this.nextScene, { faseAtual: this.faseAtual }); // Começa a cena passada como parâmetro

    }
}