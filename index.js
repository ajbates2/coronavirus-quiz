let question = STORE.questions[STORE.questionNumber];

function updateQuestionNumber() {
    console.log('updateQuestionNumber is working')
    $('.js-questionNumber').text(STORE.questionNumber + 1);
}

function updateQuestion() {
    $('.js-question').text(`${question.question}`);
}

function updateOptions() {
    $('.js-ans1').text(`${question.options[0]}`);
    $('.js-ans2').text(`${question.options[1]}`);
    $('.js-ans3').text(`${question.options[2]}`);
    $('.js-ans4').text(`${question.options[3]}`);
}

function updateScore() {
    $('.js-score').text('score: ' + STORE.score);
}

function generateAnswerValidation() {
    $('.js-container').on('click', 'label', function(event) {
        let targetOption = $(this).text();
        $('label').val(targetOption);
        console.log(targetOption);
        if (question.answer === targetOption) {
           $('.js-validation').text('That is Correct!')
        }
        else if (question.answer !== event.currentTarget) {
            $('.js-validation').text(`That is incorrect. The right answer is ${question.answer}`)
        }
        generateNextQuestionButton();
        updateScore();
    });
}

function generateNextQuestionButton() {
 $('.js-button').html('<button type="button" for="js-questions" id="js-next-question">Next Question</button>')
}

function nextQuestion() {
    $('main').on('submit', '.question-form', function(event) {
        event.preventDefault();
        console.log(this);
    });
}

function handleQuiz() {
    updateOptions();
    updateQuestion();
    updateScore();
    updateQuestionNumber();
    generateAnswerValidation();
    nextQuestion();
}

handleQuiz();