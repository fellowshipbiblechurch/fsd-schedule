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
	
	// object of days holding class listings
	
	var monday = [
		new danceClass("Monday", "A", "Waltz The Big Deal", "/a", 12, 0, 13, 45),
		new danceClass("Monday", "A", "Beebop XI", "/a", 14, 0, 15, 30),
		new danceClass("Monday", "B", "Advanced Polka", "/b", 12, 0, 13, 30),
		new danceClass("Monday", "B", "Beginner's Dougie", "/b", 13, 30, 15, 0),
		new danceClass("Monday", "C", "Shuffle II/III", "/c", 13, 15, 14, 45),
		new danceClass("Monday", "C", "Lindy", "/c", 15, 0, 16, 30)
	];
	
	var tuesday = [
		new danceClass("Tuesday", "A", "Richard Simmons Rumba", "/a", 14, 30, 15, 0),
		new danceClass("Tuesday", "A", "Lyrical Quilting III", "/a", 15, 0, 15, 45),
		new danceClass("Tuesday", "A", "What Da Foxtrot Say?", "/b", 15, 45, 17, 15),
		new danceClass("Tuesday", "B", "Ballet in Jesus' Time", "/b", 13, 45, 15, 15),
		new danceClass("Tuesday", "B", "Jazz Tap with Elton", "/b", 15, 15, 16, 30),
		new danceClass("Tuesday", "C", "Touchdown Celebrations I", "/c", 14, 45, 17, 0)
	];
	
	var wednesday = [
		new danceClass("Wednesday", "A", "It Takes Tutu to Tango", "/a", 12, 45, 14, 45),
		new danceClass("Wednesday", "B", "Advanced Swaying", "/b", 12, 30, 13, 30),
		new danceClass("Wednesday", "B", "Waltz Whitman II/III", "/b", 13, 30, 15, 30),
		new danceClass("Wednesday", "C", "Dancing for Baptists I", "/c", 12, 30, 13, 0),
		new danceClass("Wednesday", "C", "Chips and Salsa", "/c", 13, 0, 14, 0),
		new danceClass("Wednesday", "C", "Lemon Merengue", "/c", 14, 0, 15, 0)
	];
	
	var thursday = [
		new danceClass("Thursday", "A", "Richard Simmons Rumba", "/a", 14, 30, 15, 30),
		new danceClass("Thursday", "A", "Lyrical Quilting III", "/a", 15, 30, 17, 0),
		new danceClass("Thursday", "A", "What Da Foxtrot Say?", "/b", 17, 0, 19, 0),
		new danceClass("Thursday", "B", "Ballet in Jesus' Time", "/b", 13, 45, 14, 45),
		new danceClass("Thursday", "B", "Jazz Tap with Elton", "/b", 14, 45, 16, 30),
		new danceClass("Thursday", "C", "Touchdown Celebrations I", "/c", 16, 0, 18, 30)
	];
	
	var friday = [
		new danceClass("Friday", "A", "Waltz The Big Deal", "/a", 12, 0, 13, 45),
		new danceClass("Friday", "A", "Beebop XI", "/a", 14, 0, 15, 30),
		new danceClass("Friday", "B", "Advanced Polka", "/b", 12, 0, 13, 30),
		new danceClass("Friday", "B", "Beginner's Dougie", "/b", 13, 30, 15, 0),
		new danceClass("Friday", "C", "Shuffle II/III", "/c", 13, 15, 14, 45),
		new danceClass("Friday", "C", "Lindy", "/c", 15, 0, 16, 30)
	];
	
	
	
	// populate days array and initialize studios
	var days = [
				monday,
				tuesday,
				wednesday,
				thursday,
				friday
			],
			studioA,
			studioB,
			studioC;
	
	function buildStudios(day) {
		
		studioA = [];
		studioB = [];
		studioC = [];
		
		// loop through days and pick out classes in each studio
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
			
			if (studio === "a") {
				dataStudio = "a";
			} else if (studio === "b") {
				dataStudio = "b";
			} else if (studio === "c") {
				dataStudio = "c";
			}
			
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
			width_Panels = width_Schedule * days.length,
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
		var today = days[n - 1];
		var todayStr = today[0].day;
		$dayName.text(todayStr);
		dayCurr = $dayName.text();
	})();
	
	// find indeces of yesterday, today and tomorrow
	for (var i=0; i < days.length; i++) {
		if(dayCurr === days[i][0].day) {
			dayPrevIndex = i - 1;
			dayCurrIndex = i;
			dayNextIndex = i + 1;
			break;
		}
	}
	
	/**
	 *	Construct panels by looping through days array, then format times
	 */
	
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
		
		// check direction and set new panel position
		if (direction === "prev") { dayCurrIndex -= 1; }
		if (direction === "next") { dayCurrIndex += 1; }
		
		// check if updated dayCurrIndex is out of bounds before proceeding
		dayCurrIndex < 0 || dayCurrIndex > 4 ?
			dayCurrIndex = dayCurrIndex < 0 ? 4 : 0 : dayCurrIndex;
		
		// update panelPosNew from adjusted dayCurrIndex
		panelPosNew = -1 * width_Panel * dayCurrIndex;
		
		// update dayCurr and #dayName
		dayCurr = days[dayCurrIndex][0].day;
		$dayName.text(dayCurr);
		
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