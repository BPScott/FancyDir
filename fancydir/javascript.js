$(document).ready(function() {

//Stripey Rows
$('table tr:gt(0):odd').addClass('alt');

//append search box to the dom
$('h1').before('<input type="text" id="filter" Title="Search"/>');

//text -> title
$('input:text').each(function() {
	var t = $(this);
	var title = t.attr('title'); 
	if (title) {
		t.blur(function (){ if (t.val() == '') { t.val(title).addClass('hint'); } });
		t.focus(function (){ if (t.val() == title) { t.val('').removeClass('hint'); } });
		t.parents('form:first').submit(function(){ if (t.val() == title) { t.val('').removeClass('hint');} });
		t.blur();
	};
});

//Search filter
$('#filter').keyup(function(e) {
	var filterval = $('#filter').val();
	var filterregex = new RegExp(filterval, "i");
	$('table tr:gt(1) td:nth-child(2) a').each(function() {
		if (filterval == '' || filterregex.test($(this).text())) {
			$(this).parents('tr:first').show();
		}
		else {
			$(this).parents('tr:first').hide();
		};
	});
	//reset stripey rows
	$('table tr:visible:gt(0):odd').addClass('alt');
	$('table tr:visible:gt(0):even').removeClass('alt');
});

//Turn directory name into breadcrumb links
breadcrumbs = $('h1').text().match(/[^:]*: (.*)\//)[1].split('/');
pathsofar = document.location.protocol + '//';
$.each(breadcrumbs, function(i) {
	pathsofar = pathsofar + this + '/';
	breadcrumbs[i] = ('<a href="' + pathsofar + '">' + decodeURI(this) + '</a>');
});
$('h1').html($('h1').text().replace(/: (.*)\//, ': ' + breadcrumbs.join('/') + '/'));

//Applying thickbox to relevant links
$('table tr:gt(1) td:nth-child(2) a').each(function() {
	var imageextensions = /\.(jpe?g|png|gif|bmp)$/i;
	var iframeextensions = /\.(txt|htm|html|shtm|shtml|css|js|php|asp|aspx|vb|vbx|c|cs|cpp|rb|java|h|py|cfm|cfc)$/i;
	
	if (imageextensions.test($(this).attr('href'))) {
		$(this).addClass('thickbox').attr('title', $(this).text());
	}
	else if (iframeextensions.test($(this).attr('href'))) {
		$(this).addClass('thickbox').attr('title', $(this).text());
		$(this).attr('href', $(this).attr('href') + '?KeepThis=true&TB_iframe=true&height=400&width=760');
	};
});

//fix for IE6not knowing of some CSS selectors  - Yes I know browser sniffing is bad and this shouldn't make a difference to other borwsers, but you can't be too careful
if (jQuery.browser.msie && jQuery.browser.version == '6.0') {
	$('table tr td:first-child').addClass('IE_fixleftborder');
	$('table td+td+td+td').addClass('IE_fixrightborder');
	$('table tr:first-child th').addClass('IE_fixtopborder');
	$('table').addClass('IE_fixbottomborder');

	$('td:first-child').addClass('IE_fixcol1');
	$('td+td').addClass('IE_fixcol2');
	$('td+td+td').addClass('IE_fixcol3');
	$('td+td+td+td').addClass('IE_fixcol4');
	$('td+td+td+td+td').addClass('IE_fixcol5');
};

});
