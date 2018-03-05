/**
 * jquery.snow - jQuery Snow Effect Plugin
 *
 * Available under MIT licence
 *
 * @version 1 (21. Jan 2012)
 * @author Ivan Lazarevic
 * @requires jQuery
 * @see http://workshop.rs
 *
 * @params minSize - min size of snowflake, 10 by default
 * @params maxSize - max size of snowflake, 20 by default
 * @params newOn - frequency in ms of appearing of new snowflake, 500 by default
 * @params flakeColor - color of snowflake, #FFFFFF by default
 * @example $.fn.snow({ maxSize: 200, newOn: 1000 });
 */
//var snowingCheck = false;
(function($){
	
	$.fn.extend({
		snow: function(options){
	
			var $flake 			= $('<div id="flake" />').css({'position': 'absolute', 'top': '-50px', 'z-index':'99'}).html('<img class="svg" src="images/section_home_snow_bg.svg">'),
				documentHeight 	= $(document).height(),
				documentWidth	= $(document).width(),
				defaults		= {
									minSize		: 10,
									maxSize		: 20,
									newOn		: 500,
									flakeColor	: "#33333"
								},
				options			= $.extend({}, defaults, options);
				
			
			var interval		= setInterval( function(){
				//if(snowingCheck){
				if($('#wrap').attr('current-position')=='banner'){
					snowing();
				}
			}, options.newOn);
			
			function snowing(){
				var startPositionLeft 	= Math.random() * documentWidth - 100,
				 	startOpacity		= 0.5 + Math.random(),
				 	className           = Math.floor(Math.random() * (5 - 1 + 1)) + 1; 
					sizeFlake			= options.minSize + Math.random() * options.maxSize,
					endPositionTop		= $(window).height() +100,
					endPositionLeft		= startPositionLeft - 100 + Math.random() * 200,
					rotateType          = Math.floor(Math.random() * (50 - -50 + 1)) + -50; 
					durationFall		= $(window).height() * 10 + Math.random() * 100;
				var cloneSnow = $flake.clone();
				
				cloneSnow.addClass('shaking star star_'+className);
				cloneSnow.appendTo('#banner')
					.css(
						{
							left: startPositionLeft,
// 							opacity: startOpacity,
							'font-size': sizeFlake
						}
					);
				cloneSnow.animate(
					{
						top: endPositionTop
					},
					durationFall,
					'linear',
					function() {
						$(this).remove()
					}
				);
/*
				TweenLite.to(cloneSnow, durationFall*0.001, {top:endPositionTop, left: startPositionLeft, onComplete:function(){
					this.target.remove();
				}});
*/
			}
	
		},
		
		startSnow : function(){
			snowingCheck = true;
		},
		
		stopSnow : function(){
			snowingCheck = false;
		}
		
	});
	$.fn.extend({
		snow: $.fn.snow
	});
	
})(jQuery);