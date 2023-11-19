import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const PayComboScreen = ({ navigation }) => {
  const [comboId, setComboId] = useState('');
  const [amount, setAmount] = useState('');

  const handlePayCombo = () => {
    // Implement logic for paying combo here
    // You can use the comboId and amount state values
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Pay Combo</Text>

        {/* Combo ID Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Combo ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Combo ID"
            value={comboId}
            onChangeText={(text) => setComboId(text)}
          />
        </View>

        {/* Amount Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.currency}>₦</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={(text) => setAmount(text)}
            />
          </View>
        </View>

        {/* Send Button */}
        <TouchableOpacity style={styles.sendButton} onPress={handlePayCombo}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FEBE10',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#FEBE10',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#FEBE10',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#FEBE10',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currency: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#FEBE10',
  },
  amountInput: {
    flex: 1,
    height: 40,
    borderColor: '#FEBE10',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#FEBE10',
  },
  sendButton: {
    backgroundColor: '#FEBE10',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default PayComboScreen;
