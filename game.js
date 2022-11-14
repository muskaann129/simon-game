buttonColors = ["red" , "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = []; 

let started = false;
let level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){

    let userChosenColour =  $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


// ==================*generating random blinks*==================
function nextSequence(){
    
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);


    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
}


// ==================*Functions*=====================
function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");
    }

    else if(gamePattern[currentLevel] !== userClickedPattern[currentLevel]){
        let gameOver = new Audio("sounds/wrong.mp3");
        gameOver.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },200);
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}