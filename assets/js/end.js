class End extends Phaser.Scene {
    constructor() {
        super({ key: 'End' });
    }

    preload() {
    }

    create() {
        // Crie um elemento div
        const blackScreen = document.createElement('div');

        // Defina o estilo para ocupar toda a tela e cor de fundo preta
        blackScreen.style.position = 'fixed';
        blackScreen.style.top = '0';
        blackScreen.style.left = '0';
        blackScreen.style.width = '100%';
        blackScreen.style.height = '100%';
        blackScreen.style.backgroundColor = 'black';
        blackScreen.style.opacity = '0'; // Começa com opacidade 0 para a animação de fade in
        blackScreen.style.transition = 'opacity 1s ease'; // Adiciona uma transição de 1 segundo para a propriedade de opacidade
        

        // Adicione o elemento à página
        document.body.appendChild(blackScreen);
    }
}