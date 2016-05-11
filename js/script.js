// store guided legends here
		var finished = [];

$(document).ready(function(){
	console.log("let's dance");
		var legendImage;
		var executed = false;

		// store total list, move images from legends to finished after get to heaven
		var legends = ['img/bowie.png', 'img/prince.png', 'img/ian.png', 'img/alan.png'];
		

		//set up game with first legend. To be repeated with outro button 
		$('.introSpace button').click(function(){
			$('.introSpace').addClass('hidden');
			newChar = legends.shift();
			finished.push(newChar);
			legendImage = newChar;
			console.log(legendImage);
			$('#legend').attr('src', legendImage);
			/// game loop
	    setInterval(function(){
	      detectCharacterMovement();
	    }, 1000/24);
		});

		//rehide outro button
    $('.outro button').click(function(){
			
			$('.outro').hide();
			//console.log('adding  ' + finished + " to heaven");

			//update the set up dudes to bop in heaven
			updateLegendCollection(legends, character.img);
			//splice the next element in the legends array
			newChar = legends.shift();
			finished.push(newChar);
			//convert the object to a string 
			legendImage = newChar;
			// swap image 
			$('#legend').attr('src', legendImage);
			$('.gate').removeClass('fadeIn');
			$('.partyTime0').removeClass('partyTimeFade');
			$('.partyTime1').removeClass('partyTimeFade');

			executed = false;
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
    		// console.log('reached' + finished);
    		$('.gate').addClass('fadeIn');
    	}
    	if (character.x > 1450){
    		if(executed === false){
    			partyInHeaven();
  				console.log('there are ' + finished.length + ' remaining');
    			if( finished.length < legends.length ){
    				$('.outro').slideUp( 300 ).delay( 2000 ).fadeIn( 1000 );	
    			}
    			if (finished.length >= legends.length){
    				$('.gameOver').slideUp( 300 ).delay( 2000 ).fadeIn( 1000 );
    			}
    		}
				$('#legend').removeClass('tiltRight').addClass('hovering');			
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
				console.log('new legend ready to go');
				console.log(finished)
			} else if (legends.indexOf(legend) > -1){
				console.log(legend + "already exists");
			}
		}
//this isn't quite done yet.
		var partyInHeaven = function(){
			executed = true;

			for(var i = 0; i < finished.length - 1; i ++){
				// if(finished.length > 0){
					console.log(finished + "inside party in heaven" + i);
					$('body').append('<div class="partyTimeFade partyTime'+ i +'"><img src="' + finished[i] + '" /></div>');
				//}
			}
		}


});

