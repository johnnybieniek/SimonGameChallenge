gamePattern = [];
userClickedPattern = [];

var best = 0;

var level = 0;
var started = false;

buttonColors = ["red", "blue", "green", "yellow"];

$(document).keydown(function (event) {
  if (!started) {
    started = true;
    nextSequence();
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level += 1;
  var h1Text = "level " + level;
  $("h1").text(h1Text);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  var btnId = "#" + randomChosenColor;

  $(btnId).fadeOut(100).fadeIn(100);

  playSound(buttonColors[randomNumber]);
}

function playSound(name) {
  var audioURL = "sounds/" + name + ".mp3";
  var audio = new Audio(audioURL);
  audio.play();
}

function animatePress(currentColor) {
  var id = "#" + currentColor;
  var currentBtn = $(id);

  currentBtn.addClass("pressed");
  setTimeout(function () {
    currentBtn.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("correct!");
    if (best < currentLevel + 1) {
      best = currentLevel + 1;
    }

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrongURL = "sounds/wrong.mp3";
    var audio = new Audio(wrongURL);
    audio.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    var newText = "Highest score: " + best;
    $("h3").text(newText);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
