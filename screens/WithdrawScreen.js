import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';

const WithdrawScreen = ({ navigation }) => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [isAddAccountModalVisible, setAddAccountModalVisible] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');

  const handleWithdraw = () => {
    // Implement logic for withdrawing here
    // You can use the selectedAccount and amount state values
  };

  const handleAddAccount = () => {
    setAddAccountModalVisible(true);
  };

  const handleSaveAccount = () => {
    // Implement logic for saving account details here
    // You can use the accountName, accountNumber, and bankName state values
    setAddAccountModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.addAccountButton} onPress={handleAddAccount}>
          <Text style={styles.addAccountButtonText}>Add Account</Text>
        </TouchableOpacity>

        {/* Account Selection */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Account</Text>
          {/* Replace the following Picker with your actual account selection component */}
          <TextInput
            style={styles.input}
            placeholder="Select Account"
            value={selectedAccount}
            onChangeText={(text) => setSelectedAccount(text)}
          />
        </View>

        {/* Amount Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={(text) => setAmount(text)}
          />
        </View>

        {/* Withdraw Button */}
        <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
          <Text style={styles.withdrawButtonText}>Withdraw</Text>
        </TouchableOpacity>

        {/* Add Account Modal */}
        <Modal
          isVisible={isAddAccountModalVisible}
          onBackdropPress={() => setAddAccountModalVisible(false)}
          animationIn="slideInUp"
          animationOut="slideOutDown"
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Account</Text>

            {/* Account Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Account Name</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter Account Name"
                value={accountName}
                onChangeText={(text) => setAccountName(text)}
              />
            </View>

            {/* Account Number Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Account Number</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter Account Number"
                keyboardType="numeric"
                value={accountNumber}
                onChangeText={(text) => setAccountNumber(text)}
              />
            </View>

            {/* Bank Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Bank Name</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter Bank Name"
                value={bankName}
                onChangeText={(text) => setBankName(text)}
              />
            </View>

            {/* Save Account Button */}
            <TouchableOpacity style={styles.saveAccountButton} onPress={handleSaveAccount}>
              <Text style={styles.saveAccountButtonText}>Save Account</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
  addAccountButton: {
    backgroundColor: '#FEBE10',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addAccountButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
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
  withdrawButton: {
    backgroundColor: '#FEBE10',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  withdrawButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FEBE10',
    marginBottom: 20,
  },
  modalInput: {
    height: 40,
    borderColor: '#FEBE10',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#FEBE10',
    marginBottom: 20,
  },
  saveAccountButton: {
    backgroundColor: '#FEBE10',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveAccountButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default WithdrawScreen;
