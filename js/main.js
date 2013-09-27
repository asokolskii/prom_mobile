$(function(){
	$( ".btn-search" ).bind( "click", function(){
		console.log('!')
		$('#'+$(this).attr('rel')).fadeIn(300,function(){
			var searchBox = $('.search-form')
			var searchWidth = $('body').width();
			searchBox.css('left',-searchWidth)
					 .show()
					 .animate({'left':0}, 300);
		});
		return false;
	})
	$( ".btn-menu" ).bind( "click", function(){
		console.log('2!')
		$('#'+$(this).attr('rel')).fadeIn(300,function(){
			var searchBox = $('.side-menu')
			var searchWidth = $('body').width();
			searchBox.css('left',-searchWidth)
					 .show()
					 .animate({'left':0}, 300);
		});
		return false;
	})
	$('.popup .bg').bind('click',function(){
		$(this).parent().fadeOut(300);
		$('.search-form').hide();
		$('.side-menu').hide();
	})

	$('.tabset a').click(function(){
        var click_id=$(this).attr('href');
        if (click_id != $('.tabset a.active').attr('href') ) {
            $('.tabset a').parent().removeClass('active');
            $(this).parent().addClass('active');
            $('.tab').removeClass('active');
            $(click_id).addClass('active');
        }
        return false
    })
    $.fn.touchwipe = function(settings) {
		var config = {
				min_move_x: 20,
				wipeLeft: function() {
					if ($('.img-list').is(':animated')) return false;
					var leftAlign = parseInt($('.img-list').css('left')),
						countImgs = $('.img-list li').length,
						elWidth = $('.img-list li').outerWidth();
					if(!leftAlign){
						leftAlign = 0;
					}
					if (leftAlign-elWidth>-countImgs*elWidth){
						$('.img-list').animate({
							'left': '-=265'
						},400)
						pagerNext();
					} 
				},
				wipeRight: function() {
					if ($('.img-list').is(':animated')) return false;
					var leftAlign = parseInt($('.img-list').css('left')),
						countImgs = $('.img-list li').length,
						elWidth = $('.img-list li').outerWidth();
					if(!leftAlign){
						leftAlign = 0;
					}
					if (leftAlign<0){
						$('.img-list').animate({
							'left': '+=265'
						},400);
						pagerPrev();
					} 
				},
				preventDefaultEvents: true
		};
		if (settings) $.extend(config, settings);
		this.each(function() {
			var startX, startY;
			var isMoving = false;

			function cancelTouch() {
				this.removeEventListener('touchmove', onTouchMove);
				startX = null;
				isMoving = false;
			}	
			 
			function onTouchMove(e) {
				if(isMoving) {
					var x = e.touches[0].pageX;
					var y = e.touches[0].pageY;
					var dx = startX - x;
					if(Math.abs(dx) >= config.min_move_x) {
						/*
						if(startY != y && config.preventDefaultEvents) {
							e.preventDefault();
							return false;
						}
						*/
						cancelTouch();
						if(dx > 0) {
							config.wipeLeft();
						}
						else {
							config.wipeRight();
						}
					}
				}
			}
			function onTouchStart(e)
			{
				if (e.touches.length == 1) {
					startX = e.touches[0].pageX;
					startY = e.touches[0].pageY;
					isMoving = true;
					this.addEventListener('touchmove', onTouchMove, false);
				}
			}    	 
			this.addEventListener('touchstart', onTouchStart, false);
		});
		return this;
	};
	
	function pagerNext(){
		$('.pager').find('.active').removeClass('active').next().addClass('active')
	}
	function pagerPrev(){
		$('.pager').find('.active').removeClass('active').prev().addClass('active')
	}
	
	$('.img-list').touchwipe();
});