class Brush {
    constructor(centerX, centerY) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.angle = 0;
        this.stack = [];

        this.leftTurnRule = 90;
        this.rightTurnRule = -90;
        this.stepSize = 10 
        
        this.defaultRules = {
            'A': () => this.forward(this.stepSize),
            'B': () => this.forward(this.stepSize),
            'F': () => this.forward(this.stepSize),
            'X': () => {},
            'Y': () => {},
            '[': () => this.pushState(),
            ']': () => this.popState(),
            '+': () => this.turn(this.leftTurnRule),
            '-': () => this.turn(this.rightTurnRule),
        }
    }
    
    pushState() {
        this.stack.push({
            x: this.centerX,
            y: this.centerY,
            angle: this.angle
        });
    }

    popState() {
        if (this.stack.length > 0 ) {
            const state = this.stack.pop();
            this.centerX = state.x;
            this.centerY = state.y;
            this.angle = state.angle;
        }
    }

    setStepSize(newStepSize) {
        this.stepSize = newStepSize;
    }

    setRulesAngle(newLeftTurnRule, newRightTurnRule) {
        this.leftTurnRule = newLeftTurnRule;
        this.rightTurnRule = -newRightTurnRule;
    }

    setStartingAngle(newStartingAngle) {
        this.angle = newStartingAngle;
    }

    forward(stepSize) {
        let rad = radians(this.angle);
        let newX = this.centerX + cos(rad) * stepSize;
        let newY = this.centerY - sin(rad) * stepSize;

        line(this.centerX, this.centerY, newX, newY);

        this.centerX = newX;
        this.centerY = newY;
    }

    turn(newAngle) {
        this.angle += newAngle;
    }

    evaluateWord(newWord) {
        for (const char of newWord) {
            this.defaultRules[char]();
        }
    }
}