$(document).ready(function() {
	
	function initLoading(){
		//if (jQuery.support.leadingWhitespace){
			var wh = $(window).height();
			var isLoaded = false;
			
		
			function loading() {
				var imgArray = [];
				$("img").each(function () {
					var s = $(this).attr("src");
					imgArray.push(s);
				});
		
				Array.prototype.remove = function (element) {
				for (var i = 0; i < this.length; i++)
					if (this[i] == element) this.splice(i, 1);
				};
		
				function preload(images, progress) {
					var total = images.length;
					$(images).each(function () {
						var src = this;
						$('<img/>').attr('src', src).load(function () {
							images.remove(src);
							progress(total, total - images.length);
						});
					});
				}
				var now_percent = 0;
				var displaying_percent = 0;
				preload(imgArray,
					function (total, loaded) {
						now_percent = Math.ceil(100 * loaded / total);
					});
		
				var timer = window.setInterval(function () {
					if(now_percent>=100&&windowLoad){
						window.clearInterval(timer);
						isLoaded = true;
						$('#loading').fadeOut(600);
						activeScrollAnimation();
						setTimeout(function(){
							$('#loading .icon').removeClass('fast_rotating');
						}, 700);
					}
				}, 10);
				var windowLoad = false;
				$(window).bind("load", function() {
					windowLoad = true;
				});
				
				var timeout = window.setTimeout(function(){
					window.clearInterval(timer);
					isLoaded = true;
					$('#loading').fadeOut(600);
					activeScrollAnimation();
					setTimeout(function(){
						$('#loading .icon').removeClass('fast_rotating');
					}, 700);
				}, 5000);
			}
			loading();
/*
		}else{
			$("#loading").hide();
		}
*/
	}
	
	initLoading();
});

function waitForWebfonts(fonts, callback) {
    var loadedFonts = 0;
    for(var i = 0, l = fonts.length; i < l; ++i) {
        (function(font) {
            var node = document.createElement('span');
            // Characters that vary significantly among different fonts
            node.innerHTML = 'giItT1WQy@!-/#';
            // Visible - so we can measure it - but not on the screen
            node.style.position      = 'absolute';
            node.style.left          = '-10000px';
            node.style.top           = '-10000px';
            // Large font size makes even subtle changes obvious
            node.style.fontSize      = '300px';
            // Reset any font properties
            node.style.fontFamily    = 'sans-serif';
            node.style.fontVariant   = 'normal';
            node.style.fontStyle     = 'normal';
            node.style.fontWeight    = 'normal';
            node.style.letterSpacing = '0';
            document.body.appendChild(node);

            // Remember width with no applied web font
            var width = node.offsetWidth;

            node.style.fontFamily = font;

            var interval;
            function checkFont() {
                // Compare current width with original width
                if(node && node.offsetWidth != width) {
                    ++loadedFonts;
                    node.parentNode.removeChild(node);
                    node = null;
                }

                // If all fonts have been loaded
                if(loadedFonts >= fonts.length) {
                    if(interval) {
                        clearInterval(interval);
                    }
                    if(loadedFonts == fonts.length) {
                        callback();
                        return true;
                    }
                }
            };

            if(!checkFont()) {
                interval = setInterval(checkFont, 50);
            }
        })(fonts[i]);
    }
};