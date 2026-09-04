class PlayerLevel{
    constructor(level, BulletSpawnTime, BulletSpeed, playerSpeed, weapons = []){
        this.level = level;
        this.BulletSpawnTime = BulletSpawnTime;
        this.bulletSpeed = BulletSpeed;
        this.speed = playerSpeed;
        this.weapons = weapons;
    }
}