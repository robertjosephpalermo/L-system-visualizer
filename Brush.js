class Brush {
    constructor(centerX, centerY, drawMode = true) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.angle = 0;
        this.stack = [];
        this.drawMode = drawMode;

        this.leftTurnRule = 90;
        this.rightTurnRule = -90;
        this.stepSize = 10 

        this.minX = centerX;
        this.maxX = centerX;
        this.minY = centerY;
        this.maxY = centerY;
        
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

        if (this.drawMode) {
            line(this.centerX, this.centerY, newX, newY);
        } else {
            this.minX = min(this.minX, newX);
            this.maxX = max(this.maxX, newX);
            this.minY = min(this.minY, newY);
            this.maxY = max(this.maxY, newY);
        }

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

    getCenterOfBounds() {
        return {
            centerX: (this.minX + this.maxX) / 2,
            centerY: (this.minY + this.maxY) / 2
        };
    }
}