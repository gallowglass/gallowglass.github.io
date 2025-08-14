function SubmitJob(form,preview)
{
	moledit.setModelFromBuilder();
	var response =JSON.parse(moledit.getProperties());

	if (form.cartesianCoordinates.checked) getGeometry("XYZFormat", "", form.geometry, false);
	else getGeometry("QChemFormat", "", form.geometry, false);
	
	getGeometry("XYZFormat", "writeUnitCell=true", form.cartesian, false);
	getGeometry("ConnectionFormat", "", form.connections, false);
	getGeometry("ZMatrixFormat", "", form.zmatrix, false);
	getGeometry("ChargeFormat", "", form.charges, false);
	
	// If NBOs are selected, we NEED a checkpoint file to get the NBO data files out
	var text = form.templateId.options[form.templateId.selectedIndex].text;
	if (text == "Natural Bond Orbitals") form.saveCheckpointFile.checked = true;
	
	DoSubmitJob(form, preview);	
}
		
