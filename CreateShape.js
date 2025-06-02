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
    newWord = recurseWord(chosenShapeRuleSet, numberOfRecursions);

    let brush = new Brush(centerX, centerY);
    brush.setRulesAngle(chosenShapeRuleSet["leftAngle"], chosenShapeRuleSet["rightAngle"]);
    brush.setStepSize(chosenShapeRuleSet["stepSize"]);
    brush.setStartingAngle(chosenShapeRuleSet["angle"]);
    brush.evaluateWord(newWord)
}