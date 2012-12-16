function instanciationConnexion(){

	$("form").submit(function(){afficherMenu(); return false;});
	
	$("#boutonInscription").click(afficherInscription);
	
	$("#boutonRetour").text("Quitter");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(function(){navigator.app.exitApp();});
}