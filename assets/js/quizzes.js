class Quizzes extends Phaser.Scene {
    constructor() {
        super({ key: 'Quizzes' });
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
        this.quizzCode = this.shuffle(this.phaseCode);

        // Adiciona o fundo
        this.add.image(400, 283, 'quarto');

        this.playMusic = this.sound.add('playMusic', { loop: true });
        this.playMusic.setVolume(0.05);

        this.showQuizScreen();
                 
    }

    // Função para embaralhar uma lista
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    showQuizScreen() {
        // Adiciona a caixa de diálogo
        this.dialogueBox = this.add.rectangle(400, 565, 10, 500, 0x000000, 0.9).setOrigin(0.5, 0.5);
    
        // Mostrando parte da dialogueBox
        this.tweens.add({
            targets: this.dialogueBox,
            y: 285,
            duration: 200, // Duração da animação em milissegundos (0.5 segundo neste caso)
            ease: 'Linear'
        });

        setTimeout(() => {
            // Expandindo a dialogueBox
            this.tweens.add({
                targets: this.dialogueBox, // O alvo da animação é o sprite do personagem
                scaleX: 60, // Fator de escala vertical
                duration: 200, // Duração da animação em milissegundos (0.5 segundo neste caso)
                ease: 'Linear' // Tipo de easing (suavização) da animação
            });
        }, 300);

         // Adiciona o titulo no painel
         this.textPhaseTitle = this.add.text(400, -100, this.phaseTitle, { fontFamily: 'Arial', fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5, 0.5).setWordWrapWidth(700); // Largura máxima da caixa de texto

        setTimeout(() => {
            // Animaçao do titulo
            this.tweens.add({
                targets: this.textPhaseTitle, // O alvo da animação é o texto com o título
                y: 75, // Fator de escala vertical
                duration: 300, // Duração da animação em milissegundos (0.5 segundo neste caso)
                ease: 'Linear', // Tipo de easing (suavização) da animação
            });
        }, 300);
        
        const zoneWidth = 300;
        const zoneHeight = 50;
        const padding = 10;
        let y = 150;

        // Cria zonas para as opções
        const zones = [];
        const textObjects = [];

        const zonePositions = []; // Array para armazenar as posições dos retângulos

        this.phaseCode.forEach((option, index) => {
            const zone = this.add.rectangle(400, y, zoneWidth, zoneHeight, 0xffffff, 0.3);
            zone.index = index;
            zones.push(zone);
            zonePositions.push(y); // Armazena a posição do retângulo

            const text = this.add.text(400, y, option, { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
            textObjects.push(text);

            text.dataValues = { originalY: y }; // Configura a propriedade dataValues com a posição original
            y += zoneHeight + padding;
        });

        // Habilita a opção de arrastar para as zonas (retângulos)
        zones.forEach((zone, index) => {
            zone.setInteractive();
            this.input.setDraggable(zone);

            zone.on('drag', (pointer, dragX, dragY) => {
                const text = textObjects[index];
                zone.y = dragY;
                text.y = dragY; // Atualiza a posição do texto para acompanhar o retângulo
            });

            zone.on('dragend', (pointer, dragX, dragY, dropped) => {
                if (dropped) {
                const droppedIndex = zonePositions.indexOf(zone.y); // Verifica se o retângulo foi solto em cima de outro retângulo
                if (droppedIndex !== -1 && droppedIndex !== index) {
                    // Troca as posições dos retângulos e dos textos
                    const tempY = zonePositions[droppedIndex];
                    zonePositions[droppedIndex] = zonePositions[index];
                    zonePositions[index] = tempY;

                    const tempTextY = textObjects[droppedIndex].y;
                    textObjects[droppedIndex].y = textObjects[index].y;
                    textObjects[index].y = tempTextY;

                    // Troca os textos
                    const tempText = textObjects[droppedIndex];
                    textObjects[droppedIndex] = textObjects[index];
                    textObjects[index] = tempText;
                }
            } else {
                zone.y = zonePositions[index];
                textObjects[index].y = textObjects[index].dataValues.originalY;
                }
            });
        });

        // Botão para verificar a ordem das opções
        const button = this.add.text(400, 485, 'Verificar', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
        button.setInteractive();
        button.on('pointerdown', () => {
            const isCorrectOrder = textObjects.every((text, index) => text.dataValues.correctIndex === index);

            if (isCorrectOrder) {
                console.log('Parabéns! Você reordenou a lista corretamente.');
                // Adicione a lógica para a condição de vitória aqui
            } else {
                console.log('A lista ainda não está na ordem correta.');
            }
    });

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
        
    }
}   