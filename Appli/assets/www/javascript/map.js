var listeMarkers=new Array();
var listeBulles=new Array();
var map;

function instanciationMap(){

	$("#boutonCentrer").click(centrerCarte);
	
	$("#boutonRetour .ui-btn-text").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(function(){afficherMenu();});
}

function centrerCarte(){
	
	var leMarker=getMarker("Poule Poule");
	leMarker.setMap(null);
	
	navigator.geolocation.getCurrentPosition(
		function(position) {
			latLng = new google.maps.LatLng(position.coords.longitude, position.coords.latitude);
			map.panTo(latLng);		//Il faut utiliser panTo pour recharger la carte
		},
		function(error) {
			alert("pas bon");
			alert('code: '    + error.code    + '\n' +
				  'message: ' + error.message + '\n');
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
				alert("PAs de retour venant de la base");
			}
		}
	);
}

function placerMarker(uneLatitude, uneLongitude, unTitre){
	var marker = new google.maps.Marker({
			position : new google.maps.LatLng(uneLatitude, uneLongitude),
			map      : map,
			title    : unTitre});
			
	var contentMarker='<div id="bulle" data-role="popup">' +
							'<div data-role="header">'+unTitre+'</div>' +
							'<div data-role="content" class="ui-grid-a">' +
								'<div class="ui-block-a">' +
									'<a id="boutonTracerRoute" data-role="button">Tracer route</a>' +
								'</div>' +
								'<div class="ui-block-b">' +
									'<a id="boutonRafraichir" data-role="button">Rafraichir</a>' +
								'</div>' +
							'</div>' +
						'</div>';
						
	var infoWindow = new google.maps.InfoWindow({
		content  : contentMarker,
		position : new google.maps.LatLng(uneLatitude, uneLongitude)
	});
	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.open(map,marker);
	});
	google.maps.event.addListener(infoWindow, 'domready', function(){
		$("#bulle").trigger("create");
	});
	listeMarkers.push(marker);
}

function getMarker(unTitre){
	for(var unIt=0; unIt<listeMarkers.length; unIt++)
	{
		if(listeMarkers[unIt].title==unTitre)
		{
			return listeMarkers[unIt];
		}
	}
}