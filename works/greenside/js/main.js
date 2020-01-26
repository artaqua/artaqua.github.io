;'use strict';

// Event DOM Ready
$(function(){

  // Menu
  $('body').on('tap', 'header .link-menu', function(event) {
    event.preventDefault();
    $('.nav-menu').toggleClass('active');
    animateShowing('.nav-menu .animate', 0.12);
  });
  $('body').on('tap', '.nav-menu .close', function(event) {
    event.preventDefault();
    $('.nav-menu').removeClass('active');
    $('.nav-menu').find('.animate').each(function(index, el) {
      $(this).removeClass('showing');
    });
  });
  // dropdown
  $('body').on('tap', '.nav-menu .list-menu a', function(event) {
    if ( $(this).siblings('.sub-list-menu').length ) {
      event.preventDefault();
      $(this).siblings('.sub-list-menu').slideToggle(500);
    }
  });

  // Projects
  $('body').on('tap', 'footer .link-projects', function(event) {
    event.preventDefault();
    $('.projects').toggleClass('active');
  });
  $('body').on('tap', '.projects .close', function(event) {
    event.preventDefault();
    $('.projects').removeClass('active');
  });
  $(document).on('mouseup', function(event) {
    if (!$(event.target).closest(".container-projects").length) {
      $('.projects').removeClass('active');
    }
  });

  // Popups
  (function() {
    // Scroll popup
    $('.popup .wrapper-scroll').perfectScrollbar({
      wheelPropagation: false,
      swipePropagation: false
    });
    // order-call
    $('body').on('tap', '.btn-order-call', function(event) {
      event.preventDefault();
      $('.popup-order-call').toggleClass('active');
      coordClickedPopup('.popup-order-call', $(this));
    });
    // order-call
    $('body').on('tap', 'footer .liked', function(event) {
      event.preventDefault();
      $('.popup-liked').toggleClass('active');
      coordClickedPopup('.popup-liked', $(this));
    });
    // news
    $('body').on('tap', 'section.section-news .filters .shares, .nav-menu .list-menu .shares', function(event) {
      event.preventDefault();
      $('.popup-shares').toggleClass('active');
    });
    // shares
    $('body').on('tap', 'section.section-news .list-news .item', function(event) {
      event.preventDefault();
      $('.popup-news').toggleClass('active');
    });
    // Close popup
    $('body').on('tap', '.popup .close', function(event) {
      event.preventDefault();
      $('.popup').removeClass('active');
    });
    // Close when click out block
    $(document).on('keydown', function(event) {
      if (event.keyCode == 27) {
        $('.popup').removeClass('active');
      }
    });

    function coordClickedPopup(popup, $this) {
      var $popup = $(popup),
        $wrapCircle = $popup.find('.wrapper-circle'),
        coordTOp = $this.offset().top + ( $this.outerHeight() / 2 ) - ( $wrapCircle.outerHeight() / 2),
        coordLeft = $this.offset().left + ( $this.outerWidth() / 2 ) - ( $wrapCircle.outerWidth() / 2);

      $wrapCircle.css({
        top: coordTOp,
        left: coordLeft
      });
    }
  })();

  // Sliders
  (function() {
    
    // SliderHome
    var sliderHome = $('.slider-home'),
        playerHome = $('#video-player-home')[0],
        listenSlider = $.Deferred();
        
    // On init slide
    sliderHome.on('init', function(event, slick){
      playerHome.pause();
      //Avoid the Promise Error
      setTimeout(function () {
        if (playerHome.paused) {
          playerHome.play();
        }
      }, 50);
    });
    sliderHome.slick({
      arrows: false,
      dots: true,
      speed: 800,
      fade: true,
      draggable: false,
      adaptiveHeight: true
    });
    // On before change slide 
    sliderHome.on('beforeChange', function(event, slick, currentSlide, nextSlide){
      var elemActive = slick.$slides.get(nextSlide),
          playerActive = $(elemActive).find('video')[0];

      // Play
      if ( $(elemActive).find('.video-container').length ) {
        playerActive.pause();
        //Avoid the Promise Error
        setTimeout(function () {
          if (playerActive.paused) {
            playerActive.play();
          }
        }, 50);
      }
      // Animate
      animateShowing('section.section-home .features .animate', 0.20);

    });
    // On after change slide 
    sliderHome.on('afterChange', function(event, slick, currentSlide, nextSlide) {
      if ( $(slick.$slides.get(currentSlide)).find('.timeline').length ) {
        listenSlider.resolve();
      }
    });
    // On mousewheel
    if (!Modernizr.mq('(max-width: 1000px)')) {
      sliderHome.on('mousewheel', function (event, slick) {
        event.preventDefault();
        
        if (event.deltaX > 0 || event.deltaY < 0) {
          $(this).slick('slickNext');
        } else if (event.deltaX < 0 || event.deltaY > 0) {
          $(this).slick('slickPrev');
        }
      });
    }

    // Destroy slider at
    if (Modernizr.mq('(max-width: 1000px)')) {
      sliderHome.slick('unslick');
    }
    
    // Slider timeline
    (function(){

      var sliderTimeline = $('.slider-timeline'),
          firsVideo = sliderTimeline.find('video')[0];

      // On init slide
      sliderTimeline.on('init', function(event, slick){
        setTimeout(function(){
          if (firsVideo.paused) {
            firsVideo.play();
          } 
        }, 50);
      });
      sliderTimeline.slick({
        arrows: false,
        dots: false,
        speed: 500,
        fade: true,
        autoplay: true,
        autoplaySpeed: 10000,
        adaptiveHeight: true,
        swipeToSlide: true,
        asNavFor: '.slider-nav-timeline'
      });
      sliderTimeline.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        var elemActive = slick.$slides.get(nextSlide),
            playerActive = $(elemActive).find('video')[0],
            videos = $('.slider-timeline video');

        // Paused all video
        for (var i = 0; i < videos.length; i++) {
          videos[i].pause();
        }
        // Play
        if ( $(elemActive).find('.video-container').length ) {
          setTimeout(function () {
            if (playerActive.paused) {
              playerActive.play();
            }
          }, 50);
        }

        $('section.section-home .timeline a').each(function(index, el) {
          var dataSlide = $(this).attr('data-slide-video'),
              textTime = $(this).find('.time').text(),
              textName = $(this).find('.name').text();

          // Change text
          if ( dataSlide == nextSlide ) {
            $('section.section-home .timeline a').removeClass('active');
            $(this).toggleClass('active');
            $('section.section-home .timeline .timed .time').text(textTime);
            $('section.section-home .timeline .timed .name').text(textName);
          }
        });

      });
      // On click timeline link
      $('section.section-home .timeline a').on('tap', function(event) {
        event.preventDefault();
        var dataSlide = $(this).attr('data-slide-video'),
            textTime = $(this).find('.time').text(),
            textName = $(this).find('.name').text();

        // Change slide
        sliderTimeline.slick('slickGoTo', dataSlide);
        // Change text
        $('section.section-home .timeline a').removeClass('active');
        $(this).toggleClass('active');
        $('section.section-home .timeline .timed .time').text(textTime);
        $('section.section-home .timeline .timed .name').text(textName);
      });

      // SVG timeline
      var s = Snap("#svg-timeline");

      function animateLine() {
        $('section.section-home .timeline').addClass('active');

        if ( $('.line-timeline').length ) {
          s.select('.line-timeline').animate({ d: "M-651.5,416c0,0,37.6-21,129.5-34c53.6-7.6,139.9-4.2,210.7-13.9c84.3-11.5,194.9-26.1,269.5-35.9 c45.1-5.9,150.6-26.6,206.8,39.5c18.4,21.7,38.5,36.6,61.4,43c9,2.5,26.6,4.7,78.4,3c44.8-1.5,53.9,34.9,60.8,54 c9,25,26.8,47.7,41.8,57.3c67.8,43.3,115.8,33.3,157.5,18c38.4-14,99.9-32.9,160-34c53.8-1,114.2-19.7,150.8-31.8 c64.5-21.3,90-11,139.8,35c26.2,24.2,78,47.7,139.8,28.5c35.2-10.9,101.5-0.3,139.8,7.8c36.8,7.7,102,33.3,139.8,55.8 c35.9,21.4,70.5,45.1,165.5,23c36.3-8.4,95.3-25.9,147.5-22.9c54.7,3.2,156.7,46.8,212.5,54.1c149,19.5,212.5,56.5,212.5,56.5"}, 1200, mina.easeinout);
        }
        
      }

      // When in slide timeline
      if (Modernizr.mq('(max-width: 1000px)')) {
        animateLine();
      } else {
        $.when(listenSlider).done(function(){
          animateLine();
        });
      }

      // slider nav timeline
      var sliderNavTimeline = $('.slider-nav-timeline');

      sliderNavTimeline.slick({
        dots: false,
        arrows: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        swipeToSlide: true,
        centerPadding: '0',
        centerMode: true,
        focusOnSelect: true,
        asNavFor: '.slider-timeline',
        responsive: [
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          }
        ]
      });
      // controls slider nav timeline
      $('body').on('tap', '.slider-nav-timeline-contols a', function (event) {
        event.preventDefault();
        if ( $(this).hasClass('prev') ) {
          sliderNavTimeline.slick('slickPrev');
        } else if ( $(this).hasClass('next') ) {
          sliderNavTimeline.slick('slickNext');
        }
      });

    })();

    // SLider managers
    var sliderManagers = $('.slider-managers');
    sliderManagers.slick({
      dots: false,
      arrows: false,
      speed: 500,
      swipeToSlide: true
    });
    // controls slider nav timeline
    $('body').on('tap', '.nav-managers-contols a', function (event) {
      event.preventDefault();
      if ( $(this).hasClass('prev') ) {
        sliderManagers.slick('slickPrev');
      } else if ( $(this).hasClass('next') ) {
        sliderManagers.slick('slickNext');
      }
    });

    // SLider news
    var sliderNews = $('.slider-news');
    sliderNews.slick({
      dots: false,
      arrows: true,
      prevArrow: '.nav-news-contols .prev',
      nextArrow: '.nav-news-contols .next',
      speed: 800,
      slidesToShow: 4,
      slidesToScroll: 4,
      centerPadding: '0',
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 550,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
    // SLider news-popup
    var sliderNewsPopup = $('.slider-news-popup');
    sliderNewsPopup.on('init afterChange', function(event, slick, currentSlide, nextSlide) {
      var elemActive = slick.$slides.get(currentSlide),
          prevData = $(elemActive).prev().attr('data-preview-img'),
          nextData = $(elemActive).next().attr('data-preview-img');

      sliderNewsPopup.closest('.popup-news').find('.prev .img').css({
        'background-image': 'url(' + prevData + ')'
      });
      sliderNewsPopup.closest('.popup-news').find('.next .img').css({
        'background-image': 'url(' + nextData + ')'
      });
    });
    sliderNewsPopup.slick({
      dots: true,
      arrows: true,
      prevArrow: '.popup-news .prev',
      nextArrow: '.popup-news .next',
      speed: 400,
      adaptiveHeight: true,
      touchMove: false,
      swipeToSlide: true
    });

    // SLider shares
    var sliderShares = $('.slider-shares');
    sliderShares.on('init afterChange', function(event, slick, currentSlide, nextSlide) {
      var elemActive = slick.$slides.get(currentSlide),
          prevData = $(elemActive).prev().attr('data-preview-img'),
          nextData = $(elemActive).next().attr('data-preview-img');

      sliderShares.closest('.popup-shares').find('.prev .img').css({
        'background-image': 'url(' + prevData + ')'
      });
      sliderShares.closest('.popup-shares').find('.next .img').css({
        'background-image': 'url(' + nextData + ')'
      });
    });
    sliderShares.slick({
      dots: true,
      arrows: false,
      speed: 400,
      adaptiveHeight: true,
      touchMove: false,
      swipeToSlide: true
    });
    // controls
    $('body').on('tap', '.popup-shares .prev, .popup-shares .next', function (event) {
      event.preventDefault();
      if ( $(this).hasClass('prev') ) {
        sliderShares.slick('slickPrev');
      } else if ( $(this).hasClass('next') ) {
        sliderShares.slick('slickNext');
      }
    });

    // SLider tabs
    var $listTabs = $('.content-tabs').isotope({
      transitionDuration: '0.6s',
      hiddenStyle: {
        opacity: 0,
        transform: 'translate(0,50px)'
      },
      visibleStyle: {
        opacity: 1,
        transform: 'translate(0,0)'
      },
      filter: $('.slider-nav-tabs .item span.active').attr('data-filter')
    });
    // filter items on click
    $('.slider-nav-tabs .item span').on('tap', function(event) {
      event.preventDefault();
      var filterValue = $(this).attr('data-filter');
      $(this).closest('.slider-nav-tabs').find('span').removeClass('active');
      $(this).addClass('active');
      $listTabs.isotope({ filter: filterValue });
    });

    var sliderNavTabs = $('.slider-nav-tabs');
    sliderNavTabs.on('init afterChange', function(event, slick, currentSlide, nextSlide) {
      var elemActive = slick.$slides.get(currentSlide),
          activeData = $(elemActive).find('span').attr('data-filter');

      $listTabs.isotope({ filter: activeData });
    });
    sliderNavTabs.slick({
      dots: false,
      arrows: true,
      prevArrow: '.nav-tabs .prev',
      nextArrow: '.nav-tabs .next',
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1,
    });
    if ( !Modernizr.mq('(max-width: 767px)') ) {
      sliderNavTabs.slick('unslick');
    }

    // Dell text on dots
    $('.slick-dots button').text('');

  })();

  // Infrastructure
  function changeHeaderInfrastructure() {
    var $header = $('section.section-infrastructure').closest('body').find('header');
    if ( Modernizr.mq('(max-width: 850px)') ) {
      $header.removeClass('header-page--white');
    } else {
      $header.addClass('header-page--white');
    }
  }
  changeHeaderInfrastructure();

  // Validation
  (function() {

    // Placeholder
    // Переместить плейсхолдер если клик по нему или focus input
    var elemsOnFocus = '.wrapper-inputs .placeholder, .wrapper-inputs input, .wrapper-inputs textarea';
    $('body').on('tap focus', elemsOnFocus, function() {
      var self = $(this);
      self.siblings('.placeholder').addClass('active');
      self.addClass('active');
      self.closest('.wrapper-inputs').addClass('active');
      self.siblings('input').focus();
      self.siblings('textarea').focus();
    });
    // Убрать если blur
    var elemsOnBlur = '.wrapper-inputs input, .wrapper-inputs textarea';
    $('body').on('blur load', elemsOnBlur, function(event) {
      var self = $(this);
      if ( !self.val().length ) {
        self.siblings('.placeholder').removeClass('active');
        self.removeClass('active');
      }
      self.closest('.wrapper-inputs').removeClass('active');
    });
    // Validation
    $('#form-order-call').validate({
      rules: {
        clientName: {
          required: true
        },
        clientPhone: {
          required: true,
          minlength: 10
        }
      },
      errorPlacement: function(error, element) {},
      submitHandler: function(form) {
        $(form).find('.valid-call').addClass('active');
        setTimeout(function(){
          $('.popup').removeClass('active');
          $('html').css({
            'overflow': 'auto',
            'margin-right': 0
          });
        }, 3000);
        // $(form).ajaxSubmit();
      }
    });
    $('#form-liked').validate({
      rules: {
        clientName: {
          required: true
        },
        manager: {
          required: true
        },
        comment: {
          required: true
        }
      },
      errorPlacement: function(error, element) {},
      submitHandler: function(form) {
        $(form).find('.valid-call').addClass('active');
        setTimeout(function(){
          $('.popup').removeClass('active');
          $('html').css({
            'overflow': 'auto',
            'margin-right': 0
          });
        }, 3000);
        // $(form).ajaxSubmit();
      }
    });

  })();

  // close notification
  $('body').on('tap', '.notification svg', function(event) {
    event.preventDefault();
    $(this).closest('.notification').slideUp(300);
  });

  // Catalog-rooms
  var $rangeFloor = $("#range-floor");
  $rangeFloor.ionRangeSlider({
    type: "double",
    min: 2,
    max: 16,
    from: 5,
    to: 10,
    grid: false,
    hide_from_to: true,
    onStart: function (data) {
      $rangeFloor.siblings('.length').text(data.from + ' - ' + data.to);
    },
    onChange: function (data) {
      $rangeFloor.siblings('.length').text(data.from + ' - ' + data.to);
    },
  });
  var $rangeMeters = $("#range-meters");
  $rangeMeters.ionRangeSlider({
    type: "double",
    min: 34,
    max: 126,
    from: 52,
    to: 74,
    grid: false,
    hide_from_to: true,
    onStart: function (data) {
      $rangeMeters.siblings('.length').text(data.from + ' - ' + data.to);
    },
    onChange: function (data) {
      $rangeMeters.siblings('.length').text(data.from + ' - ' + data.to);
    },
  });

  // hover info
  var $hoverInfo = $('section.section-catalog-room .hover-info');
  $('section.section-catalog-room .list-room .item').hover(function(event) {
    var coordTop = $(this).offset().top + ($(this).outerHeight() / 2),
        coordLeft = $(this).offset().left;

    $hoverInfo.addClass('active');
    $hoverInfo.css({
      top: coordTop - ($hoverInfo.outerHeight() / 2),
      left: coordLeft - $hoverInfo.outerWidth()
    });
  }, function() {
    $hoverInfo.removeClass('active');
  });
  $hoverInfo.hover(function(event) {
    $(this).addClass('active');
  }, function() {
    $hoverInfo.removeClass('active');
  });

  // Tooltip
  $('.tooltip').tooltipster({
    trigger: 'hover',
    plugins: ['follower'],
    anchor: 'top-center',
    offset: [0, -30],
    maxWidth: 200,
    minWidth: 50,
    animation: 'grow',
    animationDuration: 350,
    interactive: true,
    theme: 'tooltipster-shadow',
    contentCloning: true
  });
  $('section.section-floor .svg-floor a.sold').click(function() {
    return false; 
  });

  // Event scroll
  $(window).scroll(function(event) {
    // Аnimation on scroll
    var wScroll = $(this).scrollTop();

    $('section.section-home .features').each(function() {
      if ( wScroll > $(this).offset().top - ( $(window).height() - 200) ) {
        animateShowing('section.section-home .features .animate', 0.22);
      }
    });
  });

  // Event resize
  $(window).resize(function(event) {

    // Height sliderHome
    $('.slider-home .item').css({
      height: $(window).height()
    });
    $('section.section-infrastructure .map-google').css({
      height: $(window).height()
    });

    viewportHeight('.slider-timeline .slick-slide');
    viewportHeight('.container-page');

    // Destroy slider at
    if (Modernizr.mq('(max-width: 1000px)')) {
      $('.slider-home').slick('unslick');
    }

    changeHeaderInfrastructure();

  });

});

// Event load
$(window).load(function() {

  // Display loading...
  $(".page-loading").addClass('load');

  // Anim
  animateShowing('section.section-home .home-preview .animate', 0.30);
  animateShowing('section.section-about .animate', 0.24);
  animateShowing('section.section-conditions .animate', 0.24);
  animateShowing('section.section-contacts .animate', 0.28);
  animateShowing('section.section-news .animate', 0.18);
  animateShowing('section.section-floor .animate', 0.28);
  animateShowing('section.section-room .animate', 0.26);
  animateShowing('section.section-catalog-room .animate', 0.22);

  // Height sliderHome
  $('.slider-home .item').css({
    height: $(window).height()
  });
  $('section.section-infrastructure .map-google').css({
    height: $(window).height()
  });

  viewportHeight('.slider-timeline .slick-slide');
  viewportHeight('.container-page');
  

});

// Functions
var viewportHeight = (function(elem) {
  $(elem).css({
    'min-height': $(window).height()
  });
});

var animateShowing = (function(element, speedCount) {
  var speed = speedCount || 0.18
  var $element = $(element);
  $element.each(function(i) {
    setTimeout(function() {
      $element.eq(i).addClass('showing');
    }, (600 * (Math.exp(i * speed))) - 600 ); // Каждая итерация увеличивает время анимации
  });
});

var getScrollBarWidth = (function() {
  var inner = document.createElement('p');
  inner.style.width = "100%";
  inner.style.height = "200px";

  var outer = document.createElement('div');
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild (inner);

  document.body.appendChild (outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild (outer);

  return (w1 - w2);
});


// Load mapGoogle
// Map
function initMap() {
  function initialize() {

    // Map props
    var mapProp = {
      center: {
        lat: 50.5142,
        lng: 30.1905
      },
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,

      // Controls
      panControl: false,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false,
      rotateControl: false,
      styles: [{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#f3f4f4"},{"saturation":-84},{"lightness":59},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"hue":"#96c11f"},{"saturation":1},{"lightness":-15},{"visibility":"on"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"hue":"#ccffff"},{"saturation":-60},{"lightness":23},{"visibility":"on"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbbbbb"},{"saturation":-100},{"lightness":26},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#ffdd00"},{"saturation":100},{"lightness":-22},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#ffdd00"},{"saturation":100},{"lightness":-35},{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#21bbef"},{"saturation":55},{"lightness":-6},{"visibility":"on"}]},{"featureType":"water","elementType":"labels","stylers":[{"hue":"#21bbef"},{"saturation":55},{"lightness":-6},{"visibility":"off"}]}]

    };

    // Call Maps
    var callMaps = (function(){

      if ( $('#map-office').length ) {

        // Map-contacts
        var map = new google.maps.Map(document.getElementById('map-office'), mapProp);

        // Markers
        var markOffice = new google.maps.Marker({
          position: {
            lat: 50.5160,
            lng: 30.2100
          },
          map: map,
          icon: {
            url: 'images/markers/mark-greenside-green.png'
          }
        });
        var infoBox = new InfoBox({
          content: '<div class="infobox-wrapper"><p class="title">Отдел продаж</p></div>',
          alignBottom: true,
          pixelOffset: new google.maps.Size(0, -8),
          pane: "mapPane"
        });
        infoBox.open(map, markOffice);

        var markComplex = new google.maps.Marker({
          position: {
            lat: 50.5084,
            lng: 30.2225
          },
          map: map,
          icon: {
            url: 'images/markers/mark-greenside-yellow.png'
          }
        });
        var infoBox2 = new InfoBox({
          content: '<div class="infobox-wrapper"><p class="title">ЖК GreenSide</p></div>',
          alignBottom: true,
          pixelOffset: new google.maps.Size(0, -8),
          pane: "mapPane"
        });
        infoBox2.open(map, markComplex);

      } else if ( $('#map-infrastructure').length ) {

        // Map infrastructure
        var map2 = new google.maps.Map(document.getElementById('map-infrastructure'), mapProp);

        (function addMarkerInfrastructure() {

          var dataMarkers = [
            [
              '<div class="infobox-wrapper"><p class="title">Магазин одежды Простор</p></div>',
              'images/markers/mark-market-yellow.png',
              'images/markers/mark-market-green.png',
              50.5259, 
              30.2253  
            ],
            [
              '<div class="infobox-wrapper"><p class="title">Магазин</p></div>',
              'images/markers/mark-park-yellow.png',
              'images/markers/mark-park-green.png',
              50.5339, 
              30.2203
            ],
            [
              '<div class="infobox-wrapper"><p class="title">Магазин</p></div>',
              'images/markers/mark-scholl-yellow.png',
              'images/markers/mark-scholl-green.png',
              50.5200, 
              30.2123
            ],
            [
              '<div class="infobox-wrapper"><p class="title">Магазин</p></div>',
              'images/markers/mark-med-yellow.png',
              'images/markers/mark-med-green.png',
              50.5250, 
              30.2373
            ],
            [
              '<div class="infobox-wrapper"><p class="title">Магазин</p></div>',
              'images/markers/mark-sport-yellow.png',
              'images/markers/mark-sport-green.png',
              50.5120, 
              30.2363
            ],
            [
              '<div class="infobox-wrapper"><p class="title">Магазин</p></div>',
              'images/markers/mark-bank-yellow.png',
              'images/markers/mark-bank-green.png',
              50.5190, 
              30.2343
            ]
          ];

          var infoBox = new InfoBox({
            alignBottom: true,
            pixelOffset: new google.maps.Size(-125, -60)
          });

          var marker;
          var markers = [];

          for (var i = 0; i < dataMarkers.length; i++) {  
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(dataMarkers[i][3], dataMarkers[i][4]),
              map: map2,
              icon: dataMarkers[i][1]
            });
            
            markers.push(marker);

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                markersSetIconDefault();
                marker.setIcon(dataMarkers[i][2]);
                infoBox.setContent(dataMarkers[i][0]);
                infoBox.open(map2, marker);
              }
            })(marker, i));

            function markersSetIconDefault() {
              for (var j = 0; j < markers.length; j++) {
                markers[j].setIcon(dataMarkers[j][1]);
              }
            }
            
          } // end for

        })();

      }

    })();

    $('.overlay-map').on('click', function() {
      $(this).remove();
    });
    
  }

  // Init map
  if ( typeof google != 'undefined' ) {
    google.maps.event.addDomListener(window, 'load', initialize);
  }
  
}

initMap();