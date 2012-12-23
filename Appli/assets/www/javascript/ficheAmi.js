function instanciationFicheAmi(idAmi){

	afficherAmi(idAmi);
	afficherGroupe();
	
	$("#boutonAfficher").click(function(){
		
		//Tester si on a une position dans la base, si pas => disable
		afficherMap($("#prenom").text()+" "+$("#nom").text());
	});
	
	$("#boutonOkDialogChangerGroupe").click(function(){changerGroupe(idAmi);});
	$("#boutonKoDialogChangerGroupe").click(function(){$("#dialogChanger").dialog("close");});
	
	$("#boutonOkDialogSuppr").click(function(){supprimerAmi(idAmi);});
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

function afficherGroupe(){
	
	var code=function(resultat)
	{
		if(resultat.rows.length!=0)
		{
			for(var unIt=0; unIt<resultat.rows.length; unIt++){
				
				var id=resultat.rows.item(unIt).id;
				$("#listeGroupe").append("<option value='"+id+"'>"+resultat.rows.item(unIt).nom+"</option>");
			}
		}	
	}
	
	selectGroupes(code);
}

function changerGroupe(idAmi){
	
	updateAmiGroupe(idAmi, $("#listeGroupe").val());
	$("#dialogChangerGroupe").dialog("close");
	afficherAmis();
}

function supprimerAmi(idAmi){
	
	//Prévenir le serveur aussi
	deleteAmisParId(idAmi);
	$("#dialogSuppr").dialog("close");
	afficherAmis();
}