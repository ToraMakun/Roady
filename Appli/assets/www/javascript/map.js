var listeMarkers=new Array();		//Liste des marqueurs sur la map
var userMarker=null;				//Marqueur de l'utilisateur
var nomDestination=null;			//Login de l'ami que l'on veut rejoindre
var map=null;						//La map

function instanciationMap(){

	/* Liaison des events pour les boutons de la page */
	$("#boutonCentrer").click(centrerCarte);
	$("#formRecherche").submit(function(){lancerRecherche(); return false;});
	
	/* Liaison des events pour les boutons du popup #bulle */
	$("#boutonTracer").click(function(event){
		tracerRoute(event);
		$("#bulle").popup("close");
	});
	$("#boutonRefresh").click(
			function(){
				$("#bulle").popup("close");
				unsetMarkers();
				centrerCarte();
				afficherAmis();
	});
	
	/* Gestion et liaison du bouton retour */
	$("#boutonRetour .ui-btn-text").text("Retour");
	$("#boutonRetour").unbind();
	$("#boutonRetour").click(function(){afficherMenu();});
}

function centrerCarte(){
	
	/* On reprend la position, on replace le marqueur de l'utilisateur, et on centre la map */
	navigator.geolocation.getCurrentPosition(
		function(position) {
			latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			userMarker.setPosition(new google.maps.LatLng(latLng.lat(), latLng.lng()));
			map.panTo(latLng);		//Il faut utiliser panTo pour replacer la carte
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
			var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			var myOptions = {
				    zoom      : 6,
				    center    : latLng,
				    mapTypeId : google.maps.MapTypeId.TERRAIN, // Type de carte, différentes valeurs possible HYBRID, ROADMAP, SATELLITE, TERRAIN
				    maxZoom   : 20
			};
			//On instancie la map, on place le marqueur de l'utilisateur et on affiche les amis
			map = new google.maps.Map(document.getElementById('map'), myOptions);
			placerMarker(latLng.lat(), latLng.lng(), "Moi");
			afficherMarkersAmis();
		},
		function(error) {
			var latLng = new google.maps.LatLng(48.269026,4.066694);
			var myOptions = {
				    zoom      : 14,
				    center    : latLng,
				    mapTypeId : google.maps.MapTypeId.TERRAIN,
				    maxZoom   : 20
			};
			map = new google.maps.Map(document.getElementById('map'), myOptions);
			afficherAmis();
		},
		{ enableHighAccuracy: true }
	);
}

//Va chercher les amis dans la base et place les markers
function afficherMarkersAmis(){

	selectAmis(
		function(resultat){
			if(resultat.length!=0){
				for(var i=0;i<resultat.rows.length;i++)
				{
					if(resultat.rows.item(i).latitude!=null)
					{
						placerMarker(resultat.rows.item(i).latitude,
								resultat.rows.item(i).longitude,
								resultat.rows.item(i).prenom+" "+resultat.rows.item(i).nom); 
					}
				}
			}
			
			//Si on a une destination, on trace la route (vient de ficheAmi -> bouton "Afficher position")
			if(nomDestination!=null)
			{
				google.maps.event.trigger(getMarker(nomDestination), "click", {x:0, y:0});
				var leEvent = jQuery.Event("click", { currentTarget: $("#boutonTracer") });
				$("#boutonTracer").trigger(leEvent);
				nomDestination=null;
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

	//Si c'est le marqueur de l'utilisateur, on enlève le boutton "Tracer route"
	if(unTitre=="Moi")
	{
		google.maps.event.addListener(marker, 'click', function(event) {
			$("#bulle [data-role=divider]").empty().text(unTitre);
			$("#boutonTracer").parents("li").css("visibility","hidden");
			$("#bulle").popup("open", {x:event.clientX, y:event.clientY});
		});
		userMarker=marker;
	}
	else
	{
		google.maps.event.addListener(marker, 'click', function(event) {
			$("#bulle [data-role=divider]").empty().text(unTitre);
			$("#boutonTracer").parents("li").css("visibility","visible");
			$("#bulle").popup("open", {x:event.clientX, y:event.clientY});
		});
		listeMarkers.push(marker);
	}
}

//Trace la route
function tracerRoute(event){

	//On récupère le nom de l'utilisateur qu'on rejoint via le menu du bouton
	var truc=$(event.currentTarget).clone(true, true);
	var leNomDest=$("#"+truc.attr("id")).parents("ul").children("[data-role=divider]").text();
	
	//On cherche le marker grâce au nom trouvé au dessus
	var leMarkerDest=getMarker(leNomDest);
	
	direction = new google.maps.DirectionsRenderer({
		map   : map
	});

	var request = {
		origin      : userMarker.position,
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

function lancerRecherche(){

	//Fonction d'encodage des caractères spéciaux
	var leNom=HTMLEncode($("input").val());
	
	//Si la recherche est conforme on affiche les amis correspondant, sinon on réaffiche tout le monde
	if(leNom.length!=0 && leNom.length<21)
	{
		unsetMarkers();
		var code=function(resultat){
			if(resultat.rows.length!=0)
			{
				for(var i=0;i<resultat.rows.length;i++)
				{
					if(resultat.rows.item(i).latitude!=null)
					{
						placerMarker(resultat.rows.item(i).latitude,
								resultat.rows.item(i).longitude,
								resultat.rows.item(i).prenom+" "+resultat.rows.item(i).nom); 
					}
				}
			}
		}
		
		selectAmisRecherche(leNom, code);
	}
	else
	{
		unsetMarkers();
		afficherMarkersAmis();
	}
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

//Enlève les markers de la map pour la rafraichir
function unsetMarkers(){
	for(var unIt=0; unIt<listeMarkers.length; unIt++)
	{
		listeMarkers[unIt].setMap(null);
	}
	listeMarkers=new Array();
}

//Fonction d'encodage des caractères spéciaux
function HTMLEncode(wText){
	if(typeof(wText)!="string")
	{
		wText=wText.toString();
	}
	wText=wText.replace(/&/g, "&amp;") ;
	wText=wText.replace(/"/g, "&quot;") ;
	wText=wText.replace(/</g, "&lt;") ;
	wText=wText.replace(/>/g, "&gt;") ;
	wText=wText.replace(/'/g, "&#146;") ;
	return wText;
}