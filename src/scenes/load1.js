class Load1 extends Phaser.Scene {
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

        if (!localStorage.getItem("musicVolume")) {
            localStorage.setItem("musicVolume", 0.5);
        }

        if (!localStorage.getItem("soundVolume")) {
            localStorage.setItem("soundVolume", 0.3);
        }

        this.createLoadingBar();
    }

    async create() {
        const idMaquina = window.navigator.userAgent; // Identificador da máquina (substitua com algo dinâmico, como hash)

        // Busca ou cria jogador
        const jogador = await this.buscarDadosJogador(idMaquina);

        if (jogador) {
            this.add.text(50, 50, `Bem-vindo, ${jogador.nome}!`, {
                font: '16px Arial',
                fill: '#fff',
            });
        } else {
            this.add.text(50, 50, 'Erro ao buscar ou criar jogador.', {
                font: '16px Arial',
                fill: '#ff0000',
            });
        }
    }

    update() {
        if (this.loaded) {
            this.scene.stop('Load1');
            this.scene.start('Home');
        }
    }

}