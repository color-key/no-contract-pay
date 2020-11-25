jQuery(".fullSlide").slide({
  titCell: ".hd ul",
  mainCell: ".bd ul",
  effect: "fold",
  autoPlay: true,
  autoPage: true,
  interTime: "4500",
  trigger: "click",
});

jQuery(".slideTxtBox").slide({
  effect: "left",
  trigger: "click"
});

$(function() {
  var x = 10;
  var y = 20;
  $("a.tooltip").mouseover(function(e) {
      this.myTitle = this.title;
      this.title = "";
      var imgTitle = this.myTitle ? "<br />" + this.myTitle + " " : "";
      var tooltip = "<div id='tooltip'><img src='" + this.href + "' alt='' />" + imgTitle + "";
      $("body").append(tooltip);
      $("#tooltip").css({
          "top": (e.pageY + y) + "px",
          "left": (e.pageX + x) + "px"
      }).show("fast");
      100
  }).mouseout(function(e) {
      this.title = this.myTitle;
      $("#tooltip").remove();
  }).mousemove(function(e) {
      $("#tooltip").css({
          "top": (e.pageY + y) + "px",
          "left": (e.pageX + x) + "px"
      });
  });
})

$(document).ready(function() {
  $(".side_nav").hover(function() {
      $(this).find("div").stop().animate({
          right: "0",
          opacity: 1
      }, "fast").css("display", "block")
  }, function() {
      $(this).find("div.gr1").stop().animate({
          right: "-135",
          opacity: 1
      }, "fast")
  });
});
$(document).ready(function() {
  $(".gr2").each(function() {
      $(this).mouseover(function() {
          $(this).addClass("gr2_on");
      });
      $(this).mouseout(function() {
          $(this).removeClass("gr2_on");
      });
  });
});
$(function() {
  $(".showbox").click(function() {
      $("#TB_overlayBG").css({
          display: "block",
          height: $(document).height()
      });
      $(".box").css({
          left: ($("body").width() - $(".box").width()) / 2 - 20 + "px",
          top: ($(window).height() - $(".box").height()) / 20 + $(window).scrollTop() + "px",
          display: "block"
      });
  });
  $(".close").click(function() {
      $("#TB_overlayBG").css("display", "none");
      $(".box ").css("display", "none");
  });
})

var t = setTimeout(function() {
  $('.new-footer-cont').animate({
      top: 0,
      bottom: 0
  });

  $('.new-footer-cont-bg').css({
      'display': 'block'
  });
}, 30000);

$('.new-footer-cont .new-footer-cont-close,.new-footer-cont-bg').click(function(ev) {
  $('.new-footer-cont').animate({
      top: '-150%',
      bototm: '100%'
  });

  $('.new-footer-cont-bg').css({
      'display': 'none'
  });

  var t = setTimeout(function() {
      $('.new-footer-cont').animate({
          top: 0,
          bottom: 0
      });

      $('.new-footer-cont-bg').css({
          'display': 'block'
      });
  }, 30000);

});