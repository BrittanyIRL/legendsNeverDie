/* stuff you can find but isn't really game changing... */
$(document).ready(function(){
	$('#cloudOne').click(function(){
		console.log('cloud one');
	});		


	setInterval(arrowBlink,4000);
});

function arrowBlink(){
   if($('.introSpace').is('.hidden')){
   	console.log('arrow found');
   	$(".arrow").animate({left:'250px', 'bottom': '0'}).fadeOut().animate({left:'250px', 'bottom': '0'}).fadeIn();
   };
}
