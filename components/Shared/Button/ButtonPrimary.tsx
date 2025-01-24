import React, { FC } from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
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
      style={[{ backgroundColor: Colors.BLACK, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }, style]}
      onPress={onPress}
    >
      <Text style={[{ color: 'white', fontSize: 20 }, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ButtonPrimary;