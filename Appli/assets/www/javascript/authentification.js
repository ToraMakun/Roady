function connexion(){
	
	if($("#login").value().length!=0 && $("#mdp").value().length!=0){
		
		var leLogin=$("#login").value();
		var leMdp=$("#mdp").value();
		var leUuid=device.uuid;
	
		$.ajax({
			url: '10.0.0.2/connexion',
			dataType: 'json',
			type: post,
			data: {login: leLogin, mdp: leMdp, uuid: leUuid},
			success: function(data){
				switch(data.code)
				{
					case 0: insertUtilisateur(leLogin); afficherMenu();	break;
					case 1: alert("Erreur de compte ou de mot de passe"); break;
					case 2: alert("Compte temporairement banni"); break;
				}
			},
			error: function(){
				alert("Erreur: connexion impossible");
			}
		});
	}
}