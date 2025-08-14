function ChangeGlobals(form)
{
	form.operation.value="ChangeGlobals";
	form.submit();
}
	
function Suggest(form)
{
	form.operation.value="Suggest";
	form.submit();
}
    		
function ChangeServer(form)
{
	form.operation.value="ChangeServer";
	form.submit();
}
    		
function Return(form)
{
	if (edit_made)
		if (!confirm('Changes have not been submitted. Continue anyway?'))
			return;
		
	form.operation.value="Return";
	form.submit();
}

var edit_made = false;
document.onkeypress = function (e) {
    edit_made = true;
};