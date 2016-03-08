/**
 *	Class Constructor and Dance Classes Object
 */

// class constructor
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
	new danceClass("Thursday", "A", "Lyrical Quilting III", "/a", 15, 30, 17, 30),
	new danceClass("Thursday", "A", "What Da Foxtrot Say?", "/b", 18, 0, 20, 30),
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


var danceClasses = {
	monday: monday,
	tuesday: tuesday,
	wednesday: wednesday,
	thursday: thursday,
	friday: friday
};


// fill in studios
var	studioA	= [],
		studioB	= [],
		studioC	= [];


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

/*
var studios = {
	monday: buildStudios(monday),
	tuesday: buildStudios(tuesday),
	wednesday: buildStudios(wednesday)
};
*/

var days = [
	monday,
	tuesday,
	wednesday,
	thursday,
	friday
];








