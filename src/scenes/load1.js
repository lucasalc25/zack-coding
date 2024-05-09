class Load1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Load1', active: false });
    }

    init() {
        this.width = this.game.canvas.width;
        this.height = this.game.canvas.height;
        this.loaded = false;
    }

    preload() {
        this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);
        this.load.plugin('rexsliderplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js', true);
        this.load.audio('menuMusic', './assets/sfx/menu.mp3');
        this.load.image('bgMenu', './assets/img/bgMenu.jpg');
        this.load.image('configWindow', './assets/img/configWindow.png');
        this.load.image('musicOn', './assets/img/music-on.png');
        this.load.image('musicOff', './assets/img/music-off.png');
        this.load.spritesheet('supportBtn', './assets/img/support-button.png', { frameWidth: 120.05, frameHeight: 48.35});
        this.load.spritesheet('backBtn', './assets/img/back-button.png', { frameWidth: 154, frameHeight: 49.35 });
        this.load.audio('hover', './assets/sfx/interface.mp3');
        this.load.audio('select', './assets/sfx/decide.mp3');
        this.load.audio('typing', './assets/sfx/typing.mp3');
        this.load.audio('playMusic', './assets/sfx/play.mp3');

        if(!localStorage.getItem("musicVolume")) {
            localStorage.setItem("musicVolume", 0.5);
        }

        if(!localStorage.getItem("soundVolume")) {
            localStorage.setItem("soundVolume", 0.3);
        }

        this.createLoadingBar();
    }

    create() {

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
            x: this.width / 2 + 15,
            y: this.height / 2 - 20,
            text: 'Carregando...',
            style: {
                font: '20px monospace',
                fill: '#01B2DE'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        const percentText = this.make.text({
            x: this.width / 2,
            y: this.height / 2 + 15,
            text: '0%',
            style: {
                font: '18px monospace',
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