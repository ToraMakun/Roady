function instanciationMap(){

	$("#boutonRetour .ui-btn-text").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(function(){afficherMenu();});
}

var map;

function centrerCarte(){
	navigator.geolocation.getCurrentPosition(
		function(position) {
			latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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
			var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			var myOptions = {
				    zoom      : 14,
				    center    : latLng,
				    mapTypeId : google.maps.MapTypeId.TERRAIN, // Type de carte, différentes valeurs possible HYBRID, ROADMAP, SATELLITE, TERRAIN
				    maxZoom   : 20
			};
			map = new google.maps.Map(document.getElementById('map'), myOptions);
			placerMarker(latLng, "Moi");
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
		},
		{ enableHighAccuracy: true }
	);
}


function placerMarker(uneLatLng, unTitre){
	var marker = new google.maps.Marker({
			position : uneLatLng,
			map      : map,
			title    : unTitre});
}