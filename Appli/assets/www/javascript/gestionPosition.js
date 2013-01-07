function demandePosition(){
	
	var code=function(resultat){
		
		var loginUtilisateur=null;
		var tokenUtilisateur=null;
		var latUtilisateur=null;
		var longUtilisateur=null;
		
		//On récupère nos informations pour l'identification au serveur 
		if(resultat.rows.length==1)
		{
			loginUtilisateur=resultat.rows.item(0).login;
			tokenUtilisateur=resultat.rows.item(0).token;

			//On envoie ou non notre position si on a réussi à l'avoir
			navigator.geolocation.getCurrentPosition(
				function(position) {
				
					latUtilisateur=position.coords.latitude;
					longUtilisateur=position.coords.longitude;

					$.ajax({
						url: 'http://10.0.2.2:8080/IF26RoadsServeur/position.php',
						type: 'POST',
						dataType: 'json',
						data: 'login='+loginUtilisateur+'&token='+tokenUtilisateur+'&lat='+latUtilisateur+'&long='+longUtilisateur, 
						success: function(data){
							resultatPosition(data);
						},
						error: function(){
							alert("Erreur: page indisponible");
						}
					});
				},
				function(error) {
					
					$.ajax({
						url: 'http://10.0.2.2:8080/IF26RoadsServeur/position.php',
						type: 'POST',
						dataType: 'json',
						data: 'login='+loginUtilisateur+'&token='+tokenUtilisateur, 
						success: function(data){
							resultatPosition(data);
						},
						error: function(){
							alert("Erreur: page indisponible");
						}
					});
				},
				{ enableHighAccuracy: true }
			);
		}
	}
	selectUtilisateur(code);
}

function resultatPosition(data){

	//On met à jour la position de nos amis
	if(data.codeExec==0)
	{
		for(var it=0; it<data.amis.length; it++)
		{
			updateAmiPosition(data.amis[it].login, data.amis[it].lat, data.amis[it].long);
		}
	}
	else
	{
		deleteUtilisateur();
		afficherConnexion();
	}
}