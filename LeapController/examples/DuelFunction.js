var duel = function(myState) {
    
    this.control = Kiwi.Plugins.LEAPController.createController();

    var gestureAllow = true;

    //add event listener for controller
    this.control.leapControl.on('gesture', function(gesture, frame){
      switch (gesture.type){
          case "circle":
            if (gestureAllow) {
                gestureAllow = false;
                myState.stupefy.visible = true;
                myState.stupefyText.visible = true;
                window.setTimeout(function() {
                    myState.stupefy.visible = false;
                    myState.stupefyText.visible = false;
                }, 500);
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
                gestureAllow = false;
                myState.protego.visible = true;
                myState.protegoText.visible = true;
                window.setTimeout(function() {
                    myState.protego.visible = false;
                    myState.protegoText.visible = false;
                }, 500);
                console.log("Swipe Gesture");
                window.setTimeout(function() {gestureAllow = true}, 500);
            }
            break;
        }
    });
}