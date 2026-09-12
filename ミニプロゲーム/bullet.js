class Bullet extends GameObject{
    constructor(x, y,speed = 5, direction, parent){
        super();
        this.player = Player.instance;
        this.x = x;
        this.y = y;
        this.move(0, 0);
        this.gameObject = $(`<div class='bullet' id='${$(parent.gameObject).prop("id")}'></div>`).appendTo(`.bullets`);
        this.direction = direction;
        this.width = parseInt($(this.gameObject).css("width").replace("px", ""));
        this.height = parseInt($(this.gameObject).css("height").replace("px", ""));
        this.collider = new Collider(this.x, this.y, this.width, this.height, this);
        this.gameManager = GameManager.instance;
        this.gameManager.AllBullets.push(this);
        this.gameLevelManager = GameLevelManager.instance;
        this.parent = parent;
        this.speed = this.player.playerLevels[this.player.playerLevelNow].speed;
        // this.colliderDetect =  new ColliderDetect(this.collider, );
    }
    Destroy(){
        super.Destroy();
        this.collider.Destroy();
        this.gameObject.remove();
        delete this.gameManager.AllBullets.indexOf(this);
    }
    update(bullet){
        if(this.gameManager.pauseGame || this.gameManager.gameClear) return;
        if(Math.abs(this.x) > this.gameManager.gameArea.x || Math.abs(this.y) > this.gameManager.gameArea.y) this.Destroy();
        this.collider.x = this.x;
        this.collider.y = this.y;
    }
    fixedupdate(){
        this.move(this.direction.x * this.speed, this.direction.y * this.speed);
    }
    move(xVector, yVector){
        let moveX = xVector * 1;
        let moveY = yVector * 1;
        let atan = Math.atan2(xVector, yVector);
        
        $(this.gameObject).css({
            "transform": `translate(${this.x + (moveX)}px, ${this.y + (moveY)}px) rotate(${-atan}rad)`
        });
        this.x = this.x + moveX;
        this.y = this.y + moveY;
        
    }

}