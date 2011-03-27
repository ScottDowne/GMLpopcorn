// Global variables
String app_name = "";
int index = 0;
var doneSetup = false;
var data_object = {};
var options = {};
var video = document.getElementById("video");
var x, y, rotation = false; 
var dur;
var drawingDur;


// Setup the Processing Canvas
void setup() {
    size(600, 500);
    frameRate(30);
    background(0);
    noLoop();
}

void manSetup(app_nameNew, indexNew, optionsIncoming) {
    options = optionsIncoming;
 //   console.log(options.start);
//	 console.log(options.end);
	
	dur = (options.end - options.start);
	if (options.endDrawing != null){
		//console.log("yay");
		drawingDur = (options.endDrawing - options.start);
	} else {
		drawingDur = dur;
	}
//	console.log(dur);
	
    app_name = app_nameNew;
    index = indexNew;
    if (app_name == 'Graffiti Analysis 2.0: DustTag' || app_name == 'DustTag: Graffiti Analysis 2.0' || app_name == 'Fat Tag - Katsu Edition') {
        rotation = 80;
        translation = [0, 500];
    } else {
        rotation = 0;
        translation = [0, 0];
    }
    //eval( "pts" + index + " = pts");
    //pts_opts + index +  = pts_opts;
    //strokeCount+index+ = 0;
    data_object["pts" + index] = pts;
    data_object["pts_opts" + index] = pts_opts;
    data_object["strokeCount" + index] = 0;
    doneSetup = true;
}


function drawLine(x,y,x2,y2, alpha) {
    _x = rotation ? y*height : x*width;
    _y = rotation ? width-(x*width) : y*height;
    _x2 = rotation ? y2 * height : x2*width;
    _y2 = rotation ? width - (x2 * width) : y2*height;
    stroke(0,0,0,255 * (alpha/255.0));
    strokeWeight(num);
    strokeCap(SQUARE);
    line(_x,_y,_x2,_y2);
    stroke(alpha, alpha, alpha);
    strokeWeight(num-2.5);
    strokeCap(ROUND);
    line(_x,_y,_x2,_y2);
    //ol = { x: _x, y: _y, x2: _x2, y2: _y2 };
}


// Main draw loop
void draw() {
	
	//var dur = (options.end - options.start);
    
	var alpha = 255;

    if (doneSetup) {
        
		var pct = (video.currentTime - options.start) / dur;
		var drawingPct = (video.currentTime - options.start) / drawingDur;
		
		if (options.endDrawing != null){
			// how done are we?
			if (video.currentTime >= options.endDrawing){
					
				alpha = (1 - ((video.currentTime - options.endDrawing) / (options.end - options.endDrawing)))*255;
			}
		}
	
		if (drawingPct > 1) drawingPct = 1;
		
		//console.log( (video.currentTime - options.start));
	  	//console.log(pct);

 		background(0);
		var nPoints = data_object["pts" + index].length;
		if (pct < 0 || pct > 1) return;
		var howMany = drawingPct * nPoints;
	    for (var i = 0; i < howMany; i++){
			if (i > 0){
			 prev = data_object["pts" + index][i - 1];
		     pt = data_object["pts" + index][i];
			if (pt == undefined || pt == []) {
	            data_object["strokeCount" + index]++;
	            return;
	        }
	        if (prev == undefined || prev == []) {
	            prev = pt;
	        }
	
			dimx = (prev.x - pt.x) * width;
	        dimy = (prev.y - pt.y) * height;
	        hyp = 1 / (sqrt(pow(dimx, 2), pow(dimy, 2)) + 20);
	       	//translate(translation[0], translation[1]);
	        //rotate(rotation);
	        num = (pow(hyp, 0.5) * 90);
	        strokeWeight(num);
	        var colors = ['255', '255', '255'];
	        stroke(colors[0], colors[1], colors[2]);
		//line(prev.x, prev.y , pt.x, pt.y);

	        drawLine(prev.x, prev.y , pt.x, pt.y, alpha);
		}
	}
}
	
}


