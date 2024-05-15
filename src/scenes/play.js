class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'Play' });
        this.bgImage;
        this.character;
        this.characterAnimated = false;
        this.nivel;
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
        this.dialogues = ["E aí! Beleza? Sou o Zack...", "Que bom que apareceu! Estou procurando alguém pra estudar programação comigo...", "Você só precisa montar uns códigos, topa?", "Beleza! Vou explicar como vai funcionar...", "Os códigos estarão na linguagem Portugol, uma linguagem própria pra estudo básico...", "Lembrando que você já deve ter alguma noção do que são algoritmos...", "Mas chega de enrolação...", "Você terá que colocar as linhas de código na ordem certa pra resolver cada problema...", "Basta clicar e arrastar as opções, beleza?", "Ao início de cada fase você vai receber uma dica...", "Mas como nem tudo são flores, você terá 3 tentativas...", "Se errar todas é game over hein!", "Agora preciso saber qual o seu nível em programação:"]
    }

    init(data) {
        this.faseInicial = data.faseInicial || 0; // Define a fase inicial como 'Fase1' se não for fornecida
    }

    create() {
        // Adiciona o fundo
        this.bgImage = this.add.image(this.game.canvas.width - 800, 0, 'quarto').setOrigin(0);

        // Adiciona o personagem
        this.character = this.add.image(-200, this.game.canvas.height / 1.4, 'zack1');

        // Adiciona a caixa de diálogo
        this.dialogueBox = this.add.rectangle(-this.game.canvas.width, this.game.canvas.height / 1.3, this.game.canvas.width, this.game.canvas.height / 100, 0x000000, 0.7).setOrigin(0.5, 0.5);
        this.currentDialogueIndex = 0;

        // Verifica o estado da música
        if (this.registry.get('musicOn')) {
            this.playMusic = this.sound.add('playMusic', { loop: true });
            this.playMusic.setVolume(localStorage.getItem("musicVolume") * 0.7);
            this.playMusic.play();
        }

        this.typing = this.sound.add('typing');
        this.hover = this.sound.add('hover');
        this.select = this.sound.add('select');
        this.select2 = this.sound.add('select2');
        this.typing.setVolume(localStorage.getItem("soundVolume"));
        this.hover.setVolume(localStorage.getItem("soundVolume")* 0.4);
        this.select.setVolume(localStorage.getItem("soundVolume") * 0.25);
        this.select2.setVolume(localStorage.getItem("soundVolume") * 0.6);

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
            const speakTween = this.tweens.add({ // Animação de fala
                targets: this.character,
                texture: 'zack2',
                duration: 100, // Duração de cada fase da animação
                repeat: -1,
                onStop: () => {
                    this.character.setTexture('zack1');
                }
            });
            speakTween.resume();
            this.typing.play();
            this.typeText(this.dialogueText, currentDialogue, 0, () => {
                // Espera pelo clique do jogador
                speakTween.stop();
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
        this.basic = this.add.text(game.canvas.width * 0.2, game.canvas.height * 0.8, 'Básico', { fontFamily: 'Arial', fontSize: '20px', fill: '#fff', padding: 15, fontWeight: 'bold' }).setOrigin(0.5);
        this.intermediary = this.add.text(game.canvas.width * 0.5, game.canvas.height * 0.8, 'Intermediário', { fontFamily: 'Arial', fontSize: '20px', fill: '#666', padding: 15, fontWeight: 'bold' }).setOrigin(0.5);
        this.advanced = this.add.text(game.canvas.width * 0.8, game.canvas.height * 0.8, 'Avançado', { fontFamily: 'Arial', fontSize: '20px', fill: '#666', padding: 15, fontWeight: 'bold' }).setOrigin(0.5);

        this.basic.setInteractive();

        // Configurando interações dos botões
        [this.basic, this.intermediary, this.advanced].forEach(button => {

            button.on('pointerdown', () => {
                this.nivel = button.text;
                localStorage.setItem("nivel", this.nivel);
                this.select2.play();
                this.textTitle.setText('');
                [this.basic, this.intermediary, this.advanced].forEach(option => {
                    option.destroy();
                });
                this.typing.play();

                const speakTween = this.tweens.add({ // Animação de fala
                    targets: this.character,
                    texture: 'zack2',
                    duration: 100, // Duração de cada fase da animação
                    repeat: -1,
                    onStop: () => {
                        console.log("onStop");
                        this.character.setTexture('zack1');
                    }
                });
                speakTween.resume();

                this.typeText(this.dialogueText, `Ok, começaremos do ${localStorage.getItem("nivel")} então. Vamos lá!`, 0, () => {
                    this.typing.stop();
                    speakTween.stop();
                
                    // Espera pelo clique do jogador
                    this.input.once('pointerdown', () => {
                        this.endScene();
                        setTimeout(() => {
                            if(this.registry.get('musicOn')) {
                                this.playMusic.stop();
                            }
                            this.scene.stop('Play');
                            if(this.nivel === 'Básico') this.scene.start('BeginnerQuiz');
                            // if(localStorage.getItem("nivel") === 'Intermediário') this.scene.start('BeginnerQuiz');
                            // if(localStorage.getItem("nivel") === 'Avançado') this.scene.start('BeginnerQuiz');
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