function SubmitJob(form,preview) {
	if (form.geometryIndex2.value != "") {
		var geometry2JSON;
		if (!(geometry2JSON = fetchGeometryFromJobNumber(form.geometryIndex2.value))) {
			//If data is not ready yet
			setTimeout("SubmitJob(form," + preview + ")", 100);
			return;
		}

		setGeometry(geometry2JSON);

		document.moledit.setForceField(form.forcefield.value);
		getGeometry("TinkerFormat", "", form.geometry2, false);
	}
	
	document.moledit.setModel(form.model.value);
	var response =JSON.parse(document.moledit.getProperties());
	
	document.moledit.setForceField(form.forcefield.value);
	getGeometry("TinkerFormat", "", form.geometry, false);
	
	getGeometry("XYZFormat", "writeUnitCell=true", form.cartesian, false);
	getGeometry("ConnectionFormat", "", form.connections, false);
	getGeometry("ZMatrixFormat", "", form.zmatrix, false);
	getGeometry("ChargeFormat", "", form.charges, false);
	
	DoSubmitJob(form, preview);		
}

//Always show 2nd gometry and additional keywords, since Tinker is special
//in that these never show up in the input file
templateVariablesStatic.push('geometry2');
templateVariablesStatic.push('additionalKeywords');
function OnChangeTemplateId(form)
{
	var temp = form.templateId.options[form.templateId.selectedIndex].text;
	if (temp.substring(0, 5) == "Other")
	{
		var text = window.prompt("Enter calculation", "");

		form.calculation.value = text;
		form.templateId.options[form.templateId.selectedIndex].text = "Other (" + text + ")";
	}
	hideUnusedVariables();
}
