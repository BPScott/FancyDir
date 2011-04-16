$(function() {
//Get the filename elements now rather than on every keyup
var filenameeles = $('table tr:gt(1) td:nth-child(2) a');

//Striped rows
$('table tr:gt(0):odd').addClass('alt');

//Search box
$('<input type="text" id="filter" title="Search"/>').blur(function (){
	if (this.value === '') { $(this).val(this.title).addClass('hint'); }
}).focus(function (){ 
	if (this.value === this.title) { $(this).val('').removeClass('hint'); } 
}).keyup(function(e){
	//short circuit empty search box	
	if (this.value === '') {
		//force everything to show and reset striped rows
		$('table tr:gt(0)').each(function(i){
			this.style.display = 'table-row';
			this.className = ((i % 2) ? 'alt' : '');
		});
	}
	else {
		var filterregex = new RegExp(this.value, "i"), i=0;
		filenameeles.each(function() {
			//parentNode.parentNode shall be the tr
			if (filterregex.test(this.innerHTML)){
				this.parentNode.parentNode.style.display = 'table-row';
				//Work out the striped rows as we go
				this.parentNode.parentNode.className = ((++i % 2)? 'alt' : '');
			}
			else {
				this.parentNode.parentNode.style.display = 'none';
			}
		});
	}
}).blur().insertBefore('h1');


//Turn directory name into breadcrumb links
var heading = document.getElementsByTagName('h1')[0];
var breadcrumbs = heading.innerHTML.match(/[^:]*: (.*)\//)[1].split('/');
var pathsofar = document.location.protocol + '//';

for (var i in breadcrumbs) {
	pathsofar += breadcrumbs[i] + '/';
	breadcrumbs[i] = ('<a href="' + pathsofar + '">' + decodeURI(breadcrumbs[i]) + '</a>');
}
heading.innerHTML = heading.innerHTML.replace(/: (.*)\//, ': ' + breadcrumbs.join('/') + '/');


//fix for IE 6 not knowing of some CSS selectors  - Yes I know browser sniffing is bad and this shouldn't make a difference to other browsers, but you can't be too careful
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
}

});
