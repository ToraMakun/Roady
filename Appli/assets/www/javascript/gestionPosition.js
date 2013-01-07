function demandePosition(){
	
	var code=function(resultat){
		
		var loginUtilisateur=null;
		var tokenUtilisateur=null;
		var latUtilisateur=null;
		var longUtilisateur=null;
		
		if(resultat.rows.length==1)
		{
			loginUtilisateur=resultat.rows.item(0).login;
			tokenUtilisateur=resultat.rows.item(0).token;

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
		else
		{
			alert("pas d\'utilisateur");
		}
	}
	selectUtilisateur(code);
}

function resultatPosition(data){

	alert(data.amis[0].login);
}