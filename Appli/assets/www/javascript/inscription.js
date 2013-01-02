function instanciationInscription(){

	/* Liaison du formulaire */
	$("form").submit(function(){alert("A faire"); return false;});
	
	/* Gestion du bouton retour */
	$("#boutonRetour .ui-btn-text").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(function(){afficherConnexion();});
}