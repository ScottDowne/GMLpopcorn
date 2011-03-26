// Global variables
String app_name = "";
int index = 0;
var doneSetup = false;
var data_object = {};
var options = {};
var video = document.getElementById("video");
var x, y, rotation = false; 
var dur;

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


function drawLine(x,y,x2,y2) {
    _x = rotation ? y*height : x*width;
    _y = rotation ? width-(x*width) : y*height;
    _x2 = rotation ? y2 * height : x2*width;
    _y2 = rotation ? width - (x2 * width) : y2*height;
    stroke(0);
    strokeWeight(8);
    strokeCap(SQUARE);
    line(_x,_y,_x2,_y2);
    stroke(255);
    strokeWeight(4);
    strokeCap(ROUND);
    line(_x,_y,_x2,_y2);
    //ol = { x: _x, y: _y, x2: _x2, y2: _y2 };
}


// Main draw loop
void draw() {
	
	//var dur = (options.end - options.start);
    

    if (doneSetup) {
        
		var pct = (video.currentTime - options.start) / dur;
		//console.log( (video.currentTime - options.start));
	  	//console.log(pct);

 		background(0);
		var nPoints = data_object["pts" + index].length;
		if (pct < 0 || pct > 1) return;
		var howMany = pct * nPoints;
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
	        line(prev.x * width, prev.y * height, pt.x * width, pt.y * height);
		}
	}
}
	
}


