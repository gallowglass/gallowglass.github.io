function SubmitJob(form,preview)
{
	moledit.setModelFromBuilder();
	var response =JSON.parse(moledit.getProperties());

	if (form.cartesianCoordinates.checked) getGeometry("GamessCartesianFormat", "", form.geometry, false);
	else getGeometry("GamessFormat", "", form.geometry, false);
	
	getGeometry("XYZFormat", "writeUnitCell=true", form.cartesian, false);
	getGeometry("ConnectionFormat", "", form.connections, false);
	getGeometry("ZMatrixFormat", "", form.zmatrix, false);
	getGeometry("ChargeFormat", "", form.charges, false);
	
	DoSubmitJob(form, preview);	
}
