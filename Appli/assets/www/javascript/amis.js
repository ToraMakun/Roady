function instanciationAmis(){

	afficherGroupes();
	//afficherAmis();
	
	//Quand les interrupteurs change
	$("[data-role=slider]").on('slidestart', function(event) {alert("Valeur change")});
	//Appuyer longtemps pour afficher le popup
	$(".groupName").on('taphold', function(){$("#gestionGroupe").popup("open", {x:0, y:0});});
	//Appuyer pour voir la fiche
	$(".ui-block-a").on('tap', afficherFicheAmi);
	
	$("#boutonRetour .ui-btn-text").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(afficherMenu);
}

function afficherGroupes(){
	
	var code=function(resultat)
	{
		if(resultat.rows.length!=0)
		{
			for(var unIt=0; unIt<resultat.rows.length; unIt++){
				
				$("#listContent").append('<div data_group_id="'+resultat.rows.item(unIt).id+'" data-role="collapsible"></div>');
				$("[data-role=collapsible]:last").append('<h3>'+
											'<div class="groupName">'+resultat.rows.item(unIt).nom+'</div>'+
											'<div class="groupVisibility">'+
												'<select data_slider_id="'+resultat.rows.item(unIt).id+'" data-role="slider" data-mini="true">'+
													'<option value="non">Non visible</option>'+
													'<option selected="selected" value="oui">Visible</option>'+
												'</select> '+
											'</div></h3>');
			}
		}
		//$("select[data-role=slider]").slider( "refresh" );
		$("#listContent").collapsibleset( "refresh" );	
		//$("select[data-role=slider]").slider( "refresh" );
	}
	selectGroupes(code);
}
/*
function afficherAmis(){
	
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
								$("#buttonDemandeKo").attr("data_id", $(event.currentTarget).attr("data_id"));
								$("#gestionDemande").popup("open", {x:0, y:0});
							});
				}
				if(resultat.rows.item(unIt).status=="Accept&eacute;"){
					
					$(".demandeAmi .ui-block-b:last").css("background-color", "green");
				}
				if(resultat.rows.item(unIt).status=="Refus&eacute;"){
					
					$(".demandeAmi .ui-block-b:last").css("background-color", "red");
				}
			}
		}		
	}
	
	selectAmis(code);
}*/