$(document).ready(function() {
(function() {
	//hide refresh-related items
	$('#refresh_span').hide();
	//settings
	var fadeSpeed = 200, fadeTo = 0.5, threshold = 30;
	var topbarME = function() { $('#toolbar').fadeTo(fadeSpeed,1); }, topbarML = function() { $('#toolbar').fadeTo(fadeSpeed,fadeTo); };
	var inside = false;
	//do
	$(window).scroll(function() {
		position = $(window).scrollTop();
		positionFromBottom = $(document).height() - $(window).height() - $(document).scrollTop();
		if(position > threshold && !inside) {
			//add events
			topbarML();
			$('#toolbar').bind('mouseenter',topbarME);
			$('#toolbar').bind('mouseleave',topbarML);
			inside = true;
		}
		else if (position < threshold || positionFromBottom < threshold){
			topbarME();
			$('#toolbar').unbind('mouseenter',topbarME);
			$('#toolbar').unbind('mouseleave',topbarML);
			inside = false;
		}
	});
})();
});

function Init(form) {
	form.operation.value="Init";
	DoAjaxRefresh(form);
}

function ShowAll(form) {
	form.operation.value="ShowAll";
	form.submit();
}

function Save(form) {
	form.operation.value="Save";
	form.submit();
}

function Refresh(form) {
	form.operation.value="Refresh";
	DoAjaxRefresh(form);
}

var refreshTimeout;
function ScheduleRefresh(form) {
	var refreshRate = 10000; // refresh with new data every 10 seconds
	if (document.getElementById('autorefresh').checked)
		refreshTimeout = window.setTimeout('Refresh(document.form)', refreshRate);
	else
		window.clearTimeout(refreshTimeout);
}

function DoAjaxRefresh(form){	
	$.ajax({ // create an AJAX call...
		dataType: "json",
		data: $(form).serialize(), // get the form data
		type: $(form).attr('method'), // GET or POST
		url: $(form).attr('action'), // the file to call
		beforeSend: function() {
			document.body.style.cursor = 'wait';
		},
	success: function(response) { // on success..
		form.curPos.value = response.curPos;
		$('#raw_output').text($('#raw_output').text() + unescape(response.contents)); // update the output
		document.body.style.cursor = 'default';
								
		if (response.jobStatus == 'running') {
			//show refresh-related items
			$('#refresh_span').fadeIn();
			//scroll to bottom
			window.scrollTo(0,document.body.scrollHeight);
			//schedule an auto-refresh
			ScheduleRefresh();
		} else {
			//hide refresh-related items
			$('#refresh_span').fadeOut();
		}
		
		//Update the status text
		var fileSize = formatSize(response.fileSize, true);
		var displayedSize = $('#raw_output').text().length;

		$('#showall').html('Show all (' + formatSize(displayedSize, false)+'/' + fileSize + ')');		
		if (response.fileSize > displayedSize)
			$('#showall').fadeIn();
		else
			$('#showall').fadeOut();
	}
});
}

function formatSize(size, addUnits) {
	var formattedSize;
	if (size > 1e7) {
		formattedSize = Math.round(size / (1024*1024));
		if (addUnits)
			formattedSize += " MB";
	}
	else {
		formattedSize = Math.round(size / (1024));
		if (addUnits)
		formattedSize += " kB";
	}
	return formattedSize;
}