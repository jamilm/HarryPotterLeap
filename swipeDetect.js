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


var controller = Leap.loop({enableGestures: true}, function(frame){
  if(frame.valid && frame.gestures.length > 0){
    frame.gestures.forEach(function(gesture){
        switch (gesture.type){
          case "circle":
              if (gesture.duration > 100000) {
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