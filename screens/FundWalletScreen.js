import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { FontAwesome } from '@expo/vector-icons';
import LoadingModal from "../components/LoadingModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';


const FundWalletScreen = ({ orderId, paymentAmount }) => {
  const [bankTransferExpanded, setBankTransferExpanded] = useState(false);
  const [creditCardExpanded, setCreditCardExpanded] = useState(false);
  const [walletExpanded, setWalletExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();


  const handleBankTransferToggle = () => {
    setBankTransferExpanded(!bankTransferExpanded);
  };

  const handleCreditCardToggle = () => {
    setCreditCardExpanded(!creditCardExpanded);
  };

  const handleWalletToggle = () => {
    setWalletExpanded(!walletExpanded);
  };



  const handlePayWithWallet = async () => {
    setIsLoading(true);
  
    try {
      const userToken = await AsyncStorage.getItem('token');
  
      const response = await axios.post(
        'https://easypay.intelps.cloud/api/make-payment',
        {
          orderId: orderId,
          paymentAmount: paymentAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
  
      setIsLoading(false);
  
      // Display success message
      Alert.alert('Success', 'Payment successful!', [
        {
          text: 'OK',
          onPress: () => {
         
            // navigation.replace('ComboDetails', { comboId: orderId });
          },
        },
      ]);
    
    } catch (error) {
      console.error('Error making payment with wallet:', error);
  
      // Display error message
      Alert.alert('Error', 'Payment failed. Please try again.', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    
    } finally {
      setIsLoading(false);
    }
  };
  
   

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Bank Transfer Card */}
      <Collapse isCollapsed={bankTransferExpanded} onToggle={handleBankTransferToggle}>
        <CollapseHeader>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Bank Transfer</Text>
            <FontAwesome
              name={bankTransferExpanded ? 'chevron-down' : 'chevron-right'}
              size={20}
              color="white"
            />
          </View>
        </CollapseHeader>
        <CollapseBody>
          <View style={styles.cardBody}>
            {/* Display Account Name, Account Number, and Bank Name here */}
            <Text>Account Name: Umar Katibu</Text>
            <Text>Account Number: 1234567890</Text>
            <Text>Bank Name: GTBank</Text>
          </View>
        </CollapseBody>
      </Collapse>

      {/* Credit & Debit Card Card */}
      <Collapse isCollapsed={creditCardExpanded} onToggle={handleCreditCardToggle}>
        <CollapseHeader>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Debit Card</Text>
            <View style={styles.cardIcons}>
              <FontAwesome name="cc-visa" size={20} color="white" />
              <FontAwesome name="cc-mastercard" size={20} color="white" />
              <FontAwesome name="credit-card" size={20} color="white" />
            </View>
            <FontAwesome
              name={creditCardExpanded ? 'chevron-down' : 'chevron-right'}
              size={20}
              color="white"
            />
          </View>
        </CollapseHeader>
        <CollapseBody>
          <View style={styles.cardBody}>
            {/* Credit Card Form - Enter Card Details */}
            <TextInput style={styles.input} placeholder="Card Number" />
            <TextInput style={styles.input} placeholder="Expiry Date" />
            <TextInput style={styles.input} placeholder="CVV" />

            {/* Pay Now Button */}
            <TouchableOpacity style={styles.payNowButton}>
              <Text style={styles.payNowButtonText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        </CollapseBody>
      </Collapse>
       {/* Wallet Card */}
       <Collapse isCollapsed={walletExpanded} onToggle={handleWalletToggle}>
        <CollapseHeader>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Wallet</Text>
            <FontAwesome
              name={walletExpanded ? 'chevron-down' : 'chevron-right'}
              size={20}
              color="white"
            />
          </View>
        </CollapseHeader>
        <CollapseBody>
          <View style={styles.cardBody}>
            <TouchableOpacity style={styles.payNowButton} onPress={handlePayWithWallet}>
              <Text style={styles.payNowButtonText}>Pay with Wallet</Text>
            </TouchableOpacity>
          </View>
        </CollapseBody>
      </Collapse>
      <LoadingModal isVisible={isLoading} />

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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FEBE10',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  cardIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardBody: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#FEBE10',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  payNowButton: {
    backgroundColor: '#FEBE10',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  payNowButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default FundWalletScreen;
