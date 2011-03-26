// Global variables  
float radius = 50.0;  
int X, Y;  
int nX, nY;  
int delay = 16;  
int color = 255;
  
// Setup the Processing Canvas  


ArrayList points;  

void setup(){  
  size( 200, 200 );  
  strokeWeight( 10 );  
  frameRate( 15 );  
  X = width / 2;  
  Y = height / 2;  
  nX = X;  
  nY = Y;    
	points = new ArrayList();
}  

void setColor(int col){
	color = col;
	
}

void addPoint(int x, int y) {  
  Point pt = new Point(x,y);  
  points.add(pt);  
 // return pt;   
 }
  
// Main draw loop  
void draw(){  
       
  // Fill canvas grey  
  background( color );  
    
  for(int p=0, end=points.size(); p<end; p++) {  
    Point pt = (Point) points.get(p);  
    if(p<end-1) {  
      Point next = (Point) points.get(p+1);  
      line(pt.x,pt.y,next.x,next.y); }  
    pt.draw(); }                 
}  
  
  
// Set circle's next destination  
void mouseMoved(){  
  nX = mouseX;  
  nY = mouseY;    
} 


class Point {
	  int x,y;
	  Point(int x, int y) { this.x=x; this.y=y; }
	  void draw() {
	    stroke(255,0,0);
	    fill(255);
	    ellipse(x,y,10,10); 
    }
}