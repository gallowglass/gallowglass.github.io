function Translate(form) {
	//ensure our Javascript interface is up and running
	if (typeof(document.moledit) == 'undefined') {
		setTimeout(function() {
			Translate(form)
		}, 100);
		return;
	}

	document.moledit.clearProperties();
	
	var geometry = unescape(form.geometry.value);
	var connections = unescape(form.connections.value);
	var zmatrix = unescape(form.zmatrix.value);
	var charges = unescape(form.charges.value);

	var geometry = {
		"xyz": geometry,
		"connections": connections,
		"zmatrix": zmatrix,
		"charge": charges,
		"jobNumber" : jobNumber
	};
	var geometryJSON = JSON.stringify(geometry);

	document.moledit.setGeometry(geometryJSON);
	document.moledit.setModelToBuilder();
	document.moledit.clearProperties(); //call this again to get legend/layers display appropriately
}

function Back(form) {
	window.location.href = url_backDest;
}

function NewJob(form) {
	form.operation.value = "BuildMolecule";
	
	var isAnimating = document.moledit.isAnimating();
	var isPlaying = document.moledit.isAnimationPlaying();
	if (isAnimating && isPlaying) {
			//Reset to make sure we use the equilibrium geometry
			ResetViewer(form);
	}
	if (isAnimating && !isPlaying) {
			if (!confirm('Animation in progress; using CURRENTLY DISPLAYED geometry.'))
				return;
	}
	
	form.model.value = document.moledit.getModel();
	if (form.jobHistory.value.length == 0)
		form.jobHistory.value = jobNumber;
	else
		form.jobHistory.value += ',' + jobNumber;

	form.target = "_self";
	form.submit();
}

function DirectoryList(form) {
	$("#directory_list_dialog" ).dialog({
		autoOpen: true,
		modal: true,
		width: 550,
		height: 400,
		buttons: { 
			"Close": function() {
				$(this).dialog("close");
				}
			},
		open: function(event, ui) {
			$(this).load('directory_list.cgi?jobNumber=' + jobNumber, function() {});
		}
	});
}

function OpenJupyter(form) {
	$("#jupyter_dialog" ).dialog({
		autoOpen: true,
		modal: true,
		width: 550,
		height: 200,
		buttons: { 
			"Copy to Clipboard": function() {
					$("#rest_url").select();
					document.execCommand('copy');
				},
			"Open Jupyter": function() {
					window.open($("#jupyter_url" ).val(), '_blank');
				},
			"Cancel": function() {
				$(this).dialog("close");
				}
			}
	});
}

function RawOutput(form) {
	form.operation.value = "RawOutput";
	form.target = "_blank";
	form.submit();
}

function RawInput(form) {
	form.operation.value = "RawInput";
	form.target = "_blank";
	form.submit();
}

function JSONOutput(form) {
	form.operation.value = "JSONOutput";
	form.target = "_blank";
	form.submit();
}

function ReParse() {
	var form = document.form;
	form.operation.value = "ReParse";
	form.target = "_self";
	if (window.confirm('This make take a few seconds.  Continue?')) form.submit();
}

function ResetViewer(form) {
	Translate(form);
}

function getfocus() {
	newwin.focus();
}
function Help() {
	window.open(url_htmlBase + '/help/VisualizingResults.html');
}

function CollapseNotes() {
	document.getElementById('notes_area').style.display = 'none';
	document.getElementById('expand_notes').style.display = 'block';
	document.getElementById('collapse_notes').style.display = 'none';
}

function ExpandNotes() {
	document.getElementById('notes_area').style.display = 'block';
	document.getElementById('expand_notes').style.display = 'none';
	document.getElementById('collapse_notes').style.display = 'block';
}

function CheckNotesArea() {
	if (document.form.notes.value != "") ExpandNotes();
}

function SaveNotes(form) {
	form.operation.value = "SaveNotes";
	form.target = "NotesFrame";
	form.submit();
	alert('Notes saved');
}

function DisplayApplet(index) {
	apy_setSelectedTab(index);
	SwapApplets();
	window.scrollTo(0, 0);
}

var needToInitDataGrapher = true;

function initDataGrapherIfNeeded() {
	if (needToInitDataGrapher) {
		document.datagrapher.initApp();
		needToInitDataGrapher = false;
	}
}

function SwapApplets() {
	if (document.getElementById('content1').style.display != 'none') {
		if (document.form.ResetButton)
			document.form.ResetButton.disabled = false;
		if (document.form.NewJobButton)
			document.form.NewJobButton.disabled = false;
	} else if (document.getElementById('content2').style.display != 'none') {
		if (document.form.ResetButton)
			document.form.ResetButton.disabled = true;
		if (document.form.NewJobButton)
			document.form.NewJobButton.disabled = true;
		initDataGrapherIfNeeded();
	}
}

//function to ignore enter key
function noenter(text_box) {
	if (window.event && window.event.keyCode == 13) {
		text_box.onchange();
		return false;
	}
}

function RescaleFrequencies(form) {
	form.operation.value = "RescaleFrequencies";
	doAjaxPropertiesRefresh(form, 'vibrational_modes');
}

function RescaleExcitations(form) {
	form.operation.value = "RescaleExcitations";
	doAjaxPropertiesRefresh(form, 'excited_states');
}

function ShiftNMR(form)
{
	form.operation.value = "ShiftNMR";
	doAjaxPropertiesRefresh(form, 'nmr_shifts');
}

function doAjaxPropertiesRefresh(form, element) {
	$.ajax({ // create an AJAX call...
		data: $(form).serialize(), // get the form data
       	type: $(form).attr('method'), // GET or POST
       	url: $(form).attr('action'), // the file to call
       	beforeSend: function() {
       		document.body.style.cursor = 'wait';
       	},
       	success: function(response) { // on success..
			$('#'+element).html($('#'+element , response).html()).fadeIn(); // update the vibrational modes
           	document.body.style.cursor = 'default';
       	}
    });	
}

function verifyDouble(value, field) {
	if (isNaN(parseFloat(value))) {
		alert('Enter a valid value for ' + field);
		return false;
	}
	return true;
}

//****************

function doViewDipoleMoment(value) {
	document.moledit.setDipoleMoment(value);
	DisplayApplet(0);
}

function doViewPartialCharge(value) {
	document.moledit.setPartialCharge(value);
	DisplayApplet(0);
}

function doViewVibrationalMode(value, mode, freq, scale) {
	document.moledit.setVibrationalMode(value, mode, freq, scale);
	DisplayApplet(0);
}

function doAnimateVibrationalMode(value, mode, freq, scale, speed) {
	document.moledit.animateVibrationalMode(value, mode, freq, scale, speed);
	DisplayApplet(0);
}

function doViewForce(value, scale) {
	document.moledit.setForce(value, scale);
	DisplayApplet(0);
}

function doAnimateGeometrySequence(value, loop, speed) {
	document.moledit.animateGeometrySequence(value, loop, speed);
	DisplayApplet(0);
}

function doViewIRSpectrum(value, peakWidth) {
	initDataGrapherIfNeeded();
	DisplayApplet(1);
	document.datagrapher.setIRSpectrum(value, peakWidth);
}

function doViewRamanSpectrum(value, peakWidth) {
	initDataGrapherIfNeeded();
	DisplayApplet(1);
	document.datagrapher.setRamanSpectrum(value, peakWidth);
}

function doViewVCDSpectrum(value, peakWidth) {
	initDataGrapherIfNeeded();
	DisplayApplet(1);
	document.datagrapher.setVCDSpectrum(value, peakWidth);
}

function doViewUVVisSpectrum(value, label, peakWidth) {
	initDataGrapherIfNeeded();
	DisplayApplet(1);
	document.datagrapher.setUVVisSpectrum(value, label, peakWidth);
}

function doViewNMRSpectrum(value, type, peakWidth, relative) {
	initDataGrapherIfNeeded();
	DisplayApplet(1);
	document.datagrapher.setNMRSpectrum(value, type, peakWidth, relative);
}

function doViewH1NMRSpectrumWithCouplings(value, peakWidth, field, Jmatrix, relative) {
	initDataGrapherIfNeeded();
	DisplayApplet(1);
	var coupled_spectrum = document.moledit.getH1NMRSpectrumWithCouplings(value, field, Jmatrix);
	document.datagrapher.setNMRSpectrum(coupled_spectrum, "H", peakWidth, relative);
}

function doViewH1NMRSpectrum(value, peakWidth, field, coupling, relative) {
	initDataGrapherIfNeeded();
	DisplayApplet(1);
	var coupled_spectrum = document.moledit.getH1NMRSpectrum(value, field, coupling);
	document.datagrapher.setNMRSpectrum(coupled_spectrum, "H", peakWidth, relative);
}

function doViewCoordinateScan1D(value) {
	initDataGrapherIfNeeded();
	DisplayApplet(1);
	document.datagrapher.setCoordinateScan1D(value);
}

function doViewCoordinateScan2D(value) {
	initDataGrapherIfNeeded();
	DisplayApplet(1);
	document.datagrapher.setCoordinateScan2D(value);
}

function doViewGeometrySequenceEnergies(value) {
	initDataGrapherIfNeeded();
	DisplayApplet(1);
	document.datagrapher.setGeometrySequenceEnergies(value);
}

function doViewDensityOfStates(value) {
	initDataGrapherIfNeeded();
	DisplayApplet(1);
	document.datagrapher.setDensityOfStates(value);
}

function doViewMolecularOrbital(jobNumber, mo_index) {
	document.moledit.setWavefunction(jobNumber, "mo", mo_index);
	DisplayApplet(0);
}

function doViewTransitionOrbital(jobNumber, type, mo_index) {
	document.moledit.setWavefunction(jobNumber, type, mo_index);
	DisplayApplet(0);
}

function doViewSurface(jobNumber, type) {
	document.moledit.setWavefunction(jobNumber, type, 0);
	DisplayApplet(0);
}

function doViewNBO(jobNumber, type, mo_index) {
	document.moledit.setWavefunction(jobNumber, type, mo_index);
	DisplayApplet(0);
}
