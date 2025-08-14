function JumpToBottom()
{
	window.location.hash="Bottom";
}

function DoAjaxRefresh(form)
{
	//For fallback purposes
	var useAjax = 1;
	
	if (useAjax)
	{
		$.ajax({ // create an AJAX call...
			data: $(form).serialize(), // get the form data
        	type: $(form).attr('method'), // GET or POST
        	url: $(form).attr('action'), // the file to call
        	beforeSend: function() {
        		document.body.style.cursor = 'wait';
        	},
        	success: function(response) { // on success..
	            $('#job_list').hide().html($('#job_list' , response).html()).fadeIn(); // update the job list
	            $('#filters').html($('#filters' , response).html()); // update the filters
	            $('#filters_header').html($('#filters_header' , response).html()); // update the filters
            	$('#info_area').html($('#info_area' , response).html()); // update the info area on the left
				if (typeof document.form.trashJobs != 'undefined')
					document.form.trashJobs.value = $('[name="trashJobs"]' , response).val(); //update number of jobs in trash
            	document.body.style.cursor = 'default';
				
				CheckAutoRefresh(document.form);
				PrepareJobEntryHandlers();
        	}
    	});
	}
	else
	{
		form.target = "_self";
		form.submit();
	}
}

function PrepareJobEntryHandlers()
{
	//Setup handlers for indicating selected jbos
	$(".job_entry").find('input').change(function(){
		var tr = $(this).parent().parent();
		if (this.checked) {
			tr.addClass("job_entry-selected");
			if (typeof(isAdmin) == 'undefined')
				tr.draggable('enable');
		} else {
			tr.removeClass("job_entry-selected");
			tr.draggable('disable');
		}
	});
	$(".job_entry").draggable({
		helper: function() {
			var selected_jobs = $(".job_entry-selected").length;
			return $("<div class='tool_tip'>Move " + selected_jobs + " job(s)</div>");
		},
		cursorAt: { left: 0 }
	});
	$(".job_entry").find('input').change(); //trigger a change to make sure the class is updated upon refresh
	$(".folder").droppable({
		drop: function( event, ui ) {
			var folder_index = $(this).attr('folder_index');
			if (folder_index != 'current')
				MoveTo(document.form, folder_index);
		},
		hoverClass: "drop_hover"
	});
}

function Refresh(form)
{
	form.operation.value="Refresh";
	DoAjaxRefresh(form);
}

function Filter(form)
{
	form.operation.value="Filter";
	DoAjaxRefresh(form);
}

function OnChangeFilterDate(form)
{
	var selectedOption = form.filterDate.options[form.filterDate.selectedIndex];
	if (form.filterDate.selectedIndex == form.filterDate.options.length - 1)
	{
		var date = new Date();
		var endDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + (date.getFullYear() - 2000);
		var beginDate;
		if (date.getMonth() > 0)
			beginDate = (date.getMonth() + 0) + "/" + date.getDate() + "/" + (date.getFullYear() - 2000);
		else
			beginDate = 12 + "/" + date.getDate() + "/" + (date.getFullYear() - 2000 - 1);
		
		var dateRange = window.prompt("Enter desired date range (e.g. 6/5/11-9/7/11):", beginDate + "-" + endDate)
		if (dateRange != null && dateRange != "")
		{
			selectedOption.value = "date_range:" + dateRange;
			Filter(document.form);
		}
		else
			form.filterDate.selectedIndex = 0;
	}
}

function Search(form)
{
	form.operation.value="Search";
	DoAjaxRefresh(form);
}

function CheckEnterSearch(e,form)
{
	var characterCode; //literal character code will be stored in this variable
	if(e && e.which) //if which property of event object is supported (NN4)
		characterCode = e.which; //character code is contained in NN4's which property
	else
		characterCode = e.keyCode; //character code is contained in IE's keyCode property

	if (characterCode == 13) //enter key
	{
		e.preventDefault();
		Search(form);
	}
}

function Delete(form)
{
	form.operation.value="Delete";
	if (form.folder.value == -1 && !window.confirm("Are you sure you want to permanently delete the selected jobs?"))
		return;
	DoAjaxRefresh(form);
}

function Download(form)
{
	var TotalOn = CheckCheckAll(true);
	if (TotalOn == 0)
	{
		alert("You must select at least one job to download.");
		return;
	}
	
	form.operation.value="Download";
	form.target = "_self";
	form.submit();
}

function Spreadsheet(form)
{
	var TotalOn = CheckCheckAll(true);
	if (TotalOn == 0)
	{
		alert("You must select at least one job to summarize.");
		return;
	}
	
	form.operation.value="Spreadsheet";
	form.target = "_self";
	form.submit();
}

function JSONOutput(form)
{
	var TotalOn = CheckCheckAll(true);
	if (TotalOn == 0)
	{
		alert("You must select at least one job to summarize.");
		return;
	}
	
	form.operation.value="JSONOutput";
	form.target = "_self";
	form.submit();
}

function ExportJobs(form)
{
	var TotalOn = CheckCheckAll(true);
	if (TotalOn == 0)
	{
		alert("You must select at least one job to export.");
		return;
	}
	
	form.operation.value="ExportJobs";
	form.target = "_self";
	form.submit();
}

function ViewJob(form, jobNumber, newTab)
{
	newTab = newTab || false;
	form.operation.value="ViewJob";
	if (form.viewJobInNewWindow.value == 1 || newTab)
		form.target = "_blank";
	else
		form.target = "_self";
	form.jobNumber.value=jobNumber;
	
	if (iOS)
		bridge.send("closeAndWait");
	if (android)
		moledit.closeAndWait();
	
	form.submit();
}

function ViewNotes(form, jobNumber)
{
	$( "#notes_dialog" ).dialog({
		autoOpen: true,
		modal: true,
		width: 400,
		height: 400,
		buttons: { 
			"Close": function() { $(this).dialog("close"); }
		},
		open: function(event, ui) {
			$(this).load('jobmgr.cgi?operation=ViewNotes&jobNumber='+jobNumber, function() {});
		}
	});
}

function RawOutput(form, jobNumber)
{
	form.operation.value="RawOutput";
	form.target = "_blank";
	form.jobNumber.value=jobNumber;
	form.submit();
}

function KillJob(form, jobNumber)
{
	form.operation.value="KillJob";
	form.jobNumber.value=jobNumber;
	if (!window.confirm("Are you sure you want to abort this job?"))
		return;
	DoAjaxRefresh(form);
}

function CheckAll()
{
	for (var i=0;i<document.form.elements.length;i++)
	{
		var e = document.form.elements[i];
		if ((e.name != 'allbox' && e.name != 'autoRefresh') && (e.type=='checkbox')){
			e.checked = document.form.allbox.checked;
			$(e).change();
		}
	}
}

function CheckCheckAll(forceCheck)
{
	var TotalBoxes = 0;
	var TotalOn = 0;
	if (document.form.elements.length > 70 && !forceCheck) { return; }
	for (var i=0;i<document.form.elements.length;i++)
	{
		var e = document.form.elements[i];
		if ((e.name != 'allbox') && (e.type=='checkbox'))
		{
			TotalBoxes++;
			if (e.checked)
			{
				TotalOn++;
			}
		}
	}
	if (TotalBoxes==TotalOn && TotalBoxes!=0)
		{document.form.allbox.checked=true;}
	else
		{document.form.allbox.checked=false;}

	return TotalOn;
}

function Rename(form)
{
	form.operation.value="Rename";
	form.target = "_self";
				
	var TotalOn = CheckCheckAll(true);
	if (TotalOn != 1)
	{
		alert("You must select exactly one job to rename.");
		return;
	}
	
	// Find the selected job name
	var table = document.getElementById('jobs_list');
	var currentName = "Untitled";
	for (i = 2; i < table.rows.length; i++)
	{
		if (table.rows[i].cells[0].firstChild.checked)
		{
			var cellHTML = table.rows[i].cells[2].innerHTML;
			if (/>.*</.test(cellHTML))
			{
				var match = />(.*)</.exec(cellHTML);
				currentName = match[1];
			}
			else
				currentName = cellHTML;	
		}
	}
	
	form.newJobName.value = window.prompt("Enter new job name:", currentName);
	if (form.newJobName.value != "null" && form.newJobName.value != "")
		DoAjaxRefresh(form);
}

function MoveTo(form,folder)
{
	form.operation.value="MoveTo";
	form.targetFolder.value=folder;
	DoAjaxRefresh(form);
}

function GoTo(form,folder)
{
	form.operation.value="GoTo";
	form.folder.value=folder;
	DoAjaxRefresh(form);
}

function RestartJob(form, jobNumber)
{
	if (iOS)
	{
		//This is a bit of a hack -- the view page will open in the background, causing the molecule to be loaded
		//then the "logout" message will cause the web view to close
		ViewJob(form, jobNumber);
		bridge.send("logout");
		return;
	}
	
	if (android)
	{
		ViewJob(form, jobNumber);
		moledit.logout();
		return;
	}

	form.operation.value="Restart";
	form.target = "_self";
	form.jobNumber.value=jobNumber;
	form.submit();
}

function DoImport(form)
{
	if (form.remotePath.value != "" || form.localFile.value != "")
	{
		if (form.jobName.value == "")
		{
			alert("You must enter a job name before importing this job");
			return;
		}
	}
			
	form.operation.value = "Import";
	form.submit();
}

function ImportJob(form, url)
{
	$( "#import_job_dialog" ).dialog({
		autoOpen: true,
		modal: true,
		width: 500,
		buttons: { 
			"Continue": function() {
				DoImport(document.getElementById("import_form"));
				$(this).dialog("close"); 
			},
			"Cancel": function() { $(this).dialog("close"); }
		},
		open: function(event, ui) {
			if (typeof(isAdmin) != 'undefined')
				$(this).load('import_job_admin.cgi', function() {});
			else
				$(this).load('import_job.cgi', function() {});
		}
	});
}

function About()
{
	$( "#about_dialog" ).dialog({
		autoOpen: true,
		modal: true,
		width: 600,
		height: 300,
		buttons: { 
			"Close": function() { $(this).dialog("close"); }
		},
		open: function(event, ui) {
			$(this).load('about.cgi', function() {});
		}
	});
}

function SelectJob(jobNumber)
{
	$('[name=job_'+jobNumber+']').prop('checked', true);
}

function InitContextMenu()
{
	$.contextMenu({
		selector: 'a.job', 
		items: {
			"open": {name: "Open in new tab", callback: function(key,opt) { ViewJob(document.form, this.attr('data-jobnumber'), true); return true; }},
			"sep1": "---------",
			"download": {name: "Download", callback: function(key,opt){ SelectJob(this.attr("data-jobnumber")); Download(document.form); return true;}},
			"rename": {name: "Rename", callback: function(key,opt){ SelectJob(this.attr("data-jobnumber")); Rename(document.form); return true;}},
			"delete": {name: "Delete", callback: function(key,opt){ SelectJob(this.attr("data-jobnumber")); Delete(document.form); return true;}},
		},
		position: function(opt, x, y) {
      		opt.$menu.position({
				my: 'left+5 top+5',
				at: 'center bottom',
				of: opt.$trigger
			});
    	},
	});
}
