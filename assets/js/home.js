class Home extends Phaser.Scene {
    constructor() {
        super({ key: 'Home' });
    }

    preload() {
        this.load.audio('menuMusic', './assets/sfx/new future.mp3');
        this.load.image('bgMenu', './assets/img/bgMenu.jpg');
        this.load.audio('hover', './assets/sfx/interface.mp3');
        this.load.audio('confirm', './assets/sfx/decide.mp3');
        this.load.audio('typing', './assets/sfx/typing.mp3');
    }

    create() {
        // Defina o evento personalizado para o redimensionamento
        window.addEventListener('resize', this.redimensionarTela.bind(this));

        const menuMusic = this.sound.add('menuMusic', { loop: true });
        menuMusic.play();

        this.add.image(270, 283, 'bgMenu');

        const hover = this.sound.add('hover');
        hover.setVolume(0.4);
        const confirm = this.sound.add('confirm');
        confirm.setVolume(0.1);

        // Adicionando opções do menu
        const playButton = this.add.text(400, 200, 'Jogar', { fontSize: '36px', fontWeight: 'bold', fill: '#fff' }).setOrigin(0.5);
        const settingsButton = this.add.text(400, 300, 'Configurações', { fontSize: '36px', fontWeight: 'bold', fill: '#fff' }).setOrigin(0.5);
        const quitButton = this.add.text(400, 400, 'Sair', { fontSize: '36px', fontWeight: 'bold', fill: '#fff' }).setOrigin(0.5);

       // Configurando interações dos botões
        [playButton, settingsButton, quitButton].forEach(button => {
            button.setInteractive();
            button.on('pointerdown', () => {
                if(button.text == 'Jogar') {
                    // Desabilitando o botão para evitar ações repetidas
                    menuMusic.stop();
                    playButton.disableInteractive();
                    settingsButton.disableInteractive();
                    quitButton.disableInteractive();
                    confirm.play(); 
                    this.scene.stop('Home');
                    this.scene.start('Play');
                }
                if(button.text == 'Sair') {
                    // Desabilitando o botão para evitar ações repetidas
                    menuMusic.stop();
                    playButton.disableInteractive();
                    settingsButton.disableInteractive();
                    quitButton.disableInteractive();
                    confirm.play(); 
                    this.scene.stop('Home')
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

        // Adicionando animação de flutuação às opções do menu
        this.tweens.add({
            targets: [playButton, settingsButton, quitButton],
            y: '+=5',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        
    }

    redimensionarTela() {
        const canvas = game.canvas;
        const largura = window.innerWidth;
        const altura = window.innerHeight;

        // Redimensione o canvas para corresponder à nova largura e altura da janela
        canvas.style.width = largura + 'px';
        canvas.style.height = altura + 'px';

        // Emita um evento personalizado para notificar outras cenas sobre o redimensionamento
        this.events.emit('redimensionarTela', larguraTela, alturaTela);
    }
}
