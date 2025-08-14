function SubmitJob(form,preview)
{
	bridge.send("setModelFromBuilder");
	bridge.send("getProperties",

	function (responseData) {
		var response = JSON.parse(responseData);
	});

	if (form.cartesianCoordinates.checked) getGeometry("XYZFormat", "", form.geometry, false);
	else getGeometry("QChemFormat", "", form.geometry, false);
	
	getGeometry("XYZFormat", "writeUnitCell=true", form.cartesian, false);
	getGeometry("ConnectionFormat", "", form.connections, false);
	getGeometry("ZMatrixFormat", "", form.zmatrix, false);
	getGeometry("ChargeFormat", "", form.charges, false);
	
	// If NBOs are selected, we NEED a checkpoint file to get the NBO data files out
	var text = form.templateId.options[form.templateId.selectedIndex].text;
	if (text == "Natural Bond Orbitals") form.saveCheckpointFile.checked = true;
	
	bridge.send("DONE",

	function (responseData) {
		DoSubmitJob(form, preview);
	});		
}
		
