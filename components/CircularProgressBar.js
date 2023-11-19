import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CircularProgressBar = ({ progress }) => {
  const radius = 50; // Radius of the circle
  const strokeWidth = 10; // Width of the progress bar
  const circumference = Math.PI * radius;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  // Define the styles for the circular progress bar
  const styles = StyleSheet.create({
    container: {
      width: 2 * (radius + strokeWidth),
      height: 2 * (radius + strokeWidth),
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundCircle: {
      width: 2 * radius,
      height: 2 * radius,
      borderRadius: radius,
      borderWidth: strokeWidth,
      borderColor: '#ccc', // Color of the background circle (grey)
      position: 'absolute',
    },
    progressBar: {
      width: 2 * radius,
      height: 2 * radius,
      borderRadius: radius,
      borderWidth: strokeWidth,
      borderColor: 'transparent', // No need for a border on the progress bar
      transform: [{ rotate: '90deg' }],
      position: 'absolute',
     
      borderColor: 'red', // Color of the progress bar (red)
    },
    progressText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white', // Color of the percentage
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.backgroundCircle} />
      <View style={styles.progressBar} />
      <Text style={styles.progressText}>{progress}%</Text>
    </View>
  );
};

export default CircularProgressBar;
