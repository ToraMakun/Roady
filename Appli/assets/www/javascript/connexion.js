function instanciationConnexion(){

	// Gestion de l'�v�nement onSubmit
	$("form").submit(function(){afficherMenu(); return false;});
	
	// Gestion du bouton afficherInscription
	$("#boutonInscription").click(afficherInscription);
	
	// Gestion du bouton retour
	$("#boutonRetour .ui-btn-text").text("Quitter");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(function(){navigator.app.exitApp();});
}

function demandeConnexion(){
	
	//si ok => enregistre l'utilisateur dans la base
	//			r�cup�re les positions des amis
	//			affiche le menu
	//si pas ok => reste sur la page et lance une alerte 
}