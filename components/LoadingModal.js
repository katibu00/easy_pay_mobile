import React from 'react';
import { Modal, View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingModal = ({ isVisible }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
    >
      <View style={styles.modalContainer}>
        <ActivityIndicator size="large" color="#FEBE10" />
        <Text style={styles.waitText}>Please wait...</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  
  waitText: {
    marginTop: 10, // Adjust this margin as needed
    color: 'white', // Change the color to your preferred style
    fontSize: 16, // Adjust the font size as needed
  },
});

export default LoadingModal;
