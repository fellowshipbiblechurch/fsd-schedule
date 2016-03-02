// FSD Schedule Application


// Build class listing constructor

function danceClass(studio, name, link, alphaHour, alphaMinute, omegaHour, omegaMinute) {
	this.studio = studio;
	this.name = name;
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
		return (omegaHour*60 + omegaMinute) - (alphaHour*60 + alphaMinute)/15;
	}
}


// Build day panel from class listings

var danceClasses = {
	monday: [
		new danceClass("A", "Howdy Doody I/II", "/a", 9, 30, 12, 30),
		new danceClass("A", "Beebop XI", "/a", 13, 0, 14, 30),
		new danceClass("B", "Advanced Polka", "/b", 11, 30, 12, 30),
		new danceClass("B", "Beginner's Dougie", "/b", 13, 45, 16, 30),
		new danceClass("C", "Shuffle II/III", "/c", 10, 30, 12, 45),
		new danceClass("C", "Lindy", "/c", 16, 0, 18, 30)
	]
}

	// Set earliest class start time as first row
	
	var setScheduleAlphaTime = function(day) {
		
		var earliestStart = 1440;
		
		// loop through classes in days
		for (var i=0; i < day.length; i++) {
			if (day[i].alphaMinutesFull() < earliestStart) {
				earliestStart = day[i].alphaMinutesFull();
			} else {
				earliestStart = earliestStart;
			}
		}
	}
	
	var createClassCell = function() {
		
	}
	
	
	// Set latest class start time as last row

// Find out how many rows are needed to cover all classes in the day


// Each day panel must be in carousel-like form