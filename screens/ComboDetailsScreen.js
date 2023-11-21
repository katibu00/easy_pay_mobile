import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FundWalletScreen from "./FundWalletScreen"; // Import the FundWalletScreen

const ComboDetailsScreen = ({ route }) => {
  const { comboId } = route.params;

  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePayNow = () => {
    // Show the payment options modal
    setIsModalVisible(true);
  };

  const closeModal = () => {
    // Close the modal
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const userToken = await AsyncStorage.getItem("token");
        if (!userToken) {
          return;
        }

        const response = await axios.get(
          `https://easypay.intelps.cloud/api/orders/${comboId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (response.data) {
          setOrderDetails(response.data);
          setIsLoading(false);
        } else {
          console.log(
            "Data structure does not match expectations:",
            response.data
          );
          setIsLoading(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle 401 unauthorized error
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("user");
          // You may want to navigate to the login screen or handle it as needed.
        } else {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        }
      }
    };

    fetchOrderDetails();
  }, [comboId]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FEBE10" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.bigCard}>
          {/* Linear Progress Bar */}
          <Text style={styles.comboTitle}>{orderDetails?.combo_title}</Text>

          <View style={styles.linearProgressBar}>
            <View
              style={{
                width: `${orderDetails?.progress || 0}%`,
                height: 20,
                backgroundColor: "green", // Color of the progress
                borderRadius: 10,
              }}
            />
          </View>
          {/* Progress Label */}
          <Text style={styles.progressLabel}>
            {orderDetails?.progress}% Progress
          </Text>
          {/* Next Pay Date */}
          <Text style={styles.nextPayLabel}>Next Pay Date</Text>
          <Text style={styles.nextPayDate}>
            {orderDetails?.next_payment_date}
          </Text>
          {/* Amount to Pay */}
          <Text style={styles.amountToPay}>
            Amount to Pay: ₦{orderDetails?.amount_to_pay}
          </Text>
        </View>

        <TouchableOpacity style={styles.payNowButton} onPress={handlePayNow}>
          <Text style={styles.payNowText}>Pay Now</Text>
        </TouchableOpacity>

        {/* Transfer Combo and Terminate Combo Buttons */}
        <View style={styles.actionButtons}>
          {/* Updated Transfer Combo button styling */}
          <TouchableOpacity style={styles.transferButton}>
            <FontAwesome5 name="exchange-alt" size={24} color="white" />
            <Text style={styles.buttonText}>Transfer Combo</Text>
          </TouchableOpacity>
          {/* Updated Terminate Combo button styling */}
          <TouchableOpacity style={styles.terminateButton}>
            <FontAwesome5 name="times" size={24} color="white" />
            <Text style={styles.buttonText}>Terminate Combo</Text>
          </TouchableOpacity>
        </View>
        {/* Total Amount Payable, Total Amount Paid, and Balance Remaining */}
        <View style={styles.paymentDetails}>
          <Text>
            Total Amount Payable: ₦{orderDetails?.total_amount_payable || 0}
          </Text>
          <View style={styles.horizontalLine}></View>
          <Text>
            Total Amount Paid: ₦{orderDetails?.total_amount_paid || 0}
          </Text>
          <View style={styles.horizontalLine}></View>
          <Text>Payment Duration: {orderDetails?.payment_duration}</Text>
          <View style={styles.horizontalLine}></View>
          <Text>Payment Mode: {orderDetails?.payment_mode}</Text>
          <View style={styles.horizontalLine}></View>
          <Text>
            Balance Remaining: ₦{orderDetails?.balance_remaining || 0}
          </Text>
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

          {/* Check if payment_history is present and is an object */}
          {Array.isArray(orderDetails?.payment_history)
            ? orderDetails.payment_history.map((payment, index) => (
                <View key={index} style={styles.paymentItem}>
                  <Text style={styles.paymentDate}>
                    Payment Date: {payment.payment_date}
                  </Text>
                  <Text style={styles.amountPaid}>
                    Amount Paid: ₦{payment.amount_paid}
                  </Text>
                  <Text style={styles.datePaid}>
                    Date Paid: {payment.date_paid}
                  </Text>
                </View>
              ))
            : Object.values(orderDetails?.payment_history || {}).map(
                (payment, index) => (
                  <View key={index} style={styles.paymentItem}>
                    <Text style={styles.paymentDate}>
                      Payment Date: {payment.payment_date}
                    </Text>
                    <Text style={styles.amountPaid}>
                      Amount Paid: ₦{payment.amount_paid}
                    </Text>
                    <Text style={styles.datePaid}>
                      Date Paid: {payment.date_paid}
                    </Text>
                  </View>
                )
              )}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Pass order details to FundWalletScreen */}
              <FundWalletScreen
                orderId={comboId}
                paymentAmount={orderDetails?.amount_to_pay}
              />
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bigCard: {
    backgroundColor: "#FEBE10",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  linearProgressBar: {
    height: 20,
    backgroundColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
  },
  progressLabel: {
    fontSize: 18,
    color: "white",
  },
  nextPayLabel: {
    fontSize: 16,
    color: "white",
    marginTop: 16,
  },
  nextPayDate: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  amountToPay: {
    fontSize: 16,
    color: "white",
    marginTop: 16,
  },
  payNowButton: {
    backgroundColor: "#4CAF50", // Green color
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: -10,
  },
  payNowText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  transferButton: {
    backgroundColor: "#2196F3",
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 8,
    flexDirection: "row",
  },
  terminateButton: {
    backgroundColor: "#FF9800",
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 8,
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  paymentDetails: {
    marginBottom: 16,
  },
  horizontalLine: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  paymentHistory: {},
  historyTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  viewAllButton: {
    backgroundColor: "#FEBE10",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  paymentItem: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  paymentDate: {
    fontSize: 16,
    fontWeight: "bold",
  },
  amountPaid: {
    fontSize: 16,
  },
  datePaid: {
    fontSize: 14,
    color: "gray",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#999999",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: "#FEBE10",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  closeButton: {
    backgroundColor: "gray",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  comboTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white", // Adjust the color as needed
    marginBottom: 16,
  },
});

export default ComboDetailsScreen;
