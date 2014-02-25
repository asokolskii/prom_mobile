/**
 * В этом файле описан функционал, который реализует плавающий баннер в правой части сайта :)
 */
 
$(document).ready(function(){

	if( $('#fixed').size() ) {
		show_float_block('#fixed', '.aside', '#tabs')
	}
	if( $('#fixed2').size() ) {
		show_float_block('#fixed2', '#sidebar', '.sub-menu')
	}

})

function show_float_block(selector, sidebar, bottom){
	
	var float_block = $(selector)
	//console.log(float_block.size())
	
	if(! float_block.size()) return ;
	
	var float_block_width = float_block.width()
	
	//console.log(float_block_width)
	
	var sidebar = $(sidebar)
	if(! sidebar.size()) return ;
	
	var show_float_block = false
	
	$(window).bind('scroll resize', function () { 
		
		if(show_float_block == false){
			var last_sidebar_item_bottom = sidebar.offset().top + sidebar.outerHeight()
		}else{
			var last_sidebar_item_bottom = sidebar.offset().top + sidebar.outerHeight() + float_block.outerHeight() + 120// 20 - margin-bottom %)
			console.log(last_sidebar_item_bottom)
		}
		
		//console.log('last_sidebar_item_bottom', last_sidebar_item_bottom, 'float_block.outerHeight()', float_block.outerHeight() )
				
		if( (float_block.outerHeight() + 120 + this.pageYOffset) > $(bottom).offset().top  ){
			if(show_float_block == true){
			  float_block.removeClass('float_block').css('width', 'auto')
			  //console.log('width auto')
			}
			show_float_block = false
			//console.log('false')
		}else{
  		if( this.pageYOffset > last_sidebar_item_bottom) {
  			if(show_float_block == false){
  				float_block.addClass('float_block').css('width', float_block_width+'px')
  				//console.log('width '+float_block_width)
  				float_block.animate({ opacity: 0 }, 0, function() {
  					float_block.animate({ opacity: 1 }, 500)
  
  				})
  				
  			}
  			show_float_block = true
  		}else{
  			if(show_float_block == true){
  			 	float_block.removeClass('float_block').css('width', 'auto')
  			 	//console.log('width auto')
  			}
  			show_float_block = false
  		}
		}
	})
}