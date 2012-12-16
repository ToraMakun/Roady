function onLoad(){
	document.addEventListener("deviceready", afficherConnexion, false);
}

function afficherConnexion(){
	$.ajax({
		url: 'html/connexion.html',
		dataType: 'html',
		success: function(data){
			$("#contener *").remove();
			$("#contener").append(data);
			instanciationConnexion();
			$("#page").page("destroy").page();
		},
		error: function(){
			alert("Erreur: formulaire de connexion non charg�");
		}
	});
}

function afficherMenu(){
	$.ajax({
		url: 'html/menu.html',
		dataType: 'html',
		success: function(data){
			$("#contener *").remove();
			$("#contener").append(data);
			$("#page").page("destroy").page();
		},
		error: function(){
			alert("Erreur: page menu non charg�e");
		}
	});
}

function afficherInscription(){
	$.ajax({
		url: 'html/inscription.html',
		dataType: 'html',
		success: function(data){
			$("#contener *").remove();
			$("#contener").append(data);
			$("#page").page("destroy").page();
		},
		error: function(){
			alert("Erreur: page inscription non charg�e");
		}
	});
}