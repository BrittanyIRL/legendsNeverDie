$(document).ready(function(){
	console.log("let's dance");
    /// store key codes and currently pressed ones
    var keys = {};
        keys.UP = 38;
        keys.LEFT = 37;
        keys.RIGHT = 39;
        keys.DOWN = 40;

    /// store reference to character's position and element
    var character = {
      x: 300,
      y: 100,
      speedMultiplier: 8,
      element: document.getElementById("legend")
    };

    /// key detection (better to use addEventListener, but this will do)
    // onkeyup prevents continual motion
    document.body.onkeyup = 
    document.body.onkeydown = function(e){
      if (e.preventDefault) { 
        e.preventDefault();
      }
      else {
        e.returnValue = false; 
      }
      var kc = e.keyCode || e.which;
      keys[kc] = e.type == 'keydown';
    };

    var currentX, currentY; 

    /// character movement update
    var moveCharacter = function(dx, dy){
      character.x += (dx||0) * character.speedMultiplier;
      character.y += (dy||0) * character.speedMultiplier;
      currentX = character.x + 'px';
      currentY = character.y + 'px';
      character.element.style.left = currentX;
      character.element.style.top = currentY;
      console.log(currentX + currentY);

    };


    /// character control
    var detectCharacterMovement = function(){
      if ( keys[keys.LEFT] ) {
        // moveCharacter(-1, 0);
        // moveWindow();
        console.log("you can't go back");
      }
      if ( keys[keys.RIGHT] ) {
        moveCharacter(1, 0);
        moveWindow();
        detectGate();
      }
      if ( keys[keys.UP] ) {
        moveCharacter(0, -1);
        moveWindow();

      }
      if ( keys[keys.DOWN] ) {
        moveCharacter(0, 1);
        moveWindow();
      }

    };

    var detectGate = function(){
    	if (character.x > 1400){
    		console.log('reached');
    		}
    	if (character.x > 1500){
    		document.body.onkeydown = function(e){   
				  e.preventDefault();
				}
    	}
    };

    /// window center follow character 
    // thanks! http://demos.flesler.com/jquery/scrollTo/
    var moveWindow = function(){
  		$('#gameSpace').scrollTo({top:currentY, left:currentX});
    };

    /// update current position on screen
    moveCharacter();
    //moveWindow();
    




		
    /// game loop
    setInterval(function(){
      detectCharacterMovement();
    }, 1000/24);


});

