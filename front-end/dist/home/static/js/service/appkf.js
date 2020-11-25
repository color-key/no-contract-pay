showNum(0, 8, '#number1');
  showNum(0, 20, '#number2');
  showNum(970, 1000, '#number3');
  showNum(0, 30, '#number4');
  function showNum(start, end, obj) {
  var wHeight = $(window).height();
  var oHeight = $(obj).offset().top;
  $(window).scroll(function () {
      var topp = $(document).scrollTop();
      if (wHeight+topp > oHeight) {
          var t = setInterval(function () {
              if (start < end) {
              start++;
              $(obj).html(start);
              } else {
              return false;
              clearInterval(t);
              }
          }, 1000);
      }
  })
  }