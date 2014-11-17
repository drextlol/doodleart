var urlGet;

$("#zoom_02").elevateZoom({
	tint:true,
	tintColour:'#4A4A4A',
	tintOpacity:0.5,
	borderSize: 1,
	borderColour: '#000',
	zoomWindowWidth: 342,
	zoomWindowHeight: 483
});

$(document).ready(function () {
	var urlGet = $(".valhidden").val();
	window.parent.history.pushState("Red Bull Doodle Art", "Red Bull Doodle Art", urlGet);

	$(".btn-compart").click(function(e){
		e.preventDefault();
		if($(".btn-compart").hasClass("active")){
			$(this).removeClass("active");
			$(".addthis").css("display","none");
		}else{
			$(this).addClass("active");
			$(".addthis").css("display","block");
		}
	});

	$(".share").mouseleave(function(e){
		e.preventDefault();
		$(".btn-compart").removeClass("active");
		$(".addthis").css("display","none");
	});


	var current = $('.prev').attr('href').substring($('.prev').attr('href').lastIndexOf("/") + 1);
	console.log('current : ' + current);

	var doodleurl = $('.prev').attr('href').substring(0, $('.prev').attr('href').lastIndexOf("/") + 1);
	console.log('doodleurl : ' + doodleurl);

	var array = localStorage.getItem("order").split(',');
	console.log('array : ' + array);

	var index = array.indexOf(current);
	console.log('index: ' + index + ' - prev: ' + array[index - 1] + ' - next: ' + array[index + 1]);

	if (array[index - 1] != undefined) {
	    $('.prev').show();
	    $('.prev').attr('href', doodleurl + array[index - 1]);
	}
	else
	    $('.prev').hide();


	if (array[index + 1] != undefined) {
	    $('.next').show();
	    $('.next').attr('href', doodleurl + array[index + 1]);
	}
	else
	    $('.next').hide();

	console.log('prev: ' + $('.prev').attr('href'));
	console.log('next: ' + $('.next').attr('href'));

});