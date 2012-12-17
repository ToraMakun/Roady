function instanciationParametres(){

	$("form").submit(function(){alert("A faire"); return false;});
	
	$("#boutonRetour .ui-btn-text").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(function(){afficherMenu();});
}