function post_to_url(path, params, target, method, enctype) {
	target = target || "_blank";
	method = method || "post"; // Set method to post by default if not specified.
	enctype = enctype || "application/x-www-form-urlencoded";

	// The rest of this code assumes you are not using a library.
	// It can be made less wordy if you use one.
	var form = document.createElement("form");
	form.setAttribute("method", method);
	form.setAttribute("action", path);
	form.setAttribute("enctype", enctype);

	for (var key in params) {
		if (params.hasOwnProperty(key)) {
			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", key);
			hiddenField.setAttribute("value", params[key]);

			form.appendChild(hiddenField);
		}
	}

	document.body.appendChild(form);
	form.target = target;
	form.submit();
}
