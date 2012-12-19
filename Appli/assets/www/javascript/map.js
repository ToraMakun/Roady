var listeMarkers=new Array();
var map;

function instanciationMap(){

	$("#boutonCentrer").click(centrerCarte);
	$("#boutonTracer").click(function(){tracerRoute(event); $("#bulle").popup("close");});
	$("#boutonRefresh").click(
			function(){
				$("#bulle").popup("close");
				listeMarkers=new Array();
				placerMarker(latLng.lat(), latLng.lng(), "Moi");
				afficherAmis();
			});
	
	$("#boutonRetour .ui-btn-text").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(function(){afficherMenu();});
}

function centrerCarte(){
	
	/*var leMarker=getMarker("Poule Poule");
	leMarker.setMap(null);*/
	
	navigator.geolocation.getCurrentPosition(
		function(position) {
			latLng = new google.maps.LatLng(position.coords.longitude, position.coords.latitude);
			map.panTo(latLng);		//Il faut utiliser panTo pour recharger la carte
		},
		function(error) {
			alert("Positionnement impossible");
		},
		{ enableHighAccuracy: true }
	);	
}

function initialiserCarte(){
	//Si on a la géolocalisation, on l'affiche, sinon on se met sur l'UTT
	navigator.geolocation.getCurrentPosition(
		function(position) {
			var latLng = new google.maps.LatLng(position.coords.longitude, position.coords.latitude);
			var myOptions = {
				    zoom      : 6,
				    center    : latLng,
				    mapTypeId : google.maps.MapTypeId.TERRAIN, // Type de carte, différentes valeurs possible HYBRID, ROADMAP, SATELLITE, TERRAIN
				    maxZoom   : 20
			};
			map = new google.maps.Map(document.getElementById('map'), myOptions);
			placerMarker(latLng.lat(), latLng.lng(), "Moi");
			afficherAmis();
		},
		function(error) {
			var latLng = new google.maps.LatLng(48.269026,4.066694);
			var myOptions = {
				    zoom      : 14,
				    center    : latLng,
				    mapTypeId : google.maps.MapTypeId.TERRAIN, // Type de carte, différentes valeurs possible HYBRID, ROADMAP, SATELLITE, TERRAIN
				    maxZoom   : 20
			};
			map = new google.maps.Map(document.getElementById('map'), myOptions);
			afficherAmis();
		},
		{ enableHighAccuracy: true }
	);
}

//Va chercher les amis dans la base et place les markers
function afficherAmis(){

	selectAmis(
		function(resultat){
			if(resultat.length!=0){
				for(var i=0;i<resultat.rows.length;i++)
				{
					placerMarker(resultat.rows.item(i).latitude,
								resultat.rows.item(i).longitude,
								resultat.rows.item(i).prenom+" "+resultat.rows.item(i).nom); 
				}
			}
			else
			{
				alert("Pas de retour venant de la base");
			}
		}
	);
}

//Place un marker et l'enregistre
function placerMarker(uneLatitude, uneLongitude, unTitre){
	var marker = new google.maps.Marker({
			position : new google.maps.LatLng(uneLatitude, uneLongitude),
			map      : map,
			title    : unTitre});
			
	google.maps.event.addListener(marker, 'click', function() {
		$("#bulle [data-role=divider]").empty().text(unTitre);
		$("#bulle").popup("open", {x:event.clientX, y:event.clientY});
	});
	
	listeMarkers.push(marker);
}

//Trace la route
function tracerRoute(event){

	//On récupère le nom de l'utilisateur qu'on rejoint via le menu du bouton
	var truc=$(event.currentTarget).clone(true, true);
	var leNomDest=$("#"+truc.attr("id")).parents("ul").children("[data-role=divider]").text();

	//On cherche le marker grâce au nom trouvé au dessus
	var leMarkerDest=getMarker(leNomDest);
	var leMarkerOrigine=getMarker("Moi");
	
	direction = new google.maps.DirectionsRenderer({
		map   : map
	});

	var request = {
		origin      : leMarkerOrigine.position,
		destination : leMarkerDest.position,
		travelMode  : google.maps.DirectionsTravelMode.DRIVING // Type de transport
	}
	
	var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
	directionsService.route(request, function(response, status){ // Envoie de la requête pour calculer le parcours
		if(status == google.maps.DirectionsStatus.OK){
			direction.setDirections(response); // Trace l'itinéraire sur la carte et les différentes étapes du parcours
		}
	});
}

//Cherche le marker selon le nom de l'utilisateur
function getMarker(unTitre){
	for(var unIt=0; unIt<listeMarkers.length; unIt++)
	{
		if(listeMarkers[unIt].title==unTitre)
		{
			return listeMarkers[unIt];
		}
	}
}