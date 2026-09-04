class Mouse{
    static x = 0;
    static y = 0;

    static start(){
        $(document).on("mousemove", function(e){
            Mouse.x = e.clientX;
            Mouse.y = e.clientY;
        });
    }
}

Mouse.start();