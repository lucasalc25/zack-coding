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
    scene: [Home, Play, Quizzes]
};

// Inicializa o jogo
var game = new Phaser.Game(config);