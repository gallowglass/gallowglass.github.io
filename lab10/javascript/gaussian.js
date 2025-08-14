function SubmitJob(form,preview) {
	if (form.geometryIndex2.value != "") {
		var geometry2JSON;
		if (!(geometry2JSON = fetchGeometryFromJobNumber(form.geometryIndex2.value))) {
			//If data is not ready yet
			setTimeout("SubmitJob(form," + preview + ")", 100);
			return;
		}

		setGeometry(geometry2JSON);

		if (form.cartesianCoordinates.checked) getGeometry("XYZFormat", "writeUnitCell=true", form.geometry2, false);
		else getGeometry("GaussianFormat", "", form.geometry2, false);

		if (form.includeConnectivity.checked) getGeometry("GaussianConnectivityFormat", "", form.geometry2, true);
	}

	document.moledit.setModel(form.model.value);
	var properties = JSON.parse(document.moledit.getProperties());
	if (properties.nperiodic > 0) {
		document.form.cartesianCoordinates.checked = true; //makes no sense in internal coords
		document.form.includeConnectivity.checked = false; //seems to be a bug in g09 reading connectivity with 3D periodic (?)
	}
	if (properties.dimFixed > 0 || properties.dimScanned > 0) document.form.redundantInternals.value = 1;
	
	if (form.checkpointFile.selectedIndex != 0)
		form.includeConnectivity.checked = false;
	
	if (form.cartesianCoordinates.checked)
		getGeometry("XYZFormat", "writeUnitCell=true", form.geometry, false);
	else
		getGeometry("GaussianFormat", "", form.geometry, false);

	getGeometry("XYZFormat", "writeUnitCell=true", form.cartesian, false);
	getGeometry("ConnectionFormat", "", form.connections, false);
	getGeometry("ZMatrixFormat", "", form.zmatrix, false);
	getGeometry("ChargeFormat", "", form.charges, false);

	if (form.includeConnectivity.checked)
		getGeometry("GaussianConnectivityFormat", "", form.geometry, true);

	if (!form.cartesianCoordinates.checked && form.includeConnectivity.checked) {
		form.geometry.value = switchModredundantAndConnectivity(form.geometry.value);
		form.geometry2.value = switchModredundantAndConnectivity(form.geometry2.value);
	}

	DoSubmitJob(form, preview);
}

function switchModredundantAndConnectivity(geometry)
{
	var orig_geometry = geometry;
	geometry = geometry.replace(/\r\n/g, "\n");
	geometry = geometry.replace(/\n$/, "");
	var sections = geometry.split(/\n\n/);
	//If we have both a mod redundant AND connectity, put the connectivity first
	if (sections.length == 4)
	{
		var temp = sections[2];
		sections[2] = sections[3];
		sections[3] = temp;
		geometry = sections.join("\n\n");
		return geometry;
	}
	else
		return orig_geometry;
}

function OnChangeTemplateId(form)
{
	var temp = form.templateId.options[form.templateId.selectedIndex].text;
	if (temp.substring(0, 5) == "Other")
	{
		var text = window.prompt("Enter calculation", "SP");

		form.calculation.value = text;
		form.templateId.options[form.templateId.selectedIndex].text = "Other (" + text + ")";
	}
	hideUnusedVariables();
}

function OnChangeTheory(form)
{
	if (form.theory.selectedIndex == form.theory.length - 1)
	{
		var text = window.prompt("Enter theory", "RHF");

		form.theory.options[form.theory.selectedIndex].value = text;
		form.theory.options[form.theory.selectedIndex].text = "Other (" + text + ")";
	}
	
	HandleSemiempirical(form);
}

function HandleSemiempirical(form)
{
	if (form.theory.options[form.theory.selectedIndex].value == "PM3" ||
		form.theory.options[form.theory.selectedIndex].value == "AM1")
	{
		form.basisSet.disabled = true;
	}
	else
	{
		form.basisSet.disabled = false;
	}			
}

function OnChangeBasis(form)
{
	if (form.basisSet.selectedIndex == form.basisSet.length - 1)
	{
		var text = window.prompt("Enter Basis", "3-21G");

		form.basisSet.options[form.basisSet.selectedIndex].value = text;
		form.basisSet.options[form.basisSet.selectedIndex].text = "Other (" + text + ")";
	}
}

function init_gaussian_options(form)
{
	HandleSemiempirical(form);
}