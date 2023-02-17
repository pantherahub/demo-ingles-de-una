let score_languaje_function = 0;
let score_know_the_difference = 0;
let score_know_the_difference2 = 0;
let score_listening_practice = 0;
let score_listening_practice2 = 0;
let score_guess_sentence = 0;
let score_conjugate_verb = 0;
let score_pronunciation = 0;
let score_choose_correct_answer = 0;



function languaje_function(intent) {
    if(intent){
        score_languaje_function += 50
    }else{
        if(score_languaje_function > 0) score_languaje_function -=50
    }

    sessionStorage.setItem("languajeFunction", score_languaje_function);
}



let intents_know_difference = 0;
let accerts_know_difference = 0;

function do_you_know_the_difference(intent){
    intents_know_difference++;
    if(intent == 'win') accerts_know_difference++;

    score_know_the_difference = (accerts_know_difference * 100) / intents_know_difference;
    sessionStorage.setItem("doYouKnowTheDifference", score_know_the_difference);
}



let intents_know_difference2 = 0;
let accerts_know_difference2 = 0;

function do_you_know_the_difference2(intent){
    intents_know_difference2++;
    if(intent == 'win') accerts_know_difference2++;

    score_know_the_difference2 = (accerts_know_difference2 * 100) / intents_know_difference2;
    sessionStorage.setItem("doYouKnowTheDifference2", score_know_the_difference2);
}



let question_score = []

function listening_practice(score, activity_number){
    let sum_score = 0

    question_score[activity_number] = score;
    question_score.forEach(function(value){
        sum_score += value
    });

    score_listening_practice = sum_score / 3;
    sessionStorage.setItem("listeningPractice", score_listening_practice);
}



let question_score2 = []

function listening_practice2(score, activity_number){
    let sum_score = 0;

    question_score2[activity_number] = score;
    question_score2.forEach(function(value){
        sum_score += value
    });

    score_listening_practice2 = sum_score / 3;
    sessionStorage.setItem("listeningPractice2", score_listening_practice2);
}


let intents_guess_sentence = 0;
let accerts_guess_sentence = 0;

function guess_the_sentence(intent){
    intents_guess_sentence++;
    if(intent == 'win') accerts_guess_sentence++;

    score_guess_sentence = (accerts_guess_sentence * 100) / intents_guess_sentence;

    sessionStorage.setItem("guess_the_sentence", score_guess_sentence);
}


function conjugate_the_verb(scores){
    let sum_score = 0
    scores.forEach(function(value){
        sum_score += value
    });

    score_conjugate_verb = (sum_score * 100) / 16;

    sessionStorage.setItem("conjugate_the_verb", score_conjugate_verb);
}


function true_or_false(score){
    sessionStorage.setItem("true_or false", score);
}


function listening_activity(score){
    let score_total = 0;
   switch (score) {
    case 0:
        score_total = 0;
        break;
    case 1:
        score_total = 25;
        break;

    case 2:
        score_total = 50;
        break;

    case 3:
        score_total = 75;
        break;

    case 4:
        score_total = 100;
        break;
   
    default:
        score_total = 0;
        break;
   }

    sessionStorage.setItem("listening_activity", score_total);
}


function choose_the_correct_sentence(score){
    sessionStorage.setItem("choose_the_correct_sentence", score);
}


function read_and_answer(score){
    sessionStorage.setItem("read_and_answer", score);
}


let intents_pronunciation = 0;
let accerts_pronunciation = 0;

function pronunciation(intent){
    intents_pronunciation++;
    if(intent == 'win') accerts_pronunciation++;

    score_pronunciation = (accerts_pronunciation * 100) / intents_pronunciation;

    sessionStorage.setItem("pronunciation", score_pronunciation);
}


let intents_choose_correct_answer = 0;
let accerts_choose_correct_answer = 0;

function choose_the_correct_answer(intent){
    intents_choose_correct_answer++;
    if(intent == 'win') accerts_choose_correct_answer++;

    score_choose_correct_answer = (accerts_choose_correct_answer * 100) / intents_choose_correct_answer;

    sessionStorage.setItem("choose_the_correct_answer", score_choose_correct_answer);
}
