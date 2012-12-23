function onLoad(){
	document.addEventListener("deviceready", function(){createDB(); afficherConnexion();}, false);
}

function afficherConnexion(){
	$.ajax({
		url: 'html/connexion.html',
		dataType: 'html',
		success: function(data){
			$("#contener *").remove();
			$("#contener").append(data);
			instanciationConnexion();
			$("#page").page("destroy").page();		//Rafraichit la page pour mettre le style de JQM
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
			instanciationMenu();
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
			instanciationInscription();
			$("#page").page("destroy").page();
		},
		error: function(){
			alert("Erreur: page inscription non charg�e");
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
			alert("Erreur: page ajouter un ami non charg�e");
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
			$("#dialogChangerNomGroupe").remove().insertAfter("#page");
			instanciationAmis();
			$("#page").page("destroy").page();
		},
		error: function(){
			alert("Erreur: page amis non charg�e");
		}
	});
}

function afficherMap(unLoginDest){
	$.ajax({
		url: 'html/map.html',
		dataType: 'html',
		success: function(data){
			$("#contener *").remove();
			$("#contener").append(data);
			if(unLoginDest!=null){nomDestination=unLoginDest;}
			instanciationMap();
			$("#page").page("destroy").page();
		},
		error: function(){
			alert("Erreur: carte non charg�e");
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
			alert("Erreur: page demandes amis non charg�e");
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
			alert("Erreur: page parametres non charg�e");
		}
	});
}

function afficherFicheAmi(idAmi){
	$.ajax({
		url: 'html/ficheAmi.html',
		dataType: 'html',
		success: function(data){
			$("#contener *").remove();
			$("#contener").append(data);
			//Place les pages dialogue au bon endroit dans index
			$("#dialogChangerGroupe").remove().insertAfter("#page");
			$("#dialogSuppr").remove().insertAfter("#page");
			instanciationFicheAmi(idAmi);
			$("#page").page("destroy").page();
		},
		error: function(){
			alert("Erreur: fiche amie non charg�e");
		}
	});
}