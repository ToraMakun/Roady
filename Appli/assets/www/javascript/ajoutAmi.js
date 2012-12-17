function instanciationAjoutAmi(){

	$("form").submit(function(){ alert("A faire") });
	
	$("#boutonRetour .ui-btn-text").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(afficherMenu);
}