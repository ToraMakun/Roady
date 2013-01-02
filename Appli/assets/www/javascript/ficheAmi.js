function instanciationFicheAmi(idAmi){

	//Affiche la page de manière dynamique
	afficherAmi(idAmi);
	afficherGroupe();
	
	/* Lie le bouton afficher avec en paramètre le nom pour tracer la route */
	$("#boutonAfficher").click(function(){
		
		afficherMap($("#prenom").text()+" "+$("#nom").text());
	});
	
	/* Gestion des boutons du popup changerGroupe */
	$("#boutonOkDialogChangerGroupe").click(function(){changerGroupe(idAmi);});
	$("#boutonKoDialogChangerGroupe").click(function(){$("#dialogChangerGroupe").dialog("close");});
	
	/* Gestion des boutons du popup SupprimerAmi */
	$("#boutonOkDialogSuppr").click(function(){supprimerAmi(idAmi);});
	$("#boutonKoDialogSuppr").click(function(){$("#dialogSuppr").dialog("close");});
	
	/* Gestion du bouton retour */
	$("#boutonRetour .ui-btn-text").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(afficherAmis);
}

// Affiche les infos de manière dynamique
function afficherAmi(idAmi){
	
	var code=function(resultat)
	{
		if(resultat.rows.length==1)
		{
			$("#prenom").text(resultat.rows.item(0).prenom);
			$("#nom").text(resultat.rows.item(0).nom);
			$("#mail").text(resultat.rows.item(0).mail);
			$("#telephone").text(resultat.rows.item(0).telephone);
			
			//Si on a pas la position de lami, on disable le bouton afficher sur la map
			if(resultat.rows.item(0).latitude==null)
			{
				$("#boutonAfficher").button("disable");
			}
		}		
	}
	
	selectAmiParId(idAmi, code);
}

// Ajoute les groupes de manière dynamique pour le popup changerGroupe
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

// Fonction qui permet de changer le groupe de l'ami et réaffiche la page
function changerGroupe(idAmi){
	
	updateAmiGroupe(idAmi, $("#listeGroupe").val());
	$("#dialogChangerGroupe").dialog("close");
	afficherAmis();
}

// Fonction qui supprime l'ami
function supprimerAmi(idAmi){
	
	//Prévenir le serveur aussi
	deleteAmisParId(idAmi);
	$("#dialogSuppr").dialog("close");
	afficherAmis();
}