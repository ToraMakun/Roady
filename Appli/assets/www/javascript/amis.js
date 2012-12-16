function instanciationAjoutAmi(){

	$("[data-role=slider").on('slidestart', function(event) {alert("Valeur change")});
	$(".groupName").on('taphold', function(){$("#gestionGroupe").popup("open", {x:0, y:0});});
	$(".ui-block-a").on('tap', afficherFicheAmi);
	
	$("#boutonRetour").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(afficherMenu);
}