( function( $ ) {
  
  //Some static data.  In a real app this would most likely be fetched from the App Cloud server and stored via bc.core.cache.

    var pageNext = {
        "page1": "#page2",
        "page2": "#page3",
        "page3": "#page4"
    }


  /*
   * The Brightcove SDK will fire an "init" event after the document is ready, the device is ready to be interacted with and any
   * locale or markup files have been loaded and populated on the bc.templates object.
   */
  $( bc ).bind( "init", initialize );
  
  function initialize() {
    registerEventListeners();
    setContentOfPage();
  }
  
  /**
   * Any event listeners we need for this view we setup here.  Note that the elements we are binding to are not yet 
   * created which is why we use the delegate syntax.
   */
  function registerEventListeners() {
    $( '.page' ).on( "swipe", function (evt, direction) {
        if(direction == 'swipeRight'){
            //we want to go back
            bc.ui.backPage();
        } else {
            //we want to go to the next page
            var idName = this.getAttribute('id');
            var nextPageId = pageNext[idName];

            if(nextPageId){
                var nextPage = $(nextPageId);
                bc.ui.forwardPage(nextPage);
            }
        }

    });
// $( '.page' ).on( "swipe", function (evt, direction) {
//        if(direction == 'swipeLeft'){
//            //we want to go back
//            back(this);
//        } else {
//            //we want to go to the next page
//            next(this);
//        }
//
//    });
//    $( "#pagetwo" ).on( "tap", ".back-button", bc.ui.backPage );
  }


  /**
   * Sets the content of the first page.  In theory you will have fetched data from the appcloud server using bc.core.getData 
   * and now you will generate HTML markup using the built in markup templating library.  Here we are simply using the static data
   * we defined at the top file and passing that to the markup associated with this view.  This association happens in the 
   * manifest.json file.  However, you can use as much or as little of our SDK as you choose, so you could also simply fetch data 
   * directly from your server and then set the content here.
   */
  function setContentOfPage() {
//    //The object we will pass to markup that will be used to generate the HTML.
//    var context = { "listitems": _data.items };
//
//    //The SDK automatically parses any templates you associate with this view on the bc.templates object.
//    var markupTemplate = bc.templates["first-page-tmpl"];
//
//    //The generated HTML for this template.
//    var html = Mark.up( markupTemplate, context );
//
//    //Set the HTML of the element.
//    $( "#first-page-content" ).html( html );
  }

  /**
   * Sets any dynamic content for the second page and then transitions to that page.
   */
  function transitionToSecondPage( evt ) {
    //We are using index of the array to determine which element was clicks, but with your data if you have unique ID that would be ideal.
    var index = $( this ).index();

    //The object we will pass to markup that will be used to generate the HTML.
    var context = { "text": _data.items[index].description };

    //The SDK automatically parses any templates you associate with this view on the bc.templates object.
    var markupTemplate = bc.templates["second-page-tmpl"];

    //The generated HTML for this template.
    var html = Mark.up( markupTemplate, context );

    //Set the HTML of the element.
    $( "#second-page-content" ).html( html );

    //Transition to the new page.
    bc.ui.forwardPage( $( "#pagetwo" ) );
  }
  
})( jQuery )