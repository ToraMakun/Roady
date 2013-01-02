function instanciationAmis(){

	//Affiche la page de manière dynamique
	afficherGroupes();
	afficherListeAmis();
	
	// Gestion du bouton du popup gestionGroupe
	$("#boutonSupprGroupe").click(supprimerGroupe);
	
	// Gestion des bouton de la page dialog changerGroupe
	$("#boutonOkDialogChangerNomGroupe").click(changerNomGroupe);
	$("#boutonKoDialogChangerNomGroupe").click(function(){$("#dialogChangerNomGroupe").dialog("close");});
	
	//Gestion du bouton retuour
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
				
				var id=resultat.rows.item(unIt).id;
				
				//Si c'est le groupe "Nouveaux amis", on le place au début
				if(id==0){
					$("#listContent").prepend('<div data_group_id="'+id+'" data-role="collapsible"></div>');
				}else{
					$("#listContent").append('<div data_group_id="'+id+'" data-role="collapsible"></div>');
				}
				
				//On place un nouvel onglet avec le nom du groupe
				$("[data_group_id="+id+"]").append('<h3>'+
											'<div class="groupName">'+resultat.rows.item(unIt).nom+'</div>'+
											'<div class="groupVisibility">'+
											'</div></h3><div class="ui-grid-a"></div>').trigger('create');
				
				//On ajoute le switch avec la valeur correspondante
				if(resultat.rows.item(unIt).vue=="true"){
					$("[data_group_id="+id+"] .groupVisibility").append('<select data_group_slider_id="'+resultat.rows.item(unIt).id+'" data-role="slider" data-mini="true">'+
														'<option value="non">Non visible</option>'+
														'<option selected="selected" value="oui">Visible</option>'+
													'</select>').trigger('create');
				}
				else
				{
					$("[data_group_id="+id+"] .groupVisibility").append('<select data_group_slider_id="'+resultat.rows.item(unIt).id+'" data-role="slider" data-mini="true">'+
														'<option selected="selected" value="non">Non visible</option>'+
														'<option value="oui">Visible</option>'+
													'</select>').trigger('create');				
				}
			}
			
			//Quand les interrupteurs change
			$("[data-role=slider]").on('slidestop', function(event) {changerVisibilite(event);});
			
			//Appuyer longtemps pour afficher le popup
			$(".groupName:not([data_group_id=0] .groupName)").on('taphold', function(event){
				$("#gestionGroupe").attr("data_group_id", $(event.currentTarget).parents("[data_group_id]").attr("data_group_id"));
				$("#gestionGroupe").popup("open", {x:0, y:0});
			});

			//Remet tout en place avec JQM
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

				//On place une ligne ami
				$("[data_group_id="+resultat.rows.item(unIt).groupe+"] .ui-grid-a").append('<div class="ui-block-a" data_ami_id="'+resultat.rows.item(unIt).id+'"><div class="amiName">'+resultat.rows.item(unIt).prenom+' '+resultat.rows.item(unIt).nom+'</div></div>')
				$("[data_group_id="+resultat.rows.item(unIt).groupe+"] .ui-grid-a").append('<div class="ui-block-b" data_ami_id="'+resultat.rows.item(unIt).id+'"><div class="amiVisibility"></div></div>').trigger('create');
				
				//On ajoute le switch avec la valeur correspondante
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

//////////////////////////////////////
//	Penser à prévenir le serveur	//
//////////////////////////////////////
function changerVisibilite(event){

	//Si c'est un groupe qui change de visibilité
	if($(event.currentTarget).attr("data_ami_slider_id")==undefined)
	{
		var groupId=$(event.currentTarget).attr("data_group_slider_id");
		var groupVisibilite=($(event.currentTarget).val()=="oui")?true:false;
		updateGroupeVisibilite(groupId, groupVisibilite);

		// On change les valeurs de chaque ami dans le groupe et on éclenche les triggers correspondants
		$("[data_group_id="+groupId+"] .amiVisibility [data-role=slider]").val($(event.currentTarget).val());
		$("[data_group_id="+groupId+"] .amiVisibility [data-role=slider]").trigger("slidestop");
		$("[data_group_id="+groupId+"] .amiVisibility [data-role=slider]").slider("refresh");
	}
	else	//Si c'est un ami, on change jsute sa valeur
	{
		var amiId=$(event.currentTarget).attr("data_ami_slider_id");
		var amiVisibilite=($(event.currentTarget).val()=="oui")?true:false;
		updateAmi(amiId, amiVisibilite);
	}
}

//Supprime le groupe et place les amis dans le groupe "Nouveaux Amis" puisqu'il n'y a pas de triggers dans la base
function supprimerGroupe(){
	var idGroupeSuppr=$("#gestionGroupe").attr("data_group_id");
	deleteGroupe(idGroupeSuppr);
	updateAmiSupprGroupe(idGroupeSuppr);
	$("[data_group_id="+idGroupeSuppr+"]").remove();
	$("#listContent").collapsibleset("refresh");
	$("#gestionGroupe").popup("close");
}

//Si le nom est conforme et non utilisé, on change
function changerNomGroupe(){

	var leNom=HTMLEncode($("input").val());
	
	if(leNom.length!=0 && leNom.length<21 && groupeExiste(leNom))
	{
		updateGroupeNom($("#gestionGroupe").attr("data_group_id"), leNom);
		$("[data_group_id="+$("#gestionGroupe").attr("data_group_id")+"] .groupName").text(leNom);
		$("#gestionGroupe").popup("close");
		$("#dialogChangerNomGroupe").dialog("close");
	}
	else
	{
		alert("Nom non autoris&eacute;");
	}
}

// Fonction d'encodage des caractères spéciaux
function HTMLEncode(wText){
	if(typeof(wText)!="string")
	{
		wText=wText.toString();
	}
	wText=wText.replace(/&/g, "&amp;") ;
	wText=wText.replace(/"/g, "&quot;") ;
	wText=wText.replace(/</g, "&lt;") ;
	wText=wText.replace(/>/g, "&gt;") ;
	wText=wText.replace(/'/g, "&#146;") ;
	return wText;
}