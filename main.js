function showList(id, extraAction)
{
	// pId = "p" + id;
	// switchStyle = $(pId).getStyle('display');
	switchStyle = $('p#'+id).css('display');
	if(switchStyle == 'none')
	{
		// $(pId).show();
		$('p#'+id).show();
            if(extraAction) extraAction();
	}else{
		// $(pId).hide();
		$('p#'+id).hide();
            if(extraAction) extraAction();
	}
	// $(pId).toggleClassName('hack');
	$('p#'+id).toggle('hack');
	// $(id).hasClassName('expandedMenu');
	// $(id).hasClass('expandedMenu');
	// $(id).toggleClassName('expandedMenu');
	$(id).toggle('expandedMenu');
}

function getSidebar(id){
    // $('mapSide').update();
	$('#mapSide').empty();	
    var id1 = (id*1)-1;
    var id2 = (id*1)+1;
    id1 = id1+'';
    id2 = id2+'';
    //clear the sidebar
    // new Ajax.Request('../../../javascripts/maps.json?314786', {
	$.getJSON('../../../javascripts/maps.json?314786', function(data) {
        // method:'get',
		// type:'get',
        //requestHeaders: {Accept: 'application/json'},
        // onSuccess: function(transport){
 
    	  var text = "/*-secure-\n"+data.responseText+"\n*/";
    	  // text=text.evalJSON(true);

    	  var k = text.maps.length;
    	  var counter = 1;
    	  if(id1=='0'){
    	      counter = 2;
    	  }
    	  var category= new Array();

    		  for(l=0;l<k;l++)
    		  {
    		      var mapId = text.maps[l].id;
                    if(mapId ==id1 || mapId ==id2){
                      //if optional thumbnail is present, show it in the map index instead of full image
		              var src = text.maps[l].src;
        		      if(text.maps[l].thumbnail!==undefined){
        		          src = "../../"+text.maps[l].thumbnail;
        		      }
        		      if(counter == 1){
        		          // $('mapSide').insert('<li id="'+text.maps[l].title+'"><a id="'+text.maps[l].title+'a" href="'+text.maps[l].page+'">Previous Map<br/><img width="70px" src="'+src+'" /></a></li>');
        		        	$('#mapSide').append('<li id="'+text.maps[l].title+'"><a id="'+text.maps[l].title+'a" href="'+text.maps[l].page+'">Previous Map<br/><img width="70px" src="'+src+'" /></a></li>');
							counter=counter+1;
        		      }else if(counter == 2){
        		          // $('mapSide').insert('<li id="'+text.maps[l].title+'"><a id="'+text.maps[l].title+'a" href="'+text.maps[l].page+'">Next Map<br/><img width="70px" src="'+src+'" /></a></li>');
        		          $('#mapSide').append('<li id="'+text.maps[l].title+'"><a id="'+text.maps[l].title+'a" href="'+text.maps[l].page+'">Next Map<br/><img width="70px" src="'+src+'" /></a></li>');
        		          counter=1;
        		      }
                    }
    		  }
    	  }
    });
}

function switchView(showId, hideId)
{
	$('#'+hideId).hide();
	$('#'+showId).show();
	$('#switchOption').replace("<a id=\"switchOption\" onclick=\"switchView('"+hideId+"', '"+showId+"');\">Options</a>"); 
}

function sideHighlight(mapId, category){
    var cat = category.split(",");
    var anchor = mapId +'a';
    // var title = $(anchor).title;
    // $(anchor).title = '';
	$('#'+anchor).attr('title','');
    for(i=0;i<cat.length;i++){
        // if($(cat[i]).hasClassName('selected')==false){
		if($(cat[i]).hasClass('selected')==false){
            // $(cat[i]).toggleClassName('highlight');
			$(cat[i]).toggle('highlight');
        }   
    }
}

function sideNormal(category){
    var cat = category.split(",");
    for(i=0;i<cat.length;i++){
        // if($(cat[i]).hasClassName('selected')==false){
		if($(cat[i]).hasClass('selected')==false){
            // $(cat[i]).toggleClassName('highlight');
			$(cat[i]).toggle('highlight');
        }
    }
}

function removeSelected(){
    var highlight = [];
    // highlight = ($$('li.selected'));
	highlight =($'li.selected');
    var a = highlight.length;
    if(a>0){
        for(b=0;b<a;b++){
          // $(highlight[b]).removeClassName('selected');
		$('#'+highlight[b]).removeClass('selected');
        }
    }
}

var mapList = [];
var currentSort = "Newest";
var currentCategory = {};
var startAtMap = 0;
if(window.location.hash.indexOf("#p")===0) {
    startAtMap = parseInt(window.location.hash.substr(2))*9;
}

function loadRandomMaps() {
    // new Ajax.Request('javascripts/maps.json?314786', {
	$.getJSON('../../../javascripts/maps.json?314786', function(data) {
        // method: 'get',
	// onSuccess: function(transport) {
	    // var text = "/*-secure-\n"+tranport.responseText+"\n*/";
		var text = "/*-secure-\n"+data.responseText+"\n*/";
	    // var data = text.evalJSON(true);
	    processRandomMaps(data.maps);
	}
    });
}

function processRandomMaps(maps) {
    var map1, map2;
    if(maps.length<2) return;
    map1 = Math.floor(Math.random()*maps.length);
    do {
        map2 = Math.floor(Math.random()*maps.length);
    } while(map1===map2);
    updateMapTitle(".featuredMapName1", maps[map1].id, maps[map1].title);
    updateMapImage(".featuredMapImage1", maps[map1].id, maps[map1].src);
    updateMapTitle(".featuredMapName2", maps[map2].id, maps[map2].title);
    updateMapImage(".featuredMapImage2", maps[map2].id, maps[map2].src);
    function updateMapTitle(container, id, title) {
        var text = "<a href='mapgallery/maps/detail/index.html?"+id+"#"+id+"'>"+title+"</a>";
        text = "<div class='threeLineAdjust'>"+text+"</div>";
        // $$(container).each(function(div) { div.update(text) });
		$(container).each(function(div) { div.update(text) });
    }
    function updateMapImage(container, id, image) {
        var text = "<img src='mapgallery/"+image+"' width='175' style='max-height:175px' />";
        text = "<a href='mapgallery/maps/detail/index.html?"+id+"#"+id+"'>"+text+"</a>";
        // $$(container).each(function(div) { div.update(text) });
		$(container).each(function(div) { div.update(text) });
    }
}

function loadMapData(callback) {
    // new Ajax.Request('../../../javascripts/maps.json?314786', {
	$.getJSON('../../../javascripts/maps.json?314786', function(data) {
	// method:'get',
	// onSuccess: function(transport) {
	    // var text = "/*-secure-\n"+transport.responseText+"\n*/";
		var text = "/*-secure-\n"+data.responseText+"\n*/";
	    // var data = text.evalJSON(true);
	    callback(data.maps);
	}
    });
}

function loadMapGallery() {
    // new Ajax.Request('../javascripts/maps.json?314786', {
	$.getJSON('../../../javascripts/maps.json?314786', function(data) {
	method:'get',
	//requestHeaders: {Accept: 'application/json'},
	onSuccess: function(transport) {
	    // var text = "/*-secure-\n"+transport.responseText+"\n*/";
		var text = "/*-secure-\n"+data.responseText+"\n*/";
	    // var data = text.evalJSON(true);
	    mapList = data.maps;
	    setupCategoryControls(data.categories);
	    refreshMapGallery();
	}
    });
}

var categoryData = {
    "Health Topic": ["Heart disease", "Stroke"],
    "Impact Area": ["Document burden", "Inform policy"],
    "Data Source": ["Vital Statistics", "CDC Wonder", "NCHS Compressed Mortality"],
    "Location": ["AR", "CO", "MA", "MI", "MT"]
};
var categoryTitle = {
    "Health Topic": "Health Topic",
    "Impact Area": "How the Map is Used",
    "Data Source": "Type of Data Used",
    "Location": "Location"
};
if(typeof CookieJar !== "undefined") {
    cookieJar = new CookieJar({expires:3600*24, path:"/"});
    currentCategory = cookieJar.get("mapFilter");
    if(currentCategory===null) {
	currentCategory = {};
	for(var cat in categoryData) currentCategory[cat] = "(all)";
    }
}

function resetSearchCategories() {
    if(typeof cookieJar !== "undefined") {
	currentCategory = {};
	for(var cat in categoryData) currentCategory[cat] = "(all)";
        cookieJar.put("mapFilter", currentCategory);
    }    
}

var catUpdate = [];
function setupCategoryControls(categoryChoices) {
    text = "";
    var catId = 0;
    for(var cat in categoryData) {
	(function(cat, catId){
	    catUpdate[catId] = function(value){mapCategory(cat, value);};
	    text += "<p><b>"+categoryTitle[cat]+"</b><br />";
	    // text += "<select id='catSelect"+catId+"' onchange=\"catUpdate["+catId+"]($F('catSelect"+catId+"'))\">";
		text += "<select id='catSelect"+catId+"' onchange=\"catUpdate["+catId+"]($('catSelect"+catId+"'))\">";
	    text += "<option value='(all)'>(all)</option>";
	    for(var i=0; i<categoryChoices[cat].length; i++) {
		var item = categoryChoices[cat][i];
		text += "<option value='"+item+"'"+((item===currentCategory[cat])?" selected":"")+">"+item+"</option>";
	    }
	    text += "</select></p>";
	})(cat, catId);
	catId++;
    }
    // $("categoryControls").update(text);
	$('#categoryControls').replaceWith(text);
}

// produce filteredList from mapList, containing only the maps that match currentCategory
function filteredMapList(mapList) {
    var filteredList = [];
    for(var i=0; i<mapList.length; i++) {
	var map = mapList[i];
	var isInCategory, isShown = true;

	for(var j2 in currentCategory) if(currentCategory[j2]!=="(all)") {
	    isInCategory = false;
	    for(var j=0; j<map.categories.length; j++) {
		if(currentCategory[j2].toLowerCase()===map.categories[j].toLowerCase()) {
		    isInCategory = true;
		    break;
		}
	    }
	    if(isInCategory===false) {
		isShown = false;
		break;
	    }
	}
	if(isShown) {
	    filteredList.push(map);
	}
    }
    // sort the filteredList according to currentSort
    filteredList.sort(function(map1, map2) {
	if(currentSort==="Newest") {
	    return ((map2.dateStamp<map1.dateStamp)? -1 : ((map2.dateStamp>map1.dateStamp)? 1 : 0));
	} else if(currentSort==="Oldest") {
	    return ((map1.dateStamp<map2.dateStamp)? -1 : ((map1.dateStamp>map2.dateStamp)? 1 : 0));
	} else if(currentSort==="State (A-Z)") {
	    var state1 = map1.state.toLowerCase();
	    var state2 = map2.state.toLowerCase();
	    return ((state1<state2)? -1 : ((state1>state2)? 1 : 0));
	} else {
	    return 0;
	}
    });

    return filteredList;
}

function refreshMapGallery() {
    // $('testUl').update();
    //     $('tooltipContainer').update();
	$('#testUl').empty();
    $('#tooltipContainer').empty();

    var filteredList = filteredMapList(mapList);

    if(startAtMap>=filteredList.length) startAtMap = 0;
    refreshMapNav('mapNav1', startAtMap, filteredList.length);
    refreshMapNav('mapNav2', startAtMap, filteredList.length);
    // if(filteredList.length===0) $('mapNav2').update("");
	if(filteredList.length===0) $('#mapNav2').empty();

    for(var k=startAtMap; k<startAtMap+9 && k<filteredList.length; k++) {
	var map = filteredList[k];
	var categoryList = [];
	var i = map.categories.length;
	//loop to build the category links
	for(j=0;j<i;j++) {
            categoryList.push(map.categories[j]);
        }
	var tooltipText = map.title;
	
	//if optional thumbnail is present, show it in the map index instead of full image
	var src = map.src;
	if(map.thumbnail!==undefined) {
	    src = map.thumbnail;
	}
	// $('tooltipContainer').insert("<div id='tooltip"+k+"' class='tooltip'>"+tooltipText+"</div>");
	// 	$('testUl').insert('<li id="map'+k+'"><a id="'+map.title+'a" class="imageLink" href="maps/detail/index.html?'+map.id+'#'+map.id+'"><img style="max-width:200px; max-height:200px" class="imageReg3" src="'+src+'" /></a></li>');
	$('#tooltipContainer').append("<div id='tooltip"+k+"' class='tooltip'>"+tooltipText+"</div>");
	$('#testUl').append('<li id="map'+k+'"><a id="'+map.title+'a" class="imageLink" href="maps/detail/index.html?'+map.id+'#'+map.id+'"><img style="max-width:200px; max-height:200px" class="imageReg3" src="'+src+'" /></a></li>');
	
	new Tooltip("map"+k, "tooltip"+k);
    }
}

function refreshSortingLinks() {
    // $('mapSorting').update("Sort maps by: ");
    //     $('mapSorting').insert(sortingLink("Newest")+" ");
    //     $('mapSorting').insert(sortingLink("Oldest")+" ");
    //     $('mapSorting').insert(sortingLink("State (A-Z)"));
	$('#mapSorting').replaceWith("Sort maps by: ");
    $('#mapSorting').append(sortingLink("Newest")+" ");
    $('#mapSorting').append(sortingLink("Oldest")+" ");
    $('#mapSorting').append(sortingLink("State (A-Z)"));
}
function sortingLink(category) {
    if(currentSort===category) {
	return '<span class="active">'+category+'</span>';
    } else {
	return '<a href="#" onClick="sortMapsBy(\''+category+'\'); return false;">'+category+'</a>';
    }
}
function sortMapsBy(category) {
    currentSort = category;
    refreshMapGallery();
}

function refreshMapNav(divId, startIndex, totalMaps) {
    var currentPage = Math.floor(startIndex/9)+1;
    var totalPages = Math.ceil(totalMaps/9);
    var text = "Page "+currentPage+" of "+totalPages;
    if(currentPage>1) text += "<a class='left' href='#' onclick='prevMapPage(); return false;'>&laquo; Previous page</a>";
    else text += "<a class='left' href='#' style='visibility:hidden'>&nbsp;</a>";
    if(currentPage<totalPages) text += "<a class='right' href='#' onclick='nextMapPage(); return false;'>Next page &raquo;</a>";
    else text += "<a class='right' href='#' style='visibility:hidden'>&nbsp;</a>";
    if(totalMaps===0) text = "No maps found.";
    $(divId).update(text);
}
function prevMapPage() {
    startAtMap -= 9;
    refreshMapGallery();
}
function nextMapPage() {
    startAtMap += 9;
    refreshMapGallery();
}

function createLinks(categories)
{
    
    var smallCat = categories.split(",");
    var anchors;
    for(i=0;i<smallCat.length;i++)
    {
        if(i==0){
            anchors ="<a href='#' onclick=\"cat2('"+smallCat[i]+"');\">"+smallCat[i]+"</a> ";
        }else{
            anchors = anchors + "| <a href='#' onclick=\"cat2('"+smallCat[i]+"');\">"+smallCat[i]+"</a> ";
        }
    }
    return anchors;
}

function mapCategory(category, value) {
    currentCategory[category] = value;
    if(typeof cookieJar !== "undefined") cookieJar.put("mapFilter", currentCategory);
    refreshMapGallery();
}

function xmapCategory(category) {
    var cat = new Array();
    var links;
    removeSelected();
	$.getJSON('../../../javascripts/maps.json?314786', function(data) {
    // new Ajax.Request('../javascripts/maps.json?314786', {
    // 	method:'get',
	//requestHeaders: {Accept: 'application/json'},
	// onSuccess: function(transport){
	    
	    // var text = "/*-secure-\n"+transport.responseText+"\n*/";
		var text = "/*-secure-\n"+data.responseText+"\n*/";
	    // text=text.evalJSON(true);
	    var k = text.maps.length;
	    // $('testUl').update();
		$('#testUl').empty();
	    //clears out the test div
	    
	    // $(category).addClassName('selected');
		$(category).addClass('selected');
	    // $(category).setStyle({});
		$(category).css({});
	    for(l=0;l<k;l++) {
		cat[l]=[];
		var i = text.maps[l].categories.length;
		//loop to build the category links
		for(j=0;j<i;j++) {
                    cat[l].push(text.maps[l].categories[j]);
                }
                for(m=0;m<i;m++) {
                    if(text.maps[l].categories[m] == category) {
        		//build the category links under the map image
                        links = createLinks(''+cat[l]+'');
                        
                        //store the title in a var so we can send it in a function
		        var title1 = "<p>"+text.maps[l].title+"</p><a href="+text.maps[l].page+">Learn more about this map:how it was made and how it was used</a>";
			//if optional thumbnail is present, show it in the map index instead of full image
		        var src = text.maps[l].src;
            		if(text.maps[l].thumbnail!==undefined) {
            		    src = text.maps[l].thumbnail;
            		}
            		// $('testUl').insert('<li id="'+text.maps[l].title+'" onmouseover="sideHighlight(this.id, \''+cat[l]+'\')" onmouseout="sideNormal(\''+cat[l]+'\')" class="\category'+text.maps[l].category+'\"><a id="'+text.maps[l].title+'a" href="'+text.maps[l].src+'" rel="lightbox[roadtrip]" title="'+title1+'" onclick="getTitle(this.id, \''+title1+'\');"><img class="imageReg3" src="'+src+'" /></a></li>');
        	    	$('#testUl').append('<li id="'+text.maps[l].title+'" onmouseover="sideHighlight(this.id, \''+cat[l]+'\')" onmouseout="sideNormal(\''+cat[l]+'\')" class="\category'+text.maps[l].category+'\"><a id="'+text.maps[l].title+'a" href="'+text.maps[l].src+'" rel="lightbox[roadtrip]" title="'+title1+'" onclick="getTitle(this.id, \''+title1+'\');"><img class="imageReg3" src="'+src+'" /></a></li>');
            	
				}
                }
		
	    }
	}
    });
}

