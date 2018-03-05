jQuery(document).ready(function () {
	detectBroswer();
	
	setBasicVisualContent();//設定基本視覺變換
	adjustPosition();
	
	setSVG();
	
	setBannerSectionSize();
	
	setSnowing();
	
	setSlider();
	
	detectScrollPosition();
	
	setFloatView();
	
	setGoogleAnalytics();
});
var float_pic_1, float_pic_2, float_pic_3;
var activeBox;

function setGoogleAnalytics(){
	$('.analytics_btn').click(function(){
		var event = $(this).attr('event-type');
		var target = $(this).attr('target-name');
		
		ga('send', 'event', event, target);
	});
}

function setFloatView(){
	var boxWrap = $('#float_view .float_box_wrap');
	$('.active_float_view').each(function(){
		if(!$('.Windows.IE').length){
			if($(window).width()>780&&!$('.iOS').length&&!$('.Android').length){
				$(this).hover(
					function(){
						var obj = $(this).find('.box_btn_wrap');
						var floatViewWidth = boxWrap.width();
						var floatViewHeight = boxWrap.height();
						var resizeScaleX = obj.width()/floatViewWidth;
						var resizeScaleY = obj.parent().height()/floatViewHeight;
						
						TweenLite.to(boxWrap, 0.6, {left: obj.offset().left, top:  obj.offset().top-$(window).scrollTop(), scaleX:  resizeScaleX, scaleY:  resizeScaleY, marginLeft:0, marginTop:0, transformOrigin:'0% 0%', ease:Power3.easeOut});
						
					}, function(){
						
					}
				);
			}
		}
		
		
		$(this).click(function(){
			activeBox = $(this);
			activeFloatView($(this).attr('float-link'));
		});
		
		$(this).on("tap",function(){
			
			//activeBox = $(this);
			//activeFloatView($(this).attr('float-link'));
		});
	});
	
	$('#section_C .boxes .box_btn .box_btn_wrap .intro').each(function(){
		$(this).hover(
			function(){
				
			}, function(){
				
			}
		);
	});
	
	if(!$('.Windows.IE').length){
		if($(window).width()>780&&!$('.iOS').length&&!$('.Android').length){
			float_pic_1 = new freezeframe('.float_pic_1').capture().setup();
			float_pic_2 = new freezeframe('.float_pic_2').capture().setup();
			float_pic_3 = new freezeframe('.float_pic_3').capture().setup();
	    }
    }
    
	$('#float_view #cancel_btn, #float_view #bg').click(disactiveFloatView);
}

function disactiveFloatView(){
	var boxWrap = $('#float_view .float_box_wrap');
	var obj = activeBox.find('.box_btn_wrap');
	var floatViewWidth = boxWrap.width();
	var floatViewHeight = boxWrap.height();
	var resizeScaleX = obj.width()/floatViewWidth;
	var resizeScaleY = obj.parent().height()/floatViewHeight;
	
	$('#float_view').removeClass('active');
	
	if(!$('.Windows.IE').length){
		$('#float_view .float_box_wrap .float_box.active').removeClass('active');
		if($(window).width()>780&&!$('.iOS').length&&!$('.Android').length){
			TweenLite.to(boxWrap, 0.4, {left: obj.offset().left, top:  obj.offset().top-$(window).scrollTop(), scaleX:  resizeScaleX, scaleY:  resizeScaleY, marginLeft:0, marginTop:0, transformOrigin:'0% 0%', ease: Power4.easeOut});
		}
	}else{
		$('#float_view').fadeOut(300);
		setTimeout(function(){
			$('#float_view .float_box_wrap .float_box.active').removeClass('active');
		}, 300);
	}
	
	setTimeout(function(){
		if(!$('.Windows.IE').length){
			if($(window).width()>780&&!$('.iOS').length&&!$('.Android').length){
				switch(boxWrap.parent().attr('float-link')){
					case '1':
						float_pic_1.release();
						break;
					case '2':
						float_pic_2.release();
						break;
					case '3':
						float_pic_3.release();
						break;
				}
		    }
	    }
	}, 500);
	
}

function activeFloatView(num){
	var boxWrap = $('#float_view .float_box_wrap');
	var top = '50%';
	var left = '50%';
	var marginLeft = -568;
	var marginTop = -333;
	
	if($(window).height()<700){
		top = 0;
		marginTop = 16;
	}
	
	if($(window).width()<780){
		top = '2.5%';
		left = '2.5%';
		marginLeft = 0;
		marginTop = 0;
	}else if($(window).width()<992){
		marginLeft = -375;
		marginTop = -275;
	}else if($(window).width()<1200){
		marginLeft = -480;
	}
	
	if(!$('.Windows.IE').length){
	    if($(window).width()>780&&!$('.iOS').length&&!$('.Android').length){
			switch(num){
				case '1':
					float_pic_1.trigger();
					break;
				case '2':
					float_pic_2.trigger();
					break;
				case '3':
					float_pic_3.trigger();
					break;
			}
	    }
    }else{
	    $('#float_view').fadeIn(300);
    }
	
	$('#float_view .float_box_wrap .float_box#box_'+num).addClass('active').siblings().removeClass('active');
	
	$('#float_view').addClass('active');
	TweenLite.to(boxWrap, 0.8, {left: left, top: top, scaleX:  1, scaleY:  1, marginLeft:marginLeft, marginTop:marginTop, transformOrigin:'0% 0%', ease:Expo.easeOut});
}

function detectScrollPosition(){
	$(window).scroll(checkScrollPosition);
	
	function checkScrollPosition(){
		var offset = $(window).scrollTop();
		
		$('#header #menu .menu a').each(function(){
			var section = $('#'+$(this).attr('scroll-target'));
			
			var viewzone = ($(window).height()/3)+offset;
				
			if(viewzone>section.offset().top&&viewzone<(section.offset().top+section.height()+50)){
				$('#wrap').attr('current-position', $(this).attr('scroll-target'));
				$(this).parent().addClass('active').siblings().removeClass('active');
			}
		})
		
		if($('#menu_btn #menu_toggle_btn').hasClass('active')){
			$('#wrap').removeClass('menu-open');
			$('#menu_btn #menu_toggle_btn').removeClass('active');
			$('#menu').slideUp(300);
		}
	}
	
	checkScrollPosition();
}

function setSlider(){
	
    
    if(!$('.Windows.IE.9').length){
	    var swiper = new Swiper('.swiper-container', {
	        nextButton: '.swiper-button-next',
	        prevButton: '.swiper-button-prev',
	        pagination: '.swiper-pagination',
	        paginationClickable: true,
	        slidesPerView: 1,
	        spaceBetween: 0,
	        autoplayDisableOnInteraction: false,
	        loop: true,
	        //speed: 600,
			//autoplay: 5000, // slider pause time
	    });
	    
	    swiper.on('slideChangeStart', function (e) {
		    switch(e.activeIndex){
				case 1:
				case 5:
					$('#section_A.inner_section .section_title #slide_title_1').addClass('active').siblings().removeClass('active');
					break;
				case 2:
					$('#section_A.inner_section .section_title #slide_title_2').addClass('active').siblings().removeClass('active');
					break;
				case 3:
					$('#section_A.inner_section .section_title #slide_title_3').addClass('active').siblings().removeClass('active');
					break;
				case 4:
				case 0:
					$('#section_A.inner_section .section_title #slide_title_4').addClass('active').siblings().removeClass('active');
					break;
			}
		});
	    if($(window).width()>768){
		    var pic_1_1 = new freezeframe('.pic_1_1').capture().setup();
		    var pic_2 = new freezeframe('.pic_2').capture().setup();
		    var pic_3_1 = new freezeframe('.pic_3_1').capture().setup();
		    var pic_3_2 = new freezeframe('.pic_3_2').capture().setup();
		    var pic_4_2 = new freezeframe('.pic_4_2').capture().setup();
		    
		    var timer = setInterval(function(){
			    if($('.pic_1_1').hasClass('ff-image-ready')){
				    clearInterval(timer);
				    pic_1_1.trigger();
			    }
			}, 300);
		    swiper.on('slideChangeEnd', function (e) {
				switch(e.activeIndex){
					case 1:
					case 5:
						pic_1_1.trigger();
						pic_2.release();
						pic_3_1.release();
						pic_3_2.release();
						pic_4_2.release();
						break;
					case 2:
						pic_1_1.release();
						pic_2.trigger();
						pic_3_1.release();
						pic_3_2.release();
						pic_4_2.release();
						break;
					case 3:
						pic_1_1.release();
						pic_2.release();
						pic_3_1.trigger();
						pic_3_2.trigger();
						pic_4_2.release();
						break;
					case 4:
					case 0:
						pic_1_1.release();
						pic_2.release();
						pic_3_1.release();
						pic_3_2.release();
						pic_4_2.trigger();
						break;
				}
			});
	    }
	    
    }else{
	    var swiper = $('.swiper-container');
	    var nowSlide = 1;
	    swiper.css({
		    'height': 660,
		    'overflow': 'hidden'
	    });
	    
	    var counter = 0;
	    swiper.find('.swiper-slide').each(function(){
		    counter++;
		    $(this).addClass('slide-'+counter);
		    $(this).css({
			    'width': 1200,
			    'float': 'left'
		    });
	    })
	    swiper.find('.swiper-wrapper').css({
		    'width': 1200*counter
	    });
	    
	    swiper.find('.swiper-button-next').click(function(){
		    if(nowSlide==swiper.find('.swiper-slide').length){
			    nowSlide = 1;
		    }else{
			    nowSlide++;
		    }
		    chagneSlide();
	    })
	    
	    swiper.find('.swiper-button-prev').click(function(){
		    if(nowSlide==1){
			    nowSlide = swiper.find('.swiper-slide').length;
		    }else{
			    nowSlide--;
		    }
		    chagneSlide();
	    })
	    
	    function chagneSlide(){
		    $('#section_A.inner_section .section_title #slide_title_'+nowSlide).addClass('active').siblings().removeClass('active');
		    TweenLite.to(swiper.find('.swiper-wrapper'), 1, {marginLeft: (nowSlide-1)*-1200, ease:Power3.easeOut});
	    }
    }
}

function setSnowing(){
	//$.fn.snow({ minSize: 20, maxSize: 30, newOn: 2000});
	
}

function setBannerSectionSize(){
	$(window).resize(resizeSection);
	
	function resizeSection(){
		var height = $(window).height();
		if($(window).width()<330){
			height = 400;
		}else if($(window).width()<380){
			height = 480;
		}else if($(window).width()<600){
			height = 500;
		}else if($(window).width()<992){
			height = 540;
		}
		$('#banner').css({
			'width':$(window).width(),
			'height':height - $('#header').height(),
			'margin-top': $('#header').height()
		});
		
		$('#banner .banner_container .banner_obj_wrap #bg_snow svg').css({
			'margin-top': $('#banner .banner_container .banner_obj_wrap #bg_snow svg').height()/-2
		})
		
		if($('.IE').length){
			$('#banner .banner_container .banner_obj_wrap #bg_snow').css({
				'height':height-$('#header').height()-90,
			});
		}
		
		if($('.iOS').length||$('.Android').length){
			if($(window).width()<780){
				$('#bg_snow .rotating').removeClass('rotating');
			}
			
		}else{
			$('#bg_snow .rotating').addClass('rotating');
		}
	}
	
	resizeSection();
}


function setSVG(){
	/*
	 * Replace all SVG images with inline SVG
	 */
	jQuery('img.svg').each(function(){
	    var $img = jQuery(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');
	
	    jQuery.get(imgURL, function(data) {
	        // Get the SVG tag, ignore the rest
	        var $svg = jQuery(data).find('svg');
	
	        // Add replaced image's ID to the new SVG
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        // Add replaced image's classes to the new SVG
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }
	
	        // Remove any invalid XML tags as per http://validator.w3.org
	        $svg = $svg.removeAttr('xmlns:a');
	
	        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
	        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
	            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
	        }
	        
	        
	
	        // Replace image with new SVG
	        $img.replaceWith($svg);
	        
	        if(imgID=='banner_svg'){
		        $('#banner .banner_container .banner_obj_wrap #bg_snow svg').css({
					'margin-top': $('#banner .banner_container .banner_obj_wrap #bg_snow svg').height()/-2
				});
				$('#banner').addClass('active');
	        }
	
	    }, 'xml');
	
	});
}

function detectBroswer(){
	var user = detect.parse(navigator.userAgent);
	
	//console.log(user.browser.family+' '+user.browser.version+' '+user.os.name);
	$('body').addClass(user.browser.family+' '+user.browser.version+' '+user.os.name);
}

//設定基本視覺變換
function setBasicVisualContent(){
	TweenLite.set($('.opacity_first'), {opacity:0});
	$('.ieBackgroundCover').css( "background-size", "cover" );
	$('.ieBackgroundContain').css( "background-size", "contain" );
	
	$('#menu_btn #menu_toggle_btn').click(function(){
		if(!$(this).hasClass('active')){
			$('#wrap').addClass('menu-open');
			$('#menu_btn #menu_toggle_btn').addClass('active');
			$('#menu').slideDown(300);
		}else{
			$('#wrap').removeClass('menu-open');
			$('#menu_btn #menu_toggle_btn').removeClass('active');
			$('#menu').slideUp(300);
		}
	})
	
	if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
		$('.action_opacity').each(function(){
			$(this).hover(
				function(){
					TweenLite.to(this, 0.3, {opacity:0.7});
				},function(){
					TweenLite.to(this, 0.3, {opacity:1});
				}
			);
		});
		
		
		$('.action_scale').each(function(){
			$(this).hover(
				function(){
					TweenLite.to(this, 0.3, {scale:1.1});
				},function(){
					TweenLite.to(this, 0.3, {scale:1});
				}
			);
		});
	}
	
	
	$(".disable_link").click(function(e){
		e.preventDefault();
	});
	
	$(window).resize(function(){
		adjustPosition();
	});

    
	$('.scroll_link').click(function(e){
		e.preventDefault();
		var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
		var fixDistance = 0;
		if($(window).width()>780){
			if($(this).attr('desktop_distance')){
				fixDistance = parseInt($(this).attr('desktop_distance'));
			}
		}else{
			if($(this).attr('mobile_distance')){
				fixDistance = parseInt($(this).attr('mobile_distance'));
			}
		}
		$body.animate({
			scrollTop: $('#'+$(this).attr('scroll-target')).offset().top-$('#header').height()+fixDistance
		}, 300);
	})
	
}


function adjustPosition(){
	
}


function getIEVersion()
{
  var rv = -1;
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  else if (navigator.appName == 'Netscape')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");  //for IE 11
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}

//獲取網址後之參數
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //構造一個含有目標參數的正則表達式對象
	var r = window.location.search.substr(1).match(reg);  //匹配目標參數
	if (r != null) return unescape(r[2]); return null; //返回參數值
}


function msieversion() {
	var returnVal = true;
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

	if (msie > 0){
    //if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){     // If Internet Explorer, return version number
    	//returnVal = false;
        //alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
        if(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)))>10){
            returnVal = true;
        }else{
	        returnVal = true;
        }
    }else{                // If another browser, return 0
        //alert('otherbrowser');
        //returnVal = true;
        if(navigator.appName == "Netscape"){
	     	
	     	if(navigator.appVersion.indexOf('Trident') === -1){
		     	returnVal = false;
	     	}else{
		     	returnVal = true;
	     	}
	    }else{
		    returnVal = false;
	    }
    }
   return returnVal;
}

function isMsEdge(){
	if (/Edge\/\d./i.test(navigator.userAgent)){
	   return true;
	}else{
		return false;
	}
}

function isRetinaDisplay() {
    if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        return (mq && mq.matches || (window.devicePixelRatio > 1));
    }
}