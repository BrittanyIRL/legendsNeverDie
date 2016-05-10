// store guided legends here
		var finished = [];

$(document).ready(function(){
	console.log("let's dance");
		var legendImage;


		// store total list, move images from legends to finished after get to heaven
		var legends = ['img/bowie.png', 'img/prince.png', 'img/ian.png', 'img/alan.png'];
		

		//set up game with first legend. To be repeated with outro button 
		$('.introSpace button').click(function(){
			$('.introSpace').addClass('hidden');
			newChar = legends.splice(0,1);
			finished += newChar;
			legendImage = newChar[0].toString();
			console.log(legendImage);
			$('#legend').attr('src', legendImage);
			/// game loop
	    setInterval(function(){
	      detectCharacterMovement();
	    }, 1000/24);
		});

		//rehide outro button
    $('.outro button').click(function(){
			
			$('.outro').addClass('hidden');
			console.log('adding  ' + finished[0] + " to heaven");
			console.log('adding  ' + finished + " to heaven");

			//update the set up dudes to bop in heaven
			updateLegendCollection(legends, character.img);
			//splice the next element in the legends array
			newChar = legends.splice(0,1);
			finished += newChar;
			//convert the object to a string 
			legendImage = newChar[0].toString();
			// swap image 
			$('#legend').attr('src', legendImage);
			$('.gate').removeClass('fadeIn');
			//reset window and page... 
			character.x = 300;
			character.y = 100;
			character.img = legendImage;
			/// game loop
	    setInterval(function(){
	      detectCharacterMovement();
	    }, 1000/24);
		});

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
      img: legendImage

    };
  
    //replace image with DOM
    currentCharacter.setAttribute('src', character.img);

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
    		console.log('reached' + finished);
    		$('.gate').addClass('fadeIn');

    	}
    	if (character.x > 1450){
				$('#legend').removeClass('tiltRight').addClass('hovering');
				$('.outro').show();	
			}
    };

    /// window center follow character 
    // thanks! http://demos.flesler.com/jquery/scrollTo/
    var moveWindow = function(){
  		$('#gameSpace').scrollTo({top:currentY, left:currentX});
    };

    /// update current position on screen
    moveCharacter();


		var updateLegendCollection = function(legends, legend){
			if(legends.indexOf(legend) === -1){
				legends.push(legend);
				console.log('new legend ready to go')
			} else if (legends.indexOf(legend) > -1){
				console.log(legend + "already exists");
			}
		}


});

