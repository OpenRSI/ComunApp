 function init(){
    
    
          
    var watchId = navigator.geolocation.watchPosition(
        
    function(position){ 
      $latitude = position.coords.latitude; 
      $longitude = position.coords.longitude;
    
       if (position.coords.accuracy < 100){
           
          
         afficheMap($latitude, $longitude);
      
         
           $infos =  $longitude;
           afficheInfo($infos);
           updateGpsPosition($latitude, $longitude);
      } 
      
      
       
   }, null, {enableHighAccuracy:true, maximumAge:0, timeout: 500}); 
   
    
     
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
    
  
      
    
    
  } 
  
  /*
  *   onError Callback receives a PositionError object
  */
  function onError(error) {
    $infos='err : '+ error.code+' message: ' + error.message;        
    afficheInfo($infos);
}

function updateGpsPosition(lon, lat){  
  
   var lonlat = new OpenLayers.LonLat( lon, lat);
          
    marker1.moveTo(lonlat);
 
}




/*
*  Creer une carte avec la position passé en parametre  
*/
function afficheMap(lat,lng){
 map = new OpenLayers.Map( 'map');
 
 var markers = new OpenLayers.Layer.Markers( "Markers" );
 var size = new OpenLayers.Size(21,26);
 var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
 var icon = new OpenLayers.Icon('img/marker.png', size, offset); 
 
 map.addLayer(markers);
    
 map.addLayer(new OpenLayers.Layer.OSM());    
 var lonLat = new OpenLayers.LonLat( lng, lat )
          .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            map.getProjectionObject() // to Spherical Mercator Projection
          );
    
var marker1= new OpenLayers.Marker(lonLat,icon);
markers.addMarker(marker1);  
    
 map.setCenter (lonLat, $zoom); 
afficheMarker(lng, lat);     
}

 

  

function afficheInfo($infos){
  var div = document.getElementById("textDiv");
  div.textContent = $infos;
}


function afficheMarker(lon,Lat){
 //construction du marqueur de depart
position = new OpenLayers.Geometry.Point(lon,Lat);
position.transform(OpenLayers.Projection.CRS84, VISU.projection);		
style = {externalGraphic:'img/marker.png', graphicWidth:24, graphicHeight:48};
pt = new OpenLayers.Feature.Vector(position, null, style);
	
//couche du marqueur
couche = new OpenLayers.Layer.Vector('Marqueurs');
couche.addFeatures([pt]);
	
VISU.getMap().addLayer(couche); 


}