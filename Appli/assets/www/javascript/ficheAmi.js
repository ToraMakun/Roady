function instanciationFicheAmi(idAmi){

	afficherAmi(idAmi);
	
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

function afficherAmi(idAmi){
	
	var code=function(resultat)
	{
		if(resultat.rows.length==1)
		{
			$("#prenom").text(resultat.rows.item(0).prenom);
			$("#nom").text(resultat.rows.item(0).nom);
			$("#mail").text(resultat.rows.item(0).mail);
			$("#telephone").text(resultat.rows.item(0).telephone);
		}		
	}
	
	selectAmiParId(idAmi, code);
}