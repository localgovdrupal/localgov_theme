(function ($) {
  $(document).ready(function () {

    var pageSearchContainer = document.querySelectorAll('.site-search');
    var pageSearchInput = document.querySelectorAll('.site-search input:not([type=submit])');
    var pageSearchButton = document.querySelectorAll('.site-search button');

    var homeSearchContainer = document.querySelector('#home-site-search');
    var homeSearchInput = document.querySelector('#home-site-search input');

    var homeSearchButton = document.querySelector('#home-site-search button');
    var homeExpandServicesLink = document.querySelector('#services--expand-link');
    var homeExpandServicesContainer = document.querySelector('#services--expand-container');
    var newsroomSearch = document.querySelector('#newsroom--search');
    var newsroomSearchToggle = document.querySelector('#newsroom--search-toggle');
    var directorySearch = document.querySelector('#directories-search-form');
    var directorySearchToggle = document.querySelector('#directories-search-form--search-toggle');
    var directorySearchFilters = document.querySelector('.directories-hide-filters');


    /* Services menu */
    $('.show-menu').click(function () {
      $('.header--expand').slideToggle();
      // $('.show-menu').find('.icon-services').toggleClass('icon-services-active');
      // $('.show-menu').find('.icon-menu-open').toggleClass('icon-menu-close');
      $('.show-menu').toggleClass('show-outline');
    });

    $('.site-menu-mobile .show-menu').click(function () {
      $('.scroll-away').fadeToggle();
    });

    $('.button-accept').click(function () {
      $('.cookies-notice').hide();
    });

    $('.alert-bar--inner a').click(function () {
      $('.alert-bar').hide();
    });

    /* Search bar */
    if (pageSearchInput) {

      for (i = 0; i < pageSearchInput.length; i++) {

        (function (i) {
          pageSearchInput[i].addEventListener("focus", function () {
            pageSearchContainer[i].style.outline = "4px solid #ffcc33";
            pageSearchButton[i].style.backgroundColor = "#008920";
            pageSearchButton[i].style.border = "1px solid #008920";
          });

          pageSearchInput[i].addEventListener("blur", function () {
            pageSearchContainer[i].style.outline = "none";
            pageSearchButton[i].style.backgroundColor = "black";
            pageSearchButton[i].style.border = "1px solid black";
          });
        }(i));
      }
    }


    if (homeSearchInput) {

      homeSearchInput.addEventListener("focus", function () {
        homeSearchContainer.style.outline = "4px solid #ffcc33";
        homeSearchButton.style.backgroundColor = "#008920";
      });

      homeSearchInput.addEventListener("blur", function () {
        homeSearchContainer.style.outline = "none";
        homeSearchButton.style.backgroundColor = "#0072B8";
      });

      //set responsive mobile input field placeholder text

      $placeholder_short = "Search our site";
      $placeholder_long = "Search our site";

      if ($(window).width() < 977) {
        $(homeSearchInput).attr("placeholder", $placeholder_short);
        homeSearchInput.addEventListener("focus", function () {
          $(homeSearchInput).attr("placeholder", "");
        });
        homeSearchInput.addEventListener("blur", function () {
          $(homeSearchInput).attr("placeholder", $placeholder_short);
        });
      }
      else {
        $(homeSearchInput).attr("placeholder", $placeholder_long);
        homeSearchInput.addEventListener("focus", function () {
          $(homeSearchInput).attr("placeholder", "");
        });
        homeSearchInput.addEventListener("blur", function () {
          $(homeSearchInput).attr("placeholder", $placeholder_long);
        });
      }
      $(window).resize(function () {
        if ($(window).width() < 977) {
          $(homeSearchInput).attr("placeholder", $placeholder_short);
          homeSearchInput.addEventListener("focus", function () {
            $(homeSearchInput).attr("placeholder", "");
          });
          homeSearchInput.addEventListener("blur", function () {
            $(homeSearchInput).attr("placeholder", $placeholder_short);
          });

        }
        else {
          $(homeSearchInput).attr("placeholder", $placeholder_long);
          homeSearchInput.addEventListener("focus", function () {
            $(homeSearchInput).attr("placeholder", "");
          });
          homeSearchInput.addEventListener("blur", function () {
            $(homeSearchInput).attr("placeholder", $placeholder_long);
          });
        }
      });
    }

    /* Homepage expand services */
    if (homeExpandServicesLink) {
      $(function () {
        $(homeExpandServicesLink).click(function () {
          if ($(this).hasClass('show')) {

            // replace the icon
            $(this).find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
            var $i = $(this).find('i');
            // replace the text
            $(this).text('Show fewer services');
            $(this).prepend($i);
            $(this).removeClass('show');
            $(homeExpandServicesContainer).addClass('fade-in');

          }
          else {
            // replace the icon
            $(this).find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
            var $i = $(this).find('i');
            // replace the text
            $(this).text('Show more services');
            $(this).prepend($i);
            $(this).addClass('show');
            $(homeExpandServicesContainer).removeClass('fade-in');
          }
        });
		$(homeExpandServicesLink).keyup(function(e) {
		  var code = e.keyCode || e.which;
		  if (code == '13') {
		    if (!$(homeExpandServicesLink).hasClass('show')) {
			  $( '#services--expand-container .services--list-block:first h3 a').focus();
			}
		  }
		});
/*         // accessibility version for tab detection
        $('body').keyup(function (e) {
          var code = e.keyCode || e.which;
          if (code == '9' && $('#services--expand-link:focus').length) {

            if ($(homeExpandServicesLink).hasClass('show')) {

              // replace the icon
              $(homeExpandServicesLink).find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
              var $i = $(homeExpandServicesLink).find('i');
              // replace the text
              $(homeExpandServicesLink).text('Show fewer services');
              $(homeExpandServicesLink).prepend($i);
              $(homeExpandServicesLink).removeClass('show');
              $(homeExpandServicesContainer).fadeIn();
              $('#services--expand-container .services--list-block:first-child h3 a').focus();

            }
            else {
              // replace the icon
              $(homeExpandServicesLink).find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
              var $i = $(homeExpandServicesLink).find('i');
              // replace the text
              $(homeExpandServicesLink).text('Show more services');
              $(homeExpandServicesLink).prepend($i);
              $(homeExpandServicesLink).addClass('show');
              $(homeExpandServicesContainer).fadeOut();
            }
          }
        }); */
      });
    }

    /* newsroom search */
    if (newsroomSearch) {
      $(newsroomSearchToggle).click(function (event) {
        event.preventDefault();
        $(newsroomSearch).slideToggle();
      });

      $(window).resize(function () {
        if ($(window).width() > 754 && newsroomSearch.style.display != 'none') {
          $(newsroomSearch).hide();
        }
      });
    }
	
	/* directory search */
    if(directorySearch){
      $(directorySearchToggle).click(function (event) {
        event.preventDefault();
        $(directorySearch).slideToggle();
		$(directorySearchFilters).slideToggle();
      });
      $(window).resize(function () {
          if($(window).width() > 754) {
            $(directorySearch).show();
			$(directorySearchFilters).show();
          }
      });  
    }


    if ($('.filters-show')) {
      $('.filters-show, .filters-hide').click(function (event) {
        event.preventDefault();
        if ($('.filters-hide').css('display') == 'none') {
          $('.filters-hide').css('display', 'block');
          $('.filters-show').hide();
        }
        else {
          $('.filters-hide').hide();
          $('.filters-show').css('display', 'block');
        }
        $('.filters-group').slideToggle(400);
      });
      $('.filters-toggle').click(function (event) {
        event.preventDefault();
        var chevron = $(this).find('span');
        var options = $(this).next('.filters-options');
        if (chevron.hasClass('fa-chevron-down')) {
          chevron.removeClass("fa-chevron-down");
          chevron.addClass("fa-chevron-up");
          options.slideDown(400);
        }
        else {
          chevron.addClass("fa-chevron-down");
          chevron.removeClass("fa-chevron-up");
          options.slideUp(400);
        }
      });
    }




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
})(jQuery);
