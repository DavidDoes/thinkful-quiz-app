"use strict";

// variables to store data
let questionNum = 0;
let score = 0;

// storing questions template
function template() {
    return `
	<form>
	  <fieldset>
        <legend>${STORE[questionNum].question}</legend>
		<label class="answerOption">
		  <input name="answerRadio" type="radio" value="0" required>
		  <span>${STORE[questionNum].answers[0]}</span>
		</label>
		<label class="answerOption">
		  <input name="answerRadio" type="radio" value="1" required>
		  <span>${STORE[questionNum].answers[1]}</span>
		</label>
		<label class="answerOption">
		  <input name="answerRadio" type="radio" value="2" required>
		  <span>${STORE[questionNum].answers[2]}</span>
		</label>
		<label class="answerOption">
		  <input name="answerRadio" type="radio" value="3" required>
		  <span>${STORE[questionNum].answers[3]}</span>
		</label>
	  </fieldset>
	  <fieldset class="twoButtons">
		  <input type="submit" value="Submit" class="js-submitButton twoButtons actionButtons"></input>
		  <input type="reset" value="Start Over" class="js-restartButton twoButtons actionButtons">
      </input>
	  </fieldset>
	</form>
	`
}

function startButtonHandler() {
    $('.start').on('click', '.js-startButton', function(event) {
        startButton(event);
    });
}

//start button
function startButton(event) {
    event.preventDefault();
    $('form').html(template()); //telling where to put this HTML, and what variable to pull data from
    $('.start').remove();
    $('.questionsAnswersForm').css('display', 'block');
    $('.questionNumber').text(questionNum + 1);
    //in #start div, click on class .js-startButton, do following:
    //remove #start class div
    //unhide .questionsAnswersForm div
    //increment inner text of .questionNumber with questionNum's current value + 1
}

function submitButtonHandler() {
    $('main').on('submit', 'form', function(event) {
        submitButton(event);
    })
}

//check user answer
//grab value of user's selected answer
//compare to correctAnswer of STORE[]
//return... true or false?
function submitButton(event) {
    event.preventDefault(); //prevent form submission
    //check user answer
    let chosen = $('input:checked').val(); //get value of checked input
    let correctAnswer = STORE[questionNum].correctAnswer; //variable to store correct answer from STORE
    let correctIndex = STORE[questionNum].correctAnswer; //variable to store correct answer's index - used in line 66
    if (Number(chosen) === correctIndex) { //if correct:
        score++; //increment score
        $('.questionsAnswersForm').html(`<div class="feedback"><h2>Correct - Good job!</h2><br><button type=button class="js-nextButton actionButtons">Next</button></div>`);
        $('.score').html('Score: ' + score.toString()); //convert to string
    } else { //if incorrect
        $('.questionsAnswersForm').html(`<div class="feedback"><h2>Sorry!</h2><br><p>The correct answer is:<br> <span><blockquote><em>"${STORE[questionNum].answers[correctAnswer]}"</em></blockquote></span></p><button type=button class="js-nextButton actionButtons">Next</button></div>`);
    }
}

//next question handler
function nextButtonHandler() {
    $('main').on('click', '.js-nextButton', function(event) {
        nextButton(event);
    })
}

function nextButton(event) {
    console.log('next button clicked');
    if (questionNum === 9) {
        console.log('should be running if statement')
        results(score);
    } else {
        questionNum++; //increment questionNum displayed
        $('.questionsAnswersForm').html(template());
        $('.questionNumber').text(questionNum + 1);
    }
}

//reset binder
function resetButtonHandler(event) {
    $('main').on('reset', function(event) {
        resetButton(event);
    })
}

//reset button
//clear questionNum
//clear Score
//start from beginning
function resetButton(event) {
    console.log('reset clicked');
    questionNum = 0;
      $('.score').text(`Score: ${score = 0}`);

    $('h2').remove();
    $('.questionNumber').text(questionNum + 1);
    startButton(event);
    // could use this to reload entire page, and not need rest; depends on needs:
    // location.reload();
}

function results(score) {
    if (score >= 9) {
        $('.questionsAnswersForm').html(`
			<form>
			<div class="feedback"><h2>You answered ${score}/10 questions correctly!</h2>
			<br>
			<p>Good job! You could be trusted around a roaster machine, and probably make some decent coffee.</p>
			<fieldset class="twoButtons">
			<input type="reset" value="Start Over" class="js-restartButton twoButtons actionButtons"></input>
			</fieldset>
			</form>
	`);
    } else if (score < 9 && score >= 5) {
        $('.questionsAnswersForm').html(`
			<form>
			<div class="feedback"><h2>You answered ${score}/10 questions correctly!</h2>
			<br>
			<p>Not bad. You've got some learning to do, though. Keep practicing, and you'll get there!</p>
			<fieldset class="twoButtons">
			<input type="reset" value="Start Over" class="js-restartButton twoButtons actionButtons"></input>
			</fieldset>
			</form>
	`);
    } else if (score < 5 && score >= 1) {
        $('.questionsAnswersForm').html(`
			<form>
			<div class="feedback"><h2>You answered ${score}/10 questions correctly!</h2>
			<br>
			<p>Sorry. You're going to have to stick to just packaging coffee, or cleaning the restrooms...</p>
			<fieldset class="twoButtons">
			<input type="reset" value="Start Over" class="js-restartButton twoButtons actionButtons"></input>
			</fieldset>
			</form>
	`);
    } else {
        $('.questionsAnswersForm').html(`
			<form>
			<div class="feedback"><h2>You answered ${score}/10 questions correctly!</h2>
			<br>
			<p>No... Nope... Please leave.</p>
			<fieldset class="twoButtons">
			<input type="reset" value="Start Over" class="js-restartButton twoButtons actionButtons"></input>
			</fieldset>
			</form>
	`);
    }
}

//call handlers
$(initQuiz);

//master call function (binding to DOM?)
function initQuiz() {
    startButtonHandler();
    submitButtonHandler();
    nextButtonHandler();
    resetButtonHandler();
}
