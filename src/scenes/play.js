class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'Play' });
        this.bgImage;
        this.character;
        this.characterAnimated = false;
        this.level;
        this.dialogueBox;
        this.dialogueBoxAnimated = false;
        this.dialogueText; // Variável global para o texto do diálogo
        this.textToShow = ''; // Variável global para o texto a ser exibido
        this.currentDialogueIndex = 0;
        this.hover;
        this.select;
        this.typing;
        this.textTitle;
        this.touchIcon;
        this.basic;
        this.intermediary;
        this.advanced;
        this.dialogues = ["E aí! Beleza? Sou o Zack...", "Que bom que apareceu! Estou aprendendo a programar, pode me ajudar a montar uns códigos para eu poder estudá-los depois?", "Ótimo! Vou explicar como vai funcionar...", "Os códigos estarão na linguagem Portugol...", "Lembrando que você já deve ter alguma base em lógica de programação...", "Você deverá colocar linhas de código na ordem certa para resolver cada problema...", "Basta clicar e arrastar as opções, beleza?", "Agora preciso saber qual o seu nível em programação:"]
    }

    init(data) {
        this.faseInicial = data.faseInicial || 0; // Define a fase inicial como 'Fase1' se não for fornecida
    }

    create() {
        //this.scene.start('Quiz');

        // Adiciona o fundo
        this.bgImage = this.add.image(this.game.canvas.width - 800, 0, 'quarto').setOrigin(0);

        // Adiciona o personagem
        this.character = this.add.image(-200, this.game.canvas.height / 1.4, 'zack');
        // Adiciona a caixa de diálogo
        this.dialogueBox = this.add.rectangle(-this.game.canvas.width, this.game.canvas.height / 1.3, this.game.canvas.width, this.game.canvas.height / 100, 0x000000, 0.7).setOrigin(0.5, 0.5);
        this.currentDialogueIndex = 0;

        // Verifica o estado da música
        if (this.registry.get('musicOn')) {
            this.playMusic = this.sound.add('playMusic', { loop: true });
            this.playMusic.setVolume(localStorage.getItem("musicVolume"));
            this.playMusic.play();
        }

        this.typing = this.sound.add('typing');
        this.hover = this.sound.add('hover');
        this.select = this.sound.add('select');
        this.typing.setVolume(localStorage.getItem("soundVolume"));
        this.hover.setVolume(localStorage.getItem("soundVolume"));
        this.select.setVolume(localStorage.getItem("soundVolume") * 0.4);


        this.showScreen();

        setTimeout(() => {
            this.showCharacter();
        }, 1000);

    }

    update() {
    }

    shutdown() {
        this.playMusic.stop(); // Para o áudio ao sair da cena
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

    endScene() {
        this.dialogueText.setText('');

        // Condensando a dialogueBox
        this.tweens.add({
            targets: this.dialogueBox, // O alvo da animação é a caixa de diálogo
            scaleY: 2, // Fator de escala vertical
            duration: 200, // Duração da animação em milissegundos (0.5 segundo neste caso)
            ease: 'Linear' // Tipo de easing (suavização) da animação
        });
        setTimeout(() => {
            // Removendo a dialogueBox 
            this.tweens.add({
                targets: this.dialogueBox,
                x: -this.game.canvas.width,
                duration: 200, // Duração da animação em milissegundos (0.5 segundo neste caso)
                ease: 'Linear',
                onComplete: () => {
                    this.tweens.add({
                        targets: this.character, // O alvo da animação é a imagem do personagem
                        x: -this.game.canvas.width, // Coordenada X final para onde o personagem se moverá
                        duration: 500, // Duração da animação em milissegundos (0.5 segundo neste caso)
                        ease: 'Linear', // Tipo de easing (suavização) da animação
                        yoyo: false, // Define se a animação deve se repetir reversamente (vai e volta)     
                    });
                }
            });
        }, 300)
    }

    showCharacter() {
        this.tweens.add({
            targets: this.character, // O alvo da animação é a imagem do personagem
            x: this.game.canvas.width / 2, // Coordenada X final para onde o personagem se moverá
            duration: 400, // Duração da animação em milissegundos (0.5 segundo neste caso)
            ease: 'Linear', // Tipo de easing (suavização) da animação
            yoyo: false, // Define se a animação deve se repetir reversamente (vai e volta)
            onComplete: () => {
                this.characterAnimated = true;
                this.startDialog();
            }
        });
    }

    startDialog() {
        // Mostrando parte da dialogueBox
        this.tweens.add({
            targets: this.dialogueBox,
            x: this.game.canvas.width / 2,
            duration: 100, // Duração da animação em milissegundos (0.5 segundo neste caso)
            ease: 'Linear'
        });

        setTimeout(() => {
            // Expandindo a dialogueBox
            this.tweens.add({
                targets: this.dialogueBox, // O alvo da animação é o sprite do personagem
                scaleY: 30, // Fator de escala vertical
                duration: 100, // Duração da animação em milissegundos (0.5 segundo neste caso)
                ease: 'Linear',
                onComplete: () => {
                    this.dialogueBoxAnimated = true;
                } // Tipo de easing (suavização) da animação
            });
        }, 300);

        setTimeout(() => {
            // Adiciona o texto da caixa de diálogo
            this.dialogueText = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 1.3, '', { fontFamily: 'Arial', fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5, 0.5).setWordWrapWidth(this.game.canvas.width * 0.9); // Largura máxima da caixa de texto

            //this.showChoices();
            this.nextDialogue.call(this);

        }, 500);
    }
    // Função para avançar para o próximo diálogo
    nextDialogue() {
        this.dialogueText.setText('');
        // Se ainda houver diálogos para exibir
        if (this.currentDialogueIndex < this.dialogues.length) {
            const currentDialogue = this.dialogues[this.currentDialogueIndex];
            // Exibe o próximo diálogo
            this.typing.play();
            this.typeText(this.dialogueText, currentDialogue, 0, () => {
                // Espera pelo clique do jogador
                this.typing.stop();
                this.touchIcon = this.add.image(this.game.canvas.width * 0.93, this.game.canvas.height * 0.88, 'touch');
                this.tweens.add({
                    targets: this.touchIcon, // O alvo da animação é o icone de pressionar
                    y: this.touchIcon.y - 5,
                    y: this.touchIcon.y + 5,
                    duration: 500, // Duração da animação em milissegundos (0.5 segundo neste caso)
                    ease: 'Linear',
                    yoyo: true,
                    repeat: -1
                });
                this.input.once('pointerdown', () => {
                    this.touchIcon.destroy();
                    this.currentDialogueIndex++;
                    this.nextDialogue();
                });
            });
        } else if (this.currentDialogueIndex == this.dialogues.length) {
            // Avança para a próxima cena
            this.showChoices();
        }
    }

    // Função para exibir o texto de forma gradual
    typeText(textObject, text, index, callback) {
        if (index < text.length) {
            textObject.text += text[index];
            index++;
            setTimeout(() => {
                this.typeText(textObject, text, index, callback);
            }, 40); // Velocidade de digitação (em milissegundos)
        } else {
            if (typeof callback === 'function') {
                callback();
            }
        }
    }

    // Função para mostrar as opçoes de escolha
    showChoices() {
        this.textTitle = this.add.text(game.canvas.width * 0.5, game.canvas.height * 0.7, 'Clique no seu nível:', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' }).setOrigin(0.5).setWordWrapWidth(this.game.canvas.width * 0.9);
        // Cria botões de escolha
        this.basic = this.add.text(game.canvas.width * 0.2, game.canvas.height * 0.8, 'Básico', { fontFamily: 'Arial', fontSize: '20px', fill: '#fff', padding: 15, color: '#fff', fontWeight: 'bold' }).setOrigin(0.5);
        this.intermediary = this.add.text(game.canvas.width * 0.5, game.canvas.height * 0.8, 'Intermediário', { fontFamily: 'Arial', fontSize: '20px', fill: '#fff', padding: 15, color: '#fff', fontWeight: 'bold' }).setOrigin(0.5);
        this.advanced = this.add.text(game.canvas.width * 0.8, game.canvas.height * 0.8, 'Avançado', { fontFamily: 'Arial', fontSize: '20px', fill: '#fff', padding: 15, color: '#fff', fontWeight: 'bold' }).setOrigin(0.5);

        // Configurando interações dos botões
        [this.basic, this.intermediary, this.advanced].forEach(button => {
            button.setInteractive();

            button.on('pointerdown', () => {
                this.level = button.text;
                this.select.play();
                this.textTitle.setText('');
                [this.basic, this.intermediary, this.advanced].forEach(option => {
                    option.destroy();
                });
                this.typing.play();
                this.typeText(this.dialogueText, `Você é nível ${this.level}? Ok, começaremos do básico. Vamos lá!`, 0, () => {
                    this.typing.stop();
                    // Espera pelo clique do jogador
                    this.input.once('pointerdown', () => {
                        this.endScene();
                        setTimeout(() => {
                            if(this.registry.get('musicOn')) {
                                this.playMusic.stop();
                            }
                            this.scene.stop('Play');
                            this.scene.start('Quiz');
                        }, 1200);
                    });
                });
            });

            button.on('pointerover', () => {
                button.setStyle({ fontSize: '24px', fill: '#0077FF' }); // Cor amarela ao passar o mouse
                this.hover.play();
            });
            button.on('pointerout', () => {
                button.setStyle({ fontSize: '20px', fill: '#FFFFFF' }); // Restaura a cor original ao retirar o mouse
            });
        });
    }
}