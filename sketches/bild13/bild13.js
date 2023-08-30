const PHI = (1 + Math.sqrt(5)) / 2; // golden ratio
let numCircles = 1000;
let baseRadius = 1000;
let margin = 50;

function setup() {
    createCanvas(windowWidth / PHI, windowHeight);
    noFill();
    strokeWeight(0.5);
    translate(width / 2, height / 2); // center the origin
    margin = height * 8 / 100;
    drawBild();
}

function drawBild() {
    background("white");

    // Used to draw arcs on both sides
    const signs = [-1, 1];

    for (let i = 0; i < numCircles; i++) {
        signs.forEach(sign => {
            let radius = Math.pow(baseRadius * i / numCircles, 1.5);
            let cx = radius * sign;
            let cy = 0
            let startAngle = 0
            let endAngle = TWO_PI;

            // Calculate the maximum angles possible within the margin
            let xMargin = width / 2 - margin;
            let yMargin = height / 2 - margin;
            let a = xMargin - radius;
            let b = yMargin * sign;

            // Doesn't meet any margin
            if (radius * 2 < xMargin && radius < yMargin) {
                if (sign > 0) {
                    startAngle = random(PI);
                    endAngle = -startAngle;
                } else {
                    endAngle = random(PI);
                    startAngle = -endAngle;
                }
            }

            // Horizontal margin
            if (radius * 2 > xMargin) {
                let yIntersect = Math.sqrt(radius * radius - a * a);
                let angle = Math.atan2(yIntersect, a);
                if (sign > 0) {
                    startAngle = random(angle, PI)
                    endAngle = -startAngle;
                } else {
                    endAngle = random(PI - angle);
                    startAngle = -endAngle;
                }

            }

            // Vertical margin
            if (radius > yMargin) {
                xIntersect = Math.sqrt(radius * radius - yMargin * yMargin);
                let angle = Math.atan2(b, xIntersect);
                if (sign > 0) {
                    startAngle = angle + 2 * ((PI / 2) - angle);
                    startAngle = random(startAngle, PI)
                    endAngle = random(PI + angle / 2, angle + PI);
                } else {
                    startAngle = random(angle / 2, angle);
                    endAngle = -startAngle;
                }

            }

            arc(cx, cy, radius * 2, radius * 2, startAngle, endAngle);
        })

    }
}


function mousePressed() {
    drawBild();
}


function windowResized() {
    resizeCanvas(windowHeight / PHI, windowHeight);
    translate(width / 2, height / 2);
    drawBild();
}