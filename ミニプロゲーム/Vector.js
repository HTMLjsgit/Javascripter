class Vector2{
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
    set(x, y){
        this.x = x;
        this.y = y;
        return this;
    }
    get magnitude(){
        const {x, y} = this;
        return Math.sqrt(x**2+y**2);
    }

    get normalized(){
        const {x,y,magnitude} = this;
        if(magnitude == 0){
            return new Vector2(0,0);
        }
        return new Vector2(x/magnitude, y/magnitude);
    }
    // ベクトルの内積
    dot(v1, v2) {
        return v1.x*v2.x + v1.y*v2.y;
    }
}