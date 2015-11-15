//swipe detect js
	function concatData(id, data) {
		return id + ": " + data + "<br>";
	}
	function getFingerName(fingerType) {
	  switch(fingerType) {
        case 0:
          return 'Thumb';
        break;
    
        case 1:
          return 'Index';
        break;
    
        case 2:
          return 'Middle';
        break;
    
        case 3:
          return 'Ring';
        break;
    
        case 4:
          return 'Pinky';
        break;
      }
    }
    
    function concatJointPosition(id, position) {
      return id + ": " + position[0] + ", " + position[1] + ", " + position[2] + "<br>";
    }

	var output = document.getElementById('output');
	var frameString = "", handString = "", fingerString = "";
	var hand, finger;

	var options = {enableGestures: true};


var wandSwipeReset = true;
var wandPokeReset = true;
var caseClosed = true;
var factor = 2.0;

function pokeReset() {
  wandPokeReset = true;
}
function swipeReset() {
  wandSwipeReset = true;
}

function swipeWand() {
  if (wandPokeReset && wandSwipeReset) {
    wandSwipeReset = false;
    $("#wand").animate({left: '50em'}, 100,
      function(){$("#wand").animate({left: '0px'}, 100,
        function(){swipeReset()})});
  }
};

function pokeWand() {
  var wand = $("#wand");
  if (wandPokeReset && wandSwipeReset) {
    wandPokeReset = false;
    wand.animate({width: wand.width() / factor, height: wand.height() / factor}, 100,
      function(){wand.animate({width: 460, height: 276}, 100,
        function(){pokeReset()})});
  }
}

var dtime;
var controller = Leap.loop({enableGestures: true}, function(frame){
              dtime = Date.now() - time;
                          if (attack == true && dtime > 2000) {
              document.getElementById("demo").innerHTML = "Fuck you scrub";
              attack = false;
              }
  if(frame.valid && frame.gestures.length > 0){
    frame.gestures.forEach(function(gesture){

        switch (gesture.type){
          case "circle":
              if (caseClosed) {
                caseClosed = false;
                pokeWand();
                $(".stupefy").show(100, function(){$(this).hide("slow",
                  function(){caseClosed = true})});
              }
              break;
          case "keyTap":
              console.log("Key Tap Gesture");
              break;
          case "screenTap":
              console.log("Screen Tap Gesture");
              break;
          case "swipe":
          if (caseClosed) {
            if (attack == true && dtime < 2000) {
              document.getElementById("demo").innerHTML = "Blocked bitch";
              attack = false;
            }
                caseClosed = false;
                swipeWand();
                $(".protego").show(100, function(){$(this).hide("slow", 
                  function(){caseClosed = true})});

              }
              break;

            

        }

        setTimeout(function(){
  			output.innerHTML = "";
		}, 400); 
    });
  }
});
var time; 
var attack;
function attackFunction() {
  startTimer(2, $('#time'));
  time = Date.now();
  attack = true
    // document.getElementById("demo").innerHTML = time;
    //alert("Fuck you Erica");
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        seconds = parseInt(timer);
        display.text(seconds);
        if (--timer < 0) {
            display.text("");;
        }
    }, 1000);
}


