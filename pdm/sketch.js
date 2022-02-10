{
  let character;
  let character2;

  function preload()
 {
   spriteSheet = loadImage("SpelunkyGuy.png");
 } 

  function setup() 
 {
   createCanvas(600, 600);
   imagemode(CENTER);
   character = new Character(spriteSheet, 0, 300);
   character2 = new Character(spriteSheet, 300, 300);
 }

 function keyPressed()
 {
   if (keyCode == RIGHT_ARROW)
     {
       character.go(1);
       character2.go(1);
     }
   else if (keyCode == LEFT_ARROW)
     {
       character.go(-1);
       character2.go(-1);
     }
 }

 function keyReleased()
 {
   character.stop();
   character2.stop();
 }

 function draw() 
 {
   background(225, 225, 225);
   character.draw();
   character2.draw();
 }

 let temp = Character()
     
 class Character
 {
   constructor(spriteSheet, x, y)
   {
     this.spriteSheet = spriteSheet;
     this.sx = 0;
     this.x = x; 
     this.y= y;
     this.move = 0;
     this.facing = 1;
   }
 }

 draw()
 {
   push();
   translate(this.x, this.y);
   scale (this.facing, 1);
   if (this.move == 0)
     {
       image(this.spritesheet, 0, 0, 200, 200, 0, 0, 80, 80);
     }
   else
     {
       image(this.spritesheet, 0, 0, 200, 200, 80 * (this.sx + 1), 0, 80, 80);
     }
   if (frameCount % 5 == 0)
     {
       this.sx = (this.sx + 1) % 8;
     }
   this.x += 2 * this.move;
   pop();
 }

 go(direction)
 {
   this.move = direction;
   this.facing = direction;
   this.sx = 3;
 }

 stop()
 {
   this.move= 0;
 }

}