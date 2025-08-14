function SubmitJob(form,preview) {
	document.moledit.setModel(form.model.value);
	var response =JSON.parse(document.moledit.getProperties());

	if (form.cartesianCoordinates.checked)
		getGeometry("GamessCartesianFormat", "", form.geometry, false);
	else
		getGeometry("GamessFormat", "", form.geometry, false);
	
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
		var text = window.prompt("Enter calculation", "ENERGY");

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
	if (form.theory.options[form.theory.selectedIndex].text == 'DFT' ||
		form.theory.options[form.theory.selectedIndex].text == 'DFT')
		form.functional.disabled = false;
	else
		form.functional.disabled = true;
}

function OnChangeFunctional(form)
{
	if (form.functional.selectedIndex == form.functional.length - 1)
	{
		var text = window.prompt("Enter functional", "B3LYP");

		form.functional.options[form.functional.selectedIndex].value = text;
		form.functional.options[form.functional.selectedIndex].text = "Other (" + text + ")";
	}
}

function OnChangeBasis(form)
{
	if (form.basisSet.selectedIndex == form.basisSet.length - 1)
	{
		var text = window.prompt("Enter Basis", "");

		form.basisSet.options[form.basisSet.selectedIndex].value = text;
		form.basisSet.options[form.basisSet.selectedIndex].text = "Other (" + text + ")";
	}
}
