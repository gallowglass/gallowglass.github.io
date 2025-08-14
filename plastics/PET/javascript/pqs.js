function SubmitJob(form,preview) {
	document.moledit.setModel(form.model.value);

        if (form.cartesianCoordinates.checked)
                getGeometry("XYZFormat", "", form.geometry, false);
        else
                getGeometry("QChemFormat", "", form.geometry, false);

	var response =JSON.parse(document.moledit.getProperties());
	document.form.scanStart.value = response.scanStart;
	document.form.scanStop.value = response.scanStop;
	document.form.scanSteps.value = response.scanSteps;
	document.form.varScanned.value = response.varScanned;
	
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

function OnChangeOptiCoords(form)
{
	if (form.OptiCoords.options[form.OptiCoords.selectedIndex].value == 'cluster')  
	
		form.cartesianCoordinates.checked = true;	
	if (form.OptiCoords.options[form.OptiCoords.selectedIndex].value == 'surface')

						form.cartesianCoordinates.checked = true;
}

function OnChangeTheory(form)
{
	if (form.theory.selectedIndex == form.theory.length - 1)
	{
		var text = window.prompt("Enter theory", "RHF");

		form.theory.options[form.theory.selectedIndex].value = text;
		form.theory.options[form.theory.selectedIndex].text = "Other (" + text + ")";
	}
	if (form.theory.options[form.theory.selectedIndex].value == 'dft')
		form.functional.disabled = false;
	else
		form.functional.disabled = true;
	if (form.theory.options[form.theory.selectedIndex].value == 'semi')
	{	form.semitheory.disabled = false;
		form.basisSet.disabled = true;  }
	else
	{	form.semitheory.disabled = true;
		form.basisSet.disabled = false; }


	if (form.theory.options[form.theory.selectedIndex].value == 'mechanics')
	{	form.forcefield.disabled = false;
		form.basisSet.disabled = true;
		form.semitheory.disabled = true;  }
	else
		form.forcefield.disabled = true; 
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

		function OnChangeSemitheory(form)
		{
				if (form.semitheory.selectedIndex == form.semitheory.length - 1)
				{
						var text = window.prompt("Enter Theory", "PM3");

						form.semitheory.options[form.semitheory.selectedIndex].value = text;
						form.semitheory.options[form.semitheory.selectedIndex].text = "Other (" + text + ")";
				}
		}

		function OnChangeForcefield(form)
		{
				if (form.forcefield.selectedIndex == form.forcefield.length - 1)
				{
						var text = window.prompt("Enter Force Field", "Sybyl");

						form.forcefield.options[form.forcefield.selectedIndex].value = text;
						form.forcefield.options[form.forcefield.selectedIndex].text = "Other (" + text + ")";
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
