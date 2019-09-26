(function($) {

  $(document).ready(function () {
    $('.hide-map').click(function () {
      $('.directories-map').hide();
      $('.show-map').show();
      $('.hide-map').hide();
    });
    $('.show-map').click(function () {
      $('.directories-map').show();
      $('.hide-map').show();
      $('.show-map').hide();
    });
    $('.hide-filters').click(function () {
      $('.filter-wrapper').slideUp(400);
      $('.show-filters').show();
      $('.hide-filters').hide();
    });
    $('.show-filters').click(function () {
      $('.filter-wrapper').slideDown(400);
      $('.hide-filters').show();
      $('.show-filters').hide();
    });
    $('.filtertoggle').click(function (event) {
      event.preventDefault();
      var filterID = $(this).attr('href');
      var fontawes = $(this).find('span.fa');
      if ($(filterID).hasClass("open")) {
        $(fontawes).removeClass("fa-chevron-up");
        $(fontawes).addClass("fa-chevron-down");
        $(filterID).slideUp().removeClass("open");
      }
      else {
        $(fontawes).removeClass("fa-chevron-down");
        $(fontawes).addClass("fa-chevron-up");
        $(filterID).slideDown().addClass("open");
      }
    })
    $( 'input[type=checkbox]' ).each(function() {
      if($(this).prop('checked')) {
	    $(this).parents( '.checkbox-wrapper' ).addClass( "open" ).css({"display": "block"});
	  }
    });	
  });
  
}) (jQuery);
