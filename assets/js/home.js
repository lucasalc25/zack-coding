class Home extends Phaser.Scene {
    constructor() {
        super({ key: 'Home',  });
        this.playButton;
        this.loadButton;
        this.settingsButton;
        this.quitButton;
        this.bgImage;
    }

    create() {
        const menuMusic = this.sound.add('menuMusic', { loop: true });
        menuMusic.play();

        this.bgImage = this.add.tileSprite(0, 0, this.game.canvas.width, this.game.canvas.height, 'bgMenu').setOrigin(0);

        const hover = this.sound.add('hover');
        hover.setVolume(0.4);
        const select = this.sound.add('select');
        select.setVolume(0.1);

        // Adicionando opções do menu
        this.playButton = this.add.text(this.game.canvas.width/2, this.game.canvas.height*0.2, 'Iniciar', { fontSize: '36px', fill: '#fff' }).setOrigin(0.5, 0);
        this.loadButton = this.add.text(this.game.canvas.width/2, this.game.canvas.height*0.4, 'Carregar', { fontSize: '36px', fill: '#fff' }).setOrigin(0.5, 0);
        this.settingsButton = this.add.text(this.game.canvas.width/2, this.game.canvas.height*0.6, 'Configurações', { fontSize: '36px', fill: '#fff' }).setOrigin(0.5, 0);
        this.quitButton = this.add.text(this.game.canvas.width/2, this.game.canvas.height*0.8, 'Sair', { fontSize: '36px', fill: '#fff' }).setOrigin(0.5, 0);

       // Configurando interações dos botões
        [this.playButton, this.loadButton, this.settingsButton, this.quitButton].forEach(button => {   
            button.setInteractive();

            // Verifica se há progresso salvo
            if (!this.checkProgress()) {
                // Se não houver progresso salvo, desabilita o botão de carregar
                this.loadButton.alpha = 0.6;
                this.loadButton.disableInteractive();
            }

            button.on('pointerdown', () => {
                this.playButton.disableInteractive();
                this.loadButton.disableInteractive();
                this.settingsButton.disableInteractive();
                this.quitButton.disableInteractive();
                
                select.play(); 
                menuMusic.stop();
                this.scene.stop('Home');
                if(button.text == 'Iniciar') {
                    this.scene.start('Load2');
                } else if(button.text == 'Carregar') {
                    this.loadProgress();
                } else if(button.text == 'Sair') {
                    this.scene.stop('Home');
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
        this.bgImage.tilePositionY += 0.5; // Ajuste este valor para controlar a velocidade do efeito parallax
    }

    checkProgress() {
        // Verifica se há progresso salvo e retorna verdadeiro se houver, falso caso contrário
        let faseAtual = localStorage.getItem("faseAtual");
        return faseAtual > 0;
    }

    // Função para carregar o progresso do jogador
    loadProgress() {
        let faseAtual = localStorage.getItem("faseAtual");

        if (faseAtual > 0) {
            faseAtual++;
            console.log("Carregando fase: " + faseAtual);
            this.scene.start('Load2', { faseInicial: faseAtual }); // Inicia a cena de carregamento com a fase salva
        } else {
            this.scene.start('Load2', { faseInicial: 0 });
        }
}
}
