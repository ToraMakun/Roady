function instanciationAjoutAmi(){

	// Gestion du formulaire
	$("form").submit(nouvelleDemandeAmi);
	
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
			//tester si existe sur le serveur
			/*
			$.ajax({
				url: 'html/amis.html',
				dataType: 'html',
				success: function(data){
					SI TRUE ====> ajouterNouvelleDemande(leLogin)
					SI FALSE ===> alert(pas bon)
				},
				error: function(){
					alert("Erreur: page amis non chargée");
				}
			});*/
		}
		else
		{
			alert("Vous vous connaisez déjà");
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