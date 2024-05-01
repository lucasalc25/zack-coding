
class Home extends Phaser.Scene {
    constructor() {
        super({ key: 'Home' });
        this.bgImage;
        this.musicVolume;
        this.soundVolume;
        this.configWindow;
        this.overlay;
        this.playBtn;
        this.loadBtn;
        this.settingsBtn;
        this.quitBtn;
        this.supportBtn;
        this.backBtn;
        this.isDraggingMusic = false;
        this.isDraggingEffects = false;
    }

    create() {
        this.resizeBackground.bind(this, this.bgImage);
        window.addEventListener('resize', this.resizeBackground.bind(this, this.bgImage));

        // Inicializa o soundManager
        this.registry.soundManager = new Phaser.Sound.HTML5AudioSoundManager(this.game);
        this.registry.set('musicOn', true);

        this.musicVolume = localStorage.getItem("musicVolume");
        this.soundVolume = localStorage.getItem("soundVolume");

        this.menuMusic = this.sound.add('menuMusic', { loop: true });
        this.menuMusic.play();
        this.menuMusic.setVolume(this.musicVolume);

        this.bgImage = this.add.tileSprite(0, 0, this.game.canvas.width, this.game.canvas.height, 'bgMenu').setOrigin(0).setDepth(1);

        // Cria a imagem da janela de configuração e a exibe
        this.configWindow = this.add.container(this.game.canvas.width / 2, this.game.canvas.height / 2);

        this.musicSlider = this.add.rexRoundRectangle(0, -65, 0, 0, 10, 0xffffff).setDepth(5);

        this.musicSlider.slider = this.plugins.get('rexsliderplugin').add(this.musicSlider, {
            endPoints: [{
                    x: this.musicSlider.x - 125,
                    y: this.musicSlider.y
                },
                {
                    x: this.musicSlider.x + 125,
                    y: this.musicSlider.y
                }
            ],
            value: this.musicVolume
        });

        this.soundSlider = this.add.rexRoundRectangle(0, 35, 0, 0, 10, 0xffffff).setDepth(2);

        this.soundSlider.slider = this.plugins.get('rexsliderplugin').add(this.soundSlider, {
            endPoints: [{
                    x: this.soundSlider.x - 125,
                    y: this.soundSlider.y
                },
                {
                    x: this.soundSlider.x + 125,
                    y: this.soundSlider.y
                }
            ],
            value: this.soundVolume
        });

        this.backBtn = this.add.text(0, 190, 'Voltar', {fontFamily: 'Cooper Black', fontSize: '24px', backgroundColor: '#ED3D85', padding: 15, color: '#fff', fontWeight: 'bold' }).setOrigin(0.5, 0);
        
        this.backBtn.disableInteractive();

        // Adiciona os elementos à janela de configuração
        this.configWindow.add([
            this.add.image(0, 0, 'configWindow').setOrigin(0.5),
            this.volumeLabel = this.add.text(0, -125 , 'Música', { fontFamily: 'Cooper Black', fontSize: '28px', fill: '#fff' }).setOrigin(0.5, 0),
            this.musicSlider,
            this.add.graphics().lineStyle(10, 0x27F1FF, 1).strokePoints(this.musicSlider.slider.endPoints),
            this.soundLabel = this.add.text(0, -25 , 'Sons', { fontFamily: 'Cooper Black', fontSize: '28px', fill: '#fff' }).setOrigin(0.5, 0),
            this.soundSlider,
            this.add.graphics().lineStyle(10, 0x27F1FF, 1).strokePoints(this.soundSlider.slider.endPoints),
            this.backBtn 
        ]);

        this.configWindow.setVisible(false);


        // Cria um retângulo semi-transparente para cobrir toda a tela
        this.overlay = this.add.graphics();
        this.overlay.fillStyle(0x000000, 0.5); // Cor preta com 50% de opacidade
        this.overlay.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.overlay.setDepth(3);
        this.overlay.setVisible(false); // Inicialmente, o overlay estará invisível

        this.hover = this.sound.add('hover');
        this.select = this.sound.add('select');
        this.select.setVolume(this.soundVolume * 0.4);
        this.hover.setVolume(this.soundVolume);

        // Adicionando opções do menu
        this.playBtn = this.add.text(this.game.canvas.width / 2, this.game.canvas.height * 0.2, 'Novo Jogo', { fontFamily: 'Cooper Black', fontSize: '36px', fill: '#ddd' }).setOrigin(0.5, 0).setDepth(2);
        this.loadBtn = this.add.text(this.game.canvas.width / 2, this.game.canvas.height * 0.4, 'Carregar', { fontFamily: 'Cooper Black', fontSize: '36px', fill: '#ddd' }).setOrigin(0.5, 0).setDepth(2);
        this.settingsBtn = this.add.text(this.game.canvas.width / 2, this.game.canvas.height * 0.6, 'Configurações', { fontFamily: 'Cooper Black', fontSize: '36px', fill: '#ddd' }).setOrigin(0.5, 0).setDepth(2);
        this.quitBtn = this.add.text(this.game.canvas.width / 2, this.game.canvas.height * 0.8, 'Sair', { fontFamily: 'Cooper Black', fontSize: '36px', fill: '#ddd' }).setOrigin(0.5, 0).setDepth(2);

        // Configurando interações dos botões
        [this.playBtn, this.loadBtn, this.settingsBtn, this.quitBtn].forEach(button => {
            button.setInteractive();

            this.checkProgress();

            button.on('pointerdown', () => {

                if (button.text == 'Novo Jogo') {
                    this.select.play();
                    this.menuMusic.stop();
                    this.scene.stop('Home');
                    this.scene.start('Load2', { faseInicial: 0 });
                } else if (button.text == 'Carregar') {
                    this.select.play();
                    this.menuMusic.stop();
                    this.scene.stop('Home');
                    this.loadProgress();
                } else if (button.text == 'Configurações') {
                    this.playBtn.disableInteractive();
                    this.loadBtn.disableInteractive();
                    this.quitBtn.disableInteractive();
                    this.settingsBtn.disableInteractive();
                    this.showConfigWindow(true);
                } else if (button.text == 'Sair') {
                    this.scene.stop('Home');
                }
            });
            button.on('pointerover', () => {
                button.setStyle({ fontSize: '42px', fill: '#27F1FF' }); // Cor amarela ao passar o mouse
                this.hover.play();
            });
            button.on('pointerout', () => {
                button.setStyle({ fontSize: '36px', fill: '#fff' }); // Restaura a cor original ao retirar o mouse
            });
        });

    }

    update() {
        this.bgImage.tilePositionY += 0.4; // Ajuste este valor para controlar a velocidade do efeito parallax
        
        this.menuMusic.setVolume(this.musicSlider.slider.value);
        this.select.setVolume(this.soundSlider.slider.value * 0.4);
        this.hover.setVolume(this.soundSlider.slider.value);
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
        
        // Verifica se há progresso salvo
        if (!faseAtual) {
            // Se não houver progresso salvo, desabilita o botão de carregar
            this.loadBtn.alpha = 0.5;
            this.loadBtn.disableInteractive();
        }
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
        this.configWindow.setDepth(4);
        this.configWindow.setVisible(true);
        this.overlay.setVisible(true);
        this.musicSlider.setVisible(true);
        this.backBtn.setInteractive();
        this.backBtn.setInteractive();

        this.backBtn.on('pointerdown', () => {
            this.saveConfig(this.musicSlider.slider.value, this.soundSlider.slider.value);
            this.hideConfigWindow();
            this.checkProgress();
        });
        this.backBtn.on('pointerover', () => {
            this.backBtn.setStyle({ fontSize: '26px', backgroundColor: '#c62869' });
            this.hover.play();
        });
        this.backBtn.on('pointerout', () => {
            this.backBtn.setStyle({ fontSize: '24px', backgroundColor: '#ED3D85' });
        });
    }

    hideConfigWindow() {
        this.configWindow.setVisible(false);
        this.overlay.setVisible(false);
        this.musicSlider.setVisible(false);
        this.playBtn.setInteractive();
        this.loadBtn.setInteractive();
        this.quitBtn.setInteractive();
        this.settingsBtn.setInteractive();
        this.settingsBtn.setStyle({fontSize: '36px', fill: '#fff'});
    }

    // Função para salvar o progresso do jogador
    saveConfig(musicVolume, soundVolume) {
        // Verifica se o localStorage é suportado pelo navegador
        localStorage.setItem("musicVolume", musicVolume);
        localStorage.setItem("soundVolume", soundVolume);
    }

}