function instanciationMap(){

	//initialiserCarte();
	
	$("#boutonRetour").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(function(){afficherMenu();});
}

var map;
var initialize;
 
function initialiserCarte(){
  var latLng = new google.maps.LatLng(50.6371834, 3.063017400000035); // Correspond au coordonn�es de Lille
  var myOptions = {
    zoom      : 14,
    center    : latLng,
    mapTypeId : google.maps.MapTypeId.TERRAIN, // Type de carte, diff�rentes valeurs possible HYBRID, ROADMAP, SATELLITE, TERRAIN
    maxZoom   : 20
  };
 
  map      = new google.maps.Map(document.getElementById('map'), myOptions);
}