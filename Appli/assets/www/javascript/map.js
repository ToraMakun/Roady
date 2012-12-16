function instanciationMap(){

	initialiserCarte();
	
	$("#boutonRetour").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(function(){afficherMenu();});
}

var map;
var initialize;
var calculate;
var direction;

function initialiserCarte(){

	if (navigator.geolocation) //Test si pris en charge par le navigateur
    {
		navigator.geolocation.watchPosition(function(position) {
			var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); // Correspond au coordonnées de Lille
			var myOptions = {
				zoom      : 14,
				center    : latLng,
				mapTypeId : google.maps.MapTypeId.TERRAIN, // Type de carte, différentes valeurs possible HYBRID, ROADMAP, SATELLITE, TERRAIN
				maxZoom   : 20
			};
			map      = new google.maps.Map(document.getElementById('map'), myOptions);
			
			var marker = new google.maps.Marker({
			position : latLng,
			map      : map,
			title    : "Moi"
			//icon     : "PhotoCV.JPG"
			});
			
			var contentMarker = "Poule";
 
			var infoWindow = new google.maps.InfoWindow({
				content  : contentMarker,
				position : latLng
			});
			
			google.maps.event.addListener(marker, 'click', function() {
				infoWindow.open(map,marker);
			});
		
			direction = new google.maps.DirectionsRenderer({
				map   : map
			});
		
			var request = {
				origin      : latLng,
				destination : "Niort",
				travelMode  : google.maps.DirectionsTravelMode.DRIVING // Type de transport
			}
			var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
			directionsService.route(request, function(response, status){ // Envoie de la requête pour calculer le parcours
				if(status == google.maps.DirectionsStatus.OK){
					direction.setDirections(response); // Trace l'itinéraire sur la carte et les différentes étapes du parcours
				}
			});
		});
		
    }
    else
    {
        /*latitude = 50.6371834;
        longitude = 3.063017400000035;*/
    }
	//calculate();
  
};