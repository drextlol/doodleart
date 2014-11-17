var heightDiv;
var ulheight;


$(document).ready(function () {
	$(function(){
		$('select').selectric();
	});

	$('#select-order').change(function () {
		$('#form').submit();
	});

	if ($("body").find(".box-doodle")[0] && !$(".box-doodle").hasClass("not-fd")) {
		heightUlLi = 860;
		heightDiv = $('.load').height();
		ul = $(".load ul").height();
		ulheight = $(".load ul").height() + $('.load').offset().top;
	}

	/* Verificação de página */

	if($("body").find(".winners")[0]){
		$(".body").addClass("bd-win");
		$(".footer").css("display", "block");
	}

	if ($(".form-valida").find(".field-validation-error") != "") {
	    $(".field-validation-error").parent().addClass("error");
	    $(".field-validation-error").parent().parent().addClass("error");
	}

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

	//alert('show: ' + $('#hdnShowModal').data('show'));
	if ($('#hdnShowModal').data('show') == 'True')
	{
	    //alert('show: ' + $('#hdnShowModal').data('id'));
	    showModal($('#hdnShowModal').data('id'));
	}

	$(".zoom").mouseleave(function(){
		$(".btn-compart").removeClass("active");
		$(".addthis").css("display","none");
	});

    // gambiarra da ordenacao
	var array = new Array();
    $('li.even').each(function () {
	    array.push($(this).data('id'));
    });

    localStorage.setItem("order", array);    

});


$(document).scroll(function () {
	if($("body").find(".box-doodle")[0]){
		if(!$(".box-doodle").hasClass("not-fd")){
			if(($(document).scrollTop() + $(window).height()) >= ($('.load').offset().top + heightDiv)){
				$(".loading").remove();
				if($(".load").height() < $(".load ul").height()){
					heightDiv += heightUlLi;
					$('.load').delay(1000).animate({ height: heightDiv }, "fast");
					$('.box-doodle').append("<div class='loading'><span>Carregando...</span></div>");
				}else{
					$(".load").height($(".load ul").height());
				}
			}

		if($(document).scrollTop() >= ul){
				$(".footer").css("display", "block");
			}
		}else{
			$(".footer").css("display", "block");
		}
	}
});


function RefreshAllVotes()
{
    $.ajax({
        type: "POST",
        url: window.location.origin + "/home/GetAllVotes",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(data).each(function () {
                var doodleId = $(this).attr("DoodleID");
                var count = $(this).attr("Count");

                $('li[data-id=' + doodleId + '] h3').html(count);
            });
	}
});
}