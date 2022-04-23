let nxDial, nxButton;

let synth = new Tone.PolySynth().toDestination();
let synth2 = new Tone.PluckSynth().toDestination();
let patternNotes = ["C4", "D4", "E4", "G4", "A4"];
// let pattern = new Tone.Pattern(function(time, note)
// {
//   // synth.triggerAtaackRelease(note, 0.25, time);
// }, ["C4", "D4", "E4", "G4", "A4"], '4n');
let pattern = new Tone.Pattern((time, note)=>
{if (random(10) > 6)
  {
    synth2.triggerAttackRelease(patternNotes[Math.floor(random(5))], 0.25, time); 
  } 
}, ["C5", "D5", "E5", "G5", "A5"]);

let melody = Tone.Sequence((time, note)=>
{ if (note != null)
  {
    synth.triggerAttackRelease(note, '8n', time + 0.1);
  }
}, ["G4", "A4", null, "B4", "C5", null, "F4"]);

let chords = 
[ 
  {"time": "0:0", "note": ["C4", "E3", "G4"]},
  {"time": "0:3", "note": ["F4", "A4", "C4"]},
  {"time": "1:1", "note": ["G4", "A3", "D4"]},
  {"time": "1:2", "note": ["G4", "B4", "F4"]}
]

let chord = new Tone.Part((time, notes)=>
{
  synth.triggerAttackRelease(notes.note, "2n", time)
}, chords)
chord.loop = 8;
chord.loopEnd = '2m';

const synthA = new Tone.FMSynth().toDestination();
const synthB = new Tone.AMSynth().toDestination();

const loopA = new Tone.Loop(time =>
{
  synthA.triggerAttackRelease("C2", "8n", time);
}, "4n").start(0);
const loopB = new Tone.Loop(time =>
  {
    synthB.triggerAttackRelease("C4", "8n", time);
  }, "4n").start('8n');

  Tone.Transport.bpm.value = 90;
  
let harld;
let bug = [];
let back;
let walking;
let squished;
let grabbed;
let gamestate;
let count = 45;
let direction = [0, 90, 180, 270];
let kills = 0;
let score;

function preload()
{
  back = loadImage("grass.jpg");
  harld = loadImage("bug.png");
}

function setup()
{
  createCanvas(320, 320);
  score = 0;
  gamestate = "start";
  rectMode(CENTER);
  textAlign(CENTER);
  speed = random(1);
  for (i = 0; i < count; i++)
  {
    bug[i] = new harold(harld, random(100, width - 100), random(100, height - 100), random(1, 5), random(0, 90, 180, 270));
  }
  // harold(width / 2, height / 2, 22, 22);
  bug.scale = 0.5;
  bug.rotation = random(direction);
  // if (bug.rotation == 0)
  // {
  //   bug.setSpeed(speed, 270);
  // }
  // else if (bug.rotation == 90)
  // {
  //   bug.setSpeed(speed, 0);
  // }
  // else if (bug.rotation == 180)
  // {
  //   bug.setSpeed(speed, 90);
  // }
  // else if (bug.rotation == 270)
  // {
  //   bug.setSpeed(speed, 180);
  // }
  // walking = animate("walk", bug[i]);
  // walk.frameDelay = 8;
  // squished = bug.animate("squish", bug[i]);

  bug.onMousePressed = function()
  {
    this.changeAnimation("squish");
    this.setSpeed(0.0);
    this.life = 100;
    score++;
  }
}

function draw()
{
  background(back);
  if (gamestate == 'start')
  {
    push();
    fill("white");
    rect(width / 2, height / 2, 200, 200);
    fill(0);
    textSize(30);
    text("click to begin", width / 2, height / 2);
    pop();
    if (mouseIsPressed)
    {
      gamestate = 'play';
    }
  }
  else if (gamestate == 'play')
  {
    push();
    fill(0);
    textSize(15);
    startTime = 30;
    text("time left: " + (startTime - time) + "\n score: " + score, 50, 20);
    pop();
    harold[i].draw();
    teleport();
  }
  else if (gamestate == 'end')
  {
    push();
    fill("white");
    rect(width / 2, height / 2, 200, 200);
    fill(0);
    textSize(30);
    text("game over\n you squished " + score + "\n bugs :)", width / 2, height / 2);
    if (mouseIsPressed)
    {
      startTime = millis();
      gamestate = 'playing';
    }
    pop();
  }
}

function mouseIsPressed()
{
  let dmin = -1;
  let bug = -1;
  for (i = 0; i < count; i++)
  {
    let d = bug[i].grabCheck();
    if (d !=1)
    {
      if (dmin == -1 || d < dmin)
      {
        dmin = d;
        bug = i;
      }
    }
  }
  if (bug != 1)
  {
    bug[i].grab();
  }
}

class harold
{
  constructor(bug, x, y, speed, direction)
  {
    this.bug = bug;
    this.sx = 0;
    this.sy = 0;
    this.x = x;
    this.y = y;
    this.move = direction;
    this.facing = direction;
    this.direction = direction;
    this.grabbed = grabbed;
    this.spriteFrame = 0;
    this.squish = false;
    this.speedboost = false;
    this.speed = speed;
  }
  
  animate()
  {
    let sx, sy
    if (this.move == 0)
    {
      if (this.grabbed)
      {
        sx = 4;
        sy = 0;
      }
    }
  }

  draw()
  {
    push();
    translate(this.x, this.y);
    scale(this.facing, 1);
    
    let [sx, sy] = this.animate();
    image(this.bug, 0, 0, 80, 80, 80 * sx, 80 * sx, 80, 80);

    if (frameCount % 6 == 0)
    {
      this.spriteFrame += 1;
    }

    this.x += this.speed * this.move;
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

  grabCheck()
  {
    let d = -1;
    if (mouseX > this.x - 40 && mouseX < this.x + 40 && mouseY > this.y -40 && mouseY < this.y + 40)
    {
      d = dist(mouseX, mouseY, this.x, this.y);
    }
    return d;
  }
  
  grab()
  { this.stop();
    this.grabbed = true;
    this.offsetX = this.x - mouseX;
    this.offsetY = this.y - mouseY;
    if (this.squish == false)
    {
      kills++;
      this.squish = true;
    }
  }
}

function teleport()
{
  if(bug.position.x > width + 100)
  {
    bug.position.x = -100;
    bug.position.y = random(20, height - 20);
  }
  else if(bug.position.x < -100)
  {
    bug.position.x = width + 100;
    bug.position.y = random(20, height - 20);
  }
  else if(bug.position.y > height + 100)
  {
    bug.position.y = -100;
    bug.position.x = random(20, width - 20);
  }
  else if(bug.position.y < -100)
  {
    bug.position.y = height + 100;
    bug.position.x = random(20, width - 20);
  }
}

let time;
// let timerIsDone = false;

function timer()
{
  return int((millis() - startTime) / 1000);
  // if (time > 30)
  // {
  //   timerIsDone = true;
  // }
  // return time;
}
