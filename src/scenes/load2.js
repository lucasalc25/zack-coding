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
        this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);      
        this.load.image('quarto', './assets/img/quarto.png');
        this.load.audio('correct', './assets/sfx/correct.mp3');
        this.load.audio('wrong', './assets/sfx/wrong.mp3');
        this.load.image('backIcon', './assets/img/back-icon.png');
        this.load.audio('hover', './assets/sfx/interface.mp3');
        this.load.audio('select', './assets/sfx/decide.mp3');
        this.load.audio('gameOver', './assets/sfx/game-over.mp3');
        this.load.audio('typing', './assets/sfx/typing.mp3');
        this.load.audio('playMusic', './assets/sfx/play.mp3');
        this.load.audio('winnerMusic', './assets/sfx/winner.mp3');

        if (this.faseInicial == 0) {
            this.load.image('zack1', './assets/img/zack1.png');
            this.load.image('zack2', './assets/img/zack2.png');
            this.load.audio('typing', './assets/sfx/typing.mp3');
            this.load.image('touch', './assets/img/touch.png');
        }
         
        this.createLoadingBar();

    }

    create() {
    }

    update() {
        if (this.loaded) {
            this.scene.stop('Load2');
            let nivel = localStorage.getItem("nivel");

            if(nivel) {
                if(nivel === 'Básico') this.scene.start('BeginnerQuiz', { faseInicial: this.faseInicial });
                // if(this.nivel === 'Intermediário') this.scene.start('IntermediaryQuiz', { faseInicial: this.faseInicial });
                // if(this.nivel === 'Avançado') this.scene.start('AdvancedQuiz', { faseInicial: this.faseInicial });
            } else {
                this.scene.start('Play');
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