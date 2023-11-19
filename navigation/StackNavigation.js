import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import SeeAllScreen from "../screens/SeeAllScreen";
import AddressScreen from "../screens/AddressScreen";
import ComboDetailsScreen from "../screens/ComboDetailsScreen";
import { Fontisto } from "@expo/vector-icons";
import HotDealScreen from "../screens/HotDealScreen";
import MyWalletScreen from "../screens/MyWalletScreen";
import SendMoneyScreen from "../screens/SendMoneyScreen";
import PayComboScreen from "../screens/PayComboScreen";
import WithdrawScreen from "../screens/WithdrawScreen";
import FundWalletScreen from "../screens/FundWalletScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ContactUsScreen from "../screens/ContactUsScreen";

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: "white",
          },
          headerShown: false,
          tabBarActiveTintColor: "#FEBE10",
          tabBarInactiveTintColor: "black",
          tabBarIcon: ({ focused, color, size }) => {
            let iconComponent;

            if (route.name === "Home") {
              iconComponent = focused ? (
                <Entypo name="home" size={24} color="#FEBE10" />
              ) : (
                <Entypo name="home" size={24} color="black" />
              );
            } else if (route.name === "HotDeals") {
              iconComponent = focused ? (
                <Fontisto name="fire" size={24} color="#FEBE10" />
              ) : (
                <Fontisto name="fire" size={24} color="black" />
              );
            } else if (route.name === "MyWallet") {
              iconComponent = focused ? (
                <Ionicons name="md-wallet" size={24} color="#FEBE10" />
              ) : (
                <Ionicons name="md-wallet" size={24} color="black" />
              );
            }

            return iconComponent;
          },
        })}
      >
        <Tab.Screen
          name="HotDeals"
          component={HotDealScreen}
          options={{
            tabBarLabel: "Hot Deals",
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
          }}
        />

        <Tab.Screen
          name="MyWallet"
          component={MyWalletScreen}
          options={{
            tabBarLabel: "Wallet",
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ComboDetails"
          component={ComboDetailsScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="SendMoneyScreen"
          component={SendMoneyScreen}
          options={{ headerShown: true, title: 'Send Money' }}
        />
        <Stack.Screen
          name="FundWalletScreen"
          component={FundWalletScreen}
          options={{ headerShown: true, title: 'Add Funds' }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: true, title: 'My Profile' }}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{ headerShown: true, title: 'Notifications' }}
        />
        <Stack.Screen
          name="ContactUsScreen"
          component={ContactUsScreen}
          options={{ headerShown: true, title: 'Contact Us' }}
        />
        <Stack.Screen
          name="PayComboScreen"
          component={PayComboScreen}
          options={{ headerShown: true, title: 'Pay Combo' }}
        />
        <Stack.Screen
          name="WithdrawScreen"
          component={WithdrawScreen}
          options={{ headerShown: true, title: 'Withdraw Funds' }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={({ route }) => ({ title: route.params.productName })}
        />
        <Stack.Screen
          name="SeeAll"
          component={SeeAllScreen}
          options={({ route }) => ({ title: route.params.categoryName })}
        />
        <Stack.Screen name="AddressScreen" component={AddressScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
