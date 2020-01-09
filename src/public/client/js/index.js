(function () {
  'use strict'
  $(function(){
    $(document).ready(function(){
      $('.nav-show').click(function(){
        $('.category-box').slideDown(500);
        $(this).hide(200);
        $('.nav-close').show(200);
      })
      $('.nav-close').click(function(){
        $('.category-box').slideUp(200);
        $(this).hide(200);
        $('.nav-show').show(200);
      })
    })
  })
})();