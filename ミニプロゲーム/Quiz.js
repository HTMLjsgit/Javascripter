class Quiz{
    onclickQuiz = false
    constructor(title, description,answerd_description, chooses = [],quiz_image, correct_answer){
        this.title = title;
        this.description = description;
        this.chooses = chooses;
        this.correct_answer = correct_answer;
        this.quiz_image = quiz_image;
        this.answerd_description = answerd_description;
    }

    quizElementSet(){
        $(".quiz-title").text();
        $(".quiz-description").text(this.description);
        $(".quiz-answerd-description p").text(this.answerd_description);
        this.chooses.forEach((x, index) => {
            let quiz_choose_element = $(`
                <button class='quiz-choose-button' data-answer=${index}>
                    ${x}
                </button>`).appendTo(`.quiz-chooses`);
            this.quizOnClick(quiz_choose_element, this);
        });
        $(".quiz-image").prop("src", this.quiz_image)
    }
    quizOnClick(quiz_choose_element, quiz, player){
        $(quiz_choose_element).on("click", function(e){
            $(e.target).addClass("selected");
            QuizManager.instance.quizResult(QuizManager.instance,quiz,quiz.quizAnswerJudge(parseInt(e.target.dataset.answer)));
        });
    }
    quizAnswerJudge(answer){
        if(answer == this.correct_answer){
            return true;
        }else{
            return false;
        }
    }
    quizElementReset(){
        $(".quiz-title").text("");
        $(".quiz-description").text("");
        $(".quiz-chooses").html("");
        $(".quiz-answerd-description p").text("");
        $(".quiz-answerd-description").css("display", "none");
        $(".close-button-box").css("display", "none");
        $(".next-button-box").css("display", "none");
        $(".level-up-description ul").html("")
    }


}
