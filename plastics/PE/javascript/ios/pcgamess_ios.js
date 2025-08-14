function SubmitJob(form,preview)
{
	bridge.send("setModelFromBuilder");
	bridge.send("getProperties",

	function (responseData) {
		var response = JSON.parse(responseData);
	});

	if (form.cartesianCoordinates.checked) getGeometry("GamessCartesianFormat", "", form.geometry, false);
	else getGeometry("GamessFormat", "", form.geometry, false);
	
	getGeometry("XYZFormat", "writeUnitCell=true", form.cartesian, false);
	getGeometry("ConnectionFormat", "", form.connections, false);
	getGeometry("ZMatrixFormat", "", form.zmatrix, false);
	getGeometry("ChargeFormat", "", form.charges, false);
	
	bridge.send("DONE",

	function (responseData) {
		DoSubmitJob(form, preview);
	});		
}
