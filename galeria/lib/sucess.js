$(".btn-share").bind("click", function(e){
	e.preventDefault();
	if(!$(this).hasClass("active")){
		$(this).addClass("active");
		$(".addthis-share").animate({
			opacity: "1",
			top: "-5px"
		}, 500).show();
	}else{
		$(this).removeClass("active");
		$(".addthis-share").animate({
			opacity: "0",
			top: "-10px"
		}, 500).hide();
	}
});