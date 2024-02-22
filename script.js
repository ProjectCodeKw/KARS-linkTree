var main_color = '#51b9d2';
var second_color = '#005164';
var light_color = '#81d9ef';

var color_cycle = [light_color];
var color_index = 0;

var randomTheta = (Math.random() * (10 - 0.5)) + 0.5;

// Function to compute e^(theta * i) + e^(theta * i * pi)
function computeExpression(theta) {
    var resultReal = Math.cos(theta) + Math.cos(theta * Math.PI);
    var resultImaginary = Math.sin(theta) + Math.sin(theta * Math.PI);
    return { real: resultReal, imaginary: resultImaginary };
}

// Update the result in the canvas
// Store previous end points of the black line
var blackLineTrail = [];

// Update the result in the canvas
function updateCanvas(theta) {
    var canvas = document.getElementById("complexCanvas");
    var ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the new function
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = 100;

    var expression = computeExpression(theta);
    var x = centerX + expression.real * radius;
    var y = centerY + expression.imaginary * radius;

    var line_width = 0.2;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = light_color;
    ctx.lineWidth = line_width;
    ctx.stroke();

    // Draw the black line trail with fading effect
    for (var i = 0; i < blackLineTrail.length; i++) {
        var trailPoint = blackLineTrail[i];
        ctx.beginPath();
        ctx.moveTo(trailPoint.x, trailPoint.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = light_color;
        ctx.lineWidth = line_width;
        ctx.globalAlpha = 1 - (i / blackLineTrail.length); // Decrease opacity gradually
        ctx.stroke();
    }

    // Store the end point of the blue line as the start point of the black line
    var startPoint = { x: x, y: y };

    // Add the start point to the black line trail
    blackLineTrail.push(startPoint);

    // If the trail becomes too long, remove the oldest point
    //if (blackLineTrail.length > 1000) {
    //  blackLineTrail.shift();
    //}

    var resultElement1 = document.getElementById("result1");
    var resultElement2 = document.getElementById("result2");
    var resultElement3 = document.getElementById("result3");

    resultElement1.textContent = `${expression.real.toFixed(2)} + ${expression.imaginary.toFixed(2)}j`;
    resultElement3.textContent = `${expression.real.toFixed(2)} + ${expression.imaginary.toFixed(2)}j`;
    resultElement2.textContent = `${expression.real.toFixed(2)} + ${expression.imaginary.toFixed(2)}j`;
}

// Initial theta value
var theta = randomTheta;

// Update canvas on page load
updateCanvas(theta);

// Update canvas when theta changes (for demonstration purposes)
setInterval(function () {
    theta += 0.01; // Change theta by a small amount
    updateCanvas(theta);
}, 20); // Adjust the timing as needed
