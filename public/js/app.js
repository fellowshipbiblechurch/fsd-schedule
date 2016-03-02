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
}


// Build day panel from class listings

var danceClasses = {
	monday: [
		new danceClass("A", "Howdy Doody I/II", "/a", 9, 30, 12, 30),
		new danceClass("A", "Beebop XI", "/a", 13, 0, 14, 30),
		new danceClass("A", "Cowboy III", "/a", 15, 30, 12, 30),
		new danceClass("B", "Advanced Polka", "/b", 9, 30, 12, 30),
		new danceClass("B", "Beginner's Dougie", "/b", 9, 30, 12, 30),
		new danceClass("B", "Hot Yoga", "/b", 9, 30, 12, 30),
		new danceClass("C", "Shuffle II/III", "/c", 9, 30, 12, 30),
		new danceClass("C", "Cowtipping for Grannies", "/c", 9, 30, 12, 30),
		new danceClass("C", "Lindy", "/c", 9, 30, 12, 30)
	]
}

	// Set earliest class start time as first row
	
	var setDayAlphaTime = function() {
		var earliest = 1440;
		
		
	}
	// Set latest class start time as last row




// Each day panel must be in carousel-like form