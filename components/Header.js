import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  const notificationCount = 3;

  const navigateToProfile = () => {
    navigation.navigate("ProfileScreen");
  };

  const navigateToNotifications = () => {
    navigation.navigate("NotificationScreen");
  };

  return (
    <View style={styles.header}>
      {/* User Avatar */}
      <TouchableOpacity onPress={navigateToProfile}>
        <Ionicons name="person" size={24} color="black" style={styles.icon} />
      </TouchableOpacity>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          placeholder="Search for products..."
          style={styles.searchInput}
          placeholderTextColor="gray"
        />
      </View>

      {/* Notification Icon with Badge */}
      <TouchableOpacity onPress={navigateToNotifications}>
        <View style={styles.notificationContainer}>
          <Ionicons name="notifications" size={24} color="black" style={styles.icon} />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FEBE10", // Header background color
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    flex: 1,
    marginLeft: 5, // Adjust the margin as needed
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "black",
  },
  icon: {
    marginRight: 5, // Adjust the margin as needed
    color: "white",
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 5,
    marginLeft: 5,
    position: "absolute",
    top: -5,
    right: -5,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});


export default Header;




