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
    var ctx = canvas[0].getContext('2d');
    var imageWidth;
    var imageHeight;
    
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
        });
    });
    
    
    //click sur le bouton capture
    $("#btnCapture").bind( "click", function() {
        //utilisation de l'appareil photo
        navigator.device.capture.captureImage(captureSuccess, captureError, {limit:1});
        
    });
    
    function captureSuccess(capturedFiles) {    
        //en cours de débuggage ne pas toucher
        
        img = new Image();
        img.src = capturedFiles[0].fullPath;
        img.onload = function(){
            imageWidth = img.width;
            imageHeight = img.height;
            img.height = imageHeight * canvas.width() / imageWidth;
            img.width = canvas.width();
            canvas.width(img.width);
            canvas.height(img.height);
            // Ajout Boris 25/11 --(Rotation 90°) ------------------------------->
            //ctx.translate(imageHeight,0);
            //ctx.rotate(90*Math.PI/180);
            // --------------------------------------------->
            ctx.drawImage(img, 0, 0, canvas.width(), canvas.height());
        }
    }
    function captureError(error) {
        var msg = 'La prise de photo à été annulée. ' + error.code;
        navigator.notification.alert(msg, null, 'Annuler !');
    }
});