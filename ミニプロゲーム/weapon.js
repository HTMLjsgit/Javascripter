class Weapon extends GameObject{
    constructor(x, y, addX, addY){
        super();
        this.player = Player.instance;
        this.x = this.player.x + (this.player.width / 2);
        this.y = this.player.y + (this.player.height / 2);
        this.spawnTimeNow = 0;
        this.beforeTimeStamp = 0;      
        this.addX = addX;
        this.addY = addY;
        this.gameObject = $(`<div class='weapon' id='${this.addX}'></div>`).appendTo(".game-play-area");
    }
    Destroy(){
        super.Destroy();
        this.gameObject.remove();
    }
    start(){
        console.log("weeapon");
    }
    update(weapon, timestamp){
        if(GameManager.instance.pauseGame || GameManager.instance.gameClear || !GameManager.instance.gameStart){
            this.beforeTimeStamp = timestamp;
            return;
        }
        if(!this.player.playerWeapons.includes(this)) return;
        let deltaTime = (timestamp - this.beforeTimeStamp) / 1000;
        this.x = this.player.x + (this.player.width / 2);
        this.y = this.player.y + (this.player.height / 2);
        this.Debug();
        if(!isNaN(deltaTime)){
            this.spawnTimeNow += deltaTime;
        }
        if(this.spawnTimeNow > this.player.playerLevels[this.player.playerLevelNow].BulletSpawnTime){
            //敵を沸かす
            let spawnBullet = this.spawnBullet();
            this.spawnTimeNow = 0;
        }
        this.beforeTimeStamp = timestamp;
    }
    spawnBullet(){
        console.log("spawnBUllet");
        let directionBullet = new Vector2((Mouse.x) - $(this.gameObject)[0].getBoundingClientRect().left, (Mouse.y) - $(this.gameObject)[0].getBoundingClientRect().top).normalized;
        let BulletAtanRadian = Math.atan2(directionBullet.x, directionBullet.y) + 1.5708;
        console.log(BulletAtanRadian);
        let AddRadian = this.addX;
        let addDirection = new Vector2(-Math.cos(BulletAtanRadian + AddRadian),  Math.sin(BulletAtanRadian + AddRadian));        

        if(this.addX != 0 && this.addY != 0){
            directionBullet = new Vector2(addDirection.x, addDirection.y);
        }
        let bullet = new Bullet(this.x, this.y, 5, directionBullet.normalized, this);

    }
    Debug(){
        this.gameObject.css("transform", `translate(${this.x}px, ${this.y}px)`);
        this.gameObject.css("width", 1);
        this.gameObject.css("height", 1);
        this.gameObject.css("z-index", "100000000");
        this.gameObject.css("position", "absolute");
        
    }
}