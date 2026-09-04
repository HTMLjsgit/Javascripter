class GameLevelManager extends GameObject{
    static instance;
    constructor(){
        super();
        GameLevelManager.instance = this;     
        this.stageLevels = [
            new StageLevel(0, 1, 2),
            new StageLevel(1, 0.7, 3),
            new StageLevel(2, 0.5, 3.5),
            new StageLevel(3, 0.35, 4),
            new StageLevel(4, 0.15, 4.5),
            new StageLevel(5, 0.1, 5)
        ]
        this.stageNow = 0;
    }
    start(){

    }
    update(){

    }
    stageStart(){
    }
    levelUp(){
        this.stageNow += 1;
        
    }
}