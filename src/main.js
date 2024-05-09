
var config = {
    type: Phaser.AUTO,
    width: 800, // Largura inicial
    height: 600, // Altura inicial
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Load1, Home, Load2, Play, BeginnerQuiz],
};

// Inicializa o jogo
var game = new Phaser.Game(config);