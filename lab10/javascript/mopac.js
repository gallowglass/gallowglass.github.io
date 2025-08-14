function SubmitJob(form,preview)
{
	if (form.geometryIndex2.value != "") {
		var geometry2JSON;
		if (!(geometry2JSON = fetchGeometryFromJobNumber(form.geometryIndex2.value))) {
			//If data is not ready yet
			setTimeout("SubmitJob(form," + preview + ")", 100);
			return;
		}

		setGeometry(geometry2JSON);

		if (form.cartesianCoordinates.checked)
			getGeometry("MopacCartesianFormat", "", form.geometry2, false);
		else
			getGeometry("MopacFormat", "", form.geometry2, false);
	}

	document.moledit.setModel(form.model.value);
	var response =JSON.parse(document.moledit.getProperties());
		
	document.form.dimFixed.value = response.dimFixed;
	document.form.dimScanned.value = response.dimScanned;
	document.form.scanStart.value = response.scanStart;
	document.form.scanStop.value = response.scanStop;
	document.form.scanSteps.value = response.scanSteps;
	document.form.scanStart2.value = response.scanStart2;
	document.form.scanStop2.value = response.scanStop2;
	document.form.scanSteps2.value = response.scanSteps2;
	
	if (form.cartesianCoordinates.checked)
		getGeometry("MopacCartesianFormat", "", form.geometry, false);
	else
		getGeometry("MopacFormat", "", form.geometry, false);

	getGeometry("XYZFormat", "writeUnitCell=true", form.cartesian, false);
	getGeometry("ConnectionFormat", "", form.connections, false);
	getGeometry("ZMatrixFormat", "", form.zmatrix, false);
	getGeometry("ChargeFormat", "", form.charges, false);

	DoSubmitJob(form, preview);
}

function OnChangeTemplateId(form)
{
	var temp = form.templateId.options[form.templateId.selectedIndex].text;
	if (temp.substring(0, 5) == "Other")
	{
		var text = window.prompt("Enter calculation", "1SCF BONDS");

		form.calculation.value = text;
		form.templateId.options[form.templateId.selectedIndex].text = "Other (" + text + ")";
	}
	hideUnusedVariables();
}

function OnChangeTheory(form)
{
	if (form.theory.selectedIndex == form.theory.length - 1)
	{
		var text = window.prompt("Enter theory", "PM3");

		form.theory.options[form.theory.selectedIndex].value = text;
		form.theory.options[form.theory.selectedIndex].text = "Other (" + text + ")";
	}
}
		