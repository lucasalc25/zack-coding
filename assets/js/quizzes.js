class Quizzes extends Phaser.Scene {
    constructor() {
        super({ key: 'Quizzes' });
<<<<<<< Updated upstream
        this.quizzBox;
        this.playMusic;
        this.confirm;
        this.beginnerPhases = [
            {phase: 1, title: "Fase 1: Monte a estrutura base de um código", tips: ["Primeiro declaramos as variáveis"], code: ["VAR", "INICIO", "FIMALGORITMO"]},
            {phase: 2, tips: ["Sem dica"], code: ["VAR", "a: inteiro", "INICIO", "LEIA (a)", "ESCREVA(a)", "FIMALGORITMO"]},
        ]
        this.phaseIndex = 0;
        this.phase = this.beginnerPhases[this.phaseIndex];
        this.phaseTitle = this.phase.title;
        this.phaseTips = this.phase.tips;
        this.phaseCode = this.phase.code;
        this.codeIndex = 0;
    }

    preload() {
        this.load.audio('playMusic', './assets/sfx/elapse.mp3');
        this.load.audio('confirm', './assets/sfx/confirm.mp3');
    }

    create() {
        // Embaralha as opções
        this.shuffle(this.phaseCode);

        // Adiciona o fundo
        this.add.image(400, 283, 'quarto');

        this.playMusic = this.sound.add('playMusic', { loop: true });
        this.playMusic.setVolume(0.05);

        this.startQuiz();
                 
    }

    // Função para embaralhar uma lista
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    startQuiz() {
        // Adiciona a caixa de diálogo
        this.dialogueBox = this.add.rectangle(400, 565, 10, 500, 0x000000, 0.9).setOrigin(0.5, 0.5);
    
        // Mostrando parte da dialogueBox
        this.tweens.add({
            targets: this.dialogueBox,
            y: 285,
            duration: 100, // Duração da animação em milissegundos (0.5 segundo neste caso)
            ease: 'Linear'
        });

        setTimeout(() => {
            // Expandindo a dialogueBox
            this.tweens.add({
                targets: this.dialogueBox, // O alvo da animação é o sprite do personagem
                scaleX: 60, // Fator de escala vertical
                duration: 100, // Duração da animação em milissegundos (0.5 segundo neste caso)
                ease: 'Linear' // Tipo de easing (suavização) da animação
            });
        }, 300);

=======
        // Outras variáveis da cena...
    }

    preload() {
    }

    create() {
        // Adiciona o fundo
        this.add.image(400, 283, 'quarto');

        // Adiciona o personagem
        const personagem = this.add.image(-200, 400, 'zack');

        const playMusic = this.sound.add('playMusic', { loop: true });

        // Adiciona o audio
        playMusic.setVolume(0.05);
        playMusic.play(); 

        // Adicionando um retângulo preto que cobre a tela inteira
        const blackOverlay = this.add.rectangle(300, 300, 1000, 600, 0x000000);

        this.tweens.add({
            targets: blackOverlay,
            alpha: 0, // Escurece até 70% de opacidade (ou seja, torna 30% transparente)
            duration: 2000, // Tempo da animação em milissegundos (2 segundos)
            onComplete: function() {
                blackOverlay.destroy();

                // Define a animação de movimento horizontal
                this.tweens.add({
                targets: personagem, // O alvo da animação é o sprite do personagem
                x: 400, // Coordenada X final para onde o personagem se moverá
                duration: 400, // Duração da animação em milissegundos (0.5 segundo neste caso)
                ease: 'Linear', // Tipo de easing (suavização) da animação
                yoyo: false, // Define se a animação deve se repetir reversamente (vai e volta)
                onComplete: function() {
                    // Adiciona a caixa de diálogo
                    this.dialogueBox = this.add.rectangle(0, 470, 800, 5, 0x000000, 0.7).setOrigin(0.5, 0.5);
        
                    // Animaçao 1 da dialogueBox
                    this.tweens.add({
                        targets: this.dialogueBox,
                        x: 400,
                        duration: 100, // Duração da animação em milissegundos (0.5 segundo neste caso)
                        ease: 'Linear'
                    });
        
                    setTimeout(() => {
                        // Animaçao 2 da dialogueBox
                        this.tweens.add({
                            targets: this.dialogueBox, // O alvo da animação é o sprite do personagem
                            scaleY: 30, // Fator de escala vertical
                            duration: 100, // Duração da animação em milissegundos (0.5 segundo neste caso)
                            ease: 'Linear' // Tipo de easing (suavização) da animação
                        });
                    }, 300);
        
                    setTimeout(() => {
                        // Adiciona o texto da caixa de diálogo
                        this.dialogueText = this.add.text(400, 470, '', { fontFamily: 'Arial', fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5, 0.5).setWordWrapWidth(700); // Largura máxima da caixa de texto
        
                        this.nextDialogue.call(this)
        
                        // Adiciona um evento de clique
                        this.input.on('pointerdown', () => {
                            // Se houver texto para mostrar e o texto não estiver completamente visível ainda
                            if (this.textToShow && this.dialogueText.text !== this.textToShow) {
                                this.dialogueText.setText(this.textToShow); // Define o texto completamente
                            }
                        });
                    }, 500);
                },
                callbackScope: this
            }); 
        },
        callbackScope: this
        });
    }

    // Função para avançar para o próximo diálogo
    nextDialogue() {
        this.dialogueText.setText('');
        if (this.currentDialogueIndex < this.dialogues.length) {
            var currentDialogue = this.dialogues.shift();
            if (currentDialogue) {
                this.typeText(this.dialogueText, currentDialogue, 0, () => {
                    // Espera pelo clique do jogador
                    this.input.once('pointerdown', this.nextDialogue, this);
                });
            } else {
                // Avança para a próxima cena
                this.currentDialogueIndex++;
                if (this.currentDialogueIndex < this.dialogues.length) {
                    this.scene.restart();
                } else {
                    this.exibirBotoesDeEscolha();
                }
            }
        }
>>>>>>> Stashed changes
    }

    // Função para exibir o texto de forma gradual
    typeText(textObject, text, index, callback) {
        if (index < text.length) {
            textObject.text += text[index];
            index++;
            setTimeout(() => {
                this.typeText(textObject, text, index, callback);
<<<<<<< Updated upstream
            }, 40); // Velocidade de digitação (em milissegundos)
=======
            }, 50); // Velocidade de digitação (em milissegundos)
>>>>>>> Stashed changes
        } else {
            if (typeof callback === 'function') {
                callback();
            }
        }
    }
<<<<<<< Updated upstream

     // Função para mostrar as opçoes de escolha
     showChoices() {
        
    }
}   
=======
}
>>>>>>> Stashed changes
