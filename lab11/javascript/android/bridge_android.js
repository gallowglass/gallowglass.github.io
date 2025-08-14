function getGeometry(format,options,field,append) {
	if (append) {
		var response = JSON.parse(moledit.getGeometry(format,options));
		field.value += response.geometry;
	}
	else {
		var response = JSON.parse(moledit.getGeometry(format,options));
		field.value = response.geometry;
	}
}

function setGeometry(jsonData) {
	moledit.setGeometry(jsonData);
}

function setForceField(forceField) {
	moledit.setForceField(forceField);
}