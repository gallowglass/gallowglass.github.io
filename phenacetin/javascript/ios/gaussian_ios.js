function SubmitJob(form, preview) {

	if (form.geometryIndex2.value != "") {
		var geometry2JSON;
		if (!(geometry2JSON = fetchGeometryFromJobNumber(form.geometryIndex2.value))) {
			//If data is not ready yet
			setTimeout("SubmitJob(form," + preview + ")", 100);
			return;
		}

		setGeometry(geometry2JSON);

		if (form.cartesianCoordinates.checked) getGeometry("XYZFormat", "writeUnitCell=true", form.geometry2, false);
		else getGeometry("GaussianFormat", "", form.geometry2, false);

		if (form.includeConnectivity.checked) getGeometry("GaussianConnectivityFormat", "", form.geometry2, true);
	}

	bridge.send("setModelFromBuilder");
	bridge.send("getProperties",

	function (responseData) {
		var response = JSON.parse(responseData);
		if (response.nperiodic > 0) {
			document.form.cartesianCoordinates.checked = true; //makes no sense in internal coords
			document.form.includeConnectivity.checked = false; //seems to be a bug in g09 reading connectivity with 3D periodic (?)
		}
		if (response.dimFixed > 0 || response.dimScanned > 0) document.form.redundantInternals.value = 1;
	});
	
	if (form.checkpointFile.selectedIndex != 0) form.includeConnectivity.checked = false;
	
	if (form.cartesianCoordinates.checked) getGeometry("XYZFormat", "writeUnitCell=true", form.geometry, false);
	else getGeometry("GaussianFormat", "", form.geometry, false);

	getGeometry("XYZFormat", "writeUnitCell=true", form.cartesian, false);
	getGeometry("ConnectionFormat", "", form.connections, false);
	getGeometry("ZMatrixFormat", "", form.zmatrix, false);
	getGeometry("ChargeFormat", "", form.charges, false);

	if (form.includeConnectivity.checked) getGeometry("GaussianConnectivityFormat", "", form.geometry, true);

	bridge.send("DONE",

	function (responseData) {
		if (!form.cartesianCoordinates.checked && form.includeConnectivity.checked) {
			form.geometry.value = switchModredundantAndConnectivity(form.geometry.value);
			form.geometry2.value = switchModredundantAndConnectivity(form.geometry2.value);
		}

		DoSubmitJob(form, preview);
	});
}