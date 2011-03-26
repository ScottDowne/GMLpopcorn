/*
__          __   _                          _                              
\ \        / /  | |                        | |                             
 \ \  /\  / /___| |__  _ __ ___   __ _ _ __| | _____ _ __   _ __ ___   ___ 
  \ \/  \/ // _ \ '_ \| '_ ` _ \ / _` | '__| |/ / _ \ '__| | '_ ` _ \ / _ \
   \  /\  /|  __/ |_) | | | | | | (_| | |  |   <  __/ | _  | | | | | |  __/
    \/  \/  \___|_.__/|_| |_| |_|\__,_|_|  |_|\_\___|_|(_) |_| |_| |_|\___|

          Webmarker Firefox Add-on, visit: www.webmarker.me

          - Authors: Tobias Leingruber, Greg Leuch, Jamie Wilkinson, Florian StrÃƒÂ¼be
          - Based on GML and the 000000book.com API/ GML Database

			Note: This file is a fork of Jamie Wilkinson's canvasplayer http://github.com/jamiew/canvasplayer
*/

//console.log("canvasplayer.js loading...");
function cutHex(h) {
    return (h.charAt(0) == "#") ? h.substring(1, 7) : h;
}

var ajax = function ajax(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.setRequestHeader("If-Modified-Since", "Fri, 1 Jan 1960 00:00:00 GMT");
    xhr.send(null);
    // failed request?
    if (xhr.status !== 200 && xhr.status !== 0) {
        throw ("XMLHttpRequest failed, status code " + xhr.status);
    }
    return xhr.responseText;
};

function hex2rgb2(hexcolor)
 {
    R = parseInt((cutHex(hexcolor)).substring(0, 2), 16);
    G = parseInt((cutHex(hexcolor)).substring(2, 4), 16);
    B = parseInt((cutHex(hexcolor)).substring(4, 6), 16);
    return R + ',' + G + ',' + B;
}

var unique = 0;

// *************** Callback Method ************
// ********************************************
function load_gml(data)
 {
    // TODO handle both arrays and individual items...
    // e.g. both /data.json?location=... and /data/145.json
    if (typeof(data) != 'undefined')
    {
        var i = unique++;
        gml = data.gml;

        // attach sketch script tag
        var sketch_script = document.createElement('script');
        sketch_script.setAttribute('id', 'sketch' + i);
        sketch_script.type = 'application/processing';
        document.getElementsByTagName('body')[0].appendChild(sketch_script);

        // use existing canvas tag
        var wm_cp_canvas = document.getElementById('canvas' + data.id);

        
 		var app_name = data.gml.tag.header && data.gml.tag.header.client && data.gml.tag.header.client.name;

        document.getElementById('sketch' + i).innerHTML = ajax("gmlplayer.js");

        //var canvas 	= document.getElementById('canvas' + i); // single canvas for every tag
        var canvas = document.getElementById('canvas' + data.id);
        // one canvas for all tags
        var sketch = document.getElementById('sketch' + i).text;

        // draw sketch on canvas
        var tt = new Processing(canvas, sketch);
		
        tt.setColor(Math.random()*255);

		/* 
		 * concatenate pointlists of one tag and set them as global variables, so the processing.js draw function can acces them.
		 * This is kind of a workarround because one can't give parameters to the setup or drawing functions.
  		 * Working with the iteration variable here because Objects can't be serialized and attached to the created sketch scripts, but numbers/strings can.
		 */
        pts = [];
        pts_opts = [];
        strokes = (data.gml.tag.drawing.stroke instanceof Array ? data.gml.tag.drawing.stroke: [data.gml.tag.drawing.stroke]);
       
		for (var j in strokes) {
            if (strokes[j]) {
                //pts = pts.concat(strokes[j].pt);
                /*pts_opts = pts_opts.concat({
                    stroke: (strokes[j].stroke_size || 8),
                    color: (strokes[j].color ? hex2rgb2(strokes[j].color) : '255,255,255'),
                    drips: (strokes[j].dripping || false)
                });*/
                for (var k = 0; k < strokes[j].pt.length; k++){
                    //console.log(strokes[j].pt[k].x);
                    tt.addPoint(strokes[j].pt[k].x, strokes[j].pt[k].y);

                }
                //alert(strokes[j].pt.x);
                
            }
            //pts.push(undefined);
            // blank obj to indicate new stroke
        }
		

    }
    else
    {
        // console.log('error reading gml. gml undefined');
        }
}

