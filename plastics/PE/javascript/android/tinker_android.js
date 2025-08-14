function SubmitJob(form,preview)
{
	if (form.geometryIndex2.value != "") {
		var geometry2JSON;
		if (!(geometry2JSON = fetchGeometryFromJobNumber(form.geometryIndex2.value))) {
			//If data is not ready yet
			setTimeout("SubmitJob(form," + preview + ")", 100);
			return;
		}

		setGeometry(geometry2JSON);

		setForceField(form.forcefield.value);
		getGeometry("TinkerFormat", "", form.geometry2, false);
	}
	
	moledit.setModelFromBuilder();
	var response =JSON.parse(moledit.getProperties());
	
	setForceField(form.forcefield.value);
	getGeometry("TinkerFormat", "", form.geometry, false);
	
	getGeometry("XYZFormat", "writeUnitCell=true", form.cartesian, false);
	getGeometry("ConnectionFormat", "", form.connections, false);
	getGeometry("ZMatrixFormat", "", form.zmatrix, false);
	getGeometry("ChargeFormat", "", form.charges, false);
	
	DoSubmitJob(form, preview);	
}
