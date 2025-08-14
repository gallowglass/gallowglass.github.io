function Translate(form) {
	if (bridge == null) {
		setTimeout("Translate(document.form)", 100);
		return;
	}

	var geometry = unescape(form.geometry.value);
	var connections = unescape(form.connections.value);
	var zmatrix = unescape(form.zmatrix.value);
	var charges = unescape(form.charges.value);

	var geometry2 = {
		"xyz": geometry,
		"connections": connections,
		"zmatrix": zmatrix,
		"charge": charges,
		"jobNumber" : jobNumber
	};
	var geometry2JSON = JSON.stringify(geometry2);

	setGeometry(geometry2JSON);
	bridge.send("setModelToBuilder");

	/*			var preferences = document.ViewerApplet.getPreferences();
			preferences.displayLegend = preferences.showIndex;
*/
}

function isViewingJob() {
	return "true";
}

//****************

function doViewDipoleMoment(value) {
	var data = {
		"property" : "dipoleMoment",
		"value" : value
	};
	var dataJSON = JSON.stringify(data);
	setProperty(dataJSON);
}

function doViewPartialCharge(value) {
	var data = {
		"property" : "partialCharge",
		"value" : value
	};
	var dataJSON = JSON.stringify(data);
	setProperty(dataJSON);
}

function doViewVibrationalMode(value, mode, freq, scale) {
	var data = {
		"property" : "vibrationalMode",
		"mode" : mode,
		"value" : value,
		"frequency" : freq,
		"scaleFactor" : scale
	};
	var dataJSON = JSON.stringify(data);
	setProperty(dataJSON);
}

function doViewForce(value, scale) {
	var data = {
		"property" : "force",
		"value" : value,
		"scaleFactor" : scale
	};
	var dataJSON = JSON.stringify(data);
	setProperty(dataJSON);
}

function doAnimateVibrationalMode(value, mode, freq, scale, speed) {
	var data = {
		"property" : "vibrationalMode",
		"mode" : mode,
		"value" : value,
		"frequency" : freq,
		"scaleFactor" : scale,
		"speed" : speed
	};
	var dataJSON = JSON.stringify(data);
	animateProperty(dataJSON);
}

function doAnimateGeometrySequence(value, loop, speed) {
	var data = {
		"property" : "geometrySequence",
		"value" : value,
		"loop" : loop,
		"speed" : speed
	};
	var dataJSON = JSON.stringify(data);
	animateProperty(dataJSON);
}

function doViewIRSpectrum(value, peakWidth) {
	var data = {
		"property" : "IRSpectrum",
		"value" : value,
		"peakWidth" : peakWidth
	};
	var dataJSON = JSON.stringify(data);
	plotProperty(dataJSON);
}

function doViewRamanSpectrum(value, peakWidth) {
	var data = {
		"property" : "RamanSpectrum",
		"value" : value,
		"peakWidth" : peakWidth
	};
	var dataJSON = JSON.stringify(data);
	plotProperty(dataJSON);
}

function doViewUVVisSpectrum(value, label, peakWidth) {
	var data = {
		"property" : "UVVisSpectrum",
		"value" : value,
		"axisLabel" : label,
		"peakWidth" : peakWidth
	};
	var dataJSON = JSON.stringify(data);
	plotProperty(dataJSON);
}

function doViewNMRSpectrum(value, type, peakWidth, relative) {
	//TODO: implement display of absolute vs relative NMR spectra
	var data = {
		"property" : "NMRSpectrum",
		"value" : value,
		"type" : type,
		"peakWidth" : peakWidth,
		"relativeNMR" : relative
	};
	var dataJSON = JSON.stringify(data);
	plotProperty(dataJSON);
}

function doViewH1NMRSpectrum(value, peakWidth, field, coupling, relative) {
	alert('Simulated NMR spectra are not yet implemented under Android.');
}

function doViewCoordinateScan1D(value) {
	var data = {
		"property" : "CoordinateScan1D",
		"value" : value
	};
	var dataJSON = JSON.stringify(data);
	plotProperty(dataJSON);
}

function doViewCoordinateScan2D(value) {
	alert('This feature is not yet implemented under iOS.');
}

function doViewGeometrySequenceEnergies(value) {
	var data = {
		"property" : "GeometrySequenceEnergies",
		"value" : value
	};
	var dataJSON = JSON.stringify(data);
	plotProperty(dataJSON);
}

function doViewDensityOfStates(value) {
	var data = {
		"property" : "DensityOfStates",
		"value" : value
	};
	var dataJSON = JSON.stringify(data);
	plotProperty(dataJSON);
}

function doViewMolecularOrbital(jobNumber, mo_index) {
	var data = {
		"property" : "wavefunction",
		"jobNumber": jobNumber,
		"type" : "mo",
		"mo_index" : mo_index
	};
	var dataJSON = JSON.stringify(data);
	setProperty(dataJSON);
}

function doViewSurface(jobNumber, type) {
	var data = {
		"property" : "wavefunction",
		"jobNumber": jobNumber,
		"type" : type,
		"mo_index" : 0
	};
	var dataJSON = JSON.stringify(data);
	setProperty(dataJSON);
}

function doViewNBO(jobNumber, type, mo_index) {
	var data = {
		"property" : "wavefunction",
		"jobNumber": jobNumber,
		"type" : type,
		"mo_index" : mo_index
	};
	var dataJSON = JSON.stringify(data);
	setProperty(dataJSON);
}
