// Global variables  
float radius = 50.0;  
int X, Y;  
int nX, nY;  
int delay = 16;  
  
// Setup the Processing Canvas  
void setup(){  
  size( 200, 200 );  
  strokeWeight( 10 );  
  frameRate( 15 );  
  X = width / 2;  
  Y = height / 2;  
  nX = X;  
  nY = Y;    
}  
  
// Main draw loop  
void draw(){  
    
  radius = radius + sin( frameCount / 4 );  
    
  // Track circle to new destination  
  X+=(nX-X)/delay;  
  Y+=(nY-Y)/delay;  
    
  // Fill canvas grey  
  background( 100 );  
    
  // Set fill-color to blue  
  fill( 0, 121, 184 );  
    
  // Set stroke-color white  
  stroke(255);   
    
  // Draw circle  
  ellipse( X, Y, radius, radius );                    
}  
  
  
// Set circle's next destination  
void mouseMoved(){  
  nX = mouseX;  
  nY = mouseY;    
} 

/*    void setup() {
		  size(600, 500); 
		  frameRate(30); 
      background(0); 
      noLoop(); 
    };
		void manSetup( app_name, index ) { 
		  if(app_name === 'Graffiti Analysis 2.0: DustTag' || app_name === 'DustTag: Graffiti Analysis 2.0' || app_name === 'Fat Tag - Katsu Edition'){ 
  			rotation = 80; 
  			translation = [0, 500]; 
		  } else { 
			  rotation = 0; 
			  translation = [0, 0]; 
			} 
      pts + index + = pts; 
      pts_opts + index +  = pts_opts; 
      strokeCount+index+ = 0; 
		}; 
		void draw() { 
		  i = frameCount % pts+index+.length; 
		  prev = pts+index+[i-1]; 
		  pt = pts+index+[i]; 
      if(i == 0){ background(0); } 
		  if(pt == undefined || pt == []){ 
  			strokeCount+i)++; 
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
		};*/
