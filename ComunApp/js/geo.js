  /*
 
                              -------- GESTION DE LA LOCALISATION  -------------

*/
  function main(){
  
    document.addEventListener("deviceready", onDeviceReady, false);
    afficheInfo($infos);
    
      
    if ((newLatitude !=  $latitude) || (newLongitude != $longitude)){      
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
           
       if (position.coords.accuracy < 160){
        
           afficheMaPosition(newLatitude,newLongitude);     //   affiche ma position "point bleu" sur la carte
           $adresse=getCommune( newLatitude, newLongitude); //   recupere l'adresse de ma position
     
           var reg1=new RegExp(",");                       // recupere le code postal de l'adresse
           adressePart2=$adresse.split(reg1);    
           codePostal=adressePart2[1].substr(1, 6);
           
           if (codeP != codePostal){                        // si le code postal à changer refaire contour 
           afficheContour2(codePostal); 
           codeP=codePostal;
           }
           
      }
          afficheInfo( $adresse);
         //afficheContour2(codePostal);    
   }, null, {enableHighAccuracy:true, maximumAge:500, timeout: 1500}); 
    
   
    
       
     
 }      
         
/*
*  Arrete la lecture du capteur GPS 
*/		   
function stopWatch(){
  navigator.geolocation.clearWatch(watchId);
}  

 /*
 
                              -------- GESTION   AFFICHAGE DE LA CARTE  -------------

*/

  
/*
*  Affiche les infos sur la carte : fenetre  transparente sur la carte
*/
function afficheInfo($infos){
  var div = document.getElementById("textDiv");
  div.textContent = $infos;
}


/*
*  Creer une carte centrée sur la position passé en parametre  
*/
function afficheMap(lat,lng){
  var position = new google.maps.LatLng(lat,lng);
  map = new google.maps.Map(document.getElementById('map'),mapOptions);
  map.setCenter(position);
 // getInfoWindow();     
 //afficheContour2();       
}


/*
*   afficher point bleu de localisation sur la carte
*/
function afficheMaPosition(lat,lng) {
  var myPosition =new google.maps.LatLng(lat,lng);
  var  iconIci = new google.maps.MarkerImage('img/icon1.png');  
  marker.setPosition(myPosition);
  marker.setIcon(iconIci); 
  marker.setMap(map);
} 

  
/*
*   Re-centrer la carte sur les cordonnées passé en arguments
*/     
function recenterMap(lat,lng){
  var position = new google.maps.LatLng(lat,lng);
 
   map.panTo(position); 
}

function recenterMap2(pos){
  
   map.panTo(pos); 
}


/*
 
                              ----------    TRAITEMENTS DES CONTOURS  -----------

*/


/*
*    Affiche les contours en fonction du fichier kml situé sur un serveur openrsi
*/
function afficheContour(){
  var ctaLayer = new google.maps.KmlLayer({ url: 'http://sylnebert.openrsi.fr/test.kml' });
    preserveViewport: true;
  ctaLayer.setMap(map);
}

/*
*    Affiche les contours  en fonction du code postal (cp) en interrogeant une database situé sur un serveur openrsi
*/  
function afficheContour2(cp){
  url="http://sylnebert.openrsi.fr/getville.php?cp="+cp;
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
    
    //  reset (tabPoint[j]
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
        strokeColor: '#00FF00',
        strokeOpacity: 0.8,
       strokeWeight: 1,
        fillColor: '#00AA00',
        fillOpacity: 0.35
        });  
    
   var milieu=Math.round(tabPoint.length/2);
   var centre= tabPoint[milieu];
    recenterMap2(centre);
    $zoom=14;
}
    

/*
 
                              ------------    GEODECODING  -------------

*/





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





/*
 
                              ------------    GESTION DES INFOS WINDOWS --------

*/


   

function getInfoWindow(){
    
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
     
    xhr.open("GET", "http://comunapp.openrsi.fr/informations_get.php?categorie=3&commune=78280");
    xhr.send(null);
}

function readData(sData) { 	
$Evenement1.content=sData;
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

