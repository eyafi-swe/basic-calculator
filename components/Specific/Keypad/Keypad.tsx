import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import ButtonPrimary from '@/components/Shared/Button/ButtonPrimary';
import { Buttons } from '@/constants/Buttons';
import Colors from '@/constants/Colors';

interface KeypadProps {
  onPressButton: (value: string, type: string) => void;
}

const Keypad: FC<KeypadProps> = ({ onPressButton }) => {
  const getButtonStyle = (type: string) => {
    if (type == "equal") {
      return styles.equalButton;
    }
    return styles.buttonStyle;
  };

  const getLabelStyle = (type: string) => {
    switch (type) {
      case "operator":
        return styles.operatorStyle;
      case "number":
        return styles.commonKeysStyle;
      case "clear":
        return styles.clearStyle;
      case "backspace":
        return styles.clearStyle;
      case "equal":
        return styles.commonKeysStyle;
      default:
        return styles.commonKeysStyle;
    }
  };

  return (
    <View style={styles.keypad}>
      {
        Buttons.map((button, index) => {
          return (
            <ButtonPrimary
              key={index}
              label={button.label}
              onPress={() => onPressButton(button.value, button.type)}
              style={getButtonStyle(button.type)}
              labelStyle={getLabelStyle(button.type)}
            />
          );
        })
      }
    </View>
  );
};

export default Keypad;

const styles = StyleSheet.create({
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    justifyContent: 'space-between'
  },
  operatorStyle: {
    color: Colors.SECONDARY,
    fontSize: 26
  },
  commonKeysStyle: {
    color: Colors.WHITE,
    fontSize: 20
  },
  clearStyle: {
    color: Colors.YELLOW,
    fontSize: 20
  },
  equalButton: {
    width: "48%",
    height: 60,
    backgroundColor: Colors.HOVER
  },
  buttonStyle: {
    width: "23%",
    height: 60
  },
});