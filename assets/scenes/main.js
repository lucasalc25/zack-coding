const Phaser = require('phaser');
const RexUIPlugin = require('node-modules/phaser3-rex-plugins/templates/ui/ui-plugin');
const Load1 = require('./load1');
const Home = require('./home');
const Load2 = require('./load2');
const Play = require('./play');
const Quiz = require('./quiz');

var config = {
    type: Phaser.AUTO,
    width: 800, // Largura inicial
    height: 600, // Altura inicial
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Load1, Home, Load2, Play, Quiz],
    plugins: { 
        global: [{
            key: 'rexUI',
            plugin: RexUIPlugin,
            start: true
        }]
    }
};

// Inicializa o jogo
var game = new Phaser.Game(config);