function instanciationMenu(){

	$("#ajoutAmi").click(afficherAjoutAmi);
	$("#affAmis").click(afficherAmis);
	$("#affCarte").click(afficherMap);
	$("#affDemandes").click(afficherDemandeAmi);
	
	$("#quitter").click(function(){navigator.app.exitApp();});
	$("#param").click(afficherParametres);
	
	$("#boutonRetour").text("Se d&eacute;connecter");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(function(){afficherConnexion();});
}