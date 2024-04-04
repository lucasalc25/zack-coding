// Configurações do jogo
const larguraFinal = Math.max(360, Math.min(window.innerWidth, 800));
const alturaFinal = Math.max(360, Math.min(window.innerHeight, 800));

var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        width: larguraFinal,
        height: alturaFinal,
        orientation: Phaser.Scale.Orientation.DEFAULT,
    },
    scene: [Home, Play, Quizzes, End],
};

// Inicializa o jogo
var game = new Phaser.Game(config);