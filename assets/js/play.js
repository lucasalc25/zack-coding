class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'Play' });
        this.dialogueBox = null;
        this.dialogueText = null; // Variável global para o texto do diálogo
        this.textToShow = ''; // Variável global para o texto a ser exibido
        this.currentSceneIndex = 0;
        this.scenes = [
            { background: 'sala', dialogues: ["E aí, beleza? Que bom que apareceu.", "Meus pais precisaram fazer uma viagem e deixaram algumas tarefas pra mim.", "O problema é que não sei fazer muita coisa. Será que pode me dar uma força?"] },
            { background: 'cozinha', dialogues: ["A primeira tarefa é levar o lixo pra fora. Você só precisa organizar o algoritmo certinho, beleza?", "Caso não saiba, um algoritmo é nada mais que um conjunto de ações que depois de serem executadas deverão resolver algum problema.", "Agora é com você, manda ver!"] }
        ];
    }

    preload() {
        this.load.image('sala', './assets/img/sala.jpg');
        this.load.image('cozinha', './assets/img/cozinha.jpg');
        this.load.image('zack', './assets/img/zack.png');
        this.load.audio('playMusic', './assets/sfx/elapse.mp3');
    }

    create() {
        // Adiciona o fundo
        this.add.image(400, 283, 'sala');

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
                // Adicione aqui a lógica para iniciar o jogo ou transição para a próxima cena          
            
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
                            this.dialogueText = this.add.text(400, 470, '', { fontFamily: 'Arial', fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5, 0.5).setWordWrapWidth(600); // Largura máxima da caixa de texto
            
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
        })
    }

    // Função para avançar para o próximo diálogo
    nextDialogue() {
        this.dialogueText.setText('');
        if (this.currentSceneIndex < this.scenes.length) {
            var currentDialogue = this.scenes[this.currentSceneIndex].dialogues.shift();
            if (currentDialogue) {
                this.typeText(this.dialogueText, currentDialogue, 0, () => {
                    // Espera pelo clique do jogador
                    this.input.once('pointerdown', this.nextDialogue, this);
                });
            } else {
                // Avança para a próxima cena
                this.currentSceneIndex++;
                if (this.currentSceneIndex < this.scenes.length) {
                    this.scene.restart();
                } else {
                    console.log('Fim do jogo.');
                    // Fim do jogo
                }
            }
        }
    }

    // Função para exibir o texto de forma gradual
    typeText(textObject, text, index, callback) {
        if (index < text.length) {
            textObject.text += text[index];
            index++;
            setTimeout(() => {
                this.typeText(textObject, text, index, callback);
            }, 50); // Velocidade de digitação (em milissegundos)
        } else {
            if (typeof callback === 'function') {
                callback();
            }
        }
    }
}   


