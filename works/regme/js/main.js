;'use strict';

// Event load
$(window).load(function() {
  // Display loading...
  $('.page-loading').addClass('active');
  $('.section-home .logo').addClass('animated');

  // Slider review
  var sliderReview;
  sliderReview = $('#sliderReview').owlCarousel({
    startPosition: 1,
    items: 2,
    loop: false,
    center: true,
    margin: 60,
    animateOut: 'zoomOut',
    animateIn: 'zoomInLeft',
    smartSpeed: 500,
    autoHeight: true,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      1100: {
        items: 2,
      }
    }
  });
  $('body').on('click touchstart', '.wrapper-slider .nav-slider .prev', function(event) {
    event.preventDefault();
    sliderReview.trigger('prev.owl.carousel', [500]);
  });
  $('body').on('click touchstart', '.wrapper-slider .nav-slider .next', function(event) {
    event.preventDefault();
    sliderReview.trigger('next.owl.carousel', [500]);
  });

});

// DOM Ready
$(function(){

  // Section home height
  viewportHeight('.section-home');

  function toggleNavMenu() {
    $('.menu-nav').toggleClass('active');
    $('.gumburger').toggleClass('active');
    $('header .logo').toggleClass('active');
  }

  $('body').on('click touchstart ', '.gumburger', function(event) {
    event.preventDefault();
    toggleNavMenu();
  });

  // Scrolldown
  $('body').on('click touchstart ', '.section-home .scrolldown, .section-home .btn-prices', function() {
    $('html, body').animate({
      scrollTop: $('.section-home').outerHeight()
    }, 500);
  });

  // Navigate sections
  var triggerNavigateSections = (function() {

    $('body').on('click touchstart ', '.menu-nav a', function(event) {
      event.preventDefault();

      toggleNavMenu();

      var targetElem = $(event.target).attr('href');
      var positionElem = $(targetElem).offset().top;
      var indexSection = $(this).closest('li').index();

      $('html, body').animate({
        scrollTop: positionElem
      }, 1000 * (Math.exp(indexSection * 0.15)) - 500);
    });
  })();

  // Tooltip
  $('.tooltip').tooltipster({
    trigger: 'click',
    side: ['right', 'bottom'],
    maxWidth: 540,
    minWidth: 280,
    interactive: true,
    theme: 'tooltipster-shadow',
    contentCloning: true
  });

  // Question list
  $('body').on('click', '.section-question .list-question li', function(event) {
    event.preventDefault();
    $(this).toggleClass('active');
    $(this).find('svg').toggleClass('active');
    $(this).find('.content').toggle();
  });

  // More question
  $('body').on('click touchstart', '.section-question .more-question', function(event) {
    event.preventDefault();
    $(this).hide();
    $(this).closest('.questions').find('.list-question li').removeClass('hidden');
  });

  // Popups
  // Order-service
  $('body').on('click touchstart', '.btn-order', function(event) {
    event.preventDefault();
    $('.order-service-popup').toggleClass('active');
  });
  // Order-call
  $('body').on('click touchstart', 'header .call, .btn-order-call', function(event) {
    event.preventDefault();
    $('.order-call-popup').toggleClass('active');
  });
  // Write-us
  $('body').on('click touchstart', '.section-home .feedback, footer .btn-question', function(event) {
    event.preventDefault();
    $('.write-us-popup').toggleClass('active');
  });
  // Close popup
  $('body').on('click touchstart', '.popup .close', function(event) {
    event.preventDefault();
    $('.popup').removeClass('active');
  });
  // Close when click out block
  $(document).on('mouseup', function(event) {
    if (!$(event.target).closest(".wrapper-popup").length) {
      $('.popup').removeClass('active');
    }
  });

  // Placeholder
  // Переместить плейсхолдер если клик по нему или focus input
  var elemsOnFocus = '.popup .wrapper-inputs .placeholder, .popup .wrapper-inputs input, .popup .wrapper-inputs textarea';
  $('body').on('touchstart click focus', elemsOnFocus, function() {
    var self = $(this);
    self.siblings('.placeholder').addClass('active');
    self.addClass('active');
    self.siblings('input').focus();
    self.siblings('textarea').focus();
  });
  // Убрать если blur
  var elemsOnBlur = '.popup .wrapper-inputs input, .popup .wrapper-inputs textarea';
  $('body').on('blur load', elemsOnBlur, function(event) {
    var self = $(this);
    if ( !self.val().length ) {
      self.siblings('.placeholder').removeClass('active');
      self.removeClass('active');
    }
  });
  // Validation
  $('#form-order-service').validate({
    rules: {
      clientName: {
        required: true,
        minlength: 3,
      },
      clientPhone: {
        required: true,
      }
    },
    errorPlacement: function(error, element) {},
    submitHandler: function(form) {
      // $(form).ajaxSubmit();
      $('.done-popup').toggleClass('active');
    }
  });
  $('#form-order-call').validate({
    rules: {
      clientName: {
        required: true,
        minlength: 3,
      },
      clientPhone: {
        required: true,
      }
    },
    errorPlacement: function(error, element) {},
  });
  $('#form-write-us').validate({
    rules: {
      clientName: {
        required: true,
        minlength: 3,
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

  // Event scroll
  $(window).scroll(function(event) {
    var sectionHeight = $('.section-home').height()
    var scrollTop = $(this).scrollTop();
    var positionElemAnimate = $('.section-prices .features').offset().top;

    // paralax home when element visible
    if (scrollTop <= sectionHeight) {
      $('.section-home .info').css({
        transform: 'translate(0px, ' + scrollTop/10 + '%)'
      });
    }

    // Animate on scroll
    function animateOnScroll(triggerElem) {
      if ( scrollTop >= ( $(triggerElem).offset().top - $(window).height() + 150) ) {
        animateShowing(triggerElem + ' .animate');
      }
    }
    animateOnScroll('.section-prices .features');
    animateOnScroll('.section-services');
    animateOnScroll('.section-work .process-work');
    animateOnScroll('.section-advantages');
    animateOnScroll('.section-reviews .partners');
    animateOnScroll('.section-question');

    // Fixed header
    function fixedHeader() {
      if ( scrollTop >= 180 ) {
        $('.section-home header').addClass('active');
      } else {
        $('.section-home header').removeClass('active');
      }
    }
    fixedHeader();
  });
  
  // Event resize
  $(window).resize(function(event) {
    viewportHeight('.section-home');
  });

});

var viewportHeight = (function(elem) {
  $(elem).css({
    'min-height': $(window).height()
  });
});

// Animation show
var animateShowing = (function(element) {
  var $element = $(element);
  $element.each(function(i) {
    setTimeout(function() {
      $element.eq(i).addClass('is-showing');
    }, (600 * (Math.exp(i * 0.15))) - 600 ); // Каждая итерация увеличивает время анимации
  });
});