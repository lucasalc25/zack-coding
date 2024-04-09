
var config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800, // Largura inicial
    height: 600, // Altura inicial
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scale: {
        mode: Phaser.Scale.RESIZE
    },
    scene: [Home, Play, Quizzes, End],
};

// Inicializa o jogo
var game = new Phaser.Game(config);

function resizeGame() {
    let canvas = document.querySelector("canvas");
    const width = window.innerWidth;
    const height = window.innerHeight;
    const wratio = width / 800;
    const hratio = height / 565;
    const ratio = Math.min(wratio, hratio);
    canvas.style.width = (800 * ratio) + 'px';
    canvas.style.height = (565 * ratio) + 'px';
}

window.addEventListener('resize', resizeGame);
resizeGame(); // Chama a função imediatamente para ajustar o tamanho inicial