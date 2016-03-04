/**
 *	Class Constructor and Dance Classes Object
 */

// class constructor
function danceClass(studio, title, link, alphaHour, alphaMinute, omegaHour, omegaMinute) {
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

var monday		= [],
		tuesday		= [],
		wednesday	= [],
		thursday	= [],
		friday		= [];

monday = [
	new danceClass("A", "Waltz The Big Deal", "/a", 12, 30, 13, 45),
	new danceClass("A", "Beebop XI", "/a", 14, 0, 15, 30),
	new danceClass("B", "Advanced Polka", "/b", 12, 0, 13, 30),
	new danceClass("B", "Beginner's Dougie", "/b", 13, 30, 15, 0),
	new danceClass("C", "Shuffle II/III", "/c", 13, 15, 14, 45),
	new danceClass("C", "Lindy", "/c", 15, 0, 16, 30)
];

tuesday = [
	new danceClass("A", "Advanced Richard Simmons", "/a", 14, 30, 15, 30),
	new danceClass("A", "Lyrical Quilting III", "/a", 16, 0, 17, 30),
	new danceClass("A", "What Da Foxtrot Say?", "/b", 18, 30, 20, 30),
	new danceClass("B", "Ballet in Jesus' Time", "/b", 11, 45, 13, 15),
	new danceClass("B", "Jazz Tap with Elton", "/b", 13, 45, 16, 30),
	new danceClass("C", "Touchdown Celebrations I", "/c", 16, 0, 18, 30)
];

wednesday = [
	new danceClass("A", "It Takes Tutu to Tango", "/a", 9, 30, 12, 30),
	new danceClass("B", "Advanced Swaying", "/b", 11, 30, 12, 30),
	new danceClass("B", "Waltz Whitman II/III", "/b", 13, 45, 16, 30),
	new danceClass("C", "Dancing for Baptists I", "/c", 10, 30, 12, 45),
	new danceClass("C", "Chips and Salsa", "/c", 10, 30, 12, 45),
	new danceClass("C", "Lemon Merengue", "/c", 16, 0, 18, 30)
];


// fill in studios
var	studioA		= [],
		studioB		= [],
		studioC		= [];


function buildStudios(day) {
	
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

buildStudios(tuesday);

/*

var studios = {
	monday: buildStudios(monday),
	tuesday: buildStudios(tuesday),
	wednesday: buildStudios(wednesday)
};
*/


var danceClasses = {
	mon: monday,
	tue: tuesday,
	wed: wednesday
}








