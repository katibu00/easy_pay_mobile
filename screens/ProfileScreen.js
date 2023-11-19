import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Check AsyncStorage for user information
    retrieveUserInfo();
  }, []);

  const retrieveUserInfo = async () => {
    try {
      // Retrieve user information from AsyncStorage
      const storedUser = await AsyncStorage.getItem("user");
      const storedToken = await AsyncStorage.getItem("userToken");

      if (storedUser) {
        const userObject = JSON.parse(storedUser);
        setUsername(userObject.name);
        setEmail(userObject.email);
      }
    } catch (error) {
      console.error("Error retrieving user information:", error);
    }
  };

  const navigateToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const navigateToContactUs = () => {
    navigation.navigate("ContactUsScreen");
  };

  const toggleDarkTheme = () => {
    // Implement dark theme toggle functionality
  };



const logout = async () => {
  try {
    // Retrieve user token from AsyncStorage
    const storedToken = await AsyncStorage.getItem("token");

    // Make API request to log out on the Laravel backend
    const response = await fetch('https://easypay.intelps.cloud/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${storedToken}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      // Clear user and token from AsyncStorage
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('userToken');

      navigation.navigate('Home');

      // Show a success message
      Alert.alert('Logout Successful', data.message);
    } else {
      // Show an error message
      Alert.alert('Logout Failed', data.message);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};



  const navigateToPrivacyTerms = () => {
    // Implement navigation to Privacy and Terms screen
  };

  return (
    <View style={styles.container}>

      {username && email ? (
        <View style={styles.profileInfo}>
          {/* Display User Details Here */}
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      ) : (
        <Text style={styles.notLoggedInText}>User not logged in</Text>
      )}

      <TouchableOpacity style={styles.link} onPress={navigateToEditProfile}>
        <Ionicons name="create" size={24} color="#3498db" />
        <Text style={styles.linkText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={navigateToContactUs}>
        <Ionicons name="mail" size={24} color="#e74c3c" />
        <Text style={styles.linkText}>Contact Us</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={toggleDarkTheme}>
        <Ionicons name="moon" size={24} color="#2ecc71" />
        <Text style={styles.linkText}>Dark Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={logout}>
        <Ionicons name="log-out" size={24} color="#e74c3c" />
        <Text style={styles.linkText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={navigateToPrivacyTerms}>
        <Ionicons name="document-text" size={24} color="#3498db" />
        <Text style={styles.linkText}>Privacy & Terms</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileInfo: {
    marginBottom: 20,
  },
  notLoggedInText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  linkText: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default ProfileScreen;
