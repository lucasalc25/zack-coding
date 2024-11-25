import NovoJogo from './scenes/newGame.js';
import Loading from './scenes/loading.js';
import MainMenu from './scenes/mainMenu.js';
import Jogo from './scenes/play.js'

var config = {
    type: Phaser.AUTO,
    width: 800, // Largura inicial
    height: 600, // Altura inicial
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Loading, MainMenu, NovoJogo, Jogo],
};

// Inicializa o jogo
var game = new Phaser.Game(config);