//Safari 5.1 will not re-submit a form if it thinks nothing has changed!
//This hack makes it think the form is new!
function safariSafeSubmit()
{
	this.action += '?t=' + new Date().getTime();
        this._submit();
}
//This won't work in IE; no harm done
try
{
	if (navigator.userAgent.indexOf('Safari') != -1)
	{
		HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
		HTMLFormElement.prototype.submit = safariSafeSubmit;
	}
}
catch(e)
{
}
