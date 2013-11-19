

// --- Afichage de la carte ---
function affMap(){
    afficheInfo($infos);
	var watchID=navigator.geolocation.watchPosition(successCallback,null);
	initMap($positionIni);
	
	function successCallback(position){
		afficheInfo($infos);
		$positionActuel = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		$longitude = position.coords.longitude;
		$latitude = position.coords.latitude;
		initMap($positionActuel); 
		$infos= getCommune($latitude,$longitude);
	} //successCallback()

   }
   
    
// --- Affiche les infos sur la carte ---
function afficheInfo($infos){
    var div = document.getElementById("textDiv");
	div.textContent = $infos;
}


// --- Creer une carte avec la position passé en parametre  ----
function initMap($pos){
	
	var map = new google.maps.Map(document.getElementById('map'), {
      zoom: $zoom,
      center: $pos,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
	  scaleControl: true,
	  panControl: false,
      zoomControl: false,
      streetViewControl: false,
      overviewMapControl:  false,
    });
    
// --- Affichage du marker vous etes ici  ---
		var marker = new google.maps.Marker({
			position: $pos  ,
			title: "vous etes ici",
			map: map
			});
}
  
  //--- Affiche le contour en fonction du fichier situer sur un serveur ---
    function afficheContour(){
  var ctaLayer = new google.maps.KmlLayer({ url: 'http://sylnebert.openrsi.fr/cta.kml' });
   ctaLayer.setMap(map);
 }
  
 // ---   fonction qui retourne le nom de la commune en fonction des coordonées GPS passé en parametre   
 function getCommune(lati,longi) {
  var geocoder;
  var map;
  geocoder = new google.maps.Geocoder();
  var lat = parseFloat(lati);
  var lng = parseFloat(longi);
  var latlng = new google.maps.LatLng(lat, lng);
      
  geocoder.geocode({'latLng': latlng}, function(results, status) {
  
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[2]) {
		commune = results[2].formatted_address;
      } else {
		commune='none';
      }
      } else {
	  commune='error';
      }
    });
 return commune;
}
    