function SubmitJob(form,preview) {

	if (form.geometryIndex2.value != "") {
		var geometry2JSON;
		if (!(geometry2JSON = fetchGeometryFromJobNumber(form.geometryIndex2.value))) {
			//If data is not ready yet
			setTimeout("SubmitJob(form," + preview + ")", 100);
			return;
		}

		setGeometry(geometry2JSON);

		getGeometry("XYZFormat", "writeHeader=true", form.geometry2, false);
	}
	
	document.moledit.setModel(form.model.value);
	var response =JSON.parse(document.moledit.getProperties());

	getGeometry("XTBFormat", "", form.geometry, false);
	
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
		var text = window.prompt("Enter calculation", "energy");

		form.calculation.value = text;
		form.templateId.options[form.templateId.selectedIndex].text = "Other (" + text + ")";
	}
	hideUnusedVariables();
}

function OnChangeMethod(form)
{
	if (form.method.selectedIndex == form.method.length - 1)
	{
		var text = window.prompt("Enter method", "HF");

		form.method.options[form.method.selectedIndex].value = text;
		form.method.options[form.method.selectedIndex].text = "Other (" + text + ")";
	}
	var method = form.method.options[form.method.selectedIndex].value;
}

function OnChangeMultiplicity(form)
{
	var mult = form.multiplicity[form.multiplicity.selectedIndex].value;
}
