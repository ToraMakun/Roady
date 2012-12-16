function onLoad(){
	document.addEventListener("deviceready", onDeviceReady, false);
}

//$(document).ready(function(){onDeviceReady()});

function onDeviceReady(){
	$.ajax({
		url: 'html/connexion.html',
		dataType: 'html',
		success: function(data){
			$("#contener").append(data);
			//$("#page *").page();
			//$('#header').header('refresh');
			//$("#contener").empty().append( options ).selectmenu( "refresh", true );
			// $.mobile.initializePage();
			$("#page").page("destroy").page();
		},
		error: function(){
			alert("Erreur: formulaire de connexion non chargé");
		}
	});
}