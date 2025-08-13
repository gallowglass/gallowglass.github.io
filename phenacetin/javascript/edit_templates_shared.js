function OnLoad(form)
{
	form.operation.value="Load";
	form.submit();
}
		
function OnChangeEngine(form)
{
	form.operation.value="ChangeEngine";
	form.submit();
}

function OnChangeTemplate(form)
{
	form.operation.value="Load";
	form.submit();
}
		
function OnSave(form,is_guest)
{
	if (is_guest) {
		alert("Editing templates not allowed in guest account");
		return;
	}
	form.operation.value="Save";
	form.templateName.value = form.templateId.options[form.templateId.selectedIndex].text;
	form.submit();
}

function OnSaveAs(form,is_guest)
{
	if (is_guest) {
		alert("Editing templates not allowed in guest account");
		return;
	}
	form.operation.value="SaveAs";
	form.templateName.value = window.prompt("Enter job type:", "New calculation");
	// IE7 returns "null" (the literal string!) if the user hasen't allowed prompts
	if (form.templateName.value != "" && form.templateName.value != "null")
		form.submit();
}
		
function OnDelete(form,is_guest)
{
	if (is_guest) {
		alert("Editing templates not allowed in guest account");
		return;
	}
	form.operation.value="Delete";
	if (window.confirm("Are you sure you want to delete this calculation type?"))
		form.submit();
}

function OnCreateVar(form,is_guest)
{
	if (is_guest) {
		alert("Editing templates not allowed in guest account");
		return;
	}
	form.operation.value="CreateVar";
	form.submit();
}

function OnChangeVar(form)
{
	var index = document.form.customVar.selectedIndex;
	if (index < 0)
		return;
	document.form.varDescription.value = varDescriptionList[index];
	document.form.varName.value = document.form.customVar.options[index].value;
	document.form.varType.selectedIndex = varTypeList[index];
	document.form.varDefault.value = varDefaultList[index];
	document.form.varOptions.value = varOptionsList[index];
	OnChangeType(form);
}

function OnChangeType(form)
{
	if (document.form.varType.selectedIndex == 2)
		document.form.varOptions.disabled=false;
	else
		document.form.varOptions.disabled=true;
	
	if (document.form.varType.selectedIndex == 1)
		document.form.varDefault.disabled=true;
	else
		document.form.varDefault.disabled=false;
}

function OnDeleteVar(form,is_guest)
{
	if (is_guest) {
		alert("Editing templates not allowed in guest account");
		return;
	}
	form.operation.value="DeleteVar";
	if (window.confirm("Are you sure you want to delete this variable?"))
		form.submit();
}
	
function Return(form)
{
	form.operation.value="Return";
	form.submit();
}

function Init()
{
	var templates = document.form.templateId.options;
	var engines = document.form.targetEngine.options;	

	for (var i = 0; i < templates.length; i++)
	{
		if (templates[i].value == templateId)
			templates[i].selected = true;
	}
	for (var i = 0; i < engines.length; i++)
	{
		if (engines[i].value == targetEngine)
			engines[i].selected = true;
	}
	if (templateId.substring(0,6) == "global")
	{
		if (username == "admin")
		{
			document.form.delete_btn.disabled = true;
		}
		else
		{
			document.form.save_btn.disabled = true;
			document.form.delete_btn.disabled = true;
		}
	}
	if (templateId.substring(0,6) == "system" && username != "admin")
	{
		document.form.save_btn.disabled = true;
		document.form.delete_btn.disabled = true;
	}
	if (templateId.substring(0,5) == "group" && !is_admin)
	{
		document.form.save_btn.disabled = true;
		document.form.delete_btn.disabled = true;
	}
}