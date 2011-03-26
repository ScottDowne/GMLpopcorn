// PLUGIN: GML

(function (Popcorn) {

  var processingLoaded = false,
      gmlPlayerLoaded  = false;

  Popcorn.getScript( "canvasplayer.js", function() {
    gmlPlayerLoaded = true;
  });

  Popcorn.getScript( "http://processingjs.org/content/download/processing-js-1.1.0/processing-1.1.0.js", function() {
    processingLoaded = true;
  });
  
  /**
   */
  Popcorn.plugin( "gml" , {
      
    /**
     */
    _setup : function( options ) {

      var self = this;
      

      // create a canvas to put in the target div
      options.container = document.createElement( 'canvas' );

      options.container.style.display = "none";
      options.container.setAttribute( 'id','canvas' + options.gmltag );

      options.title = document.createElement( 'div' );
      options.title.style.display = "none";
      options.title.style.color = "white";
      
      options.title.innerHTML = "#" + options.gmltag;
      

      if ( document.getElementById( options.target ) ) {
        document.getElementById( options.target ).appendChild( options.title );
        document.getElementById( options.target ).appendChild( options.container );
      }

      // makes sure both processing.js and the gml player are loaded
      var readyCheck = setInterval(function() {
        if ( !processingLoaded || !gmlPlayerLoaded ) {
          return;
        }
        clearInterval(readyCheck);
        Popcorn.getScript( "http://000000book.com/data/" + options.gmltag + ".json?callback=load_gml" );

        /*self.video.addEventListener( "pause", function() {
          Processing.getInstanceById( 'canvas' + options.gmltag ).noLoop();
        }, false );
        self.video.addEventListener( "play", function() {
          Processing.getInstanceById( 'canvas' + options.gmltag ).loop();
        }, false );*/


      }, 5);
    },
    /**
     */
    start: function( event, options ){
      Processing.getInstanceById( 'canvas' + options.gmltag ).loop();
      options.container.style.display = "block";
      options.title.style.display = "block";
    },
    /**
     */
    end: function( event, options ){
      Processing.getInstanceById( 'canvas' + options.gmltag ).noLoop();
      options.container.style.display = "none";
      options.title.style.display = "none";
    }
     
  });

})( Popcorn );

