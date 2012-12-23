function instanciationAmis(){

	afficherGroupes();
	afficherListeAmis();
	
	$("#boutonChangerNomGroupe").click(function(){});
	$("#boutonSupprGroupe").click(supprimerGroupe);
	
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
											'</div></h3><div class="ui-grid-a"></div>').trigger('create');
				if(resultat.rows.item(unIt).vue=="true"){
					$(".groupVisibility:last").append('<select data_group_slider_id="'+resultat.rows.item(unIt).id+'" data-role="slider" data-mini="true">'+
														'<option value="non">Non visible</option>'+
														'<option selected="selected" value="oui">Visible</option>'+
													'</select>').trigger('create');
				}
				else
				{
					$(".groupVisibility:last").append('<select data_group_slider_id="'+resultat.rows.item(unIt).id+'" data-role="slider" data-mini="true">'+
														'<option selected="selected" value="non">Non visible</option>'+
														'<option value="oui">Visible</option>'+
													'</select>').trigger('create');				
				}
			}
			$("[data_group_id=0]").remove().insertBefore($("[data-role=collapsible]:first"));
			//Quand les interrupteurs change
			$("[data-role=slider]").on('slidestop', function(event) {changerVisibilite(event);});
			//Appuyer longtemps pour afficher le popup
			$(".groupName:not([data_group_id=0] .groupName)").on('taphold', function(event){
				$("#gestionGroupe").attr("data_group_id", $(event.currentTarget).parents("[data_group_id]").attr("data_group_id"));
				$("#gestionGroupe").popup("open", {x:0, y:0});
			});
			$("#listContent").collapsibleset( "refresh" );
			
			
		}
	}
	selectGroupes(code);
}

function afficherListeAmis(){
	
	var code=function(resultat)
	{
		if(resultat.rows.length!=0)
		{
			for(var unIt=0; unIt<resultat.rows.length; unIt++){

				$("[data_group_id="+resultat.rows.item(unIt).groupe+"] .ui-grid-a").append('<div class="ui-block-a" data_ami_id="'+resultat.rows.item(unIt).id+'"><div class="amiName">'+resultat.rows.item(unIt).prenom+' '+resultat.rows.item(unIt).nom+'</div></div>')
				$("[data_group_id="+resultat.rows.item(unIt).groupe+"] .ui-grid-a").append('<div class="ui-block-b" data_ami_id="'+resultat.rows.item(unIt).id+'"><div class="amiVisibility"></div></div>').trigger('create');
				
				if(resultat.rows.item(unIt).vue=="true"){
					$("[data_ami_id="+resultat.rows.item(unIt).id+"] .amiVisibility").append('<select data_ami_slider_id="'+resultat.rows.item(unIt).id+'" data-role="slider" data-mini="true">'+
																						'<option value="non">Non visible</option>'+
																						'<option selected="selected" value="oui">Visible</option>'+
																					'</select>').trigger("create");
				}
				else
				{
					$("[data_ami_id="+resultat.rows.item(unIt).id+"] .amiVisibility").append('<select data_ami_slider_id="'+resultat.rows.item(unIt).id+'" data-role="slider" data-mini="true">'+
																						'<option selected="selected" value="non">Non visible</option>'+
																						'<option value="oui">Visible</option>'+
																					'</select>').trigger("create");				
				}
			}
			//Quand les interrupteurs change
			$("[data-role=slider]").on('slidestop', function(event) {changerVisibilite(event);});

			//Appuyer pour voir la fiche
			$(".ui-block-a").on('tap', function(){afficherFicheAmi($(this).attr("data_ami_id"));});
		}		
	}
	
	selectAmis(code);
}

function changerVisibilite(event){

	if($(event.currentTarget).attr("data_ami_slider_id")==undefined)
	{
		var groupId=$(event.currentTarget).attr("data_group_slider_id");
		var groupVisibilite=($(event.currentTarget).val()=="oui")?true:false;
		updateGroupe(groupId, groupVisibilite);

		$("[data_group_id="+groupId+"] .amiVisibility [data-role=slider]").val($(event.currentTarget).val());
		$("[data_group_id="+groupId+"] .amiVisibility [data-role=slider]").trigger("slidestop");
		$("[data_group_id="+groupId+"] .amiVisibility [data-role=slider]").slider("refresh");
	}
	else
	{
		var amiId=$(event.currentTarget).attr("data_ami_slider_id");
		var amiVisibilite=($(event.currentTarget).val()=="oui")?true:false;
		updateAmi(amiId, amiVisibilite);
	}
}

function supprimerGroupe(){
	var idGroupeSuppr=$("#gestionGroupe").attr("data_group_id");
	deleteGroupe(idGroupeSuppr);
	$("[data_group_id="+idGroupeSuppr+"]").remove();
	$("#listContent").collapsibleset("refresh");
	$("#gestionGroupe").popup("close");
}