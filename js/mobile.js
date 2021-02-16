var mobile_animationsHome = {
	currentCat              :   "fior_di_sale",
	allCat                  :   ['fior_di_sale', 'mediterraneo', 'pesto_basilico', 'zenzero_limone', 'carote_zenzero', 'garam_masala', 'affumicato', 'peperoncino'],
	circleRotations         :   [0, -12, -24, -36, -48, -60, -72, -84],
	changeCat               :   function(curr) {
		this.currentCat = curr;
	},
	
	start        :       function(){
		this.onSwipe();
	},
	
	onSwipe     :       function(){
		$(".home_main.full_page").on("swipeleft",function(){
			var index = mobile_animationsHome.allCat.indexOf(mobile_animationsHome.currentCat);
			index++;
			if(index > mobile_animationsHome.allCat.length - 1){
				index = mobile_animationsHome.allCat.length - 1;
				return;
			}
			mobile_animationsHome.on_change(index);
			$('#home_product_links_mobile .image_holder').css('transform', 'rotate(' + mobile_animationsHome.circleRotations[index] + 'deg)');
			$('.home_main .product_item').removeClass('shown');
			$('.home_main .product_item.' + mobile_animationsHome.currentCat).addClass('shown');
			$('.image_holder > .circle').removeClass('active');
			$('.circle.' + mobile_animationsHome.currentCat).addClass('active');
		});
		
		$(".home_main.full_page").on("swiperight",function(){
			var index = mobile_animationsHome.allCat.indexOf(mobile_animationsHome.currentCat);
			index--;
			if(index < 0){
				index = 0;
				return;
			}
			mobile_animationsHome.on_change(index);
			$('#home_product_links_mobile .image_holder').css('transform', 'rotate(' + mobile_animationsHome.circleRotations[index] + 'deg)');
			$('.home_main .product_item').removeClass('shown');
			$('.home_main .product_item.' + mobile_animationsHome.currentCat).addClass('shown');
			$('.image_holder > .circle').removeClass('active');
			$('.circle.' + mobile_animationsHome.currentCat).addClass('active');
		});
	},
	
	// onClick     :   function(){
	// 	$('#home_product_links_mobile .image_holder .circle').click(function(){
	// 		var current = $(this).attr('class').split(/\s+/)[1];
	// 		var index = mobile_animationsHome.allCat.indexOf(current);
	// 		mobile_animationsHome.on_change(index);
	// 		$('#home_product_links_mobile .image_holder').css('transform', 'rotate(' + mobile_animationsHome.circleRotations[index] + 'deg)');
	// 		$('.home_main .product_item').removeClass('shown');
	// 		$('.home_main .product_item.' + mobile_animationsHome.currentCat).addClass('shown');
	// 		$('#home_product_links_mobile .image_holder .circle').removeClass('active');
	// 		$('.circle.' + mobile_animationsHome.currentCat).addClass('active');
	// 	});
	// },
	
	on_change    :   function(index){
		var el_current = $('.home_main .product_item.' + mobile_animationsHome.currentCat + ' .inner_back_product .central_product .central_product_holder .product_image .imgholder img');
		el_current.animateCss('fadeOutDownHome');
		el_current.css('animation-delay', '.3s');
		
		var el_current_btn = $('.home_main .product_item.' + mobile_animationsHome.currentCat + ' .inner_back_product .central_product .central_product_link_mobile a');
		el_current_btn.animateCss('fadeOutDownHome');
		el_current_btn.css('animation-delay', '.3s');
		
		var el_h2 = $('.home_main .product_item.' + this.currentCat + ' .inner_back_product .central_product .central_product_holder .product_title h2');
		el_h2.animateCss('fadeOutDownHome');
		el_h2.css('animation-delay', '0s');
		
		var el_tofu = $('.home_main .product_item.' + this.currentCat + ' .inner_back_product .central_product .central_product_holder .product_tofu_image');
		el_tofu.animateCss('fadeOutUpHome');
		el_tofu.css('animation-delay', '.15s');
		
		
		mobile_animationsHome.changeCat(mobile_animationsHome.allCat[index]);
		
		
		var el_btn = $('.home_main .product_item .inner_back_product .central_product .central_product_link_mobile a');
		var el_next_btn = $('.home_main .product_item.' + mobile_animationsHome.currentCat + ' .inner_back_product .central_product .central_product_link_mobile a');
		el_btn.css('opacity', '0');
		el_next_btn.animateCss('fadeInUpHome');
		el_next_btn.css('opacity', '1');
		el_next_btn.css('animation-delay', '.5s');
		
		var el = $('.home_main .product_item .inner_back_product .central_product .central_product_holder .product_image .imgholder img');
		var el_next = $('.home_main .product_item.' + mobile_animationsHome.currentCat + ' .inner_back_product .central_product .central_product_holder .product_image .imgholder img');
		el.css('opacity', '0');
		el_next.animateCss('fadeInUpHome');
		el_next.css('opacity', '1');
		el_next.css('animation-delay', '.5s');
		
		var el_h2_next = $('.home_main .product_item .inner_back_product .central_product .central_product_holder .product_title h2');
		var el_h2_next_1 = $('.home_main .product_item.' + this.currentCat + ' .inner_back_product .central_product .central_product_holder .product_title h2');
		el_h2_next.css('opacity', '0');
		el_h2_next_1.animateCss('fadeInUpHome');
		el_h2_next_1.css('opacity', '1');
		el_h2_next_1.css('animation-delay', '.8s');
		
		var el_tofu_next = $('.home_main .product_item .inner_back_product .central_product .central_product_holder .product_tofu_image');
		var el_tofu_next_1 = $('.home_main .product_item.' + this.currentCat + ' .inner_back_product .central_product .central_product_holder .product_tofu_image');
		el_tofu_next.css('opacity', '0');
		el_tofu_next_1.animateCss('fadeInDownHome');
		el_tofu_next_1.css('opacity', '1');
		el_tofu_next_1.css('animation-delay', '.65s');
	}
};

var mobile_innerPage = {
	start   :   function(){
		this.onLoad();
	},
	
	onLoad  :   function(){
		var cheese = $('.single_product_page .right_split .ingredients_holder .left_image').html();
		var product_holder = $('.single_product_page .left_split .packaging_images_holder');
		product_holder.append(cheese);
	}
};