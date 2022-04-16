
let serialPDM;                             
let portName = '/dev/tty.usbmodem1401';    

let sensors;

function setup() {
   
  serialPDM = new PDMSerial(portName);
  console.log(serialPDM.inData);
  
  sensors = serialPDM.sensorData;
  
  createCanvas(600,600);
  
}

function keyPressed() {
  serialPDM.transmit('led',1);
  
  console.log(serialPDM.sensorsConnected());
}

function keyReleased() {
  serialPDM.transmit('led',0);  
}

function mouseDragged() {
  ellipse(mouseX, mouseY, 15, 15);
  let fade = Math.floor(map(mouseY,0,height,0,255, true));
  
  serialPDM.transmit('fade',fade);
  
  return false;
}



function draw(){
  background(255);
  textSize(32);
  fill(32, 140, 110);
  text("a0: "+ sensors.a0, 10, 30);
  text("p7: "+ sensors.p7, 10, 80);
  text("pressure: "+ sensors.pressure, 10, 120);
  
  let circlePosition = map(sensors.float0, 0, 1, 30, width-30);
  drawCircle(circlePosition, 300, sensors.pressure + 2);
}


function drawCircle(x,y,size){
  fill("yellow");
  ellipse(x, y, size);
}
