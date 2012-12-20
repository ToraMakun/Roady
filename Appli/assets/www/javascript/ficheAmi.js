function instanciationFicheAmi(){

	$("#boutonAfficher").click(function(){
		
		//Tester si on a une position dans la base, si pas => disable
		afficherMap($("#prenom").text()+" "+$("#nom").text());
	});
	
	$("#boutonOkDialogChanger").click(function(){alert("A faire");});
	$("#boutonKoDialogChanger").click(function(){$("#dialogChanger").dialog("close");});
	
	$("#boutonOkDialogSuppr").click(function(){alert("A faire");});
	$("#boutonKoDialogSuppr").click(function(){$("#dialogSuppr").dialog("close");});
	
	$("#boutonRetour .ui-btn-text").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(afficherAmis);
}