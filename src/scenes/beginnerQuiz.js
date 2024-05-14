class BeginnerQuiz extends Phaser.Scene {
    constructor() {
        super({ key: 'BeginnerQuiz' });
        this.bgImage;
        this.dialogueBoxAnimated;
        this.correct;
        this.wrong;
        this.phases = [
            {
                phase: 1,
                title: "Fase 1: Monte a estrutura base de um pseudocódigo",
                tips: ["Campo das variáveis primeiro, algoritmo depois"],
                code: ["var",
                    "inicio",
                    "fimalgoritmo"]
            },
            {
                phase: 2,
                title: "Fase 2: Monte o código para declarar duas variáveis do tipo inteiro", tips: ["Declarações de variáveis são feitas no campo 'var'"],
                code: ["var",
                    "num1, num2: inteiro",
                    "inicio",
                    "fimalgoritmo"]
            },
            {
                phase: 3,
                title: "Fase 3: Ler um número inteiro e mostrá-lo na tela", tips: ["Praticamente o mesmo de antes, porém também irá LER e depois MOSTRAR"],
                code: ["var",
                    "num: inteiro",
                    "inicio",
                    "leia(num)",
                    "escreva(num)",
                    "fimalgoritmo"]
            },
            {
                phase: 4,
                title: "Fase 4: Ler dois números e exibir a soma deles", tips: ["Não há como somar valores que ainda não foram lidos e nem mostrar o resultado sem antes calculá-lo"],
                code: ["var",
                    "num1, num2, soma: inteiro",
                    "inicio",
                    "leia(num1)",
                    "leia(num2)",
                    "soma <- num1 + num2",
                    "escreva('A soma dos números é: ', soma)",
                    "fimalgoritmo"]
            },
            {
                phase: 5,
                title: "Fase 5: Ler um número inteiro e mostrar se ele é par ou ímpar", tips: ["O operador '%' calcula o resto de uma divisão"],
                code: ["var",
                    "num: inteiro",
                    "inicio",
                    "leia(num)",
                    "se num % 2 = 0 entao",
                    "escreva(num, ' é par.')",
                    "senao",
                    "escreva(num, ' é ímpar.')",
                    "fimse",
                    "fimalgoritmo"]
            },
        ]
    }

    init(data) {
        this.playMusic;
        this.phaseIndex = data.faseInicial || 0; // Define a fase inicial como 0 se não for fornecida
        this.phase = this.phases[this.phaseIndex];
        this.phaseTitle;
        this.phaseTips;
        this.phaseCode;
        this.lines;
        this.quizzCode = [];
        this.confirmBtn;
        this.currentOrder = [];
        this.codeIndex = 0;
        this.confirmWindow;
        this.confirmText;
        this.confirmYesBtn;
        this.confirmNoBtn;
        this.saveText;
        this.isShowingWrong;
    }

    create() {
        // Adiciona o fundo
        this.bgImage = this.add.image(this.game.canvas.width - 800, 0, 'quarto').setOrigin(0);

        // Adiciona a caixa de diálogo
        this.panel = this.add.rectangle(this.game.canvas.width / 2, this.game.canvas.height, 10, this.game.canvas.height + 1, 0x000000, 0.9).setOrigin(0);

        // Verifica o estado da música
        if (this.registry.get('musicOn')) {
            this.playMusic = this.sound.add('playMusic', { loop: true });
            this.playMusic.setVolume(localStorage.getItem("musicVolume"));
            this.playMusic.play();
        }

        this.select = this.sound.add('select');
        this.select.setVolume(localStorage.getItem("soundVolume"));
        this.correct = this.sound.add('correct');
        this.correct.setVolume(localStorage.getItem("soundVolume"));
        this.wrong = this.sound.add('wrong');
        this.wrong.setVolume(localStorage.getItem("soundVolume") / 2);
        this.gameOverSound = this.sound.add('gameOver');
        this.gameOverSound.setVolume(localStorage.getItem("soundVolume") * 4);

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
        this.phaseTips = this.phase.tips;
        this.phaseCode = this.phase.code;

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
        this.quizzCode = this.shuffle([...this.phaseCode]); // Cópia embaralhada do phaseCode

        const column = document.createElement('div');
        column.className = 'column';

        // Criação de três divs filhas com classe "line" e atributo draggable definido como true
        for (let i = 0; i < this.phaseCode.length + 1; i++) {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'line animacao';
            lineDiv.draggable = true;
            // Defina o conteúdo do div como a string atual
            lineDiv.textContent = this.quizzCode[i];
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
        this.confirmBtn = this.add.rexRoundRectangle(this.game.canvas.width / 2, this.game.canvas.height - 40, 130, 50, 5, 0x0077FF).setOrigin(0.5);

        this.confirmBtnText = this.add.text(this.game.canvas.width / 2, this.game.canvas.height - 40, 'Confirmar', { fontFamily: 'Cooper Black', fontSize: '18px', fill: '#fff', fontWeight: 'bold' }).setOrigin(0.5);

        this.confirmBtn.setInteractive();

        let attempts = localStorage.getItem("tentativas");

        if(!attempts || attempts > 0) {
            attempts = 0;
            localStorage.setItem("tentativas", 0);
        }

        this.confirmBtn.on('pointerdown', () => {
            attempts++;

            // Verifica a ordem quando necessário (por exemplo, quando o jogador clica em um botão)
            if (this.checkOrder()) {
                this.confirmBtn.disableInteractive();
                this.showCorrect(this.game.canvas.height - 120);
                this.correct.play();

                // Itera sobre cada elemento filho e aplica uma cor de fundo
                for (var i = 0; i < lines.length - 1; i++) {
                    lines[i].style.backgroundColor = '#228b22'; // Defina a cor de fundo desejada aqui
                }

                this.save(this.phaseIndex);
                this.phaseIndex++;
                this.phase = this.phases[this.phaseIndex];
                localStorage.setItem("tentativas", 0);
                setTimeout(() => {
                    this.clearCode();
                    this.textPhaseTitle.destroy();
                    this.confirmBtn.destroy();
                    this.showQuizScreen(this.phase);
                }, 3000);
            } else {
                if (attempts == 1) {
                    this.confirmBtn.disableInteractive();
                    this.showWrong(this.game.canvas.height);
                    this.wrong.play();
                    this.confirmBtn.setInteractive();
                } 
                if (attempts == 2){
                    this.confirmBtn.disableInteractive();
                    this.showWrong(this.game.canvas.height);
                    this.wrong.play();
                    this.confirmBtn.setInteractive();
                }
                if (attempts === 3) {
                    localStorage.setItem("tentativas", 0);
                    this.gameOver();             
                }

                localStorage.setItem("tentativas", attempts);
            }
        });

        // Evento de hover
        this.confirmBtn.on('pointerover', () => {
            this.confirmBtnText.setStyle({ fontSize: '20px' });
            this.confirmBtn.setFillStyle('0x00BBFF').setSize(135, 55);
        });

        // Evento de hout
        this.confirmBtn.on('pointerout', () => {
            this.confirmBtnText.setStyle({ fontSize: '18px'});
            this.confirmBtn.setFillStyle('0x0077FF').setSize(130, 50);
        });

        // Ícone do menu
        const backIcon = this.add.image(panelX + 40, this.game.canvas.height - 40, 'backIcon').setOrigin(0.5);
        backIcon.setInteractive();
        backIcon.on('pointerdown', () => {
            // Quando o ícone do menu for clicado, mostra a janela de confirmação
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
                return false;
            }
        }

        return true;
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
            lineDiv.textContent = this.quizzCode[i];
            column.appendChild(lineDiv);
            if (i == this.phaseCode.length) {
                lineDiv.classList.remove("animacao");
            }
        };

        // Adiciona a div pai ao corpo do documento
        document.body.appendChild(column);
    }

    clearCode() {
        const column = document.querySelectorAll(".column");
        
        column.forEach((column) => {
            document.body.removeChild(column);
        });
    }

    showCorrect() {
        if(this.isShowingWrong) document.querySelector('#message-wrong').style.zIndex = -1;
        this.isShowingWrong = false;

        const messageDiv = document.createElement("div");
        messageDiv.className = "message";
        messageDiv.textContent = "Você acertou!";

        // Adiciona a mensagem à tela
        document.body.appendChild(messageDiv);

        const posY = this.confirmBtn.y - 50; // Ajuste a posição vertical conforme necessário

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
        this.isShowingWrong = true;
        const messageDiv = document.createElement("div");
        messageDiv.className = "message";
        messageDiv.textContent = "Errado! Tente de novo!";

        // Adiciona a mensagem à tela
        document.body.appendChild(messageDiv);

        const posY = this.confirmBtn.y - 50; // Ajuste a posição vertical conforme necessário

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
            document.body.removeChild(messageDiv);
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

        this.confirmText = this.add.text(confirmWindowX, confirmWindowY - 35, 'Tem certeza que deseja retornar ao menu?', { fontFamily: 'Cooper Black', fontSize: '20px', fill: '#FFFFFF', align: 'center' }).setWordWrapWidth(confirmWindowWidth * 0.9).setOrigin(0.5);
        this.confirmWindow.add(this.confirmText);

        this.confirmYesBtn = this.add.rexRoundRectangle(confirmWindowX / 1.4, confirmWindowY + 25, 75, 40, 10, 0xED3D85).setOrigin(0.5)
        this.confirmYesText = this.add.text(confirmWindowX / 1.4, confirmWindowY + 25, 'Sim', { fontFamily: 'Cooper Black',fontSize: '20px', fill: '#FFFFFF', padding: 15 }).setOrigin(0.5).setDepth(3);


        this.confirmNoBtn = this.add.rexRoundRectangle(confirmWindowX / 0.75, confirmWindowY + 25, 75, 40, 10, 0xED3D85).setOrigin(0.5)
        this.confirmNoText = this.add.text(confirmWindowX / 0.75, confirmWindowY + 25, 'Não', { fontFamily: 'Cooper Black', fontSize: '20px', fill: '#FFFFFF', padding: 15 }).setOrigin(0.5).setDepth(3);
        

        [this.confirmYesBtn, this.confirmNoBtn].forEach(button => {
            button.setInteractive();

            button.on('pointerdown', () => {
                if(button.x < confirmWindowX) {
                    // Ação ao clicar em "Sim"
                   this.clearCode();
                   this.select.play();
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

    gameOver(){
        localStorage.setItem("faseAtual", 0);
        localStorage.setItem("tentativas", 0);

        this.overlay.setVisible(true);
        this.overlay.fillStyle(0x000000, 1); // Cor preta com 50% de opacidade
        this.clearCode()

        this.playMusic.stop();
        this.gameOverSound.play();

        let gameOverFont = (1.73 * this.game.canvas.width)/100 + 36;
        
        // Cria a animação da palavra "Game Over"
        const gameOverTitle = this.add.text(0, 0, '', {
            fontFamily: 'Cooper Black',
            fontSize: gameOverFont,
            color: '#ff0000',
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
                                if(button.text === 'REINICIAR') {
                                    this.resetGame();
                                } else {
                                    this.quitGame();
                                }
                            });

                            button.on('pointerover', () => {
                                button.setStyle({fontSize: 26})
                            })
                            button.on('pointerout', () => {
                                button.setStyle({fontSize: 24})
                            })
                        });
                       
 
                    }, 1000);
                }
            },
            callbackScope: this,
            loop: true, // Mantém o evento em loop até que todas as letras sejam mostradas
        });

        // Centraliza o texto e define a quebra de linha para evitar que ultrapasse a tela
        gameOverTitle.setWordWrapWidth(this.game.canvas.height * 0.8, true);
        gameOverTitle.setOrigin(0.5);
        gameOverTitle.setDepth(2);
        gameOverTitle.setPosition(this.game.canvas.width / 2, this.game.canvas.height / 2.5);

        
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

}
