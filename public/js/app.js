
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
 *	Reformat meridiems if the same
 */

function formatClassTimes() {
	var times = document.getElementsByClassName("class__times");
	
	for (var i=0; i < times.length; i++) {
		var text = times[i].innerHTML;
		var timeAlpha = text.split("-")[0];
		var timeOmega = text.split("-")[1];
		var meridiemAlpha = timeAlpha.split("am")[1] === "" ? "am" : "pm";
		var meridiemOmega = timeOmega.split("am")[1] === "" ? "am" : "pm";
		
		var formattedTime =
			meridiemAlpha === meridiemOmega ?
			timeAlpha.split(meridiemAlpha)[0] + "-" + timeOmega :
			timeAlpha + "-" + timeOmega;
		
		times[i].innerHTML = formattedTime;
	}
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
	
	return rowHTML;
// 	$('.schedule__body').html(rowHTML);
}

function loadTodaysSchedule() {
	var d = new Date();
	var n = d.getDay();
	var today = days[n - 1];
	var todayStr = today[0].day;
	$('.day__name').text(todayStr).attr("id",todayStr.toLowerCase());
	buildSchedule(today);
	// need to account for sunday and saturday
}

// loadTodaysSchedule();
// buildSchedule(tuesday);


/**
 *	Carousel action for panels
 */

var dayCurrIndex,
		dayPrevIndex,
		dayNextIndex,
		dayCurr,
		dayPrev,
		dayNext,
		$dayName = $('#dayName');

// get today to work from (commented out for static dev)
/*
(function() {
	var d = new Date();
	var n = d.getDay();
	var today = days[n - 1];
	var todayStr = today[0].day;
	$dayName.text(todayStr).attr("id",todayStr.toLowerCase());
})();
*/

dayCurr = $dayName.text();

// find indeces of yesterday, today and tomorrow
for (var i=0; i < days.length; i++) {
	if(dayCurr === days[i][0].day) {
		dayPrevIndex = i - 1;
		dayCurrIndex = i;
		dayNextIndex = i + 1;
		break;
	}
}

function updateDayMeta() {
	
	// if dayCurr = Monday, adjust indeces
	dayPrevIndex =	dayPrevIndex === -1 ?
									dayPrevIndex += 5 :
									dayPrevIndex;
									
	dayPrev = days[dayPrevIndex][0].day;
	
	// if dayCurr = Friday, adjust indeces
	dayNextIndex =	dayNextIndex === 5 ?
									dayNextIndex -= 5 :
									dayNextIndex;
									
	dayNext = days[dayNextIndex][0].day;
	
	console.log("dayPrevIndex = " + dayPrevIndex);
	console.log("dayCurrIndex = " + dayCurrIndex);
	console.log("dayNextIndex = " + dayNextIndex);
	console.log("dayPrev = " + dayPrev);
	console.log("dayCurr = " + dayCurr);
	console.log("dayNext = " + dayNext);
}

updateDayMeta();

function updateTitleAttributes() {
	$('.day__prev').attr("title","View " + dayPrev + "'s Classes");
	$('.day__next').attr("title","View " + dayNext + "'s Classes");
}

updateTitleAttributes();


// loop through days array and build schedule in respective panel

function constructPanels() {
	
	var dayArray, dayName, panelId;
			
	for (var i=0; i < days.length; i++) {
		
		dayArray = days[i];
		dayName = dayArray[0].day.toLowerCase();
		panelId = "#" + dayName;
		
		$(panelId).html(buildSchedule(dayArray));
	}

}

constructPanels();
formatClassTimes();


var width_Schedule = $(".schedule__wrapper").width();
var width_Panels = width_Schedule * days.length;
var width_Panel = width_Schedule;

$(".schedule__panels").css({"transform": "translateX(" + (-1 * width_Panel * dayCurrIndex) + "px)"});

/*
function placeTodaysPanel() {
	// determine dayCurrIndex
	// 
}
*/


// slide .schedule__panels on prev or next click

$('.day__change').on("click", function(e){
	
	var isPrev, isNext;
	
	// determine if user clicked previous or next arrow
	isPrev = $(this).attr("id") === "dayPrev" ? true : false;
	isNext = isPrev ? false : true;
	
	console.log(isPrev);
	
});














// Set click event to cycle through days

/*
$('.day__change').on("click", function(e){
	
	var newDay,
			isPrev,
			isNext;
	
	// determine if user clicked previous or next arrow
	isPrev = $(this).attr("id") === "dayPrev" ? true : false;
	isNext = isPrev ? false : true;
	
	// set new current day index based on click direction
	isPrev ? dayCurrIndex -= 1 : dayCurrIndex += 1;
	
// 	updateNeighbors();
	dayPrevIndex = dayCurrIndex - 1;
	dayNextIndex = dayCurrIndex + 1;
	
	dayCurr = days[dayCurrIndex][0].day;
	
	if (dayPrevIndex)
	dayPrev = days[dayPrevIndex][0].day;
	dayNext = days[dayNextIndex][0].day;
	
	// Update Current Day Text & id
	$('.day__name').text(dayCurr);
	
	// build schedule for dayNext or dayPrev
	newDay = isPrev ? days[dayPrevIndex] : days[dayNextIndex];
	
	buildSchedule(newDay);
	
});
*/













