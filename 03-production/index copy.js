'use strict';

// variables to store data
let questionNum = 0;
let score = 0;

// storing questions template
function template() {
    return `
	<h2>${STORE[questionNum].question}</h2>
	<form>
	  <fieldset role="group">
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
		<input role="submit" type="submit" value="Submit" class="js-submitButton twoButtons actionButtons"></input>
		<input role="reset" type="reset" value="Start Over" class="js-restartButton twoButtons actionButtons"></input>
	  </fieldset>
	</form>
	`
}

function startButtonHandler() {
    $('.start').on('click', '.js-startButton', function(event) {
        startButton();
    });
}

//start button
function startButton() {
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
        submitButton();
    })
}

//check user answer
//grab value of user's selected answer
//compare to correctAnswer of STORE[]
//return... true or false?
function submitButton() {
    event.preventDefault(); //prevent form submission
    //check user answer
    let chosen = $('input:checked').val(); //get value of checked input
    let correctAnswer = STORE[questionNum].correctAnswer; //variable to store correct answer from STORE
    let correctIndex = STORE[questionNum].correctAnswer; //variable to store correct answer's index - used in line 66
    if (Number(chosen) === correctIndex) { //if correct:
        score++; //increment score
        $('.questionsAnswersForm').html(`<div class="feedback"><h2>Correct - Good job!</h2><br><button type=button class="js-nextButton">Next</button></div>`);
        $('.score').html('Score: ' + score.toString()); //convert to string
    } else { //if incorrect
        $('.questionsAnswersForm').html(`<div class="feedback"><h2>Sorry!</h2><br><p>The correct answer is:<br> <span><blockquote><em>"${STORE[questionNum].answers[correctAnswer]}"</em></blockquote></span></p><button type=button class="js-nextButton">Next</button></div>`);
    }
}

//next question handler
function nextButtonHandler() {
    $('main').on('click', '.js-nextButton', function(event) {
        nextButton();
    })
}

//next question button
function nextButton() {
    console.log('Next button clicked');
    //iterate to next question in STORE
    questionNum++; //increment questionNum displayed
    $('.questionsAnswersForm').html(template());
    $('.questionNumber').text(questionNum + 1);
}


// function nextButton() {
//     $('main').on('click', '.js-nextButton', function(event) {
//         console.log('next button clicked');
//         if (questionNum === 10) {
//             results(score);
//         } else {
//             questionNum++; //increment questionNum displayed
//             $('.questionsAnswersForm').html(template());
//             $('.questionNumber').text(questionNum + 1);
//         }
//     })
// }

//reset binder
function resetButtonHandler() {
    $('main').on('reset', function(event) {
        resetButton();
    })
}

//reset button
//clear questionNum
//clear Score
//start from beginning
function resetButton() {
    console.log('reset clicked');
    // location.reload(); //built-in method that reloads at current url
    questionNum = 0;
	$('.score').text(score = 0);
    $('h2').remove();
    startButton();
}

//results page
//do not increment score
//do not increment questionNum
//when on last array item, go to results page (else statement in nextButton?)
function results() {
	
}

//



//========
//TO DO:
// - results page (if statement inside nextButton)
// CSS
// mobile view - score and progress not displaying
// function giving feedback based on score results


//call handlers
$(initQuiz);

//master call function (binding to DOM?)
function initQuiz() {
    startButtonHandler();
    submitButtonHandler();
    nextButtonHandler();
    resetButtonHandler();
}
