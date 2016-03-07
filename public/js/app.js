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


// create the studio class cells
var createClassCell = function(currentTime, studioArray) {
	
	// initialize cell as empty
	var isEmpty = true,
			cellHTML;
	
	for (var i=0; i < studioArray.length; i++) {
		
		var studio = studioArray[i].studio.toLowerCase(),
				title = studioArray[i].title,
				link = studioArray[i].link,
				timeAlpha = studioArray[i].alphaMinutesFull(),
				timeOmega = studioArray[i].omegaMinutesFull(),
				duration = studioArray[i].duration();
		
		if(timeAlpha == currentTime) {
			isEmpty = false;
			
			cellHTML = '<td class="cell__class cell__class--studio-' + studio;
			cellHTML += '" rowspan=' + duration + '>';
			cellHTML += '<a href="' + link + '">';
			cellHTML += '<span class="class__title">' + title + '</span>';
			cellHTML += '<span class="class__times">' + timeAlpha + '-' + timeOmega + '</span>';
			cellHTML += '</a>';
			cellHTML += '</td>';
			break;
			
		} else if (timeAlpha < currentTime && timeOmega > currentTime) {
			isEmpty = false;
			break;
		}
	}
		
	if(isEmpty) {
		cellHTML = '<td class="cell--blank">&nbsp;</td>';
	}
	
	return cellHTML;
}


// Loop through number of rows in given day, creating cells
var buildSchedule = function(day) {
	
	// initialize empty row content
	var rowHTML	= '';
	
	for (var i=0; i < howManyRows(day); i++) {
		var indexTime = getScheduleAlphaTime(day) + 15*i;
		
		rowHTML += '<tr>';
		rowHTML += '<td class="cell__index">' + indexTime + '</td>';
		rowHTML += createClassCell(indexTime, studioA);
		rowHTML += createClassCell(indexTime, studioB);
		rowHTML += createClassCell(indexTime, studioC);
		rowHTML += '</tr>';
	}
	
	$('.schedule__body').html(rowHTML);
}

buildSchedule(monday);









// Each day panel must be in carousel-like form









