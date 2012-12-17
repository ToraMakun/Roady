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
			alert("Erreur: formulaire de connexion non chargé");
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
			instanciationMenu();
			$("#page").page("destroy").page();
		},
		error: function(){
			alert("Erreur: page menu non chargée");
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
			alert("Erreur: page inscription non chargée");
		}
	});
}

function afficherAjoutAmi(){
	$.ajax({
		url: 'html/ajoutAmi.html',
		dataType: 'html',
		success: function(data){
			$("#contener *").remove();
			$("#contener").append(data);
			instanciationAjoutAmi();
			$("#page").page("destroy").page();
		},
		error: function(){
			alert("Erreur: page ajouter un ami non chargée");
		}
	});
}

function afficherAmis(){
	$.ajax({
		url: 'html/amis.html',
		dataType: 'html',
		success: function(data){
			$("#contener *").remove();
			$("#contener").append(data);
			$("#page").page("destroy").page();
		},
		error: function(){
			alert("Erreur: page amis non chargée");
		}
	});
}

function afficherMap(){
	$.ajax({
		url: 'html/map.html',
		dataType: 'html',
		success: function(data){
			$("#contener *").remove();
			$("#contener").append(data);
			instanciationMap();
			$("#page").page("destroy").page();
		},
		error: function(){
			alert("Erreur: carte non chargée");
		}
	});
}

function afficherDemandeAmi(){
	$.ajax({
		url: 'html/demandeAmi.html',
		dataType: 'html',
		success: function(data){
			$("#contener *").remove();
			$("#contener").append(data);
			instanciationDemandeAmi();
			$("#page").page("destroy").page();
		},
		error: function(){
			alert("Erreur: page demandes amis non chargée");
		}
	});
}

function afficherParametres(){
	$.ajax({
		url: 'html/parametres.html',
		dataType: 'html',
		success: function(data){
			$("#contener *").remove();
			$("#contener").append(data);
			instanciationParametres();
			$("#page").page("destroy").page();
		},
		error: function(){
			alert("Erreur: page parametres non chargée");
		}
	});
}

function afficherFicheAmi(){
	$.ajax({
		url: 'html/ficheAmi.html',
		dataType: 'html',
		success: function(data){
			$("#contener *").remove();
			$("#contener").append(data);
			$("#page").page("destroy").page();
		},
		error: function(){
			alert("Erreur: fiche amie non chargée");
		}
	});
}