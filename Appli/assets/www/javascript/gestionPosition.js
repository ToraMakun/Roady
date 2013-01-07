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
						/*error: function(){
							alert("Erreur: page indisponible");
						}*/
						error:function(jqXHR, exception) {
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
						/*error: function(){
							alert("Erreur: page indisponible");
						}*/
						error:function(jqXHR, exception) {
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

	if(data.codeExec==0)
	{alert("Poule");
		for(var it=0; it<data.amis.length; it++)
		{
			updateAmiPosition(data.amis[it].login, data.amis[it].lat, data.amis[it].long);
		}
		alert("Poule2");
	}
	else
	{
		deleteUtilisateur(); //deco serveur
		afficherConnexion();
	}
}