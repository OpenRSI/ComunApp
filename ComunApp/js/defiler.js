var id = "def"; // id du div conteneur
var vitesse = 20; // en ms
var pas = 1; // en px
var div, sp;
window.onload=function() {
	div = document.getElementById(id);
	sp = div.getElementsByTagName("span")[0];
	div.style.position = "relative";
	div.style.height = 30+"px";//sp.offsetHeight+"px"
	div.style.overflow = "hidden";
	div.style.whiteSpace = "nowrap";
	sp.style.position = "absolute";
	sp.style.left = div.offsetWidth+"px";
	setTimeout(defile,vitesse);
};
function defile() {
	sp.style.left = (parseInt(sp.style.left,10) - pas)+"px";
	if(parseInt(sp.style.left,10)+sp.offsetWidth < 0) {
		sp.style.left = div.offsetWidth+"px";
	}
	setTimeout(defile,vitesse);
}

var Fichier = function Fichier(fichier)
{
    if(window.XMLHttpRequest) obj = new XMLHttpRequest(); //Pour Firefox, Opera,...

    else if(window.ActiveXObject) obj = new ActiveXObject("Microsoft.XMLHTTP"); //Pour Internet Explorer 

    else return(false);
    

    if (obj.overrideMimeType) obj.overrideMimeType("text/xml"); //Évite un bug de Safari

   
    obj.open("GET", fichier, false);
    obj.send(null);
   
    if(obj.readyState == 4) return(obj.responseText);
    else return(false);
}
