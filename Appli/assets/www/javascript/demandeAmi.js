function instanciationDemandeAmi(){
	
	$("#boutonRetour").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(afficherMenu);
}