import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setWalletBalance } from '../redux/WalletSlice';


const MyWalletScreen = () => {
  const [activeTab, setActiveTab] = useState('ongoingCombos');
  const [loadingScreen, setLoadingScreen] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { balance, loading } = useSelector((state) => state.wallet);
  const [userCombos, setUserCombos] = useState([]);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };
  

  const handleNavigation = (routeName) => {
    switch (routeName) {
      case 'SendMoney':
        navigation.navigate('SendMoneyScreen');
        break;
      case 'Withdraw':
        navigation.navigate('WithdrawScreen');
        break;
      case 'FundWallet':
        navigation.navigate('FundWalletScreen');
        break;
      case 'PayCombo':
        navigation.navigate('PayComboScreen');
        break;
      default:
        // Handle other cases if needed.
        break;
    }
  };

  useEffect(() => {
    checkUserLogin();
  }, []);
  const checkUserLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const accessToken = await AsyncStorage.getItem('token');

      if (!userData || !accessToken) {
        Alert.alert('User data or Access Token not found', 'Please log in again.');
        setLoadingScreen(false);
        return;
      }

      const user = JSON.parse(userData);

      fetchWalletBalance(accessToken);
    } catch (error) {
      console.error('Error checking user login:', error);
      setLoadingScreen(false);
    }
  };

  const fetchWalletBalance = async (accessToken) => {
    try {
      const response = await fetch('https://easypay.intelps.cloud/api/wallet/balance', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Update the wallet balance in the Redux store
        dispatch(setWalletBalance(data.balance));
        fetchUserCombos(accessToken);
      } else {
        // Handle error cases if needed
        console.error('Error fetching wallet balance:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
    } finally {
      setLoadingScreen(false); // Update loadingScreen state after fetching
    }
  };

  const fetchUserCombos = async (accessToken) => {
    try {
      const combosResponse = await fetch('https://easypay.intelps.cloud/api/orders', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (combosResponse.ok) {
        const combosData = await combosResponse.json();
        setUserCombos(combosData.combos);
      } else {
        console.error('Error fetching user comb:', combosResponse.statusText);
      }
    } catch (error) {
      console.error('Error fetching user combos:', error);
    }
  };


  return (
    <SafeAreaView>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Render content based on user login status */}
        {loadingScreen ? ( // Display loading animation while loadingScreen is true
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3498db" />
          </View>
        ) : balance ? (
          <>
            {/* Wallet Balance Section */}
            <View style={styles.walletBalance}>
              <Text style={styles.walletBalanceLabel}>Available Balance is</Text>
              <Text style={styles.walletBalanceAmount}>₦{balance}</Text>
              <View style={styles.transactionInfo}>
                <Text>Last deposit amount is </Text>
                <Text>Commission </Text>
              </View>
            </View>

            {/* Wallet Icons Section */}
            <View style={styles.walletCard}>
              <View style={styles.walletIcons}>
                <TouchableOpacity style={styles.walletIcon} onPress={() => handleNavigation('SendMoney')}>
                  <Ionicons name="ios-send" size={30} color="#3498db" />
                  <Text>Send Money</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.walletIcon} onPress={() => handleNavigation('Withdraw')}>
                  <Ionicons name="ios-arrow-down-circle" size={30} color="#2ecc71" />
                  <Text>Withdraw</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.walletIcon} onPress={() => handleNavigation('FundWallet')}>
                  <Ionicons name="ios-add-circle" size={30} color="#e74c3c" />
                  <Text>Fund Wallet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.walletIcon} onPress={() => handleNavigation('PayCombo')}>
                  <MaterialCommunityIcons name="credit-card" size={30} color="#f39c12" />
                  <Text>Pay Combo</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Tabs Section */}
            <View style={styles.tabs}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'ongoingCombos' && styles.activeTab]}
                onPress={() => handleTabPress('ongoingCombos')}
              >
                <Text>Ongoing Combos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'transactionHistory' && styles.activeTab]}
                onPress={() => handleTabPress('transactionHistory')}
              >
                <Text>Transaction History</Text>
              </TouchableOpacity>
            </View>

            {/* Content based on the active tab */}
            {activeTab === 'ongoingCombos' && (
              <View style={styles.ongoingCombos}>
               {/* Render user combos dynamically */}
                {userCombos.map((combo) => (
                  <View key={combo.order_id} style={styles.comboCard}>
                    <Text style={styles.comboName}>{combo.combo_title}</Text>
                    <Text>Order ID: {combo.order_id}</Text>
                    <Text>Next Date to Pay: {formatDate(combo.next_payment_date)}</Text>
                    <Text>Amount to Pay: ₦{combo.amount_to_pay}</Text>
                    <Text>Remaining Balance: ₦{combo.remaining_balance}</Text>
                    <TouchableOpacity
                      style={styles.viewDetailsButton}
                      onPress={() => navigation.navigate('ComboDetails', { comboId: combo.order_id })}
                    >
                      <Text style={styles.viewDetailsButtonText}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                ))}

              </View>
            )}

            {activeTab === 'transactionHistory' && (
              <View style={styles.transactionHistory}>
                {/* Sample Transaction History Content */}
                <View style={styles.transactionCard}>
                  <Text style={styles.transactionType}>Deposit</Text>
                  <Text style={styles.transactionAmount}>+₦100</Text>
                  <Text style={styles.transactionDate}>2023-11-01</Text>
                </View>
                {/* Add more transaction cards as needed */}
              </View>
            )}
          </>
        ) : (
          // User is not logged in, render login prompt
          <View style={styles.notLoggedInContainer}>
            <Text style={styles.notLoggedInText}>
              You need to be logged in to view your wallet. Please log in.
            </Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // backgroundColor: '#ffffff',
  },
  walletBalance: {
    backgroundColor: '#FEBE10',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  walletBalanceLabel: {
    fontSize: 16,
    color: 'white',
  },
  walletBalanceAmount: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  transactionInfo: {
    marginTop: 10,
  },
  walletCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
  },
  walletIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  walletIcon: {
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#2ecc71',
    borderRadius: 5,
    marginHorizontal: 5,
    color: 'white',
  },
  activeTab: {
    backgroundColor: '#3498db',
  },
  ongoingCombos: {
    // Implement your ongoing combo styles here
  },
  comboCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  comboName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  viewDetailsButton: {
    backgroundColor: '#FEBE10',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  viewDetailsButtonText: {
    color: 'white',
  },
  transactionHistory: {
    // Implement your transaction history styles here
  },
  transactionCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  transactionAmount: {
    fontSize: 18,
    color: '#FEBE10',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  transactionDate: {
    fontSize: 14,
    color: 'gray',
  },
  notLoggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notLoggedInText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyWalletScreen;
