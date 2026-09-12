
class Enemy extends GameObject{
    constructor(x, y){
        super();
        this.gameLevelManager = GameLevelManager.instance;
        this.speed = this.gameLevelManager.stageLevels[this.gameLevelManager.stageNow].EnemySpeed;
        this.x = x;
        this.y = y;
        this.gameObject = $("<div class='enemy'></div>").appendTo(`.enemies`);
        this.move(x, y);
        this.moveNow = false;
        this.MoveAnim = null;
        this.player = Player.instance;
        this.chaseNow = false;
        this.aroundX = 0;
        this.aroundY = 0;
        this.width = 50;
        this.height = 50;
        this.setSize(this.width, this.height);
        this.collider = new Collider(this.x, this.y, this.width, this.height, this);
        this.HP = 100;
        this.gameManager = GameManager.instance;
        this.gameManager.AllEnemies.push(this);
        this.death = false;
        this.beforeTimeStamp = 0;

    }
    start(){
        
    }
    Destroy(){
        super.Destroy();
        
        this.gameObject.remove();

    }
    setSize(width, height){

        $(this.gameObject).css("width", width);
        $(this.gameObject).css("height", height);
    }
    move(xVector, yVector){
        // this.x = this.x + xVector;
        // this.y = this.y + yVector;
        // $(this.gameObject).css({
        //     left: (this.x) + "px",
        //     top: (this.y) + "px"
        // });
        let moveX = xVector * 1;
        let moveY = yVector * 1;
        $(this.gameObject).css({
            "transform": `translate(${this.x + (moveX)}px, ${this.y + (moveY)}px)`
        });
        this.x = this.x + moveX;
        this.y = this.y + moveY;
    }

    // fixedupdate(){
        
    // }
    update(enemy, timestamp){
        if(this.gameManager.pauseGame || this.gameManager.gameClear){
            if(this.MoveAnim != null) this.MoveAnim.stop();
            this.beforeTimeStamp = timestamp;
            return;
        } 
        let deltaTime = (timestamp - this.beforeTimeStamp) / 1000;

        if(this.chaseNow){
            let direction = new Vector2((this.player.x + this.aroundX) - this.x, (this.player.y + this.aroundY) - this.y).normalized;
            this.move(direction.x * this.speed*100*deltaTime, direction.y * this.speed*100*deltaTime);

        }else{
            this.move(0,0);
        }
    
        this.collider.x = this.x;
        this.collider.y = this.y;
        if(this.collider.detectCollision(this.player.collider) || this.death == true){
            //playerに触れたら。
            this.chaseNow = false;
        }else{
            this.chaseNow = true;
        };
        for(let i = 0; i < GameManager.instance.AllBullets.length; i++){
            if(this.collider.detectCollision(GameManager.instance.AllBullets[i].collider)){
                GameManager.instance.AllBullets[i].Destroy();
                this.Death(this);
            }
        }
        this.beforeTimeStamp = timestamp;

    }
    chase(){
        this.aroundX = Math.floor(Math.random() * 50) - 50;
        this.aroundY = Math.floor(Math.random() * 50) - 50;
        this.chaseNow = true;
    }

    Death(enemy){
        this.collider.Destroy();
        delete this.gameManager.AllEnemies.indexOf(this);
        this.death = true;
        $(this.gameObject).addClass("death");
        setTimeout(function(){
            enemy.Destroy();
        }, 1000);
    }
}
