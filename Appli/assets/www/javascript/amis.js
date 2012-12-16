function instanciationAjoutAmi(){

	$("[data-role=slider").on('slidestart', function(event) {alert("Valeur change")});
	$(".groupName").on('taphold', function(){$("#gestionGroupe").popup("open");});
	$(".ui-block-a").on('tap', afficherFicheAmi);
	
	$("#boutonRetour").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(afficherMenu);
}