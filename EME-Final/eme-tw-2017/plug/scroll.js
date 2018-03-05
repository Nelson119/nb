/*!
 * VERSION: 
 * DATE: 2015-11-05
 * 
 * @author: https://www.bram.us/2013/11/20/scroll-animations/
 **/
jQuery(function($) {
  
  // Function which adds the 'animated' class to any '.animatable' in view
  
});

function activeScrollAnimation(){
	var doAnimations = function() {
    
    // Calc current offset and get all animatables
    var offset = $(window).scrollTop(),
        $animatables = $('.animatable');
    
    // Unbind scroll handler if we have no animatables
    if ($animatables.size() == 0) {
      $(window).off('scroll', doAnimations);
    }
    
    // Check all animatables and animate them if necessary
    $animatables.each(function(i) {
       var $animatable = $(this);
       		//console.log($animatable.attr('id')+'   '+$animatable.offset().top+' window height'+$(window).height()+' scroll:'+offset);
            //if (($animatable.offset().top + $animatable.height() - 100) < offset && !$animatable.hasClass('wait')) {
	        if ($animatable.offset().top < offset+($(window).height()/4)*3 && !$animatable.hasClass('wait')) {
		        if($(window).width()>780&&!$('.iOS').length&&!$('.Android').length){
			       
					$animatable.removeClass('animatable').addClass('animated');
				}
            }
            
            if($animatable.hasClass('must_trig')){
	             if($(window).width()>780&&!$('.iOS').length&&!$('.Android').length){
					$animatable.removeClass('animatable').addClass('animated');
				}
            }
    });

    };
  
  // Hook doAnimations on scroll, and trigger a scroll
    $(window).scroll(doAnimations);
    setTimeout(function(){
	    $(window).trigger('scroll');
	}, 600);	 
    //$('.main-wrap').scroll(doAnimations);
	
}