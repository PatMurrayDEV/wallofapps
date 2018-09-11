
function Paginator(items, page, per_page) {

  var page = page || 1,
    per_page = per_page || 7,
    offset = (page - 1) * per_page,

    paginatedItems = items.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(items.length / per_page);
  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: (total_pages > page) ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems
  };
}


function layOutScreen(feed) {

  $("#grid").empty();

  var apps = feed;

  var count = (apps.length / 7) + 1;

  var width = window.innerWidth

  console.log(width)
  var size = window.innerHeight / 7

  console.log(size)

  var repeat = width / ((count-1) * (size + 2))  

  console.log(repeat)

  console.log(apps.length);

  if ( repeat > 1 ) {
    for (let index = 0; index < repeat; index++)  {
      apps = apps.concat(apps)
    }
  }

  console.log(apps.length);

  count = (apps.length / 7) + 1;


  for (let index = 1; index < count; index++) {
    var elements = Paginator(apps, index)
    if (elements.data.length == 7) {
      var subgrid = $('<div class="sub-grid"></div>');
      elements.data.forEach(app => {
        var url = app.artworkUrl100;
        var obj = '<div style="background-image: URL(' + url + ')"></div>'
        $(subgrid).append(obj)
      });
      $("#grid").append(subgrid)
    }
  }

  $('#grid').marquee({
    //speed in milliseconds of the marquee
    duration: 10000,
    //gap in pixels between the tickers
    gap: 0,
    //time in milliseconds before the marquee will start animating
    delayBeforeStart: 0,
    //'left' or 'right'
    direction: 'left',
    //true or false - should the marquee be duplicated to show an effect of continues flow
    duplicated: true,
    allowCss3Support: false
   });
}



$( "body" ).dblclick(function() {
  toggleFullScreen()
});

function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  
}