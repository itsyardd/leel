window.onload = function(){

	if ($('.wrap').hasClass('main')) {

		//var lv_sd;
		var story_sd;
		var vis_sd;

		//pop cookie
		var popupHiddenTime;
		if ($('.popup').length > 0) {
			const popup = document.querySelector('.popup');
			const closeBtn = document.querySelector('.pop_chk');
			const dontShowCheckbox = document.getElementById('dontShow');
			popupHiddenTime = localStorage.getItem('popupHiddenTime');
			closeBtn.addEventListener('click', function() {
				if (dontShowCheckbox.checked) {
					localStorage.setItem('popupHiddenTime', new Date().getTime());
				}
			});
		}

		//intro_vd
		var once = true;
		var intro = document.getElementById('intro_vd');
		intro.play();
		intro.addEventListener('play', function() {
			if (sessionStorage.getItem("intro")){
				$('.wrap').addClass('on');
				intro.pause();
				$('.intro').remove();
				$('header').addClass('on');
				$('.vis').addClass('on');
				setTimeout(function() {
					$('.vis').addClass('move');
				}, 2500);
				setTimeout(function() {
					if (!popupHiddenTime || (new Date().getTime() - popupHiddenTime) > 24 * 60 * 60 * 1000) {
						$('.popup').addClass('on');
					}
				}, 3500);
			} else {
				if(once == true){
					once = false;
					requestAnimationFrame(function() {
						$('.wrap').addClass('on');
						$('.intro').addClass('on');
						sessionStorage.setItem("intro", "once");
						setTimeout(function() {
							intro.pause();
							$('.intro').remove();
							$('header').addClass('on');
							$('.vis').addClass('on');
						}, 4000);
						setTimeout(function() {
							$('.vis').addClass('move');
						}, 6500);
						setTimeout(function() {
							if (!popupHiddenTime || (new Date().getTime() - popupHiddenTime) > 24 * 60 * 60 * 1000) {
								$('.popup').addClass('on');
							}
						}, 7500);
					});
				}
			}
		});

		//fullpage
		$('#fullpage').fullpage({
			scrollingSpeed: 1500,
			normalScrollElements: '.scrollable-element',
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
				if(index==4){
					$.fn.fullpage.setAllowScrolling(false);
					architecture_sd.enable();
				}
				if(index==5){
					$.fn.fullpage.setAllowScrolling(false);
					salon.enable();
				}
				if(index==6){
					$.fn.fullpage.setAllowScrolling(false);
					salon_thm_img.enable();
					salon_big_img.enable();
					salon_big_img.autoplay.start();
				}
				if(index==7){
					$.fn.fullpage.setAllowScrolling(true);
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
				if(anchorLink == 3 && direction =='down'){
					document.getElementById('architecture_vd1').play();
					story_sd.disable();
					$('header').removeClass('wh');
					document.getElementById('story_vd4').pause();
				}
				if(anchorLink == 4 && direction =='up'){
					architecture_sd.disable();
					story_sd.enable();
					$('header').addClass('wh');
					document.getElementById('story_vd4').play();
				}
				if(anchorLink == 4 && direction =='down'){
					architecture_sd.disable();
					$('header').addClass('wh');
				}
				if(anchorLink == 5 && direction =='up'){
					$('header').removeClass('wh');
					document.getElementById('architecture_vd3_1').play();
					document.getElementById('architecture_vd3_2').play();
					salon.disable();
				}
				if(anchorLink == 5 && direction =='down'){
					salon.disable();
				}
				if(anchorLink == 6 && direction =='down'){
					//document.getElementById('cf_vd').play();
					$('header').addClass('wh');
				}
				if(anchorLink == 7 && direction =='up'){
					//document.getElementById('cf_vd').pause();
					$('header').removeClass('wh');
				}
				if(anchorLink == 7 && direction =='down'){
					$('header').removeClass('wh');
					//document.getElementById('cf_vd').pause();
				}
				if(anchorLink == 8 && direction =='up'){
					$('header').addClass('wh');
					//document.getElementById('cf_vd').play();
				}
			}
		});
		$.fn.fullpage.setKeyboardScrolling(false); //키보드 스크롤 비활성화
		$.fn.fullpage.setAllowScrolling(false); //마우스 휠과 터치  스크롤 비활성화

		//vis_sd
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
		story_sd.disable();

		$(".story_sd").swipe( {
			swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
				if (direction == 'down') {
					story_sd.slidePrev();
				}
				if (direction == 'up') {
					story_sd.slideNext();
				}
			},
			threshold:20
		});

		$(document).on('DOMMouseScroll mousewheel wheel', '.story .story_sd.move', function(event,delta){
			var delta = event.originalEvent.deltaY || -event.originalEvent.wheelDelta || event.originalEvent.detail;
			if (delta < 0) {
				story_sd.disable();
				$('.story .story_sd').removeClass('move');
				$('.story').removeClass('sd_on');
				$('header').removeClass('wh');
				setTimeout(function() {
					$('.story .txt_page').addClass('move');
				}, 1500);
			}
		});

		$(".story").swipe( {
			swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
				if (direction == 'down' && $('.story_sd').hasClass('move')) {
					story_sd.disable();
					$('.story .story_sd').removeClass('move');
					$('.story').removeClass('sd_on');
					setTimeout(function() {
						$('.story .txt_page').addClass('move');
					}, 1500);
				}
			},
			threshold:20
		});

		$(document).on('DOMMouseScroll mousewheel wheel', '.story .story_sd .sd4.on', function(event,delta){
			var delta = event.originalEvent.deltaY || -event.originalEvent.wheelDelta || event.originalEvent.detail;
			if (delta > 0) {
				$.fn.fullpage.moveTo(4);
			}
		});

		$(".story .story_sd .sd4").swipe( {
			swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
				if (direction == 'up' && $('.story_sd .sd4').hasClass('on')) {
					$.fn.fullpage.moveTo(4);
				}
			},
			threshold:20
		});

		//story txt_page
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

		var counter = true;
		$(document).on('click', '.story .txt_page.move ul li', function(){
			 var idx = $(this).index();
			 if($(window).width() > 1300){
				 gsap.to('.story .txt_page ul li .ho',{
					duration: 0.8,
					transform:'translate(0%,101%)',
					ease: "power1.out",
				});
			 }
			if(idx == 0){
				story_sd.enable();
				story_sd.slideTo(0,0);
				story_sd.disable();
				document.getElementById('story_vd1').play();
				if(counter == true){
					counter = false;
					$('.story .story_sd .txt .t3 strong').counterUp({
						delay: 2,
						time:1000
					});
				}
			} else if(idx == 1){
				story_sd.enable();
				story_sd.slideTo(1,0);
				story_sd.disable();
			} else if(idx == 2){
				story_sd.enable();
				story_sd.slideTo(2,0);
				story_sd.disable();
			} else if(idx == 3){
				story_sd.enable();
				story_sd.slideTo(3,0);
				story_sd.disable();
			}
			$('.story .txt_page').removeClass('move');
			$('.story').addClass('sd_on');
			$('header').addClass('wh');
			setTimeout(function() {
				story_sd.enable();
				$('.story_sd').addClass('move');
			}, 1500);
		});

		$(document).on('DOMMouseScroll mousewheel wheel', '.story .txt_page.move', function(event,delta){
			var delta = event.originalEvent.deltaY || -event.originalEvent.wheelDelta || event.originalEvent.detail;
			if (delta < 0) {
				$.fn.fullpage.moveTo(2);
			}
			if (delta > 0) {
				$(".story .txt_page ul .p1").trigger("click");
			}
		});

		$(".story .txt_page").swipe( {
			swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
				if (direction == 'down' && $('.story .txt_page').hasClass('move')) {
					$.fn.fullpage.moveTo(2);
				}
				if (direction == 'up' && $('.story .txt_page').hasClass('move')) {
					$(".story .txt_page ul .p1").trigger("click");
				}
			},
			threshold:20
		});



	}

	//nav
	$(document).on('click', '.nav_btn', function(){
		$('.wrap').toggleClass('nav_on');
		$('.nav_btn').addClass('none');
		setTimeout(function() {
			$('.nav_btn').removeClass('none');
		}, 2000);
	});

	//top_btn
	$(document).on('click', '.top_btn', function(){
		if ($('.wrap').hasClass('main')) {
			$.fn.fullpage.moveTo(1);
			story_sd.enable();
			architecture_sd.enable();
			salon.enable();
			vis_sd.slideTo(0,0);
			story_sd.slideTo(0,0);
			architecture_sd.slideTo(0,0);
			salon.slideTo(0,0);
			story_sd.disable();
			architecture_sd.disable();
			salon.disable();
			$('.vis').removeClass('vd_on');
			document.getElementById('vis_vd').pause();
			$('.story').removeClass('sd_on');
			$('.story_sd').removeClass('move');
			$('.txt_page').removeClass('move');
			$('header').removeClass('wh');
			setTimeout(function() {
				$.fn.fullpage.setAllowScrolling(false);
			}, 500);
		} else {
			$('html,body').animate({scrollTop : 0}, 300);
		}
	});

	//zoom
	if ($('.sub_location').length > 0) {
		var target = $('.target');
		var zoom = target.data('zoom');
		$(".zoom_wrap").on('mousemove', magnify).prepend("<div class='magnifier'></div>").children('.magnifier').css({
			"background-size": target.width() * zoom + "px " + target.height() * zoom+ "px"
		});
		var magnifier = $('.magnifier');
		function magnify(e) {
			var mouseX = e.pageX - $(this).offset().left;		// 마우스 위치에서 .magnify의 위치를 차감해 컨테이너에 대한 마우스 좌표를 얻는다.
			var mouseY = e.pageY - $(this).offset().top;
			if (mouseX < $(this).width() && mouseY < $(this).height() && mouseX > 0 && mouseY > 0) {	// 컨테이너 밖으로 마우스가 벗어나면 돋보기를 없앤다.
				magnifier.fadeIn(100);
			} else {
				magnifier.fadeOut(100);
			}
			if (magnifier.is(":visible")) {	//돋보기가 존재할 때
				var rx = -(mouseX * zoom - magnifier.width() /2 );	// 마우스 좌표 확대될 이미지 좌표를 일치시킨다.
				var ry = -(mouseY * zoom - magnifier.height() /2 );
				var px = mouseX - magnifier.width() / 2;	//돋보기의 width, height 절반을 마우스 좌표에서 차감해 마우스와 돋보기 위치를 일치시킨다.
				var py = mouseY - magnifier.height() / 2;
				magnifier.css({
					left: px, top: py, backgroundPosition: rx + "px " + ry + "px"
				});
			}
		}
	}

}


$(document).ready(function(){
                
    function mo_active() {
        $('.mo').each(function(index, item) {
            if ($(window).scrollTop() > $(this).offset().top - $(window).height() * 0.85) {
                $(this).addClass('active');
            }
        });
    }
    $(window).scroll(function(event) {
        if ($('.mo').offset()) {
            mo_active();
        }
    });
    mo_active();
});

$(window).on('scroll', function(){
    if($('.wrap').hasClass('sub')){
        if($(window).scrollTop() > 0){
            $('header').addClass('sub');
        } else {
            $('header').removeClass('sub');
        };
    }
});

// 개인정보 처리방침
function policyPop() {
	$('.policy_wrap').fadeIn(500);
	$('.policy_wrap').css('display', 'flex');
	if ($('.wrap').hasClass('main')) {
		$.fn.fullpage.setAllowScrolling(false);
	}
}