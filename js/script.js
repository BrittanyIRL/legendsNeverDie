
$(document).ready(function(){
	console.log('ready');


	setInterval(movelegend, 20);
	var keys = {}

	$(body).keydown(function(e) {
	    keys[e.keyCode] = true;
	});

	$(body).keyup(function(e) {
	    delete keys[e.keyCode];
	});

//http://jsfiddle.net/fbFuW/220/
function movelegend() {
  for (var direction in keys) {
    if (!keys.hasOwnProperty(direction)) continue;
    if (direction == 37) {
        $("#legend").animate({left: "-=5"}, 0);                
    }
    if (direction == 38) {
        $("#legend").animate({top: "-=5"}, 0);  
    }
    if (direction == 39) {
        $("#legend").animate({left: "+=5"}, 0);  
    }
    if (direction == 40) {
        $("#legend").animate({top: "+=5"}, 0);  
    }
  }
}





});