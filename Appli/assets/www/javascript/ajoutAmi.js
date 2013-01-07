function instanciationAjoutAmi(){

	// Gestion du formulaire
	$("form").submit(function(){nouvelleDemandeAmi(); return false;);
	
	//Gestion du bouton retour
	$("#boutonRetour .ui-btn-text").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(afficherMenu);
}

function nouvelleDemandeAmi(){
	
	var leLogin=HTMLEncode($("input").val());
	
	if(leLogin.length!=0 && leLogin.length<21)
	{
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
						url: 'http://10.0.2.2:8080/IF26RoadsServeur/ajoutAmi.php',
						type: 'POST',
						dataType: 'json',
						data: 'login='+loginUtilisateur+'&token='+tokenUtilisateur+'&loginAmi='+loginAmi, 
						success: function(data){
							if(data.codeExec==0)
							{
								alert("Demande enregistrée");
								insertdemandeAmi(loginAmi, true);
							}
							else
							{
								alert("Cet utilisateur n'existe pas");
							}
						},
						error: function(jqXHR, exception) {
				            if (jqXHR.status === 0) {
				                alert('Not connect.\n Verify Network.');
				            } else if (jqXHR.status == 404) {
				                alert('Requested page not found. [404]');
				            } else if (jqXHR.status == 500) {
				                alert('Internal Server Error [500].');
				            } else if (exception === 'parsererror') {
				                alert('Requested JSON parse failed.');
								alert(jqXHR.responseText);
				            } else if (exception === 'timeout') {
				                alert('Time out error.');
				            } else if (exception === 'abort') {
				                alert('Ajax request aborted.');
				            } else {
				                alert('Uncaught Error.\n' + jqXHR.responseText);
				            }
				        
						}
					});
				}
			}
			selectUtilisateur(code);
		}
		else
		{
			alert("Vous vous connaissez déjà");
		}
	}
}

function ajouterNouvelleDemandeAmi(unLogin){
	
	//Ajouter sur le serveur ou le faire pendant le test ?
	insertdemandeAmi(unLogin, true);
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