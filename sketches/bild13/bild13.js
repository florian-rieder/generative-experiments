// Define the golden ratio
const PHI = (1 + Math.sqrt(5)) / 2;

// Number of circles to draw
let numCircles = 1000;

// Base radius for the circles
let baseRadius = 1000;

// Margin around the canvas
let margin = 50;

// Setup function, runs once at the beginning
function setup() {
    createCanvas(windowWidth / PHI, windowHeight); // Create a canvas with dimensions
    noFill(); // Don't fill shapes
    strokeWeight(0.5); // Set stroke weight for lines
    translate(width / 2, height / 2); // Center the origin
    margin = height * 8 / 100; // Set margin based on canvas height
    drawBild(); // Call the custom drawing function
}

// Function to draw the pattern
function drawBild() {
    background("white"); // Set background color

    // Used to draw arcs on both sides
    const signs = [-1, 1];

    // Loop through the number of circles
    for (let i = 0; i < numCircles; i++) {
        signs.forEach(sign => {
            // Calculate properties for each circle
            let radius = Math.pow(baseRadius * i / numCircles, 1.5);
            let cx = radius * sign;
            let cy = 0;
            let startAngle = 0;
            let endAngle = TWO_PI;

            // Calculate the maximum angles possible within the margin
            let xMargin = width / 2 - margin;
            let yMargin = height / 2 - margin;
            let a = xMargin - radius;
            let b = yMargin * sign;

            // Check different cases for arc angles based on margin

            // No margin constraints
            if (radius * 2 < xMargin && radius < yMargin) {
                if (sign > 0) {
                    startAngle = random(PI);
                    endAngle = -startAngle;
                } else {
                    endAngle = random(PI);
                    startAngle = -endAngle;
                }
            }

            // Horizontal margin constraint
            if (radius * 2 > xMargin) {
                let yIntersect = Math.sqrt(radius * radius - a * a);
                let angle = Math.atan2(yIntersect, a);
                if (sign > 0) {
                    startAngle = random(angle, PI);
                    endAngle = -startAngle;
                } else {
                    endAngle = random(PI - angle);
                    startAngle = -endAngle;
                }
            }

            // Vertical margin constraint
            if (radius > yMargin) {
                xIntersect = Math.sqrt(radius * radius - yMargin * yMargin);
                let angle = Math.atan2(b, xIntersect);
                if (sign > 0) {
                    startAngle = angle + 2 * ((PI / 2) - angle);
                    startAngle = random(startAngle, PI);
                    endAngle = random(PI + angle / 2, angle + PI);
                } else {
                    startAngle = random(angle / 2, angle);
                    endAngle = -startAngle;
                }
            }

            // Draw the arc with calculated angles
            arc(cx, cy, radius * 2, radius * 2, startAngle, endAngle);
        });
    }
}

// Function to redraw the pattern when the mouse is pressed
function mousePressed() {
    drawBild();
}

// Function to handle window resizing
function windowResized() {
    resizeCanvas(windowHeight / PHI, windowHeight); // Resize canvas while maintaining ratio
    translate(width / 2, height / 2); // Recenter the origin
    drawBild(); // Redraw the pattern
}
