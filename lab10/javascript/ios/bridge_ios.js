function getGeometry(format,options,field,append) {
	var msg = "getGeometry,"+format;
	if (options != "")
		msg += "," + options;
			
	if (append)
		bridge.send(msg, 
			function (responseData) { 
				var response = JSON.parse(responseData);
				field.value += response.geometry;
			} );
	else
		bridge.send(msg, 
			function (responseData) { 
				var response = JSON.parse(responseData);
				field.value = response.geometry;
			} );
}

function setGeometry(jsonData) {
	bridge.send("setGeometry," + jsonData);
}

function setForceField(forceField) {
	bridge.send("setForceField," + forceField);
}

function setProperty(jsonData) {
	bridge.send("setProperty," + jsonData);
}

function animateProperty(jsonData) {
	bridge.send("animateProperty," + jsonData);
}

function plotProperty(jsonData) {
	bridge.send("plotProperty," + jsonData);
}