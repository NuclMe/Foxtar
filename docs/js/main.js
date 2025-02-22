$(function(){
  $(".js-range-slider").ionRangeSlider({
    type: "double",
    min: 0,
    max: 1000,
    from: 0,
    to: 600,
    prefix: "$",
    skin: "round"
  });

  $('input, select').styler();

  var mixer = mixitup('.lets__check__container');

  $('.slider__wrapper').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    dots: true
  });

      $(".tabs__wrapper .tab").click(function () {
        $(".tabs__wrapper .tab").removeClass("active").eq($(this).index()).addClass("active");
        $(".tabs__wrapper .tab-item").hide().eq($(this).index()).fadeIn()
      }).eq(0).addClass("active");


      $(".up").on("click", "a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
          top = $(id).offset().top;
        $('body,html').animate({
          scrollTop: top
        }, 500);
      });
});