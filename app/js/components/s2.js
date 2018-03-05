'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, TweenMax*/
app.partial.s2 = function($, container){
	var triggerArr = [];
	container.on('page:update' , function(page, menu){
		container.addClass('loaded');
		$('.slick:not(.slick-initialized) .slide', container).each(function(index){	
			triggerArr[index] = [];
			$('img[data-src*=gif]', this).each(function(){
				var strid = 'frameset' + (new Date*1);
				this.id = strid;
				var ff = new freezeframe('#'+strid).capture().setup();
				triggerArr[index].push(ff);
			});
		});
		$('.slick:not(.slick-initialized)', container).slick({
			dots: true,
			arrows: true
		}).on('afterChange', function(event, slick, currentSlide){
			$(triggerArr[currentSlide]).each(function(){
				this.trigger();
			});
		}).on('init', function(){
			$('.slick', container).trigger('afterChange');
		});
	}).on('section:in', function(){
		if(!$(this).hasClass('in')){
			try{
				var currentSlide = $('.slick', container).slick('slickCurrentSlide');
				$(triggerArr[currentSlide]).each(function(){
					this.trigger();
				});
				$(this).addClass('in');
			}catch(e){
			}

		}
	});
};
