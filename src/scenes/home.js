
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
        this.showScreen();

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
        this.select2 = this.sound.add('select2');
        this.select.setVolume(this.soundVolume * 0.4);
        this.select2.setVolume(this.soundVolume * 0.7);
        this.hover.setVolume(this.soundVolume * 0.6);

        //Cria a janela de configuraçao e a deixa invisivel
        this.createConfigWindow();

        // Cria um retângulo semi-transparente para cobrir toda a tela
        this.overlay = this.add.graphics();
        this.overlay.fillStyle(0x000000, 0.5); // Cor preta com 50% de opacidade
        this.overlay.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.overlay.setDepth(3);
        this.overlay.setVisible(false); // Inicialmente, o overlay estará invisível


        this.menuFont = (1.73 * this.game.canvas.width)/100 + 28;

        // Adicionando opções do menu
        this.playBtn = this.add.text(this.game.canvas.width / 2, this.game.canvas.height * 0.2, 'Novo Jogo', { fontFamily: 'Cooper Black', fontSize: this.menuFont, fill: '#ddd' }).setOrigin(0.5, 0).setDepth(2);
        this.loadBtn = this.add.text(this.game.canvas.width / 2, this.game.canvas.height * 0.4, 'Carregar', { fontFamily: 'Cooper Black', fontSize: this.menuFont, fill: '#ddd' }).setOrigin(0.5, 0).setDepth(2);
        this.settingsBtn = this.add.text(this.game.canvas.width / 2, this.game.canvas.height * 0.6, 'Configurações', { fontFamily: 'Cooper Black', fontSize: this.menuFont, fill: '#ddd' }).setOrigin(0.5, 0).setDepth(2);
        this.quitBtn = this.add.text(this.game.canvas.width / 2, this.game.canvas.height * 0.8, 'Sair', { fontFamily: 'Cooper Black', fontSize: this.menuFont, fill: '#ddd' }).setOrigin(0.5, 0).setDepth(2);

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
                    this.scene.stop();
                    this.loadProgress();
                } else if (button.text == 'Configurações') {
                    this.select2.play();
                    this.playBtn.disableInteractive();
                    this.loadBtn.disableInteractive();
                    this.quitBtn.disableInteractive();
                    this.settingsBtn.disableInteractive();
                    this.showConfigWindow(true);
                } else if (button.text == 'Sair') {
                    this.select.play();
                    this.quitGame();
                }
            });
            button.on('pointerover', () => {
                button.setStyle({ fontSize: this.menuFont + 2, fill: '#27F1FF' }); // Cor amarela ao passar o mouse
                this.hover.play();
            });
            button.on('pointerout', () => {
                button.setStyle({ fontSize: this.menuFont, fill: '#ddd' }); // Restaura a cor original ao retirar o mouse
            });
        });

    }

    update() {
        // Efeito parallax
        this.bgImage.tilePositionY += 0.5; 
        
        // Atualiza os volumes a cada frame de acordo com a posição dos sliders 
        this.menuMusic.setVolume(this.musicSlider.slider.value);
        this.select.setVolume(this.soundSlider.slider.value * 0.25);
        this.select2.setVolume(this.soundSlider.slider.value * 0.6);
        this.hover.setVolume(this.soundSlider.slider.value * 0.6);
    
        const sliderWidth = 250; // Largura total da faixa do slider
        let musicFillWidth = sliderWidth * this.musicSlider.slider.value; // Largura do preenchimento slider de musica
        let soundFillWidth = sliderWidth * this.soundSlider.slider.value; // Largura do preenchimento slider de sons

        if(this.game.canvas.width < 400) {
            this.musicFillRect.clear(); // Limpa o retângulo de preenchimento
            this.musicFillRect.lineStyle(10, 0xED3D85, 1); // Define o estilo de linha e cor do preenchimento
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
            this.soundFillRect.lineStyle(10, 0xED3D85, 1); 
            this.soundFillRect.strokePoints([{
                    x: -125,
                    y: this.soundSlider.y
                },
                {
                    x: -125 + soundFillWidth,
                    y: this.soundSlider.y
                }
            ]);
        } else {
            this.musicFillRect.clear(); // Limpa o retângulo de preenchimento
            this.musicFillRect.lineStyle(15, 0xED3D85, 1); // Define o estilo de linha e cor do preenchimento
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
            this.soundFillRect.lineStyle(15, 0xED3D85, 1); 
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
        
    }

    resizeBackground(bg) {
        var width = window.innerWidth;
        var height = window.innerHeight;
    
        bg.width = width;
        bg.height = height;
    }

    showScreen() {
        // Adicionando um retângulo preto que cobre a tela inteira
        const blackOverlay = this.add.rectangle(this.game.canvas.width / 2, this.game.canvas.height / 2, this.game.canvas.width, this.game.canvas.height, 0x000000);

        this.tweens.add({
            targets: blackOverlay,
            alpha: 0, // Transparece o retangulo que cobre a tela
            duration: 1000, // Tempo da animação em milissegundos (2 segundos)
            onComplete: () => {
                blackOverlay.destroy();
            }
        });
    }

    checkProgress() {
        // Verifica se há progresso salvo e retorna verdadeiro se houver, falso caso contrário
        let faseAtual = localStorage.getItem("faseAtual");
        
        // Verifica se há progresso salvo
        if (faseAtual == 0 || !faseAtual) {
            // Se não houver, desabilita o botão de carregar
            this.loadBtn.alpha = 0.5;
            this.loadBtn.disableInteractive();
        }
    }

    // Função para carregar o progresso do jogador
    loadProgress() {
        let faseSalva = localStorage.getItem("faseAtual");

        if (faseSalva > 0) {
            this.scene.start('Load2', { faseInicial: faseSalva }); // Inicia a cena de carregamento com a fase salva
        } else {
            this.scene.start('Load2', { faseInicial: 0 });
        }
    }

    createConfigWindow() {
        var labelFont = (1.73 * this.game.canvas.width)/100 + 16;

        // Cria a imagem da janela de configuração
        this.configWindow = this.add.container(this.game.canvas.width / 2, this.game.canvas.height / 2).setAlpha(0);

        if(this.game.canvas.width < 400) {

            this.bgWindow = this.add.image(0, 0, 'configWindow');
            this.bgWindow.setDisplaySize(this.bgWindow.width * 0.9, this.bgWindow.height * 0.9);

            this.musicLabel = this.add.text(0, -100, 'Música', { fontFamily: 'Cooper Black', fontSize: labelFont, fill: '#fff' }).setOrigin(0.5);
            this.musicSlider = this.add.rexRoundRectangle(0, -60, 10, 10, 10, 0xED3D85);

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

            // Retângulo para preencher a área à esquerda do retângulo deslizante de música
            this.musicFillRect = this.add.graphics().lineStyle(10, 0xED3D85, 1).strokePoints([{
                x: -125,
                y: this.musicSlider.y
            },
            {
                x: this.musicSlider.x,
                y: this.musicSlider.y
            }]);

            this.soundLabel = this.add.text(0, -20 , 'Sons', { fontFamily: 'Cooper Black', fontSize: labelFont, fill: '#fff' }).setOrigin(0.5),
            this.soundSlider = this.add.rexRoundRectangle(0, 20, 10, 10, 10, 0xED3D85);

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

            // Retângulo para preencher a área à esquerda do retângulo deslizante de sons
            this.soundFillRect = this.add.graphics().lineStyle(10, 0xED3D85, 1).strokePoints([{
                x: -125,
                y: this.soundSlider.y
            },
            {
                x: this.soundSlider.x,
                y: this.soundSlider.y
            }]);

            this.supportBtn = this.add.image(0, 95, 'supportBtn1').setOrigin(0.5);
            this.supportBtn.disableInteractive();
    
            this.backBtn = this.add.image(0, 188.5, 'backBtn1').setOrigin(0.5);
            this.backBtn.setDisplaySize(145, 56);
            this.backBtn.disableInteractive();
    
            // Adiciona os elementos à janela de configuração
            this.configWindow.add([
                this.bgWindow,
                this.musicLabel,
                this.add.graphics().lineStyle(10, 0x27F1FF, 1).strokePoints(this.musicSlider.slider.endPoints),
                this.musicFillRect,
                this.musicSlider, 
                this.soundLabel,
                this.add.graphics().lineStyle(10, 0x27F1FF, 1).strokePoints(this.soundSlider.slider.endPoints),
                this.soundFillRect,
                this.soundSlider,
                this.supportBtn,
                this.backBtn 
            ]);

            this.configWindow.setVisible(false);

        } else {
            this.bgWindow = this.add.image(0, 0, 'configWindow');
            this.bgWindow.setDisplaySize(this.bgWindow.width * 1.2, this.bgWindow.height * 1.3);
            
            this.musicLabel = this.add.text(0, -120 , 'Música', { fontFamily: 'Cooper Black', fontSize: labelFont, fill: '#fff' }).setOrigin(0.5);
            this.musicSlider = this.add.rexRoundRectangle(0, -70, 10, 10, 10, 0xED3D85);

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

            // Retângulo para preencher a área à esquerda do retângulo deslizante de música
            this.musicFillRect = this.add.graphics().lineStyle(15, 0xED3D85, 1).strokePoints([{
                x: -125,
                y: this.musicSlider.y
            },
            {
                x: this.musicSlider.x,
                y: this.musicSlider.y
            }]);

            this.soundLabel = this.add.text(0, 0 , 'Sons', { fontFamily: 'Cooper Black', fontSize: labelFont, fill: '#fff' }).setOrigin(0.5),
            this.soundSlider = this.add.rexRoundRectangle(0, 50, 10, 10, 10, 0xED3D85);

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

            // Retângulo para preencher a área à esquerda do retângulo deslizante de sons
            this.soundFillRect = this.add.graphics().lineStyle(15, 0xED3D85, 1).strokePoints([{
                x: -125,
                y: this.soundSlider.y
            },
            {
                x: this.soundSlider.x,
                y: this.soundSlider.y
            }]);
            
            this.supportBtn = this.add.image(0, 160, 'supportBtn1').setOrigin(0.5).setScale(1.1);
            this.supportBtn.disableInteractive();
    
            this.backBtn = this.add.image(0, 277, 'backBtn1').setOrigin(0.5);
            this.backBtn.disableInteractive();

            // Adiciona os elementos à janela de configuração
            this.configWindow.add([
                this.bgWindow,
                this.musicLabel,
                this.add.graphics().lineStyle(15, 0x27F1FF, 1).strokePoints(this.musicSlider.slider.endPoints),
                this.musicFillRect,
                this.musicSlider, 
                this.soundLabel,
                this.add.graphics().lineStyle(15, 0x27F1FF, 1).strokePoints(this.soundSlider.slider.endPoints),
                this.soundFillRect,
                this.soundSlider,
                this.supportBtn,
                this.backBtn
            ]);

            this.configWindow.setVisible(false);
        }
    
    }

    showConfigWindow() {
        this.configWindow.setDepth(4);
        this.configWindow.setVisible(true);
        this.overlay.setVisible(true);
        this.tweens.add({
            targets: this.configWindow,
            alpha: 1, // Transparece o retangulo que cobre a tela
            duration: 100, // Tempo da animação em milissegundos (2 segundos)
        });
        this.supportBtn.setInteractive();
        this.backBtn.setInteractive();

        this.supportBtn.on('pointerdown', () => {
            this.select2.play();
            this.showSupportWindow();
        });
        this.supportBtn.on('pointerover', () => {
            this.supportBtn.setTexture('supportBtn2')
        });

        this.supportBtn.on('pointerout', () => {
            this.supportBtn.setTexture('supportBtn1')
        });

        this.backBtn.on('pointerdown', () => {
            this.select2.play();
            this.saveConfig(this.musicSlider.slider.value, this.soundSlider.slider.value);
            this.hideConfigWindow();
            this.checkProgress();
        });
        this.backBtn.on('pointerover', () => {
            this.backBtn.setTexture('backBtn2')
        });
        this.backBtn.on('pointerout', () => {
            this.backBtn.setTexture('backBtn1')
        });

        this.supportBtn.on('pointerdown', () => {
            window.alert(`Janela de suporte!`);
        });
        this.supportBtn.on('pointerover', () => {
            this.supportBtn.setTexture('supportBtn2')
        });
        this.supportBtn.on('pointerout', () => {
            this.supportBtn.setTexture('supportBtn1')
        });
    }

    showSupportWindow() {
        this.supportWindow.setDepth(5);
        this.supportWindow.setVisible(true);
        this.overlay.setVisible(true);
        this.supportBtn.setInteractive();
        this.backBtn.setInteractive();
    }

    hideConfigWindow() {
        this.tweens.add({
            targets: this.configWindow,
            alpha: 0, // Transparece o retangulo que cobre a tela
            duration: 100, // Tempo da animação em milissegundos (2 segundos)
            onComplete: () => {
                this.configWindow.setVisible(false);
            }
        });
        this.overlay.setVisible(false);
        this.playBtn.setInteractive();
        this.loadBtn.setInteractive();
        this.quitBtn.setInteractive();
        this.settingsBtn.setInteractive();
        this.settingsBtn.setStyle({fontSize: this.menuFont, fill: '#ddd'});
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