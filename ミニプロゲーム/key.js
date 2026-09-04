class GetKey{
    static key = null;
    static Horizontal = 0;
    static Vertical = 0;
    static up_push = false;
    static down_push = false;
    static left_push = false;
    static right_push = false;
    static start(){

        $(document).on("keydown", function(e){
            GetKey.SetKey(e.key);
            if(e.key == "w"){
                GetKey.up_push = true;
            }
            if(e.key == "d"){
                GetKey.right_push = true;
            }
            if(e.key == "a"){
                GetKey.left_push = true;
            }
            if(e.key == "s"){
                GetKey.Vertical = -1;
                GetKey.down_push = true;
            }
        });
        $(document).on("keyup", function(e){
            GetKey.SetKey("");
            if(e.key == "w"){
                GetKey.up_push = false;
            }
            if(e.key == "d"){
                GetKey.right_push = false;
            }
            if(e.key == "a"){
                GetKey.left_push = false;
            }
            if(e.key == "s"){
                GetKey.down_push = false;
            }
        });
    }
    static keyGet(){
        return GetKey.key;
    }
    static SetKey(_key){
        GetKey.key = _key;
    }

    static SetHorizontal(){
        if(GetKey.right_push){
            GetKey.Horizontal = 1;
        }else if(GetKey.left_push){
            GetKey.Horizontal = -1;
        }else{
            GetKey.Horizontal = 0;
        }
    }
    static SetVertical(){
        if(GetKey.up_push){
            GetKey.Vertical = 1;
        }else if(GetKey.down_push){
            GetKey.Vertical = -1;
        }else{
            GetKey.Vertical = 0;
        }
    }
}

GetKey.start();