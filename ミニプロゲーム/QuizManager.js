class QuizManager extends GameObject{
    static instance;
    constructor(x, y, gameObject){
        super();
        this.quizzes = [];
        this.playerLevelUpped = false;
        for(let i = 0; i < quizDatas.length; i++){
            this.quizzes.push(
                new Quiz(
                    quizDatas[i].title, 
                    quizDatas[i].description, 
                    quizDatas[i].answerd_description,
                    quizDatas[i].chooses,
                    quizDatas[i].quiz_image,
                    quizDatas[i].correct_answer,
                )
            );
        }
        QuizManager.instance = this;
    }
    start(quizManager){
    }
    update(quizManager, timestamp){

    }
    quizResult(quizManager,quiz, correct){
        //クイズの結果画面表示機能
        if(correct){
            //正解なら
            Player.instance.levelUp();
            this.playerLevelUpped = true;
            $(".maru").fadeIn();
        }else{
            //間違っていれば
            $(".batsu").fadeIn();
        }
        setTimeout(function(){
            //丸、×の画像を非表示
            $(".result_img").fadeOut();
        }, 2000);
        setTimeout(function(){
            //クイズ回答後の解説
            $(".quiz-answerd-description").slideDown();
        }, 3000);
        setTimeout(function(){
            $(".next-button-box").slideDown();
        }, 4000);
        //レベルアップのやつを表示した後に表示されます。 closebutton        
        $(".close-button").on("click", function(){
            quizManager.closePanel(quiz);
            $(".close-button").off('click');
        });
        $(".next-button").on("click", function(){
            quizManager.quizEnd(quiz);
            quizManager.showLevelUpPanel(Player.instance);
            $(".next-button-box").css("display", "none");
            $(".next-button").off('click');
        });
        $(".quiz-choose-button").prop("disabled", true);
        $(".quiz-choose-button").addClass("disabled");
    }
    quizStart(quiz){
        GameManager.instance.gameStop();
        $(".modal").removeClass("hide");
        $(".quiz-card").removeClass("hide");
        quiz.quizElementReset();
        quiz.quizElementSet();
    }

    quizEnd(quiz){
        GameLevelManager.instance.levelUp();
        $(".quiz-card").addClass("hide");
        quiz.quizElementReset();
    }

    showLevelUpPanel(player){
        let value = 0;
        let timeInterval = null;
        if(this.playerLevelUpped){
            $(".level-up-text").removeClass("hide");
            $("#player-lv-now").text(`LV: ${player.playerLevelNow - 1}`);
        }else{
            $(".level-up-text").addClass("hide");
            $("#player-lv-now").text(`LV: ${player.playerLevelNow}`);
        }
        $(".levelup-card").removeClass("hide");
        $(".player-exp-bar").progressbar({
            value: 0,
            change: function(){

            },
            complete: function(){
                clearInterval(timeInterval);
                $("#player-lv-now").text(`LV: ${player.playerLevelNow}`);
                setTimeout(function(){
                    $(".level-up-text").addClass("up");
                }, 300);
                $(".level-up-description ul li").each(function(index, element){
                    setTimeout(function(){
                        $(".level-up-description ul").addClass("box");
                        $(element).slideDown();
                    }, 800 * (index + 1));
                });
            }
        });
        if(this.playerLevelUpped){
            timeInterval = setInterval(function(){
                $(".player-exp-bar").progressbar("value",value);
                value += 1;
            }, 10);
            const levelUpDesc = player.levelUpDescription(player.playerLevels[player.playerLevelNow - 1], player.playerLevels[player.playerLevelNow]);
            for(let i = 0; i < levelUpDesc.length; i++){
                if(levelUpDesc[i].value > 0){
                    $(`<li id='${levelUpDesc[i].id}'>${levelUpDesc[i].name}が<span class='levelup-value'>${Math.round(levelUpDesc[i].value * 10) / 10}</span>上昇しました！</li>`).css("display", "none").appendTo(".level-up-description ul");
                }
            }
        }

        $(".close-button-box").slideDown();
    }
    closePanel(quiz){
        //レベルアップ画面を閉じたとき
        this.playerLevelUpped = false;
        $(".levelup-card").addClass("hide");
        $(".modal").addClass("hide");
        $(".level-up-description ul").removeClass("box");
        $(".close-button-box").css("display", "none");
        $(".level-up-text").removeClass("up");
        GameManager.instance.gameResume();
    }
}