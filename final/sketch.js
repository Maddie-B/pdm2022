let serialPDM;
let portName = 'COM3';

const synth = new Tone.MonoSynth({
  oscillator : 
  { type: "sine"},
  envelope : { attack: 0.1}}).toDestination(); 

let note = {
 DOWN_ARROW : 'C5',
 UP_ARROW : 'D5',
 LEFT_ARROW : 'E5',
 RIGHT_ARROW : 'F5'
}

let play;

let L = 30;
let snake = [];
let n = 3;
let pause = true;
let t = 0;
let dir;
let direction;
let gameover = false;
let ate = false;
let count = 0;

function setup()
{ createCanvas(600, 600);
  background(0, 168, 107);
  for (let i = 0; i < n; i++)
  { snake.push(new Segment(i, 300 - L * i, 300));
    snake[i].show();
  }
  dir = createVector(1, 0);
  apple = new Fruit();
  apple.show();
  serialPDM = new PDMSerial(portName);
  console.log(serialPDM.inData);
  sensors = serialPDM.sensorData;
}

function draw()
{ if (!pause)
  { if (gameover)
    { background('black');
      textAlign(CENTER);
      textSize(32);
      text('GAME OVER', width / 2, 0.1 * height);
      textAlign(RIGHT, TOP);
      textSize(20);
      text('score : ' + count, width / 4, 0.8 * height);
    }
    else 
    { if (ate)
      { apple = new Fruit();
        ate = false;
        count++;
      }
      background(0, 168, 107);
      apple.show();
      checkkey();
      t = t + 1;
      if (t % 10 == 0)
      { for (let i = n - 1; i > 0; i--)
        { snake[i].update(snake[i - 1].x, snake[i - 1].y);
        }
        snake[0].move(L * dir.x, L * dir.y);
      }
      for (let i = 0; i < n; i++)
      { snake[i].show();
      }
      checkSeg();
      checkAte();
      direction = sensors.direction;
      let tbd = false;
      if (mousePressed)
      { if (tbd == false)
        { Tone.start();
          tbd = true;
        }

      }
      // keyPressed();
    }  
  }
}

function checkkey()
{ if (keyIsDown(DOWN_ARROW))
  { dir = createVector(0, 1);
    // synth.triggerAttackRelease("C5", "16n");
  }
  if (keyIsDown(UP_ARROW))
  { dir = createVector(0, -1);
    // synth.triggerAttackRelease("D5", "16n");
  }
  if (keyIsDown(LEFT_ARROW))
  { dir = createVector(-1, 0);
    // synth.triggerAttackRelease("E5", "16n");
  }
  if (keyIsDown(RIGHT_ARROW))
  { dir = createVector(1, 0);
    // synth.triggerAttackRelease("F5", "16n");
  }
}

function checkSeg()
{ for (let i = 1; i < n; i++)
  { if (snake[0].x == snake[i].x && snake[0].y == snake[i].y)
    { gameover = true;
    }
  }
}

function checkAte()
{ if (!ate && snake[0].x == apple.x && snake[0].y == apple.y)
  { snake.push(new Segment(n, snake[n - 1].x, snake[n - 1].y));
    // snake[n].show();
    n += 1;
    ate = true;
  }
}

function keyPressed()
{ play = note[key];
  // console.log(play);
  synth.triggerAttackRelease(play, "16n");
}

class Segment
{ constructor(i, x, y)
  { this.i = i;
    this.x = x;
    this.y = y;
  }
  update(x, y)
  { this.x = x;
    this.y = y;
  }
  move(dx, dy)
  { this.x += dx;
    this.y += dy;
  }
  show(x, y)
  { stroke(0, 168, 107);
    strokeWeight(2);
    if (this.i == 0)
    { fill('black');
    } else
    { fill(115, 194, 251);
    }
    square(this.x, this.y, L);
  }
}

class Fruit
{ constructor()
  { this.x = round(random(0, (width - L) / L)) * L;
    this.y = round(random(0, (height - L) / L)) * L;
  }
  show()
  { strokeWeight(2);
    stroke(100, 0, 0);
    fill(180, 6, 80);
    circle(this.x + L / 2, this.y + L / 2, L * 0.7);
  }
}

function mousePressed()
{ if (pause)
  { pause = false;
  }
  else 
  { pause = true;
  }
}

