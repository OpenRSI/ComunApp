

/*
* afficher carte en fonction (latitude , longitude, zoom)
*/
function affMap($lat,$lng,$zoom) {
  var map;
  var myLatlng=new google.maps.LatLng($lat,$lng);
  var mapOptions = {
    zoom: $zoom,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
	  
	   var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!'
  });

	  
}


/*
*  fonction qui affiche carte du trafic routier
*/
function getTrafic($lat,$lng,$zoom){
  var myLatlng = new google.maps.LatLng($lat,$lng);
  var mapOptions = {
    zoom: $zoom,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
}


/*
*  fonction qui retourne le nom de la commune en fonction des coordonées GPS passé en parametre 
*/
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

