const larguraMinima = 360; // Largura mínima desejada
const alturaMinima = 375; // Altura mínima desejada

// Obtém as dimensões da tela do dispositivo
const larguraDispositivo = window.innerWidth;
const alturaDispositivo = window.innerHeight;

// Calcula a largura e altura final da tela do jogo
const larguraFinal = Math.max(larguraMinima, Math.min(larguraDispositivo, 800));
const alturaFinal = Math.max(alturaMinima, Math.min(alturaDispositivo, 800));

var config = {
    type: Phaser.AUTO,
    parent: 'game-container', 
    scale: {
        mode: Phaser.Scale.RESIZE,
        min: {
            width: 365,
            height: 365
        },
        max: {
            width: 800,
            height: 1000
        },
        orientation: Phaser.Scale.Orientation.DEFAULT,
    },
    scene: [Home, Play, Quizzes, End],
};

// Inicializa o jogo
var game = new Phaser.Game(config);