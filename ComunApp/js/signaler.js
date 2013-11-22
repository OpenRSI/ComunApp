

//fonction récuparation code postal



  /* Fonction d'initialisation de la map appelée au chargement de la page  
  function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(48.8566667, 2.3509871);
    var myOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
   map = new google.maps.Map(document.getElementById("hidden_map"), myOptions);
  }*/

  /* Fonction de géocodage inversé (en fonction des coordonnées de l'adresse)  
  function codeLatLng(input) {
    var latlngStr = input.split(",",2);
    var lat = parseFloat(latlngStr[0]);
    var lng = parseFloat(latlngStr[1]);
      alert('ok');
    var latlng = new google.maps.LatLng(lat, lng);
      
      alert(lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          //map.setZoom(11);
          //marker = new google.maps.Marker({
            //position: latlng,
            //map: map
          //});
          var elt = results[0].address_components;
          for(i in elt){
              if(elt[i].types[0] == 'postal_code') {
                  code_postal = elt[i].types[0];
              }
          }
          //infowindow.setContent(results[0].formatted_address);
          //infowindow.open(map, marker);
          //map.setCenter(latlng);
          return code_postal;
        }
      } else {
        return "Geocoder failed due to: " + status;
      }
    });
  }*/


//fin fonction récuparation code postal







$(document).bind('pageinit', function() {
    /*var map;
    var infowindow = new google.maps.InfoWindow();
    var marker;*/
    var code_postal;
    /*var color = "ff0000";
	var painting = false;
	var started = false;
	var width_brush = 2;
	var canvas = $("#previewImg");
	var cursorX, cursorY;
	var restoreCanvasArray = [];
	var restoreCanvasIndex = 0;
    var ctx = canvas[0].getContext('2d');
    ctx.lineJoin = 'round';
	ctx.lineCap = 'round';*/
    
    /*canvas.mousedown(function(e) {
		painting = true;
		
		// Coordonnées de la souris :
		cursorX = (e.pageX - this.offsetLeft);
		cursorY = (e.pageY - this.offsetTop);
	});
	
	// Relachement du Click sur tout le document, j'arrête de dessiner :
	$(this).mouseup(function() {
		painting = false;
		started = false;
	});
	
	// Mouvement de la souris sur le canvas :
	canvas.mousemove(function(e) {
		// Si je suis en train de dessiner (click souris enfoncé) :
		if (painting) {
			// Set Coordonnées de la souris :
			cursorX = (e.pageX - this.offsetLeft) - 10; // 10 = décalage du curseur
			cursorY = (e.pageY - this.offsetTop) - 10;
			
			// Dessine une ligne :
			drawLine();
		}
	});
    

    function drawLine() {
		// Si c'est le début, j'initialise
		if (!started) {
			// Je place mon curseur pour la première fois :
			ctx.beginPath();
			ctx.moveTo(cursorX, cursorY);
			started = true;
		}
		// Sinon je dessine
		else {
			ctx.lineTo(cursorX, cursorY);
			ctx.strokeStyle = color;
			ctx.lineWidth = width_brush;
			ctx.stroke();
		}
	}
    

    $("#btnClear").bind( "click", function() {
		ctx.clearRect(0,0, canvas.width(), canvas.height());
        ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
	});*/
    
    $("#btnUuid").bind( "click", function() {
            navigator.geolocation.getCurrentPosition(function(position){
                var input = position.coords.latitude + ',' + position.coords.longitude;
                $.getJSON( "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + input + "&sensor=true", function(data) {
                    code_postal = data['results'][0]['address_components'][6]['long_name'];
                    alert(code_postal);
                });
            }, function(){
            });
    });
    
    /*$("btnCapture").bind( "click", function() {
        navigator.device.capture.captureImage(captureSuccess, captureError, {limit:1});
    });
    
    function captureSuccess(capturedFiles) {
        img = new Image();
        img.src = capturedFiles[0].fullPath;
        img.onload = function(){
            imageWidth = img.width;
            imageHeight = img.height;
            var canvas = document.getElementById('previewImg');
            imageHeight = imageHeight * canvas.width / imageWidth;
            imageWidth = canvas.width;
            canvas.height = imageHeight;
            var ctx = document.getElementById('previewImg').getContext('2d');
            ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
        }
    }

    function captureError(error) {
        var msg = 'An error occurred during capture: ' + error.code;
        navigator.notification.alert(msg, null, 'Uh oh!');
    }*/
    
   /* function codeLatLng(input) {
        var latlngStr = input.split(",",2);
        var lat = parseFloat(latlngStr[0]);
        var lng = parseFloat(latlngStr[1]);
        alert('ok');
        var latlng = new google.maps.LatLng(lat, lng);
        alert(lng);
        geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var elt = results[0].address_components;
                    for(i in elt){
                        if(elt[i].types[0] == 'postal_code') {
                            code_postal = elt[i].types[0];
                        }
                    }
                    return code_postal;
                }
            } else {
                return "Geocoder failed due to: " + status;
            }
        });
    }
    */
});