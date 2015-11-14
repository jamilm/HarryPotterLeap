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

var controller = Leap.loop({enableGestures: true}, function(frame){
  if(frame.valid && frame.gestures.length > 0){
    frame.gestures.forEach(function(gesture){
        switch (gesture.type){
          case "circle":
              if (gesture.duration > 100000) {
                pokeWand();
                $(".stupefy").show(100, function(){$(this).hide("slow")});
              }
              break;
          case "keyTap":
              console.log("Key Tap Gesture");
              break;
          case "screenTap":
              console.log("Screen Tap Gesture");
              break;
          case "swipe":
          if (gesture.duration > 100000) {
                swipeWand();
                $(".protego").show(100, function(){$(this).hide("slow")});
              }
              break;
        }

        setTimeout(function(){
  			output.innerHTML = "";
		}, 400); 
    });
  }
});