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

        this.createConfigWindow();
        this.createOverlay();
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
            this.scene.start('Load2', { faseInicial: faseAtual }); // Inicia a cena de carregamento com a fase salva
        } else {
            this.scene.start('Load2', { faseInicial: 0 });
        }
    }

    createConfigWindow() {
         // Cria os sliders de volume, mas os mantém ocultos até clicar em "Configurações"
         this.createVolumeSliders();

         // Botão de Suporte
         this.supportButton = this.add.text(this.game.canvas.width / 2, 400, 'Suporte', { fontSize: '24px', fill: '#fff' });
         this.supportButton.setInteractive();
         this.supportButton.on('pointerdown', () => {
             this.openSupportPage();
         });

        // Botão de Voltar
        this.backButton = this.add.text(this.game.canvas.width / 2, 450, 'Voltar', { fontSize: '24px', fill: '#fff' });
        this.backButton.setInteractive();
        this.backButton.on('pointerdown', () => {
            this.hideConfigWindow();
        });

        // Configurações iniciais dos sliders
        this.updateMusicVolume(1);
        this.updateEffectsVolume(1);
        this.hideConfigWindow();
    }

    createOverlay() {
        // Cria um retângulo semi-transparente para cobrir toda a tela
        this.overlay = this.add.graphics();
        this.overlay.fillStyle(0x000000, 0.5); // Cor preta com 50% de opacidade
        this.overlay.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.overlay.setDepth(0); // Defina uma profundidade menor para que fique abaixo dos outros elementos
        this.overlay.setVisible(false); // Inicialmente, o overlay estará invisível
    }

    showConfigWindow() {
        if (this.configWindow.visible) {
            this.configWindow.setVisible(false).setDepth(0);
            this.overlay.setVisible(false).setDepth(0);
        } else {
            this.configWindow.setVisible(true).setDepth(1);
            this.overlay.setVisible(true).setDepth(0);
        }
    }

    createVolumeSliders() {
        // Cria o texto e o slider para o volume da música
        this.volumeMusicSlider = this.add.text(this.game.canvas.width / 2, 250, '|', { fontSize: '24px', fill: '#fff' });
        this.volumeMusicSlider.setInteractive();

        // Cria o texto e o slider para o volume dos efeitos sonoros
        this.volumeEffectsSlider = this.add.text(this.game.canvas.width / 2, 350, '|', { fontSize: '24px', fill: '#fff' });
        this.volumeEffectsSlider.setInteractive();

        // Adiciona os eventos para os sliders de volume
        this.volumeMusicSlider.on('pointerdown', this.startDragMusic, this);
        this.volumeEffectsSlider.on('pointerdown', this.startDragEffects, this);
        this.input.on('pointermove', this.onDragMusic, this);
        this.input.on('pointermove', this.onDragEffects, this);
        this.input.on('pointerup', this.endDrag, this);

        // Oculta os sliders até serem exibidos junto com a janela de configuração
        this.volumeMusicSlider.setVisible(false);
        this.volumeEffectsSlider.setVisible(false);
    }

    showConfigWindow() {
        // Cria a imagem da janela de configuração e a exibe
        this.configWindow = this.add.container(this.game.canvas.width / 2, this.game.canvas.height / 2);
        
        // Adiciona os elementos à janela de configuração
        this.configWindow.add([
            this.add.image(0, 0, 'configWindow').setOrigin(0.5),
            this.volumeMusicSlider,
            this.volumeEffectsSlider,
            this.supportButton,
            this.backButton
        ]);

        // Exibe os sliders de volume junto com a janela de configuração
        this.volumeMusicSlider.setVisible(true).setDepth(2);
        this.volumeEffectsSlider.setVisible(true).setDepth(2);
    }

    hideConfigWindow() {
        // Remove a janela de configuração e oculta os sliders
        if (this.configWindow) {
            this.configWindow.destroy();
        }
        this.volumeMusicSlider.setVisible(false);
        this.volumeEffectsSlider.setVisible(false);
    }

    startDragMusic(pointer) {
        this.isDraggingMusic = true;
        this.onDragMusic(pointer);
    }

    startDragEffects(pointer) {
        this.isDraggingEffects = true;
        this.onDragEffects(pointer);
    }

    onDragMusic(pointer) {
        if (this.isDraggingMusic) {
            let volume = (pointer.x - this.volumeMusicSlider.x) / this.volumeMusicSlider.width;
            volume = Phaser.Math.Clamp(volume, 0, 1);
            this.updateMusicVolume(volume);
        }
    }

    onDragEffects(pointer) {
        if (this.isDraggingEffects) {
            let volume = (pointer.x - this.volumeEffectsSlider.x) / this.volumeEffectsSlider.width;
            volume = Phaser.Math.Clamp(volume, 0, 1);
            this.updateEffectsVolume(volume);
        }
    }

    endDrag() {
        this.isDraggingMusic = false;
        this.isDraggingEffects = false;
    }

    updateMusicVolume(volume) {
        // Atualiza o volume da música
        this.registry.set('musicVolume', volume);
        this.registry.soundManager.volume = volume;
    }

    updateEffectsVolume(volume) {

        // Atualiza o volume dos efeitos sonoros
        this.registry.set('effectsVolume', volume);
    }

    openSupportPage() {
        // Implemente a lógica para abrir a página de suporte
    }

}
