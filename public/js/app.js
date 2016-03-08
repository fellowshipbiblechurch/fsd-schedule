
/* # Build day panel from class listings
================================================== */


/**
 *	Set earliest and latest possible class start times
 */
 
var getScheduleAlphaTime = function(day) {
	var earliestStart = 1440;
	// loop through classes in day
	for (var i=0; i < day.length; i++) {
		day[i].alphaMinutesFull() < earliestStart ?
		earliestStart = day[i].alphaMinutesFull() :
		earliestStart = earliestStart;
	}
	return earliestStart -= 15;
}

var getScheduleOmegaTime = function(day) {
	var latestEnd = 0;
	// loop through classes in day
	for (var i=0; i < day.length; i++) {
		day[i].omegaMinutesFull() > latestEnd ?
		latestEnd = day[i].omegaMinutesFull() :
		latestEnd = latestEnd;
	}
	return latestEnd += 15;
}


/**
 *	Reformat times from ugly minutes to standard time
 */

var prettifyTime = function(ugly) {
	
	// initialize all variables
	var t,h,m,am,meridiem,hours,minutes,prettyTime;
	
	// convert to total hours, floating point
	t = ugly / 60;
	
	// gather hour and minute integer values
	h = Math.floor(t);
	m = Math.round(Math.abs(h - t) * 60);
	
	// set meridiem as am or pm
	meridiem = h >= 12 ? "pm" : "am";
	
	// building new, pretty string
	hours = h <= 12 ? h : h - 12;
	minutes = m < 10 ? "0" + m : m;
	prettyTime = hours + ":" + minutes + meridiem;
	
	return prettyTime;
}


/**
 *	Find out how many rows are needed to cover all classes in the day
 */

var howManyRows = function(day) {
	var count = (getScheduleOmegaTime(day) - getScheduleAlphaTime(day));
	return count / 15;
}


/**
 *	Create the studio class cells
 */

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
			cellHTML += studio === "c" ? " cell--border-cancel-right" : "";
			cellHTML += '" rowspan=' + duration + '>';
			cellHTML += '<a href="' + link + '">';
			cellHTML += '<span class="class__title">' + title + '</span>';
			cellHTML += '<span class="class__times">' + prettifyTime(timeAlpha) + '-' + prettifyTime(timeOmega) + '</span>';
			cellHTML += '</a>';
			cellHTML += '</td>';
			break;
			
		} else if (timeAlpha < currentTime && timeOmega > currentTime) {
			isEmpty = false;
			break;
		}
	}
		
	if(isEmpty) {
		cellHTML = '<td class="cell--blank';
		cellHTML += studio === "c" ? " cell--border-cancel-right" : "";
		cellHTML += '">&nbsp;</td>';
	}
	
	return cellHTML;
}


/**
 *	Loop through number of rows in given day, creating cells
 */

var buildSchedule = function(day) {
	buildStudios(day);
	
	// initialize empty row content
	var rowHTML	= '';
	
	for (var i=0; i < howManyRows(day); i++) {
		var indexTime = getScheduleAlphaTime(day) + 15*i;
		
		rowHTML += '<tr>';
		rowHTML += '<td class="cell__index">' + prettifyTime(indexTime) + '</td>';
		rowHTML += createClassCell(indexTime, studioA);
		rowHTML += createClassCell(indexTime, studioB);
		rowHTML += createClassCell(indexTime, studioC);
		rowHTML += '</tr>';
	}
	
// 	return rowHTML;
	$('.schedule__body').html(rowHTML);
}

function loadTodaysSchedule() {
	var d = new Date();
	var n = d.getDay();
	var today = days[n - 1];
	var todayStr = today[0].day;
	$('.day__name').text(todayStr).attr("id",todayStr.toLowerCase());
	buildSchedule(today);
}

loadTodaysSchedule();

/**
 *	Reformat meridiems if the same
 */

$(".class__times").each(function() {
	
	var text = $(this).text();
	var timeAlpha = text.split("-")[0];
	var timeOmega = text.split("-")[1];
	var meridiemAlpha = timeAlpha.split("am")[1] === "" ? "am" : "pm";
	var meridiemOmega = timeOmega.split("am")[1] === "" ? "am" : "pm";
	
	meridiemAlpha === meridiemOmega ?
	$(this).text(timeAlpha.split(meridiemAlpha)[0] + "-" + timeOmega) :
	$(this).text(timeAlpha + "-" + timeOmega);
	
});


/**
 *	Each day panel must be in carousel-like form
 */

var dayCurrentIndex,
		dayPrevIndex,
		dayNextIndex,
		dayCurrent,
		dayPrev,
		dayNext;

dayCurrent = $('.day__name').text();


// based on day, find index
for (var i=0; i < 5; i++) {
	if(dayCurrent === days[i][0].day) {
		dayCurrentIndex = i;
		console.log(dayCurrentIndex);
	}
}

dayPrevIndex = dayPrev === undefined ? dayCurrentIndex : dayCurrentIndex - 1;
dayNextIndex = dayNext === undefined ? dayCurrentIndex : dayCurrentIndex + 1;
dayPrev = days[dayPrevIndex][0].day;
dayNext = days[dayNextIndex][0].day;

function updateTitleAttributes() {
	$('.day__prev').attr("title","View " + dayPrev + "'s Classes");
	$('.day__next').attr("title","View " + dayNext + "'s Classes");
}

console.log(dayPrevIndex);
updateTitleAttributes();

/*
if(dayPrev === undefined) {
	console.log("Today is " + dayPrev);
	$('#dayPrev').removeClass('day__cycle--hidden');
} else {
	console.log("Yesterday is not in the schedule");
	$('#dayPrev').addClass('day__cycle--hidden');
}
*/



// Set click event to cycle through days

$('.day__cycle').on("click", function(e){
	
	var newDay,
			isPrev,
			isNext;
	
	// determine if user clicked previous or next arrow
	isPrev = $(this).attr("id") === "dayPrev" ? true : false;
	isNext = isPrev ? false : true;
	
	// set new current day index based on click direction
	isPrev ? dayCurrentIndex -= 1 : dayCurrentIndex += 1;
	
	dayPrevIndex = dayCurrentIndex - 1;
	dayNextIndex = dayCurrentIndex + 1;
	
	dayCurrent = days[dayCurrentIndex][0].day;
	dayPrev = days[dayPrevIndex][0].day;
	dayNext = days[dayNextIndex][0].day;
	
	// Update Current Day Text & id
	$('.day__name').text(dayCurrent);
	
	// build schedule for dayNext or dayPrev
	newDay = isPrev ? days[dayPrevIndex] : days[dayNextIndex];
	
	buildSchedule(newDay);
});




// $('#monday').html(buildSchedule(monday));











