/**
 *	Build day panel from class listings
 */


// set earliest class start time as second row
var getScheduleAlphaTime = function(day) {
	var earliestStart = 1440;
	// loop through classes in days
	for (var i=0; i < day.length; i++) {
		day[i].alphaMinutesFull() < earliestStart ?
		earliestStart = day[i].alphaMinutesFull() :
		earliestStart = earliestStart;
	}
	return earliestStart -= 15;
}

// Set latest class start time as penultimate row
var getScheduleOmegaTime = function(day) {
	var latestEnd = 0;
	// loop through classes in days
	for (var i=0; i < day.length; i++) {
		day[i].omegaMinutesFull() > latestEnd ?
		latestEnd = day[i].omegaMinutesFull() :
		latestEnd = latestEnd;
	}
	return latestEnd += 15;
}


// Find out how many rows are needed to cover all classes in the day

var howManyRows = function(day) {
	var count = (getScheduleOmegaTime(day) - getScheduleAlphaTime(day));
	return count / 15;
}


// Creating first and last rows dynamically

var buildEmptyRow = function(type, day, indexCells, classCells) {
	
	var isAlphaRow = type === "alpha" ? true : false,
			indexTime = '',
			rowContent = '<tr>';
	
	indexTime = isAlphaRow ? getScheduleAlphaTime(day) : getScheduleOmegaTime(day);
	
	// make indexCells
	for (var i=0; i < indexCells; i++) {
		rowContent += '<td class="cell__index">' + indexTime + '</td>';
	}
	// make classCells
	for (var i=0; i < classCells; i++) {
		rowContent += '<td class="cell--blank">&nbsp;</td>';
	}
	
	rowContent += '</tr>';
	isAlphaRow ? $('.schedule__body').prepend(rowContent) : $('.schedule__body').append(rowContent);
}


// create the studio class cells
var createClassCells = function(classes, currentTime) {
	
	// initialize empty cell content
	var cellHTML = '';
	
	for (var i=0; i < classes.length; i++) {
		
		var studio = classes[i].studio.toLowerCase(),
				title = classes[i].title,
				link = classes[i].link,
				timeAlpha = classes[i].alphaMinutesFull(),
				timeOmega = classes[i].omegaMinutesFull(),
				duration = classes[i].duration();
		
		if (timeAlpha === currentTime) {
			
			cellHTML += '<td class="cell__class cell__class--studio-' + studio + '" rowspan=' + duration + '>';
			cellHTML += '<a href="' + link + '">';
			cellHTML += '<span class="class__title">' + title + '</span>';
			cellHTML += '<span class="class__times">' + timeAlpha + '-' + timeOmega + '</span>';
			cellHTML += '</a>';
			cellHTML += '</td>';
			break;

		} else if (timeAlpha < currentTime && timeOmega > currentTime) {
			break;
		} else {
			cellHTML = '<td class="cell--blank">&nbsp;</td>';
		}
	}
	return cellHTML;
}


var buildSchedule = function(day) {
	
	buildEmptyRow("alpha", day, 1, 3);
	
	// initialize empty row content
	var rowHTML	= '';
	
	for (var i=1; i < howManyRows(day); i++) {
		
		var indexTime = getScheduleAlphaTime(day) + 15*i;
		
		rowHTML += '<tr>';
		rowHTML += '<td class="cell__index">' + indexTime + '</td>';
		rowHTML += createClassCells(studioA, indexTime);
		rowHTML += createClassCells(studioB, indexTime);
		rowHTML += createClassCells(studioC, indexTime);
		rowHTML += '</tr>';
	}
		
	$('.schedule__body').append(rowHTML);
	
	buildEmptyRow("omega", day, 1, 3);
	
}

buildSchedule(monday);

// Each day panel must be in carousel-like form









