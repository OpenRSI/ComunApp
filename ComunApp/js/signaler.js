function getUuid() {
    alert('Device UUID: ' + device.uuid);
    
}

function capture() {
    navigator.device.capture.captureImage(captureSuccess, captureError, {limit:1});
}

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
}

$(document).ready(function() {
    var color = "ff0000";
	var painting = false;
	var started = false;
	var width_brush = 2;
	var canvas = $("#previewImg");
	var cursorX, cursorY;
	var restoreCanvasArray = [];
	var restoreCanvasIndex = 0;
    var ctx = canvas[0].getContext('2d');
    ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
    
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
    
    $("#btnClear").click(function() {
		ctx.clearRect(0,0, canvas.width(), canvas.height());
        ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
	});
});