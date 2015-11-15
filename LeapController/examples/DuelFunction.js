var duel = function(myState) {

    this.control = Kiwi.Plugins.LEAPController.createController();

    var gestureAllow = true;

    //add event listener for controller
    this.control.leapControl.on('gesture', function(gesture, frame){
        switch (gesture.type){
        
            case "circle":
                if (gestureAllow) {
                    gestureAllow = false;
                    castSpell(myState.stupefy, myState.stupefyText);
                    console.log("Circle Gesture");
                    window.setTimeout(function() {gestureAllow = true}, 500);
                }
                break;
        
            case "keyTap":
                console.log("Key Tap Gesture");
            break;
        
            case "screenTap":
                console.log("Screen Tap Gesture");
            break;
        
            case "swipe":

                if (gestureAllow) {
alert("Sd");
                    gestureAllow = false;
                    castSpell(myState.protego, myState.protegoText);
                    console.log("Swipe Gesture");
                    window.setTimeout(function() {gestureAllow = true}, 500);
                }
            break;
        }
    });
}


var castSpell = function(gesture, guestureText) {
	
    gesture.visible = true;
    gestureText.visible = true;
    window.setTimeout(function() {
        gesture.visible = false;
        gestureText.visible = false;
    }, 500);
}

var time; 
var attack;
function attackFunction() {
  time = Date.now();
  attack = true
    //document.getElementById("demo").innerHTML = time;
    alert("Fuck you Erica");
}