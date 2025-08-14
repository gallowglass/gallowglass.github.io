function SubmitJob(form,preview)
{
	moledit.setModelFromBuilder();

        if (form.cartesianCoordinates.checked) getGeometry("XYZFormat", "", form.geometry, false);
        else getGeometry("QChemFormat", "", form.geometry, false);

	var response =JSON.parse(moledit.getProperties());
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
