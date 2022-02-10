let spriteSheet;
let spriteSheet2;
let spriteSheet3;
let character = [];
let count = 10;

function preload()
{
 spriteSheet = loadImage("SpelunkyGuy.png");
 spriteSheet2 = loadImage("Green.png");
 spriteSheet3 = loadImage("Ninja.png");
} 

function setup() 
{
 createCanvas(600, 600);
 imageMode(CENTER);

 for (i = 0; i < count; i++)
 {
   character[i] = new Character(random([spriteSheet, spriteSheet2, spriteSheet3]), random(100, 500), random(100, 500), random(1, 5), random([-1, 1]));
 }
}

function keyPressed()
{
  if (keyCode == RIGHT_ARROW)
  {
    for (i = 0; i < count; i++)
    {
      character[i].go(1);
    }    
  }
  else if (keyCode == RIGHT_ARROW)
  {
    for (i = 0; i < count; i++)
    {
      character[i].go(-1);
    }
  }    
}

function keyReleased()
{
  for (i = 0; i < count; i++)
  {
    character[i].stop();
  }    
}

function Released()
{for (i = 0; i < count; i++)
  {
   character[i].drop();
  }
}

function mouseDragged()
{
  for (i = 0; i < count; i++)
  {
   character[i].drag();
  }
}

function mousePressed()
{for (i = 0; i < count; i++)
  {
   character[i].grab();
  }
}

function draw() 
{
  background(225, 225, 225);
  for (i = 0; i < count; i++)
  {
    character[i].draw();
  }
}
     
class Character
{
  constructor(spriteSheet, x, y, speed, move)
  {
    this.spriteSheet = spriteSheet;
    this.sx = 0;
    this.x = x; 
    this.y= y;
    this.move = 0;
    this.facing = 1;
    this.speed = speed;
    this.move = move;
  }

  draw()
  {
    push();
    translate(this.x, this.y);
    scale (this.facing, 1);

    if (this.move == 0)
    {
      image(this.spritesheet, 0, 0, 100, 100, 0, 0, 80, 80);
    }
    else
    { 
      image(this.spritesheet, 0, 0, 100, 100, 80 * (this.sx + 1), 0, 80, 80);
    }
    if (frameCount % 5 == 0)
    {
      this.sx = (this.sx + 1) % 8;
    }
    this.x += 2 * this.move;

    if (this.x < 30)
    {
     this.move = 1;
     this.facing = 1;
    }
    else if (this.x > width - 30)
    {
      this.move = -1;
      this.facing = -1;
    }

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
  
  grab()
  {if (mouseX > this.x - 40 && mouseX < this.x + 40 && mouseY > this.y -40 && mouseY < this.y + 40)
    {
     this.stop();
     this.grabbed = true;
    }
  }

  drag()
  {if (grabbed)
    {
     this.x = mouseX;
     this.y = mouseY;
    }
  }

  drop()
  {if (mouseX > this.x - 40 && mouseX < this.x + 40 && mouseY > this.y -40 && mouseY < this.y + 40)
    {
     this.stop();
     this.dropped = true;
    }
  }
}
