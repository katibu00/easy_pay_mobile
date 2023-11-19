import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ComboDetailsScreen = ({ route }) => {
  const progress = 60; 
  const { comboId } = route.params;

  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const userToken = await AsyncStorage.getItem('token');
        if (!userToken) {
          return;
        }

        const response = await axios.get(`https://easypay.intelps.cloud/api/orders/${comboId}`, {
          headers: {
            'Authorization': `Bearer ${userToken}`,
          },
        });

        if (response.data) {
          setOrderDetails(response.data);
          console.log(orderDetails.sale_price)
          setIsLoading(false);
        } else {
          console.log('Data structure does not match expectations:', response.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle 401 unauthorized error
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('user');
          // You may want to navigate to the login screen or handle it as needed.
        } else {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        }
      }
    };

    fetchOrderDetails();
  }, [comboId]);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.bigCard}>
          {/* Linear Progress Bar */}
          <View style={styles.linearProgressBar}>
            <View
              style={{
                width: `${progress}%`,
                height: 20,
                backgroundColor: 'green', // Color of the progress
                borderRadius: 10,
              }}
            />
          </View>
          {/* Progress Label */}
          <Text style={styles.progressLabel}>{progress}% Progress</Text>
          {/* Next Pay Date */}
          <Text style={styles.nextPayLabel}>Next Pay Date</Text>
          <Text style={styles.nextPayDate}>20 Oct 2023</Text>
          {/* Amount to Pay */}
          <Text style={styles.amountToPay}>Amount to Pay: ₦100</Text>
        </View>

        {/* Pay Now Button */}
        <TouchableOpacity style={styles.payNowButton}>
          <Text style={styles.payNowText}>Pay Now</Text>
        </TouchableOpacity>

        {/* Transfer Combo and Terminate Combo Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.transferButton}>
            <FontAwesome5 name="exchange-alt" size={24} color="white" />
            <Text style={styles.buttonText}>Transfer Combo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.terminateButton}>
            <FontAwesome5 name="times" size={24} color="white" />
            <Text style={styles.buttonText}>Terminate Combo</Text>
          </TouchableOpacity>
        </View>

        {/* Total Amount Payable, Total Amount Paid, and Balance Remaining */}
        <View style={styles.paymentDetails}>
          <Text>Total Amount Payable:  ₦{orderDetails?.sale_price || 0}</Text>
          <View style={styles.horizontalLine}></View>
          <Text>Total Amount Paid: ₦400</Text>
          <View style={styles.horizontalLine}></View>
          <Text>Balance Remaining: ₦100</Text>
          <View style={styles.horizontalLine}></View>
        </View>

        {/* Payment History Section */}
        <View style={styles.paymentHistory}>
          <View style={styles.historyTitleRow}>
            <Text style={styles.historyTitle}>Payment History</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {/* Payment Date, Amount Paid, Date Paid */}
          <View style={styles.paymentItem}>
            <Text style={styles.paymentDate}>Payment Date: 15 Oct 2023</Text>
            <Text style={styles.amountPaid}>Amount Paid: ₦100</Text>
            <Text style={styles.datePaid}>Date Paid: 16 Oct 2023</Text>
          </View>
          {/* Repeat for other payment history items */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  bigCard: {
    backgroundColor: '#FEBE10',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  linearProgressBar: {
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
  },
  progressLabel: {
    fontSize: 18,
    color: 'white',
  },
  nextPayLabel: {
    fontSize: 16,
    color: 'white',
    marginTop: 16,
  },
  nextPayDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  amountToPay: {
    fontSize: 16,
    color: 'white',
    marginTop: 16,
  },
  payNowButton: {
    backgroundColor: '#FEBE10',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: -10,
  },
  payNowText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  transferButton: {
    backgroundColor: '#FEBE10',
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 8,
    flexDirection: 'row',
  },
  terminateButton: {
    backgroundColor: '#FEBE10',
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 8,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  paymentDetails: {
    marginBottom: 16,
  },
  horizontalLine: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 8,
  },
//   paymentHistory: {},
  historyTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewAllButton: {
    backgroundColor: '#FEBE10',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  paymentItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  paymentDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amountPaid: {
    fontSize: 16,
  },
  datePaid: {
    fontSize: 14,
    color: 'gray',
  },
});

export default ComboDetailsScreen;
