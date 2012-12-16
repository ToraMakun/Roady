function instanciationConnexion(){

	$("form").submit(function(){afficherMenu(); return false;});
	$("#boutonRetour").text("Quitter");
	$("#boutonRetour").click(function(){navigator.app.exitApp();});
}