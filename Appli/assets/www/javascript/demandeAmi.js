function instanciationDemandeAmi(){
	
	afficherDemandes();
	
	$("#boutonRetour .ui-btn-text").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(afficherMenu);
}

function afficherDemandes(){
	
	var code=function(resultat)
	{
		if(resultat.rows.length!=0)
		{
			$("[data-role=content]").append('<div class="ui-grid-a demandeAmi"></div>');;
			for(var unIt=0; unIt<resultat.rows.length; unIt++){
				$(".demandeAmi").append('<div class="ui-block-a '+resultat.rows.item(unIt).id+'">'+resultat.rows.item(unIt).login+'</div>')
				$(".demandeAmi").append('<div class="ui-block-b '+resultat.rows.item(unIt).id+'">'+resultat.rows.item(unIt).status+'</div>')
			}
		}		
	}
	
	selectDemandesAmis(code);
}