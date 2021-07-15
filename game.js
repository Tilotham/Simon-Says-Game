
var buttonColor = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var userTyped = false;
var level = 0;

function nextSequence(){
  userClickedPattern = [];
  var randomNumber = (Math.round(Math.random()*3));
  var chosenColor = buttonColor[randomNumber];
  gamePattern.push(chosenColor);
  level++;
  $("#level-title").text("Level - "+level);

  $("."+chosenColor).animate({opacity: 0.2}).animate({opacity: 1});
  playSound(chosenColor);
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}

function validation(currentLevel){
  if (gamePattern[currentLevel]==userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    }, 100);
    $("#level-title").css("font-size", "2rem").text("Level Failed");
    setTimeout(function (){
      $("#level-title").css("font-size", "2rem").text("Press Any Key To Restart");
    }, 1000);
    reset();
  }
}

function reset(){
  userTyped = false;
  level = 0;
  gamePattern = [];
}

$(".btn").click(function(event){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  validation(userClickedPattern.length-1);
})

$(document).keypress(function(event){
  if (userTyped==false) {
    nextSequence();
    userTyped = true;
  }
})
