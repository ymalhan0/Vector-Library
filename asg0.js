// DrawTriangle.js (c) 2012 matsuda
var canvas;
var ctx;

function main() {
  // Retrieve <canvas> element
  canvas = document.getElementById('cnv1');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }
  // Get the rendering context for 2DCG
  ctx = canvas.getContext('2d');

  // Draw a rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to black
  ctx.fillRect(0, 0, 400, 400);        // Fill a rectangle with the color


  //var v1 = new Vector3([2.25, 2.25, 0.0]);
  //drawVector(v1, "red");  // for testing stuff
}

function drawVector(v, color) {
  ctx.strokeStyle = color;
  let cx = canvas.width / 2;
  let cy = canvas.height / 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy); // moves to center
  ctx.lineTo(200 + v.elements[0] * 20, 200 - v.elements[1] * 20, v.elements[2] * 20);
  ctx.stroke();
}


function handleDrawEvent() {
  var x = document.getElementById('name1').value;
  var y = document.getElementById('name2').value;

  //redefine canvas and ctx
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to black
  ctx.fillRect(0, 0, 400, 400);

  var v1 = new Vector3([x, y, 0.0]);
  drawVector(v1, "red");

  var x2 = document.getElementById('v2x').value;
  var y2 = document.getElementById('v2y').value;

  var v2 = new Vector3([x2, y2, 0.0]);
  drawVector(v2, "blue");
}


function handleDrawOperationEvent() {
  // clear canvas + draw v1 and v2
  var x = document.getElementById('name1').value;
  var y = document.getElementById('name2').value;

  //redefine canvas and ctx
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to black
  ctx.fillRect(0, 0, 400, 400);

  var v1 = new Vector3([x, y, 0.0]);
  drawVector(v1, "red");

  var x2 = document.getElementById('v2x').value;
  var y2 = document.getElementById('v2y').value;

  var v2 = new Vector3([x2, y2, 0.0]);
  drawVector(v2, "blue");

  var selector = document.getElementById("operation").value;
  var scalar = document.getElementById("name3").value;
  
  // need to do operation based on value
  if (selector == "Add") {
    let v3 = v1.add(v2);
    drawVector(v3, "green");
  } else if (selector == "Subtract") {
    let v3 = v1.sub(v2);
    drawVector(v3, "green");
  } else if (selector == "Multiply") {
    let v3 = v1.mul(scalar);
    drawVector(v3, "green");
    let v4 = v2.mul(scalar);
    drawVector(v4, "green");
  } else if (selector == "Divide") {
    let v3 = v1.div(scalar);
    drawVector(v3, "green");
    let v4 = v2.div(scalar);
    drawVector(v4, "green");
  } else if (selector == "Magnitude") {
    let v3 = v1.magnitude();
    let v4 = v2.magnitude();
    console.log("Magnitude v1: ", v3);
    console.log("Magnitude v2: ", v4);
  } else if (selector == "Normalize") {
    let v3 = v1.normalize();
    drawVector(v3, "green");
    let v4 = v2.normalize();
    drawVector(v4, "green");
  } else if (selector == "Angle between") {
    console.log("Angle: ", angleBetween(v1, v2));
  } else if (selector == "Area") {
    console.log("Area: ", areaTriangle(v1, v2));
  }
}


function angleBetween(v1, v2) {
  // dot = mag v1 * mag v2 * cos(alpha)
  // angle = cos-1 [dot /(mag v1 * mag v2)] -> acos for cos-1
  let d1 = Vector3.dot(v1, v2);
  let m1 = v1.magnitude();
  let m2 = v2.magnitude();

  let angle = d1 / (m1 * m2);
  angle = Math.acos(angle);
  angle *= 180 / Math.PI; // need to be in degree not radians
  return angle;
}


function areaTriangle(v1, v2) {
  let area = Vector3.cross(v1, v2);
  let v3 = new Vector3([area[0], area[1], area[2]]);
  let mag = v3.magnitude()/2;
  return mag;
}