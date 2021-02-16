
function homeProductsTimerOnEnter( ){
    var time = 7;
    var initialOffset = '440';
    var i = 1;
    var interval;
    var pause = false;
    var elArray = animationsHome.allCat;

    var currentEl = elArray[0];
    animationsHome.changeCat(currentEl);
    var el = $( '.' + currentEl + ' .circle_animation');
    $('.product_circle_link.' + currentEl).addClass('active');
    reset();
    startElement(el);

    interval = setInterval( function() {
        if ( i == time ) {
            $('.home_main .product_circle .outer_circle .inner_circle .image_holder .product_circle_link').removeClass('active');
            getNextElement(currentEl);
            animationsHome.elementsAnimationOut();
            animationsHome.changeCat(currentEl);
            animationsHome.elementsAnimationIn();
            el = $( '.' + currentEl + ' .circle_animation');
            reset();
            startElement(el);
            // pause = true; //Debugging
            // return;
        }

        if(!pause && !allProductsAnimations.pauseHomeAnimations){
            el.css( 'stroke-dashoffset', initialOffset - ( ( i + 1 ) * ( initialOffset / (time*2) ) ) );
            i++;
        }
        // console.log("i: " + i + " time: " + time + " el: " + currentEl );
    }, 1000 );

    function reset(){
        i = 1;
        $('.circle_animation').css( 'transition', 'none' );
        $('.circle_animation').css( 'stroke-dashoffset', 1 * initialOffset );
        $('.top_menu nav.main_menu ul .menu-item:last-of-type a').animateCss('rubberBandMod');
    }

    function startElement(ele){
        i = 1;
        ele.css( 'stroke-dashoffset', initialOffset - ( 1 * ( initialOffset / (time*4) ) ) );
        ele.css( 'transition', 'all 1s linear' );
    }

    function getNextElement(current){
        for(var n = 0; n < elArray.length; n++){
            if(elArray[n] == current){
                if( n != elArray.length - 1){
                    currentEl = elArray[n + 1];
                } else {
                    currentEl = elArray[0];
                }
                $('.product_circle_link.' + currentEl).addClass('active');
                $('.home_main .product_item').removeClass('shown');
                $('.home_main .product_item.' + currentEl).addClass('shown');
            }
        }
    }

    $('.home_main .product_circle .outer_circle .inner_circle .image_holder .product_circle_link').click(throttle(function(){
        $('.home_main .product_circle .outer_circle .inner_circle .image_holder .product_circle_link').removeClass('active');
        $(this).addClass('active');
        if( currentEl != $(this).attr('class').split(/\s+/)[1] ){
            currentEl = $(this).attr('class').split(/\s+/)[1];
            animationsHome.elementsAnimationOut();
            animationsHome.changeCat(currentEl);
            animationsHome.elementsAnimationIn();
            el = $( '.' + currentEl + ' .circle_animation');
            reset();
            startElement(el);
            $('.home_main .product_item').removeClass('shown');
            $('.home_main .product_item.' + currentEl).addClass('shown');
        }
    }, 1500));
}

var animationsHome = {
    currentCat              :   "fior_di_sale",
    allCat                  :   ['fior_di_sale', 'mediterraneo', 'pesto_basilico', 'zenzero_limone', 'carote_zenzero', 'garam_masala', 'affumicato', 'peperoncino'],
    changeCat               :   function(curr) {
        var btns = $('.top_menu .all_products .link.on_open .icon_holder, .top_menu nav.main_menu ul li.menu-item:last-of-type a');
        btns.removeClass(this.currentCat);
        this.currentCat = curr;
        btns.addClass(this.currentCat);
    },
    elementAnimationOnLoad  :   function(){
        var el1 = $('.home_main .product_circle');
        el1.animateCss('zoomIn');
        el1.css('opacity', '1');

        var el2 = $('.home_main .product_item .inner_back_product .central_product .central_product_holder .product_image .imgholder .central_product_link');
        el2.css('opacity', '1');
        el2.find('a .text.one').animateCss('fadeInDown');
        el2.find('a .arrow').animateCss('fadeIn');
        el2.find('a .line').animateCss('fadeLineHome');


        var el6 = $('.home_main .product_item .elements > div');
        var el6_1 = $('.home_main .product_item.' + this.currentCat + ' .elements > div');
        el6.css('opacity', '0');
        el6_1.animateCss('bounceIn');
        el6_1.css('opacity', '1');
        el6_1.each(function(i){
            var random = Math.random() * 2500 + 500;
            $(this).css('animation-delay', random + 'ms');
        });

        var el7 = $('.home_main .home_dots_overlay');
        el7.animateCss('fadeIn');
        el7.css('animation-delay', '0s');
        el7.css('animation-duration', '.65s');
        el7.css('opacity', '1');

        var el8 = $('.home_main .product_item .inner_back_product .central_product .central_product_holder .product_image .imgholder img');
        var el8_1 = $('.home_main .product_item.' + this.currentCat + ' .inner_back_product .central_product .central_product_holder .product_image .imgholder img');
        el8.css('opacity', '0');
        el8_1.animateCss('fadeInUpHome');
        el8_1.css('opacity', '1');

        var el9 = $('.home_main .product_item .inner_back_product .central_product .central_product_holder .product_title h2');
        var el9_1 = $('.home_main .product_item.' + this.currentCat + ' .inner_back_product .central_product .central_product_holder .product_title h2');
        el9.css('opacity', '0');
        el9_1.animateCss('fadeInUpHome');
        el9_1.css('opacity', '1');
        el9_1.css('animation-delay', '.3s');

        var el10 = $('.home_main .product_item .inner_back_product .central_product .central_product_holder .product_tofu_image');
        var el10_1 = $('.home_main .product_item.' + this.currentCat + ' .inner_back_product .central_product .central_product_holder .product_tofu_image');
        el10.css('opacity', '0');
        el10_1.animateCss('fadeInDownHome');
        el10_1.css('opacity', '1');
        el10_1.css('animation-delay', '.15s');
    },
    elementsAnimationIn     :   function() {
        $('footer').delay(350).fadeIn(800);

        var el1 = $('.home_main .product_item .elements > div');
        var el1_1 = $('.home_main .product_item.' + this.currentCat + ' .elements > div');
        el1.css('opacity', '0');
        el1_1.animateCss('bounceIn');
        el1_1.css('opacity', '1');
        el1_1.each(function(i){
            var random = (Math.random() * 2500) + 1000;
            $(this).css('animation-delay', random + 'ms');
        });

        var el2 = $('.home_main .product_item .inner_back_product .central_product .central_product_holder .product_image .imgholder img');
        var el2_1 = $('.home_main .product_item.' + this.currentCat + ' .inner_back_product .central_product .central_product_holder .product_image .imgholder img');
        el2.css('opacity', '0');
        el2_1.animateCss('fadeInUpHome');
        el2_1.css('opacity', '1');
        el2_1.css('animation-delay', '.5s');

        var el3 = $('.home_main .product_item .inner_back_product .central_product .central_product_holder .product_title h2');
        var el3_1 = $('.home_main .product_item.' + this.currentCat + ' .inner_back_product .central_product .central_product_holder .product_title h2');
        el3.css('opacity', '0');
        el3_1.animateCss('fadeInUpHome');
        el3_1.css('opacity', '1');
        el3_1.css('animation-delay', '.8s');

        var el4 = $('.home_main .product_item .inner_back_product .central_product .central_product_holder .product_tofu_image');
        var el4_1 = $('.home_main .product_item.' + this.currentCat + ' .inner_back_product .central_product .central_product_holder .product_tofu_image');
        el4.css('opacity', '0');
        el4_1.animateCss('fadeInDownHome');
        el4_1.css('opacity', '1');
        el4_1.css('animation-delay', '.65s');
    },
    elementsAnimationOut    :   function() {
        $('footer').fadeOut('fast');

        var el1 = $('.home_main .product_item.' + this.currentCat + ' .elements > div');
        el1.animateCss('fadeOutScale');
        el1.css('animation-delay', '0s');

        $('.home_main .home_dots_overlay').animateCssInOut('fade');

        var el2 = $('.home_main .product_item.' + this.currentCat + ' .inner_back_product .central_product .central_product_holder .product_image .imgholder img');
        el2.animateCss('fadeOutDownHome');
        el2.css('animation-delay', '.3s');

        var el3 = $('.home_main .product_item.' + this.currentCat + ' .inner_back_product .central_product .central_product_holder .product_title h2');
        el3.animateCss('fadeOutDownHome');
        el3.css('animation-delay', '0s');

        var el4 = $('.home_main .product_item.' + this.currentCat + ' .inner_back_product .central_product .central_product_holder .product_tofu_image');
        el4.animateCss('fadeOutUpHome');
        el4.css('animation-delay', '.15s');
    },

    parallaxAnimation       :   function() {
        var len = this.allCat.length;
        for(var i = 0; i < len; i++){
            // var j = 0;
            // $('.home_main .product_item.' + this.allCat[i] + ' .inner_back_product .central_product .elements > div').each(function(){
            //     if(j % 2 != 0){
            //         var random = ((Math.random() * 7)) / 100;
            //         $(this).attr('data-depth', random);
            //         $(this).addClass('layer');
            //     }
            //     j++;
            // });
            var scene = document.getElementById('scene_' + this.allCat[i]);
            if(scene){
                new Parallax(scene, {
                    frictionX: 0.8,
                    frictionY: 0.8
                });
            }
        }
    }
};

var animationsAbout = {
    ilustrationsLocation    :   ['.about_us .left_split .left_items .orange', '.about_us .left_split .left_items .top_elements', '.about_us .left_split .left_items .right_element', '.about_us .left_split .first_paragraph .elimage', '.about_us .left_split .first_paragraph .text .floating_elements', '.about_us .left_split .third_paragraph .element_img', '.about_us .left_split .second_paragraph .element_img', '.about_us .right_split .right_items .left_element', '.about_us .right_split .right_items .right_element', '.about_us .right_split .flower_holder .flower'],

    animationOnScroll   :   function(){
        var btn_scroll = false;
        $('.about_us .left_split .left_holder').on('scroll', function() {
            var fadePoint = $('.about_us .left_split .left_holder').height() / 8;
            if (!btn_scroll && $(this).scrollTop() > fadePoint) {
                $('.about_us .right_split .main_title').addClass('scrolling');
                $('.top_menu nav.main_menu').fadeOut('slow');
                $('.about_us .title_btn_wrap').animateChangeAni('slideUpDown', 'fadeOutDown');
                $('.about_us .scroll_down_text').animateCss('fadeOutDown');
                $('.about_us .scroll_down_text').css('opacity', '0');
                btn_scroll = true;
            } else if(btn_scroll && $(this).scrollTop() < fadePoint){
                $('.about_us .right_split .main_title').removeClass('scrolling');
                $('.top_menu nav.main_menu').fadeIn('slow');
                $('.top_menu nav.main_menu ul .menu-item:last-of-type a').animateCss('rubberBandMod');
                $('.about_us .title_btn_wrap').animateCss('fadeInUp');
                setTimeout( function(){
                    $('.about_us .title_btn_wrap').animateChangeAni('fadeInUp', 'slideUpDown');
                    $('.about_us .scroll_down_text').animateCss('fadeInUp');
                    $('.about_us .scroll_down_text').css('opacity', '1');
                }, 380);
                btn_scroll = false;
            }

            var el4 = $('.about_us .left_split .np_title');
            if(el4.visible()){
                el4.css('opacity', '0');
                el4.animateCssInner('fadeInUpHome');
                el4.css('opacity', '1');
                el4.css('animation-delay', '0.2s');
            }

            var el5 = $('.about_us .left_split .np_subtitle');
            if(el5.visible()){
                el5.css('opacity', '0');
                el5.animateCssInner('fadeInUpHome');
                el5.css('opacity', '1');
                el5.css('animation-delay', '0.2s');
            }

            var el6 = $('.about_us .left_split .first_paragraph');
            if(el6.visible(true)){
                el6.css('opacity', '0');
                el6.animateCssInner('fadeInUpHome');
                el6.css('opacity', '1');
                el6.css('animation-delay', '0.2s');
            }

            var el7 = $('.about_us .left_split .first_paragraph .text .image');
            if(el7.visible()){
                el7.css('opacity', '0');
                el7.animateCssInner('fadeInUpHome');
                el7.css('opacity', '1');
                el7.css('animation-delay', '0.2s');
            }

            var el8 = $('.about_us .left_split .second_paragraph_image');
            if(el8.visible()){
                el8.css('opacity', '0');
                el8.animateCssInner('fadeInUpHome');
                el8.css('opacity', '1');
                el8.css('animation-delay', '0.2s');
            }

            var el9 = $('.about_us .left_split .second_paragraph');
            if(el9.visible(true)){
                el9.css('opacity', '0');
                el9.animateCssInner('fadeInUpHome');
                el9.css('opacity', '1');
                el9.css('animation-delay', '0.2s');
            }

            var el10 = $('.about_us .left_split .third_paragraph');
            if(el10.visible(true)){
                el10.css('opacity', '0');
                el10.animateCssInner('fadeInUpHome');
                el10.css('opacity', '1');
                el10.css('animation-delay', '0.2s');
            }
            
            var ytbe = $('.ytbe-play');
            if(ytbe.visible()){
                player.playVideo();
            }
        });
    },
    animationsOnLoad    :   function(){
        this.animationOnScroll();
        this.parallaxAnimation();
        var length = this.ilustrationsLocation.length;
        for(var i = 0; i < length; i++){
            var el = $(this.ilustrationsLocation[i] + ' img');
            el.css('opacity', '0');
            el.animateCss('bounceIn');
            el.css('opacity', '1');
            var random = Math.random() * 2500 + 500;
            el.css('animation-delay', random + 'ms');
        }
        var img = $('.right_image>div>img');
        img.css('opacity', '0');
        img.animateCss('fadeInUpHome');
        img.css('opacity', '1');
        img.css('animation-delay', '.5s');
        var el2 = $('.about_us .right_split .main_title img');
        el2.css('opacity', '0');
        el2.animateCss('fadeInUpHome');
        el2.css('opacity', '1');
        el2.css('animation-delay', '.8s');
        var imgS = $('.right_image>div');
        imgS.delay(500).addClass('shadow');

        $('.about_us .title_btn_wrap').delay(500).animateCss('slideUpDown');
        $('.about_us .title_btn_wrap, .about_us .scroll_down_text').click(function(){
            $(".about_us .left_split .left_holder").animate({ scrollTop: $(window).height() }, 2000);
            disable_scroll();
            setTimeout(enable_scroll, 2000);
        });

        var splits = $('.about_us .splits .left_split, .about_us .splits .right_split');
        splits.animateCss('fadeIn');
        splits.css('opacity', '1');

        var el3 = $('.about_us .left_split .top_title');
        if(el3.visible()){
            el3.css('opacity', '0');
            el3.animateCss('fadeInUpHome');
            el3.css('opacity', '1');
            el3.css('animation-delay', '.8s');
        }

        var el4 = $('.about_us .left_split .np_title');
        if(el4.visible()){
            el4.css('opacity', '0');
            el4.animateCssInner('fadeInUpHome');
            el4.css('opacity', '1');
            el4.css('animation-delay', '1s');
        }

        var el5 = $('.about_us .left_split .np_subtitle');
        if(el5.visible()){
            el5.css('opacity', '0');
            el5.animateCssInner('fadeInUpHome');
            el5.css('opacity', '1');
            el5.css('animation-delay', '1.2s');
        }

        var el6 = $('.about_us .left_split .first_paragraph');
        if(el6.visible(true)){
            el6.css('opacity', '0');
            el6.animateCssInner('fadeInUpHome');
            el6.css('opacity', '1');
            el6.css('animation-delay', '1.4s');
        }

        var el7 = $('.about_us .left_split .first_paragraph .text .image');
        if(el7.visible(true)){
            el7.css('opacity', '0');
            el7.animateCssInner('fadeInUpHome');
            el7.css('opacity', '1');
            el7.css('animation-delay', '1.6s');
        }

    },
    parallaxAnimation       :   function() {
        // var length = this.ilustrationsLocation.length;
        // for(var i = 0; i < length; i++){
        //     var el = $(this.ilustrationsLocation[i]);
        //     var random = ((Math.random() * 7)) / 100;
        //     el.attr('data-depth', random);
        //     el.addClass('layer');
        // }
        var scene = document.getElementById('scene_parallax');
        if(scene){
            new Parallax(scene, {
                frictionX: 0.8,
                frictionY: 0.8
            });
        }
    }
};

var animationsInner = {
    allPositions          :     ['left_elements', 'top_elements', 'ingredients_elements', 'blog_elements', 'nutrition_elements'],

    animationOnLoad       :     function() {
        var len = this.allPositions.length;
        for(var i = 0; i < len; i++){
            var currEl = $('.' + this.allPositions[i] + ' > div');
            currEl.css('opacity', '0');
            currEl.animateCss('bounceIn');
            currEl.css('opacity', '1');
            currEl.each(function(i){
                var random = Math.random() * 2500 + 500;
                $(this).css('animation-delay', random + 'ms');
            });
        }

        $('.single_product_page .title_btn_wrap').delay(500).animateCss('slideUpDown');
        $('.single_product_page .title_btn_wrap, .single_product_page .scroll_down_text').click(function(){
            $(".single_product_page .right_split .right_holder").animate({ scrollTop: $(window).height() }, 2000);
            disable_scroll();
            setTimeout(enable_scroll, 2000);
        });

        var splits = $('.single_product_page .splits .left_split, .single_product_page .splits .right_split');
        splits.animateCss('fadeIn');
        splits.css('opacity', '1');

        var el1 = $('.single_product_page .left_split .packaging_images_holder');
        el1.css('opacity', '0');
        el1.animateCss('fadeInUpHome');
        el1.css('opacity', '1');
        el1.css('animation-delay', '.5s');

        var el2 = $('.single_product_page .left_split .big_title h1');
        if(el2.visible()){
            el2.css('opacity', '0');
            el2.animateCss('fadeInUpHome');
            el2.css('opacity', '1');
            el2.css('animation-delay', '.8s');
        }

        var el3 = $('.single_product_page .right_split .top_title_holder');
        if(el3.visible()){
            el3.css('opacity', '0');
            el3.animateCssInner('fadeInUpHome');
            el3.css('opacity', '1');
            el3.css('animation-delay', '1s');
        }

        var el4 = $('.single_product_page .right_split .top_subtitle');
        if(el4.visible()){
            el4.css('opacity', '0');
            el4.animateCssInner('fadeInUpHome');
            el4.css('opacity', '1');
            el4.css('animation-delay', '1.2s');
        }

        var el5 = $('.single_product_page .right_split .ingredients_holder');
        if(el5.visible()){
            el5.find($('.left_image')).css('opacity', '0');
            el5.find($('.left_image')).animateCssInner('fadeInUpHome');
            el5.find($('.left_image')).css('opacity', '1');
            el5.find($('.left_image')).css('animation-delay', '1.4s');
            el5.find($('.ingredients')).css('opacity', '0');
            el5.find($('.ingredients')).animateCssInner('fadeInUpHome');
            el5.find($('.ingredients')).css('opacity', '1');
            el5.find($('.ingredients')).css('animation-delay', '1.6s');
        }
    },

    animationOnScroll     :     function(){
        var btn_scroll = false;
        $('.single_product_page .right_split .right_holder').on('scroll', function() {
            var fadePoint = $('.single_product_page .right_split .right_holder').height() / 8;
            if(!btn_scroll && $(this).scrollTop() > fadePoint){
                $('.single_product_page .big_title').addClass('scrolling');
                $('.top_menu nav.main_menu').fadeOut('slow');
                $('.top_menu .all_products').fadeOut('slow');
                $('.single_product_page .title_btn_wrap').animateChangeAni('slideUpDown', 'fadeOutDown');
                $('.single_product_page .scroll_down_text').animateCss('fadeOutDown');
                $('.single_product_page .scroll_down_text').css('opacity', '0');
                btn_scroll = true;
            } else if(btn_scroll && $(this).scrollTop() < fadePoint){
                $('.single_product_page .big_title').removeClass('scrolling');
                $('.top_menu nav.main_menu').fadeIn('slow');
                $('.top_menu .all_products').fadeIn('slow');
                $('.single_product_page .title_btn_wrap').animateCss('fadeInUp');
                $('.top_menu nav.main_menu ul .menu-item:last-of-type a').animateCss('rubberBandMod');
                setTimeout( function(){
                    $('.single_product_page .title_btn_wrap').animateChangeAni('fadeInUp', 'slideUpDown');
                    $('.single_product_page .scroll_down_text').animateCss('fadeInUp');
                    $('.single_product_page .scroll_down_text').css('opacity', '1');
                }, 380);
                btn_scroll = false;
            }
            if($('.single_product_page .right_split .blog_latest .blog_item > .image').visible()){
                $('.single_product_page .right_split .blog_latest .blog_item > .image').addClass('onLoadImgVisible');
            }

            var el3 = $('.single_product_page .right_split .top_title_holder');
            if(el3.visible(true)){
                el3.css('opacity', '0');
                el3.animateCssInner('fadeInUpHome');
                el3.css('opacity', '1');
                el3.css('animation-delay', '0.2s');
            }

            var el4 = $('.single_product_page .right_split .top_subtitle');
            if(el4.visible(true)){
                el4.css('opacity', '0');
                el4.animateCssInner('fadeInUpHome');
                el4.css('opacity', '1');
                el4.css('animation-delay', '0.2s');
            }

            var el5 = $('.single_product_page .right_split .ingredients_holder');
            if(el5.visible(true)){
                el5.find($('.left_image')).css('opacity', '0');
                el5.find($('.left_image')).animateCssInner('fadeInUpHome');
                el5.find($('.left_image')).css('opacity', '1');
                el5.find($('.left_image')).css('animation-delay', '0.2');
                el5.find($('.ingredients')).css('opacity', '0');
                el5.find($('.ingredients')).animateCssInner('fadeInUpHome');
                el5.find($('.ingredients')).css('opacity', '1');
                el5.find($('.ingredients')).css('animation-delay', '0.4s');
            }

            var el6 = $('.single_product_page .right_split .disclaimer');
            if(el6.visible()){
                var el6ll = el6.find($('.long_line'));
                var el6dt = el6.find($('.disclaimer_text'));
                
	            el6ll.css('opacity', '0');
	            el6ll.animateCssInner('fadeInUpHome');
	            el6ll.css('opacity', '1');
	            el6ll.css('animation-delay', '0.2s');
	            
	            el6dt.css('opacity', '0');
	            el6dt.animateCssInner('fadeInUpHome');
	            el6dt.css('opacity', '1');
	            el6dt.css('animation-delay', '0.4s');
            }

            var el7 = $('.single_product_page .right_split .blog_latest');
            if(el7.visible()){
                el7.find($('.top_title')).css('opacity', '0');
                el7.find($('.top_title')).animateCssInner('fadeInUpHome');
                el7.find($('.top_title')).css('opacity', '1');
                el7.find($('.top_title')).css('animation-delay', '0.2s');
            }

            var el7x = $('.single_product_page .right_split .nutrition_values .nutrition_left');
            if(el7x.visible(true)){
                el7x.css('opacity', '0');
                el7x.animateCssInner('fadeInUpHome');
                el7x.css('opacity', '1');
                el7x.css('animation-delay', '0.2s');
            }

            var el8 = $('.single_product_page .right_split .nutrition_values .nutrition_right');
            if(el8.visible(true)){
                el8.css('opacity', '0');
                el8.animateCssInner('fadeInUpHome');
                el8.css('opacity', '1');
                el8.css('animation-delay', '0.4s');
            }
        });
    },
    parallaxAnimation       :   function() {
        // var len = this.allPositions.length;
        // for(var i = 0; i < len; i++){
        //     var currEl = $('.' + this.allPositions[i] + ' > div');
        //     currEl.each(function(i){
        //         var random = ((Math.random() * 7)) / 100;
        //         $(this).attr('data-depth', random);
        //         $(this).addClass('layer');
        //     });
        // }
        var scene = document.getElementById('scene_parallax');
        if(scene){
            new Parallax(scene, {
                frictionX: 0.8,
                frictionY: 0.8
            });
        }
    }

};

var animationsSocialWall = {
    animationOnLoad :   function(){
        var ilustrations = $('.social_wall .subelements .ilustration');
        ilustrations.css('opacity', '0');
        ilustrations.animateCss('bounceIn');
        ilustrations.css('opacity', '1');
        ilustrations.each(function(i){
            var random = Math.random() * 2500 + 500;
            $(this).css('animation-delay', random + 'ms');
        });
        $('.social_wall .title_btn_wrap').delay(500).animateCss('slideUpDown');
        $('.social_wall .title_btn_wrap, .social_wall .scroll_down_text').click(function(){
            $("html, body").animate({ scrollTop: $(window).height() }, 2000);
            disable_scroll();
            setTimeout(enable_scroll, 2000);
        });
        var btn_scroll = false;
        $(document).on('scroll', function() {
            var fadePoint = $('.full_page_container').height() / 8;
            if(!btn_scroll && $(this).scrollTop() > fadePoint){
                $('.social_wall .title_btn_wrap').animateChangeAni('slideUpDown', 'fadeOutDown');
                $('.social_wall .scroll_down_text').animateCss('fadeOutDown');
                $('.social_wall .scroll_down_text').css('opacity', '0');
                btn_scroll = true;
            } else if(btn_scroll && $(this).scrollTop() < fadePoint) {
                $('.social_wall .title_btn_wrap').animateCss('fadeInUp');
                setTimeout( function(){
                    $('.social_wall .title_btn_wrap').animateChangeAni('fadeInUp', 'slideUpDown');
                    $('.social_wall .scroll_down_text').animateCss('fadeInUp');
                    $('.social_wall .scroll_down_text').css('opacity', '1');
                }, 380);
                btn_scroll = false;
            }
            var ele = $('.social_wall .social_item');
            ele.css('opacity', '0');
            ele.each(function(){
                if($(this).visible()){
                    $(this).animateCssInner('fadeInUpHome');
                    $(this).css('opacity', '1');
                    $(this).css('animation-delay', '0.4s');
                }
            });

        });
        $('.social_wall .subelements .title_wrap').animateCss('fadeInDownHome');
        this.parallaxAnimation();
    },
    parallaxAnimation       :   function() {
        // var ilustrations = $('.social_wall .subelements .ilustration_parallax');
        // ilustrations.each(function(){
        //     var random = ((Math.random() * 7)) / 100;
        //     $(this).attr('data-depth', random);
        //     $(this).addClass('layer');
        // });
        var scene = document.getElementById('scene_parallax');
        if(scene){
            new Parallax(scene, {
                frictionX: 0.8,
                frictionY: 0.8
            });
        }
    }
};

var blogAnimations = {
    onLoad    :   function(){
        this.appendToInput();
        $('.blog_list .title').animateCss('fadeInDownHome');
        var el1 = $('.blog_list .categories');
        el1.css('animation-delay', '0.3s');
        el1.animateCss('fadeInDownHome');

        var blocksLeft = $('.left .row > div:not(.clear)');
        var blocksLeftLength = blocksLeft.length;
        for(var i = 0; i < blocksLeftLength; i++){
            $(blocksLeft[i]).css('animation-delay', ((i * 250) + 400) + 'ms');
        }
        blocksLeft.css('animation-duration', '1200ms');
        blocksLeft.animateCss('fadeInUp');

        var blocksRight = $('.right .right_wrap > div');
        var blocksRightLength = blocksRight.length;
        for(var j = 0; j < blocksRightLength; j++){
            $(blocksRight[j]).css('animation-delay', ((j * 250) + 400) + 'ms');
        }
        blocksRight.css('animation-duration', '500ms');
        blocksRight.animateCss('fadeInUp');

        var ilustrations = $('.ilustrations .ilustration');
        ilustrations.css('opacity', '0');
        ilustrations.animateCss('bounceIn');
        ilustrations.css('opacity', '1');
        ilustrations.each(function(i){
            var random = Math.random() * 2500 + 500;
            $(this).css('animation-delay', random + 'ms');
        });
    },
    appendToInput :   function(){
        var div = $('.gform_newsletter .gform_footer');
        var inputTxt = div.find("input[type='submit']").val();
        var text = '<div class="text">' + inputTxt + '</div>';
        var arrow = '<div class="arrow">' +
            '<span class="btn_arrow one"><svg xmlns="http://www.w3.org/2000/svg" width="13.97" height="8" viewBox="0 0 13.97 8"><defs><style>.cls-1 {fill-rule: evenodd;}</style></defs><path class="cls-1" d="M8293.54,3494.02c-0.97-.92-1.96-1.83-2.95-2.73-1-.92-2.51.55-1.5,1.47,0.44,0.4.88,0.81,1.32,1.22-3.13-.12-6.26-0.04-9.38-0.04a1.045,1.045,0,0,0,0,2.09c3.19-.01,6.39-0.09,9.58.04-0.43.4-.88,0.78-1.31,1.18-1.02.91,0.49,2.37,1.5,1.47C8291.91,3497.72,8295.19,3495.59,8293.54,3494.02Z" transform="translate(-8280 -3491)"/></svg></span><span class="btn_arrow two"><svg xmlns="http://www.w3.org/2000/svg" width="13.97" height="8" viewBox="0 0 13.97 8"><defs><style>.cls-1 {fill-rule: evenodd;}</style></defs><path class="cls-1" d="M8293.54,3494.02c-0.97-.92-1.96-1.83-2.95-2.73-1-.92-2.51.55-1.5,1.47,0.44,0.4.88,0.81,1.32,1.22-3.13-.12-6.26-0.04-9.38-0.04a1.045,1.045,0,0,0,0,2.09c3.19-.01,6.39-0.09,9.58.04-0.43.4-.88,0.78-1.31,1.18-1.02.91,0.49,2.37,1.5,1.47C8291.91,3497.72,8295.19,3495.59,8293.54,3494.02Z" transform="translate(-8280 -3491)"/></svg></span>' +
            '</div>';
        div.append(text + arrow);
    }
};

var faqAnimations = {
	onLoad    :   function(){
		$('.faq h1').animateCss('fadeInDownHome');
		var el1 = $('.faq div.text');
		el1.css('animation-delay', '0.3s');
		el1.animateCss('fadeInDownHome');

		var blocks = $('.faq .row.fixed-padding > div:not(.clear)');
		var blocksLength = blocks.length;
		for(var i = 0; i < blocksLength; i++){
			$(blocks[i]).css('animation-delay', ((i * 250) + 400) + 'ms');
		}
		blocks.css('animation-duration', '1200ms');
		blocks.animateCss('fadeInUp');
		
		var ilustrations = $('.ilustrations .ilustration');
		ilustrations.css('opacity', '0');
		ilustrations.animateCss('bounceIn');
		ilustrations.css('opacity', '1');
		ilustrations.each(function(i){
			var random = Math.random() * 2500 + 500;
			$(this).css('animation-delay', random + 'ms');
		});
		
		$('.faq .title_btn_wrap').delay(500).animateCss('slideUpDown');
		$('.faq .title_btn_wrap, .faq .scroll_down_text').click(function(){
			$("html, body").animate({ scrollTop: $(document).height()-$(window).height() }, 2000);
			disable_scroll();
			setTimeout(enable_scroll, 2000);
		});
		var btn_scroll = false;
		$(document).on('scroll', function() {
			var fadePoint = $('.full_height_row').height() / 8;
			if(!btn_scroll && $(this).scrollTop() > fadePoint){
				$('.faq .title_btn_wrap').animateChangeAni('slideUpDown', 'fadeOutDown');
				$('.faq .title_elements .scroll_down_text').animateCss('fadeOutDown');
				$('.faq .title_elements .scroll_down_text').css('opacity', '0');
				btn_scroll = true;
			} else if(btn_scroll && $(this).scrollTop() < fadePoint) {
				$('.faq .title_btn_wrap').animateCss('fadeInUp');
				setTimeout( function(){
					$('.faq .title_btn_wrap').animateChangeAni('fadeInUp', 'slideUpDown');
					$('.faq .title_elements .scroll_down_text').animateCss('fadeInUp');
					$('.faq .title_elements .scroll_down_text').css('opacity', '1');
				}, 380);
				btn_scroll = false;
			}
		});
	}
};

var blogPostAnimations = {
    onLoad  :   function(){
        this.appendClass();
        $('.blog_post .txt_1_wrap').animateCss('fadeInDownHome');
        var el1 = $('.blog_post .txt_2_wrap .title');
        el1.css('animation-delay', '0.3s');
        el1.animateCss('fadeInDownHome');

        var el2 = $('.blog_post .txt_2_wrap .single_post_date');
        el2.css('animation-delay', '0.6s');
        el2.animateCss('fadeInDownHome');

        var el3 = $('.blog_post .txt_3_wrap');
        el3.css('animation-delay', '0.9s');
        el3.animateCss('fadeInDownHome');

        setTimeout(function(){
            $('.onLoadImg').css('max-width', '100%');
        }, 1200);
        setTimeout(function(){
            $('.onLoadImg>img').css('max-width', '100%');
        }, 1800);

        var el4 = $('.blog_post .left > div, .blog_post .left > a');
        var el4Length = el4.length;
        for(var j = 0; j < el4Length; j++){
            $(el4[j]).css('animation-delay', ((j * 150) + 1500) + 'ms');
        }
        el4.css('animation-duration', '500ms');
        el4.animateCss('fadeInUp');

        var el5 = $('.blog_post .right > .sub_title, .blog_post .right > .location_line, .blog_post .right > .directions > *,  .blog_post .right > a');
        var el5Length = el5.length;
        for(var i = 0; i < el5Length; i++){
            $(el5[i]).css('animation-delay', ((i * 150) + 1800) + 'ms');
        }
        el5.css('animation-duration', '500ms');
        el5.animateCss('fadeInUp');

        var ilustrations = $('.ilustrations .ilustration');
        ilustrations.css('opacity', '0');
        ilustrations.animateCss('bounceIn');
        ilustrations.css('opacity', '1');
        ilustrations.each(function(i){
            var random = Math.random() * 2500 + 500;
            $(this).css('animation-delay', random + 'ms');
        });
    },
    appendClass :   function(){
        var post_next_prev = $('.blog_post .right a');
        post_next_prev.addClass('inner_link_click');
    }
};

var animationsContactUs = {
    animationOnLoad         :   function(){
        this.appendToInput();
        var ilustrations = $('.contact .title_elements .ilustration');
        ilustrations.css('opacity', '0');
        ilustrations.animateCss('bounceIn');
        ilustrations.css('opacity', '1');
        ilustrations.each(function(i){
            var random = Math.random() * 2500 + 500;
            $(this).css('animation-delay', random + 'ms');
        });
        $('.contact .title_btn_wrap').delay(500).animateCss('slideUpDown');
        $('.contact .title_btn_wrap, .contact .title_elements .scroll_down_text').click(function(){
            $("html, body").animate({ scrollTop: $(document).height()-$(window).height() }, 2000);
            disable_scroll();
            setTimeout(enable_scroll, 2000);
        });
        var btn_scroll = false;
        $(document).on('scroll', function() {
            var fadePoint = $('.full_page_container').height() / 8;
            if(!btn_scroll && $(this).scrollTop() > fadePoint){
                $('.contact .title_btn_wrap').animateChangeAni('slideUpDown', 'fadeOutDown');
                $('.contact .title_elements .scroll_down_text').animateCss('fadeOutDown');
                $('.contact .title_elements .scroll_down_text').css('opacity', '0');
                btn_scroll = true;
            } else if(btn_scroll && $(this).scrollTop() < fadePoint) {
                $('.contact .title_btn_wrap').animateCss('fadeInUp');
                setTimeout( function(){
                    $('.contact .title_btn_wrap').animateChangeAni('fadeInUp', 'slideUpDown');
                    $('.contact .title_elements .scroll_down_text').animateCss('fadeInUp');
                    $('.contact .title_elements .scroll_down_text').css('opacity', '1');
                }, 380);
                btn_scroll = false;
            }
        });
        $('.contact .main_title').animateCss('fadeInDownHome');
        this.parallaxAnimation();
    },
    parallaxAnimation       :   function() {
        // var ilustrations = $('.contact .title_elements .ilustration');
        // ilustrations.each(function(){
        //     var random = ((Math.random() * 7)) / 100;
        //     $(this).attr('data-depth', random);
        //     $(this).addClass('layer');
        // });
        var scene = document.getElementById('scene_parallax');
        if(scene){
            new Parallax(scene, {
                frictionX: 0.8,
                frictionY: 0.8
            });
        }
    },
    appendToInput       :   function(){
        var div = $('.contact .form .gform_footer');
        var inputTxt = div.find("input[type='submit']").val();
        var text = '<div class="text">' + inputTxt + '</div>';
        var arrow = '<div class="arrow">' +
            '<span class="btn_arrow one"><svg xmlns="http://www.w3.org/2000/svg" width="13.97" height="8" viewBox="0 0 13.97 8"><defs><style>.cls-1 {fill-rule: evenodd;}</style></defs><path class="cls-1" d="M8293.54,3494.02c-0.97-.92-1.96-1.83-2.95-2.73-1-.92-2.51.55-1.5,1.47,0.44,0.4.88,0.81,1.32,1.22-3.13-.12-6.26-0.04-9.38-0.04a1.045,1.045,0,0,0,0,2.09c3.19-.01,6.39-0.09,9.58.04-0.43.4-.88,0.78-1.31,1.18-1.02.91,0.49,2.37,1.5,1.47C8291.91,3497.72,8295.19,3495.59,8293.54,3494.02Z" transform="translate(-8280 -3491)"/></svg></span><span class="btn_arrow two"><svg xmlns="http://www.w3.org/2000/svg" width="13.97" height="8" viewBox="0 0 13.97 8"><defs><style>.cls-1 {fill-rule: evenodd;}</style></defs><path class="cls-1" d="M8293.54,3494.02c-0.97-.92-1.96-1.83-2.95-2.73-1-.92-2.51.55-1.5,1.47,0.44,0.4.88,0.81,1.32,1.22-3.13-.12-6.26-0.04-9.38-0.04a1.045,1.045,0,0,0,0,2.09c3.19-.01,6.39-0.09,9.58.04-0.43.4-.88,0.78-1.31,1.18-1.02.91,0.49,2.37,1.5,1.47C8291.91,3497.72,8295.19,3495.59,8293.54,3494.02Z" transform="translate(-8280 -3491)"/></svg></span>' +
            '</div>';
        div.append(text + arrow);
    }
};

var animationsWhereToBuy = {
    animationOnLoad :   function(){
        var ilustrations = $('.where_to_buy .title_elements .ilustration');
        ilustrations.css('opacity', '0');
        ilustrations.animateCss('bounceIn');
        ilustrations.css('opacity', '1');
        ilustrations.each(function(i){
            var random = Math.random() * 2500 + 500;
            $(this).css('animation-delay', random + 'ms');
        });
        $('.where_to_buy .where_to_buy_title_btn_wrap').delay(500).animateCss('slideUpDown');
        $('.where_to_buy .where_to_buy_title_btn_wrap, .where_to_buy .scroll_down_text').click(function(){
            $("html, body").animate({ scrollTop: $(document).height()-$(window).height() }, 2000);
            disable_scroll();
            setTimeout(enable_scroll, 2000);
        });
        var btn_scroll = false;
        $(document).on('scroll', function() {
            var fadePoint = $('.full_page_container').height() / 8;
            if(!btn_scroll && $(this).scrollTop() > fadePoint){
                $('.where_to_buy .where_to_buy_title_btn_wrap').animateChangeAni('slideUpDown', 'fadeOutDown');
                $('.where_to_buy .scroll_down_text').animateCss('fadeOutDown');
                $('.where_to_buy .scroll_down_text').css('opacity', '0');
                btn_scroll = true;
            } else if( btn_scroll && $(this).scrollTop() < fadePoint){
                $('.where_to_buy .where_to_buy_title_btn_wrap').animateCss('fadeInUp');
                setTimeout( function(){
                    $('.where_to_buy .where_to_buy_title_btn_wrap').animateChangeAni('fadeInUp', 'slideUpDown');
                    $('.where_to_buy .scroll_down_text').animateCss('fadeInUp');
                    $('.where_to_buy .scroll_down_text').css('opacity', '1');
                }, 380);
                btn_scroll = false;
            }
        });
        $('.where_to_buy .main_title').animateCss('fadeInDownHome');
        this.parallaxAnimation();
    },
    parallaxAnimation       :   function() {
        // var ilustrations = $('.where_to_buy .title_elements .ilustration_parallax');
        // ilustrations.each(function(){
        //     var random = ((Math.random() * 7)) / 100;
        //     $(this).attr('data-depth', random);
        //     $(this).addClass('layer');
        // });
        var scene = document.getElementById('scene_parallax');
        if(scene){
            new Parallax(scene, {
                frictionX: 0.8,
                frictionY: 0.8
            });
        }
    }
};

function menuFooterLoad(){
    var el3 = $('.top_menu .logo a');
    el3.animateCss('fadeInDown');
    el3.css('opacity', '1');

    var el4 = $('footer');
    el4.animateCss('fadeIn');
    el4.css('opacity', '1');

    var el5 = $('.top_menu .all_products');
    el5.animateCss('fadeInDown');
    el5.css('opacity', '1');

    var menuArray = $('.top_menu nav.main_menu ul.menu > li');
    var arrayLen = menuArray.length;
    var mel1 = menuArray[arrayLen - 1];
    var mel2 = menuArray[arrayLen - 2];
    menuArray[arrayLen - 1] = mel2;
    menuArray[arrayLen - 2] = mel1;

    $('.top_menu nav.main_menu ul.menu').html(menuArray);
    menuArray.each(function(){
        $(this).find('a').each(function() {
            var content = $(this).html();
            $(this).html('<span class="one">' + content + '</span><span class="two">' + content + '</span>');
        });
    });

    if(!$('body').hasClass('home')){
        setInterval(function() {
            $('.top_menu nav.main_menu ul .menu-item:last-of-type a').animateCss('rubberBandMod');
        }, 5000);
    }

    var menu = $('.top_menu nav.main_menu ul.menu > li');
    menu.animateCss('fadeInDownHome');
    menu.css('opacity', '1');
    menu.css('animation-duration', '500ms');
    var menuLen = menu.length;
    for(var i = 0; i < menuLen; i++){
        $(menu[i]).css('animation-delay', (i * 0.25) + 's');
	    $(menu[i]).find('a').addClass('inner_link_click');
    }

    if ($('body').hasClass('blog') || $('body').hasClass('archive')){
        $('.page-numbers').addClass('inner_link_click');
        $('.blog_list .nav-links .prev, .blog_list .nav-links .next').addClass('inner_link_click');
    }
}

var allProductsAnimations = {
    allCat                  :   ['fior_di_sale', 'mediterraneo', 'pesto_basilico', 'zenzero_limone', 'carote_zenzero', 'garam_masala', 'affumicato', 'peperoncino', 'tamari'],
    popup                   :   $('.all_products_popup'),
    pauseHomeAnimations     :   false,
    scrolled                :   false,

    allProductsInit     :   function() {
        // $('.all_products .imgholder').click(function () {
        //     var classes = $(this).attr('class').split(/\s+/);
        //     var trueClass = classes[1];
        //     $('.all_products .top_text').css('display', 'none');
        //     $('.all_products .top_text.' + trueClass).css('display', 'inline-block');
        //
        // });

        $('.top_menu .all_products .link.on_open').click(function () {
            $(allProductsAnimations.popup).removeClass('animated fadeOut');
            if(!allProductsAnimations.popup.hasClass('animated')){
                // var color = $('.top_menu .all_products .link.on_open .icon_holder').css('background-color');
                // console.log(color);
                // $('.all_products_popup .close_btn .icon_holder').css('background-color', color + "!important");
                allProductsAnimations.onOpen();
                $('.full_page').css('overflow', 'visible');
                $('.footer_holder').css('display', 'none');
                activeElement = $('.full_page')[0];
                $('.all_products_popup').css('min-height', $('.full_page').outerHeight());
            }
        });
        $('.all_products_popup .close_btn .link').click(function () {
            if(!allProductsAnimations.popup.hasClass('animated')) {
                allProductsAnimations.onClose();
                $('.full_page').css('overflow', 'hidden');
                $('.footer_holder').css('display', 'block');
                init();
            }
        });
    },
    
    allProducts_mobileInit  :   function(){
	    var popup_height = $('.all_products_popup').outerHeight();
	    var page = $('body');
	    var overflow = page.css('overflow');
	    
        $('.navigation_inner_mobile .icon_holder, .all_products_mobile_txt').click(function(){
	        $(allProductsAnimations.popup).removeClass('animated fadeOut');
	        if(!allProductsAnimations.popup.hasClass('animated')){
		        allProductsAnimations.onOpen();
		        $('.full_page').css('overflow', 'initial');
		        $('.footer_holder').css('display', 'none');
		        activeElement = $('.full_page')[0];
		        $('.all_products_popup').css('min-height', $('.full_page').outerHeight());
		        $("html, body").delay(500).animate({ scrollTop: 0 }, 500);
		        var menu = $( ".main_menu_mobile" );
		        menu.fadeOut();
		        var icon_close = $('.top_menu_mobile .btn_open span.one, .top_menu_mobile .btn_open span.two, .top_menu_mobile .btn_open span.three');
		        var icon_open = $('.top_menu_mobile .btn_open span.icon');
		        icon_close.fadeIn();
		        icon_open.fadeOut();
		        $('#home_product_links_mobile').css('display', 'none');
		        $('.fixed_menu').css('position', 'absolute');
		        $('.top_menu_mobile .logo').css('position', 'fixed');
		        
		        if(popup_height < page.height()){
		            page.css('overflow', 'hidden');
		            page.css('height', popup_height);
                }
	        }
        });
	    $('.all_products_popup .close_btn .link').click(function () {
		    if(!allProductsAnimations.popup.hasClass('animated')) {
			    allProductsAnimations.onClose_mobile();
			    $('.full_page').css('overflow', 'hidden');
			    $('#home_product_links_mobile').css('display', 'block');
			    $('.fixed_menu').css('position', 'fixed');
			    $('.top_menu_mobile .logo').css('position', 'relative');
			    
			    if(overflow){
			        page.css('overflow', overflow);
                } else {
				    page.css('overflow', 'auto');
                }
			
			    page.css('height', 'auto');
			    
			    init();
		    }
	    });
    },

    onOpen                  :   function(){
        this.pauseHomeAnimations = true;
        this.scrolled = false;
        this.popup.animateCssIn('fadeIn');
        var time = 0;
        var leng = this.allCat.length;
        var imgHolder = $('.all_products_popup .imgholder_all_products');
        for(var i = 0; i < leng; i++){
            $('.all_products_popup .imgholder_all_products.' + this.allCat[i]).css('animation-delay', ((time * 350) + 800) + 'ms');
            time++;
        }
        imgHolder.css('animation-duration', '500ms');
        imgHolder.animateCss('fadeInDown');
        $('.all_products_popup .btn_wrraper_title').animateCss('slideUpDown');
        $(document).on('scroll', function() {
            if(!allProductsAnimations.scrolled){
                $('.all_products_popup .btn_wrraper_title').animateChangeAni('slideUpDown', 'fadeOutDown');
                allProductsAnimations.scrolled = true;
            }
        });
    },
    onClose                 :   function(){
        this.pauseHomeAnimations = false;
        this.popup.animateCssOut('fadeOut');
    },
	onClose_mobile          :   function(){
		this.popup.animateCssOut('fadeOut');
	}
};

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    },
    animateCssInOut: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName + 'Out').css('animation-delay', '0s').unbind(animationEnd).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName + 'Out');
            $(this).addClass('animated ' + animationName + 'In').css('animation-delay', '.65s');
        });
    },
    animateCssInner: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        if(!this.hasClass('vision')){
            this.addClass('animated ' + animationName).unbind(animationEnd).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName).addClass('vision');
            });
        }
    },
    animateCssOut: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).unbind(animationEnd).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            $(this).attr('style', '');
        });
    },
    animateCssIn: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.css('animation-duration', '700ms');
        this.css('display', 'block');
        this.css('opacity', '1');
        this.addClass('animated ' + animationName).unbind(animationEnd).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    },
    animateChangeAni: function (animationNameDelete, animationNameAdd) {
        this.removeClass('animated ' + animationNameDelete);
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationNameAdd).unbind(animationEnd).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationNameAdd);
        });
    }
});

function parallaxEffect(){
    $(window).on('resize load', function(){
        if($('body').hasClass('single')){
            var windowHeight = $('.single_product_page .right_split .right_holder .right_holder_wrap').height();
        } else if($('body').hasClass('page-template-about-us')){
            var windowHeight = $('.about_us .left_split .left_holder .left_holder_wrap').height();
        } else {
            var windowHeight = $(window).height();
        }
        $('.para-full').attr('data-parallax', '{"y" : 90, "from-scroll" : 0, "to-scroll" : ' + windowHeight + '}');
        $('.para-title').attr('data-parallax', '{"y" : 90}');
    });
}
parallaxEffect();

function throttle(func, interval) {
    var lastCall = 0;
    return function () {
        var now = Date.now();
        if (lastCall + interval < now) {
            lastCall = now;
            return func.apply(this, arguments);
        }
    };
}

var keys = [37, 38, 39, 40];

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.returnValue = false;
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
    preventDefault(e);
}

function disable_scroll() {
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
}