var map;
var latLng;

function instanciationMap(){

	$("#boutonRetour").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(function(){afficherMenu();});
}

function centrerCarte(){
	alert("test");
	navigator.geolocation.getCurrentPosition(function(position) {alert("bon");
	latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);},
	function(error) {alert("pas bon");
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
		});
	alert("test2");
	map.setCenter(latLng);
}

function initialiserCarte(){
	
	latLng = new google.maps.LatLng(50.6371834, 3.063017400000035);
	
	var myOptions = {
	    zoom      : 14,
	    center    : latLng,
	    mapTypeId : google.maps.MapTypeId.TERRAIN, // Type de carte, différentes valeurs possible HYBRID, ROADMAP, SATELLITE, TERRAIN
	    maxZoom   : 20
	};
	 
	map = new google.maps.Map(document.getElementById('map'), myOptions);
	centrerCarte();
}