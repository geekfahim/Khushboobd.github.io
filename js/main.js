$(function() {
    var gallerySlider = $('#gallery_images');
    if (gallerySlider.length > 0) gallerySlider.hide();

    setScrollable($('#locations_scroll'), $('#location_scroll_dots'));
    setScrollable($('#social_scroll'), $('#social_scroll_dots'));
    setScrollable($('#blog_scroll'), $('#blog_scroll_dots'));
    setHomeProductChanger();
    setProductImageSlider();

    /*$('.main_menu a, .ajx_link').click(function(e) {
        e.preventDefault();
        loadPage($(this).attr('href'));
    });*/
});
// $(window).click(function(e) {
//     console.log(e); // then e.srcElement.className has the class
// });


$(window).load(function() {
    $('.home_main .product_item.tamari').remove();
    $('#loader').fadeOut('fast');
    $('.top_menu_mobile .btn_open').click(function(){
    	var menu = $( ".main_menu_mobile" );
    	var icon_close = $('.top_menu_mobile .btn_open span.one, .top_menu_mobile .btn_open span.two, .top_menu_mobile .btn_open span.three');
    	var icon_open = $('.top_menu_mobile .btn_open span.icon');
	    // menu.toggleClass( "active" );
	    // if(menu.hasClass('active')){
	    // 	$('.home_main').css('min-height', '640px');
	    // } else {
		 //    $('.home_main').css('min-height', 'auto');
	    // }
	    icon_close.fadeToggle();
	    icon_open.fadeToggle();
	    menu.fadeToggle();
	});

    var gallerySliderHolder = $('#gallery_images_holder');
    var gallerySlider = $('#gallery_images');
    var galleryPager = $('#gallery_pager');

    if (gallerySliderHolder.length > 0 && gallerySlider.length > 0) {
        gallerySlider.fadeIn();
        var prevItem = gallerySliderHolder.find('.prev');
        var nextItem = gallerySliderHolder.find('.next');
        galleryPager.find('.all_page_num').html(gallerySlider.find('img').length);

        gallerySlider.bxSlider({
            adaptiveHeight: true,
            pagerType: 'short',
            controls: false,
            pager: false,
            mode: 'fade',
            onSlideBefore: function($slideElement, oldIndex, newIndex) {
                galleryPager.find('.curr_page_num').html(newIndex+1);
            }
        });

        prevItem.click(function() {
            gallerySlider.goToPrevSlide();
        });

        nextItem.click(function() {
            gallerySlider.goToNextSlide();
        });
    }
	
	
	function animations_desktop_query(){
		menuFooterLoad();
		allProductsAnimations.allProductsInit();
		if($('body').hasClass('home')){
			new homeProductsTimerOnEnter();
			animationsHome.elementAnimationOnLoad();
			animationsHome.parallaxAnimation();
		} else if( $('body').hasClass('single-tofu_products') ){
			animationsInner.animationOnLoad();
			animationsInner.animationOnScroll();
			animationsInner.parallaxAnimation();
			replaceG();
            frontBackSingleProduct();
		} else if ($('body').hasClass('page-template-social-wall')){
			animationsSocialWall.animationOnLoad();
		} else if ($('body').hasClass('page-template-contact')){
			animationsContactUs.animationOnLoad();
		} else if ($('body').hasClass('page-template-where-to-buy')){
			animationsWhereToBuy.animationOnLoad();
		} else if ($('body').hasClass('page-template-about-us')){
			animationsAbout.animationsOnLoad();
		} else if ($('body').hasClass('blog') || $('body').hasClass('archive')){
			blogAnimations.onLoad();
		} else if($('body').hasClass('single-post')){
			blogPostAnimations.onLoad();
		} else if($('body').hasClass('page-template-faq')){
			faqAnimations.onLoad();
		}
	}
	
	function animations_mobile_query(){
		allProductsAnimations.allProducts_mobileInit();
		if($('body').hasClass('home')){
			animationsHome.elementAnimationOnLoad();
			mobile_animationsHome.start();
		} else if( $('body').hasClass('single-tofu_products') ){
			animationsInner.animationOnLoad();
			animationsInner.animationOnScroll();
			mobile_innerPage.start();
			replaceG();
		} else if ($('body').hasClass('page-template-contact')){
			animationsContactUs.animationOnLoad();
		} else if ($('body').hasClass('page-template-about-us')){
			animationsAbout.animationsOnLoad();
		} else if ($('body').hasClass('blog') || $('body').hasClass('archive')){
			blogAnimations.onLoad();
		} else if($('body').hasClass('single-post')){
			blogPostAnimations.onLoad();
			jQuery(".blog_post .left .print").detach().appendTo('.blog_post .right');
		} else if ($('body').hasClass('page-template-where-to-buy')){
			animationsWhereToBuy.animationOnLoad();
			scroll_mobile_where_to_buy.initialization();
		}
		
		$(".btn_back_top").click(function() {
			$("html, body").animate({ scrollTop: 0 }, "slow");
		});
		
		$('.blog_post .left .sub_title_bottom').click(function(){
			
			var open = $(this).hasClass('open');
			var height = $(this).next($('.ingredient_wrap')).find('.ingredients_height').height();
			
			$('.blog_post .left .ingredient_wrap').css('height', 0);
			$('.blog_post .left .ingredient_wrap').removeClass('open');
			$('.blog_post .left .sub_title_bottom').removeClass('open');
			
			if(!open){
				$(this).addClass('open');
				$(this).css('transition', 'all ' + height + 'ms linear');
				$(this).next($('.ingredient_wrap')).css('height', height);
				$(this).next($('.ingredient_wrap')).css('transition', 'all ' + height + 'ms linear');
				$(this).next($('.ingredient_wrap')).addClass('open');
			}
		});
	}
	
	$('.gform_footer, .blog_list .right .form .arrow, .contact .form .gform_footer .text').click(function(){
		$('#gform_3, #gform_2, #gform_1').submit();
	});
	
	var breakpoint = {};
	breakpoint.refreshValue = function () {
		this.value = window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/\"/g, '');
	};
	
	var homePageProduct = $('.home_main .product_item .inner_back_product .central_product>div:last-of-type .imgholder > a');
	
	homePageProduct.click(function(e){
		breakpoint.refreshValue();
		if(breakpoint.value == 'desktop'){
			return;
		} else if(breakpoint.value == 'mobile'){
			e.preventDefault();
			$(this).removeClass('inner_link_click');
		}
	});
	
	var desktop = false;
	var mobile = false;
	
	$(window).resize(function () {
		breakpoint.refreshValue();
		if(breakpoint.value == 'desktop'){
			allProductsAnimations.pauseHomeAnimations = false;
			if(!homePageProduct.hasClass('inner_link_click')){ homePageProduct.addClass('inner_link_click');}
			if(desktop){ return; }
			animations_desktop_query();
			desktop = true;
		} else if(breakpoint.value == 'mobile'){
			allProductsAnimations.pauseHomeAnimations = true;
			if(homePageProduct.hasClass('inner_link_click')){ homePageProduct.removeClass('inner_link_click');}
			if(mobile) { return; }
			animations_mobile_query();
			mobile = true;
		}
	}).resize();
    

    $('.inner_link_click').click(function(e){
        var e = e || window.event;
        if(e.which == 1){
            $('#loader').fadeIn('fast');
        }
    });
});

var scroll_mobile_where_to_buy = {
	pos                 :       0,
	box_height          :       168,
	number_locations    :       3,
	all_pages           :       $('.mobile_nav_pagination .number-wrap .page-numbers'),
	active_el           :       0,
	height              :       0,
	
	initialization      :       function(){
		this.height = this.calculateHeight($('.where_to_buy .locations_holder .locations_scroll .locations .location').length);
		
		$('.mobile_nav_pagination .prev').click(function(){
			scroll_mobile_where_to_buy.pos -= scroll_mobile_where_to_buy.number_locations * scroll_mobile_where_to_buy.box_height;
			if(scroll_mobile_where_to_buy.pos < 0){
				scroll_mobile_where_to_buy.pos = 0;
			}
			$('#locations_scroll').scrollTop(scroll_mobile_where_to_buy.pos);
			scroll_mobile_where_to_buy.active_el--;
			if(scroll_mobile_where_to_buy.active_el < 0){
				scroll_mobile_where_to_buy.active_el = 0;
			}
			scroll_mobile_where_to_buy.all_pages.removeClass('active');
			scroll_mobile_where_to_buy.all_pages.removeClass('visible');
			$(scroll_mobile_where_to_buy.all_pages[scroll_mobile_where_to_buy.active_el]).addClass('active');
			$(scroll_mobile_where_to_buy.all_pages[scroll_mobile_where_to_buy.active_el - 1]).addClass('visible');
			$(scroll_mobile_where_to_buy.all_pages[scroll_mobile_where_to_buy.active_el + 1]).addClass('visible');
			$(scroll_mobile_where_to_buy.all_pages[0]).addClass('visible');
			$(scroll_mobile_where_to_buy.all_pages[scroll_mobile_where_to_buy.all_pages.length - 1]).addClass('visible');
			
			if(scroll_mobile_where_to_buy.active_el < 3){
				$(scroll_mobile_where_to_buy.all_pages[0]).addClass('hide_points');
			} else {
				$(scroll_mobile_where_to_buy.all_pages[0]).removeClass('hide_points');
			}
			
			if(scroll_mobile_where_to_buy.active_el > scroll_mobile_where_to_buy.all_pages.length - 4){
				$(scroll_mobile_where_to_buy.all_pages[scroll_mobile_where_to_buy.all_pages.length - 1]).addClass('hide_points');
			} else {
				$(scroll_mobile_where_to_buy.all_pages[scroll_mobile_where_to_buy.all_pages.length - 1]).removeClass('hide_points');
			}
		});
		
		$('.mobile_nav_pagination .next').click(function(){
			scroll_mobile_where_to_buy.pos += scroll_mobile_where_to_buy.number_locations * scroll_mobile_where_to_buy.box_height;
			if(scroll_mobile_where_to_buy.pos > scroll_mobile_where_to_buy.height - (scroll_mobile_where_to_buy.number_locations * scroll_mobile_where_to_buy.box_height)){
				scroll_mobile_where_to_buy.pos = scroll_mobile_where_to_buy.height - (scroll_mobile_where_to_buy.number_locations * scroll_mobile_where_to_buy.box_height);
			}
			$('#locations_scroll').scrollTop(scroll_mobile_where_to_buy.pos);
			scroll_mobile_where_to_buy.active_el++;
			if(scroll_mobile_where_to_buy.active_el > scroll_mobile_where_to_buy.all_pages.length - 1){
				scroll_mobile_where_to_buy.active_el = scroll_mobile_where_to_buy.all_pages.length - 1;
			}
			scroll_mobile_where_to_buy.all_pages.removeClass('active');
			scroll_mobile_where_to_buy.all_pages.removeClass('visible');
			$(scroll_mobile_where_to_buy.all_pages[scroll_mobile_where_to_buy.active_el]).addClass('active');
			$(scroll_mobile_where_to_buy.all_pages[scroll_mobile_where_to_buy.active_el - 1]).addClass('visible');
			$(scroll_mobile_where_to_buy.all_pages[scroll_mobile_where_to_buy.active_el + 1]).addClass('visible');
			$(scroll_mobile_where_to_buy.all_pages[0]).addClass('visible');
			$(scroll_mobile_where_to_buy.all_pages[scroll_mobile_where_to_buy.all_pages.length - 1]).addClass('visible');
			
			if(scroll_mobile_where_to_buy.active_el < 3){
				$(scroll_mobile_where_to_buy.all_pages[0]).addClass('hide_points');
			} else {
				$(scroll_mobile_where_to_buy.all_pages[0]).removeClass('hide_points');
			}
			
			if(scroll_mobile_where_to_buy.active_el > scroll_mobile_where_to_buy.all_pages.length - 4){
				$(scroll_mobile_where_to_buy.all_pages[scroll_mobile_where_to_buy.all_pages.length - 1]).addClass('hide_points');
			} else {
				$(scroll_mobile_where_to_buy.all_pages[scroll_mobile_where_to_buy.all_pages.length - 1]).removeClass('hide_points');
			}
		});
		
		this.onClick();
	},
	
	onClick         :       function(){
		this.all_pages.unbind();
		this.all_pages.click(function(){
			var el = $(this);
			if(el.hasClass('active')){
				return;
			}
			scroll_mobile_where_to_buy.all_pages.removeClass('active');
			scroll_mobile_where_to_buy.all_pages.removeClass('visible');
			scroll_mobile_where_to_buy.pos = (el.html() - 1) * scroll_mobile_where_to_buy.box_height * scroll_mobile_where_to_buy.number_locations;
			scroll_mobile_where_to_buy.active_el = el.html() - 1;
			el.addClass('active');
			$(scroll_mobile_where_to_buy.all_pages[scroll_mobile_where_to_buy.active_el - 1]).addClass('visible');
			$(scroll_mobile_where_to_buy.all_pages[scroll_mobile_where_to_buy.active_el + 1]).addClass('visible');
			$(scroll_mobile_where_to_buy.all_pages[0]).addClass('visible');
			$(scroll_mobile_where_to_buy.all_pages[scroll_mobile_where_to_buy.all_pages.length - 1]).addClass('visible');
			$('#locations_scroll').scrollTop(scroll_mobile_where_to_buy.pos);
			
			if(scroll_mobile_where_to_buy.active_el < 3){
				$(scroll_mobile_where_to_buy.all_pages[0]).addClass('hide_points');
			} else {
				$(scroll_mobile_where_to_buy.all_pages[0]).removeClass('hide_points');
			}
			
			if(scroll_mobile_where_to_buy.active_el > scroll_mobile_where_to_buy.all_pages.length - 4){
				$(scroll_mobile_where_to_buy.all_pages[scroll_mobile_where_to_buy.all_pages.length - 1]).addClass('hide_points');
			} else {
				$(scroll_mobile_where_to_buy.all_pages[scroll_mobile_where_to_buy.all_pages.length - 1]).removeClass('hide_points');
			}
		});
	},
	
	calculateHeight :       function(number_of_locations){
		var pad = 0;
		if(number_of_locations % this.number_locations != 0){
			number_of_locations++;
			pad++;
		}
		$('#locations_expander').css('padding-top', pad * scroll_mobile_where_to_buy.box_height);
		return number_of_locations * this.box_height;
	},
	
	update          :       function(number_of_locations){
		this.pos = 0;
		this.all_pages = $('.mobile_nav_pagination .number-wrap .page-numbers');
		this.active_el = 0;
		this.height = this.calculateHeight(number_of_locations);
		this.onClick();
	}
};

function setScrollable(innerScrollHolder, scrollDots) {
    if (innerScrollHolder.length > 0) {
        innerScrollHolder.scroll(function() {
            var maxScrollTop = innerScrollHolder[0].scrollHeight - innerScrollHolder.innerHeight();
            var scrollTopPercentage = ($(this).scrollTop() * 100) / maxScrollTop;
            if (scrollDots.length > 0) setScrollDots(scrollDots, scrollTopPercentage);
        }).scroll();
    }
}

function setScrollDots(dotsHolder, scrollPercentage) {
    var dotItems = dotsHolder.find('.dot_holder');
    var numDots = dotItems.length;
    var numActiveDots = Math.round(numDots * scrollPercentage / 100);

    for (var i = 0; i < numDots; i++) {
        if (i <= numActiveDots) $(dotItems[i]).addClass('active');
        else $(dotItems[i]).removeClass('active');
    }
}

function setHomeProductChanger() {
    var productsHolder = $('#home_products');
    var linksHolder = $('#home_product_links');

    if (productsHolder.length > 0 && linksHolder.length > 0) {
        linksHolder.find('.product_circle_link a').click(function(e) {
            e.preventDefault();

            var productElement = $($(this).attr('href'));
            if (productElement.length > 0) {
                productElement.addClass('shown');

                setTimeout(function() {
                    productsHolder.find('.product_item').not(productElement).removeClass('shown');
                }, 100);
            }
        });
    }
}

function setProductImageSlider() {
    var packagingSlider = $("#packaging_slider");
    var packagingImages = $("#packaging_images");

    if (packagingSlider.length > 0 && packagingImages.length > 0) {
        packagingSlider.roundSlider({
            radius: 550,
            sliderType: "default",
            showTooltip: false,
            startAngle: "250",
            endAngle: "290",
            width: 47,
            min: 1,
            max: 10,
            value: 5,
            drag: function(data) {
                var newImage = packagingImages.find('.image_' + data.value);
                if (newImage.length > 0) {
                    packagingImages.find('.packaging_image').removeClass('shown');
                    newImage.addClass('shown');
                }
            }
        });
    }
}

function loadPage(url) {
    /*var mainPageElement = $('#page_main');
    mainPageElement.fadeOut();

    $.ajax({
        type: "GET",
        url: url,
        data: 'dajx=1',
        dataType: "html",
        success: function(response) {
            console.log(response);
            console.log(parseInt(response));

            if(parseInt(response) != 0) {
                mainPageElement.html(response);
                mainPageElement.fadeIn();
            }
        }
    });*/
}

var g_replaced = false;
function replaceG(){
	if(!g_replaced){
		var ele = $('.single_product_page .right_split .nutrition_values .bottom_text strong, .single_product_page .right_split .nutrition_values .nutrition_right .value'),
			pattern = "g",
			re = new RegExp(pattern, "g"),
			svg = ' <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 9.4 18.8" style="enable-background:new 0 0 9.4 18.8;" xml:space="preserve"><style type="text/css">.st0{fill:#231F20;}</style><path class="st0" d="M9.1,5.7c0-0.4,0-0.9,0-1.4c0-0.4,0-0.8,0-1.2c0-0.5,0-1,0-1.4c0-0.2,0-0.5-0.1-0.7c0.1-0.1,0.1-0.2,0-0.3c-0.1,0-0.2,0-0.3,0C8.7,0.5,8.6,0.3,8.4,0.1c-0.1-0.1-0.1,0-0.2,0.2c0,0,0,0,0,0C8.2,0.3,8.2,0.2,8,0.2c-0.1-0.1-0.3,0-0.4-0.1C7.2,0,6.2-0.1,6.2,0.1c-0.1,0.4,0,0.8,0,1.1C5.9,1.1,6,1,5.6,0.9c0-0.1,0-0.1-0.1-0.1C5,0.6,4.4,0.4,3.8,0.3C3.5,0.4,3.2,0.4,3,0.6C2.5,0.8,2.1,1.2,1.7,1.7C1,2.6,0.6,3.2,0.2,4.4c-0.3,1.1-0.3,2.4,0.1,3.8c0.1,0.5,0.4,1,0.7,1.5c0.5,0.7,0.9,1.2,1.7,1.5c0.8,0.3,1.4,0.4,2.4,0.3c0.4,0,0.8-0.1,1.1-0.3c0,1-0.1,1.8,0,2.1c0.1,1.1-0.1,2.6-1.9,2.6c-0.8,0-0.5-0.1-0.8-0.3c0-0.1,0-0.2,0-0.3c0-0.1-0.1-0.2-0.2-0.4c-0.1-0.2,0.1-0.5,0-0.7c0-0.1-0.2-0.2-0.2-0.3c-0.1-0.1,0-0.3-0.1-0.4c-0.1-0.2-0.4-0.2-0.5-0.2c-0.1-0.1,0.2-0.2,0-0.3c-0.9-0.2-1.3-0.9-1.5-0.5c-0.5,0.9-0.9,0.8-0.9,2.1c0,2,1,2.8,2.1,3.5c0.4,0.2,0.8,0.3,1.3,0.4c0.4,0.1,0.3,0,0.6,0C5,19,5.6,18.8,7.1,18.1c1.3-0.6,1.8-1.9,2.1-3.6C9.6,11.5,9.1,7.1,9.1,5.7z M0.3,6.6c0.2-0.1,0.2,0.8,0.6,2.2C0.5,8.4,0.2,7,0.3,6.6z M1.1,9.1c0.3,0.2,0.4,0.5,0.6,0.7C1.4,9.6,1.2,9.4,1.1,9.1z M2.4,10.7C2.4,10.6,2.5,10.6,2.4,10.7c0.2,0,0.7,0.1,0.7,0.3C2.8,11,2.6,10.8,2.4,10.7z M3.6,18.3c-0.6,0-0.2-0.3-0.5-0.7c0.1-0.1,1,0.3,0.5,0.3C4,18,3.6,18.1,3.6,18.3z M4,17.6c0.4,0.2,1.2,0.2,1.7,0.2C5.2,18.1,4.3,17.9,4,17.6z M5.5,9.4c-0.6-0.1-1.1-0.6-1.3-1C3.6,7.3,3.8,5.7,4.1,4.8C4.4,4,4.8,3.5,5.4,2.9c0.3-0.3,0.5-0.5,0.9-0.7c0,0.9,0.2,2.6,0.2,4.6c0,0.8,0,1.7,0,2.5C6.1,9.4,5.8,9.4,5.5,9.4z"/></svg>';
		ele.each(function(){
			var content = $(this).html();
			content = content.replace(re, svg);
			$(this).html(content);
		});
		g_replaced = true;
	}
}

function frontBackSingleProduct(){
	var wrap = $('.single_product_page .packaging_image_wrap');
	var img_front = wrap.find('.img-front');
	var img_back = wrap.find('.img-back');
	var btn_front = wrap.find('.btn-front');
	var btn_back = wrap.find('.btn-back');

	btn_front.on('click', function(){
		img_front.fadeIn();
		img_back.fadeOut();
		btn_front.addClass('active');
        btn_back.removeClass('active');
	});
    btn_back.on('click', function(){
        img_front.fadeOut();
        img_back.fadeIn();
        btn_back.addClass('active');
        btn_front.removeClass('active');
    });
}