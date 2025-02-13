$(function () {

  var MOBILECONS = 767;

  function showCaptionFromAlt(selector) {
    $(selector).each(function () {
      $(this).after('<span class="img-caption">' + $(this).attr('alt') + '</span>');
    });
  };

  // Function to start searching when user clicked in the search icon
  $('#search').on('submit', function (e) {
    // Remove default events from form
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
    // Activation keys are pressed, which causes the search function
    $('#search-query').trigger('input');
  })
  // Captions are not automatically shown anymore by default; uncomment to reenable them
  //showCaptionFromAlt("article img");

  // Control the sizes of sidebar and content part (saved, dynamic changed, etc.)
  function apiDocSizeControl() {
    "use srtict"
    function resizableTOC() {
      // Get started space parameters
      var startSidebarWidth = $('#sidetoggle').width();
      var contentMargin = + $($('.article.grid-right')[0]).css('marginLeft').split('px')[0];

      if (localStorage.getItem('sizes') != null) {
        // Get the sizes from local storage
        var sizes = JSON.parse(localStorage.getItem('sizes'));

        sidebarSizeDivide = sizes.sidebarWidth - startSidebarWidth;
        // Set width to sidebar
        $('#sidetoggle').css('width', sizes.sidebarWidth);
        // Set sizes for content part
        $($('.article.grid-right')[0]).css({
          'marginLeft': contentMargin + sidebarSizeDivide
        });
        // Wait, while filter is availiable
        var filterTimer = setInterval(function () {
          if ($($('.sidefilter')[0]).length > 0) {
            var filter = $($('.sidefilter')[0]);
            // Set filter width
            filter.css('width', sizes.sidebarWidth);
            filter.show();
            // Clear inteval for filter
            clearInterval(filterTimer);

          }
        }, 100);
        $('.container.body-content.hide-when-search').show();
        // If object "sizes" don't saved
      } else {
        $('.container.body-content.hide-when-search').show();
      }
      // Start resizable function
      $('#sidetoggle').resizable({
        containment: ".container.body-content.hide-when-search",
        handles: 'e',
        maxWidth: 570,
        minWidth: 140,
        resize: function (event, ui) {
          // Get difference in sizes between start and end
          var sidebarSizeDivide = ui.size.width - startSidebarWidth;
          // Create "Sizes" object
          var sizes = {
            sidebarWidth: ui.size.width,
          }
          // Set sizes for content part
          $($('.article.grid-right')[0]).css({
            'marginLeft': contentMargin + sidebarSizeDivide
          });
          $($('.sidefilter')[0]).css('width', sizes.sidebarWidth);
          localStorage.setItem('sizes', JSON.stringify(sizes))
        }
      });
    }
    // If user on the one of the doc page (API, Manual, ReleaseNotes)
    if ($('#sidetoggle').length > 0) {
      resizableTOC();
      var filterTimer = setInterval(function () {
        if ($($('.sidefilter')[0]).length > 0) {
          var filter = $($('.sidefilter')[0])
          filter.show();
          // Clear inteval for filter
          clearInterval(filterTimer);
        }
      }, 100);
      // If user on start page or somewhere else
    } else {
      $('.container.body-content.hide-when-search').show();
      localStorage.clear();
    }
  }

  function apiSidebarStructureControl() {
    var tocInterval = setInterval(function () {
      if ($('#toc').length > 0) {
        clearInterval(tocInterval);
        if (localStorage.getItem('sidebarStructure') != null) {
          getActiveItems();
        }
        setActiveItems();
      }
    }, 100)
  }

  function setActiveItems() {
    $('#toc ul li a').on('click', function () {
      var activeItems = [];
      $('#toc ul li.in a').each(function () {
        if ($(this).parent().hasClass('in')) {
          activeItems.push($(this).attr('title'));
        };
      });
      var sidebarStructure = {
        activeItems: activeItems,
        scroll: $('#sidetoc').scrollTop()
      }
      localStorage.setItem('sidebarStructure', JSON.stringify(sidebarStructure));
    })
  }
  function getActiveItems() {
    var sidebarStructureOut = JSON.parse(localStorage.getItem('sidebarStructure'));
    var savedActiveItems = sidebarStructureOut.activeItems;
    for (var i = 0; i < savedActiveItems.length; i++) {
      $('#toc ul li a[title="' + savedActiveItems[i] + '"]').each(function () {
        $(this).parent().addClass('in');
      })
    }
    $('#sidetoc').scrollTop(sidebarStructureOut.scroll)
  }
  if ($(window).width() > MOBILECONS) {
    apiDocSizeControl();
    apiSidebarStructureControl();
  } else {
    localStorage.clear();
  }
  $(window).on('resize', function () {
    removeResizable();
    if ($(window).width() > MOBILECONS) {
      $('.container.body-content.hide-when-search').show();
    } else {
      localStorage.clear();
    }
  })
  function removeResizable() {
    if ($(window).width() <= MOBILECONS) {
      $($('.article.grid-right')[0]).removeAttr('style');
      $($('#sidetoggle')[0]).removeAttr('style');
      var filterTimer = setInterval(function () {
        if ($($('.sidefilter')[0]).length > 0) {
          var filter = $($('.sidefilter')[0])
          filter.removeAttr('style');
          // Clear inteval for filter
          clearInterval(filterTimer);
        }
      }, 100);
    }
  }
  function redirectToCurrentDocVersion() {
    $('#stride-current-version').on('change', function () {
      var hostVersion = window.location.host;
      var pathVersion = window.location.pathname;
      var targetVersion = $("#stride-current-version").val();

      // Generate page URL in other version
      var newAddress = '//' + hostVersion + '/' + targetVersion + '/' + pathVersion.substring(pathVersion.indexOf('/', 1) + 1);
      // Check if address exists
      $.get(newAddress)
        .fail(function() {
          // It didn't work, let's just go to top page of the section (i.e. manual, api, release notes, etc.)
          newAddress = '//' + hostVersion + '/' + targetVersion + '/' + pathVersion.split('/')[2];
          if (pathVersion.split('/').length >= 4)
            newAddress += '/' + pathVersion.split('/')[3];
        })
        .always(function() {
          // Go to page
          $(window).attr('location', newAddress);
        });
    })
  }

  // Language check function

  var siteLang = [];
  $('#x_head_langList li *[data-language]').each(function () {
    siteLang.push($(this).data('language'))
  });

  var currentLang = window.location.pathname.split("/")[1];
  var changedItem = $('*[data-language="' + currentLang + '"]');
  var savedText = changedItem.text();
  changedItem.replaceWith($('<span>' + savedText + '</span>'));

  for (var i = 0; i < siteLang.length; i++) {
    if (siteLang[i] != currentLang) {
      var changedItemInner = $('*[data-language="' + siteLang[i] + '"]')
      var savedTextInner = changedItemInner.text();
      changedItemInner.replaceWith($('<a data-language="' + siteLang[i] + '">' + savedTextInner + '</a>'));
    }
  }

  $('#x_head_langList li a').on('click', function () {
    var patt = /\/(en|jp|ru)\//;
    var lang = "/" + $(this).data('language') + "/";
    window.location.href = window.location.href.replace(patt, lang);
  });

  $('body').on('click', function (event) {
    if ($(event.target).hasClass('page-link')) {
      $('html, body').scrollTop(0)
    }
  });

  lowercaseBreadcrumbs();

  function lowercaseBreadcrumbs() {
    $('#breadcrumb .breadcrumb li a').each(function () {
      if ($(this).attr('href').toLowerCase() != 'releasenotes') {
        $(this).attr('href', $(this).attr('href').toLowerCase())
      }
    })
  };

  $('img').filter(function () { return $(this).parent().is(":not(.stride-documentation-image)"); }).each(function () {
    $(this).wrap('<a class="maximize_image" href=' + $(this).attr('src') + '></a>').parent().html()
  });

  $('.maximize_image').magnificPopup({
    type: 'image'
  });

  function loadVersions() {
    $.getJSON('/versions.json', function(data) {
      $("#stride-current-version").empty();
      data.versions.forEach(function(version) {
        var url = version;
        $("#stride-current-version").append('<option value="' + url + '">' + version + '</option>');
      });
      var urlSplits = window.location.pathname.split('/');
      var urlVersion = urlSplits[1];
      if (urlVersion == 'latest') {
        urlVersion = data.versions[0];
      }
      $("#stride-current-version").val(urlVersion).change();
      redirectToCurrentDocVersion();
    });
  };
  loadVersions();
});

function toggleLangDropDown(){
  document.getElementById('x_head_langList').classList.toggle('lang-btn-drpdown-show');
}