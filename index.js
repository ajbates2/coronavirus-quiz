let questionNumber = 0;
let score = 0;
let question = STORE.questions[questionNumber];

function updateQuestionNumber() {
    $('.js-questionNumber').text(questionNumber + 1);
}

function updateQuestion() {
    $('.js-question').text(`${question.question}`);
}

function updateIndex(item) {
    for(let i = 0; i < item; i++) {
        item = i++;
    }
}

function updateOptions() {
    $('.js-ans1').text(`${question.options[0]}`);
    $('.js-ans2').text(`${question.options[1]}`);
    $('.js-ans3').text(`${question.options[2]}`);
    $('.js-ans4').text(`${question.options[3]}`);
}

function updateScore() {
    $('.js-score').text('score: ' + score);
}

function generateAnswerValidation() {
    $('.js-container').one('click', 'label', function(event) {
        let targetOption = $(this).text();
        $('label').val(targetOption);
        console.log(targetOption);
        if (question.answer === targetOption) {
           $('.js-validation').text('That is Correct!');
           updateIndex(score);
        }
        else if (question.answer !== event.currentTarget) {
            $('.js-validation').text(`That is incorrect. The right answer is ${question.answer}`)
        }
        generateNextQuestionButton();
        updateScore();
    });
}

function generateNextQuestionButton() {
 $('.js-button').html('<button type="submit" for="js-questions" id="js-next-question">Next Question</button>')
}

function nextQuestion() {
    $('main').on('submit', '.question-form', function(event) {
        event.preventDefault();
        console.log(this);
        updateIndex(questionNumber);
        console.log(questionNumber);
    });
};

function handleQuiz() {
    updateOptions();
    updateQuestion();
    updateScore();
    updateQuestionNumber();
    generateAnswerValidation();
    nextQuestion();
}

handleQuiz();