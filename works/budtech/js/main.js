;'use strict';

// Load page
$(window).load(function() {
  // Display loading...
  $('.page-loading').addClass('active');
  $('section.home .logo').addClass('animate');
  SliderStuck('.slider-stuck-1');
  SliderStuck('.slider-stuck-2');
});

// DOM Ready
$(function(){

  // На всю высоту экрана
  function videoOnFullWindow(element) {
    $(element).css({
      'min-height': $(window).height()
    });
  }
  videoOnFullWindow('section.home .container-video .player, section.home .container-video .mask');
  $(window).resize(function(event) {
    videoOnFullWindow('section.home .container-video .player, section.home .container-video .mask');
  });

  // Init video
  $('#playerVideoHome').vide({
    mp4: 'video/bt.mp4',
    poster: '../images/preload-video/preload-video.jpg'
  }, {
    muted: true,
    loop: true,
    autoplay: true,
    position: '0 0',
    resizing: true,
    posterType: 'none',
  });
  var playerVideo = $('#playerVideoHome').data('vide').getVideoObject();

  function navigationPages() {
    // Menu-page
    // Open
    $('section.home .link-menu').on('click', function(event) {
      event.preventDefault();
      $('.menu-page').addClass('active');
      hideHome();
      animateShowing('.menu-page .anim-showing');
      playerVideo.pause();
    });
    // Close and on home
    $('.menu-page .close-menu-page, .menu-page .list-menu a[href="#home"]').on('click', function(event) {
      event.preventDefault();
      $('.menu-page').removeClass('active');
      visibleHome();
      playerVideo.play();
    });

    // Objects catalog
    // Open
    $('.menu-page .list-menu a[href="#objects-catalog"]').on('click', function(event) {
      event.preventDefault();
      $('.menu-page').removeClass('active');
      visibleHome();
      $('.objects-catalog').addClass('active');
      animateShowing('.objects-catalog .anim-showing');
    });
    // On home
    $('.objects-catalog .on-home').on('click', function(event) {
      event.preventDefault();
      $('.objects-catalog').removeClass('active');
      playerVideo.play();
    });

    // Object page
    // Open
    $('.objects-catalog .link-img-slide, .objects-catalog .more').on('click', function(event) {
      event.preventDefault();
      var hrefTarget = '.' + $(this).attr('href').slice(1);
      $(hrefTarget).addClass('active');
      animateShowing(hrefTarget + ' .anim-showing');
      countBuild(hrefTarget + ' .ready-object .count');
    });
    // Close
    $('.object-page .on-home, .object-page .nav-page .close-page').on('click', function(event) {
      event.preventDefault();
      $('.object-page').removeClass('active');
    });

    // Contact
    // Open
    $('.menu-page .list-menu a[href="#contact"], .menu-page .write-us').on('click', function(event) {
      event.preventDefault();
      $('.menu-page').removeClass('active');
      $('.contact').addClass('active');
      animateShowing('.contact .anim-showing');
    });
    // On home
    $('.contact .on-home').on('click', function(event) {
      event.preventDefault();
      $('.contact').removeClass('active');
      visibleHome();
      playerVideo.play();
    });

    // About
    // Open
    $('.menu-page .list-menu a[href="#about"]').on('click', function(event) {
      event.preventDefault();
      $('.menu-page').removeClass('active');
      $('.about').addClass('active');
      animateShowing('.about .anim-showing');
    });
    // Close and on home
    $('.about .on-home, .about .nav-page .close-page').on('click', function(event) {
      event.preventDefault();
      visibleHome();
      $('.about').removeClass('active');
      playerVideo.play();
    });

    // News-catalog
    // Open
    $('.menu-page .list-menu a[href="#news-catalog"]').on('click', function(event) {
      event.preventDefault();
      $('.menu-page').removeClass('active');
      $('.news-catalog').addClass('active');
      animateShowing('.news-catalog .anim-showing');
    });
    // Close
    $('.news-catalog .on-home, .news-catalog .nav-page .close-page').on('click', function(event) {
      event.preventDefault();
      $('.news-catalog').removeClass('active');
      visibleHome();
      playerVideo.play();
    });

    // News-page
    // Open
    $('.news-catalog .list-news a.more').on('click', function(event) {
      event.preventDefault();
      $('.news-page').addClass('active');
      animateShowing('.news-page .anim-showing');
    });
    // Close
    $('.news-page .on-home, .news-page .nav-page .close-page').on('click', function(event) {
      event.preventDefault();
      $('.news-page').removeClass('active');
    });

    // Map
    // Open
    $('.objects-catalog .location, address').on('click', function(event) {
      event.preventDefault();
      $('.map').addClass('active');
    });
    // Close
    $('.map .close-page').on('click', function(event) {
      event.preventDefault();
      $('.map').removeClass('active');
    });
    
    // Chains on menu
    $('.chains a[href="#menu-page"]').on('click', function(event) {
      event.preventDefault();
      $('.menu-page').addClass('active');
      hideHome();
      $('.objects-catalog, .object-page, .about, .news-catalog, .news-page').removeClass('active');
    });

    // Close if click out block
    $(document).on('mouseup', function(event) {
      if ( $(event.target).find(".wrapper-content-page").length ) {
        $(event.target).removeClass('active');
        visibleHome();
        playerVideo.play();
      }
    });

    function hideHome() {
      $('section.home .container-content').addClass('hided');
    }
    function visibleHome() {
      $('section.home .container-content').removeClass('hided');
    }
  } navigationPages();
  
  function animateShowing(element) {
    var $element = $(element);
    $element.each(function(i) {
      setTimeout(function() {
        $element.eq(i).addClass('is-showing');
      }, (600 * (Math.exp(i * 0.15))) - 600 ); // Каждая итерация увеличивает время анимации
    });
  }

  // Scroll-down
  $('.nav-page .scroll').on('click', function(event) {
    event.preventDefault();
    $(this).closest('.wrapper-content-page').animate({ 
      scrollTop: 9999
    }, {
      duration: 1000
    });
  });

  // Objects slider
  var objectsSlider;
  objectsSlider = $('#objects-slider').owlCarousel({
    items: 1,
    margin: 60,
    loop: true,
    autoHeight: false,
    smartSpeed: 700,
    nav: false,
    dots: true
  });
  $('.objects-catalog .nav-slider .prev').on('click', function(event) {
    event.preventDefault();
    objectsSlider.trigger('prev.owl.carousel', [700]);
  });
  $('.objects-catalog .nav-slider .next').on('click', function(event) {
    event.preventDefault();
    objectsSlider.trigger('next.owl.carousel', [700]);
  });

  // Contact
  // Переместить плейсхолдер если клик по нему или focus input
  $('.contact .wrapper-inputs .placeholder, .contact .wrapper-inputs input, .contact .wrapper-inputs textarea').on('click focus', function() {
    var self = $(this);
    self.siblings('.placeholder').addClass('active');
    self.addClass('active');
    self.siblings('input').focus();
    self.siblings('textarea').focus();
  });
  // Убрать если blur
  $('.contact .wrapper-inputs input, .contact .wrapper-inputs textarea').on('blur load', function(event) {
    var self = $(this);
    if ( !self.val().length ) {
      self.siblings('.placeholder').removeClass('active');
      self.removeClass('active');
    }
  });
  // Validation
  $('#formContact').validate({
    rules: {
      userName: {
        required: true,
        minlength: 3,
      },
      userEmail: {
        required: true,
      },
      targetCompany: {
        required: true,
      },
      message: {
        required: true,
      }
    },
    errorPlacement: function(error, element) {},
  });

  // About counts
  function countElOnScroll() {
    function countElems() {
      $('.about .features .item').addClass('anim');
      var blurText = baffle('.about .features .count', {
        characters: '0123456789',
        speed: 50
      });
      blurText.start();
      setTimeout(function(){
        blurText.reveal(0);
      },1500);
    }
      
    var once = true;
    $(".about .wrapper-content-page").on('scroll', function(){
      var elemTarget = $(".about .features .item");

      if ( once && $(this).scrollTop() >= elemTarget.offset().top - ( $(window).height() / 1.5 ) ) {
        countElems();
        once = false;
      }
    });
  } countElOnScroll();

  // CountBuild
  function countBuild(elem) {
    var blurText = baffle(elem, {
      characters: '0123456789',
      speed: 50
    });
    blurText.start();
    setTimeout(function(){
      blurText.reveal(0);
    },1800);
  }

  // Lightbox gallery
  $('.swipebox').swipebox({
    hideBarsDelay : 5000,
  });

  // FitVids
  $(".object-page .container-player").fitVids();

});

// Slider stuck
function SliderStuck(element) {
  var countSlides = $(element + ' .slide').length,
      slidersContainer = $(element + ' .sliders'),
      slideFullWidth = $(element + ' .slide').outerWidth(),
      slideFullHeight = $(element + ' .slide').outerHeight(),
      slideActive = $(element + ' .slide.active'),
      slideArrow = $(element + ' .timeline .arrow'),
      slideDate = $(element + ' .timeline .date');
  function changeWidth() {
    $(element + ' .slide').outerWidth( (slidersContainer.outerWidth() - slideFullWidth) / (countSlides - 1) );
  }
  function initSliderStuck() {
    // Init
    slidersContainer.outerHeight(slideFullHeight);
    changeWidth();
    slideActive.css({
      width: 'auto'
    });
    // Arrow
    slideArrow.offset({
      left: slideActive.offset().left + (slideActive.outerWidth() / 2) - 5
    });
    // Date
    slideDate.text($(this).data('date'));
    slideDate.offset({
      left: slideActive.offset().left + (slideActive.outerWidth() / 2) - (slideDate.outerWidth() / 2)
    });
  } initSliderStuck();
  // Hover
  $(element + ' .slide').hover(function() {
    var self = $(this);
    changeWidth();
    self.css({
      width: 'auto'
    });
    $('.slider-stuck .slide').removeClass('active');
    self.addClass('active');
    // Arrow
    slideArrow.offset({
      left: self.offset().left + (self.outerWidth() / 2) - 5
    });
    // Date
    slideDate.text(self.data('date'));
    slideDate.offset({
      left: self.offset().left + (self.outerWidth() / 2) - (slideDate.outerWidth() / 2)
    });
  }, function() {
    //
  });
};

// Load mapGoogle

// Map
function initMap() {
  function initialize() {

    // MAP 1
    var mapProp = {
      center: {
        lat: 49.97175991915481,
        lng: 27.0898
      },
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP,

      // Controls
      panControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
      },
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false,
      rotateControl: false,

      // Style map
      styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#b4d4e1"},{"visibility":"on"}]}]
    };

    var map = new google.maps.Map(document.getElementById("map-location"), mapProp);

    // Markers
    var markBt = new google.maps.Marker({
      position: {
        lat: 50.3894,
        lng: 30.4770
      },
      map: map,
      title: 'БУДТЕХНОЛОГИИ',
      icon: 'images/markers/marker-bt.png'
    });
    var markJk = new google.maps.Marker({
      position: {
        lat: 50.3894,
        lng: 30.4761
      },
      map: map,
      title: 'ЖК АМУРСКИЙ',
      icon: 'images/markers/marker-jk.png'
    });
    var markAkv = new google.maps.Marker({
      position: {
        lat: 49.0249,
        lng: 24.3653
      },
      map: map,
      title: 'АКВАТОРИЯ',
      icon: 'images/markers/marker-akv.png'
    });
    // Info windows
    var infowindowBt = new google.maps.InfoWindow({
      position: markBt.position,
      pixelOffset: new google.maps.Size(-12, 0),
      content: '<div class="content-info">'+ ' БУДТЕХНОЛОГИИ ' + '</div>'
    });
    var infowindowJk = new google.maps.InfoWindow({
      position: markJk.position,
      pixelOffset: new google.maps.Size(-12, 0),
      content: '<div class="content-info">'+ ' ЖК АМУРСКИЙ ' + '</div>'
    });
    var infowindowAkv = new google.maps.InfoWindow({
      position: markAkv.position,
      pixelOffset: new google.maps.Size(-12, 0),
      content: '<div class="content-info">'+ ' АКВАТОРИЯ ' + '</div>'
    });

    // Events
    markBt.addListener('click', function(event) {
      infowindowBt.open(map, this);
    });
    markJk.addListener('click', function(event) {
      infowindowJk.open(map, this);
    });
    markAkv.addListener('click', function(event) {
      infowindowAkv.open(map, this);
    });

    // Меняем zoom на mobile
    if ( $(window).width() <= 600 ) {
      map.setZoom(11);
    }
    
  }
  google.maps.event.addDomListener(window, 'load', initialize);
}