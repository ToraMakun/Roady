function instanciationConnexion(){

	// Gestion de l'événement onSubmit
	$("form").submit(function(){
			demandeConnexion();
			return false;
		});
	
	// Gestion du bouton afficherInscription
	$("#boutonInscription").click(afficherInscription);
	
	// Gestion du bouton retour
	$("#boutonRetour .ui-btn-text").text("Quitter");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(function(){navigator.app.exitApp();});
}

function demandeConnexion(){
	
	//si ok => enregistre l'utilisateur dans la base
	//			récupère les positions des amis
	//			affiche le menu
	//si pas ok => reste sur la page et lance une alerte 
	
	var leLogin=HTMLEncode($("#login").val());
	var leMdp=HTMLEncode($("#mdp").val());
	
	if(leLogin.length!=0 && leLogin.length<21 && leMdp.length!=0 && leMdp.length<21)
	{
		$.ajax({
			url: 'http://10.0.2.2:8080/IF26RoadsServeur/authentification.php',
			type: 'POST',
			dataType: 'json',
			data: 'login='+$('#login').val()+'&mdp='+$('#mdp').val()+'&token='+device.uuid, 
			success: function(data){
				/*SI TRUE ====> ajouterNouvelleDemande(leLogin), avec le champ emetteur à false
				SI FALSE ===> alert(existe pas)*/
				authentification(data);
			},
			error: function(){
				alert("Erreur: page indisponible");
			}
		});
	}
	else
	{
		alert("Erreur de compte ou de mot de passe");
	}
}

function authentification(data){
	
	switch(data.code)
	{
		case 0: insertUtilisateur($('#login').val(), data.token)
				afficherMenu();
				break;
			
		case 1: alert("Erreur de compte ou de mot de passe"); break;
		case 2: alert("Compte temporairement banni"); break;
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