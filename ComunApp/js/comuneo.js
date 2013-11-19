var npath='';


function captureImage() {
        // Lancer l'application appareil photo du mobile, 
        // permettant a l'utilisateur de prendre jusqu'a 1 photos
        navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 1});
    }
	
	

	
function captureSuccess(mediaFiles) {
        // Appel� lorsque l'op�ration d'enregistrement est termin�e
   			
	var i, path, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        npath = mediaFiles[i].fullPath;
		// Faire quelque chose d'int�ressant avec le fichier
		
		document.getElementById("FondPhoto1").src=path;
		document.getElementById("FondPhoto2").href=path;
		
		
    }
}


	
function captureError(error) {
        var msg = 'Annulation' + error.code;
        navigator.notification.alert(msg, null, 'Pas de photo!');
    }
	
			
			
			
// test de transfert de fichier


function sendpic(){
		
	
		
		var options = new FileUploadOptions();
		options.fileKey="file";
		options.fileName=npath.substr(npath.lastIndexOf('/')+1);
		options.mimeType="image/jpeg";
									
		var nomimage = Math.floor(Math.random()*15000000);
	
		var ft = new FileTransfer();
		
	
	
	
		ft.upload(npath, "http://comuneo.openrsi.fr/upload.php?nomimage=22", 
			successCallback,
			errorCallback,
		    options);
			
			alert(nomimage);
		

					
	}


function successCallback(message){
alert('Your photo uploaded successfully.');
}

function errorCallback(){
alert('Failed because: ' + error);
}

	
	
	
	
	
	




