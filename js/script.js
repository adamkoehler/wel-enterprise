(function($){
    $.extend($.easing, {
        easeInOutCubic : function(x, t, b, c, d){
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        }
    });

    $.fn.outerFind = function(selector){
        return this.find(selector).addBack(selector);
    };

    (function($,sr){
        // debouncing function from John Hann
        // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
        var debounce = function (func, threshold, execAsap) {
            var timeout;

            return function debounced () {
                var obj = this, args = arguments;
                function delayed () {
                    if (!execAsap) func.apply(obj, args);
                    timeout = null;
                };

                if (timeout) clearTimeout(timeout);
                else if (execAsap) func.apply(obj, args);

                timeout = setTimeout(delayed, threshold || 100);
            };
        }
        // smartresize 
        jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

    })(jQuery,'smartresize');

    (function(){
        
        var scrollbarWidth = 0, originalMargin, touchHandler = function(event){
            event.preventDefault();
        };

        function getScrollbarWidth(){
            if (scrollbarWidth) return scrollbarWidth;
            var scrollDiv = document.createElement('div');
            $.each({
                top : '-9999px',
                width  : '50px',
                height : '50px',
                overflow : 'scroll', 
                position : 'absolute'
            }, function(property, value){
                scrollDiv.style[property] = value;
            });
            $('body').append(scrollDiv);
            scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            $('body')[0].removeChild(scrollDiv);
            return scrollbarWidth;
        }

    })();

    $.isMobile = function(type){
        var reg = [];
        var any = {
            blackberry : 'BlackBerry',
            android : 'Android',
            windows : 'IEMobile',
            opera : 'Opera Mini',
            ios : 'iPhone|iPad|iPod'
        };
        type = 'undefined' == $.type(type) ? '*' : type.toLowerCase();
        if ('*' == type) reg = $.map(any, function(v){ return v; });
        else if (type in any) reg.push(any[type]);
        return !!(reg.length && navigator.userAgent.match(new RegExp(reg.join('|'), 'i')));
    };

    var isSupportViewportUnits = (function(){
        // modernizr implementation
        var $elem = $('<div style="height: 50vh; position: absolute; top: -1000px; left: -1000px;">').appendTo('body');
        var elem = $elem[0];
        var height = parseInt(window.innerHeight / 2, 10);
        var compStyle = parseInt((window.getComputedStyle ? getComputedStyle(elem, null) : elem.currentStyle)['height'], 10);
        $elem.remove();
        return compStyle == height;
    }());

    $(function(){

        $('html').addClass($.isMobile() ? 'mobile' : 'desktop');

        // .mbr-navbar--sticky
        // .mbr-hamburger
        // .mbr-parallax-background
        if ($.fn.jarallax && !$.isMobile()){
            $(document).on('destroy.parallax', function(event){
                $(event.target).outerFind('.mbr-parallax-background, .parallax-bg')
                    .jarallax('destroy')
                    .css('position', '');
            });
            $(document).on('add.cards change.cards', function(event){
                $(event.target).outerFind('.mbr-parallax-background, .parallax-bg')
                    .jarallax()
                    .css('position', 'relative');
            });
        }
 
          
		
	  var oMenuLink = $('#menu-tog'),
		oNav = $('#navigation'),
		oSubMenu = oNav.find('.submenu');

	/* Desktop, tablet and mobile menu
	================================================== */
	if ( oSubMenu.length ) {
		oSubMenu.parent().addClass('has-submenu');
	};

	oMenuLink.on('click', function(e) {
		e.preventDefault();

		var $this = $(this);

		if ($this.hasClass('active')) {

			oNav.slideUp('fast');
			oSubMenu.css({ display : 'none' });

			$this.removeClass('active');

			oNav.find('a.drop_active').removeClass('drop_active');

		} else {

			oNav.slideDown('fast');

			$this.addClass('active');

			/*if ($headerOffset > 0 && !$header.hasClass("header__fixed")) {
			$('body,html').stop().animate({ scrollTop: $headerOffset } , 300);
			};*/
		};
	});

	oNav.on('touchend click', 'ul>li>a', function() {
		var $this = $(this);

		if ( oMenuLink.is(':visible') ) {
			if ( $this.next().is('div.submenu') ) {
				if ( $this.next().is(':visible') ) {

					$this.removeClass('drop_active');
					$this.next().slideUp('fast');
					$this.next().find('.submenu').css({display : 'none' });

				} else {

					$this.closest('ul').find('a.drop_active').removeClass('drop_active');
					$this.closest('ul').find('.submenu').slideUp('fast');
					$this.addClass('drop_active');
					$this.next().slideDown('fast');
				};

				return false;
			};
		};
	});

	$(window).smartresize(function(){
		if ($(this).width() > 991) {

			oMenuLink.removeClass('active');
			oNav.removeAttr('style');
			oSubMenu.removeAttr('style');
			oNav.find('a.drop_active').removeClass('drop_active');
		}
		});

		$('#go-bottom').on('click', function (e) {
			e.preventDefault();
		$('body,html').stop().animate({ scrollTop: document.documentElement.clientHeight } , 1000);
		});

        // init
        $('body > *:not(style, script)').trigger('add.cards');
        $('html').addClass('mbr-site-loaded');
        $(window).resize().scroll();

    });
	
	/*-----------------------------------------------------------------------------------*/
	/*    STICKY NAVIGATION
	/*-----------------------------------------------------------------------------------*/
	$(document).ready(function(){
		jQuery(".sticky").sticky({topSpacing:0});
	});
	
	/* ---------------------------------------------------------------------- */
	/*	Home Page VIDEO
	/* ---------------------------------------------------------------------- */
	jQuery.noConflict();
	jQuery(document).ready(function (jQuery) {
	  // delegate calls to data-toggle="lightbox"
	  jQuery(document).delegate('*[data-toggle="lightbox"]:not([data-gallery="navigateTo"])', 'click', function(event) {
		  event.preventDefault();
		  return jQuery(this).ekkoLightbox({
			  onShown: function() {
				  /*if (window.console) {
					  return console.log('Checking our the events huh?');
				  }*/
			  },
			  onNavigate: function(direction, itemIndex) {
				  if (window.console) {
					  return console.log('Navigating '+direction+'. Current item: '+itemIndex);
				  }
			  }
		  });
	  });
	  });
	  
	  
$(document).ready(function(){
    $('.panel-collapse').collapse({toggle: false});
    $('body').on('click', '[data-toggle=collapse-next]', function (e) {
	e.preventDefault();
		
	// Try to close all of the collapse areas first
	var parent_id = $(this).data('parent');
	$(parent_id+' .panel-collapse').collapse('hide');
	
	// ...then open just the one we want
	var $target = $(this).parents('.panel').find('.panel-collapse');
	$target.collapse('toggle');
	});
	});
	
	///
	$('.collapse').on('shown.bs.collapse', function(){
	$(this).parent().find(".plus").removeClass("plus").addClass("minus");
    }).on('hidden.bs.collapse', function(){
    $(this).parent().find(".minus").removeClass("minus").addClass("plus");
    });
	
	/* Accordion & Toggle */
	jQuery(".accordion .accordion-title").each(function(){
	jQuery(this).click(function() {
		  if (jQuery(this).parent().parent().hasClass("toggle-accordion")) {
			  jQuery(this).parent().find("li:first .accordion-title").addClass("active");
	jQuery(this).parent().find("li:first .accordion-title").next(".accordion-inner").addClass("active");
			  jQuery(this).toggleClass("active");
			  jQuery(this).next(".accordion-inner").slideToggle().toggleClass("active");
			  jQuery(this).find("i").toggleClass("fa-minus").toggleClass("fa-plus");
			  }else {
		  if (jQuery(this).next().is(":hidden")) {
	jQuery(this).parent().parent().find(".accordion-title").removeClass("active").next().slideUp(200);
	jQuery(this).parent().parent().find(".accordion-title").next().removeClass("active").slideUp(200);
			  jQuery(this).toggleClass("active").next().slideDown(200);
			  jQuery(this).next(".accordion-inner").toggleClass("active");
			  jQuery(this).parent().parent().find("i").removeClass("fa-plus").addClass("fa-minus");
			  jQuery(this).find("i").removeClass("fa-minus").addClass("fa-plus");
			  }
		  }
		return false;
	  });
	});
	  
	 /* ---------------------------------------------- /*
	 * Same page link
	/* ---------------------------------------------- */
	$(function() {
		$('.section-scroll').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		
				if($(window).outerWidth() < 992){
				   $('html,body').animate({scrollTop: target.offset().top},1000);
				}
				else {
					$('html,body').animate({scrollTop: target.offset().top-86}, 1000);	
					}
					return false;
				}	
			});
		});

		/* Go up */
		jQuery(window).scroll(function () {
			if(jQuery(this).scrollTop() > 100 ) {
				jQuery(".go-up").css("right","20px");
			}else {
				jQuery(".go-up").css("right","-60px");
			}
		});
		jQuery(".go-up").click(function(){
			jQuery("html,body").animate({scrollTop:0},500);
			return false;
		});
		
		 
		wow = new WOW(
		  {
			animateClass: 'animated',
			offset:       100,
			callback:     function(box) {
			  console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
			}
		  }
		);
		wow.init();
	  
})(jQuery);