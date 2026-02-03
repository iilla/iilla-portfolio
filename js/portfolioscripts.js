
//$(window).bind('load', function() {
//$(window).ready(function() {
//$( document ).ready(function() {
window.onload = function() {

        $('#container-content').show();
        $('#loadingscr').hide();

        var lang = 'esp';
        var contentCounter = 7;
        var fillingContent = false;
        var fillingCarouFedSel = {
            swipe		 : { onTouch: true, onMouse: true },
            responsive : true,
            //items: { visible: 1, width:500, height: (100) + '%' },
            items: { visible: 1, width:100, height: (100) + '%' },
            scroll: { fx: 'cover', duration: 600 },
            auto: { timeoutDuration: 5000, duration: 2000 },
            pagination: { container: '.slider_pager', duration: 300 }
        };

        for (var i = 1;i<=contentCounter;i++)  $('#slider_0'+i).carouFredSel(fillingCarouFedSel);

        // 7 PERSONALCLOUD; 6 HOBAC; 5 ASAI; 4 RACC; 3 STRADIVARIUS; 2 BSM;  1 SOLVIA
        $("#slider_01 img").on('click touchstart', function () { window.open("./contents/archive/solvia/magazine_5/ES");} );
        $("#slider_02 img").on('click touchstart', function () { window.open("./contents/archive/apps/bsm/web/");} );
        $("#slider_03 img").on('click touchstart', function () { window.open("./contents/archive/stradivarius/magazine_29/");} );
        $("#slider_04 img").on('click touchstart', function () { window.open("./contents/archive/racc/magazine_5/ES/");} );
        $("#slider_05 img").on('click touchstart', function () { window.open("./contents/archive/apps/asai/");} );
        $("#slider_06 img").on('click touchstart', function () { window.open("./contents/archive/hobac/");} );
        $("#slider_07 img").on('click touchstart', function () { window.open("./contents/archive/apps/personal-cloud/");} );

        $("#lang-cat").on('click touchstart', function () { fillContent ("cat") });
        $("#lang-esp").on('click touchstart', function () { fillContent ("esp") });
        $("#lang-eng").on('click touchstart', function () { fillContent ("eng") });

        function fillContent (lang) {
            if (!fillingContent) {
                fillingContent = true;
                $(".content_class").fadeOut(1);
                for (var i = 1;i<=contentCounter;i++) {
                    $("#container_information-"+i).load("./contents/langContents.html #"+i+"_"+lang);
                }
                $("#container_information_about").load("./contents/langContents.html #about_"+lang);
                $("#landscapeBanner").load("./contents/langContents.html #banner_"+lang);
                $(".content_class").fadeIn(1000);
                fillingContent = false;
            } else {
                return;
            }
        }

        fillContent (lang);

        function toogleNavigation (windowWidth, commonSwap) {
            if(disableNavigation !=1) {
                if ( $nextImageBtn.hasClass('nav-active')) $nextImageBtn.fadeIn(1);
                if ( $prevImageBtn.hasClass('nav-active')) $prevImageBtn.fadeIn(1);

                if (windowWidth > 757) {
                    if (!commonSwap) {
                        if ( $prevImageBtn.hasClass('nav-active')) $prevImageBtn.animate({opacity:"0.45"},200);
                        if ( $nextImageBtn.hasClass('nav-active')) $nextImageBtn.animate({opacity:"0.45"},200);
                    }
                    activeNavigation = 1;
                } else {
                    if ( $prevImageBtn.hasClass('nav-active')) $prevImageBtn.animate({opacity:"1"},200);
                    if ( $nextImageBtn.hasClass('nav-active')) $nextImageBtn.animate({opacity:"1"},200);
                    activeNavigation = 0;
                }
            } else {
                $nextImageBtn.fadeOut(1);
                $prevImageBtn.fadeOut(1);
            }
        }

        //Control de navegación
        var $window = $(window);
        var windowWidth = $window.width();
        var activeNavigation;
        var disableNavigation;
        $nextImageBtn = $("#rightside-navigator");
        $prevImageBtn = $("#leftside-navigator");

        toogleNavigation(windowWidth,false);

        $(window).resize(function() {
            windowWidth = $window.width();
            toogleNavigation(windowWidth,false);
        });

        var mX, mY,
            abierto_izq = 0,
            abierto_der = 0,
            open_distance = 100;

        $(document).mousemove(function(e) {
            mX = e.pageX;
            mY = e.pageY;
            if ( activeNavigation == 1 && disableNavigation != 1 ) {
                if ($prevImageBtn.hasClass('nav-active')) {
                    // Si está cerrado el lateral izquierdo y está a menos de open_distance pixeles, lo abrimos
                    if ((abierto_izq == 0) && (Math.floor(mX - open_distance) <= 0)) {
                        abierto_izq = 1;
                        //$prevImageBtn.fadeIn(250);
                        $prevImageBtn.animate({opacity: "1"}, 200);
                    }
                    // Si está abierto el lateral izquierdo y está a mas de open_distance pixeles, lo cerramos
                    if ((abierto_izq == 1) && (Math.floor(mX - open_distance) > 0)) {
                        abierto_izq = 0;
                        $prevImageBtn.animate({opacity: "0.45"}, 200);
                    }
                }
                if ($nextImageBtn.hasClass('nav-active')) {
                    // Si está cerrado el lateral derecho y está a menos de open_distance pixeles, lo abrimos
                    if ((abierto_der == 0) && (Math.floor(windowWidth - mX) <= open_distance)) {
                        abierto_der = 1;
                        $nextImageBtn.animate({opacity: "1"}, 200);
                    }
                    // Si está abierto el lateral derecho y está a mas de open_distance pixeles, lo cerramos
                    if ((abierto_der == 1) && (Math.floor(windowWidth - mX) > open_distance)) {
                        abierto_der = 0;
                        $nextImageBtn.animate({opacity: "0.45"}, 200);
                    }
                }

            }
        });

        /* Slider control */
        var slider = function (sliderElement) {

            //console.log(sliderElement + ' > *');

            var pages = [];
            var currentSlide = 1;
            var currentSide = 2;
            var isChanging = false;
            var keyUp = {38:1, 33:1};
            var keyDown = {40:1, 34:1};
            var keyLeft = {37:1};
            var keyRight = {39:1};
            var opacityRanges = ['','1A','40','66','8C','B3','E6'];

            var init = function () {

                document.body.classList.add('slider__body');
                document.body.style.transitionDuration = "1s";
                //document.querySelector('article#about_info').style.transitionDuration = "1s";
                //document.querySelector('section#main_slider').style.transitionDuration = "1s";
                document.querySelector('section#main_slider').style.opacity = "0";
                changeCss(document.querySelector(sliderElement), {
                    transform: 'translate3d(' + -(currentSide - 1) * 100 + '%, 0, 0)'
                });


                // control scrolling
                whatWheel = 'onwheel' in document.createElement('div') ? 'wheel' : document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';
                window.addEventListener(whatWheel, function (e) {
                    var direction = e.wheelDelta || e.deltaY;
                    if (direction < 0) {
                        changeSlide(-1);
                    } else {
                        changeSlide(1);
                    }
                });

                // allow keyboard input
                window.addEventListener('keydown', function (e) {
                    if (keyUp[e.keyCode]) {
                        changeSlide(-1);
                    } else if (keyDown[e.keyCode]) {
                        changeSlide(1);
                    } else if (keyLeft[e.keyCode]) {
                        changeSlide(-1,1);
                    } else if (keyRight[e.keyCode]) {
                        changeSlide(1,1);
                    }
                });

                document.querySelector('div#rightside-navigator').addEventListener('click', function (e) { changeSlide(1,1); });
                document.querySelector('div#rightside-navigator').addEventListener('touchstart', function (e) { changeSlide(1,1); });
                document.querySelector('div#leftside-navigator').addEventListener('click', function (e) { changeSlide(-1,1); });
                document.querySelector('div#leftside-navigator').addEventListener('touchstart', function (e) { changeSlide(-1,1); });

                // stuff for touch devices
                var touchStartPos = 0;
                var touchStopPos = 0;
                var touchMinLength = 90;
                document.addEventListener('touchstart', function (e) {
                    e.preventDefault();
                    if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
                        var touch = e.touches[0] || e.changedTouches[0];
                        touchStartPos = touch.pageY;
                    }
                });
                document.addEventListener('touchend', function (e) {
                    e.preventDefault();
                    if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
                        var touch = e.touches[0] || e.changedTouches[0];
                        touchStopPos = touch.pageY;
                    }
                    if (touchStartPos + touchMinLength < touchStopPos) {
                        changeSlide(-1);
                    } else if (touchStartPos > touchStopPos + touchMinLength) {
                        changeSlide(1);
                    }
                });

                // page change animation is done
                detectChangeEnd() && document.querySelector(sliderElement).addEventListener(detectChangeEnd(), function () {
                    if (isChanging) {
                        setTimeout(function() {
                            isChanging = false;
                            window.location.hash = document.querySelector('[data-slider-index="' + currentSlide + '"]').id;
                        }, 50);
                    }
                });

                // set up page and build visual indicators
                document.querySelector(sliderElement).classList.add('slider__container');
                var indicatorContainer = document.createElement('div');
                indicatorContainer.classList.add('slider__indicators');

                var index = 1;
                [].forEach.call(document.querySelectorAll(sliderElement + ' > *'), function (section) {

                    //console.log(section);
                    var indicator = document.createElement('a');
                    indicator.classList.add('slider__indicator')
                    indicator.setAttribute('data-slider-target-index', index);
                    indicatorContainer.appendChild(indicator);

                    section.classList.add('slider__page');
                    pages.push(section);
                    section.setAttribute('data-slider-index', index++);

                });

                document.body.appendChild(indicatorContainer);
                document.querySelector('a[data-slider-target-index = "' + currentSlide +'"]').classList.add('slider__indicator--active');
            };


            // prevent double scrolling
            var detectChangeEnd = function () {
                var transition;
                var e = document.createElement('foobar');
                var transitions = {
                    'transition': 'transitionend',
                    'OTransition': 'oTransitionEnd',
                    'MozTransition': 'transitionend',
                    'WebkitTransition': 'webkitTransitionEnd'
                };

                for(transition in transitions) {
                    if (e.style[transition] !== undefined) {
                        return transitions[transition];
                    }
                }
                return true;
            };


            // handle css change
            var changeCss = function (obj, styles) {
                //console.log(styles);
                for (var _style in styles) {
                    if (obj.style[_style] !== undefined) {
                        obj.style[_style] = styles[_style];
                    }
                }
            };

            // handle page/section change / line 1 horizontal, line 0 vertical
            var changeSlide = function (direction,line = 0) {
                if (line == 0) {
                    if (isChanging || ((direction == 1 && currentSlide == pages.length) || (direction == -1 && currentSlide == 1)  || (currentSide == 2))) {
                        return;
                    }
                    isChanging = true;
                    currentSlide += direction;

                    changeCss(document.querySelector(sliderElement), {
                        transform: 'translate3d(0, ' + -(currentSlide - 1) * 100 + '%, 0)'
                    });

                    // change dots
                    document.querySelector('a.slider__indicator--active').classList.remove('slider__indicator--active');
                    document.querySelector('a[data-slider-target-index="' + currentSlide +'"]').classList.add('slider__indicator--active');

                } else {
                    if (isChanging || ((direction == 1 && currentSide == 2) || (direction == -1 && currentSide == 1))) {
                        return;
                    }
                    isChanging = true;
                    currentSide += direction;

                    changeCss(document.querySelector(sliderElement), {
                        transform: 'translate3d(' + -(currentSide - 1) * 100 + '%, 0, 0)'
                    });

                    currentSlide = 1;

                    // hide dots and arrows
                    if (currentSide == 1) {

                        document.querySelector('div.slider__indicators').setAttribute('style','opacity:1');
                        document.querySelector('div#leftside-navigator').setAttribute('style','opacity:0;cursor:default;');
                        document.querySelector('div#rightside-navigator').setAttribute('style','opacity:1');

                        document.querySelector('div#leftside-navigator').classList.remove('nav-active');
                        document.querySelector('div#rightside-navigator').classList.add('nav-active');

                        //document.querySelector('section#main_slider').setAttribute('style','display:block');
                        //document.querySelector('section#main_slider').setAttribute('style','opacity:1;transition-duration: 1s;');
                        //document.querySelector('section#main_slider').style.transitionDuration = "3s";
                        document.querySelector('section#main_slider').style.opacity = "1";

                        document.querySelector('article#about_info').setAttribute('style','opacity:0;transition-duration: 1s;z-index:0;');

                        // change dots
                        document.querySelector('a.slider__indicator--active').classList.remove('slider__indicator--active');
                        document.querySelector('a[data-slider-target-index="' + currentSlide +'"]').classList.add('slider__indicator--active');

                    } else {

                        document.querySelector('div.slider__indicators').setAttribute('style','opacity:0');
                        document.querySelector('div#leftside-navigator').setAttribute('style','opacity:1;cursor:pointer;');
                        document.querySelector('div#rightside-navigator').setAttribute('style','opacity:0');

                        document.querySelector('div#leftside-navigator').classList.add('nav-active');
                        document.querySelector('div#rightside-navigator').classList.remove('nav-active');

                        //document.querySelector('section#main_slider').setAttribute('style','display:none');
                        //document.querySelector('section#main_slider').setAttribute('style','opacity:0;transition-duration: 1s;');
                        document.querySelector('article#about_info').setAttribute('style','opacity:1;transition-duration: 1s;z-index:3;');

                    }
                }

                changeCss(document.body, {
                    background: '#6E6E6E'+opacityRanges[currentSlide]
                });

            };

            // go to spesific slide if it exists
            var gotoSlide = function (where) {
                var target = document.querySelector(where).getAttribute('data-slider-index');
                if (target != currentSlide && document.querySelector(where)) {
                    changeSlide(target - currentSlide);
                }
            };

            // if page is loaded with hash, go to slide
            if (location.hash) {
                setTimeout(function () {
                    window.scrollTo(0, 0);
                    gotoSlide(location.hash);
                }, 1);
            };

            // we have lift off
            if (document.readyState === 'complete') {
                init();
            } else {
                window.addEventListener('onload', init(), false);
            }
            // expose gotoSlide function
            return {
                gotoSlide: gotoSlide
            }
        };

        var mySlider = slider('.slides');

};