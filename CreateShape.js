function createWord(initialCondition, ruleSet) {
    let results = "";
    for (const char of initialCondition) {
        results += ruleSet[char] || char;
    }
    
    return results;
}

function recurseWord(ruleSet, numberOfRecursions) {
    let initialCondition = ruleSet["root"];
    for (let i = 0; i < numberOfRecursions; i++) {
        newWord = createWord(initialCondition, ruleSet);
        initialCondition = newWord;
    }
    return initialCondition;
}

function createShape(chosenShapeRuleSet, numberOfRecursions) {
    let newWord = recurseWord(chosenShapeRuleSet, numberOfRecursions);

    let simBrush = new Brush(centerX, centerY, false);
    simBrush.setRulesAngle(chosenShapeRuleSet["leftAngle"], chosenShapeRuleSet["rightAngle"]);
    simBrush.setStepSize(chosenShapeRuleSet["stepSize"]);
    simBrush.setStartingAngle(chosenShapeRuleSet["angle"]);
    simBrush.evaluateWord(newWord)

    let bounds = simBrush.getCenterOfBounds();
    let shiftX = centerX - bounds.centerX;
    let shiftY = centerY - bounds.centerY;

    push();
    translate(shiftX, shiftY);

    let brush = new Brush(centerX, centerY, true);
    brush.setRulesAngle(chosenShapeRuleSet["leftAngle"], chosenShapeRuleSet["rightAngle"]);
    brush.setStepSize(chosenShapeRuleSet["stepSize"]);
    brush.setStartingAngle(chosenShapeRuleSet["angle"]);
    brush.evaluateWord(newWord);

    pop();
}