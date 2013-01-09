function instanciationAjoutAmi(){

	// Gestion du formulaire
	$("form").submit(function(){nouvelleDemandeAmi(); return false;});
	
	//Gestion du bouton retour
	$("#boutonRetour .ui-btn-text").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(afficherMenu);
}

function nouvelleDemandeAmi(){
	
	//On encode les donn�es entr�es
	var leLogin=HTMLEncode($("input").val());
	
	//On v�rifie si les informations entr�es sont conformes en taille
	if(leLogin.length!=0 && leLogin.length<21)
	{
		//On v�rifie si une demande � d�j� �t� post�e
		if(!amiExiste(leLogin) && !demandeAmiExiste(leLogin))
		{
			var code=function(resultat)
			{
				var loginUtilisateur=null;
				var tokenUtilisateur=null;
				var loginAmi=leLogin;
				
				if(resultat.rows.length==1)
				{
					loginUtilisateur=resultat.rows.item(0).login;
					tokenUtilisateur=resultat.rows.item(0).token;
					
					$.ajax({
						url: 'https://10.0.2.2:4443/IF26RoadsServeur/ajoutAmi.php',
						type: 'POST',
						dataType: 'json',
						data: 'login='+loginUtilisateur+'&token='+tokenUtilisateur+'&loginAmi='+loginAmi, 
						success: function(data){
							//Si la demande est bien enregistr�e sur le serveur, on ajout sur le client
							if(data.codeExec==0)
							{
								alert("Demande enregistr�e");
								insertdemandeAmi(loginAmi, true);
							}
							else
							{
								alert("Cet utilisateur n'existe pas");
							}
						},
						error: function(){
							alert("Erreur: page indisponible");
						}
					});
				}
			}
			selectUtilisateur(code);
		}
		else
		{
			alert("Vous vous connaissez d�j�");
		}
	}
}

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