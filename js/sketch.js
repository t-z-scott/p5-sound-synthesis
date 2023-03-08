// https://learningsynths.ableton.com/en/recipes/old-fashioned-computer
let initDraw = false;
let pitch = 500;
let sawOsc = new Tone.Oscillator(pitch, 'sawtooth').start();
let squareOsc = new Tone.Oscillator(pitch, 'square').start();
let lfo = new Tone.LFO('4n', 40, 120).start();
let phone, nSlider, tButton;

let gain = new Tone.Gain().toDestination();
let panner = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.01,
  decay: 0.2,
  sustain: 0.35,
  release: 0.4,
}).connect(panner);
sawOsc.connect(ampEnv);
squareOsc.connect(ampEnv);
let filter = new Tone.Filter(3000, "lowpass").connect(ampEnv);
squareOsc.connect(filter);

let lfoEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.5,
  sustain: 0.35,
  release: 0.15
}).connect(gain);
lfo.connect(lfoEnv);

function preload() {
  phone = loadImage("phone.png");
}

function setup() {
  createCanvas(400, 400);
  // imageMode(CENTER);

  nSlider = createSlider(-1., 1., 0., 0.1);
  nSlider.mouseReleased( () => {
    panner.pan.rampTo(nSlider.value(), 0.1);
  });

  tButton = createButton("press me!");
  tButton.position(207, 170);
  tButton.mouseClicked(phoneRing);
}

function draw() {
  background(220);
  text("move slider to pan the sound", 153, 250);
  if (initDraw) {
    image(phone, 0, 0, 400, 400);
  }
}

function phoneRing() {
  Tone.start();
  ampEnv.triggerAttackRelease('8n');
  lfoEnv.triggerAttackRelease('8n');
  ampEnv.triggerAttackRelease('8n', '+0.5');
  lfoEnv.triggerAttackRelease('8n', '+0.5');
  drawImg();
}

function drawImg() {
  initDraw = true;
}
