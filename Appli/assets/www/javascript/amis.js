function instanciationAmis(){

	afficherGroupes();
	afficherAmis();
	
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
												'<select data_group_slider_id="'+resultat.rows.item(unIt).id+'" data-role="slider" data-mini="true">'+
												'</select>'+
											'</div></h3>');
				if(resultat.rows.item(unIt).vue=="true"){
					$("[data-role=slider]:last").append('<option value="non">Non visible</option><option selected="selected" value="oui">Visible</option>');
				}
				else
				{
					$("[data-role=slider]:last").append('<option selected="selected" value="non">Non visible</option><option value="oui">Visible</option>');
				}
			}
		}
		//$("select[data-role=slider]").slider( "refresh" );
		$("#listContent").collapsibleset( "refresh" );	
		//$("[data-role=slider]").slider( "refresh" );
	}
	selectGroupes(code);
}

function afficherAmis(){
	
	var code=function(resultat)
	{
		if(resultat.rows.length!=0)
		{
			for(var unIt=0; unIt<resultat.rows.length; unIt++){

				$("[data_group_id="+resultat.rows.item(unIt).groupe+"] .ui-grid-a").append('<div class="ui-block-a" data_ami_id="'+resultat.rows.item(unIt).id+'"><div class="amiName">'+resultat.rows.item(unIt).prenom+' '+resultat.rows.item(unIt).nom+'</div></div>')
				$("[data_group_id="+resultat.rows.item(unIt).groupe+"] .ui-grid-a").append('<div class="ui-block-b" data_ami_id="'+resultat.rows.item(unIt).id+'"><div class="amiVisibility"><select data_ami_slider_id="'+resultat.rows.item(unIt).id+'" data-role="slider" data-mini="true"></select></div></div>')
				
				if(resultat.rows.item(unIt).vue=="true"){
					$("[data_ami_slider_id="+resultat.rows.item(unIt).id+"]").append('<option value="non">Non visible</option><option selected="selected" value="oui">Visible</option>');
				}
				else
				{
					$("[data_ami_slider_id="+resultat.rows.item(unIt).id+"]").append('<option selected="selected" value="non">Non visible</option><option value="oui">Visible</option>');
				}
			}
		}		
	}
	
	selectAmis(code);
}