function instanciationConnexion(){

	$("form").submit(function(){afficherMenu(); return false;});
	
	$("#boutonInscription").click(afficherInscription);
	
	$("#boutonRetour .ui-btn-text").text("Quitter");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(function(){navigator.app.exitApp();});
}