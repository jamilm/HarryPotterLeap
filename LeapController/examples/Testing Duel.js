var myGame = new Kiwi.Game("testGameContainer","testGame",myState,{plugins:["LEAPController"]});

var myState = new Kiwi.State('myState');
var loadingState = new Kiwi.State('loadingState');
var preloader = new Kiwi.State('preloader');

myState.preload = function(){
	Kiwi.State.prototype.preload.call(this);
    this.addImage('background', 'duelTable.jpg');
}

myState.create = function(){
    this.player1 = new Player(this,300,300);
    this.addChild(this.player1);

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.background, 0, 0);
    this.addChild(this.background);

    //add spell sprites
    this.protego = new Kiwi.GameObjects.Sprite(this, this.textures.protego, 0, 0);
    this.protegoText = new Kiwi.GameObjects.Sprite(this, this.textures.protegoText, 0, 0);
    this.stupefy = new Kiwi.GameObjects.Sprite(this, this.textures.stupefy, 0, 0);
    this.stupefyText = new Kiwi.GameObjects.Sprite(this, this.textures.stupefyText, 0, 0);

    this.protego.visible = false;
    this.protegoText.visible = false;
    this.stupefy.visible = false;
    this.stupefyText.visible = false;

    this.addChild(this.protego);
    this.addChild(this.protegoText);
    this.addChild(this.stupefy);
    this.addChild(this.stupefyText);

    this.finger2 = new Finger(this,300,300);
    this.addChild(this.finger2);
    

    this.control = Kiwi.Plugins.LEAPController.createController();

    var gestureAllow = true;

    //add event listener for controller

    var server = require('http').createServer();
    var io = require('socket.io')(server);
    io.on('connection', function(socket){
      socket.on('event', function(data){});
      socket.on('disconnect', function(){});
    });

    server.listen();
    io.on('connection', function(socket){
        

        var castSpell(spell) {
            socket.to('others').emit('spell', { spell: spell });
        }

        this.control.leapControl.on('gesture', function(gesture, frame){

            var socket = io();

            var sendAttack(spell) {
                socket.emit('chat message', $('#m').val());
                $('#m').val('');
                return false;
            }

            socket.on('spell', function(gesture.type){
                $('#messages').;
            });


            

          switch (gesture.type){
              case "circle":
                if (gestureAllow) {
                    gestureAllow = false;
                    myState.stupefy.visible = true;
                    myState.stupefyText.visible = true;

                    socket.broadcast.emit('spell', {});d

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
    });
}


myState.update = function(){


	Kiwi.State.prototype.update.call(this);


    this.finger2.x = (this.control.hands[0].pointables[1].tipX* 1.7) + 400;
    this.finger2.y =((-1 * this.control.hands[0].pointables[1].tipY)*1.7) + 600;

    this.finger2.scaleX = (this.control.hands[0].pointables[0].touchDistance + 1) / 2;
    this.finger2.scaleY = (this.control.hands[0].pointables[0].touchDistance + 1) / 2;
   
}
var Player = function (state, x, y){
    Kiwi.GameObjects.Sprite.call(this, state, state.textures['player'], x, y);

    this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));
    Player.prototype.update = function(){
        Kiwi.GameObjects.Sprite.prototype.update.call(this);
        this.physics.update();

    }
}
Kiwi.extend(Player,Kiwi.GameObjects.Sprite);


var Finger = function (state, x, y){
    Kiwi.GameObjects.Sprite.call(this, state, state.textures['finger'], x, y);

    this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));
    Finger.prototype.update = function(){
        Kiwi.GameObjects.Sprite.prototype.update.call(this);
        this.physics.update();

    }
}
Kiwi.extend(Finger,Kiwi.GameObjects.Sprite);
//////////////////////////////////////////////////////
//s
function protego() {
    myState.protego.visible = false;
    myState.protegoText.visible = false;
};

function stupefy() {
    myState.stupefy.visible = false;
    myState.stupefyText.visible = false;
};

//////////////////////////////////////////////////////
//LOADING ASSETS
preloader.preload = function(){
    Kiwi.State.prototype.preload.call(this);
    this.addImage('loadingImage', 'assets/loadingImage.png', true);
}
preloader.create = function(){
    Kiwi.State.prototype.create.call(this);
    //this.game.stage.resize(800, 800);
    this.game.states.switchState('loadingState');

}

loadingState.preload = function(){
    Kiwi.State.prototype.preload.call(this);
    this.game.states.rebuildLibraries();
    this.game.stage.color = '#E0EDF1';
    this.logo = new Kiwi.GameObjects.StaticImage(this, this.textures['loadingImage'], 150, 50);
    
    this.addChild(this.logo);

    this.logo.alpha = 0;
    this.tweenIn = new Kiwi.Animations.Tween;
    this.tweenIn = this.game.tweens.create(this.logo);
    this.tweenIn.to({ alpha: 1 }, 1000, Kiwi.Animations.Tweens.Easing.Linear.None, false);
    this.tweenIn.start();


    ////////////////
    //ASSETS TO LOAD
    this.addImage('finger', 'assets/wandPointingForward.png');
    this.addImage('background', 'assets/duelTable.jpg');
    this.addImage('protego', 'assets/protego.png');
    this.addImage('protegoText', 'assets/protegoText.png');
    this.addImage('stupefy', 'assets/stupefy.png');
    this.addImage('stupefyText', 'assets/stupefyText.png');
    //this.addImage('player', 'assets/wandPointingForward.png');
}
loadingState.update = function(){
    Kiwi.State.prototype.update.call(this);
}


loadingState.create = function(){
    Kiwi.State.prototype.create.call(this);
    console.log("inside create of loadingState");
    this.tweenOut = this.game.tweens.create(this.logo);
    this.tweenOut.to({alpha: 0}, 1000, Kiwi.Animations.Tweens.Easing.Linear.None, false);
    this.tweenOut.onComplete(this.switchToMain, this);
    this.tweenOut.start();

}
loadingState.switchToMain = function(){
    this.game.states.switchState('myState');
}


myGame.states.addState(myState);
myGame.states.addState(loadingState);
myGame.states.addState(preloader);
myGame.states.switchState('preloader');