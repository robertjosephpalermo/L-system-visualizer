let centerX, centerY;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();       
    
    stroke(0);
    strokeWeight(1);

    setUpSliders();
    setUpDropdown();

    updateCanvas();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    updateCanvas();
}

function updateCanvas() {
    background(220);

    centerX = width / 2;
    centerY = height / 2 ;
   
    howMuchRecursion = recursionSlider.value(); 
    chosenShape = shapes[shapeSelector.value()];
    chosenShape.stepSize = stepSizeSlider.value();

    createShape(chosenShape, howMuchRecursion);
}

function setUpSliders() {
    recursionSlider = createSlider(0, 10, 0); 
    recursionSlider.position(10, 10);
    recursionSlider.input(updateCanvas);

    stepSizeSlider = createSlider(0, 50, 0, 0.01);
    stepSizeSlider.position(10, 30);
    stepSizeSlider.input(updateCanvas);
}

function setUpDropdown() {
    shapeSelector = createSelect();
    shapeSelector.position(10, 60);

    for (let key in shapes) {
        shapeSelector.option(key);
    }

    shapeSelector.changed(() => {
        const selected = shapeSelector.value();
        const shape = shapes[selected];

        stepSizeSlider.value(shape.stepSize);
        //startingAngleSlider.value(shape.angle);

        updateCanvas();
    });

    const firstShape = shapeSelector.value();
    stepSizeSlider.value(shapes[firstShape].stepSize);
}

const shapes = {
    "Sierpinski Triangle": {
        "root": 'A',
        'A': "B-A-B",
        'B': "A+B+A",
        "leftAngle": 60,
        "rightAngle": 60,
        "stepSize": 1,
        "angle": 0
    },
    "Koch Snowflake": {
        "root": "A--A--A",
        'A': "A+A--A+A",
        "leftAngle": 60,
        "rightAngle": 60,
        "stepSize": 5,
        "angle": 90
    }, 
    "Gosper Curve": {
        "root": 'A',
        'A': "A-B--B+A++AA+B-",
        'B': "+A-BB--B-A++A+B",
        "leftAngle": 60,
        "rightAngle": 60,
        "stepSize": 5,
        "angle": 180
    },
    "Hilbert Curve": {
        "root": "X",
        'X': "+YF-XFX-FY+",
        'Y': "-XF+YFY+FX-",
        "leftAngle": 90,
        "rightAngle": 90,
        "stepSize": 5,
        "angle": 0
    }, 
    "Dragon Curve": {
        "root": 'A',
        'A': "A+B",
        'B': "A-B",
        "leftAngle": 90,
        "rightAngle": 90,
        "stepSize": 5,
        "angle": 0
    },
    "Levy C Curve": {
        "root": 'F',
        'F': "+F--F+",
        "leftAngle": 45,
        "rightAngle": 45,
        "stepSize": 5,
        "angle": 0
    },
    "Koch Island": {
       "root": "F-F-F-F",
        'F': "F-F+F+FFF-F-F+F",
        "leftAngle": 90,
        "rightAngle": 90,
        "stepSize": 5,
        "angle": 0 
    },
    "Plant 1": {
        "root": 'X',
        'X': "F+[[X]-X]-F[-FX]+X",
        'F': "FF",
        "leftAngle": 25,
        "rightAngle": 25,
        "stepSize": 5,
        "angle": 90
    },
    "Plant 2": {
        "root": 'X',
        'X': "F[+X][-X]FX",
        'F': "FF",
        "leftAngle": 25.7,
        "rightAngle": 25.7,
        "stepSize": 5,
        "angle": 90 
    },
    "Plant 3": {
        "root": 'X',
        'X': "F[+X]F[-X]+X",
        'F': "FF",
        "leftAngle": 20,
        "rightAngle": 20,
        "stepSize": 5,
        "angle": 90 
    }, 
    "Plant 4": {
        "root": 'F',
        'F': "F[+F]F[-F][F]",
        "leftAngle": 20,
        "rightAngle": 20,
        "stepSize": 5,
        "angle": 90 
    },
    "Plant 5": {
        "root": 'F',
        'F': "F[-F]F[+F]F",
        "leftAngle": 25,
        "rightAngle": 25,
        "stepSize": 5,
        "angle": 90 
    }
}
