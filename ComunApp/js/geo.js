  
  function main(){
  
    document.addEventListener("deviceready", onDeviceReady, false);
    afficheInfo($infos);
     
      
    if ((newLongitude != $longitude) || (newLongitude != $longitude)){      
      updateGpsPosition();
    } 
      
    
  }
    
  function onDeviceReady() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } 

  /*
  *   onSuccess : Lecture du capteur GPS , affiche Map et marker 
  */  
  function onSuccess(position) {
    $latitude = position.coords.latitude; 
    $longitude = position.coords.longitude;
    $latitudeInit = $latitude;
    $longitudeInit =  $longitude ;  
    afficheMap($latitude, $longitude);
    afficheMarker($latitude, $longitude);
    
  } 
  
  /*
  *   onError Callback receives a PositionError object
  */
  function onError(error) {
    $infos='err : '+ error.code+' message: ' + error.message;        
    afficheInfo($infos);           
  }
   
 function updateGpsPosition(){  
     
 var watchId = navigator.geolocation.watchPosition(
        
    function(position){ 
      newLatitude = position.coords.latitude; 
      newLongitude = position.coords.longitude;
         
       if (position.coords.accuracy < 100){
           
           if ($latitudeInit-newLatitude > 0.000100){
                recenterMap(newLatitude,newLongitude);
       }
          afficheMarker(newLatitude,newLongitude);
         $infos=getCommune( newLatitude, newLongitude);
           
      }
      
      afficheInfo($infos);  
       
   }, null, {enableHighAccuracy:true, maximumAge:0, timeout: 1000}); 
    
     
     
     
 }      
         
/*
*  Arrete la lecture du capteur GPS 
*/		   
function stopWatch(){
  navigator.geolocation.clearWatch(watchId);
}    
  
/*
*  Affiche les infos sur la carte 
*/
function afficheInfo($infos){
  var div = document.getElementById("textDiv");
  div.textContent = $infos;
}

/*
*  Creer une carte avec la position passé en parametre  
*/
function afficheMap(lat,lng){
  var position = new google.maps.LatLng(lat,lng);
  map = new google.maps.Map(document.getElementById('map'),mapOptions);
  map.setCenter(position);
   createInfoWindow();
      
}

/*
* recentre la carte
*/     
function recenterMap(lat,lng){
  var position = new google.maps.LatLng(lat,lng);
 
   map.panTo(position); 
}



/*
*    Affiche le contour en fonction du fichier situer sur un serveur
*/
function afficheContour(){
  var ctaLayer = new google.maps.KmlLayer({ url: 'http://sylnebert.openrsi.fr/cta.kml' });
  ctaLayer.setMap(map);
}
  
 /*
  *   Retourne le nom de la localité fonction des coordonées GPS passé en parametre
  */   
 function getCommune(lati,longi) {
  var geocoder = new google.maps.Geocoder();
  var lat = parseFloat(lati);
  var lng = parseFloat(longi);
  var latlng = new google.maps.LatLng(lat, lng);
      
  geocoder.geocode({'latLng': latlng}, function(results, status) {
  
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[0]) {
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


/*
* afficher marker "icon bleu" sur la carte
*/
function afficheMarker($lat,$lng) {
  var myPosition =new google.maps.LatLng($lat,$lng);
  var  iconIci = new google.maps.MarkerImage('img/icon1.png');
    
  marker.setPosition(myPosition);
  marker.setIcon(iconIci); 
  marker.setMap(map);
} 
  
/*
* afficher infobulle sur la carte
*/
 function infoBulle(){  
    var infobulle = new google.maps.InfoWindow({content: 'vous êtes ici'}); 
    infobulle.open(map, marker);      
}
   

function createInfoWindow(){
    
   var TabOjectWindows = new Array;
   TabOjectWindows[0] =  markerTest = new Oject_Windows('marker1','infoWindows1',$Evenement1.lat,$Evenement1.lng,$Evenement1.content) ;
   TabOjectWindows[1] = new Oject_Windows('marker2','infoWindows2', $Evenement2.lat,$Evenement2.lng,$Evenement2.content) ; 
    
   for (var i=0;i<TabOjectWindows.length;i++){
      TabOjectWindows[i].makerID.setPosition( TabOjectWindows[i].marker_LatLng);
      TabOjectWindows[i].makerID.setMap(map);
      TabOjectWindows[i].makerID.setVisible(false);
      TabOjectWindows[i].infoWindowsID.contenu; 
      TabOjectWindows[i].infoWindowsID.open(map,  TabOjectWindows[i].makerID);
   
   } 
}
 
function Oject_Windows(makerID,infoWindowsID,lat,lng,contenu) {
      this.makerID= new google.maps.Marker();
      this.infoWindowsID = new google.maps.InfoWindow({content:contenu });
      this.marker_LatLng = new google.maps.LatLng(lat,lng);
    }
  