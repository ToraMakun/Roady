function instanciationAmis(){

	//Quand les interrupteurs change
	$("[data-role=slider]").on('slidestart', function(event) {alert("Valeur change")});
	//Appuyer longtemps pour afficher le popup
	$(".groupName").on('taphold', function(){$("#gestionGroupe").popup("open", {x:0, y:0});});
	//Appuyer pour voir la fiche
	$(".ui-block-a").on('tap', afficherFicheAmi);
	
	$("#boutonRetour .ui-btn-text").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(afficherMenu);
}