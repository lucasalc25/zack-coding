var bootState = {
    preload: function() {
        game.load.image('progressBar', '/assets/img/progressBar.png');
    },
    create: function() {
        game.state.start('load');
    }
};