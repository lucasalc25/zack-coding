class Home extends Phaser.Scene {
    constructor() {
        super({ key: 'Home' });
        this.playButton;
        this.settingsButton;
        this.quitButton;
    }

    preload() {
        this.load.audio('menuMusic', './assets/sfx/new future.mp3');
        this.load.image('bgMenu', './assets/img/bgMenu.jpg');
        this.load.audio('hover', './assets/sfx/hover.mp3');
        this.load.audio('confirm', './assets/sfx/confirm.mp3');
    }

    create() {
        const menuMusic = this.sound.add('menuMusic', { loop: true });
        menuMusic.play();

        this.add.image(400, 283, 'bgMenu');

        const hover = this.sound.add('hover');
        hover.setVolume(0.5);
        const confirm = this.sound.add('confirm');

        // Adicionando opções do menu
        const playButton = this.add.text(400, 200, 'Jogar', { fontSize: '36px', fontWeight: 'bold', fill: '#fff' }).setOrigin(0.5);
        const settingsButton = this.add.text(400, 300, 'Configurações', { fontSize: '36px', fontWeight: 'bold', fill: '#fff' }).setOrigin(0.5);
        const quitButton = this.add.text(400, 400, 'Sair', { fontSize: '36px', fontWeight: 'bold', fill: '#fff' }).setOrigin(0.5);

        // Configurando interações dos botões
        playButton.setInteractive();
        settingsButton.setInteractive();
        quitButton.setInteractive();

        // Configurando interações dos botões
        [playButton, settingsButton, quitButton].forEach(button => {
            button.setInteractive();
            button.on('pointerdown', () => {
                // Desabilitando o botão para evitar ações repetidas
                menuMusic.stop();
                playButton.disableInteractive();
                settingsButton.disableInteractive();
                quitButton.disableInteractive();
                confirm.setVolume(0.7);
                confirm.play(); 
                this.scene.start('Play')
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
}
