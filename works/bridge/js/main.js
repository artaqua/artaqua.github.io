;'use strict';
(function() {

  // Display loading...
  $(window).load(function() {
    $('.page-loading').addClass('active');
  });
  
  $(document).ready(function() {

    // Gumburger
    $('header .gumburger').on('click', function(event) {
      var $logoWhite = $('header .logo .img-white');
      $(this).toggleClass('active');
      if ($logoWhite.hasClass('active')) {
        $logoWhite.removeClass('active');
      } else {
        $logoWhite.addClass('active');
      }
      $('.full-screen-nav').toggleClass('active');
    });

    // Multiscroll
    $('#multiscroll').multiscroll({
      navigation: true,
      easing: 'easeInOutSine'
    });

    // Header fixed mobile
    $(window).scroll(function(event) {
      var wScroll = $(this).scrollTop();
      var $target = $('header');

      if ( $(window).width() <= 1000 ) {
        if ( wScroll >= $target.outerHeight() ) {
          $target.addClass('active');
        } else {
          $target.removeClass('active');
        }
      }
    });

    // Height mobile section
    function heightChange() {
      $('.mobile-sections .bg-slide').outerHeight($(window).height());
      $('.mobile-sections .section').css({
        'min-height': $(window).height()
      });
    }
    heightChange();

    $(window).resize(function(event) {
      heightChange();
      if ( $(window).width() > 1000 ) {
        $('header').removeClass('active');
      }
    });
    $(window).on("orientationchange", function(){
      heightChange();
    });

    

  });

})();