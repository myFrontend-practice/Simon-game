var gamePattern = [] ;
var userChosenColor = [] ;
var level = 0 ;
var buttonColor = ["green" , "red" , "yellow" , "blue"] ;
var clickTime = 0 ;

//user click system
function userClickSystem () {

    for (var i = 0 ; i < buttonColor.length ; i++) {
        var color = buttonColor[i] ;
    
        $("." + color).click(function (event) {
            var userSelectColor = event.target.id ;
    
            userChosenColor.push(userSelectColor) ;
            pressAnimation(userSelectColor) ;
            colorSound(userSelectColor) ;

            clickTime++ ;

            //ckeck answer after click 
            if (clickTime > 0) {
                checkAnwser (level) ;
            }
        });
    }
}

//start game
$(document).keypress(function (event) {

    var startKey = event.key ;

    if (level > 0) {
        console.log("game running")
    } else if (startKey === "a") {
        setTimeout(() => {
            nextSequence () ;
        }, 100);
    }

});

//game system
function nextSequence () {
    level++ ;
    clickTime = 0 ;
    //random color
    var randomNumber = Math.floor (Math.random () * 4) ;
    gamePattern.push(randomNumber) ;

    $("h1").text("level " + level) ;

    //showing last random color
    if (gamePattern.length == 1){
        var color = buttonColor[gamePattern[0]] ;
        randomColorAnimation (color) ;
        colorSound (color) ;
    } else if (gamePattern.length == 2) {
        var color = buttonColor[gamePattern[1]] ;
        randomColorAnimation (color) ;
        colorSound (color) ;
    } else {
        var color = buttonColor[gamePattern[gamePattern.length - 1]] ;
        randomColorAnimation (color) ;
        colorSound (color) ;
    }
    //clear user chosen color
    userChosenColor = [] ;
}

function checkAnwser (curentLevel) {
    var checkWrong = [] ;
    var successTime = 0 ;

    for (var i = 0 ; i < userChosenColor.length ; i++){
        var randomColor = buttonColor[gamePattern[i]] ;
        var chosenColor = userChosenColor[i] ;

        if (randomColor == chosenColor) {
            successTime++ ;
        } else {
            checkWrong.push("wrong");
        }
    }

    var found = checkWrong.find((word) => word == "wrong") ;

    if (found == "wrong") {
        gameOver () ;
    } 

    if (level == successTime) {
        setTimeout(() => {
            curentLevel++ ;
            nextSequence () ;
        }, 1000);
    }

}    

//restart when game over
function gameOver () {

    $("h1").text("Game Over , Press Any Key to Restart") ;

    $("body").addClass("game-over") ;
    setTimeout(() => {
        $("body").removeClass("game-over") ;
    }, 200);

    var wrongSound = new Audio ("./sounds/wrong.mp3") ;
    wrongSound.play() ;

    //restart game
    $(document).keypress(function (event) {
        var checkKey = event.originalEvent.isTrusted ;

        if ($("h1").text() == "Game Over , Press Any Key to Restart"){
            if (checkKey == true) {
                level = 0 ;
                if (level == 0) {
                    gamePattern = [] ;
                    nextSequence () ;
                }else {
                    console.log("game running")
                }
            }
        }
    });
}

//button animation
function randomColorAnimation (color) {
    $("." + color).fadeOut(100)
    setTimeout( function () {
        $("." + color).fadeIn(100) ;
    },100);
}

function pressAnimation (color) {
    $("." + color).addClass("pressed") ;
    setTimeout(function () {
        $("." + color).removeClass("pressed") ;
    }, 100);
}

//sound when button got pressed
function colorSound (key) {
    switch (key) {
        case "red":
            var redSound = new Audio ("./sounds/red.mp3") ;
            redSound.play() ;
            break;

        case "blue":
            var blueSound = new Audio ("./sounds/blue.mp3") ;
            blueSound.play() ;
            break;

        case "green":
            var greenSound = new Audio ("./sounds/green.mp3") ;
            greenSound.play() ;
            break;

        case "yellow":
            var yellowSound = new Audio ("./sounds/yellow.mp3") ;
            yellowSound.play() ;
            break;
            
        default:
            console.log("something wrong at colorSound function")
            break;
    }
}

userClickSystem () ;