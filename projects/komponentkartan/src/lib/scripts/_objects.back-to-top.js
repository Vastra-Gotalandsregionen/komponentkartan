var clickHandlerRegistered = false;

$(function () {

  $(window).scroll(function () {
    if (!clickHandlerRegistered) {
      $('.back-to-top').click(function () {
        $('body,html').animate({
          scrollTop: 0
        }, 800);
        return false;
      });
      clickHandlerRegistered = true;
    }

    //ScrollY funkar inte i IE, använd ScrollTop isåfall
    if (window.scrollY && window.scrollY > 0)
      $('.back-to-top').fadeIn();
    else if (document.documentElement.scrollTop > 0)
      $('.back-to-top').fadeIn();
    else
      $('.back-to-top').fadeOut();
  });
});
