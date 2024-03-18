class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'Play' });
        this.personagem;
        this.level;
        this.dialogueBox;
        this.dialogueText; // Variável global para o texto do diálogo
        this.textToShow = ''; // Variável global para o texto a ser exibido
        this.currentDialogueIndex = 0;
<<<<<<< Updated upstream
        this.playMusic;
        this.hover;
        this.confirm;
        this.typing;
        this.dialogues = ["E aí! Beleza? Sou o Zack...", "Bom, você já deve saber que sua missão é me ajudar, então vamos lá...", "Vou te explicar como vai funcionar.", "Você vai precisar colocar as linhas de código na ordem certa para resolver cada problema.", "Pra isso basta você clicar com o mouse na opção que quer mudar de lugar, e sem soltar o botão, arrastá-la até a posição que deseja", "Daí você solta o botão e a opção vai ser fixada, beleza?","Primeiro preciso saber qual o seu nível de programação"]
=======
        this.dialogues = ["E aí, beleza? Que bom que apareceu.", "Estou aprendendo programação e estou com dificuldade para fazer alguns exercícios", "Você já tem noções de programação?"];
>>>>>>> Stashed changes
    }

    preload() {
        this.load.image('quarto', './assets/img/quarto.png');
        this.load.image('zack', './assets/img/zack.png');
        this.load.audio('typing', './assets/sfx/typing.mp3');
        this.load.audio('playMusic', './assets/sfx/elapse.mp3');
        this.load.audio('hover', './assets/sfx/hover.mp3');
<<<<<<< Updated upstream
        this.load.audio('confirm', './assets/sfx/confirm.mp3');
=======
>>>>>>> Stashed changes
    }

    create() {
        // Adiciona o fundo
        this.add.image(400, 283, 'quarto');

<<<<<<< Updated upstream
        this.typing =  this.sound.add('typing', { loop: true });
        this.playMusic = this.sound.add('playMusic', { loop: true });
        this.hover = this.sound.add('hover');
        this.confirm =  this.sound.add('confirm');
        this.confirm.setVolume(0.1);
        this.hover.setVolume(0.5);
=======
        // Adiciona o personagem
        const personagem = this.add.image(-200, 400, 'zack');

        const playMusic = this.sound.add('playMusic', { loop: true });
        const hover = this.sound.add('hover');
        hover.setVolume(0.5);
>>>>>>> Stashed changes

        // Adiciona o audio
        this.playMusic.setVolume(0.05);
        this.playMusic.play(); 

        this.showScreen();

        setTimeout(() => {
            this.showCharacter();
        }, 1000);                   
    }

    showScreen() {
        // Adicionando um retângulo preto que cobre a tela inteira
        const blackOverlay = this.add.rectangle(300, 300, 1000, 600, 0x000000);

        this.tweens.add({
            targets: blackOverlay,
            alpha: 0, // Transparece o retangulo que cobre a tela
            duration: 1000, // Tempo da animação em milissegundos (2 segundos)
            onComplete: () => {
                blackOverlay.destroy();
<<<<<<< Updated upstream
            }
        });  
    }

    endScene() {
        this.dialogueText.setText('');

        // Condensando a dialogueBox
        this.tweens.add({
            targets: this.dialogueBox, // O alvo da animação é o sprite do personagem
            scaleY: 2, // Fator de escala vertical
            duration: 200, // Duração da animação em milissegundos (0.5 segundo neste caso)
            ease: 'Linear' // Tipo de easing (suavização) da animação
        });

       setTimeout(() => {
            // Removendo a dialogueBox 
            this.tweens.add({
                targets: this.dialogueBox,
                x: -800,
                duration: 200, // Duração da animação em milissegundos (0.5 segundo neste caso)
                ease: 'Linear',
                onComplete: () => {
                    this.tweens.add({
                        targets: this.personagem, // O alvo da animação é a imagem do personagem
                        x: -400, // Coordenada X final para onde o personagem se moverá
                        duration: 500, // Duração da animação em milissegundos (0.5 segundo neste caso)
                        ease: 'Linear', // Tipo de easing (suavização) da animação
                        yoyo: false, // Define se a animação deve se repetir reversamente (vai e volta)     
                    });
                }
            });
       }, 300)

        
    }

    showCharacter() {
        // Adiciona o personagem
        this.personagem = this.add.image(-200, 400, 'zack');

        this.tweens.add({
            targets: this.personagem, // O alvo da animação é a imagem do personagem
            x: 400, // Coordenada X final para onde o personagem se moverá
            duration: 400, // Duração da animação em milissegundos (0.5 segundo neste caso)
            ease: 'Linear', // Tipo de easing (suavização) da animação
            yoyo: false, // Define se a animação deve se repetir reversamente (vai e volta)
            onComplete: () => {
                this.startDialog() 
            }        
        });
    }

    startDialog() {
        // Adiciona a caixa de diálogo
        this.dialogueBox = this.add.rectangle(0, 470, 800, 5, 0x000000, 0.7).setOrigin(0.5, 0.5);
    
        // Mostrando parte da dialogueBox
        this.tweens.add({
            targets: this.dialogueBox,
            x: 400,
            duration: 100, // Duração da animação em milissegundos (0.5 segundo neste caso)
            ease: 'Linear'
        });

        setTimeout(() => {
            // Expandindo a dialogueBox
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

            this.showChoices()
            // this.nextDialogue.call(this);

        }, 500);
=======
                // Adicione aqui a lógica para iniciar o jogo ou transição para a próxima cena          
            
                // Define a animação de movimento horizontal
                this.tweens.add({
                    targets: personagem, // O alvo da animação é a imagem do personagem
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
            
                            this.nextDialogue.call(this);
            
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
        })
>>>>>>> Stashed changes
    }

    // Função para avançar para o próximo diálogo
    nextDialogue() {
        this.dialogueText.setText('');
<<<<<<< Updated upstream
        // Se ainda houver diálogos para exibir
        if (this.currentDialogueIndex < this.dialogues.length) {
            const currentDialogue = this.dialogues[this.currentDialogueIndex];
            // Exibe o próximo diálogo
            this.typeText(this.dialogueText, currentDialogue, 0, () => {
                // Espera pelo clique do jogador
                this.input.once('pointerdown', () => {
                    this.currentDialogueIndex++;
                    this.nextDialogue();
                });
            });
        } else if (this.currentDialogueIndex == this.dialogues.length){
            // Avança para a próxima cena
            this.showChoices();
=======
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
                    // Após a última fala, exibe os botões de escolha
                    const ultimaFalaIndex = this.dialogues.length - 1;
                    setTimeout(() => {
                        this.exibirBotoesDeEscolha();
                    },(ultimaFalaIndex + 1) * 2000); // Aguarda até que todas as falas sejam exibidas
                }
            }
>>>>>>> Stashed changes
        }
    }

    // Função para exibir o texto de forma gradual
    typeText(textObject, text, index, callback) {
        if (index < text.length) {
            this.typing.play();
            textObject.text += text[index];
            index++;
            setTimeout(() => {
                this.typeText(textObject, text, index, callback);
            }, 40); // Velocidade de digitação (em milissegundos)
        } else {
            if (typeof callback === 'function') {
                this.typing.stop();
                callback();
            }
        }
    }

<<<<<<< Updated upstream
     // Função para mostrar as opçoes de escolha
     showChoices() {
        const text = this.add.text(400, 440, 'Clique no seu nível:', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
        // Cria botões de escolha
        const beginner = this.add.text(200, 500, 'Iniciante', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
        const intermediary = this.add.text(400, 500, 'Intermediário', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
        const advanced = this.add.text(600, 500, 'Avançado', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
        
        // Configurando interações dos botões
        [beginner, intermediary, advanced].forEach(button => {
            button.setInteractive();

            button.on('pointerdown', () => {
                this.level = button.text;
                this.confirm.play();
                text.setText('');
                [beginner, intermediary, advanced].forEach(option => {
                    option.setText('');
                });
                this.typeText(this.dialogueText, `Então você é nível ${this.level}. Beleza, preparado? \nQue comecem os jogos!`, 0, () => {
                    // Espera pelo clique do jogador
                    this.input.once('pointerdown', () => {
                        this.endScene()
                        setTimeout(() => {
                            this.scene.start('Quizzes');
                        }, 1200);
                    });
                });
            });

            button.on('pointerover', () => {
                button.setStyle({ fontSize: '28px', fill: '#00BBFF' }); // Cor amarela ao passar o mouse
                this.hover.play();
            });
            button.on('pointerout', () => {
                button.setStyle({ fontSize: '24px', fill: '#fff' }); // Restaura a cor original ao retirar o mouse
            });
=======
     // Método para exibir os botões de escolha
     exibirBotoesDeEscolha() {
        console.log("Exibindo botões");
        // Cria botões de escolha
        const yesButton = this.add.text(200, 300, 'Sim', { fontFamily: 'Arial', fontSize: '24px', fill: '#ffffff' });
        const noButton = this.add.text(600, 300, 'Não', { fontFamily: 'Arial', fontSize: '24px', fill: '#ffffff' });

        // Adiciona evento de clique para o botão "Sim"
        yesButton.setInteractive();
        yesButton.on('pointerdown', () => {
            // Carrega a fase específica
            this.scene.start('Quizzes');
        });
        yesButton.on('pointerover', () => {
            yesButtonbutton.setStyle({ fontSize: '42px', fill: '#00BBFF' }); // Cor amarela ao passar o mouse
            hover.play();
        });

        // Adiciona evento de clique para o botão "Não"
        noButton.setInteractive();
        noButton.on('pointerdown', () => {
            // Carrega outra fase
            this.scene.start('Lessons');
        });
        noButton.on('pointerover', () => {
            noButtonbutton.setStyle({ fontSize: '42px', fill: '#00BBFF' }); // Cor amarela ao passar o mouse
            hover.play();
>>>>>>> Stashed changes
        });
    }
}   
  



