class Home extends Phaser.Scene {
    constructor() {
        super({ key: 'Home' });
        this.playButton;
        this.settingsButton;
        this.quitButton;
        this.bgImage;
    }

    preload() {
        this.load.audio('menuMusic', './assets/sfx/new future.mp3');
        this.load.image('bgMenu', './assets/img/bgMenu.jpg');
        this.load.audio('hover', './assets/sfx/interface.mp3');
        this.load.audio('confirm', './assets/sfx/decide.mp3');
        this.load.audio('typing', './assets/sfx/typing.mp3');
    }

    create() {
        const menuMusic = this.sound.add('menuMusic', { loop: true });
        menuMusic.play();

        this.bgImage = this.add.tileSprite(0, 0, this.game.canvas.width, this.game.canvas.height, 'bgMenu').setOrigin(0,0);

        const hover = this.sound.add('hover');
        hover.setVolume(0.4);
        const confirm = this.sound.add('confirm');
        confirm.setVolume(0.1);

        // Adicionando opções do menu
        this.playButton = this.add.text(this.game.canvas.width/2, this.game.canvas.height*0.35, 'Jogar', { fontSize: '36px', fontWeight: 'bold', fill: '#fff' }).setOrigin(0.5);
        this.settingsButton = this.add.text(this.game.canvas.width/2, this.game.canvas.height*0.5, 'Configurações', { fontSize: '36px', fontWeight: 'bold', fill: '#fff' }).setOrigin(0.5);
        this.quitButton = this.add.text(this.game.canvas.width/2, this.game.canvas.height*0.65, 'Sair', { fontSize: '36px', fontWeight: 'bold', fill: '#fff' }).setOrigin(0.5);

       // Configurando interações dos botões
        [this.playButton, this.settingsButton, this.quitButton].forEach(button => {
            button.setInteractive();
            button.on('pointerdown', () => {
                this.playButton.disableInteractive();
                this.settingsButton.disableInteractive();
                this.quitButton.disableInteractive();
                confirm.play(); 
                menuMusic.stop();
                this.scene.stop('Home');
                if(button.text == 'Jogar') {
                    this.scene.start('Play');
                }
                if(button.text == 'Sair') {
                    // Desabilitando o botão para evitar ações repetidas
                    this.scene.start('End');
                }
            });
            button.on('pointerover', () => {
                button.setStyle({ fontSize: '42px', fill: '#00BBFF' }); // Cor amarela ao passar o mouse
                hover.play();
            });
            button.on('pointerout', () => {
                button.setStyle({ fontSize: '36px', fill: '#fff' }); // Restaura a cor original ao retirar o mouse
            });
        });

        
    }

    update() {
        this.bgImage.tilePositionY += 0.3; // Ajuste este valor para controlar a velocidade do efeito parallax
        this.checkScreen();
    }

    checkScreen() {
        const larguraAtual = this.scale.width;
        const alturaAtual = this.scale.height;

        if (this.larguraAnterior !== larguraAtual || this.alturaAnterior !== alturaAtual) {
            // O tamanho da tela foi alterado, chame o método resize() para ajustar os elementos da cena
            this.resize(larguraAtual, alturaAtual);

            // Atualize as variáveis de largura e altura anteriores
            this.larguraAnterior = larguraAtual;
            this.alturaAnterior = alturaAtual;
        }
    }

    ajustarElementos(larguraTela, alturaTela) {
        this.bgImage.setDisplaySize(larguraTela, alturaTela);
        this.playButton.setPosition(larguraTela/2, alturaTela*0.35);
        this.settingsButton.setPosition(larguraTela/2, alturaTela*0.5)
        this.quitButton.setPosition(larguraTela/2, alturaTela*0.65)
    }

    resize(larguraTela, alturaTela) {
        // Redimensione os elementos da cena quando o tamanho da tela for alterado
        this.ajustarElementos(larguraTela, alturaTela);
    }
}
