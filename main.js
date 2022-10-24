let ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(function () {
    let canvas = document.getElementById('gameWorld');
    let ctx = canvas.getContext('2d');

    let gameEngine = new GameEngine();
    gameEngine.init(ctx);

    let line = new Line(gameEngine);
    gameEngine.addEntity(line);



    gameEngine.start();
});