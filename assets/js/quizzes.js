
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
        this.column;
        this.lines;
        this.draggingCard;
        this.quizzCode = [];
        this.currentOrder = [];
        this.codeIndex = 0;
    }

    preload() {
        this.load.audio('playMusic', './assets/sfx/elapse.mp3');
        this.load.audio('confirm', './assets/sfx/confirm.mp3');
    }

    create() {

        // Embaralha as opções
        this.quizzCode = this.shuffle([...this.phaseCode]); // Cópia embaralhada do phaseCode
        console.log(this.quizzCode)

        // Adiciona o fundo
        this.add.image(400, 283, 'quarto');

        this.playMusic = this.sound.add('playMusic', { loop: true });
        this.playMusic.setVolume(0.05);

        this.showQuizScreen();
                 
    }

    update() {

    }

    // Função para embaralhar uma lista
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    showQuizScreen() {
        // Adiciona a caixa de diálogo
        this.dialogueBox = this.add.rectangle(400, 565, 10, 565, 0x000000, 0.9).setOrigin(0.5, 0.5);
    
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
         this.textPhaseTitle = this.add.text(400, -100, this.phaseTitle, { fontFamily: 'Arial', fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5, 0.5).setWordWrapWidth(700); // Largura máxima da caixa de texto

        setTimeout(() => {
            // Animaçao do titulo
            this.tweens.add({
                targets: this.textPhaseTitle, // O alvo da animação é o texto com o título
                y: 35, // Fator de escala vertical
                duration: 300, // Duração da animação em milissegundos (0.5 segundo neste caso)
                ease: 'Linear', // Tipo de easing (suavização) da animação
            });
        }, 300);

        const column = document.createElement('div');
        column.className = 'column';

        // Criação de três divs filhas com classe "line" e atributo draggable definido como true
        for (let i = 0; i < this.phaseCode.length+1; i++) {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'line';
            lineDiv.draggable = true;
            // Defina o conteúdo do div como a string atual
            lineDiv.textContent = this.phaseCode[i];
            column.appendChild(lineDiv);
        };

        // Adiciona a div pai ao corpo do documento
        document.body.appendChild(column);

        const columns = document.querySelectorAll(".column");

        document.addEventListener("dragstart", (e) => {
            e.target.classList.add("dragging");
        });

        document.addEventListener("dragend", (e) => {
            e.target.classList.remove("dragging");
        });

        columns.forEach((item) => {
            item.addEventListener("dragover", (e) => {
                e.preventDefault(); // Previne o comportamento padrão de não permitir soltar

                const dragging = document.querySelector(".dragging");
                const cards = column.querySelectorAll(".line:not(.dragging)");
        
                // Encontra o elemento de referência baseado na posição do cursor
                const referenceCard = Array.from(cards).find((card) => {
                    const box = card.getBoundingClientRect();
                    const boxCenterY = box.top + box.height / 2;

                    return e.clientY > box.y && e.clientY < boxCenterY;
                });
        
                if (referenceCard) {
                    referenceCard.insertAdjacentElement("beforebegin", dragging);
                } else {
                    referenceCard.insertAdjacentElement("beforeend", dragging);
                }
            });
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
}   