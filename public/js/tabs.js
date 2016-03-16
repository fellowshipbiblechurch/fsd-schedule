/* # Tabs from jacklmoore
================================================== */

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