class GameManager extends GameObject{
    static instance;
    constructor(){
        super();
        GameManager.instance = this;
        this.AllBullets = [];
        this.AllEnemies = [];
        this.remainingTime = 60;
        this.quizSpawnTimeNow = 0;
        this.remainingTimeNow = 0;
        this.timeObject = $(".time");
        this.beforeTimeStamp = 0;
        this.gameOver = false;
        this.gameStart = false;
        this.gameClear = false;
        this.pauseGame = true;
        this.gameArea = new Vector2(900, 500);
        this.gameAreaObject = $(".game-play-area");
        this.gameAreaObject.css("width", this.gameArea.x);
        this.gameAreaObject.css("height", this.gameArea.y);
        $(".games").css("width", this.gameArea.x);
        this.quizIndex = 0;
        this.enemySpawnTimeNow = 0;
        this.gameLevelManager = GameLevelManager.instance;
    }
    start(gameManager){
        this.quizManager = QuizManager.instance;
        $(".retry-game").on("click", function(){
           
           location.reload(); 
        });
        $(".game-start button").on("click", function(){
            gameManager.GameStart(gameManager);
        });
    }
    update(gameManager, timestamp){
        if(this.pauseGame){
            this.quizSpawnTimeNow = 0;
            this.enemySpawnTimeNow = 0;
            this.remainingTimeNow = 0;
            this.beforeTimeStamp = timestamp;
        }
        if(!this.gameStart || this.gameClear || this.pauseGame) return;
        if(this.gameLevelManager == null) this.gameLevelManager = GameLevelManager.instance;
        let deltaTime = (timestamp - this.beforeTimeStamp) / 1000;
        if(!isNaN(deltaTime)){
            this.remainingTimeNow += deltaTime;
            this.enemySpawnTimeNow += deltaTime;
            this.quizSpawnTimeNow += deltaTime;
            if(this.enemySpawnTimeNow > this.gameLevelManager.stageLevels[this.gameLevelManager.stageNow].enemySpawnTime){
                //敵を沸かす
                this.enemySpawn();
                this.enemySpawnTimeNow = 0;
            }
            if(this.AllEnemies.length > 150){
                this.AllEnemies[this.AllEnemies.length - 1].Destroy();
            }
            if(this.remainingTimeNow >= 1){
                this.remainingTime -= 1;
                this.DoTextTime(this.remainingTime);
                this.remainingTimeNow = 0;
            }
            if(this.remainingTime <= 0){
                this.GameClear();
            }
            if(this.quizSpawnTimeNow > 11){
                this.quizManager.quizStart(this.quizManager.quizzes[this.gameLevelManager.stageNow]);
                this.quizSpawnTimeNow = 0;
            }

        }
        this.beforeTimeStamp = timestamp;
    }
    enemySpawn(){
        if(this.pauseGame || this.gameClear) return;
        let valueX = Math.floor(Math.random() * this.gameArea.x);
        let valueY = Math.floor(Math.random() * this.gameArea.y);

        let enemy = new Enemy(valueX, valueY);
        this.player = Player.instance;
        if(this.player.collider.detectCollision(enemy.collider)){
            valueX = Math.floor(Math.random() * this.gameArea.x);
            valueY = Math.floor(Math.random() * this.gameArea.y);
        }
        enemy.chase();
        enemy.start(enemy);
        return enemy;
    }
    DoTextTime(time){
        if(time < 10){
            $(this.timeObject).find("h2").text(`0:0${time}`);
        }else{
            $(this.timeObject).find("h2").text(`${Math.floor(time / 60)}:${time}`);
        }
    }
    GameStart(gameManager){
        let countdown = 4;

        let countdowntimer = setInterval(function(){
            countdown -= 1;
            $(".countdown-box h1").text(countdown);
            $(".countdown-box h1").removeClass("before");
            if(countdown <= 0){
                $(".countdown-box h1").text("GO!!!");
                gameManager.gameStart = true;
                gameManager.gameResume();
                setTimeout(function(){
                     $(".countdown-box").fadeOut(1);
                     $(".countdown-box h1").fadeOut(1);
                }, 1000);
                clearInterval(countdowntimer);
            }else{
                setTimeout(function(){
                        $(".countdown-box h1").addClass("before");
                }, 500);
            }

        }, 1000);
        $(".game-start-box").addClass("hide");
        $(".games").removeClass("hide");

    }
    gameStop(){
        setTimeout(() => {

            for(let i = 0; i < this.AllEnemies.length; i++){
               this.AllEnemies[i].Destroy();
            }
            for(let k = 0; k < this.AllBullets.length; k++){
                this.AllBullets[k].Destroy();
            }
            this.AllEnemies = [];
            this.AllBullets = [];
        }, 50);
        this.pauseGame = true;
    }
    gameResume(){
        this.pauseGame = false;
    }
    GameClear(){
        setTimeout(() => {
            for(let i = 0; i < this.AllEnemies.length; i++){
               this.AllEnemies[i].Destroy();
            }
            for(let k = 0; k < this.AllBullets.length; k++){
                this.AllBullets[k].Destroy();
            }
            this.AllEnemies = [];
            this.AllBullets = [];
        }, 50);
        $(".modal").removeClass("hide");
        $(".game-clear-card").removeClass("hide");
        this.gameClear = true;
    }
    GameOver(){
        $(".modal").removeClass("hide");
        $(".game-over-card").removeClass("hide");
        this.gameOver = true;
        this.gameStop();
    }
    CountDown(time){
        time -= 1;
        if(time <= 0){
            return true;
        }
        return false;
    }
}