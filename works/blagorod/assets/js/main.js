;'use strict';

// APP
// Event DOM Ready
$(document).ready(function() {

  window.sr = ScrollReveal();

  // Fullpage
  $('#fullpage').fullpage({
    responsiveWidth: 1100,
    responsiveHeight: 700,
    navigation: true,
    verticalCentered: false,
    lazyLoading: false,
    afterLoad: function (anchorLink, index) {
      var elems = $('header.header-page, footer.footer-page, #fp-nav'),
          $sidebar = $('aside.sidebar-menu'),
          $header = $('header.header-page'),
          $footer = $('footer.footer-page'),
          $navSlide = $('#fp-nav');

      $('section[data-color]').each(function(index, el) {
        var colors = $(this).attr('data-color');
        elems.removeClass(colors);
      });
      // Add
      var color = $(this).find('section').attr('data-color');
      elems.addClass(color);

      var loadedSection = $(this);
      var nextSection = loadedSection.next();

      // loadedSection lazy load
      if(loadedSection.length > 0){
        var loadedSectionImage = loadedSection.find('img[data-src]');
        var loadedSectionVideo = loadedSection.find('video source[data-src]');

        loadedSectionImage.each(function(index, val) {
          $(this).attr('src', $(this).attr('data-src'));
          $(this).removeAttr('data-src');
        });
        loadedSectionVideo.each(function(index, val) {
          $(this).attr('src', $(this).attr('data-src'));
          $(this).parent('video').get(0).load();
          $(this).removeAttr('data-src');
        });
      }
      // nextSection lazy load
      if(nextSection.length > 0){
        var nextSectionImage = nextSection.find('img[data-src]');
        var nextSectionVideo = nextSection.find('video source[data-src]');

        nextSectionImage.each(function(index, val) {
          $(this).attr('src', $(this).attr('data-src'));
          $(this).removeAttr('data-src');
        });
        nextSectionVideo.each(function(index, val) {
          $(this).attr('src', $(this).attr('data-src'));
          $(this).parent('video').get(0).load();
          $(this).removeAttr('data-src');
        });
      }
    } // end
  });
  // Если есть fullpage
  if ( $('#fullpage').length ) {
    $.fn.fullpage.setMouseWheelScrolling(false);
    $.fn.fullpage.setAllowScrolling(false);
  }


  // show Interface
  (function() {
    var tl = new TimelineLite();
    var $sidebar = $('aside.sidebar-menu');
    var $header = $('header.header-page');
    var $footer = $('footer.footer-page');
    var $navPage = $('nav.navigation-page');

    // Если на странице .page-home
    if ( $('body').hasClass('page-home') ) {
      var $svgCorpus = $('section.section-plan-turn .svg-plan .turn');

      // On ready
      $('.preview-home .btn-ready').on('tap', function(event) {
        event.preventDefault();

        // Help swipe load
        $("body.page-home .help-swipe").addClass('load');

        // on page home hidde scroll
        if (window.matchMedia("(max-width: 1100px)").matches) {
          $('html').removeClass('hide-scroll');
        } else if (window.matchMedia("(max-height: 700px)").matches) {
          $('html').removeClass('hide-scroll');
        }

        // Если есть fullpage
        if ( $('#fullpage').length ) {
          $.fn.fullpage.setMouseWheelScrolling(true);
          $.fn.fullpage.setAllowScrolling(true);
        }

        tl.to( $('.preview-home'), 0.4, {
          autoAlpha: 0,
        }).call( removeBlock );

        function removeBlock() {
          tl.from($sidebar, 0.7, {autoAlpha: 0, x: '-100%', ease: Sine.easeIn}, 0.4)
            .from($header, 0.7, {autoAlpha: 0, y: '-100%', ease: Sine.easeIn}, 0.4)
            .from($footer, 0.7, {autoAlpha: 0, y: '100%', ease: Sine.easeIn}, 0.4);

          $('.preview-home').remove();

          tl.staggerFrom( $svgCorpus, 0.4, {
            autoAlpha: 0,
            scale: 0,
            cycle: {
              y: [30,-30],
              x: [40,-30],
              transformOrigin: ['50% top -100', 'left bottom 100'],
            }
          }, 0.2);
        }
      });
    } else { // на других страницах
      tl.from($sidebar, 0.7, {autoAlpha: 0, x: '-100%', ease: Sine.easeIn}, 1)
        .from($header, 0.7, {autoAlpha: 0, y: '-100%', ease: Sine.easeIn}, 1)
        .from($footer, 0.7, {autoAlpha: 0, y: '100%', ease: Sine.easeIn}, 1)
        .from($navPage, 0.7, {autoAlpha: 0, ease: Sine.easeIn}, 1);
    }
  })();

  // Preview home
  (function() {
    // toggle sound
    $('.btn-sound').on('tap', function(event) {
      event.preventDefault();
      $(this).toggleClass('muted');
      if ( $(this).hasClass('muted') ) {
        $(this).find('span').text('выкл');
      } else {
        $(this).find('span').text('вкл');
      }
    });
    if ( $(".preview-home").length ) {
      var sourceVideo = $(".preview-home video source");
      var sourceData = sourceVideo.attr("data-src");
      var videoPreview = $(".preview-home video").get(0);

      // video init
      sourceVideo.attr("src", sourceData);
      videoPreview.load();
      videoPreview.play();

      $('.preview-home .btn-sound').on('tap', function(event) {
        event.preventDefault();
        if ( $(this).hasClass('muted') ) {
          videoPreview.prop('muted', false); //unmute
        } else {
          videoPreview.prop('muted', true); //muted
        }
      });
    }
  })();

  // Menu
  (function() {
    var tl = new TimelineLite();

    $('body').on('tap', 'aside.sidebar-menu .btn-menu', function(event) {
      event.preventDefault();
      tl.fromTo( $('nav.nav-menu'), 1, {
        autoAlpha: 0, 
        x: -50
      }, {
        autoAlpha: 1, 
        x: 0,
        ease: Power3.easeOut,
      });
      hideScroll();
    });
    $('body').on('tap', 'nav.nav-menu .close', function(event) {
      event.preventDefault();
      tl.to( $('nav.nav-menu'), 0.4, {
        autoAlpha: 0,
        x: -50,
        ease: Sine.easeOut,
      });
      showScroll();
    });
    $(document).on('keydown', function(event) {
      if (event.keyCode == 27) {
        event.preventDefault();
        tl.to( $('nav.nav-menu'), 0.4, {
          autoAlpha: 0,
          x: -50,
          ease: Sine.easeIn,
        });
      }
      showScroll();
    });
  })();

  // Popups
  (function() {
    $('select').select2({
      width: '100%',
      minimumResultsForSearch: -1
    });
    // order-call
    $('body').on('tap', '.btn-order-call', function(event) {
      event.preventDefault();
      $('.order-call-popup').toggleClass('active');
      hideScroll();
    });
    // feedback
    $('body').on('tap', '.subscribe', function(event) {
      event.preventDefault();
      $('.feedback-popup').toggleClass('active');
      hideScroll();
    });
    // more
    $('body').on('tap', '.popup-shares .btn.more', function(event) {
      event.preventDefault();
      $('.more-popup').toggleClass('active');
      hideScroll();
    });
    // time-work
    $('body').on('tap', '.time-work', function(event) {
      event.preventDefault();
      $('.time-work-popup').toggleClass('active');
      hideScroll();
    });
    // cameras
    $('body').on('tap', '.btn-camera', function(event) {
      event.preventDefault();
      $('.cameras-popup').toggleClass('active');
      hideScroll();
      // load videos
      $('.video-camera').each(function(index, val) {
        if ( !$(this).hasClass('load') ) {
          var url = $(this).attr('data-src');
          $(this).attr('src', url);
          $(this).addClass('load');
        }
      });
      $('.container-player').fitVids();
    });
    // shares
    $('body').on('tap', 'nav.nav-menu .shares, aside.sidebar-menu .shares', function(event) {
      event.preventDefault();
      $('.popup-shares').toggleClass('active');
      hideScroll();
    });
    // Close popup
    $('body').on('tap', '.popup .close', function(event) {
      event.preventDefault();
      $('.popup').removeClass('active');
      showScroll();
    });
    // Close when click out block
    $(document).on('tap', function(event) {
      if( $(event.target).hasClass('popup') ) {
        $('.popup').removeClass('active');
        showScroll();
      }        
    })
    // keydown ESC
    $(document).on('keydown', function(event) {
      if (event.keyCode == 27) {
        $('.popup').removeClass('active');
        showScroll();
      }
    });
  })();

  // Section pages
  (function () {
    var linkDataNav = $('a[data-nav-page]'),
        sectionPages = $('.container-section-page .section-page'),
        sectionPagesActive = $('.container-section-page .section-page.active');

    // If section solo
    if ( $('body[data-color]').length ) {
      var elems = $('header.header-page, footer.footer-page, #fp-nav');
      var color = $('body').attr('data-color');
      elems.addClass(color);
    }

    // on init
    changeColor();
    $(window).resize();

    function changeColor() {
      var elems = $('header.header-page, footer.footer-page, #fp-nav');
      var color = $('.section-page.active[data-color]').attr('data-color');

      $('.section-page[data-color]').each(function(index, el) {
        var colors = $(this).attr('data-color');
        elems.removeClass(colors);
      });
      elems.addClass(color);
    }

    // on click
    linkDataNav.on('tap', function(event) {
      event.preventDefault();
      var dataNav = $(this).attr('data-nav-page');
      var tl = new TimelineLite();

      // Navigation page
      $('nav.navigation-page a').removeClass('active');
      $('nav.navigation-page a[data-nav-page="' + dataNav + '"]').addClass('active');
      linkDataNav.each(function(index, el) {
        var elem = $(this).attr('data-nav-page');
        $(elem).removeClass('active');
      });

      // add/remove class
      sectionPages.removeClass('active');
      $(dataNav).addClass('active');
      changeColor();
      $(window).resize();
      $grid.masonry();
      scrollOnLoad( dataNav + ' .wrapper-frame');

      // Animation on click
      if ( $(dataNav).find('.section-about-descr').length ) {
        // Animate on scroll
        // Меняем контейнер скролла
        if (window.matchMedia("(max-width: 1100px)").matches) {
          sr.reveal('.section-about-descr .anim', {
            viewFactor: 0.15,
            duration: 1000,
            distance: "20px",
            scale: 1,
            reset: true,
            easing: 'ease',
            container: window.document.documentElement,
          });
        } else {
          sr.reveal('.section-about-descr .anim', {
            viewFactor: 0.15,
            duration: 1000,
            distance: "20px",
            scale: 1,
            reset: true,
            easing: 'ease',
            container: '.section-about-descr .container-scroll',
          });
        }

        if (window.matchMedia("(max-width: 1100px)").matches) {
          sr.reveal('.section-about-descr .anim-rect', {
            viewFactor: 0.15,
            duration: 1800,
            distance: "20px",
            scale: 1.2,
            reset: true,
            easing: 'ease',
            container: window.document.documentElement,
          });
        } else {
          sr.reveal('.section-about-descr .anim-rect', {
            viewFactor: 0.15,
            duration: 1800,
            distance: "20px",
            scale: 1.2,
            reset: true,
            easing: 'ease',
            container: '.section-about-descr .container-scroll',
          });
        }

      }
      if ( $(dataNav).find('.section-about-genplan').length ) {
        tl.staggerFromTo( $('.section-about-genplan .anim'), 0.7, {
          autoAlpha: 0,
          scale: 0.8,
          y: 20,
          transformOrigin: 'bottom 50%'
        }, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          ease: Sine.easeOut,
        }, 0.15, 0.7);
      }
      if ( $(dataNav).find('.section-about-partners').length ) {
        tl.staggerFrom( $('.section-about-partners .anim'), 0.8, {
          autoAlpha: 0,
          cycle: {
            y: [15,30],
            transformOrigin: ['bottom 50%']
          },
          ease: Sine.easeOut,
        }, 0.3, 0.7);
      }
      if ( $(dataNav).find('.section-about-docs').length ) {
        tl.staggerFrom( $('.section-about-docs .anim'), 0.7, {
          autoAlpha: 0,
          y: 30,
          ease: Sine.easeOut,
        }, 0.3, 0.7);
      }
      if ( $(dataNav).find('.section-location-infrastructure').length ) {
        tl.staggerFrom( $('.section-location-infrastructure .anim'), 0.7, {
          autoAlpha: 0,
          y: 20,
          ease: Sine.easeOut,
        }, 0.3, 0.7);
      }
      if ( $(dataNav).find('.section-location-road').length ) {
        tl.staggerFrom( $('.section-location-road .anim'), 0.7, {
          autoAlpha: 0,
          y: 20,
          ease: Sine.easeOut,
        }, 0.2, 0.7);
      }
      // btn back
      if ( $(dataNav).find('.back-page').length && $(dataNav).find('.back-page').is(":visible") ) {
        $(dataNav).find('.back-page').addClass('active');
        $('.header-page, .footer-page').addClass('active-back');
      } else {
        $(dataNav).find('.back-page').removeClass('active');
        $('.header-page, .footer-page').removeClass('active-back');
      }
    });
  })();

  // Sliders
  (function() {
    $('section.slider-features .slider').slick({
      dots: false,
      arrows: true,
      speed: 700,
      fade: true,
      prevArrow: $('section.slider-features .prev'),
      nextArrow: $('section.slider-features .next'),
      slidesToShow: 1,
      slidesToScroll: 1,
    });

    $('.popup-shares .slider-shares').slick({
      dots: false,
      arrows: true,
      speed: 700,
      fade: true,
      prevArrow: $('.popup-shares .prev'),
      nextArrow: $('.popup-shares .next'),
      slidesToShow: 1,
      slidesToScroll: 1,
    });

    $('section.section-gallery-main .slider-gallery').slick({
      dots: false,
      arrows: true,
      speed: 700,
      prevArrow: $('section.section-gallery-main .prev'),
      nextArrow: $('section.section-gallery-main .next'),
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    });
  })();

  // Validation
  (function() {
    $('#form-order-call').validate({
      rules: {
        clientName: {
          required: true,
          minlength: 3,
        },
        clientPhone: {
          required: true,
        },
        clientEmail: {
          email: true,
          required: true,
        }
      },
      errorPlacement: function(error, element) {},
    });
    $('#form-contact').validate({
      rules: {
        clientName: {
          required: true,
          minlength: 3,
        },
        clientPhone: {
          required: true,
        },
        clientEmail: {
          email: true,
          required: true,
        },
        clientMessage: {
          required: true,
        }
      },
      errorPlacement: function(error, element) {},
    });
    $('#form-feedback').validate({
      rules: {
        feedbackEmail: {
          required: true,
          email: true
        }
      },
      errorPlacement: function(error, element) {},
    });
    $('#form-more').validate({
      rules: {
        morePhone: {
          required: true
        }
      },
      errorPlacement: function(error, element) {},
    });
  })();

  // Ranges
  (function() {
    $("#range-floor").ionRangeSlider({
      type: "double",
      min: 1,
      max: 12,
      from: 1,
      to: 12,
      hide_min_max: true,
      grid: false
    });
    $("#range-meters").ionRangeSlider({
      type: "double",
      min: 25,
      max: 120,
      from: 25,
      to: 80,
      hide_min_max: true,
      grid: false
    });
  })();

  // Tab on apartment
  (function () {
    // on init
    var filterValue = $('section.apartments .tab .tab-nav a.active').attr('data-tab');
    $('section.apartments .tab .tab-item').hide();
    $(filterValue).show();

    // on click
    $('section.apartments .tab .tab-nav a').on('tap', function(e) {
      e.preventDefault();
      // Active class
      $('section.apartments .tab .tab-nav a').removeClass('active')
      var indexElem = $(e.target).closest('li').index();
      $('section.apartments .tab .tab-nav').each(function(index, el) {
        $(this).find('li').eq(indexElem).find('a').addClass('active');
      });

      var filterValue = $(this).attr('data-tab');
      $('section.apartments .tab .tab-item').hide();
      $(filterValue).show();
      $('.container-scroll').perfectScrollbar('update');
    });

    // on click select
    $('section.apartments .tab select.btn-opts').on('change', function(e) {
      e.preventDefault();
      var filterTab = $(this).find("option:selected").attr('data-tab');
      
      $('section.apartments .tab .tab-item').hide();
      $(filterTab).show();
      $('.container-scroll').perfectScrollbar('update');
    });
  })();

  // Play video
  (function () {
    var btn = $('section.video-player .play'),
        overlay = $('section.video-player .overlay'),
        video = $('section.video-player video').get(0),
        $sidebar = $('aside.sidebar-menu'),
        $header = $('header.header-page'),
        $footer = $('footer.footer-page'),
        $navSlide = $('#fp-nav');

    $('section.video-player .container-video').on('tap', function(event) {
      event.preventDefault();
      if (video.paused) {
        btn.addClass('hide');
        overlay.addClass('hide');
        video.play();
        
        // Hide interface
        var tl = new TimelineLite();
        tl.to($sidebar, 0.7, {autoAlpha: 0, x: '-100%', ease: Sine.easeIn}, 0)
          .to($header, 0.7, {autoAlpha: 0, y: '-100%', ease: Sine.easeIn}, 0)
          .to($footer, 0.7, {autoAlpha: 0, y: '100%', ease: Sine.easeIn}, 0)
          .to($navSlide, 0.7, {autoAlpha: 0, ease: Sine.easeIn}, 0);

        // Scroll false
        $.fn.fullpage.setMouseWheelScrolling(false);
        $.fn.fullpage.setAllowScrolling(false);
      } else {
        btn.removeClass('hide');
        overlay.removeClass('hide');
        video.pause();

        // Show interface
        var tl = new TimelineLite();
        tl.to($sidebar, 0.7, {autoAlpha: 1, x: '0%', ease: Sine.easeIn}, 0)
          .to($header, 0.7, {autoAlpha: 1, y: '0%', ease: Sine.easeIn}, 0)
          .to($footer, 0.7, {autoAlpha: 1, y: '0%', ease: Sine.easeIn}, 0)
          .to($navSlide, 0.7, {autoAlpha: 1, ease: Sine.easeIn}, 0);

        // Scroll true
        $.fn.fullpage.setMouseWheelScrolling(true);
        $.fn.fullpage.setAllowScrolling(true);
      }
    });
  })();
  
  // Gallery
  $('.fancybox').fancybox({
    animationEffect: false,
    speed: 600,
    fullScreen: false,
    thumbs: false,
    slideShow: false,
  });

  // BeforeAfter
  $('.before-after').beforeAfter();

  // filter room
  $('.table-title .sort').on('tap', function(event) {
    event.preventDefault();
    $(this).toggleClass('active');
  });

  // Tooltip
  tooltipOnHover('section.section-apartment-home .wrapper-section');
  tooltipOnHover('section.section-apartment-pick-floor .wrapper-section');
  tooltipOnHover('section.section-apartment-floor');

  // close notification
  $('body').on('tap', '.notification svg', function(event) {
    event.preventDefault();
    $(this).closest('.notification').slideUp(300);
  });

  // Gallery
  var $grid = $('.grid').masonry({
    initLayout: false,
    itemSelector: '.grid-item',
    transitionDuration: '0.7s'
  });
  $grid.masonry();

  // Tab in contacts
  $('section.contacts .content-tabs .tab-item').hide();
  $('section.contacts .content-tabs .tab-item.active').show();

  // Tab cameras
  (function () {
    // on init
    var filterValue = $('.cameras-popup .tab .tab-nav a.active').attr('data-tab');
    $('.cameras-popup .tab .tab-item').hide();
    $(filterValue).show();

    // on click
    $('.cameras-popup .tab .tab-nav a').on('tap', function(e) {
      e.preventDefault();
      $('.cameras-popup .tab .tab-nav a').removeClass('active')
      var indexElem = $(e.target).closest('li').index();
      $('.cameras-popup .tab .tab-nav').each(function(index, el) {
        $(this).find('li').eq(indexElem).find('a').addClass('active');
      });

      var filterValue = $(this).attr('data-tab');
      $('.cameras-popup .tab .tab-item').hide();
      $(filterValue).show();
    });

    // on click select
    $('.cameras-popup .tab select.btn-opts').on('change', function(e) {
      e.preventDefault();
      var filterTab = $(this).find("option:selected").attr('data-tab');
      
      $('.cameras-popup .tab .tab-item').hide();
      $(filterTab).show();
    });
  })();

  // FitVids
  $('.container-player').fitVids();

  // Favorite star
  $('.cell-star, .in-favorite').on('click', function(e) {
    event.preventDefault();
    var $star = $('.star-favorite');
    var $btnFavorite = $('aside.sidebar-menu .btn-favorite');
    var $btnCount = $('aside.sidebar-menu .btn-favorite .count');
    var textCount = +$btnCount.text();
    var tl = new TimelineLite();

    if ( !$(this).hasClass('active') ) {

      if ( $(this).hasClass('in-favorite') ) {
        $(this).find('span').text('Убрать из избранного');
      }

      $(this).addClass('active');

      // количество понравившихся +1
      $btnCount.text( textCount + 1 );

      // вычисляем координаты
      var coordClickY = $(this).find('svg').offset().top;
      var coordClickX = $(this).find('svg').offset().left;
      var coordBtnY = $btnFavorite.offset().top + ($btnFavorite.outerHeight() / 2) - ($star.outerHeight() / 2);
      var coordBtnX = $btnFavorite.offset().left + ($btnFavorite.outerWidth() / 2) - ($star.outerWidth() / 2);

      tl.to( $star, 0.3, {
        autoAlpha: 1,
        scale: 1,
        ease: Sine.easeOut,
      });
      tl.fromTo( $star, 1, {
        scale: 1,
        y: coordClickY,
        x: coordClickX
      },{
        scale: 1.6,
        y: coordBtnY,
        x: coordBtnX,
        ease: Sine.easeOut,
      });
      tl.to( $star, 0.3, {
        autoAlpha: 0,
        scale: 3.2,
        ease: Sine.easeOut,
      });
    } else {

      if ( $(this).hasClass('in-favorite') ) {
        $(this).find('span').text('В избранное');
      }

      $(this).removeClass('active');

      // количество понравившихся -1
      $btnCount.text( textCount - 1 );
    }
  });

  // Btn ripple
  $(".btn").click(function (e) {
    // Remove any old one
    $(".ripple").remove();

    // Setup
    var posX = $(this).offset().left,
        posY = $(this).offset().top,
        buttonWidth = $(this).width(),
        buttonHeight =  $(this).height();
    
    // Add the element
    $(this).prepend("<span class='ripple'></span>");
    
   // Make it round!
    if(buttonWidth >= buttonHeight) {
      buttonHeight = buttonWidth;
    } else {
      buttonWidth = buttonHeight; 
    }
    
    // Get the center of the element
    var x = e.pageX - posX - buttonWidth / 2;
    var y = e.pageY - posY - buttonHeight / 2;
   
    // Add the ripples CSS and start the animation
    $(".ripple").css({
      width: buttonWidth,
      height: buttonHeight,
      top: y + 'px',
      left: x + 'px'
    }).addClass("rippleEffect");
  });

  // Event scroll
  // $('.container-scroll').scroll(function(event) {
  //   // Аnimation on scroll
  //   var wScroll = $(this).scrollTop();
  //   var tl = new TimelineLite();
  //   tl.set($('.section-about-descr .anim'), {autoAlpha: 0});

  //   $('.section-about-descr .anim').each(function() {
  //     var once = true;
  //     if ( wScroll > $(this).offset().top - ( $(window).height() - 200) ) {

  //       if (once) {
  //         tl.staggerFromTo( $(this), 1, {
  //           autoAlpha: 0,
  //         }, {
  //           autoAlpha: 1,
  //           immediateRender: false
  //         },0);
  //         console.log('test');
  //         once = false;
  //       }
  //     }
  //   });
  // });

  // Event resize
  $(window).resize(function(event) {
    waitForFinalEvent(function(){
      // Height
      viewportHeight('main');
      viewportHeight('section.section-plan-corpus');
      viewportHeight('section.video-player .wrapper-video');
      viewportHeight('section.our-projects .left-col, section.our-projects .right-col');
      viewportHeight('section.section-favorite');
      viewportHeight('section.section-filter');
      viewportHeight('.container-section-page');
      viewportHeight('section.section-gallery-main .wrapper-slide');
      viewportHeight('section.section-progress .wrapper-bg');
      viewportHeight('section.section-progress .wrapper-container');
      viewportHeight('#map-infrastructure');
      viewportHeight('#map-road');
      $('.container-aline').css({
        'height': $(window).height()
      });

      // Contents scroll
      contentScrollHeight();
      sectionPageHeight('.container-section-page .section-page section');
      sectionPageHeight('section.section-gallery-main .wrapper-slide');

      squeezeInWindow(1840,1080,'section.section-plan-turn .wrapper-plan');
      squeezeInWindow(1780,1080,'section.section-about-genplan .wrapper-plan');
      squeezeInWindow(1840,1080,'section.section-apartment-home .wrapper-plan');
      squeezeInWindow(1840,1080,'section.section-apartment-pick-floor .wrapper-plan');


    }, 300, "ex032x");
  });

});

// Event load
$(window).on('load', function() {
  loadPage();
});

var loadPage = (function () {
  // Display loading...
  $(".page-loading").addClass('load').delay(1000).queue(function() { 
    $(this).addClass('anim-stop');
  });
  $(".help-swipe").addClass('load');
  $("body.page-home .help-swipe").removeClass('load');

  // Height
  viewportHeight('main');
  viewportHeight('section.section-plan-corpus');
  viewportHeight('section.video-player .wrapper-video');
  viewportHeight('section.our-projects .left-col, section.our-projects .right-col');
  viewportHeight('section.section-favorite');
  viewportHeight('section.section-filter');
  viewportHeight('.container-section-page');
  viewportHeight('section.section-gallery-main .wrapper-slide');
  viewportHeight('section.section-progress .wrapper-bg');
  viewportHeight('section.section-progress .wrapper-container');
  viewportHeight('#map-infrastructure');
  viewportHeight('#map-road');
  $('.container-aline').css({
    'height': $(window).height()
  });

  // Contents scroll
  contentScrollHeight();
  sectionPageHeight('.container-section-page .section-page section');
  sectionPageHeight('section.section-gallery-main .wrapper-slide');

  squeezeInWindow(1840,1080,'section.section-plan-turn .wrapper-plan');
  squeezeInWindow(1780,1080,'section.section-about-genplan .wrapper-plan');
  squeezeInWindow(1840,1080,'section.section-apartment-home .wrapper-plan');
  squeezeInWindow(1840,1080,'section.section-apartment-pick-floor .wrapper-plan');

  scrollOnLoad('.wrapper-frame');

  // CirclePercent
  circlePercent();

  // Animation
  (function() {
    var tl = new TimelineLite();

    // Preview home
    tl.from( $('.preview-home .logo'), 0.7, {
      autoAlpha: 0,
      y: -30,
    },1.6);
    tl.staggerFrom( $('.preview-home .wrap-descr .line-top, .preview-home .wrap-descr .line-bottom'), 0.4, {
      autoAlpha: 0,
      height: 0,
      scaleX: 15,
      cycle: {
        transformOrigin: ['50% top -30', '50% bottom 30'],
      }
    },0.2);
    tl.staggerFrom( $('.preview-home .anm'), 0.7, {
      autoAlpha: 0,
      y: -20,
    }, 0.4);
    tl.from( $('.preview-home .btn-ready'), 0.3, {
      autoAlpha: 0,
      y: -20,
    });

    tl.staggerFromTo( $('.section-howtobuy .anim'), 0.7, {
      autoAlpha: 0,
      cycle: {
        y: [30,-30],
        transformOrigin: ['bottom 50%', '50% 50%']
      }
    },{
      autoAlpha: 1,
      y: 0,
      ease: Sine.easeOut,
    },0.3, 1.4);


    tl.staggerFromTo( $('section.section-progress .anim'), 0.7, {
      autoAlpha: 0,
      cycle: {
        y: [30,-30],
        transformOrigin: ['bottom 50%', '50% 50%']
      }
    },{
      autoAlpha: 1,
      y: 0,
      ease: Sine.easeOut,
    },0.3, 1.4);

    tl.staggerFromTo( $('section.section-favorite .anim'), 1.2, {
      autoAlpha: 0,
      cycle: {
        y: [30,-30],
        transformOrigin: ['bottom 50%', '50% 50%']
      }
    },{
      autoAlpha: 1,
      y: 0,
      ease: Back.easeOut,
    },0.6, 1.4);

    tl.staggerFromTo( $('section.section-filter .anim'), 1.2, {
      autoAlpha: 0,
      cycle: {
        y: [30,-30],
        transformOrigin: ['bottom 50%', '50% 50%']
      }
    },{
      autoAlpha: 1,
      y: 0,
      ease: Back.easeOut,
    },0.4, 1.4);

    tl.staggerFromTo( $('section.section-news .anim'), 1, {
      autoAlpha: 0,
      cycle: {
        y: [30,-30],
        transformOrigin: ['bottom 50%', '50% 50%']
      }
    },{
      autoAlpha: 1,
      y: 0,
      ease: Sine.easeOut,
    },0.3, 1.4);
  })();

});

// Functions
var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

var viewportHeight = (function(elem) {
  $(elem).css({
    'min-height': $(window).height() - ( $('body').innerHeight() - $('body').height() )
  });
});

var contentScrollHeight = (function() {
  // Init scroll
  $('.container-scroll').perfectScrollbar();
  
  if ( $('.content-scroll .container-scroll').length ) {
    if (window.matchMedia("(max-width: 1100px)").matches) {
      $('.content-scroll .container-scroll').perfectScrollbar('destroy');
    } else {
      // Calc height scroll
      var paddingMainContent = ( $('.content-scroll').innerHeight() - $('.content-scroll').height() ) / 2;
      var calcHeight = $('body').height() - $('.content-scroll .container-scroll').position().top - paddingMainContent;
      $('.content-scroll .container-scroll').css({
        height: calcHeight
      });
      // Update scroll
      $('.content-scroll .container-scroll').perfectScrollbar('update');
    }
  }
});


var sectionPageHeight = (function(elem) {
  var $elem = $(elem);
  if (window.matchMedia("(max-width: 1100px)").matches) {
    var calcHeight = $('aside.sidebar-menu').outerHeight() + $('footer.footer-page').outerHeight();
    $elem.css({
      'min-height': $(window).height() - calcHeight
    });
  } else {
    $elem.css({
      'min-height': $(window).height()
    });
  }
});

var squeezeInWindow = (function(widthImg,heightImg,squeezeElement){
  $(document).ready(function() {
    var mainBox       = $(squeezeElement),
        mainBoxWidth  = $("body").width(),
        mainBoxHeight = (heightImg*mainBoxWidth)/widthImg,
        windowWidth   = $(window).width(),
        windowHeight  = $(window).height();

    function funcResize(){
      mainBoxWidth    = $('body').width();
      mainBoxHeight   = (heightImg*mainBoxWidth)/widthImg;
      windowWidth     = $(window).width();
      windowHeight    = $(window).height();

      mainBox.css({
        "height": (heightImg*mainBoxWidth)/widthImg,
        "width": mainBoxWidth 
      });

      if(mainBoxHeight<windowHeight){
        mainBox.css({
          "height": windowHeight,
          "width": (windowHeight*widthImg)/heightImg
        });
      }
    }
    funcResize();
  });
});

// section.section-apartment-home .wrapper-section
var tooltipOnHover = (function(containerTooltip){
  var tooltip = $(containerTooltip).find(".tooltip"),
      linkHover = $(containerTooltip).find('a[data-tooltip]');

  // Position tooltip
  $(containerTooltip).mousemove(function(e) {
    var y = e.pageY - $(containerTooltip).offset().top - ( tooltip.outerHeight() / 2 );
    var x = e.pageX - $(containerTooltip).offset().left - tooltip.outerWidth() - 40;

    tooltip.css({
      "top": y,
      "left": x
    });
  });

  // On hover
  linkHover.hover(function() {
    var dataTooltip = $(this).attr('data-tooltip');

    // очистить
    tooltip.empty();
    // добавим контент
    $(containerTooltip).find(dataTooltip).clone().appendTo(containerTooltip + ' .tooltip');

    tooltip.addClass('active');
  }, function() {
    tooltip.removeClass('active');
  });
});

var scrollOnLoad = (function(elem) {
  var $elem = $(elem),
      scrollBlock = $elem.prop('scrollWidth'),
      blockWidth = $elem.width();

  $elem.scrollLeft( (scrollBlock / 2) - (blockWidth / 2) );
});

var circlePercent = (function() {
  // Paботает за счет strokeDasharray
  var $percentElem = $('.dev-object .cont .percent');
  var val = $percentElem.parent('.cont').attr('data-percent');
  var $bar = $('#svg-dev-percent .bar');
  
  if (isNaN(val)) {
   val = 100; 
  }
  else{
    var r = $bar.attr('r');
    var c = Math.PI*(r*2);
   
    if (val < 0) { val = 0; }
    if (val > 100) { val = 100; }
    
    var pct = ((100-val)/100)*c;
    
    $bar.css({ 
      strokeDashoffset: pct,
      strokeDasharray: c
    });
    $percentElem.text(val).append("<sup>%</sup>");
  }
});

function hideScroll() {
  $('html').addClass('hide-scroll');
  if ( $('#fullpage').length ) {
    $.fn.fullpage.setMouseWheelScrolling(false);
    $.fn.fullpage.setAllowScrolling(false);
  }
}
function showScroll() {
  $('html').removeClass('hide-scroll');
  if ( $('#fullpage').length ) {
    $.fn.fullpage.setMouseWheelScrolling(true);
    $.fn.fullpage.setAllowScrolling(true);
  }
}



/////// GOOGLE MAP
function initialize() {
  // Map props
  var mapProp = {
    center: {
      lat: 50.3777,
      lng: 30.4224
    },
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,

    // Controls
    panControl: false,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    overviewMapControl: false,
    rotateControl: false,
    fullscreenControl: false,
    // Style map
    styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]

  };

  // Call Maps
  var callMaps = (function(){

    if ( $('#map-contacts').length ) {

      // Map-contacts
      mapProp.center = {
        lat: 50.3703,
        lng: 30.3895
      };
      var map = new google.maps.Map(document.getElementById('map-contacts'), mapProp);

      (function setMarkers(argument) {
        var dataMarkers = [
          [50.4025,30.4137],
          [50.3703,30.3895]
        ];
        var imageLocataion = {
          url: 'assets/img/markers/mark-location.png'
        };
        var imageLocataionActive = {
          url: 'assets/img/markers/mark-location-active.png',
          size: new google.maps.Size(60, 85),
          anchor: new google.maps.Point(30, 58)
        };

        var marker;
        var markers = [];

        for (var i = 0; i < dataMarkers.length; i++) {  
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(dataMarkers[i][0], dataMarkers[i][1]),
            map: map,
            icon: {
              url: 'assets/img/markers/mark-location.png'
            }
          });

          markers.push(marker);

          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              markersSetIconDefault();
              marker.setIcon(imageLocataionActive);
            }
          })(marker, i));

          function markersSetIconDefault() {
            for (var j = 0; j < markers.length; j++) {
              markers[j].setIcon(imageLocataion);
            }
          }
        } // end for

      })();
    } // end if

    if ( $('#map-road').length ) {

      // Map-road
      mapProp.zoom = 14;
      mapProp.center = {
        lat: 50.3743,
        lng: 30.3924
      };
      var map2 = new google.maps.Map(document.getElementById('map-road'), mapProp);

      // Mark logo
      var markLogo = new google.maps.Marker({
        position: {
          lat: 50.3743,
          lng: 30.3924
        },
        map: map2,
        icon: {
          url: 'assets/img/markers/mark-logo.png'
        }
      });

      $('a[data-nav-page]').on('tap', function(event) {
        event.preventDefault();
        setTimeout(function() {
          google.maps.event.trigger(map2, 'resize');
          map2.setCenter(mapProp.center);
        },100);
      });

    } // end if

    if ( $('#map-infrastructure').length ) {

      // Map infrastructure
      mapProp.zoom = 14;
      mapProp.center = {
        lat: 50.3743,
        lng: 30.3924
      };
      var map3 = new google.maps.Map(document.getElementById('map-infrastructure'), mapProp);

      (function addMarkerInfrastructure() {

        var dataMarkers = [
          [
            '<div class="infobox-wrapper"><p class="title">Ресторан</p></div>',
            'assets/img/markers/mark-food.png',
            50.3743,
            30.4024
          ],
          [
            '<div class="infobox-wrapper"><p class="title">Футбольное поле</p></div>',
            'assets/img/markers/mark-footbol.png',
            50.3723,
            30.4000
          ],
          [
            '<div class="infobox-wrapper"><p class="title">Больница</p></div>',
            'assets/img/markers/mark-med.png',
            50.3680,
            30.3924
          ],
          [
            '<div class="infobox-wrapper"><p class="title">Кинотеатр</p></div>',
            'assets/img/markers/mark-movie.png',
            50.3800,
            30.3904
          ],
          [
            '<div class="infobox-wrapper"><p class="title">Школа</p></div>',
            'assets/img/markers/mark-school.png',
            50.3755,
            30.3804
          ],
          [
            '<div class="infobox-wrapper"><p class="title">Торговый центр</p></div>',
            'assets/img/markers/mark-shop.png',
            50.3710,
            30.3820
          ]
        ];

        // Mark logo
        var markLogo = new google.maps.Marker({
          position: {
            lat: 50.3743,
            lng: 30.3924
          },
          map: map3,
          icon: {
            url: 'assets/img/markers/mark-logo.png'
          }
        });

        // Marks infrastructure
        var infoBox = new InfoBox({
          alignBottom: true,
          pixelOffset: new google.maps.Size(0, -5),
          pane: "mapPane"
        });
        var marker;

        for (var i = 0; i < dataMarkers.length; i++) {  
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(dataMarkers[i][2], dataMarkers[i][3]),
            map: map3,
            icon: dataMarkers[i][1]
          });

          google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
            return function() {
              infoBox.setContent(dataMarkers[i][0]);
              infoBox.open(map3, marker);
            }
          })(marker, i));

          google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
            return function() {
              infoBox.setContent(dataMarkers[i][0]);
              infoBox.close(map3, marker);
            }
          })(marker, i));
          
        } // end for

        $('a[data-nav-page]').on('tap', function(event) {
          event.preventDefault();
          setTimeout(function() {
            google.maps.event.trigger(map3, 'resize');
            map3.setCenter(mapProp.center);
          },100);
        });

      })();

      

    } // end if

  })();

  $('.overlay-map').on('click', function() {
    $(this).remove();
  }); 

}

// Init map
if ( typeof google != 'undefined' ) {
  google.maps.event.addDomListener(window, 'load', initialize);
}


