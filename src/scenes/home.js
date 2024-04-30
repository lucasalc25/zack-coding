
class Home extends Phaser.Scene {
    constructor() {
        super({ key: 'Home' });
        this.playButton;
        this.loadButton;
        this.settingsButton;
        this.quitButton;
        this.bgImage;
        this.configWindow;
        this.overlay;
        this.volumeMusicText;
        this.volumeMusicSlider;
        this.volumeEffectsText;
        this.volumeEffectsSlider;
        this.supportButton;
        this.backButton;
        this.configWindow;
        this.isDraggingMusic = false;
        this.isDraggingEffects = false;
    }

    create() {
        // Inicializa o soundManager
        this.registry.soundManager = new Phaser.Sound.HTML5AudioSoundManager(this.game);
        this.registry.set('musicOn', true);

        this.menuMusic = this.sound.add('menuMusic', { loop: true });
        this.menuMusic.play();

        this.bgImage = this.add.tileSprite(0, 0, this.game.canvas.width, this.game.canvas.height, 'bgMenu').setOrigin(0);

        // Cria a imagem da janela de configuração e a exibe
        this.configWindow = this.add.container(this.game.canvas.width / 2, this.game.canvas.height / 2);

        this.img = this.add.rexRoundRectangle(400, 300, 0, 0, 10, 0xffffff);

        this.img.slider = this.plugins.get('rexsliderplugin').add(this.img, {
            endPoints: [{
                    x: this.img.x - 200,
                    y: this.img.y
                },
                {
                    x: this.img.x + 200,
                    y: this.img.y
                }
            ],
            value: 0.25
        });
    

        // Adiciona os elementos à janela de configuração
        this.configWindow.add([
            this.add.image(0, 0, 'configWindow').setOrigin(0.5),
            this.volumeLabel = this.add.text(0, -125 , 'Música', { fontFamily: 'Cooper Black', fontSize: '28px', fill: '#fff' }).setOrigin(0.5, 0),
            this.img 
        ]);



        this.configWindow.setVisible(false);


        // Cria um retângulo semi-transparente para cobrir toda a tela
        this.overlay = this.add.graphics();
        this.overlay.fillStyle(0x000000, 0.5); // Cor preta com 50% de opacidade
        this.overlay.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.overlay.setVisible(false); // Inicialmente, o overlay estará invisível

        this.resizeBackground.bind(this)(this.bgImage);
        window.addEventListener('resize', this.resizeBackground.bind(this, this.bgImage));

        const hover = this.sound.add('hover');
        hover.setVolume(0.4);
        const select = this.sound.add('select');
        select.setVolume(0.1);

        // Adicionando opções do menu
        this.playButton = this.add.text(this.game.canvas.width / 2, this.game.canvas.height * 0.2, 'Novo Jogo', { fontSize: '36px', fill: '#fff' }).setOrigin(0.5, 0);
        this.loadButton = this.add.text(this.game.canvas.width / 2, this.game.canvas.height * 0.4, 'Carregar', { fontSize: '36px', fill: '#fff' }).setOrigin(0.5, 0);
        this.settingsButton = this.add.text(this.game.canvas.width / 2, this.game.canvas.height * 0.6, 'Configurações', { fontSize: '36px', fill: '#fff' }).setOrigin(0.5, 0);
        this.quitButton = this.add.text(this.game.canvas.width / 2, this.game.canvas.height * 0.8, 'Sair', { fontSize: '36px', fill: '#fff' }).setOrigin(0.5, 0);

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

                if (button.text == 'Novo Jogo') {
                    select.play();
                    this.menuMusic.stop();
                    this.scene.stop('Home');
                    this.scene.start('Load2', { faseInicial: 0 });
                } else if (button.text == 'Carregar') {
                    select.play();
                    this.menuMusic.stop();
                    this.scene.stop('Home');
                    this.loadProgress();
                } else if (button.text == 'Configurações') {
                    this.showConfigWindow();
                } else if (button.text == 'Sair') {
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
        this.bgImage.tilePositionY += 0.4; // Ajuste este valor para controlar a velocidade do efeito parallax
    }

    resizeBackground(bg) {
        var width = window.innerWidth;
        var height = window.innerHeight;
    
        bg.width = width;
        bg.height = height;
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
            this.scene.start('Load2', { faseInicial: faseAtual }); // Inicia a cena de carregamento com a fase salva
        } else {
            this.scene.start('Load2', { faseInicial: 0 });
        }
    }

    showConfigWindow() {
        this.configWindow.setVisible(true);
        this.overlay.setVisible(true);
        this.configWindow.setDepth(1);
        this.img.setVisible(true);
        this.add.graphics()
        .lineStyle(3, 0x55ff55, 1)
        .strokePoints(this.img.slider.endPoints) 
    }

}