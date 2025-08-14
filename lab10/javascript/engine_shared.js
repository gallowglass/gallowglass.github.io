function fetchGeometryFromJobNumber(jobNumber) {
	function GeometryFetcher(jobNumber) {
		this.init = false
		this._ready = 0;
   		this.ready = function() {
	 		return this._ready == 3;
       	};			
			
		$.get(url_getGeometry + "?format=xyz&jobNumber=" + jobNumber,
			function(data) {
				geometry2Fetcher.xyz = data;
				geometry2Fetcher._ready++;
       		});
       	$.get(url_getGeometry + "?format=zmatrix&jobNumber=" + jobNumber,
			function(data) {
				geometry2Fetcher.zmatrix = data;
				geometry2Fetcher._ready++;
       		});
       	$.get(url_getGeometry + "?format=connections&jobNumber=" + jobNumber,
			function(data) {
				geometry2Fetcher.connections = data;
				geometry2Fetcher._ready++;
       		});	
	}				
				
	if (this.geometry2Fetcher == null)
		this.geometry2Fetcher = new GeometryFetcher(jobNumber);
					
	if (!this.geometry2Fetcher.ready())
		return "";
       			
	var jsondata = JSON.stringify(this.geometry2Fetcher);
	this.geometry2Fetcher = null;
    
	return jsondata;
}

function getGeometry(format,options,field,append) {
	var JSONgeometry = JSON.parse(document.moledit.getGeometry(format, options));
	if (append)
		field.value += JSONgeometry.geometry;
	else
		field.value = JSONgeometry.geometry;
}

function setGeometry(jsonData) {
	document.moledit.setGeometry(jsonData);
}

function BuildMolecule(form)
{
	form.operation.value="BuildMolecule";
	form.target="_self";
	form.submit();		
}
		
function ChooseEngine(form)
{
	form.operation.value="ChooseEngine";
	form.target="_self";
	form.submit();
}

function DoSubmitJob(form, preview)
{
	form.jobName.value = form.jobName.value.replace(/^\s+|\s+$/, ''); //trim
	if (form.jobName.value == "")
	{
		alert("You must enter a job name before submitting this job");
		return;
	}
	if (form.charge)
	{
		if (form.charge.value == "")
		{
		 	alert("You must specify the charge before submitting this job");
		 	return;
		}
		var temp = parseInt(form.charge.value,10);
		if (isNaN(temp))
		{
		   	alert("You must specify the charge before submitting this job");
		   	return;
		}
		form.charge.value = temp;
	}
	if (form.ppn)
	{
		if (form.ppn.value < ppnMin)
		{
			alert("Specified number of processors / node is less than minimum (" + ppnMin + ").");
			return;
		}
		if (form.ppn.value > ppnMax)
		{
			alert("Specified number of processors / node is greater than maximum (" + ppnMax + ").");
			return;
		}
	}
	if (form.nodes)
	{
		if (form.nodes.value < nodesMin)
		{
			alert("Specified number of nodes is less than minimum (" + nodesMin + ").");
			return;
		}
		if (form.nodes.value > nodesMax)
		{
			alert("Specified number of nodes is greater than maximum (" + nodesMax + ").");
			return;
		}
	}
	
	var temp = form.templateId.options[form.templateId.selectedIndex].text;
	if (temp.substring(0, 5) == "Other")
	{
		form.jobDescription.value = temp.substring(7, temp.length - 1);
	}
	else
	{
		form.jobDescription.value = form.templateId.options[form.templateId.selectedIndex].text;
	}
	
	/* Confirm regarding which input file we are going to submit, if necessary */
	if (form.inputFile.value != "" && !preview)
	{
		if (document.getElementById('content4').style.display == 'none')
		{
			if (!window.confirm("This will submit the original (un-edited) input file.  Continue?"))
				return;
		}
		else
		{
			if (!window.confirm("This will submit the edited input file.  Continue?"))
				return;
		}
	}
		
	/* Check if we are in the preview panel */
	if (document.getElementById('content4').style.display == 'none')
		form.inputFile.value = "";
	if (preview)
	{
		form.target = "preview";
		form.operation.value="PreviewInputFile";
	}
	else
	{
		if (submitted)
			return;
		submitted = 1;
		form.target = "_self";
		form.operation.value="SubmitJob";
		disableHiddenVariables(); //so unused variables are not submitted
	}
	form.submit();
}

function CheckInfoText()
{
	if (document.getElementById('content4').style.display == 'none')
	{
		document.getElementById('info_text').style.display='block';
		document.getElementById('info_text_preview').style.display='none';
	}
	else
	{
		document.getElementById('info_text').style.display='none';
		document.getElementById('info_text_preview').style.display='block';
	}
}

function EditTemplates(form, engine)
{
	form.operation.value="EditTemplates";
	form.target="_self";
	form.submit();
}

function ReadJobOptions(form, engine)
{
	var hasStructureChanged=document.form.hasStructureChanged.value;
	var job_options = form.jobOptions.value.split("\n");
	for (i = 0; i < job_options.length; i++)
	{
		//dont' use split here, since the value could contain an =
		var delim = job_options[i].indexOf('=');
		var key = job_options[i].substr(0,delim);
		var val = job_options[i].substr(delim+1);
		val = val.replace("\r", ""); //hack for IE
		
		//make sure the job options correspond with the CURRENT ENGINE, otherwise do NOTHING
		if (key == 'jobEngine')
		{
			if (val != engine)
				break;
		}
		
		if (hasStructureChanged == 'true')
		{
			//don't set the name, charge, or multiplicity if the structure has changed since last time!
			if (key == 'jobName' || key == 'charge' || key == 'multiplicity')
				continue;
		}
		
		var elems = document.getElementsByName(key);
		if (elems == null)
			continue;
		var elem = elems[0];
		if (elem == null)
			continue;
		
		if (elem.type == 'text')
		{
			elem.value = val;
		}
		else if (elem.type == 'select-one')
		{
			var set = false;
			for (j = 0; j < elem.options.length; j++)
				if (elem.options[j].value == val)
				{
					elem.selectedIndex = j;
					elem.disabled = false;
					set = true;
				}
			//handle the case the user had chosen an 'other' value
			if (!set)
			{
				var lastOption = elem.options[elem.options.length-1];
				if(lastOption.text.substring(0,5) == "Other")
				{
					lastOption.value = val;
					lastOption.text = "Other (" + val + ")";
					elem.selectedIndex = elem.options.length - 1;
				}
			}
		}
		else if (elem.type == 'checkbox')
		{
			if (val == 'on')
				elem.checked = true;
		}
	}
	
	hideUnusedVariables();
}

function InitJobOptions(form)
{
		//Make sure a reasonable multiplicity is set
		if (form.singlet.value != "1")
		{
			if (form.multiplicity)
				form.multiplicity.selectedIndex = 1;
			if (form.spin)
				form.spin.selectedIndex = 1;
		}
		
		//make sure Cartesians are selected as a default, if necessary
		if (form.suggestCartesians.value == "true")
			if (form.cartesianCoordinates)
				form.cartesianCoordinates.checked = true;
			
		//setup coordinate scane
		var i;
		if (form.scan.value == "true")
			for (i = 0; i < form.templateId.options.length; i++)
				if (form.templateId.options[i].text == "Coordinate Scan") {
					form.templateId.selectedIndex = i;
					form.cartesianCoordinates.checked = false; //don't use cartesian coordinates when scanning!
				}
}



var templateVariablesStatic = [ 'jobName', 'templateId', 'cartesianCoordinates', 'checkpointFile', 'saveCheckpointFile', 'ppn', 'nodes', 'nodeType', 'resourceList', 'peEnvironment' ];
//Create a hash mapping one set of variables (used in a template) with the equivalent name
//that is actually used in the form
var templateVariableMapping = new Object();
templateVariableMapping["geometry2"] = "geometryIndex2";

function hideUnusedVariables()
{
	var templateIndex = document.form.templateId.selectedIndex;	
	//first hide all elements in the tab pages by default
	var tabIds = [ 'content1', 'content2', 'content3' ];
	for (ids = 0; ids < tabIds.length; ids++)
	{
		var tabpage = document.getElementById(tabIds[ids]);
		if (tabpage != null)
		{
			var elems = tabpage.getElementsByTagName('input');
			for (var i=0; i < elems.length; i++)
			{
				//hide the ROW containing this item
				if (elems[i].type != 'button')
				{
					elems[i].parentNode.parentNode.style.display="none";
				}
			}
			elems = tabpage.getElementsByTagName('select');
			for (var i=0; i < elems.length; i++)
			{
				//hide the ROW containing this item
				//hack to never hide pseudopotential information
				if (elems[i].name.indexOf("pseudopotential") == -1)
					elems[i].parentNode.parentNode.style.display="none";
			}					
		}	
	}

	//now selectively show the desired items
	var shownVariables = templateVariablesStatic.concat(templateVariablesUsed[templateIndex]);
	for (var i=0; i <shownVariables.length; i++)
	{
		var variable = templateVariableMapping[shownVariables[i]] == null ? shownVariables[i] : templateVariableMapping[shownVariables[i]];
		var elem = document.getElementsByName(variable)[0];
		//show the ROW containing this item
		if (elem != null &&
			elem.parentNode.parentNode.tagName == "TR")
		{
			//revert back to default display style
			elem.parentNode.parentNode.style.display="";
		}
	}
}

function disableHiddenVariables()
{
	var templateIndex = document.form.templateId.selectedIndex;
	//first hide all elements in the tab pages by default
	var tabIds = [ 'content1', 'content2', 'content3' ];
	for (ids = 0; ids < tabIds.length; ids++)
	{
		var tabpage = document.getElementById(tabIds[ids]);
		if (tabpage != null)
		{
			var elems = tabpage.getElementsByTagName('input');
			for (var i=0; i < elems.length; i++)
			{
				if (elems[i].parentNode.parentNode.style.display=="none")
					elems[i].disabled=true;
			}
			elems = tabpage.getElementsByTagName('select');
			for (var i=0; i < elems.length; i++)
			{
				if (elems[i].parentNode.parentNode.style.display=="none")
					elems[i].disabled=true;
			}					
		}	
	}	
}

function fixSelectTagsForiOS()
{
	//On iOS, the UIWebView has issues if some javascript code (e.g. alert, prompt) fires
	//while the "SELECT" tag is open; so delay it a bit!
	var elems = document.getElementsByTagName('select');
	for (var i=0; i < elems.length; i++)
	{
		var func = elems[i].onchange;
		if (func != null)
		{
			//This mess simply calls the onchange function 250 ms later; a closure is needed
			//to ensure that the function pointer remains in scope
			elems[i].onchange = (function(funcx) { return function() {setTimeout(funcx, 250);} })(func);
		}
	}
}

function Help()
{
	window.open(url_htmlBase+'help/JobOptions.html');
}

