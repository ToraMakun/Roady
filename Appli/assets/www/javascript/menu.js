function instanciationMenu(){

	//Rafraîchit les positions
	demandePosition();
	
	/* Liaison des events pour les différents boutons de la page */
	$("#ajoutAmi").click(afficherAjoutAmi);
	$("#affAmis").click(afficherAmis);
	$("#affCarte").click(function(){afficherMap(null);});
	$("#affDemandes").click(afficherDemandeAmi);
	
	$("#quitter").click(function(){navigator.app.exitApp();});
	$("#param").click(afficherParametres);
	
	/* Gestion et liaison de l'event onClick pour le bouton retour*/
	$("#boutonRetour .ui-btn-text").text("Se deconnecter");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(function(){afficherConnexion();});
}