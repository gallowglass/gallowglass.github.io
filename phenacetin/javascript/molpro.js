function SubmitJob(form,preview) {
	document.moledit.setModel(form.model.value);

        if (form.cartesianCoordinates.checked) getGeometry("MolproCartesianFormat", "", form.geometry, false);
        else getGeometry("MolproFormat", "", form.geometry, false);

	var response =JSON.parse(document.moledit.getProperties());
		
	document.form.nelec.value  = response.nelec - document.form.charge.value;
	document.form.dimOpt.value = response.dimOpt;
	document.form.dimScanned.value = response.dimScanned;
	document.form.scanStart.value = response.scanStart;
	document.form.scanStop.value = response.scanStop;
	document.form.scanSteps.value = response.scanSteps;
	document.form.scanStart2.value = response.scanStart2;
	document.form.scanStop2.value = response.scanStop2;
	document.form.scanSteps2.value = response.scanSteps2;
	document.form.varFixed.value = response.varFixed;
	document.form.varScanned.value = response.varScanned;
	document.form.varScanned2.value = response.varScanned2;

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
	if (form.theory.options[form.theory.selectedIndex].text == 'KS' ||
		form.theory.options[form.theory.selectedIndex].text == 'UKS')
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
		
