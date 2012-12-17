function instanciationMenu(){

	$("#ajoutAmi").click(afficherAjoutAmi);
	$("#affAmis").click(afficherAmis);
	$("#affCarte").click(afficherMap);
	$("#affDemandes").click(afficherDemandeAmi);
	
	$("#quitter").click(function(){navigator.app.exitApp();});
	$("#param").click(afficherParametres);
	
	$("#boutonRetour .ui-btn-text").text("Se deconnecter");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(function(){afficherConnexion();});
}