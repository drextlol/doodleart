var mskmask = ".mskmask";
var mskbox = ".mskbox";
var urlRoot;

function removeModal(){
	$(mskmask).hide();
	$("body").removeClass("mskbody");
	$(mskbox + "> *").addClass("mskhide");
	$(".ddetail iframe").attr("src", "");
	RefreshAllVotes();
}

/* Remove a url no browser */
function removeUrlGet(){
	history.pushState("Red Bull Doodle Art", "Red Bull Doodle Art", urlRoot);
}

function showModal(id)
{    
    $("body").addClass("mskbody");
    var vclick = $(this).data("mskmodal");
    var urlRoute = "/home/doodledetail/" + id;
    var url = urlRoot + urlRoute;
    $(".ddetail iframe").attr("src", url);
    $('.ddetail').removeClass("mskhide");
    $(mskmask).show();
}

$(document).ready(function () {

    if (window.location.href.split('/').length == 7)
        urlRoot = window.location.origin;
    else
        urlRoot = window.location.href.replace(window.location.hash, "");

    if (urlRoot.charAt(urlRoot.length - 1) == "/")
        urlRoot = urlRoot.substring(0, urlRoot.lastIndexOf("/"));

    $(mskbox + "> *").addClass("mskhide");

	$("[data-mskmodal]").click(function(e){
	    e.preventDefault();
		$("body").addClass("mskbody");
		var vclick = $(this).data("mskmodal");
		var id = $(this).data("id");
		var name = $(this).data("name");
		var urlRoute = "/home/doodledetail/" + id;
		var url = urlRoot + urlRoute;
	    $(".ddetail iframe").attr("src", url);
		$(mskmask).show();
		$(vclick + ",.close-mask").removeClass("mskhide");
	});

	/* Remove da tela a modal ao clicar no esc */
	$(document).keydown(function(e) {
	    if (e.keyCode == 27) {
	    	removeModal();
	    	removeUrlGet();
	    }
	});

	/* Remove da tela a modal ao clicar em fechar */
	$(".close-mask").click(function(e){
		e.preventDefault();
		removeModal();
		removeUrlGet();
	});

	/* Remove da tela a modal ao clicar na mascára */
	$(mskmask).click(function(e){
	    var clickElement = e.target;
	    mskmaskplace = mskmask.replace(".","");
	    if($(clickElement).hasClass(mskmaskplace)){
	      removeModal();
	      removeUrlGet();
	    }
	});
});