function Translate(form) {
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
	moledit.setModelToBuilder();
}

function isViewingJob() {
	return "true";
}

//****************

function doViewDipoleMoment(value) {
	moledit.setDipoleMoment(value);
}

function doViewPartialCharge(value) {
	moledit.setPartialCharge(value);
}

function doViewVibrationalMode(value, mode, freq, scale) {
	moledit.setVibrationalMode(value, mode, freq, scale);
}

function doViewForce(value, scale) {
	moledit.setForce(value, scale);
}

function doAnimateVibrationalMode(value, mode, freq, scale, speed) {
	moledit.animateVibrationalMode(value, mode, freq, scale, speed);
}

function doAnimateGeometrySequence(value, loop, speed) {
	moledit.animateGeometrySequence(value, loop, speed);
}

function doViewIRSpectrum(value, peakWidth) {
	moledit.setIRSpectrum(value, peakWidth);
}

function doViewRamanSpectrum(value, peakWidth) {
	moledit.setRamanSpectrum(value, peakWidth);
}

function doViewVCDSpectrum(value, peakWidth) {
	//use IR spectrum function for backward compatibility
	moledit.setIRSpectrum(value, peakWidth);
}

function doViewUVVisSpectrum(value, label, peakWidth) {
	moledit.setUVVisSpectrum(value, label, peakWidth);
}

function doViewNMRSpectrum(value, type, peakWidth, relative) {
	moledit.setNMRSpectrum(value, type, peakWidth, relative);
}

function doViewH1NMRSpectrum(value, peakWidth, field, coupling, relative) {
	alert('Simulated NMR spectra are not yet implemented under Android.');
}

function doViewCoordinateScan1D(value) {
	moledit.setCoordinateScan1D(value);
}

function doViewCoordinateScan2D(value) {
	alert('This feature is not yet implemented under Android.');
}

function doViewGeometrySequenceEnergies(value) {
	moledit.setGeometrySequenceEnergies(value);
}

function doViewDensityOfStates(value) {
	moledit.setDensityOfStates(value);
}

function doViewMolecularOrbital(jobNumber, mo_index) {
	moledit.setWavefunction(jobNumber, "mo", mo_index);
}

function doViewTransitionOrbital(jobNumber, type, mo_index) {
	moledit.setWavefunction(jobNumber, type, mo_index);
}

function doViewSurface(jobNumber, type) {
	moledit.setWavefunction(jobNumber, type, 0);
}

function doViewNBO(jobNumber, type, mo_index) {
	moledit.setWavefunction(jobNumber, type, mo_index);
}
