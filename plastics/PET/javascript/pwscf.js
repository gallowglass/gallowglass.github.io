function SubmitJob(form,preview) {
	document.moledit.setModel(form.model.value);
	var response =JSON.parse(document.moledit.getProperties());

	if (form.cartesianCoordinates.checked)
		getGeometry("PWSCFFormat", "cartesianCoordinates=true", form.geometry, false);
	else
		getGeometry("PWSCFFormat", "", form.geometry, false);
	
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
		var text = window.prompt("Enter calculation", "scf");

		form.calculation.value = text;
		form.templateId.options[form.templateId.selectedIndex].text = "Other (" + text + ")";
	}
	hideUnusedVariables();
}
