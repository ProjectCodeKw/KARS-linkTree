var main_color = '#51b9d2';
var second_color = '#005164';
var light_color = '#81d9ef';

var color_cycle = [main_color, second_color];
var color_index = 0;

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

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = color_cycle[color_index];
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw the black line trail with fading effect
    for (var i = 0; i < blackLineTrail.length; i++) {
        var trailPoint = blackLineTrail[i];
        ctx.beginPath();
        ctx.moveTo(trailPoint.x, trailPoint.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = color_cycle[color_index];
        ctx.lineWidth = 1;
        ctx.globalAlpha = 1 - (i / blackLineTrail.length); // Decrease opacity gradually
        ctx.stroke();
    }

    // Store the end point of the blue line as the start point of the black line
    var startPoint = { x: x, y: y };

    // Add the start point to the black line trail
    blackLineTrail.push(startPoint);

    // If the trail becomes too long, remove the oldest point
    if (blackLineTrail.length > 1000) {
        blackLineTrail.shift();
    }
}

// Initial theta value
var theta = 0.5;

// Update canvas on page load
updateCanvas(theta);

// Update canvas every 3 seconds to cycle through colors
setInterval(function() {
    color_index = (color_index + 1) % color_cycle.length; // Move to the next color index
}, 3000);

// Update canvas when theta changes (for demonstration purposes)
setInterval(function() {
    theta += 0.01; // Change theta by a small amount
    updateCanvas(theta);
}, 20); // Adjust the timing as needed
