function instanciationInscription(){

	$("form").submit(function(){alert("A faire"); return false;});
	
	$("#boutonRetour").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(function(){afficherConnexion();});
}