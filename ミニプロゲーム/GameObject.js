
class GameObject{
    static AllGameObjects = [];
    constructor(){
        GameObject.AllGameObjects.push(this);
    }
    Destroy(){
        GameObject.AllGameObjects = GameObject.AllGameObjects.filter(x => x != this);

    }
    fixedupdate(){
        
    }
}