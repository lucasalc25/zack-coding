// Configurações do jogo
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 565,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Inicializa o jogo
var game = new Phaser.Game(config);

// Variáveis globais
let playButton, settingsButton, quitButton;
var dialogueBox;
var dialogueText; // Variável global para o texto do diálogo
var textToShow = ''; // Variável global para o texto a ser exibido
var currentScene = 0;
var scenes = [
    { background: 'sala', dialogues: ["E aí, beleza? Que bom que apareceu.", "Meus pais precisaram fazer uma viagem e deixaram algumas tarefas pra mim.", "O problema é que não sei fazer muita coisa. Será que pode me dar uma força?"] },
    { background: 'cozinha', dialogues: ["A primeira tarefa é levar o lixo pra fora. Você só precisa organizar o algoritmo certinho, beleza?", "Caso não saiba, um algoritmo é nada mais que um conjunto de ações que depois de serem executadas deverão resolver algum problema.", "Agora é com você, manda ver!"] }
];

// Função de pré-carregamento   
function preload() {
    this.load.image('bgMenu', './assets/img/bgMenu.jpg');
    this.load.image('sala', './assets/img/sala.jpg');
    this.load.image('cozinha', './assets/img/cozinha.jpg');
    this.load.image('zack', './assets/img/zack.png');
    this.load.audio('menuMusic', './assets/sfx/new future.mp3');
    this.load.audio('playMusic', './assets/sfx/elapse.mp3');
    this.load.audio('hover', './assets/sfx/hover.mp3');
    this.load.audio('confirm', './assets/sfx/confirm.mp3');
}

// Função de criação
function create() {
    const menuMusic = this.sound.add('menuMusic', { loop: true });
    menuMusic.play();   

    const bgMenu = this.add.image(400, 283, 'bgMenu');

    const hover = this.sound.add('hover');
    hover.setVolume(0.5);

    // Adicionando opções do menu
    const playButton = this.add.text(400, 200, 'Jogar', { fontSize: '36px', fontWeight: 'bold', fill: '#fff' }).setOrigin(0.5);
    const settingsButton = this.add.text(400, 300, 'Configurações', { fontSize: '36px', fontWeight: 'bold', fill: '#fff' }).setOrigin(0.5);
    const quitButton = this.add.text(400, 400, 'Sair', { fontSize: '36px', fontWeight: 'bold', fill: '#fff' }).setOrigin(0.5);

    // Configurando interações dos botões
    playButton.setInteractive();
    settingsButton.setInteractive();
    quitButton.setInteractive();

    // Configurando interações dos botões
    [playButton, settingsButton, quitButton].forEach(button => {
        button.setInteractive();
        button.on('pointerdown', () => {
            // Adicione aqui a lógica para cada botão
            if(button.text == "Jogar") {
                const confirm = this.sound.add('confirm');
                confirm.setVolume(0.5);
                confirm.play();

                // Desabilitando o botão para evitar ações repetidas
                playButton.disableInteractive();
                settingsButton.disableInteractive();
                quitButton.disableInteractive();

                // Adicionando um retângulo preto que cobre a tela inteira
                const blackOverlay = this.add.rectangle(0, 0, 800, 565, 0x000000).setOrigin(0);

                // Configurando a transparência inicial do retângulo para 0 (totalmente transparente)
                blackOverlay.alpha = 0;

                this.tweens.add({
                    targets: blackOverlay,
                    alpha: 0.7, // Escurece até 70% de opacidade (ou seja, torna 30% transparente)
                    duration: 2000, // Tempo da animação em milissegundos (1 segundo)
                    onComplete: function() {
                        // Criando uma animação para escurecer gradualmente o retângulo
                        this.tweens.add({
                            targets: blackOverlay,
                            alpha: 0, // Escurece até 70% de opacidade (ou seja, torna 30% transparente)
                            duration: 2000, // Tempo da animação em milissegundos (1 segundo)
                            onComplete: function() {
                                startGame.call();
                                // Removendo o retângulo da cena
                                blackOverlay.destroy();
                            }
                        });
                    }
                });      
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

    // Adicionando animação de flutuação às opções do menu
    this.tweens.add({
        targets: [playButton, settingsButton, quitButton],
        y: '+=5',
        duration: 1000,
        yoyo: true,
        repeat: -1
    });
}

// Função de criação
function update() {
}

function startGame() {
    // Adicione aqui a lógica para iniciar o jogo ou transição para a próxima cena
    // Adiciona o fundo
    this.add.image(400, 283, scenes[currentScene].background);

    // Adiciona o audio
    const playMusic = this.sound.add('playMusic', { loop: true });
    playMusic.setVolume(0.05);
    menuMusic.stop();
    playMusic.play(); 
    
    // Adiciona o personagem
    var personagem = this.add.image(-200, 400, 'zack');

    // Define a animação de movimento horizontal
    this.tweens.add({
        targets: personagem, // O alvo da animação é o sprite do personagem
        x: 400, // Coordenada X final para onde o personagem se moverá
        duration: 400, // Duração da animação em milissegundos (0.5 segundo neste caso)
        ease: 'Linear', // Tipo de easing (suavização) da animação
        yoyo: false, // Define se a animação deve se repetir reversamente (vai e volta)
        repeat: 0, // Define quantas vezes a animação deve ser repetida (-1 significa repetir infinitamente)
        onComplete: function() {
            // Adiciona a caixa de diálogo
            dialogueBox = this.add.rectangle(0, 470, 800, 5, 0x000000, 0.7);
            dialogueBox.setOrigin(0.5, 0.5);

            // Animaçao 1 da dialogueBox
            this.tweens.add({
                targets: dialogueBox,
                x: 400,
                duration: 100, // Duração da animação em milissegundos (0.5 segundo neste caso)
                ease: 'Linear'
            });

            setTimeout(() => {
                // Animaçao 2 da dialogueBox
                this.tweens.add({
                    targets: dialogueBox, // O alvo da animação é o sprite do personagem
                    scaleY: 30, // Fator de escala vertical
                    duration: 100, // Duração da animação em milissegundos (0.5 segundo neste caso)
                    ease: 'Linear' // Tipo de easing (suavização) da animação
                });
            }, 300);

            setTimeout(() => {
                // Adiciona o texto da caixa de diálogo
                dialogueText = this.add.text(400, 470, '', { fontFamily: 'Arial', fontSize: '24px', fill: '#ffffff' });
                dialogueText.setOrigin(0.5, 0.5);
                dialogueText.setWordWrapWidth(600); // Largura máxima da caixa de texto

                nextDialogue.call(this)

                // Adiciona um evento de clique
                this.input.on('pointerdown', () => {
                    // Se houver texto para mostrar e o texto não estiver completamente visível ainda
                    if (textToShow && dialogueText.text !== textToShow) {
                    dialogueText.setText(textToShow); // Define o texto completamente
                    }
                });
            }, 500);
        },
        callbackScope: this
    }); 
}

// Função para avançar para o próximo diálogo
function nextDialogue() {
    dialogueText.setText('');
    if (currentScene < scenes.length) {
        var currentDialogue = scenes[currentScene].dialogues.shift();
        if (currentDialogue) {
            typeText(dialogueText, currentDialogue, 0, () => {
                // Espera pelo clique do jogador
                this.input.once('pointerdown', nextDialogue, this);
            });
        } else {
            // Avança para a próxima cena
            currentScene++;
            if (currentScene < scenes.length) {
                this.scene.restart();
            } else {
                console.log('Fim do jogo.');
                // Fim do jogo
            }
        }
    }
}

// Função para exibir o texto de forma gradual
function typeText(textObject, text, index, callback) {
    if (index < text.length) {
        textObject.text += text[index];
        index++;
        setTimeout(() => {
            typeText(textObject, text, index, callback);
        }, 50); // Velocidade de digitação (em milissegundos)
    } else {
        if (typeof callback === 'function') {
            callback();
        }
    }
}
