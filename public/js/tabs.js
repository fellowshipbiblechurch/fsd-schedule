/* # Tabs for Mobile Schedule
================================================== */

var $scheduleWrapper = $('.schedule__wrapper');

if ($(window).width() < 568) {
	$scheduleWrapper.addClass('mobile');
}

if ($scheduleWrapper.hasClass('mobile')) {
	
	$scheduleWrapper.each(function(){
		
		var $cells = $('td').not('.cell__index, .cell__heading, .cell__heading--blank');
		var $arrows = $('.studio__arrow');
		var studios = [
			$cells.filter($('[data-studio="a"]')),
			$cells.filter($('[data-studio="b"]')),
			$cells.filter($('[data-studio="c"]'))
		];
		var $headings = $('[class*="__heading--studio-"]');
		
		// initialize studio A as active and visible
		studios[0].addClass('visible');
		$($arrows[0]).addClass('active');
		$($headings[0]).addClass('active');
		
		$headings.each(function(){
			
			$(this).on('click', function(){
				
				var $thisHeading = $(this);
				var $thisArrow = $(this).find('.studio__arrow');
				var activeStudio = $(this).children().first().text().toLowerCase().split(' ')[1];
				
				$thisArrow.addClass('active');
				$thisHeading.addClass('active');
				$arrows.not($thisArrow).removeClass('active');
				$headings.not($thisHeading).removeClass('active');
				
				var visibleCells = $cells.filter($('[data-studio="' + activeStudio + '"]'));
				var hiddenCells = $cells.not(visibleCells);
				
				visibleCells.show();
				visibleCells.addClass('visible');
				visibleCells.removeClass('hidden');
				hiddenCells.addClass('hidden');
				hiddenCells.removeClass('visible');
				hiddenCells.hide();
			});
		});
	});
}




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