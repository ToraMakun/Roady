function instanciationDemandeAmi(){
	
	// Affiche la page de manière dynamique
	gererDemandes();
	
	// Gestion des event pour les boutons du popup GestionDemande (réponse à la demande)
	$("#buttonDemandeOk").click(function(event){
		reponseOkDemande(event);
	});
	$("#buttonDemandeKo").click(function(event){
		reponseKoDemande(event);
	});
	
	//Gestion du bouton retour
	$("#boutonRetour .ui-btn-text").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(afficherMenu);
}

function reponseOkDemande(event){
	
	//On récupère l'id de la demandeAmi
	var id=$(event.currentTarget).attr("data_id");
	
	var code=function(resultat)
	{
		var loginUtilisateur=null;
		var tokenUtilisateur=null;
		var loginAmi=null;
		
		if(resultat.rows.length==1)
		{
			loginUtilisateur=resultat.rows.item(0).login;
			tokenUtilisateur=resultat.rows.item(0).token;
			
			var code=function(resultat)
			{
				if(resultat.rows.length==1)
				{
					loginAmi=resultat.rows.item(0).login;
					
					$.ajax({
						url: 'http://10.0.2.2:8080/IF26RoadsServeur/reponseDemande.php',
						type: 'POST',
						dataType: 'json',
						data: 'login='+loginUtilisateur+'&token='+tokenUtilisateur+'&loginAmi='+loginAmi+'&reponse=Accept&eacute;', 
						success: function(data){

							//Si la réponse est bien enregistrée sur le serveur, on modifie la base du client
							if(data.codeExec==0)
							{
								insertAmi(data.login, data.nom, data.prenom, data.mail, data.telephone);
								$("#gestionDemande").popup("close");
								updateDemandeAmi(id, "Accept&eacute;");
								afficherDemandeAmi();
							}
							else
							{
								alert("erreur");
							}
						},
						error:function(jqXHR, exception) {
				            alert("Erreur: page indisponible");
						}
					});
				}
			}
			selectDemandeAmiParId(id, code);
		}
	}
	selectUtilisateur(code);
}

function reponseKoDemande(event){
	
	//On récupère l'id de la demande
	var id=$(event.currentTarget).attr("data_id");
	
	var code=function(resultat)
	{
		var loginUtilisateur=null;
		var tokenUtilisateur=null;
		var loginAmi=null;
		
		if(resultat.rows.length==1)
		{
			loginUtilisateur=resultat.rows.item(0).login;
			tokenUtilisateur=resultat.rows.item(0).token;
			
			var code=function(resultat)
			{
				if(resultat.rows.length==1)
				{
					loginAmi=resultat.rows.item(0).login;
					
					$.ajax({
						url: 'http://10.0.2.2:8080/IF26RoadsServeur/reponseDemande.php',
						type: 'POST',
						dataType: 'json',
						data: 'login='+loginUtilisateur+'&token='+tokenUtilisateur+'&loginAmi='+loginAmi+'&reponse=Refus&eacute;', 
						success: function(data){
	
							//Si la réponse est bien enregistrée sur le serveur, on modifie la base client
							if(data.codeExec==0)
							{
								$("#gestionDemande").popup("close");
								updateDemandeAmi(id, "Refus&eacute;");
								afficherDemandeAmi();
							}
							else
							{
								alert("erreur");
							}
						},
						error: function(){
							alert("Erreur: page indisponible");
						}
					});
				}
			}
			selectDemandeAmiParId(id, code);
		}
	}
	selectUtilisateur(code);
}

function gererDemandes(){
	
	var code=function(resultat)
	{
		var loginUtilisateur=null;
		var tokenUtilisateur=null;
		
		if(resultat.rows.length==1)
		{
			loginUtilisateur=resultat.rows.item(0).login;
			tokenUtilisateur=resultat.rows.item(0).token;
			
			$.ajax({
				url: 'http://10.0.2.2:8080/IF26RoadsServeur/gererDemandes.php',
				type: 'POST',
				dataType: 'json',
				data: 'login='+loginUtilisateur+'&token='+tokenUtilisateur, 
				success: function(data){

					//On récupère les demandes nous concernant 
					//et on les ajoute ou les modifie dans la base client
					if(data.nombre!=0)
					{
						for(var it=0; it<data.demandes.length; it++)
						{
							if(data.demandes[it].loginDest==loginUtilisateur)
							{
								insertDemandeAmi(data.demandes[it].loginEmet, false);
							}
							else
							{
								updateDemandeAmiLogin(data.demandes[it].loginDest, data.demandes[it].status);
							}
						}
					}
					afficherDemandes();
				},
				error: function(){
					alert("Erreur: page indisponible");
				}
			});
		}
	}
	selectUtilisateur(code);
}

function afficherDemandes(){
	
	var code=function(resultat)
	{
		if(resultat.rows.length!=0)
		{
			$("#contentPage").append('<div class="ui-grid-a demandeAmi"></div>');;
			for(var unIt=0; unIt<resultat.rows.length; unIt++){
				//Affiche le nom te le status de la demande
				$(".demandeAmi").append('<div class="ui-block-a" data_id="'+resultat.rows.item(unIt).id+'">'+resultat.rows.item(unIt).login+'</div>')
				$(".demandeAmi").append('<div class="ui-block-b" data_id="'+resultat.rows.item(unIt).id+'">'+resultat.rows.item(unIt).status+'</div>')
				
				//Si l'utilisateur doit transmettre une réponse, on bind pour ouvrir le popup et on met la couleur en orange
				if(resultat.rows.item(unIt).isUserEmetteur=="false" && resultat.rows.item(unIt).status=="En cours"){
					
					$(".demandeAmi .ui-block-b:last").css("background-color", "orange");
					$(".demandeAmi .ui-block-b:last").click(
							function(event){
								$("#buttonDemandeOk").attr("data_id", $(event.currentTarget).attr("data_id"));
								$("#buttonDemandeKo").attr("data_id", $(event.currentTarget).attr("data_id"));
								$("#gestionDemande").popup("open", {x:0, y:0});
							});
				}
				//Si c'est accepté -> vert
				if(resultat.rows.item(unIt).status=="Accept&eacute;"){
					
					$(".demandeAmi .ui-block-b:last").css("background-color", "green");
				}
				//Si c'est refusé -> rouge
				if(resultat.rows.item(unIt).status=="Refus&eacute;"){
					
					$(".demandeAmi .ui-block-b:last").css("background-color", "red");
				}
			}
		}		
	}
	
	selectDemandesAmis(code);
}