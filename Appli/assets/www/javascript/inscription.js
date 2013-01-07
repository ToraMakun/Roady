function instanciationInscription(){

	/* Liaison du formulaire */
	$("form_inscription").submit(function()
		{
			$.ajax({  
				type: "POST",  
				url: "incription.php",  
				data: $("#form_inscription").serialize(),  
				dataType: "json",  
	  
				success: afficherConnexion(),  
				error: alert ("Echec de l'ajout de l'utilisateur")  
			});  
			
			return false;
		});
	
	/* Gestion du bouton retour */
	$("#boutonRetour .ui-btn-text").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(function(){afficherConnexion();});
}