function SubmitJob(form,preview) {
	document.moledit.setModel(form.model.value);
	var response =JSON.parse(document.moledit.getProperties());

	if (form.cartesianCoordinates.checked)
		getGeometry("XYZFormat", "", form.geometry, false);
	else
		getGeometry("QChemFormat", "", form.geometry, false);
	
	getGeometry("XYZFormat", "writeUnitCell=true", form.cartesian, false);
	getGeometry("ConnectionFormat", "", form.connections, false);
	getGeometry("ZMatrixFormat", "", form.zmatrix, false);
	getGeometry("ChargeFormat", "", form.charges, false);
	
	// If NBOs are selected, we NEED a checkpoint file to get the NBO data files out
	var text = form.templateId.options[form.templateId.selectedIndex].text;
	if (text == "Natural Bond Orbitals")
		form.saveCheckpointFile.checked = true;
	
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
	if (mult != 1)
	{
		form.unrestricted.checked = true;
		form.nRoots.disabled=false;
		form.nLowSpin.disabled=true;
		form.nHighSpin.disabled=true;
	}
	else
	{
		form.unrestricted.checked = false;
		form.nRoots.disabled=true;
		form.nLowSpin.disabled=false;
		form.nHighSpin.disabled=false;
	}
}

function FreezeCore()
{
	if (document.form.freezeCore.checked)
		document.form.nFrozenCore.disabled=true;
	else
		document.form.nFrozenCore.disabled=false;
}

//hack to handle change of variable names for EOM stuff
$(document).ready( function() {
	var dropdown = $('[name="EOM_TYPE"]');
	dropdown.on("change", function() {
		var eom_type = $('[name="EOM_TYPE"]').val();
		
		dropdown.parent().parent().parent().find('td:contains("States")').html(eom_type + " States");
		dropdown.parent().parent().parent().find('td:contains("Singlets")').html(eom_type + " Singlets");
		dropdown.parent().parent().parent().find('td:contains("Triplets")').html(eom_type + " Triplets");
		
		if (eom_type == 'SF' || eom_type == 'IP' || eom_type == 'EA') {
			dropdown.parent().parent().parent().find('tr:contains("Singlets")').hide();
			dropdown.parent().parent().parent().find('tr:contains("Triplets")').hide();
		} else {
			dropdown.parent().parent().parent().find('tr:contains("Singlets")').show();
			dropdown.parent().parent().parent().find('tr:contains("Triplets")').show();
		}
		
	});
});