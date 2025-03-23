window.onload=function(){

	var story_sd;
	var vis_sd;

	setTimeout(function() {
		$(".vis").addClass("active");
		$(".vis").addClass("move");
		$("header").addClass("on");
	}, 500); 


	setTimeout(function() {
		$('#popup').addClass('on');
	}, 3000); 


	// 기본 fullpage 플러그인 start
	$('#fullpage').fullpage({
		scrollingSpeed: 1500,
		normalScrollElements: '.scrollable-element',
		// autoScrolling: true,   // 자동 스크롤 활성화
		// scrollHorizontally: false,  // 세로 스크롤만 활성화
		// navigation: false,      // 내비게이션 활성화 (각 섹션에 대한 내비게이션)
		// navigationPosition: 'right',  // 내비게이션 위치


		afterLoad: function(anchorLink, index) {
			if(index==1){
				if($('.vis').hasClass('vd_on')){
					$.fn.fullpage.setAllowScrolling(true);
				}
			}
			if(index==2){
				document.getElementById('vis_vd').pause();
				$.fn.fullpage.setAllowScrolling(true);
			}
			if(index==3){
				$.fn.fullpage.setAllowScrolling(false);
			}			
		},
		onLeave : function(anchorLink, destination, direction, index){
			if(anchorLink == 2 && direction =='up'){
				document.getElementById('vis_vd').play();
			}
			if(anchorLink == 2 && direction =='down'){
				$('header').removeClass('wh');
				setTimeout(function() {
					$('.story .txt_page').addClass('move');
				}, 1500);
			}
			if(anchorLink == 3 && direction =='up'){
				if($(window).width() > 1300){
					gsap.to('.story .txt_page ul li .ho',{
						duration: 0.8,
						transform:'translate(0%,101%)',
						ease: "power1.out",
					});
				}
				$('.story .txt_page').removeClass('move');
				document.getElementById('story_vd1').pause();

			}
			if(anchorLink == 4 && direction =='down'){
				
			}

			if(anchorLink == 4 && direction =='up'){

			}			
		}
	});

	// fullpage 스크롤 기능을 기본적으로 비활성화 한다다
	$.fn.fullpage.setKeyboardScrolling(false); //키보드 스크롤 비활성화
	$.fn.fullpage.setAllowScrolling(false); //마우스 휠과 터치  스크롤 비활성화


	//section1 - vis 관련 모션 스크립트
	vis_sd = new Swiper(".vis_sd", {
		parallax: true,
		direction: "vertical",
		touchRatio: 0,
		resistance : true,
		resistanceRatio : 0,
		on: {
			slideChangeTransitionStart : function(){
				$('.vis').addClass('vd_on');
				document.getElementById('vis_vd').play();
				setTimeout(function() {
					$.fn.fullpage.setAllowScrolling(true);
				}, 1000);
			}
		}
	});


	$(document).on('DOMMouseScroll mousewheel wheel', '.vis.move .vis_sd', function(event,delta){
		var delta = event.originalEvent.deltaY || -event.originalEvent.wheelDelta || event.originalEvent.detail;
		if (delta > 0 && $('.vis').hasClass('vd_on') == false) {
			vis_sd.slideTo(1);
		}
	});

	$(".vis .vis_sd").swipe( {
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == 'up'  && $('.vis').hasClass('vd_on') == false && $('.vis').hasClass('move')) {
				vis_sd.slideTo(1);
			}
		},
		threshold:20
	});

	// section2 - 없음

	// section3 - story 관련 모션션

	//story txt_page (마우스 오버시 효과과)
	$(document).on('mouseenter', '.story .txt_page.move ul li', function(){
		var ho = $(this).find('.ho');
		if($(window).width() > 1300){
			gsap.to(ho, {
				duration: 0.8,
				transform:'translate(0%,0%)',
				ease: "power1.out",
			});
		}
		if($(this).hasClass('ing') == false){
			$(this).addClass('ing');
		}
	});
	$(document).on('mouseleave', '.story .txt_page.move ul li', function(){
		var ho = $(this).find('.ho');
		if($(window).width() > 1300){
			gsap.to(ho,{
				duration: 0.8,
				transform:'translate(0%,-101%)',
				ease: "power1.out",
				onComplete: () => {
					gsap.to(ho, {
						duration: 0,
						transform:'translate(0%,101%)',
						ease: "power1.out",
					});
				}
			});
		}
	});


	//story_sd
	story_sd = new Swiper(".story_sd", {
		parallax: true,
		speed:'1200',
		mousewheel: true,
		resistance : true,
		resistanceRatio : 0,
		touchRatio: 0,
		effect: "creative",
		creativeEffect: {
			prev: {
				shadow: false,
				translate: [0, 0, -100],
			},
			next: {
				translate: ["100%", 0, 0],
			},
		},
		on: {
			slideChangeTransitionStart : function(){
				story_sd.disable();
				$('.story_sd .sd4').removeClass('on');
				$('.story_sd').removeClass('move');
				if($('.story_sd .sd1').hasClass('swiper-slide-active')){
					document.getElementById('story_vd1').play();
				} else if($('.story_sd .sd2').hasClass('swiper-slide-active')){
					document.getElementById('story_vd2').play();
					$('header').addClass('wh');
				} else if($('.story_sd .sd3').hasClass('swiper-slide-active')){
					document.getElementById('story_vd3').play();
					$('header').removeClass('wh');
				} else if($('.story_sd .sd4').hasClass('swiper-slide-active')){
					document.getElementById('story_vd4').play();
					$('header').addClass('wh');
				}
			},
			slideChangeTransitionEnd : function(){
				story_sd.enable();
				if($('.story_sd .sd1').hasClass('swiper-slide-active')){
					$('.story_sd').addClass('move');
					document.getElementById('story_vd2').pause();
					document.getElementById('story_vd3').pause();
					document.getElementById('story_vd4').pause();
				} else if($('.story_sd .sd2').hasClass('swiper-slide-active')){
					document.getElementById('story_vd1').pause();
					document.getElementById('story_vd3').pause();
					document.getElementById('story_vd4').pause();
				} else if($('.story_sd .sd3').hasClass('swiper-slide-active')){
					document.getElementById('story_vd1').pause();
					document.getElementById('story_vd2').pause();
					document.getElementById('story_vd4').pause();
				} else if($('.story_sd .sd4').hasClass('swiper-slide-active')){
					$('.story_sd .sd4').addClass('on');
					document.getElementById('story_vd1').pause();
					document.getElementById('story_vd2').pause();
					document.getElementById('story_vd3').pause();
				}
			}
		}
	});

	$(document).on('DOMMouseScroll mousewheel wheel', '.story .txt_page.move', function(event,delta){
		var delta = event.originalEvent.deltaY || -event.originalEvent.wheelDelta || event.originalEvent.detail;
		if (delta < 0) {
			$.fn.fullpage.moveTo(2);
		}
		if (delta > 0) {
			$(".story .txt_page ul").find("li").eq(0).trigger("click");
		}
	});

	$(".story .txt_page").swipe( {
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == 'down' && $('.story .txt_page').hasClass('move')) {
				$.fn.fullpage.moveTo(2);
			}
			if (direction == 'up' && $('.story .txt_page').hasClass('move')) {
				$(".story .txt_page ul").find("li").eq(0).trigger("click");
			}
		},
		threshold:20
	});

}