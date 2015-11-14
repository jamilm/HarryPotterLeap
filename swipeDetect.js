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

	/*Leap.loop(options, function(frame) {
		frameString = concatData("frame_id", frame.id);
		frameString += concatData("num_hands", frame.hands.length);
		frameString += concatData("num_fingers", frame.fingers.length);
		frameString += "<br>";

		for (var i = 0, len = frame.hands.length; i < len; i++) {
			hand = frame.hands[i];
			handString = concatData("hand_type", hand.type);
			handString += concatData("pinch_string", hand.pinchStrength);
			handString += concatData("grab_strength", hand.grabStrength);
			fingerString = concatJointPosition("finger_thumb_dip", hand.thumb.dipPosition);
			for (var j = 0, len2 = hand.fingers.length; j < len2; j++) {
				finger = hand.fingers[j];
				fingerString += concatData("finger_type", finger.type) + " (" + getFingerName(finger.type) + ")"
				fingerString += concatJointPosition("finger_dip", finger.dipPosition);
				fingerString += concatJointPosition("finger_pip", finger.pipPosition);
				fingerString += concatJointPosition("finger_mcp", finger.mcpPosition);
				fingerString += "<br>";

			}
			frameString += handString;
			frameString += fingerString;
		}
		output.innerHTML = frameString;
	});*/

var controller = Leap.loop({enableGestures: true}, function(frame){
  if(frame.valid && frame.gestures.length > 0){
    frame.gestures.forEach(function(gesture){
        switch (gesture.type){
          case "circle":
              output.innerHTML = "STUPEFY";
              console.log("Circle Gesture");
              $(".flash").show(100);
              $(".flash").hide("slow", function(){ $(this).remove(); })
              break;
          case "keyTap":
              console.log("Key Tap Gesture");
              break;
          case "screenTap":
              console.log("Screen Tap Gesture");
              break;
          case "swipe":
              output.innerHTML = "Block Bitch";
              break;
        }

        setTimeout(function(){
  			output.innerHTML = "";
		}, 400); 
    });
  }
});