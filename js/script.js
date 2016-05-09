$(document).ready(function(){
	console.log("let's dance");

	$('.introSpace button').click(function(){
		$('.introSpace').addClass('hidden');
	});
		// store guided legends here
		var finished = [];
    /// store key codes and currently pressed ones
    var keys = {};
        keys.UP = 38;
        keys.LEFT = 37;
        keys.RIGHT = 39;
        keys.DOWN = 40;

    var currentCharacter = document.getElementById("legend");
    /// store reference to character's position and element
    var character = {
      x: 300,
      y: 100,
      speedMultiplier: 8,
      element: currentCharacter,
      img: currentCharacter.getAttribute('src')

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
    };


    /// character control
    var detectCharacterMovement = function(){
      if ( keys[keys.LEFT] ) {
        moveCharacter(-1, 0);
        moveWindow();
      }
      if ( keys[keys.RIGHT] ) {
      	$('#legend').addClass('tiltRight');
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
      else {
      	$('#legend').addClass('hovering');
      }

    };

    var detectGate = function(){
    	if (character.x > 1400){
    		console.log('reached');
    		$('.gate').addClass('fadeIn');
    	}
    	if (character.x > 1450){
    		document.body.onkeydown = function(e){   
				  e.preventDefault();
				}
				$('#legend').removeClass('tiltRight').addClass('hovering');
				
				for (var i=0; i < finished.length; i++){
					if(character.img != finished[i].img){
						finished.push(character);
					}
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

    /// game loop
    setInterval(function(){
      detectCharacterMovement();
    }, 1000/24);



});

