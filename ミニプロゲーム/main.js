

$(function(){
    const stealker = $(".stealker");
    const gameManager = new GameManager();
    const quizManager = new QuizManager();
    const gameLevelManager = new GameLevelManager();
    // setInterval(enemySpawn, 1000);
    const player = new Player(100,100, "#player");
    // setInterval(fixedupdate, 1);
    
    init();

    function start(){

        GameObject.AllGameObjects.forEach(function(gameObject){
            gameObject.start(gameObject);
        });    
    }
    function update(timestamp){
        GameObject.AllGameObjects.forEach(function(gameObject){
            gameObject.update(gameObject, timestamp);
        });
        GetKey.SetHorizontal();
        GetKey.SetVertical();


        requestAnimationFrame(update);
        beforeTimeStamp = timestamp;
    }

    function init(){
        start();
        update();
    }
});

