function instanciationInscription(){

	/* Liaison du formulaire */
	$("#form_inscription").submit(function()
		{
			demandeInscription();
			return false;
		});
	
	/* Gestion du bouton retour */
	$("#boutonRetour .ui-btn-text").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(function(){afficherConnexion();});
}


function demandeInscription(){
	
	//On encode les données entrées
	var leLogin=HTMLEncode($("#login").val());
	var leMdp=HTMLEncode($("#mdp").val());
	var leNom=HTMLEncode($("#nom").val());
	var lePrenom=HTMLEncode($("#prenom").val());
	var leMail=HTMLEncode($("#mail").val());
	var leTelephone=HTMLEncode($("#telephone").val());
	var formulaireOk=true;
	
	//On vérifie si les informations entrées sont conformes
	if(leLogin.length==0 || leLogin.length>20)
	{
		$("#login").css("background-color", "red");
		formulaireOk=false;
	}
	else
	{
		$("#login").css("background-color", "white");
	}
	
	if(leMdp.length==0 || leMdp.length>20)
	{
		$("#mdp").css("background-color", "red");
		formulaireOk=false;
	}
	else
	{
		$("#mdp").css("background-color", "white");
	}
	
	if(leNom.length==0 || leNom.length>20)
	{
		$("#nom").css("background-color", "red");
		formulaireOk=false;
	}
	else
	{
		$("#nom").css("background-color", "white");
	}
	
	if(lePrenom.length==0 || lePrenom.length>20)
	{
		$("#prenom").css("background-color", "red");
		formulaireOk=false;
	}
	else
	{
		$("#prenom").css("background-color", "white");
	}
	
	var mailPattern=/^.*@.*\...$/; 
	if(leMail.length==0 || leMail.length>40 || !mailPattern.test(leMail))
	{
		$("#mail").css("background-color", "red");
		formulaireOk=false;
	}
	else
	{
		$("#mail").css("background-color", "white");
	}
	
	var telPattern=/^0\d{9}$/
	if(leTelephone.length!=10 || !telPattern.test(leTelephone))
	{
		$("#telephone").css("background-color", "red");
		formulaireOk=false;
	}
	else
	{
		$("#telephone").css("background-color", "white");
	}
	
	if(formulaireOk)
	{
		$.ajax({  
			url: 'https://10.0.2.2:4443/IF26RoadsServeur/inscription.php',
			type: 'POST',
			dataType: 'json',
			data: 'login='+leLogin+'&mdp='+leMdp+'&nom='+leNom+'&prenom='+lePrenom+'&mail='+leMail+'&telephone='+leTelephone, 
			success: function(data){
				reponseInscription(data);
			},  
			error: function(){
				alert ("Page indiponible");
			}
		});
	}
	else
	{
		alert("Le formulaire comporte des erreurs.")
	}
}

function reponseInscription(data){
	
	alert("test");
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
