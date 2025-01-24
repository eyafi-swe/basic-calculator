import Colors from '@/constants/Colors';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DisplayProps {
  text: string;
  result?: string;
}

const Display: FC<DisplayProps> = ({ text, result }) => {
  return (
    <View style={styles.display}>
      <Text style={styles.displayText}>{text}</Text>
      {result && <Text style={styles.resultText}>{result}</Text>}
    </View>
  );
};

export default Display;

const styles = StyleSheet.create({
  display: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  displayText: {
    fontSize: 34,
    textAlign: 'right',
    color: Colors.WHITE,
  },
  resultText: {
    fontSize: 28,
    textAlign: 'right',
    color: Colors.SECONDARY,
  },
});