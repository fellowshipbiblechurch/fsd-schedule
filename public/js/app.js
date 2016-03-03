/**
 *	Build day panel from class listings
 */


// set earliest class start time as second row
var setScheduleAlphaTime = function(day) {
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
var setScheduleOmegaTime = function(day) {
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
	var count = (setScheduleOmegaTime(day) - setScheduleAlphaTime(day));
	return count / 15;
}


// Create index rows




// create the cells
var createClassCells = function(day, currentTime) {
	
	// initialize empty cell content
	var cellHTML = '';
	
	for (var i=0; i < day.length; i++) {
		
		var studio = day[i].studio.toLowerCase(),
				title = day[i].title,
				link = day[i].link,
				timeAlpha = day[i].alphaMinutesFull(),
				timeOmega = day[i].omegaMinutesFull(),
				duration = day[i].duration();
		
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
	
	var rowHTML	= '';
	
	for (var i=0; i < howManyRows(day); i++) {
		
		var indexTime = setScheduleAlphaTime(day) + 15*(i+1);
		
		rowHTML += '<tr>';
		rowHTML += '<td class="cell__index">' + indexTime + '</td>';
		rowHTML += createClassCells(day, indexTime);
		rowHTML += '</tr>';
		
		$('.schedule__body').html(rowHTML);
	}
	
}

buildSchedule(monday);

// Each day panel must be in carousel-like form









