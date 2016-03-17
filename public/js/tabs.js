/* # Tabs for Mobile Schedule
================================================== */

/*
$('.schedule__panel').each(function(){
	var cells = $(this).find('td[class^="cell__"]');
	cells.css({"color": "red"});
});
*/

var cells = $('td').each(function(){return $(this);});
var columnA = cells.filter($('[data-studio="a"]'));
var columnB = cells.filter($('[data-studio="b"]'));
var columnC = cells.filter($('[data-studio="c"]'));

columnB.hide();
columnC.hide();

$('[class*="heading--studio-"]').each(function(){
	var arrow = $(this).find('.studio__arrow');
// 	arrow.first().addClass('active');
	
	$(this).on('click', function(){
		var studio = $(this).children('span:first-of-type').text().toLowerCase().split(' ')[1];	
		
		if (studio === 'a') {
			columnA.show();
			columnB.hide();
			columnC.hide();
/*
			!arrow.hasClass('active') ?
				arrow.addClass('active') :
				arrow.removeClass('active');
*/
		}
		if (studio === 'b') {
			columnA.hide();
			columnB.show();
			columnC.hide();
/*
			!arrow.hasClass('active') ?
				arrow.addClass('active') :
				arrow.removeClass('active');
*/
		}
		if (studio === 'c') {
			columnA.hide();
			columnB.hide();
			columnC.show();
/*
			!arrow.hasClass('active') ?
				arrow.addClass('active') :
				arrow.removeClass('active');
*/
		}
	});
});






$('ul.tabs').each(function(){
	
	var $active, $content, $links = $(this).find('a');
  $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
  $active.addClass('active');
  $content = $($active[0].hash);
  $content.addClass('visible');
	
  $links.not($active).each(function () {
	$(this.hash).hide();
  });
	
  $(this).on('click', 'a', function(e){
		$active.removeClass('active');
		$content.removeClass('visible');
		$content.hide();
		
		$active = $(this);
		$content = $(this.hash);
		
		$active.addClass('active');
		$content.show();
		$content.addClass('visible');
		
		e.preventDefault();
	});
	
	$('.sorter').change(function(){
		$('ul.tabs li a').removeClass('active');
		$('.tabs-test .tab').hide();
		tactive = this.value;
		tcontent = $('#'+tactive);
		tcontent.show();
		$('.tabs li a.'+tactive).addClass('active');
	});
});


$('#locationCalendar').each(function(){
	$(this).find('a:first-of-type').addClass('active');
	
	$(this).find('a.filter').on('click', function(e){
		
		var $active = 'active';
		var $link = $(this).attr('href');
		var $siblingLinks = $(this).siblings();
		$siblingLinks.removeClass('active');
		
		if(!$(this).hasClass($active)){
			$(this).addClass($active);
		}
		
		var $matchedContent = $(this).parent('div').next('div').find($link);
		$matchedContent.show();
		
		var $otherContent = $matchedContent.siblings('div').not($link);
		$otherContent.hide();
		
		e.preventDefault();
	});
});