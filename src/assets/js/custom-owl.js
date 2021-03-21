var changeSlide = 3; // mobile -1, desktop + 1
// Resize and refresh page. slider-two slideBy bug remove
var slide = changeSlide;
          if ($(window).width() < 900) {
             var slide = changeSlide;
              slide--;
          }
          else if ($(window).width() > 1200) {
             var slide = changeSlide;
              slide++;
          }
          else{
           var slide = changeSlide;
          }
 $(document).ready(function() {
    $("#owl-news").owlCarousel({
        nav: true,
        items: 4,
        margin: 15,
        responsive: {
            0: {
                items: 1,
                slideBy: 1
            },
            450: {
                items: changeSlide - 1,
                slideBy: changeSlide - 1
            },
            600: {
                items: changeSlide,
                slideBy: changeSlide
            },
            1000: {
                items: changeSlide + 1,
                slideBy: changeSlide + 1
            }
        }
    });
  });