function SubmitJob(form,preview)
{
	moledit.setModelFromBuilder();
	var response =JSON.parse(moledit.getProperties());

	if (form.cartesianCoordinates.checked) getGeometry("VaspFormat", "cartesianCoordinates=true", form.geometry, false);
	else getGeometry("VaspFormat", "", form.geometry, false);
	
	getGeometry("XYZFormat", "writeUnitCell=true", form.cartesian, false);
	getGeometry("ConnectionFormat", "", form.connections, false);
	getGeometry("ZMatrixFormat", "", form.zmatrix, false);
	getGeometry("ChargeFormat", "", form.charges, false);
	
	DoSubmitJob(form, preview);		
}
