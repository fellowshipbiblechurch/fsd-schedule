/* # Tabs for Mobile Schedule
================================================== */


if ($(window).width() < 568) {
	$('.schedule__wrapper').addClass('mobile');
}

if ($('.schedule__wrapper').hasClass('mobile')) {
	
	$('.schedule__wrapper').each(function(){
		
		var cells = $('td').each(function(){return $(this);});
		var arrows = $('.studio__arrow').each(function(){return $(this);});
		var studios = $('[class*="__heading--studio-"]');
		var columnA = cells.filter($('[data-studio="a"]'));
		var columnB = cells.filter($('[data-studio="b"]'));
		var columnC = cells.filter($('[data-studio="c"]'));
		
		var $arrowActive = arrows[0];
		var $studioHeadingActive = studios[0];
		var $studioContentActive = [];
		
		console.log($arrowActive);
		console.log(studios);
		
		columnB.hide();
		columnC.hide();
		
		
		$('[class*="__heading--studio-"]').each(function(){
			
			
			$(this).on('click', function(){
				
				var activeArrow = $(this).find('.studio__arrow');
				var studioName = $(this).children('span:first-of-type').text().toLowerCase().split(' ')[1];
				var studioHeading = activeArrow.closest('[class*="__heading--studio-"]');
				var visibleCells = cells.filter($('[data-studio="' + studioName + '"]'));
				var hiddenCells = cells.not(visibleCells);
				
				// arrows -> refactor using toggleClass('active')
				activeArrow.show();
				arrows.not(activeArrow).hide();
				
				// studio cells -> refactor using toggleClass('visible')
				visibleCells.not('.cell__index, .cell__heading, .cell__heading--blank').show();
				hiddenCells.not('.cell__index, .cell__heading, .cell__heading--blank').hide();
				
				console.log('visibleCells', visibleCells.not('.cell__index, .cell__heading--blank'));
				console.log('hiddenCells', hiddenCells.not('.cell__index, .cell__heading--blank'));
			});
		});
	});
}



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