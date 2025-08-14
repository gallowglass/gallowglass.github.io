function SubmitJob(form,preview) {
	document.moledit.setModel(form.model.value);
	var response =JSON.parse(document.moledit.getProperties());

	if (form.cartesianCoordinates.checked)
		getGeometry("XYZFormat", "", form.geometry, false);
	else
		getGeometry("OrcaFormat", "", form.geometry, false);
	
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
		var text = window.prompt("Enter calculation", "SP");

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

function OnChangeBasis(form)
{
	if (form.basisSet.selectedIndex == form.basisSet.length - 1)
	{
		var text = window.prompt("Enter Basis", "3-21G");

		form.basisSet.options[form.basisSet.selectedIndex].value = text;
		form.basisSet.options[form.basisSet.selectedIndex].text = "Other (" + text + ")";
	}
}

function OnChangeMultiplicity(form)
{
	var mult = form.multiplicity[form.multiplicity.selectedIndex].value;
}
