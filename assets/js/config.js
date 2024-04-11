
var config = {
    type: Phaser.AUTO,
    width: 800, // Largura inicial
    height: 565, // Altura inicial
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scale: {
        mode: Phaser.Scale.FIT
    },
    scene: [Home, Play, Quizzes, End],
};

// Inicializa o jogo
var game = new Phaser.Game(config);