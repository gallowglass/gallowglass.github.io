function SubmitJob(form,preview) {
	document.moledit.setModel(form.model.value);
	var response =JSON.parse(document.moledit.getProperties());

	if (document.form.nlayer.value > 1)
		form.cartesianCoordinates.checked = true;
	if (form.cartesianCoordinates.checked)
		getGeometry("XYZFormat", "", form.geometry, false);
	else
		getGeometry("OrcaFormat", "", form.geometry, false);
	
	getGeometry("XYZFormat", "writeUnitCell=true", form.cartesian, false);
	getGeometry("ConnectionFormat", "", form.connections, false);
	getGeometry("ZMatrixFormat", "", form.zmatrix, false);
	getGeometry("ChargeFormat", "", form.charges, false);
	getFragments(form.fragments);
		
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
	// Ensure AutoAux is selected for NMR calculations
	temp = form.templateId.options[form.templateId.selectedIndex].text;
	if (temp == "NMR")
		form.auxBasisSet.selectedIndex = 1;

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

function OnChangeMethodB(form)
{
	if (form.methodB.selectedIndex == form.methodB.length - 1)
	{
		var text = window.prompt("Enter method", "HF 3-21G");

		form.methodB.options[form.methodB.selectedIndex].value = text;
		form.methodB.options[form.methodB.selectedIndex].text = "Other (" + text + ")";
	}
}

function OnChangeMultiplicity(form)
{
	var mult = form.multiplicity[form.multiplicity.selectedIndex].value;
}

function init_orca_options(form)
{
	//remove ONIOM-related options if nlayer < 2
	if (document.form.nlayer.value < 2) {
		for (var i = 0; i < templateVariablesUsed.length; i++) {
			const index = templateVariablesUsed[i].indexOf("methodB");
			if (index >= 0)
				templateVariablesUsed[i].splice(index, 1);
		}
	}
	OnChangeTemplateId(form);
}