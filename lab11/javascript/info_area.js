function getCookie(name)
{
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1)
	{
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
	}
	else
	{
		begin += 2;
	}
	var end = document.cookie.indexOf(";", begin);
	if (end == -1)
	{
		end = dc.length;
	}
	return unescape(dc.substring(begin + prefix.length, end));
}

function Collapse()
{
	document.getElementById('info_area').style.display='none';
	document.getElementById('expand').style.display='block';
	document.cookie="showInfoArea=false";
}
		
function Expand()
{
	document.getElementById('info_area').style.display='block';
	document.getElementById('expand').style.display='none';
	document.cookie="showInfoArea=true";
}

function CheckInfoArea()
{
	if (getCookie('showInfoArea') == 'false') Collapse();
}