class Load extends Phaser.Scene {
    constructor() {
        super({ key: 'Load' });
        this.firstTime = true;
    }

    preload() {
        this.load.audio('menuMusic', './assets/sfx/menu.mp3');
        this.load.image('bgMenu', './assets/img/bgMenu.jpg');
        this.load.audio('hover', './assets/sfx/interface.mp3');
        this.load.audio('select', './assets/sfx/select blaze.mp3');
        this.load.audio('typing', './assets/sfx/typing.mp3');
    }

    create() {
        console.log('LoadScene created');
        
        this.add.text(this.game.renderer.width/2, this.game.renderer.height * 0.46, 'Loading', { fontFamily: 'Arial', fontSize: '24px', fill: '#01B2DE' }).setOrigin(0.5, 0.5);

        // Exiba uma barra de progresso ou uma animação de carregamento
        let loadingBar = this.add.graphics();
        let progressBar = new Phaser.Geom.Rectangle(this.game.renderer.width * 0.175, this.game.renderer.height * 0.5, this.game.renderer.width * 0.65, 10);
        let progressBox = this.add.graphics();

        progressBox.fillStyle(0x01B2DE, 0.8);
        progressBox.fillRect(progressBar.x - 5, progressBar.y - 5, progressBar.width + 10, progressBar.height + 10);

        this.load.on('progress', (value) => {
            loadingBar.clear();
            loadingBar.fillStyle(0x01B2DE, 1);
            loadingBar.fillRect(progressBar.x, progressBar.y, progressBar.width * value, progressBar.height);
        });

        this.load.on('complete', () => {
            // Carregamento completo
            if(this.firstTime) {
                this.scene.start('Home');
                this.firstTime = false;
            } else {
                this.scene.stop('Load'); // Pare a cena de carregamento
            }
        }, this);
        

        // Inicie o carregamento
        this.load.start();
         
    }
}