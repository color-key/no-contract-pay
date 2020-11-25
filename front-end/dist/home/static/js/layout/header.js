jQuery(document).ready(function() {
  var qcloud = {};
  $('.fay-t-nav').hover(function() {
    var _nav = $(this).attr('role');
    clearTimeout(qcloud[_nav + '_timer']);
    qcloud[_nav + '_timer'] = setTimeout(function() {
      $('.fay-t-nav').each(function() {
        $(this)[_nav == $(this).attr('role') ? 'addClass' : 'removeClass']('nav-up-selected');
      });
      $('#' + _nav).stop(true, true).slideDown(0);
    }, 0);
  }, function() {
    var _nav = $(this).attr('role');
    clearTimeout(qcloud[_nav + '_timer']);
    qcloud[_nav + '_timer'] = setTimeout(function() {
      $('.fay-t-nav').removeClass('nav-up-selected');
      $('#' + _nav).stop(true, true).slideUp(0);
    }, 0);
  });
});

$(document).ready(function() {
  $(document).scroll(function() {
      var top = $(document).scrollTop();
      if (top > 42) {
          $('#head-v3').addClass('new-head');
          $('#head-box').addClass('head-box');
      } else if (top < 42) {
          $('#head-v3').removeClass('new-head');
          $('#head-box').removeClass('head-box');
      }
  });
});

var nav = document.getElementById("menu-piece");
var links = nav.getElementsByTagName("li");
var lilen = nav.getElementsByTagName("a");
var currenturl = document.location.href;
var last = 0;
for (var i = 0; i < links.length; i++){
    var linkurl = lilen[i].getAttribute("href");
    if (currenturl.indexOf(linkurl) != -1) {
        last = i;
    }
}
links[last].className = "menu_on";