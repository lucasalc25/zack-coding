
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
        this.bgImage = this.add.tileSprite(0, 0, this.game.canvas.width, this.game.canvas.height, 'bgMenu').setOrigin(0).setDepth(1);

        this.resizeBackground.bind(this)(this.bgImage);
        window.addEventListener('resize', this.resizeBackground.bind(this, this.bgImage));

        // Inicializa o soundManager
        this.registry.soundManager = new Phaser.Sound.HTML5AudioSoundManager(this.game);
        this.registry.set('musicOn', true);
        this.musicVolume = localStorage.getItem("musicVolume");
        this.soundVolume = localStorage.getItem("soundVolume");
        this.menuMusic = this.sound.add('menuMusic', { loop: true });
        this.menuMusic.play();
        this.menuMusic.setVolume(this.musicVolume);
        this.hover = this.sound.add('hover');
        this.select = this.sound.add('select');
        this.select.setVolume(this.soundVolume * 0.4);
        this.hover.setVolume(this.soundVolume);

        //Cria a janela de configuraçao e a deixa invisivel
        this.createConfigWindow();

        // Cria um retângulo semi-transparente para cobrir toda a tela
        this.overlay = this.add.graphics();
        this.overlay.fillStyle(0x000000, 0.5); // Cor preta com 50% de opacidade
        this.overlay.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.overlay.setDepth(3);
        this.overlay.setVisible(false); // Inicialmente, o overlay estará invisível

        // Adicionando opções do menu
        this.playBtn = this.add.text(this.game.canvas.width / 2, this.game.canvas.height * 0.2, 'Novo Jogo', { fontFamily: 'Cooper Black', fontSize: '34px', fill: '#ddd' }).setOrigin(0.5, 0).setDepth(2);
        this.loadBtn = this.add.text(this.game.canvas.width / 2, this.game.canvas.height * 0.4, 'Carregar', { fontFamily: 'Cooper Black', fontSize: '34px', fill: '#ddd' }).setOrigin(0.5, 0).setDepth(2);
        this.settingsBtn = this.add.text(this.game.canvas.width / 2, this.game.canvas.height * 0.6, 'Configurações', { fontFamily: 'Cooper Black', fontSize: '36px', fill: '#ddd' }).setOrigin(0.5, 0).setDepth(2);
        this.quitBtn = this.add.text(this.game.canvas.width / 2, this.game.canvas.height * 0.8, 'Sair', { fontFamily: 'Cooper Black', fontSize: '34px', fill: '#ddd' }).setOrigin(0.5, 0).setDepth(2);

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
                    this.quitGame();
                }
            });
            button.on('pointerover', () => {
                button.setStyle({ fontSize: '40px', fill: '#27F1FF' }); // Cor amarela ao passar o mouse
                this.hover.play();
            });
            button.on('pointerout', () => {
                button.setStyle({ fontSize: '34px', fill: '#fff' }); // Restaura a cor original ao retirar o mouse
            });
        });

    }

    update() {
        // Efeito parallax
        this.bgImage.tilePositionY += 0.75; 
        
        // Atualiza os volumes a cada frame de acordo com a posição dos sliders 
        this.menuMusic.setVolume(this.musicSlider.slider.value);
        this.select.setVolume(this.soundSlider.slider.value * 0.4);
        this.hover.setVolume(this.soundSlider.slider.value);
    
        const sliderWidth = 250; // Largura total da faixa do slider
        let musicFillWidth = sliderWidth * this.musicSlider.slider.value; // Largura do preenchimento slider de musica
        let soundFillWidth = sliderWidth * this.soundSlider.slider.value; // Largura do preenchimento slider de sons

        this.musicFillRect.clear(); // Limpa o retângulo de preenchimento
        this.musicFillRect.lineStyle(12, 0xED3D85, 1); // Define o estilo de linha e cor do preenchimento
        this.musicFillRect.strokePoints([{
                x: -125,
                y: this.musicSlider.y
            },
            {
                x: -125 + musicFillWidth, // Atualiza a posição x do ponto final do preenchimento
                y: this.musicSlider.y
            }
        ]);

        this.soundFillRect.clear();
        this.soundFillRect.lineStyle(12, 0xED3D85, 1); 
        this.soundFillRect.strokePoints([{
                x: -125,
                y: this.soundSlider.y
            },
            {
                x: -125 + soundFillWidth,
                y: this.soundSlider.y
            }
        ]);
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
            // Se não houver, desabilita o botão de carregar
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

    createConfigWindow() {
        // Cria a imagem da janela de configuração
        this.configWindow = this.add.container(this.game.canvas.width / 2, this.game.canvas.height / 2);

        // Cria a imagem do slider de configuração da musica
        this.musicSlider = this.add.rexRoundRectangle(0, -65, 10, 10, 10, 0xED3D85);
        
        // Define os pontos de começo e fim do slider
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

        // Cria a imagem do slider de configuração de sons
        this.soundSlider = this.add.rexRoundRectangle(0, 35, 0, 0, 10, 0xED3D85).setDepth(2);
        
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

        this.supportBtn = this.add.text(0, 90, 'Suporte', {fontFamily: 'Cooper Black', fontSize: '24px', backgroundColor: '#ED3D85', padding: 15, color: '#fff', fontWeight: 'bold' }).setOrigin(0.5, 0);
        
        this.supportBtn.disableInteractive();

        this.backBtn = this.add.text(0, 190, 'Voltar', {fontFamily: 'Cooper Black', fontSize: '24px', backgroundColor: '#ED3D85', padding: 15, color: '#fff', fontWeight: 'bold' }).setOrigin(0.5, 0);
        
        this.backBtn.disableInteractive();

        // Retângulo para preencher a área à esquerda do retângulo deslizante de música
        this.musicFillRect = this.add.graphics().lineStyle(12, 0xED3D85, 1).strokePoints([{
                x: -125,
                y: this.musicSlider.y
            },
            {
                x: this.musicSlider.x,
                y: this.musicSlider.y
        }]);

        // Retângulo para preencher a área à esquerda do retângulo deslizante de sons
        this.soundFillRect = this.add.graphics().lineStyle(12, 0xED3D85, 1).strokePoints([{
            x: -125,
            y: this.soundSlider.y
        },
        {
            x: this.soundSlider.x,
            y: this.soundSlider.y
    }]);

        // Adiciona os elementos à janela de configuração
        this.configWindow.add([
            this.add.image(0, 0, 'configWindow').setOrigin(0.5),
            this.volumeLabel = this.add.text(0, -125 , 'Música', { fontFamily: 'Cooper Black', fontSize: '28px', fill: '#fff' }).setOrigin(0.5, 0),
            this.add.graphics().lineStyle(12, 0x27F1FF, 1).strokePoints(this.musicSlider.slider.endPoints),
            this.musicFillRect,
            this.musicSlider, 
            this.soundLabel = this.add.text(0, -25 , 'Sons', { fontFamily: 'Cooper Black', fontSize: '28px', fill: '#fff' }).setOrigin(0.5, 0),
            this.add.graphics().lineStyle(12, 0x27F1FF, 1).strokePoints(this.soundSlider.slider.endPoints),
            this.soundFillRect,
            this.soundSlider,
            this.supportBtn,
            this.backBtn 
        ]);

        this.configWindow.setVisible(false);
    }

    showConfigWindow() {
        this.configWindow.setDepth(4);
        this.configWindow.setVisible(true);
        this.overlay.setVisible(true);
        this.musicSlider.setVisible(true);
        this.supportBtn.setInteractive();
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

        this.supportBtn.on('pointerdown', () => {
            
        });
        this.supportBtn.on('pointerover', () => {
            this.supportBtn.setStyle({ fontSize: '26px', backgroundColor: '#c62869' });
            this.hover.play();
        });
        this.supportBtn.on('pointerout', () => {
            this.supportBtn.setStyle({ fontSize: '24px', backgroundColor: '#ED3D85' });
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

    quitGame() {
        // Pare a música de fundo ou quaisquer sons que estejam tocando
        if(this.registry.get('musicOn')) {
            this.menuMusic.stop();
        }

        // Limpe qualquer recurso ou dados que precisem ser liberados

        // Encerre a cena atual e retorne ao menu principal
        this.scene.stop('Home');
    }

}