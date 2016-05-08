$(document).ready(function(){
	console.log('hey world');
    /// store key codes and currently pressed ones
    var keys = {};
        keys.UP = 38;
        keys.LEFT = 37;
        keys.RIGHT = 39;
        keys.DOWN = 40;

    /// store reference to character's position and element
    var character = {
      x: 100,
      y: 100,
      speedMultiplier: 2,
      element: document.getElementById("legend")
    };

    /// key detection (better to use addEventListener, but this will do)
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

    /// character movement update
    var moveCharacter = function(dx, dy){
      character.x += (dx||0) * character.speedMultiplier;
      character.y += (dy||0) * character.speedMultiplier;
      character.element.style.left = character.x + 'px';
      character.element.style.top = character.y + 'px';
    };

    /// character control
    var detectCharacterMovement = function(){
      if ( keys[keys.LEFT] ) {
        moveCharacter(-1, 0);
      }
      if ( keys[keys.RIGHT] ) {
        moveCharacter(1, 0);
      }
      if ( keys[keys.UP] ) {
        moveCharacter(0, -1);
      }
      if ( keys[keys.DOWN] ) {
        moveCharacter(0, 1);
      }
    };

    /// update current position on screen
    moveCharacter();

    /// game loop
    setInterval(function(){
      detectCharacterMovement();
    }, 1000/24);


});

