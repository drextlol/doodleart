$(document).ready(function () {

	/* Anchor animate */
	$(function() {
	  $('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return false;
	      }
	    }
	  });
	});
	/* Fim anchor animate */

	if($(".regulamento").length != 0){
		$("body").addClass("page-regulamento");
		$(".regulamento").prepend("<span class='bg-left'></span><span class='bg-right'></span>");
	}
});

var direcional = 0;
var frames = 23;
var frameWidth = 220;
var currentFrame = 0;
var time;

function arabesco(){
	$(".arabesco.right").css({"background-position": "-" + direcional + "px 0px", "opacity":"1"});
	$(".arabesco.left").css({"background-position": "-" + direcional + "px -60px", "opacity":"1"});

	direcional += frameWidth;

	if(currentFrame < frames){
		currentFrame++;
		setTimeout(arabesco, 40);
	}
}

var isExecuted = false;
$(document).scroll(function () {

	//console.log($(this).scrollTop());
	if($(this).scrollTop() >= 100 && !isExecuted){
		arabesco();
		isExecuted = true;
	}

	if($(document).scrollTop() >= 456){
		$(".ico05").addClass("animate");
		$(".ico06").addClass("animate");
		$(".ico07").addClass("animate");
	}

	if($(document).scrollTop() >= 1305){
		$(".arrow-left-bottom").addClass("animate");
		$(".arrow-right-bottom").addClass("animate");
	}

	if($(document).scrollTop() >= 1355){
		$(".rabiscos").addClass("show");
	}

	if($(document).scrollTop() >= 2575){
		$(".circulos li").addClass("animate");
		$(".latas li").addClass("animate");
		$(".gotas li").addClass("animate");
	}

	if($(document).scrollTop() >= 3286){
		$(".ico08").addClass("animate");
	}

	if ($(".ico14").hasClass("animate") == false) {
	    if ($(document).scrollTop() >= 4300) {
	        $(".ico14").css("background", "url('themes/landing/css/images/seta-top.gif') no-repeat").addClass("animate");
	    }
	}

	if ($(".ico15").hasClass("animate") == false){
	    if ($(document).scrollTop() >= 4506) {
	        $(".ico15").css("background", "url('themes/landing/css/images/seta-bottom.gif') no-repeat").addClass("animate");
	    }
	}

});

(function($){
    $(window).load(function(){
    	$(".text-regula").mCustomScrollbar();
    });
})(jQuery);