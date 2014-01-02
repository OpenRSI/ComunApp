  
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
           
  }
 
 function updateGpsPosition(){  
     
 watchId = navigator.geolocation.watchPosition(
        
    function(position){ 
      newLatitude = position.coords.latitude; 
      newLongitude = position.coords.longitude;
      
             
       if (position.coords.accuracy < 100){
           
           if ($latitudeInit-newLatitude > 0.00101){
                recenterMap(newLatitude,newLongitude);
       }
          afficheMarker(newLatitude,newLongitude);
         $adresse=getCommune( newLatitude, newLongitude);
        
         var reg1=new RegExp(",");
          adressePart2=$adresse.split(reg1);
           
          codePostal=adressePart2[1].substr(1, 6);
           
           
      }
    
        
          afficheInfo( $adresse);
       
         afficheContour2(codePostal);
       
        
   }, null, {enableHighAccuracy:true, maximumAge:1000, timeout: 1500}); 
    
   
    
       
     
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
  
 
  //afficheContour2( $codePostal.value) ;
  //createInfoWindow();  
    
 //afficheContour();       
}


/*
*   Re-centrer la carte 
*/     
function recenterMap(lat,lng){
  var position = new google.maps.LatLng(lat,lng);
 
   map.panTo(position); 
}

function recenterMap2(pos){
  
   map.panTo(pos); 
}

/*
*    Affiche le contour en fonction du fichier situé sur un serveur
*/
function afficheContour(){
  var ctaLayer = new google.maps.KmlLayer({ url: 'http://sylnebert.openrsi.fr/test.kml' });
    preserveViewport: true;
  ctaLayer.setMap(map);
}

  
function afficheContour2(cp){
   
   
  url="http://spiritblues.free.fr/getVille.php?cp="+cp;
      
 
    $(document).ready(function(){
        $.ajax({
            type: "GET",
            url: url,
            dataType: "xml",
            success: xmlParser1
        });
    }); 
     
}


function xmlParser1(data) {
    
    var chemin = new google.maps.MVCArray();
    var tabPoint = new Array;
    var reg=new RegExp("[ ,:]+");
    
    xml = data;
    $(xml).find("coordinates").each(function () {string = $(this).attr("latlng");});
    tableau=string.split(reg);
    
    //reset (tabPoint[j]
    for (var z=0;z<tabPoint.length ;z++){
         
      tabPoint[z]=NULL  ; 
      }
   
  b=0;
  a=0;
   do {
     var lat= Number(tableau[a]);
     var long= tableau[a+1];
      tabPoint[b]= new google.maps.LatLng(lat,long); 
      b++;
       a=a+2;
     } while(a<tableau.length); 
  
   
      for (var j=0;j<tabPoint.length ;j++){
         
      chemin.push(tabPoint[j]);   
      }
        
    
      polygone = new google.maps.Polygon({
        map: map,
        paths: chemin,
        strokeColor: '#00AA00',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#00FF00',
        fillOpacity: 0.35
        });  
    
   var milieu=Math.round(tabPoint.length/2);
    var centre= tabPoint[milieu];
    recenterMap2(centre);
    $zoom=14;
    
    
}
    





 /*
  *   Retourne le nom de la localité fonction des coordonées GPS passé en parametre
  */   
 function getCommune(lati,longi) {
 geocoder = new google.maps.Geocoder();
  var lat = parseFloat(lati);
  var lng = parseFloat(longi);
  var latlng = new google.maps.LatLng(lat, lng);
      
  geocoder.geocode({'latLng': latlng}, function(results, status) {
  
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
		
         commune  = results[0].formatted_address;
      } else {
		commune='none';
      }
      } else {
	  commune='error';
      }
    });
     
     
 return commune;
}


function getCommune2(lat,lng){
    
   var latlng = new google.maps.LatLng(lat, lng); 
    
    geocoder.geocode({'latLng': latlng}, function(results, status) { 
      if (status == google.maps.GeocoderStatus.OK) { 
        if (results[1]) { 
            res1=results[0].formatted_address.replace(/,/gi);       
          res2= results[0].formatted_address;
        } 
      } else { 
        alert("Les coordonnée n'ont pas pu être géolocalisées pour la raison suivante : " + status); 
      } 
    }); 
  
     afficheInfo(res2);

   //return res2;
}





/*
* afficher marker "icon bleu" sur la carte
*/
function afficheMarker(lat,lng) {
  var myPosition =new google.maps.LatLng(lat,lng);
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
    
   var TabObjectWindows = new Array;
   TabObjectWindows[0] = new Object_Windows('marker1','infoWindows1',$latitude+0.00101,$longitude+0.001,$Evenement1.content) ;
   TabObjectWindows[1] = new Object_Windows('marker2','infoWindows2', $latitude-0.00229,$longitude-0.003,$Evenement2.content) ; 
    
   for (var i=0;i<TabObjectWindows.length;i++){
      TabObjectWindows[i].makerID.setPosition( TabObjectWindows[i].marker_LatLng);
      TabObjectWindows[i].makerID.setMap(map);
      TabObjectWindows[i].makerID.setVisible(false);
      TabObjectWindows[i].infoWindowsID.contenu; 
      TabObjectWindows[i].infoWindowsID.open(map,  TabObjectWindows[i].makerID);
   
   } 
}
 
function Object_Windows(makerID,infoWindowsID,lat,lng,contenu) {
      this.makerID= new google.maps.Marker();
      this.infoWindowsID = new google.maps.InfoWindow({content:contenu });
      this.marker_LatLng = new google.maps.LatLng(lat,lng);
    }
  

 function request(callback) {
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            callback(xhr.responseText);
        }
    };

  
    named = $latitude+' '+$longitude;
	
    
    xhr.open("GET", "http://comunapp.openrsi.fr/informations_get.php?categorie=3&commune=78280");
    xhr.send(null);
}

function readData(sData) {
 	
    $Evenement1.content=sData;
    afficheInfo($infos);
   afficheMap($latitude,$longitude);
}
   
 
 
     
     
  
    
function createXmlHttpRequest() {
try {
if (typeof ActiveXObject != 'undefined') {
return new ActiveXObject('Microsoft.XMLHTTP');
} else if (window["XMLHttpRequest"]) {
return new XMLHttpRequest();
}
} catch (e) {
changeStatus(e);
}
return null;
};

function downloadUrl(url, callback) {
 var status = -1;
 var request = createXmlHttpRequest();
 if (!request) {
  return false;
 }
    
request.onreadystatechange = function() {
    
 if (request.readyState == 4) {
    
  try {
   status = request.status;
     } catch (e){
    }
   if (status == 200) {
   callback(request.responseText, request.status);
    request.onreadystatechange = function() {};
  }
 }
}
  request.open('GET', url, true);
 try {
 request.send(null);
 } catch (e) {
  changeStatus(e);
 }

};

    
 function xmlParse(str) {
if (typeof ActiveXObject != 'undefined' && typeof GetObject != 'undefined') {
var doc = new ActiveXObject('Microsoft.XMLDOM');
doc.loadXML(str);
return doc;
}
if (typeof DOMParser != 'undefined') {
return (new DOMParser()).parseFromString(str, 'text/xml');   
 }
return createElement('div', null);
}   

/*
function getXML(url){
  downloadUrl(url, function(data) {
var xml = xmlParse(data);
var markers = xml.documentElement.getElementsByTagName("marker");
$infos=markers[2].getAttribute("titre")+" : "+markers[2].getAttribute("description");
afficheInfo($infos);   
       
for (var i = 0; i < markers.length; i++) {
createMarker(parseFloat(markers[i].getAttribute("lat")),
parseFloat(markers[i].getAttribute("lng")), markers[i].getAttribute('titre'),
markers[i].getAttribute('description'));
    
 
}
});   
        
}
*/


function getXML(url){
  downloadUrl(url, function(data) {
var xml = xmlParse(data);
var markers = xml.documentElement.getElementsByTagName("coordinates");
$infos=markers[0].getAttribute("latlng");
 afficheInfo($infos);  
       

});   
        
}

