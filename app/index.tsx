import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Display, Keypad } from "@/components";
import { Buttons } from "@/constants/Buttons";
import { calculateExpressionWithoutPercentage, calculateExpressionWithPercentage } from "@/utils/calculation";
import { formatNumberToLocaleString } from "@/utils/formatters";
import Colors from "@/constants/Colors";

export default function Index() {
  const [display, setDisplay] = useState<string>("0");
  const [result, setResult] = useState<string>("");

  const onPressButton = (value: string, type: string) => {
    switch (type) {
      case "equal":
        calculate();
        break;
      case "backspace":
        backspace();
        break;
      case "clear":
        clear();
        break;
      case "number":
      case "operator":
      case "decimal":
        handleDisplay(value, type);
    }
  };

  const handleDisplay = (value: string, type: string) => {
    if (type === "number") {
      if (display.includes("%") && (display.includes("+") || display.includes("-") || display.includes("*") || display.includes("/"))) return;

      if (display === "0" || result !== "") {
        setDisplay(value);
        setResult("");
      } else setDisplay(display + value);

    } else if (type === "operator") {
      if (result !== "") return;
      const lastChar = display[display.length - 1];
      if (Buttons.find((button) => button.value === lastChar)?.type === "operator") return;

      else if (value !== "%" && (display.includes("+") || display.includes("-") || display.includes("*") || display.includes("/"))) return;

      else if (value === "%" && display.includes("%")) return;

      else setDisplay(display + value);
    } else if (type === "decimal") {
      const operator = display.match(/[\+\-\*\/]/g);
      if (operator?.length === 1) {
        let op = operator[0];
        const operatorIndex = display.indexOf(op);
        const secondVal = display.slice(operatorIndex + 1);
        if (secondVal.includes(".")) return;
        setDisplay(display + value);
      }
      else {
        if (display.includes(".")) return;
        setDisplay(display + value);
      }
    }
  };

  const calculate = () => {
    console.log("calculate", display);
    let result: string = "";
    if (display.includes("%")) {
      result = formatNumberToLocaleString(calculateExpressionWithPercentage(display));
    } else {
      result = formatNumberToLocaleString(calculateExpressionWithoutPercentage(display));
    }
    setResult(result);
  };

  const backspace = () => {
    if (display.length === 1) {
      setDisplay("0");
      return;
    }
    if (display === result) {
      clear();
      return;
    }
    setDisplay(display.slice(0, -1));
  };

  const clear = () => {
    setDisplay("0");
    setResult("");
  };

  return (
    <View style={styles.container}>
      <Display text={display} result={result} />
      <Keypad onPressButton={onPressButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SEC_BG,
    justifyContent: "space-between",
    padding: 10,
  },
});
