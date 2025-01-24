import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Colors from '@/constants/Colors';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const ButtonPrimary: FC<ButtonProps> = ({ label, onPress, style, labelStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.parent, style]}
      onPress={onPress}
    >
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: Colors.BLACK,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: 'white',
    fontSize: 20
  },
});