function instanciationDemandeAmi(){
	
	afficherDemandes();
	
	$("#buttonDemandeOk").click(function(event){
		var id=$(event.currentTarget).attr("data_id");
		//Prévenir le serveur qui renverra les informations manquantes pour insérer le nouveau dans la table
		//insertAmi();
		$("#gestionDemande").popup("close");
		$("ui-block-b,[data_id="+id+"]").css("background-color", "green");
		$("ui-block-b,[data_id="+id+"]").unbind();
		updateDemandeAmi(id, "Accept&eacute;");
		afficherDemandeAmi();
		
	});
	$("#buttonDemandeKo").click(function(event){
		var id=$(event.currentTarget).attr("data_id");
		//Prévenir le serveur
		$("#gestionDemande").popup("close");
		$("ui-block-b,[data_id="+id+"]").css("background-color", "red");
		$("ui-block-b,[data_id="+id+"]").unbind();
		updateDemandeAmi(id, "Refus&eacute;");
		afficherDemandeAmi();
	});
	
	$("#boutonRetour .ui-btn-text").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(afficherMenu);
}

function afficherDemandes(){
	
	var code=function(resultat)
	{
		if(resultat.rows.length!=0)
		{
			$("#contentPage").append('<div class="ui-grid-a demandeAmi"></div>');;
			for(var unIt=0; unIt<resultat.rows.length; unIt++){
				$(".demandeAmi").append('<div class="ui-block-a" data_id="'+resultat.rows.item(unIt).id+'">'+resultat.rows.item(unIt).login+'</div>')
				$(".demandeAmi").append('<div class="ui-block-b" data_id="'+resultat.rows.item(unIt).id+'">'+resultat.rows.item(unIt).status+'</div>')
				
					if(resultat.rows.item(unIt).isUserEmetteur=="false" && resultat.rows.item(unIt).status=="En cours"){
					
					$(".demandeAmi .ui-block-b:last").css("background-color", "orange");
					$(".demandeAmi .ui-block-b:last").click(
							function(event){
								$("#buttonDemandeOk").attr("data_id", $(event.currentTarget).attr("data_id"));
								$("#gestionDemande").popup("open", {x:0, y:0});
							});
				}
			}
		}		
	}
	
	selectDemandesAmis(code);
}