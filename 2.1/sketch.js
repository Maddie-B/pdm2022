let laugh = new Tone.Player('laugh.wav');
let applause = new Tone.Player('applause.wav');
let moo = new Tone.Player('moo.wav');
let intro = new Tone.Player('count.wav');
let over = new Tone.Player('retro.wav');
let button;

function setup()
{
  createCanvas (600, 400);
  laugh.toDestination();
  button = createButton('laugh');
  button.position(70, 200);
  button.mousePressed(()=>playSound('laugh'));
  applause.toDestination();
  button = createButton('applause');
  button.position(170, 200);
  button.mousePressed(()=>playSound('applause'));
  moo.toDestination();
  button = createButton('moo');
  button.position(300, 200);
  button.mousePressed(()=>playSound('moo'));
  intro.toDestination();
  button = createButton('intro');
  button.position(400, 200);
  button.mousePressed(()=>playSound('intro'));
  over.toDestination();
  button = createButton('over');
  button.position(500, 200);
  button.mousePressed(()=>playSound('over'));
}

function draw()
{
  background(0);
}

function playSound(whichSound)
{
  if (whichSound === 'laugh')
  {
    laugh.start();
  }
  else if (whichSound === 'applause')
  {
    applause.start();
  }
  else if (whichSound === 'moo')
  {
    moo.start();
  }
  else if (whichSound === 'intro')
  {
    intro.start();
  }
  else if (whichSound === 'over')
  {
    over.start();
  }
}
