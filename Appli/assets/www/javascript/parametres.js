function instanciationParametres(){

	/* Liaison de l'event onSubmit pour le formulaire */
	$("form").submit(function(){alert("A faire"); return false;});
	
	/* Liaison de l'event onClick pour le bouton retour */
	$("#boutonRetour .ui-btn-text").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(function(){afficherMenu();});
}