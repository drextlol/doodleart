$(document).ready(function(){

	var siteUrl = $("#siteurl").val();

	/* Inicialização select personalizado */
	$(function(){
		$('select').selectric();
	});

	/* Fazer o server aplicar a class no elemento */
	$(".list a").click(function(){
		$(".list a").removeClass("selected");
		if($(this).hasClass("selected") == false){
			$(this).addClass("selected");
		}
	});

	/* Campos desabilitados */
	if($(".widget").hasClass('edit-disabled')){
		//$(".wg-title span").html("Detalhes do doodle");
		$(".text-upload").html("Clique abaixo para alterar o doodle");
		$(".btn-file").html("Novo upload");
		$("input[type='text'], select").attr("disabled", "disabled");
		$(".img-doodle02").addClass("active");
		$(".btn-cadastrar").addClass("btn-salvar");
		$(".btn-salvar").addClass("disabled").html("Salvar alterações");
	}

	/* Função de edição para desabilitar campos */
	$(".edit-dados").click(function (e) {
	    e.preventDefault();
		$(this).addClass("disabled");
		$("input, select").removeAttr("disabled", "disabled");
		$('select').selectric('refresh');
		$(".btn-salvar").removeClass("disabled");
	});

	/* Função de salvar para desabilitar campos */
	$(".btn-salvar").click(function (e) {
	    $(".edit-dados").click();
	});

	/* Define a altura do menu lateral esquerdo */
	var heightTela = $(document).height();
	if($(".menu").height() != heightTela){
  		$(".menu").height(heightTela);
  	}

  	$(".btn-file").click(function(){
  		var btnFileClick = $("body").find(".file-input");
  		$(btnFileClick).trigger("click");
  	});

	/* Mascará de campos */
	$(".phone").mask("(99) 9999-9999?9");

	/* Exibe mensagem de erro na tela de login */
	if ($(".form-login").find(".input-validation-error") != "") {
    	$(".input-validation-error").parent().addClass("erro");
	}

	$('#select-order').change(function () {
	    $('.wg-search-form').submit();
	});

	$('.block-check').click(function () {
	    $('.wg-search-form').submit();
	});


	$(".page").click(function () {
	    $("#current-page").val($(this).html().trim());
	    $('.wg-search-form').submit();
	});


    // Menu da master page
	var menu = $('.wg-title:first').html();
	$('.list a').removeClass("selected");

	if (menu.indexOf("Bem vindo") >= 0)
	    $("#menu-home").addClass("selected");
	else if (menu.indexOf("Cadastrar doodle") >= 0)
	    $("#menu-cadastro").addClass("selected");
	else if (menu.indexOf("Gerenciar doodle") >= 0)
	    $("#menu-gerenciar").addClass("selected");
	else if (menu.indexOf("Cadastrar Universidade") >= 0)
	    $("#menu-universidade").addClass("selected");

	$("#lnkBlock").click(function (e) {
	    e.preventDefault();
	    var json = { "id": $(this).attr('itemid') };
	    $.ajax({
	        type: "POST",
	        url: siteUrl + "manager/block",
	        contentType: "application/json; charset=utf-8",
	        data: JSON.stringify(json),
	        dataType: "json",
	        success: function (data)
	        {
	            // atribui a class no cadeado
	            if($("#lnkBlock").hasClass("active")){
					$("#lnkBlock").removeClass("active").attr("title", "Bloquear");
				}else{
					$("#lnkBlock").addClass("active").attr("title", "Desbloquear");
				}

	            if(!$(".edit-disabled .block-doodle > *").hasClass("blk")){
	            	$(".edit-disabled .block-doodle").append("<span class='blk'>/ Doodle bloqueado!</span>");
	            }else{
	            	$(".edit-disabled .block-doodle .blk").remove();
	            }
	        },
	        error: function (data) { console.log('erro: ' + data); },
	    });
	});


	$(".lnkDelete").click(function(e){
		e.preventDefault();
		var idDelete = $("#removedoodle").attr("itemid");
		$(".lnkDelete").attr("itemid", idDelete)
	    var json = { "id": $(this).attr('itemid') };
	    $.ajax({
	        type: "POST",
	        url: siteUrl + "manager/remove",
	        contentType: "application/json; charset=utf-8",
	        data: JSON.stringify(json),
	        dataType: "json",
	        success: function (data)
	        {
	            removeModal();
	            window.location.href = siteUrl + 'manager/list';
	        },
	        error: function (data) { console.log('erro: ' + data); },
	    });
	});

	$(".btn-conf-cancela").click(function(e){
		removeModal();
	});

    $('.edit-universidade').bind("click", function (e) {
    	e.preventDefault();

    	if(!$(this).hasClass("change")){
    		$('.edit-universidade').removeClass("change grey").html("Editar");
	        $('.cad-universidades #universidade').val($(this).parent().parent().find('h1').html());
	        $('.cad-universidades #abreviacao').val($(this).parent().parent().find('h2').html());
	        $('.cad-universidades #id').val($(this).attr('universityid'));
	  		$(this).addClass("change grey").html("Cancelar");
	  		$("#sb-canceled").html("Alterar");
  		}else{
  			/* Altera o botão editar para cancelar */
  			$(this).removeClass("change grey").html("Editar");
  			$("#universidade, #abreviacao").val("");
  			$('.cad-universidades #id').val("");
  			$("#sb-canceled").html("Cadastrar");

  				if($(".field-validation-sucess").css("display", "none")){
  					$(".field-validation-sucess").addClass("hide");
  				}
  		}

    });

    $('.cad-universidades button').click(function (e) {
        $('#msg-universidade').hide();
        $('#msg-abreviacao').hide();

        var name = $('.cad-universidades #universidade').val();
        var sigla = $('.cad-universidades #abreviacao').val();

        if (name.trim() == "")
            $('#msg-universidade').show();

        if (sigla.trim() == "")
            $('#msg-abreviacao').show();


        if (name.trim() == "" || sigla.trim() == "") {
            e.preventDefault();
            return false;
        }

        var json =
            {
                "id": $('.cad-universidades #id').val(),
                "name": name,
                "sigla": sigla
            };

        $.ajax({
            type: "POST",
            url: siteUrl + "manager/university",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(json),
            dataType: "json",
            success: function (data) {
            	$(".field-validation-sucess").addClass("show");
            }
        });
    });
});