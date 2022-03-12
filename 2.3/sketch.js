let pitch = 600;

let osc = new Tone.AMOscillator(pitch, 'sine', 'sine').start()
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope(
  {
    attack : 0.1,
    decay : 0.2,
    sustain : 1.0,
    release : 0.8,
  }).connect(pan);
osc.connect(ampEnv);
let noise = new Tone.Noise('pink').start();
let noiseEnv = new Tone.AmplitudeEnvelope(
{ 
  attack : 0.1,
  decay : 0.2,
  sustain : 1.0,
  release : 0.8,
}).connect(gain);
let noiseFilter = new Tone.Filter(800, 'lowpass').connect(noiseEnv);
noise.connect(noiseFilter);
let freqLFO = new Tone.LFO(4, 300, 1000);
freqLFO.connect(osc.frequency);

function setup()
{
  createCanvas(400, 400);
}

function draw()
{
  background(220)

  // console.log(frameCount);
  // if ((frameCount % 60) === 0)
  // {
  //   pitch = random(300, 1000);
  // }

}

function mousePressed()
{
  console.log('pressed');
  ampEnv.triggerAttackReleased('4n');
  osc.frequency.linearRampToValueAtTime(pitch - 200, '+1');
  ampEnv.triggerAttackReleased('4n', '+1');

  if (mouseY > 400)
  {
    noiseFilter.frequemcy.value = mouseX + 100;
    noiseEnv.triggerAttackReleased(0.5);
  }
}
