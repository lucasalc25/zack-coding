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
        this.playButton = this.add.text(this.game.canvas.width/2, this.game.canvas.height*0.2, 'Novo Jogo', { fontSize: '36px', fill: '#fff' }).setOrigin(0.5, 0);
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

                if(button.text == 'Novo Jogo') {
                    select.play(); 
                    menuMusic.stop();
                    this.scene.stop('Home');
                    this.scene.start('Load2', { faseInicial: 0 });
                } else if(button.text == 'Carregar') {
                    select.play(); 
                    menuMusic.stop();
                    this.scene.stop('Home');
                    this.loadProgress();
                } else if(button.text == 'Configurações') {
                    this.configWindow.setVisible(true).setDepth(1);
                    this.overlay.setVisible(true).setDepth(0);
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
        // Verifica se a largura da tela é menor que 400px
        const screenWidth = this.game.canvas.width;
        const isSmallScreen = screenWidth < 400;
    
        // Define a largura da janela de configuração
        let configWindowWidth = isSmallScreen ? screenWidth * 0.9 : screenWidth * 0.5;
    
        // Cria a janela de configuração centralizada
        const configWindowHeight = this.game.canvas.height * 0.75;
        const configWindowX = (screenWidth - configWindowWidth) / 2;
        const configWindowY = (this.game.canvas.height - configWindowHeight) / 2;
    
        this.configWindow = this.add.container(configWindowX, configWindowY);
    
        // Desenha a borda
        const graphics = this.add.graphics();
        graphics.lineStyle(15, 0X00BBFF); // Define a espessura da linha e a cor
        graphics.strokeRect(0, 0, configWindowWidth, configWindowHeight); // Desenha um retângulo de contorno
    
        // Adiciona a borda ao contêiner
        this.configWindow.add(graphics);
    
        // Adiciona o fundo da janela
        const windowBackground = this.add.graphics();
        windowBackground.fillStyle(0x000000);
        windowBackground.fillRect(0, 0, configWindowWidth, configWindowHeight);
        this.configWindow.add(windowBackground);
    
        // Adicione um texto para o título
        const title = this.add.text(configWindowWidth / 2, 30, 'Opções', { fontSize: '30px', fill: '#FFFFFF', fontWeight: 'bold' }).setOrigin(0.5, 0.5);
        this.configWindow.add(title);

    
        // Adicione um texto para o campo de configuração do volume
        const volumeLabel = this.add.text(configWindowWidth / 2, 140, 'Música', { fontSize: '24px', fill: '#000000', fontWeight: 'bold', backgroundColor: '#FFFFFF', padding: 10, lineJoin: 'round', align: 'center' }).setOrigin(0.5, 0.5);
        this.configWindow.add(volumeLabel);
    
        // Adicione um texto para o campo de configuração do brilho
        const soundLabel = this.add.text(configWindowWidth / 2, 210, 'Efeitos Sonoros', { fontSize: '24px', fill: '#000000', fontWeight: 'bold', backgroundColor: '#FFFFFF', padding: 10, align: 'center' }).setOrigin(0.5, 0.5);
        this.configWindow.add(soundLabel);
    
        // Adicione um texto para o campo de configuração dos gráficos
        const graphicsLabel = this.add.text(configWindowWidth / 2, 280, 'Gráficos', { fontSize: '24px', fill: '#000000', fontWeight: 'bold', backgroundColor: '#FFFFFF', padding: 10, align: 'center' }).setOrigin(0.5, 0.5);
        this.configWindow.add(graphicsLabel);
    
        // Adicione um texto para o campo de configuração dos gráficos
        const supportLabel = this.add.text(configWindowWidth / 2, 350, 'Suporte', { fontSize: '24px', fill: '#000000', fontWeight: 'bold', backgroundColor: '#FFFFFF', padding: 10, align: 'center' }).setOrigin(0.5, 0.5);
        this.configWindow.add(supportLabel);
    
        // Adicione um botão para voltar à cena principal
        const backButton = this.add.text(configWindowWidth / 2, 420, 'Voltar', { fontSize: '24px', fill: '#000000', fontWeight: 'bold', backgroundColor: '#FFFFFF', padding: 10, align: 'center' }).setOrigin(0.5, 0.5).setInteractive();
        backButton.on('pointerdown', () => {
            this.playButton.setInteractive();
            this.loadButton.setInteractive();
            this.settingsButton.setInteractive();
            this.quitButton.setInteractive();
            // Ação ao clicar em "Não"
            this.configWindow.setVisible(false).setDepth(0); // Esconde a janela de confirmação
            this.overlay.setVisible(false).setDepth(0);
        });
        this.configWindow.add(backButton);
    
        // Obtenha a largura do soundLabel
        const labelWidth = soundLabel.width + 50;

        // Calcule as coordenadas da linha inferior
        const lineX = 60;
        const lineY = 50; // A linha começa do ponto mais baixo do texto
        const lineHeight = 1; // Espessura da linha
    
        // Desenhe a linha inferior
        const line = this.add.graphics();
        line.fillStyle(0xFFFFFF); // Cor da linha
        line.fillRect(lineX, lineY, labelWidth, lineHeight);
        this.configWindow.add(line);
    
        // Ajuste a largura dos outros elementos para a largura do soundLabel
        volumeLabel.setFixedSize(labelWidth, volumeLabel.height);
        soundLabel.setFixedSize(labelWidth, soundLabel.height);
        graphicsLabel.setFixedSize(labelWidth, graphicsLabel.height);
        supportLabel.setFixedSize(labelWidth, supportLabel.height);
        backButton.setFixedSize(labelWidth, backButton.height);
    
        // Ajuste a posição dos elementos
        volumeLabel.x = configWindowWidth / 2;
        graphicsLabel.x = configWindowWidth / 2;
        supportLabel.x = configWindowWidth / 2;
        backButton.x = configWindowWidth / 2;
    
        // Inicialmente, a janela de confirmação estará invisível
        this.configWindow.setVisible(false);
    }

    createOverlay() {
        // Cria um retângulo semi-transparente para cobrir toda a tela
        this.overlay = this.add.graphics();
        this.overlay.fillStyle(0x000000, 0.5); // Cor preta com 50% de opacidade
        this.overlay.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.overlay.setDepth(0); // Defina uma profundidade menor para que fique abaixo dos outros elementos
        this.overlay.setVisible(false); // Inicialmente, o overlay estará invisível
    }
}
