(function(){
function addEvent(obj, type, fn) {
	if (obj.addEventListener){
		obj.addEventListener( type, fn, false );
	}
	else if (obj.attachEvent) {
		obj["e"+type+fn] = fn;
		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); };
		obj.attachEvent( "on"+type, obj[type+fn] );
	}
}

var tableRows = document.getElementsByTagName('tr'); //this includes the first item, which we never want

//Get the filename elements now rather than on every keyup
var filenameEles = [], i;
for (i=1; i< tableRows.length; i++) {
	var linkEle = tableRows[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0];
	if (linkEle.innerHTML !== "Parent Directory") { filenameEles.push(linkEle); }
}

var heading = document.getElementsByTagName('h1')[0];

//Striped rows
for (i=1; i< tableRows.length; i++) {
	tableRows[i].className = (i % 2 ? '' : 'alt');
}

//Search box
var searchBox = document.createElement('input');
searchBox.id = 'filter';
searchBox.type = 'text';
searchBox.title = 'Search';
searchBox.className = 'hint';
searchBox.value = searchBox.title;

addEvent(searchBox, 'blur', function(){
	if (this.value === '') { this.value = this.title; this.className = 'hint'; }
});

addEvent(searchBox, 'focus', function(){ 
	if (this.value === this.title) { this.value = ''; this.className = ''; } 
});

addEvent(searchBox, 'keyup', function(){
	var i;
	//short circuit empty search box	
	if (this.value === '') {
		//force everything to show and reset striped rows
		for (i in filenameEles) {
			filenameEles[i].parentNode.parentNode.style.display = '';
			filenameEles[i].parentNode.parentNode.className = ((i % 2) ? '' : 'alt');
		}
	}
	else {
		var filterregex = new RegExp(this.value, "i"), j=0;
		for (i in filenameEles) {
			var ele = filenameEles[i];
			//parentNode.parentNode shall be the tr
			if (filterregex.test(ele.innerHTML)) {
				ele.parentNode.parentNode.style.display = '';
				//Work out the striped rows as we go
				ele.parentNode.parentNode.className = ((j++ % 2) ? '' : 'alt');
			}
			else {
				ele.parentNode.parentNode.style.display = 'none';
			}
		}
	}
});

heading.parentNode.insertBefore(searchBox, heading);


//Turn directory name into breadcrumb links
var breadcrumbs = heading.innerHTML.match(/[^:]*: (.*)\//)[1].split('/');
var pathsofar = document.location.protocol + '//';

for (i in breadcrumbs) {
	pathsofar += breadcrumbs[i] + '/';
	breadcrumbs[i] = ('<a href="' + pathsofar + '">' + decodeURI(breadcrumbs[i]) + '</a>');
}
heading.innerHTML = heading.innerHTML.replace(/: (.*)\//, ': ' + breadcrumbs.join('/') + '/');
})();