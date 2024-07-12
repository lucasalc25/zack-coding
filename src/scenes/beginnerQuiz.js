class BeginnerQuiz extends Phaser.Scene {
    constructor() {
        super({ key: 'BeginnerQuiz' });
        this.phases = [
            {
                phase: 1,
                title: "Fase 1: Declarar duas variáveis do tipo inteiro", 
                tip: "Variáveis armazenam dados, que podem ser números, caracteres, entre outros.",
                code: [
                    "var",
                    "num1, num2: inteiro",
                    "inicio",
                    "fim"
                ],
                hints: {
                    "var": "Dica: O comando 'var' é usado para declarar variáveis.",
                    "num1, num2: inteiro": "Dica: Após declarar 'var', você deve especificar as variáveis e seus tipos.",
                    "inicio": "Dica: Use 'inicio' para marcar o início do bloco de código.",
                    "fim": "Dica: Use 'fim' para marcar o fim do bloco de código."
                }
            },
            {
                phase: 2,
                title: "Fase 2: Ler um número inteiro e mostrá-lo na tela", 
                tip: "O comando 'leia' recebe um dado informado pelo usuário e o atribui à uma variável. Já o 'escreva', mostra este dado na tela.",
                code: [
                    "var",
                    "num: inteiro",
                    "inicio",
                    "leia(num)",
                    "escreva(num)",
                    "fim"
                ],
                hints: {
                    "var": "Dica: O comando 'var' é usado para declarar variáveis.",
                    "num: inteiro": "Dica: Após declarar 'var', você deve especificar a variável e seu tipo.",
                    "inicio": "Dica: Use 'inicio' para marcar o início do bloco de código.",
                    "leia(num)": "Dica: Use 'leia' para receber um valor do usuário e atribuí-lo à variável 'num'.",
                    "escreva(num)": "Dica: Use 'escreva' para mostrar o valor da variável 'num' na tela.",
                    "fim": "Dica: Use 'fim' para marcar o fim do bloco de código."
                }
            },
            {
                phase: 3,
                title: "Fase 3: Ler dois números e exibir a soma entre eles", 
                tip: "O operador '<-' atribui um dado à uma variável",
                code: [
                    "var",
                    "num1, num2, soma: inteiro",
                    "inicio",
                    "leia(num1)",
                    "leia(num2)",
                    "soma <- num1 + num2",
                    "escreva('A soma dos números é: ', soma)",
                    "fim"
                ],
                hints: {
                    "var": "Dica: O comando 'var' é usado para declarar variáveis.",
                    "num1, num2, soma: inteiro": "Dica: Após declarar 'var', você deve especificar as variáveis e seus tipos.",
                    "inicio": "Dica: Use 'inicio' para marcar o início do bloco de código.",
                    "leia(num1)": "Dica: Use 'leia' para receber um valor do usuário e atribuí-lo à variável 'num1'.",
                    "leia(num2)": "Dica: Use 'leia' para receber um valor do usuário e atribuí-lo à variável 'num2'.",
                    "soma <- num1 + num2": "Dica: Use '<-' para atribuir o resultado da soma de 'num1' e 'num2' à variável 'soma'.",
                    "escreva('A soma dos números é: ', soma)": "Dica: Use 'escreva' para mostrar o valor da variável 'soma' na tela junto com uma mensagem.",
                    "fim": "Dica: Use 'fim' para marcar o fim do bloco de código."
                }
            },
            /*{
                phase: 4,
                title: "Fase 4: Receber o peso e altura de uma pessoa e então calcular e exibir o seu IMC.", 
                tip: "IMC é o peso dividido pela altura ao quadrado.",
                code: [
                    "var",
                    "peso, altura, imc: real",
                    "inicio",
                    "leia(peso)",
                    "leia(altura)",
                    "imc <- peso / (altura * altura)",
                    "escreva(imc)",
                    "fim"
                ]
            },
            {
                phase: 5,
                title: "Fase 5: Ler dois números inteiros e indicar qual deles é o maior",
                tip: "A estrutura condicional 'se-entao' pode comparar dados e executar comandos apenas se a comparação for atendida. Após todas estas comparações é que a estrutura chega ao fim.",
                code: [
                    "var",
                    "num1, num2: inteiro",
                    "inicio",
                    "leia(num1)",
                    "leia(num2)",
                    "se num1 > num2 entao",
                    "escreva('O primeiro numero é maior')",
                    "senao",
                    "escreva('O segundo numero e maior')",
                    "fimse",
                    "fim",
                ]
            },
            {
                phase: 6,
                title: "Fase 6: Ler um número inteiro e mostrar se ele é par ou ímpar", 
                tip: "Use o operador '%' e a estrutura 'se-entao' para determinar se o número é divisível por 2",
                code: [
                    "var",
                    "num: inteiro",
                    "inicio",
                    "leia(num)",
                    "se num % 2 = 0 entao",
                    "escreva(num, ' é par.')",
                    "senao",
                    "escreva(num, ' é ímpar.')",
                    "fimse",
                    "fim"
                ]
            },
            {
                phase: 7,
                title: "Fase 7: Receber um número inteiro e exibir se é positivo, negativo ou zero.", 
                tip: "O comando 'senao se' é executado apenas se a comparação anterior não foi atendida e se a sua própria for atendida",
                code: [
                    "var",
                    "num: inteiro",
                    "inicio",
                    "leia(num)",
                    "se num > 0 entao",
                    "escreva('O numero é positivo')",
                    "senao se num < 0 entao",
                    "escreva('O numero é negativo')",
                    "senao",
                    "escreva('O numero é zero')",
                    "fimse",
                    "fim"
                ]
            },
            {
                phase: 8,
                title: "Fase 8: Ler 2 números reais e uma operação para ser feita entre eles", 
                tip: "A estrutura de seleção 'escolha-caso' realiza a operação escolhida pelo usuário",
                code: [
                    "var",
                    "num1, num2, resultado: real",
                    "operacao: caractere",
                    "inicio",
                    "leia(num1)",
                    "leia(num2)",
                    "leia(operacao)",
                    "escolha(operacao)",
                    "caso '+'",
                    "resultado <- num1 + num2",
                    "caso '-'",
                    "resultado <- num1 - num2",
                    "caso '*'",
                    "resultado <- num1 * num2",
                    "caso '/'",
                    "resultado <- num1 / num2",
                    "caso contrario",
                    "escreva('Operacao inválida')",
                    "fimescolha",
                    "escreva(resultado)",
                    "fim"
                ]
            }, */
        ]
    }

    init(data) {
        this.phaseIndex = data.faseInicial || 0; // Define a fase inicial como 0 se não for fornecida
        this.phase = this.phases[this.phaseIndex];
        this.numberPhases = this.phases.length;
        this.quizCode = [];
        this.currentOrder = [];
        this.codeIndex = 0;
    }

    create() {
        // Adiciona o fundo
        this.bgImage = this.add.image(this.game.canvas.width - 800, 0, 'quarto').setOrigin(0);

        // Adiciona a caixa de diálogo
        this.panel = this.add.rectangle(this.game.canvas.width / 2, this.game.canvas.height, 10, this.game.canvas.height + 1, 0x000000, 0.9).setOrigin(0);

        // Verifica o estado da música
        if (this.registry.get('musicOn')) {
            this.playMusic = this.sound.add('playMusic', { loop: true });
            this.playMusic.setVolume(localStorage.getItem("musicVolume")* 0.7);
            this.playMusic.play();
        }

        this.select = this.sound.add('select');
        this.select.setVolume(localStorage.getItem("soundVolume") * 0.25);
        this.select2 = this.sound.add('select2');
        this.select2.setVolume(localStorage.getItem("soundVolume") * 0.6);
        this.correct = this.sound.add('correct');
        this.correct.setVolume(localStorage.getItem("soundVolume"));
        this.wrong = this.sound.add('wrong');
        this.wrong.setVolume(localStorage.getItem("soundVolume") / 2);
        this.gameOverSound = this.sound.add('gameOver');
        this.gameOverSound.setVolume(localStorage.getItem("soundVolume") * 2);
        this.winnerMusic = this.sound.add('winnerMusic');
        this.winnerMusic.setVolume(localStorage.getItem("musicVolume") * 0.8);

        // Cria um retângulo semi-transparente para cobrir toda a tela
        this.overlay = this.add.graphics();
        this.overlay.fillStyle(0x000000, 0.5); // Cor preta com 50% de opacidade
        this.overlay.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.overlay.setDepth(1);
        this.overlay.setVisible(false); // Inicialmente, o overlay estará invisível

        this.showScreen();
        this.showQuizScreen(this.phase);

    }

    update() {
        this.musicOn = this.registry.get("musicOn")

        if(this.musicOn == false) {
            this.playMusic = this.sound.add('playMusic', { loop: true });
            this.playMusic.setVolume(localStorage.getItem("musicVolume"));
            this.playMusic.play();
        }

    }

    // Função para embaralhar uma lista
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
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

    showQuizScreen(phase) {
        this.phase = phase;
        this.phaseTitle = this.phase.title;
        this.phaseTip = this.phase.tip;
        this.phaseHints = this.phase.hints;
        this.phaseCode = this.phase.code;
        this.phaseNumber = this.phase.phase;

        // Mostrando parte da dialogueBox
        this.tweens.add({
            targets: this.panel,
            y: 0,
            duration: 200, // Duração da animação em milissegundos (0.5 segundo neste caso)
            ease: 'Linear'
        });

        let panelWidth = this.game.canvas.width < 600 ? this.game.canvas.width * 0.9 : 600;
        let panelX = this.game.canvas.width < 600 ? this.game.canvas.width * 0.05 : this.game.canvas.width * 0.125

        setTimeout(() => {
            // Expandindo a dialogueBox
            this.tweens.add({
                targets: this.panel, // O alvo da animação é o sprite do personagem
                x: panelX, // Fator de escala horizontal
                width: panelWidth, 
                duration: 200, // Duração da animação em milissegundos (0.5 segundo neste caso)
                ease: 'Linear', // Tipo de easing (suavização) da animação
                onComplete: () => {
                    this.dialogueBoxAnimated = true;
                    this.createConfirmationWindow();
                    this.createTipWindow(this.phaseTip);
                }
            });
        }, 300);

        let titleFont = (1.73 * this.game.canvas.width)/100 + 12;
        let titleWordWrap = this.game.canvas.width > 600 ? 540 : this.game.canvas.width * 0.75;

        // Adiciona o titulo no painel
        this.textPhaseTitle = this.add.text(this.game.canvas.width / 2, -100, this.phaseTitle, { fontFamily: 'Arial', fontSize: titleFont, fill: '#ffffff', marginTop: '10px', align: 'center' }).setOrigin(0.5).setWordWrapWidth(titleWordWrap); // Largura máxima da caixa de texto

        setTimeout(() => {
            // Animaçao do titulo
            this.tweens.add({
                targets: this.textPhaseTitle, // O alvo da animação é o texto com o título
                y: 40, // Fator de escala vertical
                duration: 300, // Duração da animação em milissegundos (0.5 segundo neste caso)
                ease: 'Linear', // Tipo de easing (suavização) da animação
            });
        }, 300);

        // Embaralha as opções
        this.quizCode = this.shuffle([...this.phaseCode]); // Cópia embaralhada do phaseCode

        const column = document.createElement('div');
        column.className = 'column';

        // Criação de três divs filhas com classe "line" e atributo draggable definido como true
        for (let i = 0; i < this.phaseCode.length + 1; i++) {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'line animacao';
            lineDiv.draggable = true;
            // Defina o conteúdo do div como a string atual
            lineDiv.textContent = this.quizCode[i];
            column.appendChild(lineDiv);
            if (i == this.phaseCode.length) {
                lineDiv.classList.remove("animacao");
            }
        };

        // Adiciona a div pai ao corpo do documento
        document.body.appendChild(column);

        const lines = document.querySelectorAll(".line");

        document.addEventListener("dragstart", (e) => {
            e.target.classList.add("dragging");
        });

        document.addEventListener("dragend", (e) => {
            e.target.classList.remove("dragging");
        });

        // Evento arrastar e soltar as opções
        lines.forEach((item) => {
            item.addEventListener("dragover", (e) => {
                e.preventDefault(); // Previne o comportamento padrão de não permitir soltar

                // Impede que a animação aconteça ao realocar uma linha e que a coluna volte para o início
                for (let i = 0; i < lines.length; i++) {
                    lines[i].style.transform = "translateX(0%)";
                    lines[i].classList.remove('animacao');
                }

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


        let dragging;

        document.addEventListener("touchstart", (e) => {
            dragging = e.target;
        });

        document.addEventListener("touchend", () => {
            dragging = null;
        });

        lines.forEach((item) => {
            item.addEventListener("touchmove", (e) => {
                e.preventDefault(); // Evita o comportamento padrão do toque, que é rolar a página

                if (e.touches.length > 0 && dragging) {
                    const touch = e.touches[0];

                    item.style.transform = "translateX(0%)";
                    item.classList.remove('animacao');

                    // Define a posição da div arrastada com base nas coordenadas do toque
                    dragging.style.left = touch.clientX + 'px';
                    dragging.style.top = touch.clientY + 'px';

                    // Encontra todas as divs com classe 'line' exceto a que está sendo arrastada
                    const otherLines = Array.from(document.querySelectorAll('.line')).filter(line => line !== dragging);
                    const referenceLine = otherLines.find(line => {
                        const { top, height } = line.getBoundingClientRect();
                        // Calcula a metade da altura da div
                        const midPoint = top + height / 2;
                        // Verifica se o toque está acima ou abaixo do ponto médio da outra div
                        return touch.clientY < midPoint;
                    });

                    // Insere a div sendo arrastada antes ou depois da div de referência, dependendo da posição do toque
                    if (referenceLine) {
                        const { top, bottom } = referenceLine.getBoundingClientRect();
                        const midPoint = (top + bottom) / 2;

                        if (touch.clientY < midPoint) {
                            // Insere antes da referência se o toque estiver acima da metade
                            referenceLine.insertAdjacentElement("beforebegin", dragging);
                        } else {
                            // Insere após a referência se o toque estiver abaixo da metade
                            referenceLine.insertAdjacentElement("beforeend", dragging);
                        }
                    }

                }
            });
        })

        // Botão para verificar a ordem das opções
        this.confirmBtn = this.add.rexRoundRectangle(this.game.canvas.width / 2, this.game.canvas.height - 40, 130, 50, 10, 0x0077FF).setOrigin(0.5);

        this.confirmBtnText = this.add.text(this.game.canvas.width / 2, this.game.canvas.height - 40, 'Confirmar', { fontFamily: 'Poetsen One', fontSize: '18px', fill: '#fff', fontWeight: 'bold' }).setOrigin(0.5);

        this.confirmBtn.setInteractive();

        /* let attempts = localStorage.getItem("tentativas");

        if(!attempts || attempts > 0) {
            attempts = 0;
            localStorage.setItem("tentativas", 0);
        } */

        this.confirmBtn.on('pointerdown', () => {
            // attempts++;

            // Verifica a ordem quando necessário (por exemplo, quando o jogador clica em um botão)
            this.checkOrder();
            this.confirmBtnText.setStyle({ fill: '#FFFFFF' });
            this.confirmBtn.setFillStyle('0x0077FF').setSize(130, 50);
        });

        // Evento de hover
        this.confirmBtn.on('pointerover', () => {
            this.confirmBtnText.setStyle({ fill: '#001B68' });
            this.confirmBtn.setFillStyle('0x00BBFF').setSize(133, 53);
        });

        // Evento de hout
        this.confirmBtn.on('pointerout', () => {
            this.confirmBtnText.setStyle({ fill: '#FFFFFF' });
            this.confirmBtn.setFillStyle('0x0077FF').setSize(130, 50);
        });

        // Ícone do menu
        this.backBtn = this.add.image(panelX + 40, this.game.canvas.height - 40, 'backIcon').setOrigin(0.5);
        this.backBtn.setInteractive();
        this.backBtn.on('pointerdown', () => {
            // Quando o ícone do menu for clicado, mostra a janela de confirmação
            this.select2.play();
            this.confirmBtn.disableInteractive();
            this.confirmWindow.setVisible(true).setDepth(2);
            this.tweens.add({
                targets: this.confirmWindow,
                alpha: 1, // Transparece o retangulo que cobre a tela
                duration: 300, // Tempo da animação em milissegundos (2 segundos)
            });
            this.overlay.setVisible(true).setDepth(1);
            column.style.zIndex = -10;
        });

        setTimeout(() => {
            this.showTipWindow();
        }, 1000);
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

    // Função para verificar se a ordem dos textos nas divs é igual ao array inicial
    checkOrder() {
        const lineDivs = document.querySelectorAll(".line");

        // Verifica se a ordem dos textos nas divs é a mesma que o array inicial
        for (let i = 0; i < lineDivs.length - 1; i++) {
            if (lineDivs[i].textContent !== this.phaseCode[i]) {
                this.wrong.play();
                const hintMessage = this.phaseHints[this.phaseCode[i]];
                this.createHintWindow(hintMessage);
                this.showHintWindow();
                return
            }
        }

        this.confirmBtn.disableInteractive();
        this.showCorrect();
        this.correct.play();

        // Itera sobre cada elemento filho e aplica uma cor de fundo
        for (var i = 0; i < lineDivs.length - 1; i++) {
            lineDivs[i].style.backgroundColor = '#228b22'; // Defina a cor de fundo desejada aqui
        }
        
        if(this.phaseNumber == this.numberPhases) {
            setTimeout(() => {
                this.gameFinished();
            }, 3000);
        }
        else {
            this.save(this.phaseIndex);
            this.phaseIndex++;
            this.phase = this.phases[this.phaseIndex];
            localStorage.setItem("tentativas", 0);
            setTimeout(() => {
                this.clearCode();
                this.textPhaseTitle.destroy();
                this.confirmBtn.destroy();
                this.confirmBtnText.destroy();
                this.showQuizScreen(this.phase);
            }, 3000);
        } 
    }

    // Função para salvar o progresso do jogador
    save(faseAtual) {
        // Verifica se o localStorage é suportado pelo navegador
        if (typeof (Storage) !== "undefined") {
            // Salva a fase atual do jogador no localStorage
            faseAtual++;
            localStorage.setItem("faseAtual", faseAtual);
            
            let saveTextFont = (1.73 * this.game.canvas.width)/100 + 12;
            this.saveText = this.add.text(this.game.canvas.width / 2, 100, 'Salvando progresso...', { fontSize: saveTextFont, fill: '#FFFFFF', align: 'center' }).setWordWrapWidth(this.game.canvas.width * 0.9).setOrigin(0.5);

            // Define a escala inicial do texto como zero
            this.saveText.setScale(0);

            // Cria um tween para animar a escala do texto de 0 para 1 em 500 milissegundos
            this.tweens.add({
                targets: this.saveText,
                scaleX: 1,
                scaleY: 1,
                duration: 500,
                ease: 'Linear',
                onComplete: () => {
                    // Cria um segundo tween para esmaecer o texto após 2 segundos
                    this.tweens.add({
                        targets: this.saveText,
                        alpha: 0,
                        duration: 1000,
                        delay: 2000,  // Espera 2 segundos antes de começar o esmaecimento
                        ease: 'Linear',
                        onComplete: () => {
                            // Remove o texto após o esmaecimento
                            this.saveText.destroy();
                        }
                    });
                }
            });
        } else {
            console.error("LocalStorage não suportado pelo navegador!");
        }
    }

    createLines() {
        const column = document.createElement('div');
        column.className = 'column';

        // Criação de três divs filhas com classe "line" e atributo draggable definido como true
        for (let i = 0; i < this.phaseCode.length + 1; i++) {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'line animacao';
            lineDiv.draggable = true;
            // Defina o conteúdo do div como a string atual
            lineDiv.textContent = this.quizCode[i];
            column.appendChild(lineDiv);
            if (i == this.phaseCode.length) {
                lineDiv.classList.remove("animacao");
            }
        };

        // Adiciona a div pai ao corpo do documento
        document.body.appendChild(column);
    }

    createTipWindow(dicaAtual) {
        // Cria uma janela de dica centralizada
        const tipWindowWidth = this.game.canvas.width < 600 ? this.panel.width : 600;
        const numberLines = this.phaseTip.length / 51;
        const heightForLine = this.game.canvas.width < 600 ? numberLines * 70 : numberLines * 40 ;
        const tipWindowHeight = 100 + heightForLine;
        const tipWindowX = this.game.canvas.width / 2;
        const tipWindowY = this.game.canvas.height / 2;

        this.tipWindow = this.add.container(0, 0);

        const windowBackground = this.add.rexRoundRectangle(tipWindowX, tipWindowY, tipWindowWidth * 0.9, tipWindowHeight, 20, 0x001B68).setOrigin(0.5);
        this.tipWindow.add(windowBackground);

        this.tipText = this.add.text(tipWindowX, tipWindowY - 35, 'Dica: ' + dicaAtual, { fontFamily: 'Arial', fontSize: '20px', fill: '#FFFFFF', align: 'center' }).setWordWrapWidth(windowBackground.width * 0.8).setOrigin(0.5);
        this.tipWindow.add(this.tipText);

        this.tipBtn = this.add.rexRoundRectangle(tipWindowX, tipWindowY + (tipWindowHeight / 2) - 40, 75, 40, 10, 0xED3D85).setOrigin(0.5)
        this.tipBtnText = this.add.text(tipWindowX, tipWindowY + (tipWindowHeight / 2) - 40, 'Ok', { fontFamily: 'Cooper Black', fontSize: '18px', fill: '#FFFFFF', padding: 20 }).setOrigin(0.5).setDepth(3);


        this.tipWindow.add(this.tipBtn);
        this.tipWindow.add(this.tipBtnText);

        // Inicialmente, a janela de confirmação estará invisível
        this.tipWindow.setVisible(false).setDepth(2).setAlpha(0);
    }

    showTipWindow() {
        this.confirmBtn.disableInteractive();
        this.backBtn.disableInteractive();
        this.tipWindow.setVisible(true);
        this.tweens.add({
            targets: this.tipWindow,
            alpha: 1, // Transparece o retangulo que cobre a tela
            duration: 300, // Tempo da animação em milissegundos (2 segundos)
        });
        this.overlay.setVisible(true).setDepth(1);

        const column = document.querySelectorAll(".column");
        column.forEach(column => {
            column.style.zIndex = -5;
        });

        this.tipBtn.setInteractive();

        this.tipBtn.on('pointerdown', () => {
            this.select2.play();
            this.tweens.add({
                targets: this.tipWindow,
                alpha: 0, // Transparece o retangulo que cobre a tela
                duration: 150, // Tempo da animação em milissegundos (2 segundos)
                onComplete: () => {
                    this.tipWindow.setVisible(false).setDepth(0); // Esconde a janela de confirmação
                    column.forEach(column => {
                        column.style.zIndex = 5;
                    });
                }
            });
            this.overlay.setVisible(false).setDepth(0);
            this.confirmBtn.setInteractive();
            this.backBtn.setInteractive();
        });
        
        this.tipBtn.on('pointerover', () => {
            this.tipBtn.setFillStyle('0xFF0066').setSize(78, 43);
            this.tipBtnText.setStyle({ fill: '#001B68' });
        });
        this.tipBtn.on('pointerout', () => {
            this.tipBtn.setFillStyle('0xED3D85').setSize(75, 40);
            this.tipBtnText.setStyle({ fill: '#FFFFFF' });
        });
    }

    createHintWindow(hint) {
        const tipWindowWidth = this.game.canvas.width < 600 ? this.panel.width : 600;
        const numberLines = this.phaseTip.length / 51;
        const heightForLine = this.game.canvas.width < 600 ? numberLines * 70 : numberLines * 40 ;
        const tipWindowHeight = 100 + heightForLine;
        const tipWindowX = this.game.canvas.width / 2;
        const tipWindowY = this.game.canvas.height / 2;

        this.hintWindow = this.add.container(0, 0);

        const windowBackground = this.add.rexRoundRectangle(tipWindowX, tipWindowY, tipWindowWidth * 0.9, tipWindowHeight, 20, 0x001B68).setOrigin(0.5);
        this.hintWindow.add(windowBackground);

        this.hintText = this.add.text(tipWindowX, tipWindowY - 35, hint, { fontFamily: 'Arial', fontSize: '20px', fill: '#FFFFFF', align: 'center' }).setWordWrapWidth(windowBackground.width * 0.8).setOrigin(0.5);
        this.hintWindow.add(this.hintText);

        this.hintBtn = this.add.rexRoundRectangle(tipWindowX, tipWindowY + (tipWindowHeight / 2) - 40, 75, 40, 10, 0xED3D85).setOrigin(0.5)
        this.hintBtnText = this.add.text(tipWindowX, tipWindowY + (tipWindowHeight / 2) - 40, 'Ok', { fontFamily: 'Cooper Black', fontSize: '18px', fill: '#FFFFFF', padding: 20 }).setOrigin(0.5).setDepth(3);


        this.hintWindow.add(this.hintBtn);
        this.hintWindow.add(this.hintBtnText);

        // Inicialmente, a janela de confirmação estará invisível
        this.hintWindow.setVisible(false).setDepth(2).setAlpha(0);
    }

    showHintWindow() {
        this.confirmBtn.disableInteractive();
        this.backBtn.disableInteractive();
        this.hintWindow.setVisible(true);
        this.tweens.add({
            targets: this.hintWindow,
            alpha: 1, // Transparece o retangulo que cobre a tela
            duration: 300, // Tempo da animação em milissegundos (2 segundos)
        });
        this.overlay.setVisible(true).setDepth(1);

        const column = document.querySelectorAll(".column");
        column.forEach(column => {
            column.style.zIndex = -5;
        });

        this.hintBtn.setInteractive();

        this.hintBtn.on('pointerdown', () => {
            this.select2.play();
            this.tweens.add({
                targets: this.hintWindow,
                alpha: 0, // Transparece o retangulo que cobre a tela
                duration: 150, // Tempo da animação em milissegundos (2 segundos)
                onComplete: () => {
                    this.hintWindow.setVisible(false).setDepth(0); // Esconde a janela de confirmação
                    column.forEach(column => {
                        column.style.zIndex = 5;
                    });
                }
            });
            this.overlay.setVisible(false).setDepth(0);
            this.confirmBtn.setInteractive();
            this.backBtn.setInteractive();
        });
        
        this.hintBtn.on('pointerover', () => {
            this.hintBtn.setFillStyle('0xFF0066').setSize(78, 43);
            this.hintBtnText.setStyle({ fill: '#001B68' });
        });
        this.hintBtn.on('pointerout', () => {
            this.hintBtn.setFillStyle('0xED3D85').setSize(75, 40);
            this.hintBtnText.setStyle({ fill: '#FFFFFF' });
        });
    }


    clearCode() {
        const column = document.querySelectorAll(".column");
        
        column.forEach((column) => {
            document.body.removeChild(column);
        });
    }

    showCorrect() {
        if(this.isShowingWrong) {
            const prevMessageDiv = document.getElementById('message-wrong');
            document.body.removeChild(prevMessageDiv);
            this.isShowingWrong = false;
        } 

        const messageDiv = document.createElement("div");
        messageDiv.className = "message";
        messageDiv.textContent = "Você acertou!";

        // Adiciona a mensagem à tela
        document.body.appendChild(messageDiv);

        const posY = this.confirmBtn.y - 60; // Ajuste a posição vertical conforme necessário

        // Define a posição do elemento alvo com base nas coordenadas do último elemento da lista
        messageDiv.style.position = 'absolute';
        messageDiv.style.left = '50%';
        messageDiv.style.top = posY + 'px'; // Define a posição vertical

        // Adiciona a mensagem à tela
        document.body.appendChild(messageDiv);

        // Aplica a animação CSS à mensagem
        setTimeout(() => {
            messageDiv.classList.add("message-show");
            messageDiv.id = 'message-correct';
        }, 100);

        // Remove a mensagem após algum tempo
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 3000); // Tempo em milissegundos antes de remover a mensagem
    }

    showWrong() {
        if(this.isShowingWrong) {
            const prevMessageDiv = document.getElementById('message-wrong');
            document.body.removeChild(prevMessageDiv);
        } 
        this.isShowingWrong = true;

        const messageDiv = document.createElement("div");
        messageDiv.className = "message";
        messageDiv.textContent = "Errado! Tente de novo!";

        // Adiciona a mensagem à tela
        document.body.appendChild(messageDiv);

        const posY = this.confirmBtn.y - 60; // Ajuste a posição vertical conforme necessário

        // Define a posição do elemento alvo com base nas coordenadas do último elemento da lista
        messageDiv.style.position = 'absolute';
        messageDiv.style.left = '50%';
        messageDiv.style.top = posY + 'px'; // Define a posição vertical

        // Aplica a animação CSS à mensagem
        setTimeout(() => {
            messageDiv.classList.add("message-show");
            messageDiv.id = 'message-wrong';
        }, 100);

        // Remove a mensagem após algum tempo
        setTimeout(() => {
            document.body.removeChild(document.getElementById('message-wrong'));
            this.isShowingWrong = false;
        }, 3000); // Tempo em milissegundos antes de remover a mensagem
    }

    createConfirmationWindow() {
        // Cria uma janela de confirmação centralizada
        const confirmWindowWidth = this.game.canvas.width < 600 ? this.panel.width : 600;
        const confirmWindowHeight = 150;
        const confirmWindowX = this.game.canvas.width / 2;
        const confirmWindowY = this.panel.height / 2;

        const column = document.querySelectorAll(".column");

        this.confirmWindow = this.add.container(0.5, 0.5);

        const windowBackground = this.add.rexRoundRectangle(confirmWindowX, confirmWindowY, confirmWindowWidth * 0.9, confirmWindowHeight, 20, 0x001B68).setOrigin(0.5);
        this.confirmWindow.add(windowBackground);

        this.confirmText = this.add.text(confirmWindowX, confirmWindowY - 35, 'Tem certeza que deseja retornar ao menu?', { fontFamily: 'Arial', fontSize: '20px', fill: '#FFFFFF', align: 'center' }).setWordWrapWidth(confirmWindowWidth * 0.8).setOrigin(0.5);
        this.confirmWindow.add(this.confirmText);

        this.confirmYesBtn = this.add.rexRoundRectangle(confirmWindowX / 1.4, confirmWindowY + 30, 75, 40, 10, 0xED3D85).setOrigin(0.5)
        this.confirmYesText = this.add.text(confirmWindowX / 1.4, confirmWindowY + 30, 'Sim', { fontFamily: 'Cooper Black',fontSize: '20px', fill: '#FFFFFF', padding: 15 }).setOrigin(0.5).setDepth(3);


        this.confirmNoBtn = this.add.rexRoundRectangle(confirmWindowX / 0.75, confirmWindowY + 30, 75, 40, 10, 0xED3D85).setOrigin(0.5)
        this.confirmNoText = this.add.text(confirmWindowX / 0.75, confirmWindowY + 30, 'Não', { fontFamily: 'Cooper Black', fontSize: '20px', fill: '#FFFFFF', padding: 15 }).setOrigin(0.5).setDepth(3);
        

        [this.confirmYesBtn, this.confirmNoBtn].forEach(button => {
            button.setInteractive();

            button.on('pointerdown', () => {
                this.select2.play();
                if(button.x < confirmWindowX) {
                    // Ação ao clicar em "Sim"
                    this.clearCode();
                    button.destroy();
                    // Pare a música de fundo ou quaisquer sons que estejam tocando
                    if(this.registry.get('musicOn')) {
                        this.playMusic.stop();
                    }
                    this.scene.start('Load1');
               } else {
                    // Ação ao clicar em "Não"
                    this.tweens.add({
                        targets: this.confirmWindow,
                        alpha: 0, // Transparece o retangulo que cobre a tela
                        duration: 150, // Tempo da animação em milissegundos (2 segundos)
                        onComplete: () => {
                            this.confirmWindow.setVisible(false).setDepth(0); // Esconde a janela de confirmação
                            column.forEach(column => {
                                column.style.zIndex = 10;
                            });
                        }
                    });

                    this.overlay.setVisible(false).setDepth(0);
                    this.confirmBtn.setInteractive();
                }
            })

            button.on('pointerover', () => {
                button.setFillStyle('0xFF0066').setSize(80, 45);
                if(button.x < confirmWindowX) { 
                    this.confirmYesText.setStyle({ fontSize: '22px' });
                } else {
                    this.confirmNoText.setStyle({ fontSize: '22px' });
                }
            });

            button.on('pointerout', () => { 
                button.setFillStyle('0xED3D85').setSize(75, 40);
                if(button.x < confirmWindowX) { 
                    this.confirmYesText.setStyle({ fontSize: '20px' });
                } else {
                    this.confirmNoText.setStyle({ fontSize: '20px' });
                }
            });

        }); 

        this.confirmWindow.add(this.confirmYesBtn);
        this.confirmWindow.add(this.confirmYesText);
        this.confirmWindow.add(this.confirmNoBtn);
        this.confirmWindow.add(this.confirmNoText);

        // Inicialmente, a janela de confirmação estará invisível
        this.confirmWindow.setVisible(false).setDepth(2).setAlpha(0);
    }

    resetGame() {

        // Pare a música de fundo ou quaisquer sons que estejam tocando
        if(this.registry.get('musicOn')) {
            this.playMusic.stop();
        }
        
        if(localStorage.getItem("nivel") === 'Básico') {
            this.scene.stop('BeginnerQuiz'); // Encerre a cena atual e retorne ao menu principal
            this.scene.start('Load2', { faseInicial: this.faseInicial });
        }
        /* if(localStorage.getItem("nivel") === 'Intermediário') {
            this.scene.stop('IntermediaryQuiz'); // Encerre a cena atual e retorne ao menu principal
            this.scene.start('Load2', { faseInicial: this.faseInicial });
        } */
        /* if(localStorage.getItem("nivel") === 'Avançado') {
            this.scene.stop('AdvancedQuiz'); // Encerre a cena atual e retorne ao menu principal
            this.scene.start('Load2', { faseInicial: this.faseInicial });
        } */
        
    }

    quitGame() {
        // Pare a música de fundo ou quaisquer sons que estejam tocando
        if(this.registry.get('musicOn')) {
            this.playMusic.stop();
        }

        // Encerre a cena atual e retorne ao menu principal
        if(localStorage.getItem("nivel") === 'Básico') {
            this.scene.stop('BeginnerQuiz'); // Encerre a cena atual e retorne ao menu principal
        }
        /* if(localStorage.getItem("nivel") === 'Intermediário') {
            this.scene.stop('IntermediaryQuiz'); // Encerre a cena atual e retorne ao menu principal
        } */
        /* if(localStorage.getItem("nivel") === 'Avançado') {
            this.scene.stop('AdvancedQuiz'); // Encerre a cena atual e retorne ao menu principal
        } */
    }

    gameFinished() {
        this.overlay.setVisible(true).setDepth(1);
        this.confirmBtn.destroy();
        this.confirmBtnText.destroy();
        this.backBtn.destroy();
        this.clearCode();

        this.playMusic.stop();
        this.winnerMusic.play();
        
        let winnerFont = (1.8 * this.game.canvas.width)/100 + 22;
        
        // Cria a animação da palavra "Game Over"
        const winnerTitle = this.add.text(0, 0, '', {
            fontFamily: 'Cooper Black',
            fontSize: winnerFont,
            color: '#228b22',
            align: 'center',
            wordWrap: { width: this.game.canvas.width * 0.8 }
        }).setOrigin(0.5);

        // Configura a animação para que cada letra apareça sequencialmente
        const winner1 = 'PARABÉNS!';
        let index = 0;

        this.time.addEvent({
            delay: 130, // Intervalo de 100 milissegundos entre cada letra
            callback: () => {
                winnerTitle.text += winner1[index];
                index++;
                if (index === winner1.length) {
                    // Toda a palavra foi mostrada, pare o evento de tempo
                    this.time.removeAllEvents();
                    setTimeout(() => {
                        winnerTitle.text = '';
                        // Configura a animação para que cada letra apareça sequencialmente
                        const winner2 = 'Você concluiu a versão beta de Zack Coding!';
                        index = 0;
            
                        this.time.addEvent({
                            delay: 50, // Intervalo de 100 milissegundos entre cada letra
                            callback: () => {
                                winnerTitle.text += winner2[index];
                                index++;
                                if (index === winner2.length) {
                                    // Toda a palavra foi mostrada, pare o evento de tempo
                                    this.time.removeAllEvents();
                                }
                            },
                            callbackScope: this,
                            loop: true, // Mantém o evento em loop até que todas as letras sejam mostradas
                        });
                    }, 1500);
                }
            },
            callbackScope: this,
            loop: true, // Mantém o evento em loop até que todas as letras sejam mostradas
        });

        // Centraliza o texto e define a quebra de linha para evitar que ultrapasse a tela
        winnerTitle.setWordWrapWidth(this.game.canvas.width * 0.8, true);
        winnerTitle.setOrigin(0.5);
        winnerTitle.setDepth(2);
        winnerTitle.setPosition(this.game.canvas.width / 2, this.game.canvas.height / 2);

    }

    gameOver(){
        localStorage.setItem("faseAtual", 0);
        localStorage.setItem("tentativas", 0);

        this.overlay.setVisible(true);
        this.overlay.fillStyle(0x000000, 1); // Cor preta com 50% de opacidade
        this.clearCode()
        this.textPhaseTitle.destroy();
        this.backBtn.destroy();
        this.confirmBtnText.destroy();
        this.confirmBtn.destroy();

        if(this.isShowingWrong) {
            const prevMessageDiv = document.getElementById('message-wrong');
            document.body.removeChild(prevMessageDiv);
            this.isShowingWrong = false;
        } 

        this.isShowingWrong = false;

        this.playMusic.stop();
        this.gameOverSound.play();

        let gameOverFont = (1.8 * this.game.canvas.width)/100 + 32;
        
        // Cria a animação da palavra "Game Over"
        const gameOverTitle = this.add.text(0, 0, '', {
            fontFamily: 'Cooper Black',
            fontSize: gameOverFont,
            color: '#ff0000',
            align: 'center',
            wordWrap: { width: 400 }
        }).setOrigin(0.5);

        this.restartBtn = this.add.text(this.game.canvas.width / 2, (this.game.canvas.height / 2) + 30, 'REINICIAR', { fontFamily: 'Cooper Black', fontSize: '22px', fill: '#ff0000', padding: 10 }).setOrigin(0.5).setDepth(2).setVisible(false);

        this.quitBtn = this.add.text(this.game.canvas.width / 2, (this.game.canvas.height / 2) + 90, 'SAIR', { fontFamily: 'Cooper Black', fontSize: '22px', fill: '#ff0000', padding: 10 }).setOrigin(0.5).setDepth(2).setVisible(false);

        // Configura a animação para que cada letra apareça sequencialmente
        const gameOver = 'VOCÊ PERDEU!';
        let index = 0;

        this.time.addEvent({
            delay: 150, // Intervalo de 100 milissegundos entre cada letra
            callback: () => {
                gameOverTitle.text += gameOver[index];
                index++;
                if (index === gameOver.length) {
                    // Toda a palavra foi mostrada, pare o evento de tempo
                    this.time.removeAllEvents();
                    setTimeout(() => {

                        [this.restartBtn, this.quitBtn].forEach(button => {
                            button.setVisible(true);
                            button.setInteractive();

                            button.on('pointerdown', () => {
                                this.select2.play();
                                if(button.text === 'REINICIAR') {
                                    this.resetGame();
                                } else {
                                    this.quitGame();
                                }
                            });

                            button.on('pointerover', () => {
                                button.setStyle({fontSize: 26, fill: '#ffffff'})
                            })
                            button.on('pointerout', () => {
                                button.setStyle({fontSize: 24, fill: '#ff0000'})
                            })
                        });
                       
 
                    }, 1000);
                }
            },
            callbackScope: this,
            loop: true, // Mantém o evento em loop até que todas as letras sejam mostradas
        });

        // Centraliza o texto e define a quebra de linha para evitar que ultrapasse a tela
        gameOverTitle.setWordWrapWidth(this.game.canvas.width * 0.9, true);
        gameOverTitle.setOrigin(0.5);
        gameOverTitle.setDepth(2);
        gameOverTitle.setPosition(this.game.canvas.width / 2, this.game.canvas.height / 2.5);
    }

}
