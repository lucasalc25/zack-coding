var loadState = {
    preload: function() {
        var txtLoading = game.add.Text(game.world.centerX, 200, 'Loading...', {font:'15px', fill:'#fff'}); // Associação de um texto a variável
        txtLoading.anchor.set(0.5); // Ponto de ancoragem centralizado

        var progressBar = game.add.sprite(game.world.centerX, 250, 'progressBar'); // Associação da imagem e sua posição a uma variável
        progressBar.anchor.set(0.5); // Ponto de ancoragem centralizado

        game.load.setPreloadSprite(progressBar) // Configuração da variável para atuar como uma barra de carregamento

        game.load.image('sala', '/assets/img/sala.jpg');
        game.load.image('cozinha', '/assets/img/cozinha.jpg');
        game.load.image('jogador', '/assets/img/zack.png');
    }
};