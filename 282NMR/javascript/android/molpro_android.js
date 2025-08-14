function SubmitJob(form,preview)
{
	moledit.setModelFromBuilder();

        if (form.cartesianCoordinates.checked) getGeometry("MolproCartesianFormat", "", form.geometry, false);
        else getGeometry("MolproFormat", "", form.geometry, false);

	var response =JSON.parse(moledit.getProperties());
		
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
