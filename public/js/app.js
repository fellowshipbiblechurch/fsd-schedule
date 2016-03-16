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
 *	Create the studio class cells
 */

var createClassCell = function(currentTime, studioArray, column) {
	
	// initialize cell as empty
	var isEmpty = true,
			cellHTML;
	
	for (var i=0; i < studioArray.length; i++) {
		
		var studio = studioArray[i].studio.toLowerCase(),
				title = studioArray[i].title,
				link = studioArray[i].link,
				timeAlpha = studioArray[i].alphaMinutesFull(),
				timeOmega = studioArray[i].omegaMinutesFull(),
				duration = studioArray[i].duration(),
				dataStudio;
		
		console.log(studioArray);
/*
		if (studioArray === "a") {
			dataStudio = "a";
		} else if (studioArray === "b") {
			dataStudio = "b";
		} else if (studioArray === "c") {
			dataStudio = "c";
		}
*/
		
		if(timeAlpha == currentTime) {
			isEmpty = false;
			
			cellHTML = '<td class="cell__class cell__class--studio-' + studio;
			cellHTML += studio === 'c' ? ' cell--border-cancel-right' : '';
			cellHTML += '" rowspan="' + duration + '"';
			cellHTML += ' data-studio="' + dataStudio + '">';
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
		rowHTML += createClassCell(indexTime, studioA, i);
		rowHTML += createClassCell(indexTime, studioB, i);
		rowHTML += createClassCell(indexTime, studioC, i);
		rowHTML += '</tr>';
	}
	return rowHTML;
}


/* # Carousel Functionality for schedule panels
================================================== */

var dayCurrIndex,
		dayPrevIndex,
		dayNextIndex,
		dayCurr,
		dayPrev,
		dayNext,
		panelPosOld,
		panelPosNew,
		translation,
		width_Schedule = $(".schedule__wrapper").width(),
		width_Panels = width_Schedule * days.length,
		width_Panel = width_Schedule,
		$dayName = $('#dayName'),
		$panels = $(".schedule__panels");

// set today as initial panel
function setToday() {
	var d = new Date();
	var n = d.getDay();
	var today = days[n - 1];
	var todayStr = today[0].day;
	$dayName.text(todayStr);
	dayCurr = $dayName.text();
};

setToday();

// find indeces of yesterday, today and tomorrow
for (var i=0; i < days.length; i++) {
	if(dayCurr === days[i][0].day) {
		dayPrevIndex = i - 1;
		dayCurrIndex = i;
		dayNextIndex = i + 1;
		break;
	}
}

// loop through days array and build schedule in respective panel, then format times
(function() {
	var dayArray, dayName, panelId;
	for (var i=0; i < days.length; i++) {
		dayArray = days[i];
		dayName = dayArray[0].day.toLowerCase();
		panelId = "#" + dayName;
		$(panelId).html(buildSchedule(dayArray));
	}
	formatClassTimes();
})();


/**
 *	Gather new dayPrev, dayCurr, & dayNext meta based on #dayName
 */

function updateDayMeta(direction) {
	
	// get old panel position
	panelPosOld = Number($panels.css('transform').toString().split(", ")[4]);
	
	// check direction and set new panel position
	if (direction === undefined) {
		dayCurrIndex;
		panelPosNew = -1 * width_Panel * dayCurrIndex;
	} else if (direction === "prev") {
		dayCurrIndex -= 1;
		panelPosNew = panelPosOld === 0 ? width_Panel * (1 - days.length) : panelPosOld + width_Panel;
	} else if (direction === "next") {
		dayCurrIndex += 1;
		panelPosNew = panelPosOld === width_Panel * (1 - days.length) ? 0 : panelPosOld - width_Panel;
	}
	
	// check if updated dayCurrIndex is out of bounds before proceeding
	dayCurrIndex < 0 || dayCurrIndex > 4 ?
	dayCurrIndex = dayCurrIndex < 0 ? 4 : 0 :
	dayCurrIndex;
	
	// update #dayName
	$dayName.text(days[dayCurrIndex][0].day);
	dayCurr = $dayName.text();
	
	/* Update dayPrevIndex & dayPrevIndex based on new dayCurrIndex */
	dayPrevIndex = dayCurrIndex - 1;
	dayNextIndex = dayCurrIndex + 1;
	
	// if dayCurr = Monday, adjust indeces and set new dayPrev
	dayPrevIndex = dayPrevIndex === -1 ? dayPrevIndex += 5 : dayPrevIndex;
	dayPrev = days[dayPrevIndex][0].day;
	
	// if dayCurr = Friday, adjust indeces and set new dayNext
	dayNextIndex = dayNextIndex === 5 ? dayNextIndex -= 5 : dayNextIndex;
	dayNext = days[dayNextIndex][0].day;
	
	// update title attributes for buttons
	$('.day__prev').attr("title","View " + dayPrev + "'s Classes");
	$('.day__next').attr("title","View " + dayNext + "'s Classes");
	
	// move panels according to location of updated day
	translationVal = "translateX(" + panelPosNew + "px)";
	$panels.css({"transform": translationVal});
	
// 	logDayReport();
}

updateDayMeta();


/**
 *	Slide .schedule__panels on prev or next click
 */

$('.day__change').on("click", function(e){
	
	// determine if user wants previous or next day
	$(this).attr("id") === "dayPrev" ? updateDayMeta("prev") : updateDayMeta("next");
		
	var newDayName = days[dayCurrIndex][0].day.toLowerCase();
	var newDayCurr = "#" + newDayName;
	var newPanel = $(newDayCurr).closest(".schedule__panel");	
});



		
/*
var logDayReport = function() {
	console.log("------");
	console.log("dayPrevIndex = " + dayPrevIndex);
	console.log("dayCurrIndex = " + dayCurrIndex);
	console.log("dayNextIndex = " + dayNextIndex);
	console.log("dayPrev = " + dayPrev);
	console.log("dayCurr = " + dayCurr);
	console.log("dayNext = " + dayNext);
};
*/



