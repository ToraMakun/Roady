function instanciationFicheAmi(){

	$("#boutonAfficher").click(afficherMap);
	//$("#boutonChanger").click(afficherMap);
	//$("#boutonSuppr").click(afficherMap);
	
	$("#boutonRetour").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(afficherAmis);
}