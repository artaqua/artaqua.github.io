;'use strict';

// Event DOM Ready
$(function(){

  // Close/open mobile menu
  $('header.header-page .gumburger').on('tap', function(event) {
    event.preventDefault();
    $(this).toggleClass('active');
    $('header.header-page .nav-menu-mobile').toggleClass('active');
    $('header.header-page .logo').toggleClass('active');
  });

  // Close/open list-sidebar
  $('aside.sidebar .btn-navigation').on('tap', function(event) {
    event.preventDefault();
    $(this).siblings('.list-sibebar').slideToggle(500);
  });

  // Isotope
  var $grid = $('section.section-progress .tab .grid').isotope({
    filter: $('section.section-progress .tab .filters button.active').attr('data-filter')
  });
  // filter items on button click
  $('section.section-progress .tab .filters button').on('tap', function() {
    var filterValue = $(this).attr('data-filter');
    $(this).siblings('button').removeClass('active');
    $(this).addClass('active');
    $grid.isotope({ filter: filterValue });
  });

  // Gallary progress
  $('section.section-progress .gallery').fancybox({
    padding: 0,
    margin: [40, 20, 25, 20],
    openEffect: 'fade',
    closeEffect: 'fade',
    prevEffect    : 'fade',
    nextEffect    : 'fade',
    helpers: {
      media: {},
      overlay: {
        css: {
          'background': 'rgba(255,255,255,0.95)'
        }
      }
    }
  });

  // Validation
  (function() {

    // Placeholder
    // Переместить плейсхолдер если клик по нему или focus input
    var elemsOnFocus = '.wrapper-inputs .placeholder, .wrapper-inputs input, .wrapper-inputs textarea';
    $('body').on('tap focus', elemsOnFocus, function() {
      var self = $(this);
      self.siblings('.placeholder').addClass('active');
      self.addClass('active');
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
    });
    // Validation
    $('#form-subscribe').validate({
      rules: {
        clientEmail: {
          email: true,
          required: true,
        }
      },
      errorPlacement: function(error, element) {},
      // submitHandler: function(form) {
      //   $(form).ajaxSubmit();
      // }
    });
    $('#form-request').validate({
      rules: {
        clientName: {
          required: true,
          minlength: 3
        },
        clientPhone: {
          required: true,
        }
      },
      errorPlacement: function(error, element) {},
      submitHandler: function(form) {
        $('.popup').removeClass('active');
        $('html').css({
          'overflow': 'auto',
          'margin-right': 0
        });
        // $(form).ajaxSubmit();
      }
    });
    $('#form-order-call').validate({
      rules: {
        clientPhone: {
          required: true,
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

  // Filter
  $("#range-meters").ionRangeSlider({
    type: "double",
    min: 20,
    max: 90,
    from: 20,
    to: 90,
    postfix: " м<sup>2</sup>",
    hide_min_max: true,
    grid: false
  });

  // Contacts
  $('body').on('tap', 'section.section-contacts .controls-map .btn-drive', function(event) {
    event.preventDefault();
    $(this).closest('.controls-map').find('.info-drive').toggleClass('active');
    $(this).toggleClass('active');
  });
  $('body').on('tap', 'section.section-contacts .controls-map .info-drive .close', function(event) {
    event.preventDefault();
    $(this).closest('.info-drive').toggleClass('active');
    $('section.section-contacts .controls-map .btn-drive').removeClass('active');
  });

  // FitVids
  $('.container-player').fitVids();
    
  // Popups
  // floor-plan / room
  $('body').on('tap', 'section.section-catalog-rooms .list-room a.item', function(event) {
    event.preventDefault();
    if ( $(event.target).hasClass('btn-open-floor') || $(event.target).closest('.btn-open-floor').length ) {
      $('.popup-floor-plan').toggleClass('active');
      $('html').css({
        'overflow': 'hidden',
        'width': 'auto',
        'margin-right': getScrollBarWidth()
      });
    } else {
      $('.popup-room').toggleClass('active');
      $('html').css({
        'overflow': 'hidden',
        'width': 'auto',
        'margin-right': getScrollBarWidth()
      });
    }
  });
  // request
  $('body').on('tap', '.popup-room .btn-order', function(event) {
    event.preventDefault();
    $('.popup-request').toggleClass('active');
    $('html').css({
      'overflow': 'hidden',
      'width': 'auto',
      'margin-right': getScrollBarWidth()
    });
  });
  // order-call
  $('body').on('tap', 'header.header-page .order-call', function(event) {
    event.preventDefault();
    $('.popup-order-call').toggleClass('active');
    $('html').css({
      'overflow': 'hidden',
      'width': 'auto',
      'margin-right': getScrollBarWidth()
    });
  });
  // Close popup
  $('body').on('tap', '.popup .close', function(event) {
    event.preventDefault();
    $('.popup').removeClass('active');
    $('html').css({
      'overflow': 'auto',
      'margin-right': 0
    });
  });
  // Close when click out block
  $(document).on('mouseup', function(event) {
    if (!$(event.target).closest(".wrapper-popup").length) {
      $('.popup').removeClass('active');
      $('html').css({
        'overflow': 'auto',
        'margin-right': 0
      });
    }
  });

  // Event scroll
  $(window).scroll(function(event) {
    // Аnimation on scroll
    var wScroll = $(this).scrollTop();

    $('section.section-about-developer .projects .item, section.section-about .complex').each(function() {
      if ( wScroll > $(this).offset().top - ( $(window).height() - 200) ) {
        $(this).addClass('showing');
      }
    });
  });

  // Event resize
  $(window).resize(function(event) {
    $('#sliderHome .item').css({
      'height': $(window).height()
    });
    // Mobile header menu
    $('header.header-page .menu-mobile').css({
      'min-height': $('body').height() 
    });
  });

});

// Event load
$(window).load(function() {
  // Display loading...
  $(".page-loading").addClass('load');

  // Section home 
  (function() {
    $('#sliderHome .item').css({
      'height': $(window).height()
    });
    var slider = $('#sliderHome');
    slider.owlCarousel({
      items: 1,
      margin: 0,
      loop: false,
      center: true,
      smartSpeed: 1200,
      autoHeight: true,
      animateOut: 'slideOutDown',
      animateIn: 'fadeIn',
      nav: false,
      dots: false,
      URLhashListener:true,
      startPosition: 'URLHash',
      onTranslated: addActiveLinkHash,
      onInitialized: addActiveLinkHash
    });
    // Refresh on load
    slider.trigger('refresh.owl.carousel');
    // Next/prev
    $('.wrapper-slider .nav-slider .prev').on('tap', function(event) {
      event.preventDefault();
      slider.trigger('prev.owl.carousel', [1200]);
    });
    $('.wrapper-slider .nav-slider .next').on('tap', function(event) {
      event.preventDefault();
      slider.trigger('next.owl.carousel', [1200]);
    });
    // Mousewheel
    var allowTransitionLeft = false;
    var allowTransitionRight = true;
    slider.on('mousewheel', '.owl-stage', function (e) {
        e.preventDefault();
        if (e.deltaY < 0) {
            if( allowTransitionRight ) {
                allowTransitionRight = false;
                slider.trigger('next.owl');
            };
        } else {
            if (allowTransitionLeft) {
                allowTransitionLeft = false;
                slider.trigger('prev.owl');
            };
        }
    }).on('translated.owl.carousel', function (e) {
        allowTransitionRight = (e.item.count > e.item.index );
        allowTransitionLeft = (e.item.index > 0);
    });
    function addActiveLinkHash() {
      var hash = $('.wrapper-slider .owl-item.active .item').attr('data-hash'),
          colorActive = $('.wrapper-slider .owl-item.active.center .item').attr('data-color'),
          $body = $('body');

      // Add/remove active
      $('.wrapper-slider .nav-hash a').removeClass('active');
      $('.wrapper-slider .nav-hash a[href="#' + hash + '"]').addClass('active');

      // if 1 slide
      if ( hash.slice(-1) == 0 ) {
        $('.wrapper-slider .decorate, .wrapper-slider .projects').removeClass('active');
      } else {
        $('.wrapper-slider .decorate, .wrapper-slider .projects').addClass('active');
      }

      // Change color
      $('.wrapper-slider .owl-item .item').each(function(index, el) {
        var colors = $(this).attr('data-color');
        $body.removeClass(colors);
        $body.addClass(colorActive);
      });
    }

    // Slider Share
    var sliderShare = $('#sliderShare');
    sliderShare.owlCarousel({
      items: 1,
      margin: 0,
      loop: true,
      center: true,
      smartSpeed: 600,
      autoHeight: true,
      nav: false,
      dots: false,
      URLhashListener:true,
      startPosition: 'URLHash',
      onTranslated: shareActiveLinkHash,
      onInitialized: shareActiveLinkHash
    });
    function shareActiveLinkHash() {
      var hash = $('.wrapper-slider .owl-item.active .item').attr('data-hash'),
          colorActive = $('.wrapper-slider .owl-item.active.center .item').attr('data-color');

      // Add/remove active
      $('.wrapper-slider .nav-hash a').removeClass('active');
      $('.wrapper-slider .nav-hash a[href="#' + hash + '"]').addClass('active');
    }
  
  })();

  // Vision room
  (function(){
    // Popup-room
    var $gridRoom = $('.popup-room .tab-room .grid').isotope({
      filter: $('.popup-room .tab-room .filters a.active').attr('data-filter')
    });
    // Change active
    $('body').on('tap', '.popup-room .tab-room .filters a', function(event) {
      event.preventDefault();
      var $filterContainer = $(this).closest('.filters'),
          filterValue = $(this).attr('data-filter');

      $filterContainer.find('a').removeClass('active');
      $(this).addClass('active');
      $gridRoom.isotope({ filter: filterValue });

      if ( $filterContainer.find('a').eq(1).hasClass('active') ) {
        $filterContainer.find('.bg').addClass('active');
      } else {
        $filterContainer.find('.bg').removeClass('active');
      }
    });

    // Popup-order-call
    var $gridOrderCall = $('.popup-order-call .tab-room .grid').isotope({
      filter: $('.popup-order-call .tab-room .filters a.active').attr('data-filter')
    });
    // Change active
    $('body').on('tap', '.popup-order-call .tab-room .filters a', function(event) {
      event.preventDefault();
      var $filterContainer = $(this).closest('.filters'),
          filterValue = $(this).attr('data-filter');

      $filterContainer.find('a').removeClass('active');
      $(this).addClass('active');
      $gridOrderCall.isotope({ filter: filterValue });

      if ( $filterContainer.find('a').eq(1).hasClass('active') ) {
        $filterContainer.find('.bg').addClass('active');
      } else {
        $filterContainer.find('.bg').removeClass('active');
      }
    });
  })();

  // Mobile menu
  $('header.header-page .nav-menu-mobile').css({
    'min-height': $('body').height() 
  });

  // Anim
  animateShowing('.content .list-info');
  animateShowing('section.section-progress .progress-imgs .gallery');
  animateShowing('section.section-progress .filter-date');
  animateShowing('section.section-select-house .wrapper-house .svg-house .house');
  animateShowing('section.section-catalog-plans .list-plans .item');
  animateShowing('section.section-catalog-rooms .list-room .item, section.section-catalog-rooms .list-room .item-title');
  animateShowing('section.section-catalog-news .news-list .item');
  

});

// Functions
var viewportHeight = (function(elem) {
  $(elem).css({
    'min-height': $(window).height()
  });
});

var animateShowing = (function(element) {
  var $element = $(element);
  $element.each(function(i) {
    setTimeout(function() {
      $element.eq(i).addClass('showing');
    }, (600 * (Math.exp(i * 0.15))) - 600 ); // Каждая итерация увеличивает время анимации
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
        lat: 50.5229,
        lng: 30.2293
      },
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,

      // Controls
      panControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false,
      rotateControl: false,

    };

    // Call Maps
    var callMaps = (function(){

      if( $('#map-infrastructure').length ) {
        // Map infrastructure
        var map = new google.maps.Map(document.getElementById('map-infrastructure'), mapProp);

        // Markers
        var markLocation = new google.maps.Marker({
          position: mapProp.center,
          map: map,
          icon: 'images/markers/marker-location.png'
        });


        (function addMarkerInfrastucture() {

          var dataMarkers = [
            [
              '<div class="infobox-wrapper"><p class="title">Салон красоты «Virginia»</p><p class="descr">ул. Счастливая 75</p></div>',
              'images/markers/marker-shop-blue.png',
              50.5259, 
              30.2253  
            ],
            [
              '<div class="infobox-wrapper"><p class="title">Салон красоты «Virginia»</p><p class="descr">ул. Счастливая 75</p></div>',
              'images/markers/marker-sport-blue.png', 
              50.5239, 
              30.2203
            ],
            [
              '<div class="infobox-wrapper"><p class="title">Салон красоты «Virginia»</p><p class="descr">ул. Счастливая 75</p></div>',
              'images/markers/marker-salon-blue.png', 
              50.5200, 
              30.2223
            ],
            [
              '<div class="infobox-wrapper"><p class="title">Салон красоты «Virginia»</p><p class="descr">ул. Счастливая 75</p></div>',
              'images/markers/marker-cafe-blue.png', 
              50.5210, 
              30.2323
            ],
            [
              '<div class="infobox-wrapper"><p class="title">Салон красоты «Virginia»</p><p class="descr">ул. Счастливая 75</p></div>',
              'images/markers/mark-kindergarten-blue.png', 
              50.5220, 
              30.2263
            ],
            [
              '<div class="infobox-wrapper"><p class="title">Салон красоты «Virginia»</p><p class="descr">ул. Счастливая 75</p></div>',
              'images/markers/marker-market-blue.png', 
              50.5190, 
              30.2343
            ],
            [
              '<div class="infobox-wrapper"><p class="title">Салон красоты «Virginia»</p><p class="descr">ул. Счастливая 75</p></div>',
              'images/markers/marker-park-blue.png', 
              50.5170, 
              30.2373
            ],
            [
              '<div class="infobox-wrapper"><p class="title">Салон красоты «Virginia»</p><p class="descr">ул. Счастливая 75</p></div>',
              'images/markers/marker-pharmacy-red.png', 
              50.5280, 
              30.2280
            ],
            [
              '<div class="infobox-wrapper"><p class="title">Салон красоты «Virginia»</p><p class="descr">ул. Счастливая 75</p></div>',
              'images/markers/marker-playgrounds-red.png', 
              50.5190, 
              30.2280
            ],
            [
              '<div class="infobox-wrapper"><p class="title">Салон красоты «Virginia»</p><p class="descr">ул. Счастливая 75</p></div>', 
              'images/markers/marker-refill-red.png', 
              50.5175, 
              30.2220
            ],
            [
              '<div class="infobox-wrapper"><p class="title">Салон красоты «Virginia»</p><p class="descr">ул. Счастливая 75</p></div>',
              'images/markers/marker-scholl-red.png', 
              50.5165, 
              30.2260
            ],
            [
              '<div class="infobox-wrapper"><p class="title">Салон красоты «Virginia»</p><p class="descr">ул. Счастливая 75</p></div>',
              'images/markers/marker-stomatology-red.png', 
              50.5165, 
              30.2300
            ],
            [
              '<div class="infobox-wrapper"><p class="title">Салон красоты «Virginia»</p><p class="descr">ул. Счастливая 75</p></div>',
              'images/markers/marker-velo-red.png', 
              50.5260, 
              30.2320
            ],
          ];

          var infoBox = new InfoBox({
            width: 240,
            alignBottom: true,
            pixelOffset: new google.maps.Size(-110, -80),
            boxStyle: {
              'width': '220px'
            }
          });

          var marker;

          for (var i = 0; i < dataMarkers.length; i++) {  
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(dataMarkers[i][2], dataMarkers[i][3]),
              map: map,
              icon: dataMarkers[i][1]
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infoBox.setContent(dataMarkers[i][0]);
                infoBox.open(map, marker);
              }
            })(marker, i));
          }

        })();

      } else if( $('#map-contacts').length ) {

        // Map-contacts
        var map2 = new google.maps.Map(document.getElementById('map-contacts'), mapProp);

        // Markers
        var markLocation = new google.maps.Marker({
          position: mapProp.center,
          map: map2,
          icon: 'images/markers/marker-location.png'
        });

      }

    })();
    
  }

  // Init map
  if ( typeof google != 'undefined' ) {
    google.maps.event.addDomListener(window, 'load', initialize);
  }
  
}