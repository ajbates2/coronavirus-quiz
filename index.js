let questionIndex = 0;
let score = 0;

function showQuestion(questionIndex) {
    $('#js-questions').html(`
    <h2 class="question js-question">${STORE.questions[questionIndex].question}</h2>
    <fieldset class="container js-container">
        <input type="radio" name="options" id="ans1" value="0" required>
            <label for="ans1">${STORE.questions[questionIndex].options[0]}</label>
            <br>
        <input type="radio" name="options" id="ans2" value="1">
            <label for="ans2">${STORE.questions[questionIndex].options[1]}</label>
            <br>
        <input type="radio" name="options" id="ans3" value="2">
            <label for="ans3">${STORE.questions[questionIndex].options[2]}</label>
            <br>
        <input type="radio" name="options" id="ans4" value="3">
            <label for="ans4">${STORE.questions[questionIndex].options[3]}</label>
    </fieldset>
    <p class="score">score: <span id="js-score">${score}</span></p>
    <p class="js-validation"></p>
    <div class="button-list">
        <p id="button"><button type="submit" for="js-questions" id="js-submit">Submit</button></p>
        <p id="js-next-question"><button type="button" id="next-question">Next Question</button></p>
    </div>`)
}

function updateQuestionNumber() {
    $('.js-questionNumber').text(questionIndex + 1);
}


function updateNextQuestion() {
    $('#js-next-question').on('click', '#next-question', function(event) {
        console.log(this);
        questionIndex++;
        console.log(questionIndex);       
        showQuestion(questionIndex);
        updateQuestionNumber();
    })
}

function updateScore() {
    $('#js-score').text(score);
}

function generateAnswerValidation() {
    $('#js-questions').on('submit', function(event) {
        event.preventDefault();
        let answerValidation = STORE.questions[questionIndex];
        let targetOption = $("input[name='options']:checked").val()
        if (answerValidation.answer == targetOption) {
           $('.js-validation').text('That is Correct!');
           score++;
        }
        else {
            $('.js-validation').text(`That is incorrect. The right answer is 
            ${answerValidation.options[answerValidation.answer]}`);
            console.log(answerValidation.options[answerValidation.answer])
        }
        updateNextQuestion();
        renderResults();
    });
}

function showResults() {
    $('body').html(`
    <header>
        <h1>Results</h1>
    </header>
    <main>
        <section>
            <h2 id="result-conditional"></h2>
                <p class="final-score">${score}/10</p>
        </section>  
        <button onclick="document.location = 'index.html'">Restart Quiz</button>
        <aside class="final-aside">In all seriousness, PLEASE stay home, wash your hands
             for at least 20 seconds multiple times a day, avoid touching
            your face (even though it’s very difficult), and we might be 
            able to keep our loved ones safe.
        </aside> 
    </main>`)
}

function resultConditional() {
    $('#result-conditional').html(function() {
        if (score >= 7) {
            return (`You passed! You were able to decipher 
            the difference between real life and Resident Evil!`)
        }
        else {
            return (`You should research COVID-19 a little more.
             We are not living in an Umbrella Corp run society.
              Raccoon city isn’t real. The T-Virus has ‘not’ been created yet.
               Zombie alligators are (hopefully) not patrolling the sewers.`)
        }
    })
}

function renderResults() {
    $('body').on('click', '#next-question', function(event) {
        if (questionIndex === STORE.questions.length) {
            showResults();
            resultConditional();
        }
        else {
            showQuestion();
        }
    });
}

function handleQuiz() {
    updateScore();
    updateQuestionNumber();
    generateAnswerValidation(questionIndex);
    showQuestion(questionIndex);
}

$(handleQuiz);