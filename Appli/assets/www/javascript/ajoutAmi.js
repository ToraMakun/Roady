function instanciationAjoutAmi(){

	$("form").submit(function(){ alert("A faire") });
	
	$("#boutonRetour").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(afficherMenu);
}