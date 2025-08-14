function InitList()
{
	if (typeof(document.form.engine.length)!="undefined")
	{
		ChangeInterface(defaultEngine);
		for (i = 0; i < form.engine.length; i++)
			if (form.engine[i].value == defaultEngine)
				form.engine[i].checked = true;
	}
	else
	{
		ChangeInterface(document.form.engine.value);
		document.form.engine.checked = true;
	}
	document.form.server.selectedIndex=defaultServer;
}

function DeleteAllServers()
{
	var length = document.form.server.length;
	for (i = 0; i < length; i++)
	{
		document.form.server.options[0] = null;
	}
}
		
function AddServer(text, value, selected)
{
	var optionName = new Option(text, value, selected, selected);
	var length = document.form.server.length;
	document.form.server.options[length] = optionName;
}
