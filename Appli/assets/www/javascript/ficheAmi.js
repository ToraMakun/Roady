function instanciationFicheAmi(){

	$("#boutonAfficher").click(afficherMap);
	
	$("#boutonOkDialogChanger").click(function(){alert("A faire");});
	$("#boutonKoDialogChanger").click(function(){$("#dialogChanger").dialog("close");});
	
	$("#boutonOkDialogSuppr").click(function(){alert("A faire");});
	$("#boutonKoDialogSuppr").click(function(){$("#dialogSuppr").dialog("close");});
	
	$("#boutonRetour").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(afficherAmis);
}