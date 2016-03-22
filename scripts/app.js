/* # Set everything up
================================================== */

$(document).ready(function(){
	
	// Create the Dance Schedule
	if ($('.schedule__wrapper')) {
		createDanceSchedule();
		createMobileTabs();
	}
	
/*
	$(window).resize(function(){
		createDanceSchedule();
	});
*/
	
});



/* # Class Constructor and Dance Classes Object
================================================== */

function createDanceSchedule() {
	
	if ($(window).width() < 847) {
		$('.schedule__wrapper').addClass('compressed');
	}
	
	function danceClass(day, studio, title, link, alphaHour, alphaMinute, omegaHour, omegaMinute) {
		this.day = day;
		this.studio = studio;
		this.title = title;
		this.link = link;
		this.times =
		{
			alpha: { hour: alphaHour, minute: alphaMinute },
			omega: { hour: omegaHour, minute: omegaMinute }
		};
		this.alphaMinutesFull = function() {
			return alphaHour*60 + alphaMinute;
		};
		this.omegaMinutesFull = function() {
			return omegaHour*60 + omegaMinute;
		};
		this.duration = function() {
			return ((omegaHour*60 + omegaMinute) - (alphaHour*60 + alphaMinute))/15;
		}
	}
	
	// object of week holding class listings
	
	var monday = [
		new danceClass("Monday", "A", "Ballet IV/V", "/ballet", 16, 0, 17, 30),
		new danceClass("Monday", "A", "Pointe II/III", "/ballet", 17, 30, 18, 15),
		new danceClass("Monday", "A", "Contemporary IV", "/contemporary", 18, 15, 19, 30),
		new danceClass("Monday", "A", "Contemporary III", "/contemporary", 19, 30, 20, 45),
		new danceClass("Monday", "B", "Intro to Ballet I", "/ballet", 16, 15, 17, 15),
		new danceClass("Monday", "B", "Contemporary I A", "/contemporary", 17, 15, 18, 15),
		new danceClass("Monday", "B", "Ballet II", "/ballet", 18, 15, 19, 45),
		new danceClass("Monday", "B", "Pre-Pointe", "/ballet", 19, 45, 20, 30),
		new danceClass("Monday", "C", "Intro to Ballet II", "/ballet", 16, 15, 17, 15),
		new danceClass("Monday", "C", "Open Level Ballet II", "/ballet", 17, 15, 18, 30),
		new danceClass("Monday", "C", "Hip Hop III", "/hip-hop", 18, 30, 19, 30),
		new danceClass("Monday", "C", "Lyrical Worship (12 & up)", "/lyrical", 19, 30, 20, 30)
	];
	
	var tuesday = [
		new danceClass("Tuesday", "A", "Creative Movement", "/creative-movement", 14, 15, 15, 15),
		new danceClass("Tuesday", "A", "Ballet III", "/ballet", 16, 0, 17, 30),
		new danceClass("Tuesday", "A", "Pointe I", "/ballet", 17, 30, 18, 15),
		new danceClass("Tuesday", "A", "Jazz III", "/jazz", 18, 15, 19, 15),
		new danceClass("Tuesday", "A", "Jazz II", "/jazz", 19, 15, 20, 15),
		new danceClass("Tuesday", "B", "Jazz I", "/jazz", 16, 0, 17, 0),
		new danceClass("Tuesday", "B", "Tap I", "/tap", 17, 0, 18, 0),
		new danceClass("Tuesday", "B", "Tap II", "/tap", 18, 15, 19, 15),
		new danceClass("Tuesday", "B", "Tap III", "/tap", 19, 15, 20, 15),
		new danceClass("Tuesday", "C", "Intro to Ballet", "/ballet", 16, 0, 17, 0),
		new danceClass("Tuesday", "C", "Ballet I A", "/ballet", 17, 0, 18, 15),
		new danceClass("Tuesday", "C", "Lyrical Worship (Ages 8-12)", "/lyrical", 18, 15, 19, 15)
	];
	
	var wednesday = [
		new danceClass("Wednesday", "A", "Open Advanced Ballet", "/ballet", 12, 0, 13, 30),
		new danceClass("Wednesday", "A", "Open Advanced Pointe", "/ballet", 13, 30, 14, 0),
		new danceClass("Wednesday", "A", "Ballet II", "/ballet", 16, 0, 17, 30),
		new danceClass("Wednesday", "A", "Intro to Ballet II", "/ballet", 17, 30, 18, 30),
		new danceClass("Wednesday", "B", "Intro to Ballet I", "/ballet", 13, 0, 14, 0),
		new danceClass("Wednesday", "B", "Ballet I", "/ballet", 14, 0, 15, 15),
		new danceClass("Wednesday", "B", "Intro to Ballet I", "/ballet", 16, 15, 17, 15),
		new danceClass("Wednesday", "B", "Creative Movement", "/creative-movement", 17, 15, 18, 15),
		new danceClass("Wednesday", "C", "Intro to Ballet II", "/ballet", 13, 0, 14, 0),
		new danceClass("Wednesday", "C", "Creative Movement", "/creative-movement", 14, 0, 15, 0),
		new danceClass("Wednesday", "C", "Inside Out: Teen", "/special-needs", 15, 30, 16, 15),
		new danceClass("Wednesday", "C", "Inside Out: Elementary", "/special-needs", 16, 30, 17, 0),
		new danceClass("Wednesday", "C", "Hip-Hop IV", "/hip-hop", 17, 0, 18, 0),
		new danceClass("Wednesday", "C", "Hip-Hop II", "/hip-hop", 18, 0, 19, 0)
	];
	
	var thursday = [
		new danceClass("Thursday", "A", "Intro to Ballet I", "/ballet", 16, 0, 17, 0),
		new danceClass("Thursday", "A", "Ballet I B", "/ballet", 17, 0, 18, 15),
		new danceClass("Thursday", "A", "Ballet IV/V", "/ballet", 18, 15, 19, 45),
		new danceClass("Thursday", "A", "Pointe II/III", "/ballet", 19, 45, 20, 30),
		new danceClass("Thursday", "B", "Open Level Ballet I", "/ballet", 16, 0, 17, 15),
		new danceClass("Thursday", "B", "Ballet III", "/ballet", 17, 15, 18, 45),
		new danceClass("Thursday", "B", "Pointe", "/ballet", 18, 45, 19, 30),
		new danceClass("Thursday", "B", "Beginning Pointe", "/ballet", 19, 30, 20, 30),
		new danceClass("Thursday", "C", "Conditioning for Dancers", "/", 16, 0, 17, 0),
		new danceClass("Thursday", "C", "Ballet I", "/ballet", 17, 0, 18, 15),
		new danceClass("Thursday", "C", "Contemporary I B", "/contemporary", 18, 15, 19, 15),
		new danceClass("Thursday", "C", "Contemporary II", "/contemporary", 19, 15, 20, 15)
	];
	
	var friday = [
		new danceClass("Friday", "A", "Creative Movement", "/creative-movement", 10, 0, 11, 0),
		new danceClass("Friday", "A", "Creative Movement", "/creative-movement", 11, 0, 12, 0),
		new danceClass("Friday", "A", "Intro to Hip-Hop", "/hip-hop", 16, 30, 17, 30),
		new danceClass("Friday", "A", "Hip-Hop I", "/hip-hop", 17, 30, 18, 30)
	];
	
	var saturday = [
		new danceClass("Saturday", "A", "In Motion Dance Company", "/in-motion", 9, 0, 12, 30),
		new danceClass("Saturday", "B", "Junior Company", "/junior-company", 9, 0, 12, 30)
	];
	
	
	
	// populate week array and initialize studios
	var week = [
				monday,
				tuesday,
				wednesday,
				thursday,
				friday,
				saturday
			],
			numDays = week.length,
			studioA,
			studioB,
			studioC;
	
	function buildStudios(day) {
		
		studioA = [];
		studioB = [];
		studioC = [];
		
		// loop through week and pick out classes in each studio
		for (var i=0; i < day.length; i++) {
			var studio = day[i].studio;
			
			if (studio === "A") {
				studioA.push(day[i]);
			} else if (studio === "B") {
				studioB.push(day[i]);
			} else if (studio === "C") {
				studioC.push(day[i]);
			}
		}
	}
	
	
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
	 *	Reformat meridiems
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
	 *	Trim out large chunks of empty rows
	 */
	 
	function trimEmptyRows() {
		
		// row is empty if it has 3 .cell--blank children
		$('tr').each(function(){
			if ($(this).children('.cell--blank').length === 3) {
				$(this).addClass('row--empty');
			}
		});
		
		// identify inner empty rows to be trimmed
		$('tr.row--empty').each(function(){
			var emptyPrev = $(this).prevUntil('tr.row--empty').length;
			var emptyNext = $(this).nextUntil('tr.row--empty').length;
			if (emptyPrev === 0 && emptyNext === 0) {
				$(this).detach();
			}
		});
		
		$('tr.row--empty + tr.row--empty').addClass('row--empty--top');
		$('tr.row--empty + tr.row--empty').prev('tr.row--empty').addClass('row--empty--bottom');
		
		// add spacer row
		$('tr.row--empty--bottom').each(function(){
			var emptyRowHTML = '';
			
			emptyRowHTML += '<tr class="row--empty--spacer">';
			emptyRowHTML += '<td colspan="4">';
			emptyRowHTML += '<h6 class="text">No classes scheduled</h6>';
			emptyRowHTML += '<i class="fa fa-long-arrow-down"></i>';
			emptyRowHTML += '</td>';
			emptyRowHTML += '</tr>';
			
			$(this).after(emptyRowHTML);
		});
		
		// clean up class attr
		$('tr.row--empty').removeClass('row--empty');
	}
	
	
	/**
	 *	Create the studio class cells
	 */
	
	var createClassCell = function(currentTime, studioArray, column) {
		
		// initialize cell as empty
		var isBlankCell = true,
				cellHTML;
		
		for (var i=0; i < studioArray.length; i++) {
			
			var studio = studioArray[i].studio.toLowerCase(),
					title = studioArray[i].title,
					link = studioArray[i].link,
					timeAlpha = studioArray[i].alphaMinutesFull(),
					timeOmega = studioArray[i].omegaMinutesFull(),
					duration = studioArray[i].duration(),
					dataStudio;
			
			if (studio === "a") {
				dataStudio = "a";
			} else if (studio === "b") {
				dataStudio = "b";
			} else if (studio === "c") {
				dataStudio = "c";
			}
			
			if(timeAlpha == currentTime) {
				isBlankCell = false;
				
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
				isBlankCell = false;
				break;
			}
		}
		
		if(isBlankCell) {
			cellHTML = '<td class="cell--blank';
			cellHTML += studio === 'c' ? ' cell--border-cancel-right"' : '"';
			cellHTML += ' data-studio="' + dataStudio;
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
			panelPosNew,
			translation,
			width_Schedule = $(".schedule__wrapper").width(),
			width_Panels = width_Schedule * numDays,
			width_Panel = width_Schedule,
			$dayName = $('#dayName'),
			$panels = $(".schedule__panels");
	
	// helper function to log day info
	var logDayReport = function() {
		console.log("------");
		console.log("dayPrevIndex", dayPrevIndex);
		console.log("dayCurrIndex", dayCurrIndex);
		console.log("dayNextIndex", dayNextIndex);
		console.log("dayPrev", dayPrev);
		console.log("dayCurr", dayCurr);
		console.log("dayNext", dayNext);
		console.log("panelPosNew", panelPosNew);
	};
	
	// set today as initial panel
	(function() {
		var d = new Date();
		var n = d.getDay();
		var today = week[n - 1];
		var todayStr = today[0].day;
		$dayName.text(todayStr);
		dayCurr = $dayName.text();
	})();
	
	// find indeces of yesterday, today and tomorrow
	for (var i=0; i < numDays; i++) {
		if(dayCurr === week[i][0].day) {
			dayPrevIndex = i - 1;
			dayCurrIndex = i;
			dayNextIndex = i + 1;
			break;
		}
	}
	
	/**
	 *	Construct panels by looping through week array, then format times
	 */
	
	(function() {
		var dayArray, dayName, panelId;
		for (var i=0; i < numDays; i++) {
			dayArray = week[i];
			dayName = dayArray[0].day.toLowerCase();
			panelId = "#" + dayName;
			$(panelId).html(buildSchedule(dayArray));
		}
		formatClassTimes();
		trimEmptyRows();
	})();
	
	
	/**
	 *	Gather new dayPrev, dayCurr, & dayNext meta based on #dayName
	 */
	
	function updateDayMeta(direction) {
		
		// check direction and set new panel position
		if (direction === "prev") { dayCurrIndex -= 1; }
		if (direction === "next") { dayCurrIndex += 1; }
		
		// check if updated dayCurrIndex is out of bounds before proceeding
		dayCurrIndex < 0 || dayCurrIndex > numDays - 1 ?
			dayCurrIndex = dayCurrIndex < 0 ? numDays - 1 : 0 : dayCurrIndex;
		
		// update panelPosNew from adjusted dayCurrIndex
		panelPosNew = -1 * width_Panel * dayCurrIndex;
		
		// update dayCurr and #dayName
		dayCurr = week[dayCurrIndex][0].day;
		$dayName.text(dayCurr);
		
		/* Update dayPrevIndex & dayPrevIndex based on new dayCurrIndex */
		dayPrevIndex = dayCurrIndex - 1;
		dayNextIndex = dayCurrIndex + 1;
		
		// if dayCurr = Monday, adjust indeces and set new dayPrev
		dayPrevIndex = dayPrevIndex === -1 ? dayPrevIndex += numDays : dayPrevIndex;
		dayPrev = week[dayPrevIndex][0].day;
		
		// if dayCurr = Friday, adjust indeces and set new dayNext
		dayNextIndex = dayNextIndex === numDays ? dayNextIndex -= numDays : dayNextIndex;
		dayNext = week[dayNextIndex][0].day;
		
		// update title attributes for buttons
		$('.day__prev').attr("title","View " + dayPrev + "'s Classes");
		$('.day__next').attr("title","View " + dayNext + "'s Classes");
		
		// move panels according to location of updated day
		translationVal = "translateX(" + panelPosNew + "px)";
		$panels.css({"transform": translationVal});
		
		// add active class to current panel
		$('.schedule__panel').each(function(){
			$(this).attr('id') === dayCurr.toLowerCase() ?
			$(this).addClass('active') :
			$(this).removeClass('active');
		});
		
	// 	logDayReport();
	}
	
	updateDayMeta();
	
	
	/**
	 *	Slide .schedule__panels on prev or next click
	 */
	
	$('.day__change').on("click", function(e){
		$(this).attr("id") === "dayPrev" ?
		updateDayMeta("prev") :
		updateDayMeta("next");
		e.preventDefault();
	});
}


	
	
/* # Tabs for Mobile Schedule
================================================== */

function createMobileTabs() {
	
	if ($('.schedule__wrapper').hasClass('compressed')) {
		
		$('.schedule__wrapper').each(function(){
			
			var $cells = $('td').not('.cell__index, .cell__heading, .cell__heading--blank');
			var $arrows = $('.studio__arrow');
			var studios = [
				$cells.filter($('[data-studio="a"]')),
				$cells.filter($('[data-studio="b"]')),
				$cells.filter($('[data-studio="c"]'))
			];
			var $headings = $('[class*="cell__heading--studio-"]');
			
			// initialize studio A as active and visible
			studios[0].addClass('visible');
			$($arrows[0]).addClass('active');
			$($headings[0]).addClass('active');
			
			$headings.each(function(){
				
				$(this).on('click', function(e){
					
					var $thisHeading = $(this);
					var $thisArrow = $(this).find('.studio__arrow');
					var activeStudio = $(this).children().first().text().toLowerCase().split(' ')[1];
					
					$thisArrow.addClass('active');
					$thisHeading.addClass('active');
					$arrows.not($thisArrow).removeClass('active');
					$headings.not($thisHeading).removeClass('active');
					
					var visibleCells = $cells.filter($('[data-studio="' + activeStudio + '"]'));
					var hiddenCells = $cells.not(visibleCells);
					
					visibleCells.show().addClass('visible').removeClass('hidden');
					hiddenCells.addClass('hidden').removeClass('visible').hide();
					
					e.preventDefault();
				});
			});
		});
	}
}