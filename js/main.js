'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global  $, jQuery, TweenMax */

var app = {};
app.partial = {};

if ($ || jQuery) {
	app.$ = $.noConflict() || jQuery.noConflict();
}
(function ($) {
	$(function () {

		var conts = [];

		// 定義每個元件
		$.each(app.partial, function (name, init) {
			var cont = $('[role=' + name + ']');
			init($, cont);
			conts.push(cont);
		});
		app.imageReload.callback = function () {
			$(conts).each(function () {
				this.trigger('page:update');
			});
			$('[role=content]').addClass('loaded');
		};
		app.imageReload.init();

		var scrolling = 0;
		$(window).on('scroll', function () {
			var offsetTop = $('header').offset().top + $('header').outerHeight(); // + $('[role=content] .kv-container').outerHeight();
			if ($(window).scrollTop() >= offsetTop) {
				$('[role=content]').addClass('fixed-menu');
				// $('[role=content]').css('padding-top', $('[role=content] header').outerHeight() + 'px');
			} else {
				$('[role=content]').removeClass('fixed-menu');
				// $('[role=content]').css('padding-top', 0);
			}
		}).trigger('scroll');

		$('[role=content] header nav a').on('click', function (e) {
			var headerOffset = 0; //$('.fixed-menu[role=content] header').length ? 0 : $('[role=content] header').offset().top;
			var headerOffset = $('html.desktop').length ? 0 : $('[role=content] header').outerHeight();
			var headerHeight = $('html.desktop').length ? $('[role=content] header nav').outerHeight() : $('[role=content] header').outerHeight();
			var offset = headerHeight - headerOffset;
			var target = $($(this).attr('href'));
			var to = target.length ? target.offset().top - offset : $('header').outerHeight();
			TweenMax.to('html, body', 0.75, {
				scrollTop: to
			});
			e.stopPropagation();
			e.preventDefault();
			$(this).parents('header').removeClass('in');
			return false;
		});

		$('[role=content] header .burger').on('click', function (e) {
			$('[role=content] header').toggleClass('in');
		});

		var range = {},
		    activeSection = null,
		    scrollTop = 0;

		$('[data-nav]').each(function (i) {

			var id = $(this).attr('id');

			var title = $(this).data().nav;

			title.replace(/[&]nbsp[;]/ig, ' ').replace(/\s/ig, ' ');

			var ele = this;

			// var a = $('header nav a[href=#'+id+']');


			range[id] = {};
			// if(!$('#'+id).length){
			// 	return;
			// }
			range[id].ele = this;
			range[id].top = function () {
				return $(this.ele).offset().top;
			};
			range[id].butt = function () {
				return $(this.ele).offset().top + $(this.ele).outerHeight();
			};
			range[id].middle = function () {
				var middle = $(this.ele).offset().top + $(this.ele).outerHeight() / 2;
				return middle;
			};
			range[id].height = function () {
				return $(this.ele).outerHeight();
			};
			range[id].title = title;
		});

		var sTop = $(window).scrollTop();
		$(window).on('scroll', function () {
			var direction = $(window).scrollTop() > sTop;
			sTop = $(window).scrollTop();

			var currentTop = $(window).scrollTop();
			var currentButt = $(window).scrollTop() + $(window).height();
			var currentMid = $(window).scrollTop() + $(window).height() / 2;
			var navButton = $('[role=content] header nav [href$=' + activeSection + ']');
			$('[data-nav]').each(function (i, section) {
				var sectionId = $(this).attr('id');
				var rg = range[sectionId];

				if (rg.height() <= $(window).height() * 2 && rg.middle() >= currentTop && rg.middle() <= currentButt) {
					if (activeSection != sectionId) {
						activeSection = sectionId;
					}
				}
				if (rg.height() > $(window).height() && rg.top() <= currentMid && rg.butt() >= currentMid) {
					if (activeSection != sectionId) {
						activeSection = sectionId;
					}
				}
				if (activeSection == 'index') {
					navButton = $('[role=main] header nav a:eq(0)');
				}
				if (activeSection && !navButton.hasClass('active')) {
					// console.log(navButton);
					var href = location.href;
					// console.log(activeSection);
					// if(activeSection != 'index'){
					// 	href = './' + location.search + '#' + activeSection;
					// }else{
					// 	if(history.pushState){
					// 		href =  './' + location.search;
					// 	}else{
					// 		href = './' + location.search + '#';
					// 	}
					// }
					$(navButton).addClass('active').trigger('button:active').siblings().removeClass('active');
					$('#' + activeSection).trigger('section:in');
					// if(history.pushState){
					// 	history.pushState(null, $(this).data().nav, href);
					// }else {
					// 	window.location.hash = href;
					// }
				}
				scrollTop = currentTop;
			});
		});

		$('[role=content] header nav').removeClass('in');

		var vb = $('.veno').venobox({
			cb_post_open: function cb_post_open(obj, gallIndex, thenext, theprev) {
				$('.veno-close').on('click', function () {
					vb.VBclose();
				});
			}

		});
	});
})(app.$);
//# sourceMappingURL=app.js.map

'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $ */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

app.utility = new function () {
	var $ = app.$;

	//判斷是否具有屬性
	$.fn.hasAttr = function (attributeName) {
		var attr = $(this).attr(attributeName);
		if ((typeof attr === 'undefined' ? 'undefined' : _typeof(attr)) !== (typeof undefined === 'undefined' ? 'undefined' : _typeof(undefined)) && attr !== false) {
			return true;
		} else {
			return false;
		}
	};

	this.share = {
		facebook: function facebook(href, title) {
			href = encodeURIComponent(href || location.href + '?utm_source=facebook&utm_medium=fbshare_m&utm_campaign=camp');
			title = encodeURIComponent(title || document.title);
			window.open('https://www.facebook.com/sharer.php?u=' + href + '&amp;t=' + title);
		},
		googleplus: function googleplus(href) {
			href = encodeURIComponent(href || location.href + '?utm_source=g+&utm_medium=googleplus_m&utm_campaign=camp');
			window.open('https://plus.google.com/share?url=' + href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
		},
		email: function email(href, title) {
			href = encodeURIComponent(href || location.href + '?utm_source=email&utm_medium=email_m&utm_campaign=camp');
			title = encodeURIComponent(title || document.title);
			var body = encodeURIComponent('' + href + ' #' + title + '');
			window.open('https://mail.google.com/mail/?view=cm&fs=1&to=&su=與你分享:' + title + '&body=' + body + '&bcc=');
		}
	};

	this.getParam = function (name) {
		var r = new RegExp('^.*[?&]' + name + '[=]([^&]+).*$', 'i');
		if (!r.test(location.search)) {
			return null;
		}
		var value = location.search.replace(r, '$1');
		return decodeURIComponent(value);
	};
}();
//# sourceMappingURL=utility.js.map

'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app */

app.partial.preload = function ($) {

	app.dementions = {
		mobile: false,
		desktop: false
	};

	function imageReload(callback) {

		var imagePreload = {},
		    elements = [];

		var main = $('img[data-src]:visible, figure[data-src]:visible').not('.loaded');
		main.each(function (idx, ele) {
			if ($(ele).attr('data-src')) {
				imagePreload[$(ele).attr('data-src')] = false;
				elements.push(ele);
			}
		});
		// console.log(main);

		$.each(imagePreload, function (src, stat) {
			if (/\.svg$/.test(src)) {

				$.get(src, function (svg) {
					var ret = $(elements).filter(function () {
						return src == $(this).attr('data-src');
					}).each(function (i, ele) {
						$(ele).addClass('loaded');
						if (ele.tagName.toLowerCase() === 'img') {
							$('svg', svg).clone().attr('class', $(ele).attr('class')).insertAfter(ele);
							$(ele).remove();
						} else {
							$(ele).removeAttr('data-src').html($('svg', svg).clone());
						}
					});
					checkAll(src);
				});
			} else {
				var img = new Image();
				img.onload = function () {
					var ret = $(elements).filter(function () {
						return src == $(this).attr('data-src');
					}).each(function (i, ele) {
						$(ele).addClass('loaded');
						if (ele.tagName.toLowerCase() === 'img') {
							$(ele).attr('src', $(ele).attr('data-src'));
						} else {
							$(ele).css('background-image', 'url(' + $(ele).attr('data-src') + ')');
						}
					});
					checkAll(src);
				};
				img.src = src;
			}
		});
		if (!main.length) {
			//沒有圖片
			// console.log('沒有圖片');
			imageLoaded();
		}

		function checkAll(src) {

			imagePreload[src] = true;
			var alldone = true;
			$.each(imagePreload, function ($s, $done) {
				alldone = $done && alldone;
			});
			if (alldone) {
				//全部圖片下載完成
				imageLoaded();
			}
		}

		function imageLoaded() {
			if (typeof app.imageReload.callback == 'function') {
				app.imageReload.callback();
			}
		}
	}

	app.imageReload = {
		init: function init() {
			$(window).on('resize', function () {
				var main = $('img[data-src]:visible, figure[data-src]:visible').not('[src],[style]');

				// if(main.length && $(window).width()){
				imageReload(function () {});
				// } else{
				// 	app.imageReload.callback();
				// }
			}).trigger('resize');
		},
		refresh: function refresh() {
			$(window).trigger('resize');
		},
		callback: function callback() {}
	};
};
//# sourceMappingURL=preload.js.map
