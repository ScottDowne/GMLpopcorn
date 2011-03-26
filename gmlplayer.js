// Global variables  
String app_name = "";  
int index = 0;
var doneSetup = false;
var data_object = {};
  
// Setup the Processing Canvas  
void setup(){  
		  size(600, 500); 
		  frameRate(30); 
      background(0); 
      noLoop(); 
}  

void manSetup( app_nameNew, indexNew ){
      //console.log( app_nameNew );
      app_name = app_nameNew;
      index = indexNew;
		  if(app_name == 'Graffiti Analysis 2.0: DustTag' || app_name == 'DustTag: Graffiti Analysis 2.0' || app_name == 'Fat Tag - Katsu Edition'){ 
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
      data_object["pts_opts" + index ] = pts_opts;
      data_object["strokeCount" + index ] = 0;
      doneSetup = true;
}
  
// Main draw loop  
void draw(){
  if (doneSetup) {
		  i = frameCount % data_object["pts"+index].length; 
		  prev = data_object["pts"+index][i-1]; 
		  pt = data_object["pts"+index][i]; 
      if(i == 0){ background(0); } 
		  if(pt == undefined || pt == []){ 
  			data_object["strokeCount" + index ]++; 
  			return; 
		  } 
		  if(prev == undefined || prev == []){ 
  			prev = pt; 
		  } 
		  dimx = (prev.x -pt.x)*width; 
		  dimy = (prev.y -pt.y)*height; 
  		hyp = 1/(sqrt(pow(dimx,2),pow(dimy,2)) + 20); 
		  translate(translation[0], translation[1]); 
		  rotate(rotation); 
		  num = (pow(hyp,0.5)*90); 
  		strokeWeight(num); 
      var colors = ['255','255','255']; 
		  stroke(colors[0],colors[1],colors[2]); 
		  line(prev.x*width, prev.y*height, pt.x*width, pt.y*height);
  }
}  
 

