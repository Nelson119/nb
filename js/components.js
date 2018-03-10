'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, TweenMax*/

app.partial.kv = function ($, container) {
    container.on('page:update', function (page, menu) {
        container.addClass('loaded');
        init();
        var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
        function init() {
            canvas = document.getElementById("canvas");
            anim_container = document.getElementById("animation_container");
            dom_overlay_container = document.getElementById("dom_overlay_container");
            var comp = AdobeAn.getComposition("CF409181587A4AAF898CEE3A64B2124B");
            var lib = comp.getLibrary();
            handleComplete({}, comp);
        }

        function handleComplete(evt, comp) {
            //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
            var lib = comp.getLibrary();
            var ss = comp.getSpriteSheet();
            exportRoot = new lib.kv();
            stage = new lib.Stage(canvas);
            //Registers the "tick" event listener.
            fnStartAnimation = function fnStartAnimation() {
                stage.addChild(exportRoot);
                createjs.Ticker.setFPS(lib.properties.fps);
                createjs.Ticker.addEventListener("tick", stage);
            };
            //Code to support hidpi screens and responsive scaling.
            function makeResponsive(isResp, respDim, isScale, scaleType) {
                var lastW,
                    lastH,
                    lastS = 1;
                window.addEventListener('resize', resizeCanvas);
                resizeCanvas();

                function resizeCanvas() {
                    var w = lib.properties.width,
                        h = lib.properties.height;
                    var iw = $('.viewport', container).innerWidth(),
                        ih = $('.viewport', container).innerHeight();
                    var pRatio = window.devicePixelRatio || 1,
                        xRatio = iw / w,
                        yRatio = ih / h,
                        sRatio = 1;
                    if (isResp) {
                        if (respDim == 'width' && lastW == iw || respDim == 'height' && lastH == ih) {
                            sRatio = lastS;
                        } else if (!isScale) {
                            if (iw < w || ih < h) sRatio = Math.min(xRatio, yRatio);
                        } else if (scaleType == 1) {
                            sRatio = Math.min(xRatio, yRatio);
                        } else if (scaleType == 2) {
                            sRatio = Math.max(xRatio, yRatio);
                        }
                    }
                    canvas.width = w * pRatio * sRatio;
                    canvas.height = h * pRatio * sRatio;
                    canvas.style.width = dom_overlay_container.style.width = anim_container.style.width = w * sRatio + 'px';
                    canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h * sRatio + 'px';
                    stage.scaleX = pRatio * sRatio;
                    stage.scaleY = pRatio * sRatio;
                    lastW = iw;
                    lastH = ih;
                    lastS = sRatio;
                    stage.tickOnUpdate = false;
                    stage.update();
                    stage.tickOnUpdate = true;
                }
            }
            makeResponsive(true, 'width', true, 1);
            AdobeAn.compositionLoaded(lib.properties.id);
            fnStartAnimation();
        }
    });
};
//# sourceMappingURL=kv.js.map

'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, TweenMax*/

app.partial.s1 = function ($, container) {
	var triggerArr = [];
	container.on('page:update', function (page, menu) {
		container.addClass('loaded');
		$('.slick:not(.slick-initialized) .slide', container).each(function (index) {
			triggerArr[index] = [];
			$('img[data-src*=gif]:visible,img[src*=gif]:visible', this).each(function () {
				var strid = 'frameset' + new Date() * 1;
				this.id = strid;
				var ff = new freezeframe({

					'selector': '#' + strid,
					'animation_play_duration': 'infinity'
				}).capture().setup();
				triggerArr[index].push(ff);
			});
		});

		$('.slick:not(.slick-initialized)', container).slick({
			dots: true,
			arrows: true
		}).on('beforeChange', function (event, slick, currentSlide) {
			$(triggerArr[currentSlide]).each(function () {
				this.release();
			});
		}).on('afterChange', function (event, slick, currentSlide) {
			$(triggerArr[currentSlide]).each(function () {
				this.trigger();
			});
		}).on('init', function () {});
	}).on('section:in', function () {
		if (!$(this).hasClass('in')) {
			try {
				var currentSlide = $('.slick', container).slick('slickCurrentSlide');
				$(triggerArr[currentSlide]).each(function () {
					this.trigger();
				});
				$(this).addClass('in');
			} catch (e) {}
		}
	});
};
//# sourceMappingURL=s1.js.map

'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, TweenMax*/

app.partial.s2 = function ($, container) {
	var triggerArr = [];
	container.on('page:update', function (page, menu) {
		container.addClass('loaded');
		$('.slick:not(.slick-initialized) .slide', container).each(function (index) {
			triggerArr[index] = [];
			$('img[data-src*=gif]:visible,img[src*=gif]:visible', this).each(function () {
				var strid = 'frameset' + new Date() * 1;
				this.id = strid;
				var ff = new freezeframe({

					'selector': '#' + strid,
					'animation_play_duration': 'infinity'
				}).capture().setup();
				triggerArr[index].push(ff);
			});
		});
		$('.slick:not(.slick-initialized)', container).slick({
			dots: true,
			arrows: true
		}).on('afterChange', function (event, slick, currentSlide) {
			$(triggerArr[currentSlide]).each(function () {
				this.trigger();
			});
		}).on('init', function () {
			$('.slick', container).trigger('afterChange');
		});
	}).on('section:in', function () {
		if (!$(this).hasClass('in')) {
			try {
				var currentSlide = $('.slick', container).slick('slickCurrentSlide');
				$(triggerArr[currentSlide]).each(function () {
					this.trigger();
				});
				$(this).addClass('in');
			} catch (e) {}
		}
	});
};
//# sourceMappingURL=s2.js.map

'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, TweenMax*/

app.partial.s3 = function ($, container) {
	var triggerArr = [];
	container.on('page:update', function (page, menu) {
		container.addClass('loaded');
		$('.slick:not(.slick-initialized) .slide', container).each(function (index) {
			triggerArr[index] = [];
			$('img[data-src*=gif]:visible,img[src*=gif]:visible', this).each(function () {
				var strid = 'frameset' + new Date() * 1;
				this.id = strid;
				var ff = new freezeframe('#' + strid).capture().setup();
				triggerArr[index].push(ff);
			});
		});
		$('.slick:not(.slick-initialized)', container).slick({
			dots: true,
			arrows: true
		}).on('afterChange', function (event, slick, currentSlide) {
			$(triggerArr[currentSlide]).each(function () {
				this.trigger();
			});
		}).on('init', function () {
			$('.slick', container).trigger('afterChange');
		});
	}).on('section:in', function () {
		if (!$(this).hasClass('in')) {
			try {
				var currentSlide = $('.slick', container).slick('slickCurrentSlide');
				$(triggerArr[currentSlide]).each(function () {
					this.trigger();
				});
				$(this).addClass('in');
			} catch (e) {}
		}
	});
};
//# sourceMappingURL=s3.js.map

'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, TweenMax*/

app.partial.s4 = function ($, container) {
	container.on('page:update', function (page, menu) {
		container.addClass('loaded');
		var triggerArr = [];
		$('.slick >*', container).each(function (index) {
			triggerArr[index] = [];
			$('img[data-src*=gif]', this).each(function () {
				var strid = 'frameset' + new Date() * 1;
				this.id = strid;
				var ff = new freezeframe('#' + strid).capture().setup();
				triggerArr[index].push(ff);
			});
		});
		$('.slick', container).slick({
			dots: true,
			arrows: true
		}).on('afterChange', function (event, slick, currentSlide) {
			$(triggerArr[currentSlide]).each(function () {
				this.trigger();
			});
		}).on('init', function () {
			$('.slick', container).trigger('afterChange');
		});
	});
};
//# sourceMappingURL=s4.js.map
