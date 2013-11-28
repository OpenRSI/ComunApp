/*fonctionnement du jquery (jquerymobile)

Dans chaque fichier .js il faut utiliser l'écouteur d'évènement "$(document).bind('pageinit', function() {})"

C'est à l'intérieur de lui qu'il faudra mettre tout le code jquery (dans les crochets de "function(){}") 

Il sert à détecter quand le DOM de la page à fini de charger (et donc que tout les éléments html sont utilisable) il remplace "<body onload='initialize()'>"

On pourra, dedans, utiliser des écouteurs d'évènement jquery mais aussi utiliser des fonctions et initialiser des variables qui pourront être utiliser entre les différents écouteurs et fonctions.

Voilà une structure basique en jquery :

$(document).bind('pageinit', function() {
    //mes variables
    var variable1;
    var variable2 = 0;
    var chaine= "hello world";
    ....

    //mes évènements
    $("#id_du_bouton1").bind( "click", function() {
        //ce qui se passe lorsque je clic sur bouton1
    });

    $("#id_du_bouton2").bind( "click", function() {
        //ce qui se passe lorsque je clic sur bouton2
    });

    $("#id_du_div").bind( "mouseover", function() {
        //ce qui se passe lorsque je passe sur le div
    });
    ....

    //mes fonctions
    function ma_fonction1() {
        //contenu de ma fonction1
    }

    function ma_fonction2(param1, param2) {
        //contenu de ma fonction 2
    }
    ....
    
});

En jquery plus besoin de "getelementbyid" la syntaxe du jquery permet d'appeller cette fonction de façon beaucoup plus simple et proche de la syntaxe css. 
Par exemple : document.getElementById("mon_div")
s'écrira : $("#mon_div")
le # étant emprunté de la syntaxe css pour les id et le document est implicite.

voilà pour la base du jquery
*/

//chargement complet de la page
$(document).bind('pageinit', function() {
    
    //déclarations de variable du script
    var code_postal;
    var canvas = $("#previewImg");
    var imageWidth;
    var imageHeight;
    var cursorX, cursorY;
    var color = "ff0000";
	var painting = false;
	var started = false;
	var width_brush = 2;
    var img;
    //var context = canvas[0].getContext('2d');
    
     
    //click sur le bouton Uuid
    $("#btnUuid").bind( "click", function() {
        
        //localisation via gps
        navigator.geolocation.getCurrentPosition(function(position){
            var input = position.coords.latitude + ',' + position.coords.longitude;
            
            //récupération des données postales
            $.getJSON( "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + input + "&sensor=true", function(data) {
                code_postal = data['results'][0]['address_components'][6]['long_name'];
                alert(code_postal);
                });
        }, function(){
            
            //affichage des érreurs
        }, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
    });
    
    
    //click sur le bouton capture
    $("#btnCapture").bind( "click", function() {
        //utilisation de l'appareil photo
        navigator.device.capture.captureImage(captureSuccess, captureError, {limit:1});
        
    });
    
    function captureSuccess(capturedFiles) {    
        //en cours de débuggage ne pas toucher
        var context = canvas[0].getContext('2d');
        img = new Image();
        img.src = capturedFiles[0].fullPath;
        img.onload = function(){
            context.setTransform(1,0,0,1,0,0);
		    context.clearRect(0,0, canvas.width(), canvas.height());
            var maxWidth = canvas.width();
            var ratio = 0;
            var width = img.width;
            var height = img.height;
            ratio = height / width;
            img.width = maxWidth;
            img.height = maxWidth * ratio;
            canvas.height(canvas.width()*ratio);
            context.translate(img.height, 0);
            context.rotate(90*Math.PI/180);
            context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.height(), canvas.width());
                      
        }
    }
    function captureError(error) {
        var msg = 'La prise de photo à été annulée. ' + error.code;
        navigator.notification.alert(msg, null, 'Annuler !');
    }
    
    
    canvas.mousedown(function(e) {
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
			cursorX = (e.pageX - this.offsetLeft); // 10 = décalage du curseur
			cursorY = (e.pageY - this.offsetTop);
			
			// Dessine une ligne :
			drawLine();
		}
	});
    

    function drawLine() {
		// Si c'est le début, j'initialise
        context.lineJoin = 'round';
	    context.lineCap = 'round';
		if (!started) {
			// Je place mon curseur pour la première fois :
			context.beginPath();
			context.moveTo(cursorX, cursorY);
			started = true;
		}
		// Sinon je dessine
		else {
			context.lineTo(cursorX, cursorY);
			context.strokeStyle = color;
			context.lineWidth = width_brush;
			context.stroke();
		}
	}
    

    $("#btnClear").bind( "click", function() {
		context.clearRect(0,0, canvas.width(), canvas.height());
        context.drawImage(img, 0, 0, imageWidth, imageHeight);
	});
    
    
    
    
    //----Gestion des boutons Menu--------------------------->
    
    //----Menu Header ------------->
    
    $("#MENUHS").bind("click",function(){
        window.location = "index.html";
    });
    
    
    //------------------------------------------------------>
    
    
    
    
    
});