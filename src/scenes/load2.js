class Load2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Load2' });
    }

    init(data) {
        this.faseInicial = data.faseInicial || 0;
        this.width = this.game.canvas.width;
        this.height = this.game.canvas.height;
        this.loaded = false;
    }

    preload() {
        this.load.image('quarto', './assets/img/quarto.png');
        this.load.image('zack', './assets/img/zack.png');
        this.load.audio('hover', './assets/sfx/interface.mp3');
        this.load.audio('select', './assets/sfx/select blaze.mp3');
        this.load.audio('typing', './assets/sfx/typing.mp3');;
        this.load.image('touch', './assets/img/touch.png');
        this.load.audio('correct', './assets/sfx/correct.mp3');
        this.load.audio('wrong', './assets/sfx/wrong.mp3');
        this.load.image('menuIcon', './assets/img/menu-icon.jpg');

        this.createLoadingBar();

    }

    create() {
    }

    update() {
        if (this.loaded) {
            if (this.faseInicial == 0) {
                this.scene.stop('Home');
                this.scene.stop('Load2');
                this.scene.start('Quiz');
            } else {
                this.scene.stop('Home');
                this.scene.stop('Load2');
                this.scene.start('Quiz', { faseInicial: this.faseInicial });
            }
        }
    }

    createLoadingBar() {
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
            progressBar.fillStyle(0x01B2DE, 1);
            progressBar.fillRect(this.width / 6, this.height / 2, (this.width / 1.5) * value, 30);

            percentText.setText(parseInt(value * 100) + '%');
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            this.loaded = true;
        });
    }
}