class Player extends GameObject{
    static instance;
    constructor(x, y, gameObject){
        super();
        this.x = x;
        this.y = y;
        this.gameObject = gameObject;
        Player.instance = this;
        this.HP = 100;
        this.HPBarObject = $(".player-hp-bar");
        this.invincibilityMode = false;
        this.invicibilityTimeNow = 0;

        this.collider = new Collider(this.x, this.y, 30, 30, this);  
        this.gameManager = GameManager.instance;
        this.gameLevelManager = GameLevelManager.instance;
        this.playerLevels = [
            new PlayerLevel(0, 1, 1, 1,  [new Weapon(this.x, this.y, 0,0)]),
            new PlayerLevel(1, 0.9, 2, 2,[new Weapon(this.x, this.y, 0,0), new Weapon(this.x, this.y, 0.523599,0.523599)]),
            new PlayerLevel(2, 0.9, 3.5, 3, [new Weapon(this.x, this.y, 0,0), new Weapon(this.x, this.y, 0.523599,0.523599),new Weapon(this.x, this.y, -0.523599, -0.523599)]),
            new PlayerLevel(3, 0.8, 4, 4,[new Weapon(this.x, this.y, 0,0),new Weapon(this.x, this.y, 0.523599,0.523599),new Weapon(this.x, this.y, -0.523599, -0.523599),new Weapon(this.x, this.y, 1.0472,1.0472)]),
            new PlayerLevel(4, 0.5, 5,5,[new Weapon(this.x, this.y, 0,0),new Weapon(this.x, this.y, 0.523599,0.523599),new Weapon(this.x, this.y, -0.523599, -0.523599),new Weapon(this.x, this.y, -1.0472,-1.0472)]),
            new PlayerLevel(5, 0.4, 8,8,[new Weapon(this.x, this.y, 0,0),new Weapon(this.x, this.y, 0.523599,0.523599),new Weapon(this.x, this.y, -0.523599, -0.523599),new Weapon(this.x, this.y, -1.0472,-1.0472), new Weapon(this.x, this.y, -0.2617,-0.2617)]),
        ];
        this.enemyCollidered = false;
        this.playerWeapons = this.playerLevels[0].weapons;
        this.beforePlayerWeapons = this.playerWeapons;
        this.playerLevelNow = 0;
        this.hurtTimeNow = 0;
        this.speed = this.playerLevels[this.playerLevelNow].speed;
        this.width = parseInt($(this.gameObject).css("width").replace("px", ""));
        this.height = parseInt($(this.gameObject).css("height").replace("px", ""));
        this.move(this.x, this.y);
    }
    get pos(){
        return {"x": this.x, "y": this.y};
    }
    start(player){
        $(".player-hp-bar").progressbar({
            value: 100,
            change: function(){

            },
            complete: function(){

            }
        });
    }
    update(player, timestamp){
        this.speed = this.playerLevels[this.playerLevelNow].speed;
        if(this.gameManager.pauseGame|| this.gameManager.gameClear || !this.gameManager.gameStart){
            this.beforeTimeStamp = timestamp;
            this.enemyCollidered = false;
            return;
        } 
        let deltaTime = (timestamp - this.beforeTimeStamp) / 1000;

        let direction = new Vector2(GetKey.Horizontal, GetKey.Vertical);
        let forceX;
        let forceY;
        if(0 > this.x || this.gameManager.gameArea.x < this.x + this.width){
            if(0 > this.x){
                forceX = 1;
            }else{
                forceX = -1;
            }
            direction.x = forceX;
        }
        if(0 > this.y || this.gameManager.gameArea.y < this.y + this.height){
            if(0 > this.y){
                forceY = -1;
            }else{
                forceY = 1;
            }
            direction.y = forceY;
        }
        this.move(direction.x *10 * this.speed * deltaTime, -direction.y * this.speed* 10 * deltaTime);
        this.gameManager.AllEnemies.forEach(enemy => {
            if(enemy.collider.detectCollision(this.collider) && !enemy.death){
                this.enemyCollidered = true;
            }
        });
        if(!isNaN(deltaTime) && this.enemyCollidered){
            this.invicibilityTimeNow += deltaTime;
        }else{
            this.invicibilityTimeNow = 0;
        }
        if(this.invicibilityTimeNow > 0){
            this.invicibilityMode = false;
           this.invicibilityTimeNow = 0;
        }else{
            this.invicibilityMode = true;
        };
        if(!this.invicibilityMode && this.enemyCollidered){
            this.attacked(0.5);
        }
        this.collider.x = this.x;
        this.collider.y = this.y;
        this.beforeTimeStamp = timestamp;
        this.enemyCollidered = false;
    }
    move(xVector, yVector){
        let moveX = xVector * 1;
        let moveY = yVector * 1;
        let direction = new Vector2((Mouse.x) - $(this.gameObject)[0].getBoundingClientRect().left, Mouse.y - $(this.gameObject)[0].getBoundingClientRect().top).normalized;
        let playerAtan = Math.atan2(direction.x, direction.y);
        $(this.gameObject).css({
            "transform": `translate(${this.x + (moveX)}px, ${this.y + (moveY)}px) rotate(${-(playerAtan - 1.575)}rad)`
        });
        this.x = this.x + moveX;
        this.y = this.y + moveY;
    }
    Destroy(){
        this.collider.Destroy();
    }

    levelUp(){
        this.playerLevelNow += 1;
        if(this.playerLevels[this.playerLevelNow].weapons.length != 0){
            this.beforePlayerWeapons = this.playerWeapons;
            this.playerWeapons = this.playerLevels[this.playerLevelNow].weapons;
        }
    }
    attacked(damage){
        this.HP -= damage;
        if(this.HP <= 0){
            this.gameManager.GameOver();
        }
        $(".player-hp-bar").progressbar("value", this.HP);
    }
    levelUpDescription(beforeLevelUp, afterLevelUp){
        return [
            {name: "弾生成速度",id: "bulletSpawnTime",  value: afterLevelUp.BulletSpawnTime + beforeLevelUp.BulletSpawnTime},
            {name: "弾速度",id: "bulletSpeed", value: afterLevelUp.bulletSpeed - beforeLevelUp.bulletSpeed},
            {name: "移動速度", id: "playerSpeed",value: afterLevelUp.speed - beforeLevelUp.speed},
            {name: "武器の数", id: "weaponCount",value: afterLevelUp.weapons.length - this.beforePlayerWeapons.length}
        ]
    }
}
