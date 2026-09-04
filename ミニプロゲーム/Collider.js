class Collider{
    constructor(x, y, width, height, parent){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.parentGameObject = parent;
        this.gameObject = $("<div class='collider'></div>").appendTo(`.colliders`);
        this.destroy = false;
    }

    detectCollision(target){
        if(this.destroy == true || target.destroy == true) return false;
        const horizontal = (target.left < this.right) && (this.left < target.right); //水平方向の距離
        const vertical = (target.top < this.bottom) && (this.top < target.bottom); //垂直方向の距離
        return (horizontal && vertical); //両方の条件が一致すれば接触判定
    }
    Destroy(){
        // this.gameObject.remove();

        this.destroy = true;
        this.parentGameObject = null;
    }
    Debug(){
        this.gameObject.css("left", this.x);
        this.gameObject.css("top", this.y);
        this.gameObject.css("width", this.width);
        this.gameObject.css("height", this.height);
        this.gameObject.css("border", "10px solid #f8b02a");
        this.gameObject.css("z-index", "100000000");
        this.gameObject.css("position", "absolute");
    }

    get top() { return this.y; }
    get bottom() { return this.y + this.height; }
    get left() { return this.x; }
    get right() { return this.x + this.width; }
}