import Decimal from "decimal.js";

export const calculateExpression = (firstVal: string, operator: string, secondVal: string) => {
  if (firstVal === "" || secondVal === "") {
    if (firstVal === "") return new Decimal(secondVal);
    else return Decimal(firstVal);
  };

  const firstValue = new Decimal(firstVal);
  const secondValue = new Decimal(secondVal);
  console.log("firstValue", firstValue, operator, secondValue);
  switch (operator) {
    case "+":
      return firstValue.plus(secondValue);
    case "-":
      return firstValue.minus(secondValue);
    case "*":
      return firstValue.times(secondValue);
    case "/":
      return firstValue.dividedBy(secondValue);
    default:
      return new Decimal(0);
  }
};

export const calculateExpressionWithPercentage = (expression: string) => {
  const percentageIndex = expression.indexOf("%");
  let res: Decimal = new Decimal(0);
  if (percentageIndex === expression.length - 1) {
    const operator = expression.match(/[\+\-\*\/]/g);
    if (operator?.length === 1) {
      let op = operator[0];
      const operatorIndex = expression.indexOf(op);
      const firstVal = expression.slice(0, operatorIndex);
      const secondVal = (parseFloat(expression.slice(operatorIndex + 1, percentageIndex)) / 100).toString();
      if (op === "+" || op === "-") {
        let tempRes = calculateExpression(firstVal, "*", secondVal);
        if (op === "+") {
          res = new Decimal(firstVal).plus(tempRes);
        } else {
          res = new Decimal(firstVal).minus(tempRes);
        }
      } else {
        res = calculateExpression(firstVal, op, secondVal);
      }
    } else {
      res = new Decimal(expression.slice(0, percentageIndex)).dividedBy(100);
    }
  } else {
    const firstVal = (parseFloat(expression.slice(0, percentageIndex)) / 100).toString();
    const secondVal = expression.slice(percentageIndex + 1);
    res = calculateExpression(firstVal, "*", secondVal);
  }
  return res;
};

export const calculateExpressionWithoutPercentage = (expression: string) => {
  const operator = expression.match(/[\+\-\*\/]/g);
  if (operator?.length === 1) {
    let op = operator[0];
    const operatorIndex = expression.indexOf(op);
    const firstVal = expression.slice(0, operatorIndex);
    const secondVal = expression.slice(operatorIndex + 1);
    return calculateExpression(firstVal, op, secondVal);
  }
  return new Decimal(expression);
};