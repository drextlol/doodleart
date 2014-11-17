var scrollTotal;
var scrollPercentTop;

$(document).ready(function () {

	/* Altura total do documento */
	scrollTotal = $(document).height();
	scrollPercentTop = (scrollTotal*5/100);

	/* Exibe mensagem de browser */
	var browsermsg = $(".bwhtml").html();
	$(".bwhtml").remove();

	if(jQuery.browser.msie && jQuery.browser.version < 10 && $.cookie("avisoBrowser") == undefined){
	  $("body").prepend(browsermsg);
	  $(".browserversion").css("display", "block");
	}

	$(".close").click(function(e){
		e.preventDefault();
		$(".browserversion").slideToggle( "slow" );
		$.cookie("avisoBrowser", "1");
	});
	/* Fim da mensagem de browser */

    /* Procura as divs especificadas dos modais e oculta */
	var mctn = $("*[data-ctnmask]");

	$(mctn).each(function () {
	    var vdata = $(this).data("ctnmask");
	    $("body").find(vdata).addClass("dhide");
	});
});

$(window).scroll(function () {
	/* Adiciona flecha de subir ao topo */
	if($(window).scrollTop() >= scrollPercentTop){
		$(".back-top").addClass("st-block");
	}else{
		$(".back-top").removeClass("st-block");
	}

	if(($(window).scrollTop()+$(window).height()) >= scrollTotal && $(".back-top").hasClass("st-block")){
		$(".back-top").addClass("st-top");
	}else{
		$(".back-top").removeClass("st-top");
	}
	/* Fim de adicionar flecha de subir ao topo */
});

/* Smooth Scrolling */
$(".back-top").click(function(){
	$('body,html').animate({scrollTop:0},600);
});