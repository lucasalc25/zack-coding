import Load1 from './scenes/load1.js';
import Home from './scenes/home.js';

var config = {
    type: Phaser.AUTO,
    width: 800, // Largura inicial
    height: 600, // Altura inicial
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Load1, Home],
};

// Inicializa o jogo
var game = new Phaser.Game(config);